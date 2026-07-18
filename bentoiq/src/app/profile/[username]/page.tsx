"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Trophy,
  Star,
  Activity,
  Award,
  Target,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DecisionCard } from "@/components/feed/decision-card";
import { useQuery } from "@tanstack/react-query";
import { publicBentoSdk } from "@/lib/bento-client";

const MOCK_PROFILE = {
  username: "satoshi_99",
  displayName: "Alex Quant",
  avatar: "A",
  bio: "Algorithmic trader & macro forecaster on Bento Testnet.",
  joinDate: "Joined March 2024",
  location: "Singapore",
  accuracy: "94.2%",
  streak: 12,
  reputation: "Oracle Level 42",
  badges: ["Early Adopter", "AI Expert", "Top 100 Global"],
  favoriteCategories: ["AI", "Crypto", "Finance"],
};

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  
  // Use mock profile but override username if provided. 
  // Ideally, fetch user profile from Bento SDK if there's a public user endpoint.
  const profile = { ...MOCK_PROFILE, username: username || MOCK_PROFILE.username };
  
  const { data: marketsResponse } = useQuery({
    queryKey: ["profile-markets"],
    queryFn: () => publicBentoSdk.public.markets.list(),
  });

  const recentPredictions = (marketsResponse?.data || []).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative overflow-hidden p-6 md:p-10 border-2 border-[var(--text-primary)] bg-[var(--bg-elevated)] shadow-[6px_6px_0px_#111111]"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-none bg-[var(--bauhaus-blue)] border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_#111111] flex items-center justify-center">
              <span className="text-4xl font-black text-white uppercase">
                {profile.avatar || profile.displayName[0]}
              </span>
            </div>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-none border-2 border-[var(--text-primary)] bg-[var(--emerald)] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
              <CheckCircle2 size={16} className="text-[var(--text-primary)]" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
                {profile.displayName}
              </h1>
              <p className="text-sm font-black text-[var(--bauhaus-blue)] uppercase tracking-widest">@{profile.username}</p>
            </div>
            <p className="text-sm text-[var(--text-primary)] font-bold max-w-2xl leading-relaxed uppercase tracking-widest">
              {profile.bio}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] pt-2 border-t-2 border-[var(--text-primary)] mt-4">
              <span className="flex items-center gap-1.5 pt-2"><Calendar size={14} /> {profile.joinDate}</span>
              <span className="flex items-center gap-1.5 pt-2"><MapPin size={14} /> {profile.location}</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="self-stretch md:self-auto flex flex-col justify-center gap-3">
            <button className="btn-primary">
              Follow
            </button>
            <button className="btn-secondary">
              Compare Stats
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats & Rep Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Stats (8 cols) */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="glass-card p-5 space-y-2">
            <div className="flex justify-between items-center text-[var(--text-secondary)] border-b-2 border-[var(--text-primary)] pb-2 mb-2">
              <span className="text-xs font-black uppercase tracking-widest">Accuracy</span>
              <Target size={14} className="text-[var(--emerald)]" />
            </div>
            <p className="text-2xl font-black text-[var(--text-primary)] tracking-tighter">{profile.accuracy}</p>
          </div>
          
          <div className="glass-card p-5 space-y-2">
            <div className="flex justify-between items-center text-[var(--text-secondary)] border-b-2 border-[var(--text-primary)] pb-2 mb-2">
              <span className="text-xs font-black uppercase tracking-widest">Win Streak</span>
              <Flame size={14} className="text-[var(--bauhaus-red)]" />
            </div>
            <p className="text-2xl font-black text-[var(--text-primary)] tracking-tighter flex items-end gap-2 uppercase">
              {profile.streak} <span className="text-sm text-[var(--text-secondary)] mb-1">wins</span>
            </p>
          </div>
          
          <div className="glass-card p-5 space-y-2 col-span-2 sm:grid-cols-1 sm:col-span-1">
            <div className="flex justify-between items-center text-[var(--text-secondary)] border-b-2 border-[var(--text-primary)] pb-2 mb-2">
              <span className="text-xs font-black uppercase tracking-widest">Reputation</span>
              <Trophy size={14} className="text-[var(--bauhaus-blue)]" />
            </div>
            <p className="text-lg font-black uppercase text-[var(--text-primary)] tracking-tighter truncate">{profile.reputation}</p>
          </div>
        </div>

        {/* Badges (4 cols) */}
        <div className="md:col-span-4 glass-card p-6 space-y-4">
          <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-2 border-b-2 border-[var(--text-primary)] pb-2">
            <Award size={16} className="text-[var(--bauhaus-yellow)]" /> Achievements
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.badges.map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-elevated)] border-2 border-[var(--text-primary)] text-[var(--text-primary)] text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#111111]">
                <Star size={10} className="text-[var(--bauhaus-yellow)]" /> {badge}
              </span>
            ))}
          </div>
          
          <div className="pt-4 mt-2">
            <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-2">Favored Sectors</h4>
            <div className="flex flex-wrap gap-2">
              {profile.favoriteCategories.map((cat, i) => (
                <Badge key={i} variant="default" className="rounded-none border-2 border-[var(--text-primary)] text-xs font-black uppercase">{cat}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Predictions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-4 border-[var(--text-primary)] pb-2">
          <h2 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-2">
            <Activity size={18} className="text-[var(--bauhaus-blue)]" /> Recent Predictions
          </h2>
        </div>
        <div className="space-y-4">
          {recentPredictions.map((decision: any) => (
            <DecisionCard key={decision.duelId || decision.id} market={decision} />
          ))}
        </div>
      </div>
    </div>
  );
}
