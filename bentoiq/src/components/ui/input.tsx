"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-medium text-[var(--text-secondary)]">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08]",
            "text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] opacity-70",
            "focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40",
            "transition-all duration-150",
            error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/40",
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-[11px] text-red-400 font-medium">{error}</span>
        ) : hint ? (
          <span className="text-[11px] text-[var(--text-primary)]/35">{hint}</span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-medium text-[var(--text-secondary)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]",
            "text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] opacity-70",
            "focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40",
            "transition-all duration-150 min-h-[100px] resize-y",
            error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/40",
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-[11px] text-red-400 font-medium">{error}</span>
        ) : hint ? (
          <span className="text-[11px] text-[var(--text-primary)]/35">{hint}</span>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
