"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Clock,
  Sparkles,
  MessageSquare,
  Zap,
  Layers,
  Search,
} from "lucide-react";
import { DecisionCard } from "@/components/feed/decision-card";
import { FloatingSearch } from "@/components/feed/floating-search";
import { CategoryChip } from "@/components/ui/feed-components";
import {
  MarketPulse,
  AISummaryCard,
  ActivityItem,
  TopPredictors,
} from "@/components/feed/right-panel-components";
import { MarketCardSkeleton, EmptyState } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { publicBentoSdk } from "@/lib/bento-client";
import { devLog } from "@/lib/logger";

const DISCOVERY_TABS = [
  { id: "trending", label: "Trending", icon: Flame },
  { id: "ai-picks", label: "AI Picks", icon: Sparkles },
  { id: "ending-soon", label: "Ending Soon", icon: Clock },
  { id: "discussed", label: "Most Discussed", icon: MessageSquare },
  { id: "newest", label: "Newest", icon: Zap },
];

const CATEGORIES = [
  "All",
  "Technology",
  "Finance",
  "Sports",
  "Climate",
  "Politics",
  "Healthcare",
  "Crypto",
  "AI",
  "Community",
];

const MOCK_LIVE_ACTIVITIES = [
  { user: "alex_quant", action: "forecasted YES", market: "GPT-6 Benchmarks", amount: "500 USDC", time: "1m ago" },
  { user: "sarah_tech", action: "forecasted NO", market: "Apple Foldable 2026", amount: "250 USDC", time: "3m ago" },
];

export default function MarketsFeedPage() {
  const [activeTab, setActiveTab] = useState("trending");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: marketsResponse, isLoading, error } = useQuery({
    queryKey: ["markets-list"],
    queryFn: async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BENTO_URL ?? process.env.BENTO_URL ?? "https://internal-server.bento.fun"}/markets`;
        devLog("Fetching markets from", url);
        
        const data = await publicBentoSdk.public.markets.list();
        devLog("✓ Markets fetch response status: success");
        devLog("✓ Number of markets returned", data?.data?.length || 0);
        return data;
      } catch (err: any) {
        devLog("Error fetching markets", err?.message || err);
        throw err;
      }
    },
  });

  const allMarkets = marketsResponse?.data || [];

  // Filter decisions dynamically
  const filteredDecisions = useMemo(() => {
    return allMarkets.filter((item: any) => {
      // Category Filter (Bento often returns different category structures, fallback to All for now or check ID)
      const cat = item.categoryId || "Crypto";
      if (selectedCategory !== "All" && cat !== selectedCategory) {
        return false;
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (item.title || "").toLowerCase().includes(q);
        const matchCategory = cat.toLowerCase().includes(q);
        if (!matchTitle && !matchCategory) return false;
      }

      // Tab Filter (Very basic simulation based on real data fields)
      if (activeTab === "discussed") return false; // Not implemented on testnet usually
      
      return true;
    });
  }, [activeTab, selectedCategory, searchQuery, allMarkets]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pt-2">
        <FloatingSearch onSearch={setSearchQuery} />
      </div>

      <div className="flex items-center justify-between border-b-4 border-[var(--text-primary)] pb-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {DISCOVERY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-none text-xs font-black uppercase tracking-widest transition-all duration-200 border-2 ${
                  isActive ? "bg-[var(--text-primary)] text-[var(--bg-elevated)] border-[var(--text-primary)] shadow-[4px_4px_0px_#111111] translate-y-[-2px]" : "bg-transparent text-[var(--text-secondary)] border-transparent hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon size={14} className={isActive ? "text-[var(--bg-elevated)]" : "text-[var(--text-secondary)]"} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-[var(--text-primary)] font-black uppercase tracking-widest pl-4">
          <Layers size={13} />
          <span>{filteredDecisions.length} Markets</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            isSelected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-5">
          {isLoading ? (
            <div className="space-y-4">
              <MarketCardSkeleton />
              <MarketCardSkeleton />
              <MarketCardSkeleton />
            </div>
          ) : filteredDecisions.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {filteredDecisions.map((decision: any) => (
                <DecisionCard key={decision.duelId || decision.id} market={decision} />
              ))}
            </AnimatePresence>
          ) : error ? (
            <EmptyState
              icon={<Search size={28} className="text-[var(--rose)]" />}
              title="Failed to load markets"
              description={error instanceof Error ? error.message : "An unknown error occurred while communicating with the Bento API."}
              actionLabel="Try Again"
              onAction={() => {
                window.location.reload();
              }}
            />
          ) : (
            <EmptyState
              icon={<Search size={28} className="text-[var(--text-secondary)]" />}
              title="No markets found"
              description="Try adjusting your filter category or search keywords to explore more predictions."
              actionLabel="Reset Filters"
              onAction={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setActiveTab("trending");
              }}
            />
          )}
        </div>

        <div className="hidden lg:block lg:col-span-4 space-y-6 sticky top-20">
          <AISummaryCard />
          <MarketPulse />
          <TopPredictors />

          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between mb-2 border-b-2 border-[var(--text-primary)] pb-2">
              <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">
                Live Forecast Feed
              </h3>
              <span className="w-2 h-2 rounded-none bg-[var(--emerald)] border border-[var(--text-primary)] animate-ping" />
            </div>
            <div className="space-y-3">
              {MOCK_LIVE_ACTIVITIES.map((act, idx) => (
                <ActivityItem key={idx} {...act} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
