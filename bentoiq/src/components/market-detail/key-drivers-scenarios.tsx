"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, ChevronDown, ShieldCheck, AlertTriangle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface KeyDriver {
  title: string;
  description: string;
  confidence: number;
  impact: "High" | "Medium" | "Low";
  isPositive: boolean;
}

export function DriverCard({ driver }: { driver: KeyDriver }) {
  return (
    <div className="glass-card p-4 space-y-2 border-white/[0.06] hover:border-white/[0.12] transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
              driver.isPositive
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/15 text-red-400 border border-red-500/30"
            }`}
          >
            {driver.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          </span>
          <h4 className="text-xs font-bold text-[var(--text-primary)]">{driver.title}</h4>
        </div>
        <Badge variant={driver.impact === "High" ? "purple" : "default"}>
          {driver.impact} Impact
        </Badge>
      </div>

      <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
        {driver.description}
      </p>

      <div className="flex items-center justify-between text-[11px] text-[var(--text-primary)]/35 pt-2 border-t border-white/[0.04]">
        <span>Confidence Index</span>
        <span className="font-semibold text-emerald-400">{driver.confidence}%</span>
      </div>
    </div>
  );
}

export function ScenarioCards() {
  const [activeTab, setActiveTab] = useState<"bull" | "bear">("bull");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card p-6 md:p-8 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-purple-400" />
          <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
            Scenario Analysis
          </h3>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-white/[0.05] border border-white/[0.08]">
          <button
            onClick={() => setActiveTab("bull")}
            className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "bull"
                ? "bg-emerald-500 text-[var(--text-primary)] shadow-md shadow-emerald-500/20"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Bull Case (82%)
          </button>
          <button
            onClick={() => setActiveTab("bear")}
            className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === "bear"
                ? "bg-red-500 text-[var(--text-primary)] shadow-md shadow-red-500/20"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Bear Case (18%)
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "bull" ? (
          <motion.div
            key="bull"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <ShieldCheck size={16} />
              <span>Bullish Convergence Factors</span>
            </div>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Accelerating compute efficiency and next-generation model architectures (such as sparse mixture of experts and test-time compute scaling) provide overwhelming structural tailwinds. Key industry partners are already committing unprecedented capital expenditure, confirming execution readiness ahead of schedule.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="bear"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-2xl bg-red-500/[0.04] border border-red-500/20 space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-red-400">
              <AlertTriangle size={16} />
              <span>Bearish Risk Constraints</span>
            </div>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Unforeseen regulatory delays or semiconductor fab yield bottlenecks could stall deployment by 6 to 12 months. Power grid capacity constraints in major datacenter hubs present an additional operational bottleneck that could defer final commercial rollouts.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
