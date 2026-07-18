import { create } from "zustand";
import type { Market, MarketCategory, MarketStatus } from "@/types";

interface Filters {
  category: MarketCategory | "all";
  status: MarketStatus | "all";
  sortBy: "volume" | "recent" | "closing_soon" | "popular";
  searchQuery: string;
}

interface MarketsState {
  markets: Market[];
  featuredMarkets: Market[];
  filters: Filters;
  isLoading: boolean;
  error: string | null;
  // Actions
  setMarkets: (markets: Market[]) => void;
  setFeaturedMarkets: (markets: Market[]) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const DEFAULT_FILTERS: Filters = {
  category:    "all",
  status:      "active",
  sortBy:      "volume",
  searchQuery: "",
};

export const useMarketsStore = create<MarketsState>()((set) => ({
  markets:         [],
  featuredMarkets: [],
  filters:         DEFAULT_FILTERS,
  isLoading:       false,
  error:           null,

  setMarkets:         (markets)         => set({ markets }),
  setFeaturedMarkets: (featuredMarkets) => set({ featuredMarkets }),

  setFilters: (filters) =>
    set((s) => ({ filters: { ...s.filters, ...filters } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  setLoading: (isLoading) => set({ isLoading }),
  setError:   (error)     => set({ error }),
}));
