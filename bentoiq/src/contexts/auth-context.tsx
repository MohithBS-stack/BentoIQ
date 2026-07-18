"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createBentoSdk, type BentoSdk } from "@bento.fun/sdk";
import { walletAuthProvider } from "@bento.fun/sdk";
import { useAuthStore } from "@/store/auth.store";
import { toastError, toastSuccess } from "@/lib/toast";
import { devLog } from "@/lib/logger";
import { bentoFetch } from "@/lib/bento-fetch";

// ── Types ──────────────────────────────────────────────────────────────────────
export interface BentoUser {
  id:            string;
  username:      string;
  displayName:   string;
  profileImage?: string;
  walletAddress: string;
  managedAddress?: string;
}

export interface AuthContextValue {
  sdk:           BentoSdk | null;
  user:          BentoUser | null;
  walletAddress: string | null;
  jwt:           string | null;
  isConnected:   boolean;
  isLoading:     boolean;
  connectWallet: () => Promise<void>;
  disconnect:    () => void;
}

// ── Context ────────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue>({
  sdk:           null,
  user:          null,
  walletAddress: null,
  jwt:           null,
  isConnected:   false,
  isLoading:     false,
  connectWallet: async () => {},
  disconnect:    () => {},
});

export const useAuth = () => useContext(AuthContext);

// ── Helpers ────────────────────────────────────────────────────────────────────
const SESSION_KEY = "bentoiq:session";

interface PersistedSession {
  jwt:           string;
  walletAddress: string;
  user:          BentoUser;
  expiresAt:     number;
}

