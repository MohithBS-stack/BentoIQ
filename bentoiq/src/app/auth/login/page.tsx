"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Wallet, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { ROUTES } from "@/lib/constants";
import { useEffect } from "react";

export default function LoginPage() {
  const { isConnected, connectWallet, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 md:p-10 border-white/[0.08] shadow-2xl">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="mb-4 group">
              <div className="w-12 h-12 rounded-2xl gradient-blue flex items-center justify-center glow-blue transition-transform group-hover:scale-105">
                <Zap size={22} className="text-[var(--text-primary)]" fill="white" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5">Welcome to BentoIQ</h1>
            <p className="text-xs text-[var(--text-primary)]/45 max-w-xs">
              Connect your EVM wallet to forecast real-world outcomes and access AI decision intelligence.
            </p>
          </div>

          {/* Connection Box */}
          <div className="space-y-4">
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-[var(--text-primary)] font-semibold text-sm shadow-xl shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white anim-spin" />
              ) : (
                <Wallet size={18} />
              )}
              <span>{isLoading ? "Authenticating with Wallet..." : "Connect EVM Wallet"}</span>
              {!isLoading && (
                <ArrowRight size={16} className="absolute right-5 transition-transform group-hover:translate-x-1" />
              )}
            </button>

            <div className="pt-4 border-t border-white/[0.05] space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] opacity-70">
                <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                <span>Non-custodial login via Bento EOA Signature</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] opacity-70">
                <Sparkles size={14} className="text-purple-400 flex-shrink-0" />
                <span>Instant access to AI prediction insights</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] opacity-70">
                <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" />
                <span>No password required · Web3 Auth</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center border-t border-white/[0.04] pt-4">
            <p className="text-[11px] text-[var(--text-secondary)] opacity-70">
              By connecting, you agree to BentoIQ terms and Web3 interaction protocols.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
