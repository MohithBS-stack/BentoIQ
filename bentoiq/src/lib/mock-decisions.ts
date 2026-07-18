export interface DecisionMarket {
  id: string;
  title: string;
  category: string;
  resolutionDate: string;
  timeRemaining: string;
  participantsCount: number;
  communityConfidence: number;
  aiConfidenceScore: number;
  aiConfidenceLabel: string;
  aiDecisionBrief: string;
  isTrending?: boolean;
  isAIPick?: boolean;
  isNew?: boolean;
  isEndingSoon?: boolean;
  volume: string;
  volumeNumber: number;
  commentsCount: number;
  sparkline: number[];
  keyDrivers: string[];
}

export const MOCK_DECISION_MARKETS: DecisionMarket[] = [];
