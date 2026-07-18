"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Sparkles,
  Trophy,
  Plus,
  ChevronLeft,
  ChevronRight,
  Zap,
  Settings,
  User,
  Shield,
  LogOut,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { useAuth } from "@/contexts/auth-context";
import { ROUTES } from "@/lib/constants";

const mainNavItems = [
  { label: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: "Markets", href: ROUTES.MARKETS, icon: TrendingUp },
  { label: "Portfolio", href: ROUTES.PORTFOLIO, icon: Briefcase },
  { label: "AI Insights", href: ROUTES.AI_INSIGHTS, icon: Sparkles },
  { label: "Leaderboard", href: ROUTES.LEADERBOARD, icon: Trophy },
];

const bottomNavItems = [
  { label: "Notifications", href: ROUTES.NOTIFICATIONS, icon: Zap },
  { label: "Settings", href: ROUTES.SETTINGS, icon: Settings },
  { label: "Profile", href: "/profile/me", icon: User },
];

const sidebarVariants = {
  open: { width: 260, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] as const } },
  closed: { width: 72, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] as const } },
};

const labelVariants = {
  open: { opacity: 1, x: 0, transition: { delay: 0.05, duration: 0.2 } },
  closed: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
  onClick?: () => void;
}

function NavItem({ href, icon: Icon, label, isOpen, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      onClick={onClick}
      title={!isOpen ? label : undefined}
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150",
        "hover:bg-[rgba(0,0,0,0.03)]",
        isActive ? "bg-[rgba(0,0,0,0.05)] text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active-pill"
          className="absolute inset-0 rounded-xl bg-white shadow-sm border border-[var(--border-subtle)]"
        />
      )}

      <div
        className={cn(
          "relative z-10 flex-shrink-0 w-5 h-5 transition-colors duration-150",
          isActive ? "text-[var(--accent)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
        )}
      >
        <Icon size={19} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            variants={labelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="relative z-10 text-xs font-semibold whitespace-nowrap overflow-hidden tracking-tight"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { isConnected, user, disconnect, connectWallet } = useAuth();

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={sidebarOpen ? "open" : "closed"}
      initial={false}
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col floating-sidebar",
        "overflow-hidden"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[var(--border-subtle)] flex-shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-sm">
            <Zap size={16} className="text-[var(--text-primary)]" fill="white" />
          </div>

          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                variants={labelVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col leading-none"
              >
                <span className="text-sm font-bold text-[var(--text-primary)] tracking-tight">BentoIQ</span>
                <span className="text-[9px] text-[var(--text-secondary)] font-medium mt-0.5">Intelligence</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Action CTA */}
      <div className="px-3 pt-4 pb-2 flex-shrink-0">
        <Link
          href={ROUTES.CREATE_MARKET}
          className={cn(
            "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl btn-accent",
            "text-xs",
            !sidebarOpen && "justify-center px-0"
          )}
        >
          <Plus size={16} className="flex-shrink-0" />
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span variants={labelVariants} initial="closed" animate="open" exit="closed">
                Create Market
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {sidebarOpen && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] px-3 py-1.5 opacity-60">
            Platform
          </p>
        )}
        {mainNavItems.map((item) => (
          <NavItem key={item.href} {...item} isOpen={sidebarOpen} />
        ))}

        {isConnected && (
          <>
            {sidebarOpen && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] px-3 py-1.5 mt-4 opacity-60">
                Admin
              </p>
            )}
            <NavItem href={ROUTES.ADMIN} icon={Shield} label="Admin Panel" isOpen={sidebarOpen} />
          </>
        )}
      </nav>

      {/* Bottom Nav */}
      <div className="px-3 pb-4 pt-2 space-y-1 flex-shrink-0">
        {bottomNavItems.map((item) => (
          <NavItem key={item.href} {...item} isOpen={sidebarOpen} />
        ))}

        {/* User / Disconnect Section */}
        {isConnected && user && sidebarOpen && (
          <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between px-3 py-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[var(--text-primary)] flex items-center justify-center text-[10px] font-bold text-[var(--text-primary)] flex-shrink-0">
                {user.displayName[0]}
              </div>
              <span className="text-xs font-semibold text-[var(--text-primary)] truncate">{user.displayName}</span>
            </div>
            <button
              onClick={disconnect}
              title="Disconnect Wallet"
              className="text-[var(--text-secondary)] hover:text-[var(--rose)] transition-colors p-1"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute -right-3 top-[72px] z-50",
          "w-6 h-6 rounded-full",
          "bg-white border border-[var(--border-subtle)]",
          "flex items-center justify-center",
          "text-[var(--text-secondary)] hover:text-[var(--accent)]",
          "transition-all duration-200 shadow-sm hover:shadow-md"
        )}
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {sidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>
    </motion.aside>
  );
}
