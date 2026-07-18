"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, TrendingUp, Sparkles, Plus, User, Trophy } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const mobileItems = [
  { label: "Feed", href: ROUTES.MARKETS, icon: TrendingUp },
  { label: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: "AI Briefs", href: ROUTES.AI_INSIGHTS, icon: Sparkles },
  { label: "Ranks", href: ROUTES.LEADERBOARD, icon: Trophy },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-elevated)]/90 backdrop-blur-2xl border-t border-white/[0.08] px-4 h-16 flex items-center justify-around">
      {mobileItems.slice(0, 2).map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors",
              isActive ? "text-blue-400" : "text-[var(--text-secondary)] opacity-70 hover:text-[var(--text-secondary)]"
            )}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </Link>
        );
      })}

      {/* Center Floating Create Market Button */}
      <Link
        href={ROUTES.CREATE_MARKET}
        className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center text-[var(--text-primary)] shadow-xl shadow-blue-500/30 -mt-6 border-4 border-[var(--bg-base)] active:scale-95 transition-transform"
      >
        <Plus size={22} fill="white" />
      </Link>

      {mobileItems.slice(2).map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors",
              isActive ? "text-blue-400" : "text-[var(--text-secondary)] opacity-70 hover:text-[var(--text-secondary)]"
            )}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
