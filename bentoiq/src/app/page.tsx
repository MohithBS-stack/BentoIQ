"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  Brain,
  Globe2,
  BarChart3,
  ChevronRight,
  Activity,
  Flame,
  Clock,
  MessageSquare,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/contexts/auth-context";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { publicBentoSdk } from "@/lib/bento-client";
import { devLog } from "@/lib/logger";

const CATEGORIES = [
  { label: "Finance", icon: BarChart3, count: "312 markets" },
  { label: "Technology", icon: Sparkles, count: "198 markets" },
  { label: "Sports", icon: Activity, count: "445 markets" },
  { label: "Geopolitics", icon: Globe2, count: "89 markets" },
  { label: "AI & Research", icon: Brain, count: "134 markets" },
  { label: "Community", icon: Users, count: "67 markets" },
];

function NavBar() {
  const { isConnected, user, connectWallet, isLoading } = useAuth();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-10 h-16 border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/90 backdrop-blur-xl"
    >
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-none border-2 border-[var(--text-primary)] bg-[var(--bauhaus-blue)] flex items-center justify-center transition-all duration-300 shadow-[2px_2px_0px_#111111] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[4px_4px_0px_#111111]">
          <Zap size={15} className="text-[var(--bg-elevated)]" fill="white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">BentoIQ</span>
          <span className="text-[9px] text-[var(--text-secondary)] font-bold uppercase hidden sm:block">Testnet UI</span>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-1">
        {[
          { label: "Markets", href: ROUTES.MARKETS },
          { label: "AI Insights", href: ROUTES.AI_INSIGHTS },
          { label: "Leaderboard", href: ROUTES.LEADERBOARD },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3.5 py-2 rounded-none text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all duration-150 border-2 border-transparent hover:border-[var(--text-primary)]"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        {isConnected && user ? (
          <Link
            href={ROUTES.DASHBOARD}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-none bg-[var(--bg-elevated)] border-2 border-[var(--text-primary)] hover:bg-[var(--bg-base)] transition-all duration-150 shadow-[2px_2px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            <div className="w-6 h-6 rounded-none bg-[var(--bauhaus-yellow)] border border-[var(--text-primary)] flex items-center justify-center text-xs font-black text-[var(--text-primary)]">
              {user.displayName[0]}
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] hidden sm:block">{user.displayName}</span>
          </Link>
        ) : (
          <>
            <Link
              href={ROUTES.AUTH_LOGIN}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-none text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all duration-150 border-2 border-transparent hover:border-[var(--text-primary)]"
            >
              Sign In
            </Link>
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="btn-accent flex items-center gap-1.5 px-4 py-2 text-sm disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-3.5 h-3.5 rounded-none border-2 border-[var(--bg-elevated)] border-t-[var(--text-primary)] anim-spin" />
              ) : (
                <Zap size={13} fill="currentColor" />
              )}
              Connect Wallet
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const { connectWallet, isConnected, isLoading } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[var(--bauhaus-blue)]/[0.07] rounded-none blur-[120px]" />
      </motion.div>

      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      <motion.div style={{ opacity: fade }} className="relative z-10 max-w-4xl mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[var(--bauhaus-yellow)] text-[var(--text-primary)] text-xs font-black uppercase tracking-widest mb-6 shadow-[2px_2px_0px_#111111] border-2 border-[var(--text-primary)]"
        >
          <Sparkles size={12} />
          Bento Testnet Live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 font-black uppercase tracking-tighter"
        >
          The future belongs to
          <br />
          <span className="text-[var(--bauhaus-blue)] bg-[var(--bg-elevated)] px-4 border-4 border-[var(--text-primary)] shadow-[6px_6px_0px_#111111] inline-block mt-4">better decisions.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl font-bold text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed uppercase tracking-widest"
        >
          Trade real predictions on the Bento Protocol Testnet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {isConnected ? (
            <Link
              href={ROUTES.DASHBOARD}
              className="btn-primary group flex items-center gap-2.5"
            >
              Explore Dashboard
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="btn-accent group flex items-center gap-2.5 disabled:opacity-60"
            >
              {isLoading ? <div className="w-4 h-4 rounded-none border-2 border-[var(--bg-elevated)] border-t-[var(--text-primary)] anim-spin" /> : <Zap size={15} fill="currentColor" />}
              Connect Wallet &amp; Start
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          )}
          <Link
            href={ROUTES.MARKETS}
            className="btn-secondary group flex items-center gap-2"
          >
            Browse Markets
            <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t-4 border-[var(--text-primary)]"
        >
          {[
            { n: "BENTO", l: "Powered Protocol" },
            { n: "REAL", l: "Testnet Data" },
            { n: "NO", l: "Simulations" },
            { n: "100%", l: "On-Chain" },
          ].map((s) => (
            <div key={s.l} className="glass-card p-4 text-center">
              <span className="text-2xl font-black text-[var(--text-primary)] block mb-0.5 uppercase">{s.n}</span>
              <span className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeedSection() {
  const { data: marketsResponse, isLoading } = useQuery({
    queryKey: ["global-markets-list"],
    queryFn: async () => {
      try {
        const data = await publicBentoSdk.public.markets.list();
        devLog("✓ Markets fetched", data.data.length);
        return data;
      } catch (err: any) {
        devLog("Error fetching markets in page.tsx", err?.message || err);
        throw err;
      }
    },
  });

  const markets = marketsResponse?.data || [];
  const trendingMarkets = markets.slice(0, 3);
  const featuredMarkets = markets.slice(3, 5);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Trending Decisions */}
          <div>
            <div className="flex items-center justify-between mb-4 border-b-4 border-[var(--text-primary)] pb-2">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-[var(--bauhaus-red)]" />
                <h2 className="text-base font-black text-[var(--text-primary)] uppercase tracking-widest">Live Bento Markets</h2>
              </div>
              <Link href={ROUTES.MARKETS} className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-black uppercase tracking-widest flex items-center gap-1 transition-colors">
                View all <ChevronRight size={12} />
              </Link>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-sm font-black uppercase tracking-widest text-[var(--text-secondary)] py-8 text-center border-2 border-dashed border-[var(--border-subtle)]">
                  Fetching live markets...
                </div>
              ) : marketsResponse === undefined ? (
                <div className="text-sm font-black uppercase tracking-widest text-[var(--rose)] py-8 text-center border-2 border-dashed border-[var(--rose)]">
                  Failed to fetch markets. Check API Configuration.
                </div>
              ) : trendingMarkets.map((item: any) => (
                <Link
                  href={`/markets/${item.duelId}`}
                  key={item.duelId}
                  className="glass-card p-5 block group hover:bg-[var(--bg-elevated)]"
                >
                  <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest mb-3 border-b-2 border-[var(--border-subtle)] pb-2">
                    <span className="px-2 py-0.5 rounded-none bg-[var(--text-primary)] text-[var(--bg-elevated)] shadow-[2px_2px_0px_#111111]">{item.categoryId || "Crypto"}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> Live</span>
                  </div>
                  <h3 className="text-lg font-black text-[var(--text-primary)] transition-colors mb-4 leading-tight uppercase">
                    {item.title || item.question || item.betString || "Untitled Market"}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-[var(--text-primary)] font-black uppercase tracking-widest pt-3 border-t-2 border-[var(--text-primary)]">
                    <span>Vol: <strong className="text-[var(--bauhaus-blue)] font-black">{item.totalVolume || 0} USDC</strong></span>
                    <div className="flex items-center gap-3">
                      <span>Bento Protocol</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="glass-card p-5">
            <h3 className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest mb-3 border-b-2 border-[var(--text-primary)] pb-2">Explore Categories</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.label}
                    href={ROUTES.MARKETS}
                    className="flex items-center justify-between p-3 rounded-none border-2 border-transparent hover:border-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all group shadow-none hover:shadow-[3px_3px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--bauhaus-red)] transition-colors" />
                      <span className="text-sm font-black uppercase text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{cat.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <FeedSection />
      <footer className="border-t-4 border-[var(--text-primary)] py-8 text-center text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">
        © 2026 BentoIQ · Live Testnet Integration
      </footer>
    </div>
  );
}
