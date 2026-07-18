// ─── App Meta ────────────────────────────────────────────────────────────────
export const APP_NAME = "BentoIQ" as const;
export const APP_TAGLINE = "Collective Intelligence for Better Decisions." as const;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const APP_VERSION = "0.1.0" as const;

// ─── Routes ──────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  MARKETS: "/markets",
  MARKET_DETAIL: (id: string) => `/markets/${id}`,
  CREATE_MARKET: "/markets/create",
  PORTFOLIO: "/portfolio",
  AI_INSIGHTS: "/insights",
  LEADERBOARD: "/leaderboard",
  PROFILE: (username: string) => `/profile/${username}`,
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",
  ADMIN: "/admin",
  AUTH_LOGIN: "/auth/login",
  AUTH_SIGNUP: "/auth/signup",
  AUTH_CALLBACK: "/auth/callback",
} as const;

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Dashboard",     href: ROUTES.DASHBOARD,     icon: "LayoutDashboard" },
  { label: "Markets",       href: ROUTES.MARKETS,       icon: "TrendingUp"      },
  { label: "Portfolio",     href: ROUTES.PORTFOLIO,     icon: "Briefcase"       },
  { label: "AI Insights",   href: ROUTES.AI_INSIGHTS,   icon: "Sparkles"        },
  { label: "Leaderboard",   href: ROUTES.LEADERBOARD,   icon: "Trophy"          },
] as const;

// ─── Market Categories ────────────────────────────────────────────────────────
export const MARKET_CATEGORIES = [
  { id: "technology",   label: "Technology",   color: "blue"   },
  { id: "business",     label: "Business",     color: "purple" },
  { id: "finance",      label: "Finance",      color: "emerald"},
  { id: "science",      label: "Science",      color: "cyan"   },
  { id: "politics",     label: "Politics",     color: "orange" },
  { id: "sports",       label: "Sports",       color: "red"    },
  { id: "culture",      label: "Culture",      color: "pink"   },
  { id: "weather",      label: "Weather",      color: "sky"    },
  { id: "crypto",       label: "Crypto",       color: "yellow" },
  { id: "other",        label: "Other",        color: "slate"  },
] as const;

export type MarketCategory = (typeof MARKET_CATEGORIES)[number]["id"];

// ─── Market Status ────────────────────────────────────────────────────────────
export const MARKET_STATUS = {
  ACTIVE:   "active",
  RESOLVED: "resolved",
  PENDING:  "pending",
  CANCELLED:"cancelled",
} as const;

export type MarketStatus = (typeof MARKET_STATUS)[keyof typeof MARKET_STATUS];

// ─── Pagination ───────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE     = 100;

// ─── Toast Durations (ms) ────────────────────────────────────────────────────
export const TOAST_DURATION = {
  SHORT:  2000,
  MEDIUM: 4000,
  LONG:   7000,
} as const;

// ─── Query Keys ──────────────────────────────────────────────────────────────
export const QUERY_KEYS = {
  MARKETS:        ["markets"]           as const,
  MARKET:         (id: string) => ["market", id]         as const,
  PORTFOLIO:      ["portfolio"]         as const,
  LEADERBOARD:    ["leaderboard"]       as const,
  NOTIFICATIONS:  ["notifications"]     as const,
  AI_INSIGHTS:    ["ai-insights"]       as const,
  USER_PROFILE:   (username: string) => ["user-profile", username] as const,
} as const;

// ─── Local Storage Keys ───────────────────────────────────────────────────────
export const LS_KEYS = {
  THEME:        "bentoiq:theme",
  SIDEBAR_OPEN: "bentoiq:sidebar-open",
  RECENT_VIEWS: "bentoiq:recent-views",
} as const;

// ─── Breakpoints (px) ────────────────────────────────────────────────────────
export const BREAKPOINTS = {
  SM:  640,
  MD:  768,
  LG:  1024,
  XL:  1280,
  XXL: 1536,
} as const;

// ─── Animation Durations (s) ─────────────────────────────────────────────────
export const ANIM = {
  FAST:   0.15,
  NORMAL: 0.25,
  SLOW:   0.4,
  PAGE:   0.35,
} as const;

// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";
