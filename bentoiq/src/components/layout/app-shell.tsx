"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { TopNav } from "./topnav";
import { BottomNav } from "./bottom-nav";
import { useUIStore } from "@/store/ui.store";
import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode } from "react";

const NO_SHELL_ROUTES = ["/", "/auth/login", "/auth/signup"];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { sidebarOpen } = useUIStore();

  const isNoShellPage = NO_SHELL_ROUTES.includes(pathname);

  if (isNoShellPage) {
    return <main className="min-h-screen bg-[var(--bg-base)]">{children}</main>;
  }

  const sidebarWidth = sidebarOpen ? 248 : 60;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col">
      {/* Sidebar Navigation (Desktop) */}
      <Sidebar />

      {/* Top Navigation */}
      <TopNav sidebarWidth={sidebarWidth} />

      {/* Main Content Area */}
      <div
        style={{ paddingLeft: `${sidebarWidth}px` }}
        className="flex-1 pt-14 pb-16 md:pb-0 transition-[padding-left] duration-200"
      >
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="min-h-[calc(100vh-3.5rem)]"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
