"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Award,
  ListOrdered
} from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { useAuth } from "@/contexts/auth-context";
import { useQuery } from "@tanstack/react-query";

const FILTER_TABS = ["All", "Active", "Won", "Lost", "Settled", "Bookmarks"];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("All");
  const { user, sdk, isConnected } = useAuth();

  // Fetch from SDK
  const { data: accountDetails } = useQuery({
    queryKey: ["accountDetails", user?.id],
    queryFn: async () => {
      if (!sdk || !user?.walletAddress) throw new Error("No SDK or user");
      return sdk.user.portfolio.getAccountDetails({ userAddress: user.walletAddress });
    },
    enabled: !!sdk && !!user,
  });

  const { data: positions = [] } = useQuery({
    queryKey: ["positions", user?.id],
    queryFn: async () => {
      if (!sdk || !user?.walletAddress) throw new Error("No SDK or user");
      return sdk.user.portfolio.getDuels({ userAddress: user.walletAddress });
    },
    enabled: !!sdk && !!user,
  });

  const { data: history = [] } = useQuery({
    queryKey: ["history", user?.id],
    queryFn: async () => {
      if (!sdk || !user?.walletAddress) throw new Error("No SDK or user");
      return sdk.user.portfolio.getHistoryTable({ userAddress: user.walletAddress });
    },
    enabled: !!sdk && !!user,
  });

  const balance = accountDetails?.availableBalance ?? 0;
  const lockedCredits = accountDetails?.lockedBalance ?? 0;
  const totalWinnings = accountDetails?.totalWinnings ?? 0;
  const totalLosses = accountDetails?.totalLosses ?? 0;

  // Render dummy positions/history if they return something complex, but we'll try to map them simply
  // Assume positions is an array of { id, marketTitle, amount, outcome }
  // Assume history is an array of { id, date, type, amount, status }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight uppercase">
          My Portfolio
        </h1>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-none border border-[var(--text-primary)] bg-[var(--emerald)] text-xs font-bold text-[var(--text-primary)] shadow-[3px_3px_0px_#111111]">
            LIVE ACCOUNT
          </span>
        </div>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 glass-card p-6 bg-[var(--bg-elevated)]">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <Wallet size={20} className="text-[var(--bauhaus-blue)]" />
              <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">Bento Wallet</h2>
            </div>
            <span className="text-[10px] uppercase font-black px-2 py-1 bg-[var(--bauhaus-yellow)] border-2 border-[var(--text-primary)] shadow-[2px_2px_0px_#111111]">
              Credits
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Available Balance</span>
            <span className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tighter mt-1">
              {balance.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Locked Credits</span>
          <span className="text-2xl font-black text-[var(--text-primary)] tracking-tighter">{lockedCredits.toLocaleString()}</span>
        </div>
        
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Net Profit</span>
          <span className={`text-2xl font-black tracking-tighter ${Number(totalWinnings) >= Number(totalLosses) ? 'text-[var(--emerald)]' : 'text-[var(--rose)]'}`}>
            {Number(totalWinnings) >= Number(totalLosses) ? '+' : '-'}{Math.abs(Number(totalWinnings) - Number(totalLosses)).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Main Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b-4 border-[var(--text-primary)]">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 rounded-none text-xs font-black uppercase transition-all duration-200 border-2 border-transparent ${
                  activeTab === tab ? "bg-[var(--bauhaus-red)] text-white border-[var(--text-primary)] shadow-[2px_2px_0px_#111111]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>

          {/* Positions List */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {Array.isArray(positions) && positions.length > 0 ? (
                positions.map((pos: any) => (
                  <div key={pos.id} className="glass-card p-4">
                    <p className="font-bold">{pos.marketTitle || "Unknown Market"}</p>
                    <p className="text-sm">Stake: {pos.amount} on {pos.outcome}</p>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="No positions found"
                  description="You don't have any open positions on Bento."
                  icon={<Wallet size={24} className="text-[var(--text-secondary)] opacity-70" />}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Col: Sidebar */}
        <div className="hidden lg:block lg:col-span-4 space-y-6 sticky top-20">
          
          {/* Transaction History */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest flex items-center gap-2 border-b-2 border-[var(--text-primary)] pb-3">
              <ListOrdered size={16} /> Wallet History
            </h3>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {Array.isArray(history) && history.length > 0 ? history.map((tx: any) => (
                <div key={tx.id} className="flex justify-between items-center text-xs border-b border-[var(--border-subtle)] pb-2">
                  <div className="max-w-[150px]">
                    <p className="font-bold text-[var(--text-primary)] truncate">{tx.marketTitle || tx.type || "Transaction"}</p>
                    <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase mt-0.5">{tx.status}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black font-mono block">
                      {tx.amount > 0 ? '+' : ''}{tx.amount} Cr
                    </span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-6 text-[var(--text-secondary)] text-xs font-bold uppercase">
                  No transactions yet
                </div>
              )}
            </div>
          </div>
          
          {isConnected && user ? (
            <div className="glass-card p-6 space-y-4 text-center">
              <div className="w-16 h-16 mx-auto rounded-none bg-[var(--bauhaus-yellow)] border-2 border-[var(--text-primary)] p-0.5 shadow-[4px_4px_0px_#111111]">
                <div className="w-full h-full bg-[var(--bg-elevated)] flex items-center justify-center">
                  <Award size={24} className="text-[var(--text-primary)]" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-widest">{user.displayName || "Bento User"}</h3>
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase mt-1">Authenticated Account</p>
              </div>
              
              <div className="w-full h-3 bg-[var(--bg-base)] border-2 border-[var(--text-primary)] relative overflow-hidden">
                <div className="h-full bg-[var(--bauhaus-blue)] w-[100%]" />
              </div>
              <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase">Verified</p>
            </div>
          ) : (
            <div className="glass-card p-6 space-y-4 text-center">
              <div>
                <h3 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-widest">Connect Wallet</h3>
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase mt-1">To view your full portfolio</p>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
