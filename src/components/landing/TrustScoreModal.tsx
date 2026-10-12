"use client";

import React from "react";
import { X, ShieldCheck, Sparkles, CheckCircle2, Info } from "lucide-react";
import { TRUST_SCORE_FACTORS } from "@/data/mock-landing-data";

export interface TrustScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrustScoreModal({ isOpen, onClose }: TrustScoreModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                ReGrade Trust Score Formula
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Transparent 5-factor explainable index (0 to 100)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formula Display Box */}
        <div className="my-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
          <span className="text-teal-600 dark:text-teal-400 font-bold">TrustScore (T) = </span>
          (0.30 &times; S_ai) + (0.25 &times; S_seller) + (0.20 &times; S_fraud) + (0.15 &times; S_price) + (0.10 &times; S_spec)
        </div>

        {/* 5 Factors Breakdown Table */}
        <div className="space-y-3">
          {TRUST_SCORE_FACTORS.map((factor) => (
            <div
              key={factor.name}
              className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{factor.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-semibold text-[10px]">
                    {factor.weight}% Weight
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{factor.description}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                  {factor.scoreSample}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            100% Deterministic & Explainable
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold hover:opacity-90"
          >
            Close Breakdown
          </button>
        </div>

      </div>
    </div>
  );
}
