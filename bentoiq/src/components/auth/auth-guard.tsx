"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { ROUTES } from "@/lib/constants";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface GuardProps {
  children: ReactNode;
  /** If true, redirect authenticated users away (e.g. auth pages). */
  redirectIfAuthenticated?: boolean;
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--bg-base)] z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <div
          className="w-14 h-14 rounded-2xl gradient-blue flex items-center justify-center glow-blue"
          style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
        >
          <Zap size={24} className="text-[var(--text-primary)]" fill="white" />
        </div>

        {/* Spinner */}
        <div className="relative w-8 h-8">
          <div
            className="absolute inset-0 rounded-full border-2 border-white/10"
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 anim-spin"
          />
        </div>

        <p className="text-sm text-[var(--text-secondary)] opacity-70 font-medium">Loading BentoIQ…</p>
      </motion.div>
    </div>
  );
}

/**
 * AuthGuard — wraps protected or public-only routes.
 * Shows a polished loading screen while session is being restored.
 */
export function AuthGuard({ children, redirectIfAuthenticated = false }: GuardProps) {
  const { isConnected, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (redirectIfAuthenticated && isConnected) {
      router.replace(ROUTES.DASHBOARD);
    }
    // Public pages (markets, landing) don't require auth — no redirect
  }, [isConnected, isLoading, redirectIfAuthenticated, router]);

  if (isLoading) return <LoadingScreen />;

  return <>{children}</>;
}

/**
 * RequireAuth — redirects to login if user is not authenticated.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isConnected, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isConnected) {
      router.replace(ROUTES.AUTH_LOGIN);
    }
  }, [isConnected, isLoading, router]);

  if (isLoading || !isConnected) return <LoadingScreen />;
  return <>{children}</>;
}
