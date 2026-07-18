import { apiClient } from "@/lib/api-client";
import type { ApiResponse, AIInsight } from "@/types";

export const aiApi = {
  /**
   * Fetch AI-generated insight for a specific market.
   */
  getMarketInsight: async (marketId: string): Promise<AIInsight> => {
    const { data } = await apiClient.get<ApiResponse<AIInsight>>(
      `/ai/insights/${marketId}`
    );
    return data.data;
  },

  /**
   * Fetch all AI insights feed.
   */
  getInsightsFeed: async (): Promise<AIInsight[]> => {
    const { data } = await apiClient.get<ApiResponse<AIInsight[]>>(
      "/ai/insights"
    );
    return data.data;
  },
};
