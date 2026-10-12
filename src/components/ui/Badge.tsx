import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "emerald" | "blue" | "amber" | "rose" | "neutral" | "outline";
  size?: "xs" | "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "brand",
  size = "sm",
  ...props
}: BadgeProps) {
  const variantStyles = {
    brand: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/25",
    emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
    blue: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
    rose: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25",
    neutral: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    outline: "bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700",
  };

  const sizeStyles = {
    xs: "text-[10px] px-1.5 py-0.5 rounded",
    sm: "text-xs px-2.5 py-0.5 rounded-full",
    md: "text-sm px-3 py-1 rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
