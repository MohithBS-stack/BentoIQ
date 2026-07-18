"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Palette, Bell, Shield, Wallet, Key, Info, CheckCircle2, ChevronRight, AlertCircle 
} from "lucide-react";
import { toastSuccess } from "@/lib/toast";

const SETTINGS_SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "wallet", label: "Connected Wallet", icon: Wallet },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "api", label: "API Status", icon: Key },
  { id: "about", label: "About BentoIQ", icon: Info },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("wallet");
  const [theme, setTheme] = useState("dark");

  const saveSettings = () => {
    toastSuccess("Settings saved successfully");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Settings</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Manage your account preferences and integrations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Menu */}
        <div className="lg:col-span-3 space-y-2">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center justify-between p-3 rounded-none transition-all ${
                  isActive ? "bg-[var(--text-primary)] border-2 border-[var(--text-primary)] text-[var(--bg-elevated)]" : "bg-transparent border-2 border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-base)] hover:text-[var(--text-primary)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isActive ? "text-[var(--bg-elevated)]" : ""} />
                  <span className="text-sm font-black uppercase">{section.label}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-[var(--bg-elevated)]" />}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <div className="glass-card p-6 md:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeSection === "profile" && (
                <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <h2 className="text-lg font-black text-[var(--text-primary)] mb-4 border-b-2 border-[var(--text-primary)] pb-2 uppercase">Profile Information</h2>
                  
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest block mb-2">Username</label>
                      <input type="text" defaultValue="satoshi_99" className="w-full bg-[var(--bg-base)] border-2 border-[var(--text-primary)] rounded-none px-4 py-2.5 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:bg-[#ffffff] transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest block mb-2">Display Name</label>
                      <input type="text" defaultValue="Alex Quant" className="w-full bg-[var(--bg-base)] border-2 border-[var(--text-primary)] rounded-none px-4 py-2.5 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:bg-[#ffffff] transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest block mb-2">Bio</label>
                      <textarea rows={4} defaultValue="Algorithmic trader & macro forecaster..." className="w-full bg-[var(--bg-base)] border-2 border-[var(--text-primary)] rounded-none px-4 py-2.5 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:bg-[#ffffff] transition-colors resize-none" />
                    </div>
                    <button onClick={saveSettings} className="btn-primary w-full">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}

              {activeSection === "api" && (
                <motion.div key="api" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <h2 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-widest mb-4 border-b-2 border-[var(--text-primary)] pb-2">Service Integrations</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-none bg-[var(--bg-elevated)] border-2 border-[var(--text-primary)] shadow-[4px_4px_0px_#111111] flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-[var(--text-primary)] uppercase">Bento SDK</h4>
                        <p className="text-xs font-bold text-[var(--text-secondary)] opacity-70">Market creation & prediction execution</p>
                      </div>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-none bg-[var(--emerald)] text-[var(--text-primary)] text-[10px] font-black uppercase tracking-wider border-2 border-[var(--text-primary)]">
                        <CheckCircle2 size={12} /> Connected
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "wallet" && (
                <motion.div key="wallet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <h2 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-widest mb-4 border-b-2 border-[var(--text-primary)] pb-2">Bento Wallet Details</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-[var(--bg-elevated)] border-2 border-[var(--text-primary)] shadow-[4px_4px_0px_#111111]">
                      <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-1">Managed Bento Account</h4>
                      <p className="text-xs font-bold text-[var(--text-secondary)] mt-1">
                        Your funds and portfolio are safely managed by the Bento Testnet SDK. Balances are fetched directly from your verified account.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Other tabs omitted for brevity in hackathon prototype */}
              {["appearance", "notifications", "privacy", "about"].includes(activeSection) && (
                <motion.div key="others" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full flex flex-col items-center justify-center text-center space-y-3 pt-12">
                  <div className="w-16 h-16 rounded-none bg-[var(--bg-base)] border-2 border-[var(--text-primary)] flex items-center justify-center text-[var(--text-primary)]">
                    <Info size={24} />
                  </div>
                  <h3 className="text-lg font-black text-[var(--text-primary)] uppercase">Section in Development</h3>
                  <p className="text-sm font-bold text-[var(--text-secondary)] max-w-sm">
                    This module is currently being finalized for the production Vercel deployment.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
