"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Sparkles, Clock, TrendingUp, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const RECENT_SEARCHES = ["GPT-6 benchmarks", "India GDP $10T", "NVIDIA $4.5T", "Solana TPS"];
const POPULAR_SUGGESTIONS = [
  "Will AI replace junior developers before 2030?",
  "SpaceX Starship Mars landing",
  "Federal Reserve interest rate cuts",
  "Ethereum flipping Bitcoin",
];

interface FloatingSearchProps {
  onSearch?: (query: string) => void;
}

export function FloatingSearch({ onSearch }: FloatingSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (text: string) => {
    setQuery(text);
    if (onSearch) onSearch(text);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto z-30">
      {/* Floating Input Bar */}
      <div className="relative flex items-center">
        <Search size={18} className="absolute left-4 text-[var(--text-secondary)] opacity-70 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (onSearch) onSearch(e.target.value);
          }}
          placeholder="Search 30+ AI decision markets, topics, or reasoning..."
          className="w-full h-13 pl-12 pr-24 rounded-2xl bg-white/[0.05] border border-white/[0.1] hover:border-white/[0.18] focus:border-blue-500/60 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/35 backdrop-blur-xl shadow-2xl focus:outline-none transition-all duration-200"
        />
        
        {/* Right side controls: Clear or Keyboard shortcut */}
        <div className="absolute right-4 flex items-center gap-2">
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                if (onSearch) onSearch("");
              }}
              className="text-[var(--text-secondary)] opacity-70 hover:text-[var(--text-primary)] p-1"
            >
              <X size={15} />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-[10px] font-medium text-[var(--text-secondary)] opacity-70 font-mono">
              <Command size={10} /> K
            </div>
          )}
        </div>
      </div>

      {/* Floating Dropdown Suggestions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute top-15 left-0 right-0 rounded-2xl bg-[var(--bg-elevated)] border border-white/[0.1] shadow-2xl p-4 backdrop-blur-2xl space-y-4"
          >
            {/* Recent Searches */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-secondary)] opacity-70 uppercase tracking-wider mb-2">
                <Clock size={12} />
                Recent Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {RECENT_SEARCHES.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSelect(item)}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Suggestions */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-secondary)] opacity-70 uppercase tracking-wider mb-2">
                <Sparkles size={12} className="text-purple-400" />
                Popular Decision Topics
              </div>
              <div className="space-y-1">
                {POPULAR_SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.05] text-xs font-medium text-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors text-left"
                  >
                    <span className="truncate">{item}</span>
                    <TrendingUp size={13} className="text-[var(--text-secondary)] opacity-70 ml-2 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
