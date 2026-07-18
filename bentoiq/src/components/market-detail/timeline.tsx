"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Calendar, ShieldCheck, Flag } from "lucide-react";

export interface TimelineNode {
  title: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  description: string;
}

const DEFAULT_TIMELINE_NODES: TimelineNode[] = [
  {
    title: "Market Initialization",
    date: "Jan 15, 2025",
    status: "completed",
    description: "Decision proposal created & liquidity pool seeded with 50,000 USDC.",
  },
  {
    title: "Current Forecast Momentum",
    date: "Active Today",
    status: "current",
    description: "Community consensus stabilized at 82% YES based on H1 research benchmarks.",
  },
  {
    title: "Milestone Benchmark Event",
    date: "Oct 30, 2025",
    status: "upcoming",
    description: "Official publication of annual technological evaluation benchmark reports.",
  },
  {
    title: "Forecast Closing Window",
    date: "Dec 15, 2026",
    status: "upcoming",
    description: "Final orderbook locking & prediction freeze phase.",
  },
  {
    title: "Settlement & Resolution",
    date: "Dec 31, 2026",
    status: "upcoming",
    description: "Oracle verification & outcome payout distribution.",
  },
];

export function Timeline({ nodes = DEFAULT_TIMELINE_NODES }: { nodes?: TimelineNode[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-6 md:p-8 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-blue-400" />
          <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
            Decision Timeline &amp; Milestones
          </h3>
        </div>
        <span className="text-xs text-[var(--text-secondary)] opacity-70">5 Stages</span>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/[0.08]">
        {nodes.map((node, idx) => {
          const isCompleted = node.status === "completed";
          const isCurrent = node.status === "current";

          return (
            <div key={node.title} className="relative group">
              {/* Node Icon Circle */}
              <div
                className={`absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? "bg-emerald-500 text-[var(--text-primary)] shadow-lg shadow-emerald-500/30"
                    : isCurrent
                    ? "bg-blue-600 text-[var(--text-primary)] shadow-lg shadow-blue-500/40 ring-4 ring-blue-500/20 animate-pulse"
                    : "bg-white/[0.06] border border-white/[0.12] text-[var(--text-secondary)] opacity-70"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={13} />
                ) : isCurrent ? (
                  <Clock size={13} />
                ) : (
                  <Flag size={12} />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                    {node.title}
                  </h4>
                  <span className="text-xs font-mono text-[var(--text-secondary)] opacity-70 font-medium">
                    {node.date}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {node.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
