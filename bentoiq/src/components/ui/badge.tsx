"use client";

import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-tight transition-colors border",
  {
    variants: {
      variant: {
        default:  "bg-white/[0.06] border-white/[0.10] text-[var(--text-primary)]",
        blue:     "bg-blue-500/10 border-blue-500/20 text-blue-400",
        emerald:  "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        purple:   "bg-purple-500/10 border-purple-500/20 text-purple-400",
        amber:    "bg-amber-500/10 border-amber-500/20 text-amber-400",
        red:      "bg-red-500/10 border-red-500/20 text-red-400",
        outline:  "bg-transparent border-white/[0.15] text-[var(--text-secondary)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
