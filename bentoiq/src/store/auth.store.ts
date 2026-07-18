import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthSession } from "@/types";

export interface WalletState {
  address: string | null;
  chainId: number | null;
  balance: string | null;
  isConnected: boolean;
}

interface AuthState {
  user: User | null;
  session: AuthSession | null;
  wallet: WalletState;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: AuthSession | null) => void;
  setWallet: (wallet: Partial<WalletState>) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      wallet: {
        address: null,
        chainId: 1,
        balance: null,
        isConnected: false,
      },
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) =>
        set({ user, isAuthenticated: !!user }),

      setSession: (session) =>
        set({ session, isAuthenticated: !!session }),

      setWallet: (walletUpdate) =>
        set((state) => ({
          wallet: { ...state.wallet, ...walletUpdate },
        })),

      setLoading: (isLoading) => set({ isLoading }),

      logout: () =>
        set({
          user: null,
          session: null,
          wallet: { address: null, chainId: 1, balance: null, isConnected: false },
          isAuthenticated: false,
        }),
    }),
    {
      name: "bentoiq:auth",
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        wallet: state.wallet,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
