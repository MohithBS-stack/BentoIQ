"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Wallet,
} from "lucide-react";
import { toastSuccess } from "@/lib/toast";
import { useAuth } from "@/contexts/auth-context";
import { useUIStore } from "@/store/ui.store";
import { ROUTES } from "@/lib/constants";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface TopNavProps {
  sidebarWidth?: number;
}

export function TopNav({ sidebarWidth = 248 }: TopNavProps) {
  const pathname = usePathname();
  const { user, sdk, isConnected, connectWallet, disconnect, isLoading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch real balance from Bento SDK
  const { data: accountDetails } = useQuery({
    queryKey: ["accountDetails", user?.id],
    queryFn: async () => {
      if (!sdk || !user?.walletAddress) throw new Error("No SDK or user");
      return sdk.user.portfolio.getAccountDetails({ userAddress: user.walletAddress });
    },
    enabled: !!sdk && !!user,
  });
  
  const balance = accountDetails?.availableBalance ?? 0;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format breadcrumbs
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentPage = pathSegments.length > 0
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
    : "Dashboard";

  return (
    <header
      style={{ left: `${sidebarWidth}px`, width: `calc(100% - ${sidebarWidth}px)` }}
      className="fixed top-0 right-0 z-30 flex items-center justify-between px-8 floating-topnav transition-[left,width] duration-300"
    >
      {/* Breadcrumb / Page Title */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          BentoIQ
        </span>
        <span className="text-[var(--border-hover)] text-xs">/</span>
        <span className="text-sm font-bold text-[var(--text-primary)]">
          {currentPage}
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search trigger placeholder */}
        <div className="relative hidden sm:flex items-center">
          <Search size={14} className="absolute left-3 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search markets or reasoning..."
            className="w-48 lg:w-64 pl-9 pr-3 py-1.5 search-capsule text-xs text-[var(--text-primary)] placeholder:text-gray-400 focus:outline-none"
          />
        </div>



        {/* Notifications Button */}
        <Link
          href={ROUTES.NOTIFICATIONS}
          className="relative w-8 h-8 rounded-full bg-white border border-[var(--border-subtle)] hover:border-[var(--border-hover)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shadow-sm"
        >
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        </Link>

        {/* Auth / User Profile */}
        {isConnected && user ? (
          <div className="flex items-center gap-3">
            {/* Wallet Balance Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-base)] border border-[var(--border-subtle)] shadow-sm">
              <span className="text-[10px] uppercase font-black text-[var(--text-secondary)] tracking-widest">CREDITS</span>
              <span className="text-xs font-black text-[var(--text-primary)]">
                {balance.toLocaleString()}
              </span>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full bg-white border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-colors shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-[var(--text-primary)] flex items-center justify-center text-xs font-bold text-[var(--text-primary)]">
                {user.displayName[0]}
              </div>
              <span className="text-xs font-semibold text-[var(--text-primary)] max-w-[100px] truncate hidden md:inline">
                {user.displayName}
              </span>
              <ChevronDown size={12} className="text-[var(--text-secondary)] mr-1" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[var(--border-subtle)] shadow-xl p-2 z-50 space-y-1"
              >
                <div className="px-3 py-2 border-b border-[var(--border-subtle)] mb-1">
                  <p className="text-xs font-bold text-[var(--text-primary)]">{user.displayName}</p>
                  <p className="text-[10px] text-[var(--text-secondary)] truncate font-mono">
                    {user.walletAddress}
                  </p>
                </div>

                <Link
                  href="/profile/me"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-50 transition-colors"
                >
                  <User size={14} /> Profile
                </Link>
                <Link
                  href={ROUTES.SETTINGS}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-50 transition-colors"
                >
                  <Settings size={14} /> Settings
                </Link>

                <div className="border-t border-[var(--border-subtle)] pt-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      disconnect();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[var(--rose)] hover:bg-rose-50 transition-colors"
                  >
                    <LogOut size={14} /> Disconnect Wallet
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="btn-accent flex items-center gap-1.5 text-xs py-2 px-4 rounded-full"
          >
            {isLoading ? (
              <div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <Wallet size={13} />
            )}
            Connect
          </button>
        )}
      </div>
    </header>
  );
}
