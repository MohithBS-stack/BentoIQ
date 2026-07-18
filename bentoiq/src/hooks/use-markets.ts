import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { marketsApi } from "@/services/markets.service";
import { QUERY_KEYS } from "@/lib/constants";
import type { GetMarketsParams } from "@/services/markets.service";
import type { Market } from "@/types";

/**
 * Fetch a paginated, filtered list of markets.
 */
export function useMarkets(params: GetMarketsParams = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.MARKETS, params],
    queryFn:  () => marketsApi.getMarkets(params),
    staleTime: 30_000,
  });
}

/**
 * Fetch a single market by ID or slug.
 */
export function useMarket(idOrSlug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.MARKET(idOrSlug),
    queryFn:  () => marketsApi.getMarket(idOrSlug),
    enabled:  !!idOrSlug,
  });
}

/**
 * Fetch featured / trending markets.
 */
export function useFeaturedMarkets() {
  return useQuery({
    queryKey: [...QUERY_KEYS.MARKETS, "featured"],
    queryFn:  marketsApi.getFeaturedMarkets,
    staleTime: 60_000,
  });
}

/**
 * Create a new prediction market.
 */
export function useCreateMarket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Market>) => marketsApi.createMarket(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MARKETS });
    },
  });
}
