"use client";

import { motion } from "framer-motion";
import { LineChart, BarChart3, PieChart, Activity, Calendar, ArrowUpRight, TrendingUp } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Platform Analytics
        </h1>
        <button className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-semibold text-[var(--text-secondary)] hover:bg-white/[0.1] transition-colors">
          Download Report
        </button>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Volume", value: "$12.4M", trend: "+14%", icon: Activity, color: "blue" },
          { label: "Active Markets", value: "342", trend: "+24", icon: BarChart3, color: "emerald" },
          { label: "Avg Resolution", value: "14 Days", trend: "-2", icon: Calendar, color: "amber" },
          { label: "AI Accuracy", value: "91.2%", trend: "+1.4%", icon: TrendingUp, color: "purple" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500/15 flex items-center justify-center text-${stat.color}-400`}>
                  <Icon size={16} />
                </div>
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                  <ArrowUpRight size={12} /> {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-secondary)] opacity-70 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forecast Trend Chart (Mock) */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <LineChart size={16} className="text-blue-400" /> Forecast Volume Trend
            </h3>
          </div>
          <div className="h-48 relative flex items-end justify-between border-b border-l border-white/[0.08] p-4">
            {/* Mock Line (SVG) */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,60 T500,40" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              <path d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,60 T500,40 L500,200 L0,200 Z" fill="url(#blue-grad)" />
              <defs>
                <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
              </defs>
            </svg>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <span key={i} className="text-[10px] text-[var(--text-secondary)] opacity-70 absolute bottom-[-20px]" style={{ left: `${(i / 6) * 100}%`, transform: 'translateX(-50%)' }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Category Distribution (Mock) */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <PieChart size={16} className="text-purple-400" /> Category Distribution
            </h3>
          </div>
          <div className="flex items-center gap-6">
            {/* Mock Donut */}
            <div className="relative w-32 h-32 rounded-full border-[12px] border-white/[0.04] flex-shrink-0 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="60 100" />
                <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="25 100" strokeDashoffset="-60" />
                <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="15 100" strokeDashoffset="-85" />
              </svg>
              <div className="text-center">
                <span className="block text-xs font-bold text-[var(--text-secondary)] opacity-70">Total</span>
                <span className="block text-sm font-extrabold text-[var(--text-primary)]">342</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
              {[
                { name: "AI & Tech", value: "60%", color: "bg-blue-500" },
                { name: "Finance & Crypto", value: "25%", color: "bg-purple-500" },
                { name: "Climate & Science", value: "15%", color: "bg-emerald-500" },
              ].map((c) => (
                <div key={c.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${c.color}`} />
                    <span className="text-[var(--text-secondary)] font-medium">{c.name}</span>
                  </div>
                  <span className="font-bold text-[var(--text-primary)]">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Heatmap (Mock) */}
        <div className="lg:col-span-2 glass-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Activity size={16} className="text-emerald-400" /> Platform Activity Heatmap
            </h3>
          </div>
          <div className="flex flex-col gap-1 overflow-x-auto pb-2 no-scrollbar">
            {Array.from({ length: 7 }).map((_, r) => (
              <div key={r} className="flex gap-1">
                {Array.from({ length: 40 }).map((_, c) => {
                  const val = Math.random();
                  let color = "bg-white/[0.02]";
                  if (val > 0.8) color = "bg-emerald-400";
                  else if (val > 0.6) color = "bg-emerald-500/70";
                  else if (val > 0.4) color = "bg-emerald-600/40";
                  else if (val > 0.2) color = "bg-emerald-700/20";
                  
                  return <div key={c} className={`w-3 h-3 rounded-sm ${color}`} />;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
