"use client";

import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const widthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`relative w-full ${widthClasses[maxWidth]} rounded-3xl bg-[var(--bg-elevated)] border border-white/[0.08] shadow-2xl p-6 overflow-hidden z-10`}
          >
            {/* Header */}
            {(title || description) && (
              <div className="flex items-start justify-between mb-4 pb-3 border-b border-white/[0.05]">
                <div>
                  {title && <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">{title}</h3>}
                  {description && <p className="text-xs text-[var(--text-primary)]/45 mt-0.5">{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[var(--text-secondary)] opacity-70 hover:text-[var(--text-primary)] flex items-center justify-center transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            )}

            {/* Content */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
