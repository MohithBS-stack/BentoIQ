"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Bookmark, Share2, ShieldCheck, ArrowRight, Check, AlertCircle } from "lucide-react";
import { toastSuccess, toastError } from "@/lib/toast";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { devLog } from "@/lib/logger";

export function PredictionPanel({ marketId, title }: { marketId: string; title: string }) {
  const [outcome, setOutcome] = useState<"YES" | "NO">("YES");
  const [amount, setAmount] = useState<number>(250);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  
  const { user, sdk } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch real balance from Bento SDK
  const { data: accountDetails } = useQuery({
    queryKey: ["accountDetails", user?.id],
    queryFn: async () => {
      if (!sdk || !user?.walletAddress) throw new Error("No SDK or user");
      const details = await sdk.user.portfolio.getAccountDetails({ userAddress: user.walletAddress });
      devLog("✓ Portfolio fetched", details);
      return details;
    },
    enabled: !!sdk && !!user,
  });
  
  const balance = accountDetails?.availableBalance ?? 0;

  // Real estimated quote
  const { data: quote, isLoading: isEstimating } = useQuery({
    queryKey: ["estimateBuy", marketId, outcome, amount],
    queryFn: async () => {
      if (!sdk) return null;
      return sdk.user.bets.estimateBuy({
        duelId: marketId,
        optionIndex: outcome === "YES" ? 0 : 1,
        betAmountUsdc: amount.toString()
      });
    },
    enabled: !!sdk && !!user && amount > 0,
  });

  const potentialReturn = (quote as any)?.potentialReturn ?? Math.round(amount * (outcome === "YES" ? 1.45 : 2.85));

  const placeBetMutation = useMutation({
    mutationFn: async () => {
      if (!sdk) throw new Error("Not authenticated with Bento.");
      if (!quote) throw new Error("Failed to get quote.");
      return sdk.user.bets.placeBet(quote as any);
    },
    onSuccess: () => {
      toastSuccess(
        "Forecast Placed",
        `Staked ${amount} on ${outcome} for "${title.slice(0, 30)}..."`
      );
      
      devLog("✓ Bets placed", { marketId, outcome, amount });
      
      // Invalidate queries to refresh data across the app
      queryClient.invalidateQueries({ queryKey: ["accountDetails"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      queryClient.invalidateQueries({ queryKey: ["userShares"] });
    },
    onError: (error: any) => {
      toastError("Transaction Failed", error?.message || "Failed to place bet.");
    }
  });

  const handleReviewPrediction = () => {
    if (!user || !sdk) {
      toastError("Authentication Required", "Please connect your wallet first.");
      return;
    }

    if (Number(balance) < amount) {
      setShowModal(true);
      return;
    }

    placeBetMutation.mutate();
  };

  return (
    <div className="glass-card p-6 space-y-6 sticky top-20 border-blue-500/20 shadow-2xl">
      {/* Top Action Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest">Forecast Position</h3>
          <p className="text-[11px] text-[var(--text-secondary)] font-bold">Bento Non-custodial Order</p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              toastSuccess(isBookmarked ? "Removed Bookmark" : "Saved to Bookmarks");
            }}
            className={`w-8 h-8 rounded-none border-2 flex items-center justify-center transition-colors ${
              isBookmarked
                ? "bg-[var(--bauhaus-blue)] text-white border-[var(--text-primary)] shadow-[2px_2px_0px_#111111]"
                : "bg-transparent text-[var(--text-primary)] border-[var(--text-primary)] hover:bg-[var(--bg-base)]"
            }`}
          >
            <Bookmark size={15} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => toastSuccess("Link copied to clipboard")}
            className="w-8 h-8 rounded-none bg-transparent text-[var(--text-primary)] border-2 border-[var(--text-primary)] hover:bg-[var(--bg-base)] flex items-center justify-center transition-colors"
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>

      {/* Outcome Selection */}
      <div className="space-y-2">
        <label className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest">
          Select Outcome
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setOutcome("YES")}
            className={`py-3.5 px-4 rounded-none font-black text-sm transition-all duration-200 border-2 flex flex-col items-center gap-0.5 ${
              outcome === "YES"
                ? "bg-[var(--emerald)] text-[var(--text-primary)] border-[var(--text-primary)] shadow-[4px_4px_0px_#111111] translate-x-[-2px] translate-y-[-2px]"
                : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--text-primary)] hover:bg-[var(--bg-base)]"
            }`}
          >
            <span>YES</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">1.45x</span>
          </button>

          <button
            onClick={() => setOutcome("NO")}
            className={`py-3.5 px-4 rounded-none font-black text-sm transition-all duration-200 border-2 flex flex-col items-center gap-0.5 ${
              outcome === "NO"
                ? "bg-[var(--rose)] text-white border-[var(--text-primary)] shadow-[4px_4px_0px_#111111] translate-x-[-2px] translate-y-[-2px]"
                : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--text-primary)] hover:bg-[var(--bg-base)]"
            }`}
          >
            <span>NO</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">2.85x</span>
          </button>
        </div>
      </div>

      {/* Amount Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-black text-[var(--text-secondary)] uppercase tracking-widest">Stake Amount</span>
          <span className="font-black text-[var(--text-primary)] tracking-tighter">{amount}</span>
        </div>

        <input
          type="range"
          min={10}
          max={2500}
          step={10}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-3 rounded-none bg-[var(--bg-base)] border-2 border-[var(--text-primary)] appearance-none cursor-pointer"
        />

        <div className="flex justify-between gap-2">
          {[50, 100, 250, 500, 1000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`flex-1 py-1 rounded-none text-[11px] font-black border-2 transition-colors ${
                amount === val
                  ? "bg-[var(--text-primary)] text-[var(--bg-elevated)] border-[var(--text-primary)]"
                  : "bg-transparent text-[var(--text-primary)] border-[var(--text-primary)] hover:bg-[var(--bg-base)]"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      {/* Return Summary Box */}
      <div className="p-4 rounded-none bg-[var(--bg-base)] border-2 border-[var(--text-primary)] shadow-[4px_4px_0px_#111111] space-y-2 text-xs">
        <div className="flex justify-between font-black text-[var(--text-primary)] uppercase tracking-widest">
          <span>Est. Potential Payout</span>
          <span className="text-[var(--emerald)] tracking-tighter text-sm">
            {isEstimating ? "..." : potentialReturn}
          </span>
        </div>
        <div className="flex justify-between text-[var(--text-secondary)] font-bold text-[11px] uppercase tracking-widest">
          <span>Net Return Ratio</span>
          <span>+{Math.round(((potentialReturn - amount) / amount) * 100)}%</span>
        </div>
      </div>

      {/* Low Balance Warning */}
      {Number(balance) < 500 && Number(balance) > 0 && (
        <div className="flex items-start gap-2 p-3 bg-[var(--bauhaus-yellow)] border-2 border-[var(--text-primary)] shadow-[3px_3px_0px_#111111] mb-3">
          <AlertCircle size={14} className="text-[var(--text-primary)] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[var(--text-primary)] font-black uppercase leading-tight">Low balance warning. You have fewer than 500 credits remaining.</p>
        </div>
      )}

      {/* Review Button */}
      <button
        onClick={handleReviewPrediction}
        disabled={balance === 0 || placeBetMutation.isPending}
        className="btn-accent w-full flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{placeBetMutation.isPending ? "Executing..." : "Review Prediction"}</span>
        {!placeBetMutation.isPending && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
      </button>

      {/* Insufficient Credits Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm glass-card p-6"
            >
              <div className="w-12 h-12 rounded-none bg-[var(--rose)] border-2 border-[var(--text-primary)] flex items-center justify-center mb-4 shadow-[4px_4px_0px_#111111]">
                <AlertCircle className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-widest mb-2">
                Insufficient Funds
              </h3>
              <p className="text-sm font-bold text-[var(--text-secondary)] mb-6">
                You currently have <strong>{balance.toLocaleString()}</strong> remaining but are trying to use <strong>{amount.toLocaleString()}</strong>.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push("/portfolio")}
                  className="btn-primary w-full text-center"
                >
                  View Portfolio
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-secondary w-full text-center"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