function loadPersistedSession(): PersistedSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed: PersistedSession = JSON.parse(raw);
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function persistSession(session: PersistedSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearPersistedSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

/** Build the Bento SDK from persisted JWT (for subsequent page loads). */
function buildSdkFromJwt(jwt: string, walletAddress: string): BentoSdk {
  const authProvider = walletAuthProvider(
    () => ({ Authorization: `Bearer ${jwt}` }),
    () => walletAddress,
  );
  
  devLog("✓ Bento SDK initialized (from persisted session)");

  return createBentoSdk({
    baseUrl: process.env.NEXT_PUBLIC_BENTO_URL ?? process.env.BENTO_URL ?? process.env.NEXT_PUBLIC_BENTO_BASE_URL ?? "https://internal-server.bento.fun",
    apiKey:  process.env.NEXT_PUBLIC_BUILDER_API_KEY ?? process.env.BUILDER_API_KEY ?? process.env.NEXT_PUBLIC_BENTO_API_KEY ?? "",
    tournamentsBaseUrl: process.env.NEXT_PUBLIC_PARLAY_TOURNMENT_URL ?? process.env.PARLAY_TOURNMENT_URL,
    auth:    authProvider,
    fetch:   bentoFetch,
  });
}

/** Request EVM wallet signature via browser injected provider (MetaMask / Rabby / etc). */
async function requestWalletSignature(message: string): Promise<{ address: string; signature: string }> {
  const ethereum = (window as unknown as Record<string, unknown>).ethereum;
  if (!ethereum) {
    throw new Error("No wallet found. Please install MetaMask or a compatible Web3 wallet.");
  }

  const accounts = await (ethereum as { request: (args: { method: string; params?: unknown[] }) => Promise<string[]> })
    .request({ method: "eth_requestAccounts" });

  const address = accounts[0];
  if (!address) throw new Error("No accounts returned from wallet.");

  const signature = await (ethereum as { request: (args: { method: string; params: unknown[] }) => Promise<string> })
    .request({
      method: "personal_sign",
      params: [message, address],
    });

  return { address, signature };
}

// ── Auth Provider ──────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [sdk,           setSdk]           = useState<BentoSdk | null>(null);
  const [user,          setUser]          = useState<BentoUser | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [jwt,           setJwt]           = useState<string | null>(null);
  const [isLoading,     setIsLoading]     = useState(true);

  const { setUser: setStoreUser, logout: storeLogout, setWallet: setStoreWallet } = useAuthStore();

  // ── Restore session on mount ────────────────────────────────────────────────
  useEffect(() => {
    const session = loadPersistedSession();
    if (session) {
      const restoredSdk = buildSdkFromJwt(session.jwt, session.walletAddress);
      setSdk(restoredSdk);
      setJwt(session.jwt);
      setWalletAddress(session.walletAddress);
      setUser(session.user);
      setStoreUser({
        id:            session.user.id,
        username:      session.user.username,
        displayName:   session.user.displayName,
        email:         "",
        avatarUrl:     session.user.profileImage,
        walletAddress: session.user.walletAddress,
        createdAt:     new Date().toISOString(),
        updatedAt:     new Date().toISOString(),
        stats: {
          totalPredictions:   0,
          correctPredictions: 0,
          accuracy:           0,
          totalEarnings:      0,
          rank:               0,
          reputation:         0,
        },
      });
      setStoreWallet({
        address: session.walletAddress,
        isConnected: true,
      });
    }
    setIsLoading(false);
  }, [setStoreUser, setStoreWallet]);

  // ── Connect wallet and authenticate ────────────────────────────────────────
  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    try {
      // Step 1: Build public SDK to get login nonce
      const publicSdk = createBentoSdk({
        baseUrl: process.env.NEXT_PUBLIC_BENTO_URL ?? process.env.BENTO_URL ?? process.env.NEXT_PUBLIC_BENTO_BASE_URL ?? "https://internal-server.bento.fun",
        apiKey:  process.env.NEXT_PUBLIC_BUILDER_API_KEY ?? process.env.BUILDER_API_KEY ?? process.env.NEXT_PUBLIC_BENTO_API_KEY ?? "",
        tournamentsBaseUrl: process.env.NEXT_PUBLIC_PARLAY_TOURNMENT_URL ?? process.env.PARLAY_TOURNMENT_URL,
        auth:    walletAuthProvider(() => ({})),
        fetch:   bentoFetch,
      });

      const nonceMessage = `Sign this message to authenticate with BentoIQ.\n\nNonce: ${Date.now()}`;

      // Step 2: Get wallet signature
      const { address, signature } = await requestWalletSignature(nonceMessage);

      // Step 3: Exchange signature for JWT via Bento SDK auth API
      const authResult = await publicSdk.public.auth.eoaLogin({
        address,
        signature,
        message: nonceMessage,
      });

      if (!authResult || !("token" in authResult)) {
        throw new Error("Invalid authentication response from Bento API.");
      }
      
      const token = String(authResult.token);

      // Step 4: Build authenticated SDK
      const authProvider = walletAuthProvider(
        () => ({ Authorization: `Bearer ${token}` }),
        () => address,
      );

      const authenticatedSdk = createBentoSdk({
        baseUrl: process.env.NEXT_PUBLIC_BENTO_URL ?? process.env.BENTO_URL ?? process.env.NEXT_PUBLIC_BENTO_BASE_URL ?? "https://internal-server.bento.fun",
        apiKey:  process.env.NEXT_PUBLIC_BUILDER_API_KEY ?? process.env.BUILDER_API_KEY ?? process.env.NEXT_PUBLIC_BENTO_API_KEY ?? "",
        tournamentsBaseUrl: process.env.NEXT_PUBLIC_PARLAY_TOURNMENT_URL ?? process.env.PARLAY_TOURNMENT_URL,
        auth:    authProvider,
        fetch:   bentoFetch,
      });

      devLog("✓ Bento SDK initialized (authenticated)");
      devLog("✓ Authentication successful");
      devLog("✓ JWT received", `${token.slice(0, 10)}...`);
      devLog("✓ Managed account address", address);

      // Step 5: User profile creation
      const shortAddr = `${address.slice(0, 6)}...${address.slice(-4)}`;
      const bentoUser: BentoUser = {
        id:            address.toLowerCase(),
        username:      `user_${address.slice(2, 8)}`,
        displayName:   shortAddr,
        walletAddress: address,
      };

      // Step 6: Persist & update store
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
      persistSession({ jwt: token, walletAddress: address, user: bentoUser, expiresAt });

      setSdk(authenticatedSdk);
      setJwt(token);
      setWalletAddress(address);
      setUser(bentoUser);

      setStoreUser({
        id:            bentoUser.id,
        username:      bentoUser.username,
        displayName:   bentoUser.displayName,
        email:         "",
        avatarUrl:     bentoUser.profileImage,
        walletAddress: address,
        createdAt:     new Date().toISOString(),
        updatedAt:     new Date().toISOString(),
        stats: {
          totalPredictions:   0,
          correctPredictions: 0,
          accuracy:           0,
          totalEarnings:      0,
          rank:               0,
          reputation:         0,
        },
      });

      setStoreWallet({
        address,
        isConnected: true,
      });

      toastSuccess("Wallet Connected", `Signed in as ${shortAddr}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to connect wallet.";
      toastError("Authentication Failed", message);
    } finally {
      setIsLoading(false);
    }
  }, [setStoreUser, setStoreWallet]);

  // ── Disconnect ──────────────────────────────────────────────────────────────
  const disconnect = useCallback(() => {
    clearPersistedSession();
    setSdk(null);
    setJwt(null);
    setWalletAddress(null);
    setUser(null);
    storeLogout();
    toastSuccess("Disconnected", "Your session has been terminated.");
  }, [storeLogout]);

  const value: AuthContextValue = {
    sdk,
    user,
    walletAddress,
    jwt,
    isConnected: !!jwt && !!user,
    isLoading,
    connectWallet,
    disconnect,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
