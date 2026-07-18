import { apiClient } from "@/lib/api-client";
import type { ApiResponse, Market, PaginationMeta } from "@/types";

export interface GetMarketsParams {
  page?:      number;
  pageSize?:  number;
  category?:  string;
  status?:    string;
  sortBy?:    string;
  search?:    string;
}

export interface GetMarketsResponse {
  markets: Market[];
  meta:    PaginationMeta;
}

// ─── Markets API Service ──────────────────────────────────────────────────────
export const marketsApi = {
  /**
   * Fetch a paginated list of markets with optional filters.
   */
  getMarkets: async (
    params: GetMarketsParams = {}
  ): Promise<GetMarketsResponse> => {
    const { data } = await apiClient.get<ApiResponse<GetMarketsResponse>>(
      "/markets",
      { params }
    );
    return data.data;
  },

  /**
   * Fetch a single market by its ID or slug.
   */
  getMarket: async (idOrSlug: string): Promise<Market> => {
    const { data } = await apiClient.get<ApiResponse<Market>>(
      `/markets/${idOrSlug}`
    );
    return data.data;
  },

  /**
   * Create a new prediction market.
   * TODO: Connect to Bento SDK when implemented.
   */
  createMarket: async (
    payload: Partial<Market>
  ): Promise<Market> => {
    const { data } = await apiClient.post<ApiResponse<Market>>(
      "/markets",
      payload
    );
    return data.data;
  },

  /**
   * Fetch featured / trending markets.
   */
  getFeaturedMarkets: async (): Promise<Market[]> => {
    const { data } = await apiClient.get<ApiResponse<Market[]>>(
      "/markets/featured"
    );
    return data.data;
  },
};
