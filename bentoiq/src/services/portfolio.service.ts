import { apiClient } from "@/lib/api-client";
import type { ApiResponse, Portfolio } from "@/types";

export const portfolioApi = {
  /**
   * Fetch the authenticated user's portfolio.
   */
  getPortfolio: async (): Promise<Portfolio> => {
    const { data } = await apiClient.get<ApiResponse<Portfolio>>("/portfolio");
    return data.data;
  },
};
