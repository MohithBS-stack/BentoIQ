"use client";

import { type ReactNode } from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = <FolderOpen size={32} className="text-[var(--text-secondary)] opacity-70" />,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="glass-card p-12 flex flex-col items-center justify-center text-center border-dashed border-white/[0.1] my-6">
      <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{title}</h3>
      <p className="text-xs text-[var(--text-secondary)] opacity-70 max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
