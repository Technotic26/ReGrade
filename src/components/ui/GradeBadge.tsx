import React from "react";
import { cn } from "@/lib/utils";

export interface GradeBadgeProps {
  grade: "A" | "B" | "C" | "D";
  confidence?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GradeBadge({
  grade,
  confidence,
  showLabel = false,
  size = "md",
  className,
}: GradeBadgeProps) {
  const gradeConfig = {
    A: {
      color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
      pill: "bg-emerald-500 text-white",
      label: "Pristine",
    },
    B: {
      color: "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30",
      pill: "bg-sky-500 text-white",
      label: "Good",
    },
    C: {
      color: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
      pill: "bg-amber-500 text-white",
      label: "Fair Wear",
    },
    D: {
      color: "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
      pill: "bg-rose-500 text-white",
      label: "Needs Repair",
    },
  };

  const current = gradeConfig[grade];

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5 gap-1.5",
    md: "text-xs px-2.5 py-1 gap-2",
    lg: "text-sm px-3.5 py-1.5 gap-2.5",
  };

  const pillSizes = {
    sm: "w-4 h-4 text-[10px]",
    md: "w-5 h-5 text-xs font-bold",
    lg: "w-6 h-6 text-sm font-bold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        current.color,
        sizeStyles[size],
        className
      )}
    >
      <span
        className={cn(
          "rounded-full flex items-center justify-center font-bold tracking-tight shadow-sm",
          current.pill,
          pillSizes[size]
        )}
      >
        {grade}
      </span>
      <span className="font-semibold tracking-tight">
        Grade {grade}
        {showLabel && <span className="opacity-80 font-normal ml-1">({current.label})</span>}
      </span>
      {confidence !== undefined && (
        <span className="text-[10px] font-mono opacity-75 border-l border-current/20 pl-1.5">
          {confidence}%
        </span>
      )}
    </div>
  );
}
