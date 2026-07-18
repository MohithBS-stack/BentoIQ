"use client";

import { motion } from "framer-motion";
import { Bell, Trophy, CheckCircle2, TrendingUp, Sparkles, MessageSquare } from "lucide-react";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "settled",
    title: "Prediction Settled: Won",
    message: "Your YES forecast on 'SpaceX Mars 2028' resolved accurately. You earned $320.00 USDC and 150 XP.",
    time: "2 hours ago",
    read: false,
    icon: CheckCircle2,
    color: "emerald",
  },
  {
    id: 2,
    type: "trending",
    title: "Market Trending",
    message: "'Will GPT-6 achieve autonomous benchmarks?' is experiencing high volatility. Your staked position might be affected.",
    time: "5 hours ago",
    read: false,
    icon: TrendingUp,
    color: "amber",
  },
  {
    id: 3,
    type: "achievement",
    title: "Level Up: Strategist",
    message: "Congratulations! You've reached Oracle Level 24 and unlocked the 'Strategist' badge.",
    time: "1 day ago",
    read: true,
    icon: Trophy,
    color: "purple",
  },
  {
    id: 4,
    type: "ai_insight",
    title: "New AI Synthesis Available",
    message: "Gemini Copilot has published a new Executive Brief for the India $10T GDP market.",
    time: "2 days ago",
    read: true,
    icon: Sparkles,
    color: "blue",
  },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 min-h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight flex items-center gap-3">
            <Bell size={24} className="text-[var(--text-primary)]" /> Notifications
          </h1>
        </div>
        <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_NOTIFICATIONS.map((notif, idx) => {
          const Icon = notif.icon;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-5 rounded-2xl border transition-all ${
                notif.read ? "bg-white/[0.02] border-white/[0.04]" : "bg-white/[0.05] border-white/[0.1] shadow-lg"
              } flex gap-4`}
            >
              <div className="flex-shrink-0 pt-1">
                <div className={`w-10 h-10 rounded-full bg-${notif.color}-500/15 flex items-center justify-center text-${notif.color}-400 ring-1 ring-${notif.color}-500/30`}>
                  <Icon size={18} />
                </div>
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-bold ${notif.read ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-[var(--text-secondary)] opacity-70">{notif.time}</span>
                </div>
                <p className={`text-xs ${notif.read ? "text-[var(--text-secondary)] opacity-70" : "text-[var(--text-secondary)]"} leading-relaxed`}>
                  {notif.message}
                </p>
              </div>
              
              {!notif.read && (
                <div className="flex-shrink-0 flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
