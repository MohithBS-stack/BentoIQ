"use client";

import Link from "next/link";
import { ThumbsUp, ShieldCheck, Pin, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface CommunityInsight {
  id: string;
  author: string;
  avatar: string;
  isVerified?: boolean;
  isPinned?: boolean;
  confidence: number;
  reasoning: string;
  upvotes: number;
  timestamp: string;
}

export const MOCK_COMMUNITY_INSIGHTS: CommunityInsight[] = [
  {
    id: "c-1",
    author: "satoshi_99",
    avatar: "S",
    isVerified: true,
    isPinned: true,
    confidence: 88,
    reasoning:
      "Having analyzed the Q2 chip shipment manifests and cloud datacenter power reservations, the 2026 deployment window is virtually locked in.",
    upvotes: 142,
    timestamp: "2h ago",
  },
  {
    id: "c-2",
    author: "quant_alpha",
    avatar: "Q",
    isVerified: true,
    confidence: 76,
    reasoning:
      "Market probability has been systematically underpricing test-time compute efficiency gains. Expecting a sharp re-pricing upward as benchmark reports publish.",
    upvotes: 89,
    timestamp: "5h ago",
  },
  {
    id: "c-3",
    author: "tech_macro",
    avatar: "T",
    confidence: 65,
    reasoning:
      "The tech is ready, but corporate compliance frameworks are moving slowly. Slight caution on exact month resolution.",
    upvotes: 34,
    timestamp: "8h ago",
  },
];

export function CommunityInsightCard({ insight }: { insight: CommunityInsight }) {
  return (
    <div className="glass-card p-5 space-y-3 border-white/[0.06] hover:border-white/[0.12] transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-[var(--text-primary)] text-xs">
            {insight.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[var(--text-primary)]">@{insight.author}</span>
              {insight.isVerified && (
                <ShieldCheck size={13} className="text-blue-400" />
              )}
            </div>
            <span className="text-[10px] text-[var(--text-primary)]/35">{insight.timestamp}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {insight.isPinned && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Pin size={10} /> Pinned
            </span>
          )}
          <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl">
            {insight.confidence}% YES
          </span>
        </div>
      </div>

      <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
        &ldquo;{insight.reasoning}&rdquo;
      </p>

      <div className="flex items-center justify-between text-xs text-[var(--text-primary)]/35 pt-2 border-t border-white/[0.04]">
        <button className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors">
          <ThumbsUp size={13} />
          <span>{insight.upvotes} Helpful</span>
        </button>
        <span className="text-[10px]">Bento Verified Forecast</span>
      </div>
    </div>
  );
}

export interface RelatedDecision {
  id: string;
  title: string;
  category: string;
  confidence: number;
  volume: string;
}

export const MOCK_RELATED_DECISIONS: RelatedDecision[] = [
  {
    id: "dec-19",
    title: "Will open-source LLMs match GPT-4o capabilities on MMLU by end of 2025?",
    category: "AI",
    confidence: 94,
    volume: "$670K",
  },
  {
    id: "dec-29",
    title: "Will quantum computers demonstrate supremacy on industry algorithms by 2027?",
    category: "Technology",
    confidence: 73,
    volume: "$520K",
  },
  {
    id: "dec-22",
    title: "Will an AI agent autonomously manage a >$100M hedge fund portfolio in 2026?",
    category: "AI",
    confidence: 72,
    volume: "$430K",
  },
];

export function RelatedDecisionCard({ item }: { item: RelatedDecision }) {
  return (
    <Link
      href={`/markets/${item.id}`}
      className="glass-card p-5 space-y-3 min-w-[280px] max-w-[320px] hover:border-white/[0.14] transition-all flex-shrink-0 group"
    >
      <div className="flex justify-between text-xs">
        <Badge variant="blue">{item.category}</Badge>
        <span className="font-bold text-emerald-400">{item.confidence}% YES</span>
      </div>
      <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] line-clamp-2 leading-snug">
        {item.title}
      </h4>
      <div className="flex justify-between items-center text-[11px] text-[var(--text-primary)]/35 pt-2 border-t border-white/[0.04]">
        <span>Vol: {item.volume}</span>
        <span className="text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
          View <ArrowRight size={11} />
        </span>
      </div>
    </Link>
  );
}
