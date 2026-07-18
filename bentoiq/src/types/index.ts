// ─── User & Auth Types ────────────────────────────────────────────────────────
export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  walletAddress?: string;
  createdAt: string;
  updatedAt: string;
  stats: UserStats;
}

export interface UserStats {
  totalPredictions: number;
  correctPredictions: number;
  accuracy: number;
  totalEarnings: number;
  rank: number;
  reputation: number;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// ─── Market Types ─────────────────────────────────────────────────────────────
export type MarketOutcomeType = "binary" | "multiple" | "scalar";

export type MarketStatus = "active" | "resolved" | "pending" | "cancelled";

export type MarketCategory =
  | "technology"
  | "business"
  | "finance"
  | "science"
  | "politics"
  | "sports"
  | "culture"
  | "weather"
  | "crypto"
  | "other";

export interface MarketOutcome {
  id: string;
  label: string;
  probability: number;
  totalShares: number;
}

export interface Market {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: MarketCategory;
  status: MarketStatus;
  outcomeType: MarketOutcomeType;
  outcomes: MarketOutcome[];
  creatorId: string;
  creator: Pick<User, "id" | "username" | "displayName" | "avatarUrl">;
  totalVolume: number;
  totalLiquidity: number;
  participantCount: number;
  resolutionDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  aiSummary?: string;
}

export interface MarketPosition {
  marketId: string;
  market: Pick<Market, "id" | "title" | "status" | "category">;
  outcomeId: string;
  outcome: MarketOutcome;
  shares: number;
  avgPrice: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

// ─── Portfolio Types ──────────────────────────────────────────────────────────
export interface Portfolio {
  userId: string;
  totalValue: number;
  totalInvested: number;
  unrealizedPnl: number;
  realizedPnl: number;
  positions: MarketPosition[];
  performance: PortfolioPerformancePoint[];
}

export interface PortfolioPerformancePoint {
  date: string;
  value: number;
}

// ─── Leaderboard Types ────────────────────────────────────────────────────────
export interface LeaderboardEntry {
  rank: number;
  user: Pick<User, "id" | "username" | "displayName" | "avatarUrl">;
  score: number;
  accuracy: number;
  totalPredictions: number;
  earnings: number;
  change: "up" | "down" | "same";
  changeAmount: number;
}

// ─── Notification Types ───────────────────────────────────────────────────────
export type NotificationType =
  | "market_resolved"
  | "position_update"
  | "new_prediction"
  | "ai_insight"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// ─── AI Insight Types ─────────────────────────────────────────────────────────
export interface AIInsight {
  id: string;
  marketId: string;
  market: Pick<Market, "id" | "title">;
  summary: string;
  keyFactors: string[];
  sentiment: "bullish" | "bearish" | "neutral";
  confidenceScore: number;
  generatedAt: string;
}

// ─── API Response Wrapper ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  error?: ApiError;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// ─── UI State Types ───────────────────────────────────────────────────────────
export interface ModalState {
  id: string;
  isOpen: boolean;
  props?: Record<string, unknown>;
}

export interface ToastPayload {
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
}

// ─── Form Types ───────────────────────────────────────────────────────────────
export interface CreateMarketFormValues {
  title: string;
  description: string;
  category: MarketCategory;
  outcomeType: MarketOutcomeType;
  outcomes: { label: string }[];
  resolutionDate: string;
  tags: string[];
  initialLiquidity: number;
}
