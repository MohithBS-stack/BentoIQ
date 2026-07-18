"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

interface ExecutiveBriefProps {
  summary?: string;
  generatedTime?: string;
  confidenceLevel?: string;
  reasoningQuality?: string;
}

export function ExecutiveBrief({
  summary = "Community forecasting currently leans strongly toward success. Growing confidence is driven by accelerating technological progress, increased R&D investment, and positive historical trend alignment. Primary uncertainty remains regulatory approval timelines and hardware yield scaling.",
  generatedTime = "Generated 2 min ago",
  confidenceLevel = "High AI Consensus (88%)",
  reasoningQuality = "Grade A+ (1.4K Sources)",
}: ExecutiveBriefProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 md:p-8 relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-purple-500/[0.05] via-blue-500/[0.03] to-transparent shadow-2xl"
    >
      {/* Background Animated Ambient Light */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge & Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <Sparkles size={13} className="text-purple-400 animate-pulse" />
          <span>Gemini AI Synthesis</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] opacity-70">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {generatedTime}
          </span>
          <span className="hidden sm:inline text-[var(--text-secondary)] opacity-70">•</span>
          <span className="hidden sm:flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle2 size={12} /> {reasoningQuality}
          </span>
        </div>
      </div>

      <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
        Executive Brief
      </h2>

      {/* AI Summary Text */}
      <p className="text-sm md:text-base text-[var(--text-primary)] leading-relaxed font-normal mb-6">
        &ldquo;{summary}&rdquo;
      </p>

      {/* Supporting Meta Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.06] text-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-[var(--text-primary)]/35 tracking-wider">
            Confidence Index
          </span>
          <p className="font-semibold text-purple-300 flex items-center gap-1">
            <Brain size={13} />
            {confidenceLevel}
          </p>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-[var(--text-primary)]/35 tracking-wider">
            Evidence Quality
          </span>
          <p className="font-semibold text-emerald-400 flex items-center gap-1">
            <ShieldCheck size={13} />
            Verified (1,420 Data Points)
          </p>
        </div>

        <div className="col-span-2 sm:col-span-1 space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-[var(--text-primary)]/35 tracking-wider">
            Model Consensus
          </span>
          <p className="font-semibold text-blue-400">
            Unanimous Positive Bias
          </p>
        </div>
      </div>
    </motion.div>
  );
}
