"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Clock,
  Users,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Brain,
} from "lucide-react";
import { ConfidenceRing } from "@/components/ui/confidence-ring";
import { ExecutiveBrief } from "@/components/market-detail/executive-brief";
import { DecisionDNA } from "@/components/market-detail/decision-dna";
import { Timeline } from "@/components/market-detail/timeline";
import { DriverCard, ScenarioCards, type KeyDriver } from "@/components/market-detail/key-drivers-scenarios";
import {
  CommunityInsightCard,
  RelatedDecisionCard,
  MOCK_COMMUNITY_INSIGHTS,
  MOCK_RELATED_DECISIONS,
} from "@/components/market-detail/community-and-related";
import { PredictionPanel } from "@/components/market-detail/prediction-panel";
import { ROUTES } from "@/lib/constants";
import { toastSuccess } from "@/lib/toast";
import { useQuery } from "@tanstack/react-query";
import { publicBentoSdk } from "@/lib/bento-client";
import { devLog } from "@/lib/logger";

const SAMPLE_DRIVERS: KeyDriver[] = [
  {
    title: "On-Chain Resolution Dynamics",
    description: "Bento SDK oracle integration ensures transparent and immediate payout upon expiration.",
    confidence: 92,
    impact: "High",
    isPositive: true,
  },
  {
    title: "Prediction Market Liquidity",
    description: "Sufficient TVL on Bento Testnet ensures minimum slippage for traders.",
    confidence: 88,
    impact: "High",
    isPositive: true,
  },
];

export default function MarketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: rawDecision, isLoading, error } = useQuery({
    queryKey: ["market", id],
    queryFn: async () => {
      try {
        const data = await publicBentoSdk.public.markets.getById({ marketId: id });
        devLog("✓ Market detail fetched", { id, title: (data as any)?.title || (data as any)?.betString });
        return data;
      } catch (err: any) {
        devLog("Error fetching market details", err?.message || err);
        throw err;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-sm font-black text-[var(--text-secondary)] uppercase tracking-widest border-4 border-dashed border-[var(--border-subtle)] mt-8">
        Loading Bento Market Data...
      </div>
    );
  }

  if (error || !rawDecision) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-xl font-black text-[var(--rose)] uppercase tracking-widest mb-4">
          {error ? "Failed to Load Market" : "Market Not Found"}
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          {error instanceof Error ? error.message : "The requested market could not be retrieved."}
        </p>
      </div>
    );
  }

  const decision = rawDecision as any;
  const title = decision.title || decision.question || decision.betString || "Untitled Market";
  const category = decision.categoryId || decision.category || "General";
  const participantsCount = decision.participantCount || decision.participants || decision.numParticipants || 0;
  const volume = `${decision.totalVolume || decision.volume || decision.totalLiquidity || 0} USDC`;
  const timeRemaining = decision.endTime ? new Date(decision.endTime).toLocaleDateString() : (decision.endingIn || "Live");
  const resolutionDate = timeRemaining;

  let yesProbability = 50;
  if (decision.options && decision.options.length >= 2 && typeof decision.options[0] !== 'string') {
    const pool0 = Number(decision.options[0]?.poolAmount || 0);
    const pool1 = Number(decision.options[1]?.poolAmount || 0);
    const total = pool0 + pool1;
    if (total > 0) {
      yesProbability = Math.round((pool0 / total) * 100);
    }
  } else if (decision.probability) {
    yesProbability = decision.probability;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[var(--text-primary)] pb-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">
          <Link href={ROUTES.MARKETS} className="hover:text-[var(--text-primary)] transition-colors border-2 border-transparent hover:border-[var(--text-primary)] px-2 py-1">
            Markets
          </Link>
          <ChevronRight size={12} className="text-[var(--text-primary)]" />
          <span className="text-[var(--text-secondary)] px-2 py-1 bg-[var(--bg-elevated)] border-2 border-[var(--text-primary)] shadow-[2px_2px_0px_#111111]">{category}</span>
          <ChevronRight size={12} className="text-[var(--text-primary)]" />
          <span className="text-[var(--text-primary)] max-w-[200px] sm:max-w-xs truncate border-b-2 border-[var(--text-primary)]">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toastSuccess("Bookmarked Decision")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[var(--bg-base)] border-2 border-[var(--text-primary)] text-xs font-black uppercase tracking-widest text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-elevated)] transition-colors shadow-[2px_2px_0px_#111111]"
          >
            <Bookmark size={14} /> Bookmark
          </button>
          <button
            onClick={() => toastSuccess("Link copied to clipboard")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[var(--bg-base)] border-2 border-[var(--text-primary)] text-xs font-black uppercase tracking-widest text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-elevated)] transition-colors shadow-[2px_2px_0px_#111111]"
          >
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      {/* Main Top Title Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-none bg-[var(--bauhaus-blue)] border-2 border-[var(--text-primary)] text-xs font-black uppercase tracking-widest text-white shadow-[3px_3px_0px_#111111]">
            {category}
          </span>
          <span className="px-3 py-1 rounded-none bg-[var(--emerald)] border-2 border-[var(--text-primary)] text-xs font-black uppercase tracking-widest text-[var(--text-primary)] flex items-center gap-1 shadow-[3px_3px_0px_#111111]">
            <CheckCircle2 size={12} /> Active Forecast
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-auto border-2 border-dashed border-[var(--text-primary)] px-2 py-1">
            Ending in {timeRemaining}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[var(--text-primary)] leading-tight tracking-tighter">
          {title}
        </h1>

        {/* Header Stats Row */}
        <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] border-t-2 border-[var(--text-primary)]">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-[var(--bauhaus-red)]" /> Res: {resolutionDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-[var(--bauhaus-blue)]" /> {participantsCount.toLocaleString()} Forecasters
          </span>
          <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
            <BarChart3 size={14} className="text-[var(--emerald)]" /> Vol: {volume}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Intelligence Report Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <ExecutiveBrief summary={decision.aiDecisionBrief || "Live data feed analysis in progress. AI signals are currently syncing with testnet activity."} />

          <DecisionDNA />

          <div className="glass-card p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[var(--bauhaus-yellow)]">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] border-b-2 border-[var(--text-primary)] pb-1 inline-block">
                Consensus Metrics
              </span>
              <h3 className="text-xl font-black uppercase tracking-tighter text-[var(--text-primary)] leading-tight">
                Community Confidence &amp; Model Alignment
              </h3>
              <p className="text-xs font-bold text-[var(--text-primary)] max-w-md mt-2">
                Live probability consensus aggregated from Bento Testnet participants.
              </p>
            </div>

            <ConfidenceRing
              percentage={yesProbability}
              size={110}
              strokeWidth={9}
              label="Confidence"
              colorScheme="emerald"
            />
          </div>

          <Timeline />

          <div className="space-y-4">
            <h3 className="text-base font-black uppercase tracking-widest text-[var(--text-primary)] border-b-2 border-[var(--text-primary)] pb-2">
              Key Decision Drivers
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {SAMPLE_DRIVERS.map((driver, idx) => (
                <DriverCard key={idx} driver={driver} />
              ))}
            </div>
          </div>

          <ScenarioCards />

        </div>

        {/* Right Sticky Prediction Panel Column (4 cols) */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">
          <PredictionPanel marketId={decision.duelId || id} title={title} />
        </div>
      </div>
    </div>
  );
}
