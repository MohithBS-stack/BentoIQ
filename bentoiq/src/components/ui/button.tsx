"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 hover:bg-blue-500 text-[var(--text-primary)] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 border border-blue-500/30",
        secondary:
          "bg-white/[0.06] hover:bg-white/[0.10] text-[var(--text-primary)] border border-white/[0.08] hover:border-white/[0.16]",
        outline:
          "bg-transparent hover:bg-white/[0.05] text-[var(--text-primary)] border border-white/[0.12] hover:border-white/[0.24]",
        ghost:
          "bg-transparent hover:bg-white/[0.06] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        danger:
          "bg-red-600/80 hover:bg-red-500 text-[var(--text-primary)] shadow-lg shadow-red-500/20 border border-red-500/30",
        success:
          "bg-emerald-600/80 hover:bg-emerald-500 text-[var(--text-primary)] shadow-lg shadow-emerald-500/20 border border-emerald-500/30",
        glass:
          "bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md text-[var(--text-primary)] border border-white/[0.08] hover:border-white/[0.16]",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-lg gap-1.5",
        sm: "h-8 px-3.5 text-xs rounded-xl gap-1.5",
        md: "h-10 px-4 text-sm rounded-xl gap-2",
        lg: "h-12 px-6 text-sm rounded-2xl gap-2.5",
        xl: "h-14 px-8 text-base rounded-2xl gap-3 font-bold",
        icon: "h-9 w-9 p-0 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white anim-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
