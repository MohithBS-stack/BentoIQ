"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Wallet, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { ROUTES } from "@/lib/constants";
import { useEffect } from "react";

export default function SignupPage() {
  const { isConnected, connectWallet, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 md:p-10 border-white/[0.08] shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="mb-4 group">
              <div className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center glow-purple transition-transform group-hover:scale-105">
                <Zap size={22} className="text-[var(--text-primary)]" fill="white" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-1.5">Create BentoIQ Account</h1>
            <p className="text-xs text-[var(--text-primary)]/45 max-w-xs">
              Connect your Web3 wallet to generate your Bento prediction profile and start forecasting.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-[var(--text-primary)] font-semibold text-sm shadow-xl shadow-purple-500/20 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white anim-spin" />
              ) : (
                <Wallet size={18} />
              )}
              <span>{isLoading ? "Generating Account..." : "Connect & Create Account"}</span>
              {!isLoading && (
                <ArrowRight size={16} className="absolute right-5 transition-transform group-hover:translate-x-1" />
              )}
            </button>

            <div className="pt-4 border-t border-white/[0.05] space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] opacity-70">
                <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                <span>Zero friction · No password setup required</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] opacity-70">
                <Sparkles size={14} className="text-purple-400 flex-shrink-0" />
                <span>AI-powered decision intelligence included</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] opacity-70">
                <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" />
                <span>Seamless Bento SDK wallet signature auth</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center border-t border-white/[0.04] pt-4">
            <p className="text-xs text-[var(--text-secondary)] opacity-70">
              Already have a session?{" "}
              <Link href={ROUTES.AUTH_LOGIN} className="text-blue-400 font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
