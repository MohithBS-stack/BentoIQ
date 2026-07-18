import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Admin",
  description: "BentoIQ admin panel — manage markets, users, and platform settings.",
};

export default function AdminPage() {
  const STATS = [
    { label: "Total Markets",   value: "1,247",  change: "+38 this week"  },
    { label: "Active Users",    value: "48,220", change: "+2,140 this week" },
    { label: "Total Volume",    value: "$2.4M",  change: "+$124K this week" },
    { label: "Flagged Markets", value: "3",       change: "Needs review"   },
  ];

  const RECENT_MARKETS = [
    { title: "Will NVIDIA cross $250?",    creator: "priya_analyst",  status: "active",  vol: "$142K" },
    { title: "Will GPT-5 launch in 2025?", creator: "deepmind_d",    status: "active",  vol: "$97K"  },
    { title: "India World Cup 2027?",      creator: "rajan_mk",       status: "pending", vol: "$0"    },
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
              Admin Only
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Admin Panel</h1>
          <p className="text-[var(--text-secondary)] opacity-70">Platform overview and management.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="glass-card p-5">
            <p className="text-xs text-[var(--text-primary)]/35 font-medium uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
            <p className="text-xs text-[var(--text-secondary)] opacity-70 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Markets */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[var(--text-secondary)]">Recent Markets</h2>
            <Link href={ROUTES.MARKETS} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_MARKETS.map((m, i) => (
              <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)] font-medium truncate">{m.title}</p>
                  <p className="text-xs text-[var(--text-primary)]/35 mt-0.5">by @{m.creator}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    m.status === "active"  ? "bg-emerald-500/15 text-emerald-400" :
                    m.status === "pending" ? "bg-yellow-500/15 text-yellow-400"  :
                    "bg-white/[0.07] text-[var(--text-secondary)] opacity-70"
                  }`}>
                    {m.status}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] opacity-70">{m.vol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "Review Flagged Markets (3)", color: "bg-red-600 hover:bg-red-500" },
              { label: "Approve Pending Markets",    color: "bg-yellow-600 hover:bg-yellow-500" },
              { label: "Manage Users",               color: "bg-blue-600 hover:bg-blue-500" },
              { label: "Platform Settings",          color: "bg-white/[0.08] hover:bg-white/[0.12]" },
              { label: "Export Analytics CSV",       color: "bg-white/[0.08] hover:bg-white/[0.12]" },
            ].map((action) => (
              <button
                key={action.label}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all ${action.color}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
