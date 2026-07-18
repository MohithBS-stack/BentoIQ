/**
 * BentoIQ — Supabase Schema Reference
 *
 * This file documents the expected Supabase table structure.
 * Run these SQL statements in the Supabase SQL editor to set up the database.
 *
 * NOTE: This is documentation-as-code. The actual migrations should be in
 * supabase/migrations/ when you initialize the Supabase CLI project.
 */

export const SCHEMA_DOCS = `
-- ─── Users ────────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id         UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username        TEXT UNIQUE NOT NULL,
  display_name    TEXT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  avatar_url      TEXT,
  bio             TEXT,
  wallet_address  TEXT UNIQUE,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ─── Markets ──────────────────────────────────────────────────────────────────
CREATE TABLE markets (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  description      TEXT NOT NULL,
  category         TEXT NOT NULL,
  status           TEXT DEFAULT 'pending' CHECK (status IN ('active','resolved','pending','cancelled')),
  outcome_type     TEXT DEFAULT 'binary'  CHECK (outcome_type IN ('binary','multiple','scalar')),
  creator_id       UUID REFERENCES users(id) ON DELETE SET NULL,
  total_volume     NUMERIC(18,6) DEFAULT 0,
  total_liquidity  NUMERIC(18,6) DEFAULT 0,
  participant_count INT DEFAULT 0,
  resolution_date  TIMESTAMPTZ NOT NULL,
  resolved_at      TIMESTAMPTZ,
  ai_summary       TEXT,
  tags             TEXT[] DEFAULT '{}',
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- ─── Market Outcomes ──────────────────────────────────────────────────────────
CREATE TABLE market_outcomes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id     UUID REFERENCES markets(id) ON DELETE CASCADE,
  label         TEXT NOT NULL,
  probability   NUMERIC(5,4) DEFAULT 0.5,
  total_shares  NUMERIC(18,6) DEFAULT 0,
  is_winner     BOOLEAN DEFAULT false
);

-- ─── Market Positions ─────────────────────────────────────────────────────────
CREATE TABLE market_positions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
  market_id    UUID REFERENCES markets(id) ON DELETE CASCADE,
  outcome_id   UUID REFERENCES market_outcomes(id),
  shares       NUMERIC(18,6) NOT NULL,
  avg_price    NUMERIC(5,4) NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, outcome_id)
);

-- ─── AI Insights ──────────────────────────────────────────────────────────────
CREATE TABLE ai_insights (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id        UUID REFERENCES markets(id) ON DELETE CASCADE,
  summary          TEXT NOT NULL,
  key_factors      TEXT[] DEFAULT '{}',
  sentiment        TEXT CHECK (sentiment IN ('bullish','bearish','neutral')),
  confidence_score NUMERIC(4,3),
  generated_at     TIMESTAMPTZ DEFAULT now()
);

-- ─── Notifications ────────────────────────────────────────────────────────────
CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  is_read    BOOLEAN DEFAULT false,
  link       TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Leaderboard View ─────────────────────────────────────────────────────────
CREATE VIEW leaderboard_view AS
SELECT
  u.id,
  u.username,
  u.display_name,
  u.avatar_url,
  COUNT(p.id)                          AS total_predictions,
  ROUND(AVG(CASE WHEN o.is_winner THEN 1.0 ELSE 0.0 END) * 100, 2) AS accuracy,
  COALESCE(SUM(p.shares * o.probability), 0) AS score
FROM users u
LEFT JOIN market_positions p ON p.user_id = u.id
LEFT JOIN market_outcomes  o ON o.id = p.outcome_id
LEFT JOIN markets m           ON m.id = p.market_id AND m.status = 'resolved'
GROUP BY u.id, u.username, u.display_name, u.avatar_url
ORDER BY score DESC;

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE users             ENABLE ROW LEVEL SECURITY;
ALTER TABLE markets            ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_positions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications      ENABLE ROW LEVEL SECURITY;

-- Users can read all public profiles
CREATE POLICY "Public profiles readable" ON users FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "Own profile writable" ON users FOR UPDATE USING (auth.uid() = auth_id);

-- Markets are readable by all
CREATE POLICY "Markets public read" ON markets FOR SELECT USING (true);

-- Only authenticated users can create markets
CREATE POLICY "Authenticated market create" ON markets FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Users can only read their own positions
CREATE POLICY "Own positions" ON market_positions FOR ALL USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Users can only read their own notifications
CREATE POLICY "Own notifications" ON notifications FOR ALL USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));
`;
