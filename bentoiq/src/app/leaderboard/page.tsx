"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Target, TrendingUp, Flame, Crown } from "lucide-react";
import Link from "next/link";

const LEADERBOARD_DATA = [
  { rank: 1, username: "satoshi_99", displayName: "Alex Quant", accuracy: "94.2%", volume: "$1.2M", score: "14,520 XP", trend: "+2" },
  { rank: 2, username: "oracle_ai", displayName: "AI Synthesis Fund", accuracy: "91.8%", volume: "$850K", score: "12,100 XP", trend: "0" },
  { rank: 3, username: "tech_macro", displayName: "Sarah Chen", accuracy: "89.5%", volume: "$420K", score: "10,850 XP", trend: "+5" },
  { rank: 4, username: "crypto_whale", displayName: "0xWhale", accuracy: "85.1%", volume: "$2.1M", score: "9,420 XP", trend: "-1" },
  { rank: 5, username: "future_sight", displayName: "Future Sight", accuracy: "82.4%", volume: "$150K", score: "8,100 XP", trend: "+1" },
  { rank: 6, username: "data_driven", displayName: "Data Driven", accuracy: "81.9%", volume: "$340K", score: "7,850 XP", trend: "-2" },
  { rank: 7, username: "macro_trends", displayName: "Macro Trends", accuracy: "79.5%", volume: "$890K", score: "7,200 XP", trend: "0" },
  { rank: 8, username: "quantum_leap", displayName: "Quantum Leap", accuracy: "78.2%", volume: "$110K", score: "6,900 XP", trend: "+4" },
  { rank: 9, username: "alpha_seeker", displayName: "Alpha Seeker", accuracy: "76.8%", volume: "$560K", score: "6,400 XP", trend: "-1" },
  { rank: 10, username: "nexus_point", displayName: "Nexus Point", accuracy: "75.1%", volume: "$230K", score: "5,800 XP", trend: "-3" },
];

const TABS = ["Weekly", "Monthly", "All Time"];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("Monthly");

  const top3 = LEADERBOARD_DATA.slice(0, 3);
  const rest = LEADERBOARD_DATA.slice(3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-extrabold uppercase tracking-widest">
          <Trophy size={14} /> Global Rankings
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight">
          BentoIQ Leaderboard
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
          The most accurate forecasters shaping the future of collective intelligence.
        </p>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] opacity-70 hover:text-[var(--text-secondary)]"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="leaderboard-tab"
                    className="absolute inset-0 rounded-xl bg-white/[0.1] shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Podium (Top 3) */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-6 pt-8 pb-4">
        {/* 2nd Place */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full md:w-64 order-2 md:order-1">
          <div className="glass-card p-6 border-slate-400/20 bg-gradient-to-t from-slate-400/[0.05] flex flex-col items-center text-center space-y-3 relative">
            <div className="absolute -top-6 w-12 h-12 rounded-full bg-slate-300 text-slate-800 flex items-center justify-center font-black text-lg shadow-xl shadow-slate-400/20 border-4 border-[var(--bg-base)]">
              2
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{top3[1].displayName}</h3>
              <p className="text-xs text-[var(--text-secondary)] opacity-70">@{top3[1].username}</p>
            </div>
            <div className="w-full pt-3 border-t border-white/[0.06] flex justify-between text-xs">
              <span className="text-emerald-400 font-bold">{top3[1].accuracy} Acc</span>
              <span className="text-[var(--text-primary)] font-mono">{top3[1].score}</span>
            </div>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full md:w-72 order-1 md:order-2 z-10">
          <div className="glass-card p-8 border-amber-500/30 bg-gradient-to-t from-amber-500/[0.1] flex flex-col items-center text-center space-y-4 relative md:-translate-y-8 shadow-2xl shadow-amber-500/10">
            <div className="absolute -top-8 w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 flex items-center justify-center font-black text-2xl shadow-xl shadow-amber-500/40 border-4 border-[var(--bg-base)]">
              <Crown size={24} className="mb-0.5" />
            </div>
            <div className="pt-6">
              <h3 className="text-xl font-black text-[var(--text-primary)]">{top3[0].displayName}</h3>
              <p className="text-sm font-semibold text-amber-400">@{top3[0].username}</p>
            </div>
            <div className="w-full pt-4 border-t border-amber-500/20 flex justify-between text-sm">
              <span className="text-emerald-400 font-black">{top3[0].accuracy} Acc</span>
              <span className="text-[var(--text-primary)] font-mono font-bold">{top3[0].score}</span>
            </div>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full md:w-64 order-3">
          <div className="glass-card p-6 border-orange-700/20 bg-gradient-to-t from-orange-700/[0.05] flex flex-col items-center text-center space-y-3 relative">
            <div className="absolute -top-6 w-12 h-12 rounded-full bg-orange-700 text-orange-100 flex items-center justify-center font-black text-lg shadow-xl shadow-orange-900/20 border-4 border-[var(--bg-base)]">
              3
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{top3[2].displayName}</h3>
              <p className="text-xs text-[var(--text-secondary)] opacity-70">@{top3[2].username}</p>
            </div>
            <div className="w-full pt-3 border-t border-white/[0.06] flex justify-between text-xs">
              <span className="text-emerald-400 font-bold">{top3[2].accuracy} Acc</span>
              <span className="text-[var(--text-primary)] font-mono">{top3[2].score}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rest of Leaderboard */}
      <div className="glass-card overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/[0.06] text-[10px] font-bold text-[var(--text-secondary)] opacity-70 uppercase tracking-widest">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5 sm:col-span-4">Forecaster</div>
          <div className="col-span-3 hidden sm:block text-right">Volume</div>
          <div className="col-span-3 text-right">Accuracy</div>
          <div className="col-span-3 sm:col-span-2 text-right">XP Score</div>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {rest.map((user) => (
            <Link key={user.rank} href={`/profile/${user.username}`} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors group">
              <div className="col-span-1 text-center text-xs font-bold text-[var(--text-secondary)] opacity-70 group-hover:text-[var(--text-secondary)]">
                {user.rank}
              </div>
              <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)]">
                  {user.displayName[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--text-primary)]">{user.displayName}</p>
                  <p className="text-[10px] text-[var(--text-secondary)] opacity-70">@{user.username}</p>
                </div>
              </div>
              <div className="col-span-3 hidden sm:block text-right text-xs font-medium text-[var(--text-secondary)]">
                {user.volume}
              </div>
              <div className="col-span-3 text-right text-xs font-bold text-emerald-400">
                {user.accuracy}
              </div>
              <div className="col-span-3 sm:col-span-2 text-right">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{user.score}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
