"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Clock, Users, MessageSquare, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingBadgeProps {
  label?: string;
  variant?: "flame" | "ai" | "new";
}

export function TrendingBadge({ label = "Trending", variant = "flame" }: TrendingBadgeProps) {
  if (variant === "ai") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
        <Sparkles size={11} className="text-purple-400 animate-pulse" />
        {label}
      </span>
    );
  }

  if (variant === "new") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
        {label}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
      <Flame size={11} className="text-amber-400 animate-bounce" />
      {label}
    </span>
  );
}

interface CategoryChipProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  count?: number;
}

export function CategoryChip({ label, isSelected, onClick, count }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 select-none cursor-pointer border",
        isSelected
          ? "bg-white/[0.12] text-[var(--text-primary)] border-white/[0.25] shadow-lg shadow-blue-500/10"
          : "bg-white/[0.03] text-[var(--text-secondary)] border-white/[0.06] hover:text-[var(--text-primary)] hover:bg-white/[0.06] hover:border-white/[0.12]"
      )}
    >
      {isSelected && (
        <motion.div
          layoutId="category-chip-active"
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 pointer-events-none"
          transition={{ duration: 0.2 }}
        />
      )}
      <span className="relative z-10">{label}</span>
      {count !== undefined && (
        <span className={cn("relative z-10 text-[10px] px-1.5 py-0.2 rounded-md font-mono", isSelected ? "bg-white/20 text-[var(--text-primary)]" : "bg-white/5 text-[var(--text-secondary)] opacity-70")}>
          {count}
        </span>
      )}
    </button>
  );
}

interface DecisionMetaProps {
  timeRemaining: string;
  participantsCount: number;
  volume: string;
  commentsCount: number;
}

export function DecisionMeta({
  timeRemaining,
  participantsCount,
  volume,
  commentsCount,
}: DecisionMetaProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)] opacity-70 pt-3 border-t border-white/[0.05]">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 hover:text-[var(--text-secondary)] transition-colors">
          <Clock size={13} className="text-[var(--text-secondary)] opacity-70" />
          {timeRemaining}
        </span>
        <span className="flex items-center gap-1.5 hover:text-[var(--text-secondary)] transition-colors">
          <Users size={13} className="text-[var(--text-secondary)] opacity-70" />
          {participantsCount.toLocaleString()} participants
        </span>
      </div>

      <div className="flex items-center gap-4 font-medium">
        <span className="flex items-center gap-1 text-[var(--text-secondary)]">
          <BarChart3 size={13} className="text-blue-400" />
          {volume}
        </span>
        <span className="flex items-center gap-1 hover:text-[var(--text-secondary)] transition-colors">
          <MessageSquare size={13} className="text-[var(--text-secondary)] opacity-70" />
          {commentsCount}
        </span>
      </div>
    </div>
  );
}
