"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Wrench, 
  TrendingDown, 
  Scan, 
  Battery, 
  Cpu, 
  Layers,
  ArrowRight,
  Info
} from "lucide-react";
import { GradeBadge } from "@/components/ui/GradeBadge";
import { TrustScoreGauge } from "@/components/ui/TrustScoreGauge";
import { formatINR } from "@/lib/utils";

export function HeroVisualCard() {
  const [activeTab, setActiveTab] = useState<"inspect" | "pricing" | "trust">("inspect");
  const [selectedMode, setSelectedMode] = useState<"as_is" | "refurbished">("as_is");

  const asIsPrice = 35999;
  const refurbPrice = 38799;
  const launchMSRP = 69900;
  const savingsPercent = Math.round(((launchMSRP - (selectedMode === "as_is" ? asIsPrice : refurbPrice)) / launchMSRP) * 100);

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Decorative Glow Elements */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Card Container */}
      <div className="relative rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300">
        
        {/* Top App Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300">
              LIVE AI INSPECTION PIPELINE
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-100/70 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800">
            Smartphones •; Tier 1
          </span>
        </div>

        {/* Device Summary Rail */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Verified Listing Sample
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Apple iPhone 13 (128GB)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Midnight Blue •; 6.1-inch Super Retina OLED •; 14 Months Old
              </p>
            </div>
            <GradeBadge grade="A" confidence={96} showLabel size="md" />
          </div>

          {/* Interactive Inspection Tabs */}
          <div className="flex items-center gap-1.5 mt-5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-medium">
            <button
              onClick={() => setActiveTab("inspect")}
              className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "inspect"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Scan className="w-3.5 h-3.5 text-teal-600" />
              <span>Vision Defect Scan</span>
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "pricing"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5 text-teal-600" />
              <span>Fair Valuation</span>
            </button>
            <button
              onClick={() => setActiveTab("trust")}
              className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "trust"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Trust Index</span>
            </button>
          </div>
        </div>

        {/* Tab Content Canvas */}
        <div className="px-6 py-2">
          {activeTab === "inspect" && (
            <div className="space-y-3 animate-in fade-in-50 duration-200">
              {/* Simulated Multi-Angle Bounding Box Preview */}
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 border border-slate-800 p-4 text-white overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                  <span>Roboflow YOLOv8 •; 5 Angles Processed</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 0 Glass Cracks
                  </span>
                </div>

                {/* Simulated Visual Phone Mockup with Detected Coordinates */}
                <div className="relative h-32 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-center overflow-hidden">
                  <div className="w-48 h-24 rounded-lg bg-slate-950 border border-slate-700 flex flex-col items-center justify-center relative shadow-inner">
                    {/* Screen Zone */}
                    <div className="w-40 h-16 rounded border border-dashed border-teal-500/40 flex items-center justify-center relative bg-teal-950/10">
                      <span className="text-[10px] text-teal-300 font-mono">Screen: Pristine (0 Scratches)</span>
                    </div>

                    {/* Detected Minor Micro-scuff Box */}
                    <div className="absolute -bottom-1 right-3 px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/60 text-[9px] text-amber-300 font-mono">
                      [12,40,22,55] Bezel Micro-scuff
                    </div>
                  </div>
                </div>

                {/* Checkpoint Indicators */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">OLED Panel</span>
                    <span className="font-semibold text-emerald-400">100% Zero Burn</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Battery Health</span>
                    <span className="font-semibold text-teal-300">91% (Pristine)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Ports & Camera</span>
                    <span className="font-semibold text-emerald-400">Pass (No Lint)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Launch MSRP (India 2021)</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 line-through">₹69,900</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Category Depreciation (k = 0.025, 24 mo)</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">-₹31,400</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Grade A Multiplier (0.88)</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">Fair Market Index</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-slate-900 dark:text-white">Recommended Fair Listing Band</span>
                <span className="font-bold font-mono text-teal-600 dark:text-teal-400">₹34,000 &ndash; ₹37,500</span>
              </div>
            </div>
          )}

          {activeTab === "trust" && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">ReGrade Trust Score</span>
                  <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">94/100 •; Verified Excellent</span>
                </div>
                <TrustScoreGauge score={94} variant="pill" />
              </div>
              <div className="space-y-1.5 text-[11px] pt-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>AI Visual Inspection (30%)</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">96 / 100</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Seller Reliability & History (25%)</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">92 / 100</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Anti-Fraud & Hash Clearance (20%)</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">98 / 100</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Pricing Fairness Alignment (15%)</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">90 / 100</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dual Fulfillment Selection Area */}
        <div className="p-6 pt-4 space-y-3 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800/80 mt-2">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Choose Buyer Fulfillment Mode:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* As-Is Option */}
            <button
              onClick={() => setSelectedMode("as_is")}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedMode === "as_is"
                  ? "border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 shadow-sm ring-1 ring-teal-500"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Buy As-Is</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                  Best Value
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Direct from seller in verified Grade A condition</p>
              <p className="text-sm font-extrabold font-mono text-slate-900 dark:text-white mt-2">
                {formatINR(asIsPrice)}
              </p>
            </button>

            {/* Refurbished Option */}
            <button
              onClick={() => setSelectedMode("refurbished")}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedMode === "refurbished"
                  ? "border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 shadow-sm ring-1 ring-teal-500"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Buy Refurbished</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold">
                  Certified
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Partner shop ultrasonic clean + new battery</p>
              <p className="text-sm font-extrabold font-mono text-slate-900 dark:text-white mt-2">
                {formatINR(refurbPrice)}
              </p>
            </button>
          </div>

          {/* Pricing Summary Bottom Pill */}
          <div className="p-3 rounded-xl bg-teal-600 text-white flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold block">
                {selectedMode === "as_is" ? "Direct As-Is Delivery" : "Partner Refurbished Delivery"}
              </span>
              <span className="text-[11px] opacity-90">
                Saves {savingsPercent}% vs Launch MRP ({formatINR(launchMSRP)})
              </span>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold font-mono">
                {formatINR(selectedMode === "as_is" ? asIsPrice : refurbPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
