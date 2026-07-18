"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Brain,
  Zap,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Flame,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { DecisionCard } from "@/components/feed/decision-card";
import {
  MarketPulse,
  AISummaryCard,
  TopPredictors,
} from "@/components/feed/right-panel-components";
import { ROUTES } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { publicBentoSdk } from "@/lib/bento-client";
import { devLog } from "@/lib/logger";

export default function DashboardPage() {
  const { user, isConnected, connectWallet } = useAuth();

  const { data: marketsResponse, isLoading, error } = useQuery({
    queryKey: ["dashboard-markets"],
    queryFn: async () => {
      try {
        const data = await publicBentoSdk.public.markets.list();
        devLog("✓ Dashboard markets fetched", data.data.length);
        return data;
      } catch (err: any) {
        devLog("Error fetching markets in dashboard.tsx", err?.message || err);
        throw err;
      }
    },
  });

  const featuredDecisions = (marketsResponse?.data || []).slice(0, 4);
  const totalVolume = (marketsResponse?.data || []).reduce((acc: number, cur: any) => acc + (Number(cur.totalVolume) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8 relative overflow-hidden bg-[var(--bg-elevated)] border-2 border-[var(--text-primary)] shadow-[6px_6px_0px_#111111]"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[var(--bauhaus-blue)] border-2 border-[var(--text-primary)] text-[var(--bg-elevated)] text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_#111111]">
              <Zap size={13} fill="currentColor" />
              Intelligence Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tighter uppercase">
              Welcome back, {user ? user.displayName : "Forecaster"}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[var(--text-secondary)] max-w-xl uppercase tracking-widest leading-relaxed">
              Synthesizing active prediction markets from Bento Testnet with Gemini AI reasoning to elevate collective decision-making.
            </p>
          </div>

          {!isConnected && (
            <button
              onClick={connectWallet}
              className="btn-accent self-start md:self-auto"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </motion.div>

      {/* Quick Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Markets", value: isLoading ? "..." : `${marketsResponse?.data?.length || 0} Markets`, icon: TrendingUp, color: "text-[var(--bauhaus-blue)]" },
          { label: "AI Precision", value: "91.4%", icon: Brain, color: "text-[var(--text-primary)]" },
          { label: "Total Volume", value: isLoading ? "..." : `${totalVolume.toLocaleString()} USDC`, icon: BarChart3, color: "text-[var(--emerald)]" },
          { label: "Consensus", value: "High (78%)", icon: ShieldCheck, color: "text-[var(--bauhaus-red)]" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-5 space-y-2">
              <div className="flex items-center justify-between border-b-2 border-[var(--text-primary)] pb-2 mb-2">
                <span className="text-xs text-[var(--text-secondary)] font-black uppercase tracking-widest">{stat.label}</span>
                <Icon size={16} className={stat.color} />
              </div>
              <p className="text-xl font-black text-[var(--text-primary)] tracking-tighter uppercase">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Feed Preview Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b-4 border-[var(--text-primary)] pb-3">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-[var(--bauhaus-red)]" />
              <h2 className="text-base font-black text-[var(--text-primary)] uppercase tracking-widest">Top Bento Markets</h2>
            </div>
            <Link
              href={ROUTES.MARKETS}
              className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-black uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8 text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] border-4 border-dashed border-[var(--border-subtle)]">
                Loading Markets...
              </div>
            ) : error ? (
              <div className="text-center py-8 text-xs font-black uppercase tracking-widest text-[var(--rose)] border-4 border-dashed border-[var(--rose)]">
                Failed to load markets. {error instanceof Error ? error.message : ""}
              </div>
            ) : featuredDecisions.map((decision: any) => (
              <DecisionCard key={decision.duelId || decision.id} market={decision} />
            ))}
          </div>
        </div>

        {/* Right Panel Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <AISummaryCard />
          <MarketPulse />
          <TopPredictors />
        </div>
      </div>
    </div>
  );
}
