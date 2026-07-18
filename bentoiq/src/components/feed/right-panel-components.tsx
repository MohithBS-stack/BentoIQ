"use client";

import Link from "next/link";
import { Sparkles, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, Award, Zap } from "lucide-react";
import { PredictionSparkline } from "@/components/ui/prediction-sparkline";
import { ROUTES } from "@/lib/constants";

export function MarketPulse() {
  const pulseItems = [
    { label: "AI & Tech Index", change: "+4.2%", isUp: true, spark: [50, 52, 55, 60, 68] },
    { label: "Crypto Volatility", change: "-1.8%", isUp: false, spark: [70, 68, 65, 63, 61] },
    { label: "Climate Futures", change: "+8.9%", isUp: true, spark: [30, 42, 50, 65, 78] },
  ];

  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={15} className="text-blue-400 animate-pulse" />
          <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Market Pulse</h3>
        </div>
        <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">LIVE</span>
      </div>

      <div className="space-y-2.5">
        {pulseItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">{item.label}</p>
              <span className={`text-[11px] font-bold flex items-center gap-0.5 ${item.isUp ? "text-emerald-400" : "text-red-400"}`}>
                {item.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {item.change}
              </span>
            </div>
            <PredictionSparkline data={item.spark} width={60} height={22} color={item.isUp ? "#10b981" : "#ef4444"} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AISummaryCard() {
  return (
    <div className="glass-card p-5 border-purple-500/20 bg-gradient-to-br from-purple-500/[0.04] to-blue-500/[0.02]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={15} className="text-purple-400" />
        <h3 className="text-xs font-bold text-purple-300 uppercase tracking-widest">Daily Gemini Brief</h3>
      </div>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
        &ldquo;Collective consensus across 30 active tech decision markets leans heavily towards accelerated sub-agent adoption and foundation model open-weight parity by Q4 2025.&rdquo;
      </p>
      <div className="flex justify-between items-center text-[10px] text-[var(--text-primary)]/35 pt-3 border-t border-white/[0.05]">
        <span>Updated 12m ago</span>
        <Link href={ROUTES.AI_INSIGHTS} className="text-purple-400 hover:underline font-semibold flex items-center gap-0.5">
          Read full synthesis
        </Link>
      </div>
    </div>
  );
}

export function ActivityItem({ user, action, market, amount, time }: {
  user: string;
  action: string;
  market: string;
  amount: string;
  time: string;
}) {
  return (
    <div className="text-xs space-y-1 pb-2.5 border-b border-white/[0.04] last:border-0 last:pb-0">
      <div className="flex justify-between text-[var(--text-secondary)]">
        <span className="font-semibold text-[var(--text-primary)]">@{user}</span>
        <span className="text-[var(--text-secondary)] opacity-70 text-[11px]">{time}</span>
      </div>
      <p className="text-[var(--text-secondary)] text-[11px] truncate">
        <span className="text-emerald-400 font-semibold">{action}</span> on <span className="text-[var(--text-primary)]">{market}</span>
      </p>
      <span className="text-[10px] text-[var(--text-secondary)] opacity-70 font-mono">Stake: {amount}</span>
    </div>
  );
}

export function TopPredictors() {
  const predictors = [
    { rank: 1, name: "satoshi_99", accuracy: "94.2%", streak: "12 wins" },
    { rank: 2, name: "quant_alpha", accuracy: "91.8%", streak: "9 wins" },
    { rank: 3, name: "gemini_oracle", accuracy: "89.5%", streak: "7 wins" },
  ];

  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Award size={15} className="text-amber-400" />
        <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Top Forecasters</h3>
      </div>
      <div className="space-y-2">
        {predictors.map((p) => (
          <div key={p.name} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center justify-center">
                #{p.rank}
              </span>
              <span className="font-semibold text-[var(--text-primary)]">@{p.name}</span>
            </div>
            <div className="text-right">
              <span className="text-emerald-400 font-extrabold text-[11px] block">{p.accuracy}</span>
              <span className="text-[9px] text-[var(--text-secondary)] opacity-70">{p.streak}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
