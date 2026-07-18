"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Brain,
  ShieldCheck,
} from "lucide-react";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { PredictionSparkline } from "@/components/ui/prediction-sparkline";
import { TrendingBadge, DecisionMeta } from "@/components/ui/feed-components";
import { ROUTES } from "@/lib/constants";

export function DecisionCard({ market }: { market: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Map Bento SDK MarketSummary to UI components
  // Fallback values if fields are missing or named differently
  const title = market.title || market.question || market.betString || "Untitled Market";
  const category = market.categoryId || market.category || "General";
  const isTrending = market.isTrending ?? (Number(market.totalVolume || market.totalBetAmountUSDC || 0) > 1000);
  const isAIPick = false; // Demo
  
  // Calculate probability from option pools if available, fallback to 50
  let yesProbability = 50;
  if (market.options && market.options.length >= 2) {
    const pool0 = Number(market.options[0]?.poolAmount || market.liquidityBreakdown?.option0?.usdcAmount || 0);
    const pool1 = Number(market.options[1]?.poolAmount || market.liquidityBreakdown?.option1?.usdcAmount || 0);
    const total = pool0 + pool1;
    if (total > 0) {
      yesProbability = Math.round((pool0 / total) * 100);
    }
  } else if (market.probability) {
    yesProbability = market.probability;
  }

  const volume = `${market.totalVolume || market.totalBetAmountUSDC || market.volume || 0} USDC`;
  const participantsCount = market.participantCount || market.uniqueParticipants || market.participants || 0;
  const commentsCount = market.commentsCount || 0;
  
  const endTime = market.endTime && market.endTime < 10_000_000_000 ? market.endTime * 1000 : market.endTime;
  const timeRemaining = endTime ? new Date(endTime).toLocaleDateString() : (market.endingIn || "Live");

  const sparklineData = market.sparkline || [40, 42, 45, 48, 52, 58, 62, 65, 70, 75];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-none bg-[var(--bg-elevated)] border-2 border-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-300 shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] overflow-hidden"
    >
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-none bg-[var(--text-primary)] text-[var(--bg-elevated)] border-2 border-[var(--text-primary)] text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_#111111]">
              {category}
            </span>
            {isTrending && <TrendingBadge variant="flame" label="Trending" />}
            {isAIPick && <TrendingBadge variant="ai" label="AI Top Choice" />}
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[var(--bg-base)] px-2.5 py-1 rounded-none border-2 border-[var(--text-primary)] shadow-[2px_2px_0px_#111111]">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">Trend</span>
            <PredictionSparkline data={sparklineData} width={50} height={18} color="var(--bauhaus-blue)" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-8 space-y-3">
            <Link href={`/markets/${market.duelId || market.id}`}>
              <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)] uppercase tracking-tighter hover:text-[var(--bauhaus-blue)] transition-colors leading-tight">
                {title}
              </h3>
            </Link>

            <div className="p-3.5 rounded-none bg-[var(--bauhaus-yellow)] border-2 border-[var(--text-primary)] shadow-[3px_3px_0px_#111111]">
              <div className="flex items-center gap-1.5 text-xs font-black text-[var(--text-primary)] uppercase tracking-widest mb-1">
                <Brain size={14} className="text-[var(--text-primary)]" />
                <span>AI Decision Brief</span>
                <span className="text-[10px] font-bold text-[var(--text-secondary)] ml-auto">
                  {market.aiConfidenceLabel || "Processing"}
                </span>
              </div>
              <p className="text-xs text-[var(--text-primary)] font-bold leading-relaxed">
                {market.aiDecisionBrief || "Live data feed analysis in progress. AI signals are currently syncing with testnet activity."}
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-none bg-[var(--bg-base)] border-2 border-[var(--text-primary)] shadow-[3px_3px_0px_#111111]">
            <ConfidenceRing
              percentage={yesProbability}
              size={76}
              strokeWidth={7}
              label="Probability"
              colorScheme={yesProbability >= 70 ? "emerald" : yesProbability >= 50 ? "blue" : "amber"}
            />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex justify-between text-xs font-black uppercase tracking-widest">
            <span className="text-[var(--text-primary)] bg-[var(--emerald)] px-2 py-0.5 border-2 border-[var(--text-primary)]">
              YES {yesProbability}%
            </span>
            <span className="text-[var(--bg-elevated)] bg-[var(--bauhaus-red)] px-2 py-0.5 border-2 border-[var(--text-primary)]">
              NO {100 - yesProbability}%
            </span>
          </div>
          <div className="w-full h-3 bg-[var(--bg-base)] border-2 border-[var(--text-primary)] flex">
            <div className="h-full bg-[var(--emerald)] transition-all duration-500 border-r-2 border-[var(--text-primary)]" style={{ width: `${yesProbability}%` }} />
            <div className="h-full bg-[var(--bauhaus-red)] transition-all duration-500" style={{ width: `${100 - yesProbability}%` }} />
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-4 pt-4 border-t-2 border-[var(--text-primary)]"
            >
              <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest mb-2">
                Key Decision Drivers
              </h4>
              <ul className="space-y-2">
                {(market.keyDrivers || ["On-chain activity driving momentum.", "Liquidity pool stabilized."]).map((driver: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                    <ShieldCheck size={13} className="text-[var(--bauhaus-blue)] flex-shrink-0" />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 pt-4 border-t-2 border-[var(--text-primary)] flex flex-wrap items-center justify-between gap-3">
          <DecisionMeta
            timeRemaining={timeRemaining}
            participantsCount={participantsCount}
            volume={volume}
            commentsCount={commentsCount}
          />

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1.5 rounded-none bg-[var(--bg-base)] border-2 border-[var(--text-primary)] text-xs font-black uppercase tracking-widest text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-elevated)] transition-colors flex items-center gap-1"
            >
              <span>{isExpanded ? "Less" : "Drivers"}</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </button>

            <Link
              href={`/markets/${market.duelId || market.id}`}
              className="btn-accent flex items-center gap-1.5 px-4 py-1.5 !text-xs !py-1.5"
            >
              View Details
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
