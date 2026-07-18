"use client";

import { motion } from "framer-motion";
import { Dna, Sparkles, TrendingUp, ShieldCheck, Activity, BarChart2 } from "lucide-react";

export interface DNAIndicator {
  label: string;
  value: number; // 0 - 100
  description: string;
  gradient: string;
  icon: React.ElementType;
}

const DEFAULT_DNA_METRICS: DNAIndicator[] = [
  {
    label: "Community Optimism",
    value: 84,
    description: "Strong bullish forecasting bias across expert participants",
    gradient: "from-blue-500 to-indigo-500",
    icon: TrendingUp,
  },
  {
    label: "Evidence Strength",
    value: 92,
    description: "Supported by 1.4K cross-referenced technical papers & benchmarks",
    gradient: "from-emerald-500 to-teal-400",
    icon: ShieldCheck,
  },
  {
    label: "Volatility Index",
    value: 28,
    description: "Low probability swings indicating steady thesis stability",
    gradient: "from-purple-500 to-pink-500",
    icon: Activity,
  },
  {
    label: "Consensus Stability",
    value: 89,
    description: "Sustained long-term directional agreement across forecasters",
    gradient: "from-cyan-500 to-blue-500",
    icon: BarChart2,
  },
  {
    label: "AI Confidence Score",
    value: 88,
    description: "High Gemini synthesis certainty score based on multi-source research",
    gradient: "from-amber-400 to-orange-500",
    icon: Sparkles,
  },
];

export function DecisionDNA({ metrics = DEFAULT_DNA_METRICS }: { metrics?: DNAIndicator[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card p-6 md:p-8 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Dna size={18} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
              Decision DNA
            </h3>
            <p className="text-xs text-[var(--text-secondary)] opacity-70">
              Multi-dimensional intelligence metrics synthesized by BentoIQ
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/[0.05] text-[var(--text-secondary)]">
          Signature Index
        </span>
      </div>

      <div className="space-y-5">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="space-y-1.5 group">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-[var(--text-secondary)] opacity-70 group-hover:text-blue-400 transition-colors" />
                  <span className="font-bold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {metric.label}
                  </span>
                </div>
                <span className="font-extrabold text-[var(--text-primary)] font-mono text-xs">
                  {metric.value}%
                </span>
              </div>

              {/* Custom Indicator Bar */}
              <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden p-0.5 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full rounded-full bg-gradient-to-r ${metric.gradient} shadow-lg`}
                  style={{
                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
                  }}
                />
              </div>

              <p className="text-[11px] text-[var(--text-primary)]/35 font-normal transition-colors group-hover:text-[var(--text-secondary)]">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
