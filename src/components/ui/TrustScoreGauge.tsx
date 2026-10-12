import React from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrustScoreGaugeProps {
  score: number;
  variant?: "pill" | "radial" | "card";
  showShield?: boolean;
  className?: string;
  onClick?: () => void;
}

export function TrustScoreGauge({
  score,
  variant = "pill",
  showShield = true,
  className,
  onClick,
}: TrustScoreGaugeProps) {
  const getStatus = (val: number) => {
    if (val >= 90) return { label: "Verified Excellent", color: "text-emerald-600 dark:text-emerald-400", ring: "stroke-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/25" };
    if (val >= 80) return { label: "Verified Good", color: "text-teal-600 dark:text-teal-400", ring: "stroke-teal-500", bg: "bg-teal-500/10 border-teal-500/25" };
    if (val >= 70) return { label: "Moderate Trust", color: "text-amber-600 dark:text-amber-400", ring: "stroke-amber-500", bg: "bg-amber-500/10 border-amber-500/25" };
    return { label: "Needs Verification", color: "text-rose-600 dark:text-rose-400", ring: "stroke-rose-500", bg: "bg-rose-500/10 border-rose-500/25" };
  };

  const status = getStatus(score);

  if (variant === "radial") {
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div
        className={cn(
          "inline-flex items-center gap-3 p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm",
          onClick && "cursor-pointer hover:border-teal-500 transition-colors",
          className
        )}
        onClick={onClick}
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="4.5"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              className={cn("transition-all duration-700 ease-out", status.ring)}
              strokeWidth="4.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
              {score}
            </span>
            <span className="text-[9px] font-medium text-slate-400">/100</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-white">
            {showShield && <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />}
            <span>Trust Score</span>
          </div>
          <span className={cn("text-[11px] font-medium block", status.color)}>
            {status.label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-all",
        status.bg,
        onClick && "cursor-pointer hover:opacity-90 active:scale-95",
        className
      )}
      onClick={onClick}
    >
      {showShield && <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
      <span className="font-semibold text-slate-900 dark:text-slate-100">
        Trust <span className="font-mono">{score}</span>
      </span>
      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">/100</span>
    </div>
  );
}
