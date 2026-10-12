"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { TrustScoreModal } from "./TrustScoreModal";
import { Button } from "@/components/ui/Button";

export function TrustPillars() {
  const [modalOpen, setModalOpen] = useState(false);

  const pillars = [
    {
      icon: Cpu,
      title: "Vision AI Condition Grading",
      subtitle: "Grades A, B, C & D with Localized Defect Boxes",
      description:
        "Our vision models inspect multi-angle photos for scratches, dents, cracked glass, dead pixels, and keycap wear. Each defect is mapped to pixel coordinates on the photo with an explainable breakdown.",
      tag: "Roboflow & YOLOv8 Core",
      color: "from-teal-500/10 to-teal-500/0",
      accent: "text-teal-600 dark:text-teal-400",
    },
    {
      icon: TrendingUp,
      title: "Market-Calibrated Dynamic Pricing",
      subtitle: "Depreciation Curves in INR (₹)",
      description:
        "We eliminate unrealistic price tags. Our valuation algorithm applies category-specific monthly decay curves, launch MSRP baselines, and condition grade multipliers to calculate fair market bands.",
      tag: "Indian Market Benchmarks",
      color: "from-emerald-500/10 to-emerald-500/0",
      accent: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: ShieldAlert,
      title: "Perceptual Hash Anti-Fraud",
      subtitle: "Stops Stolen Images & Scam Listings",
      description:
        "Every uploaded photo is hashed using sharp-phash to detect reused stock photos or images stolen from other platforms. IMEI and serial numbers are verified against format and active database records.",
      tag: "Duplicate Image Screening",
      color: "from-rose-500/10 to-rose-500/0",
      accent: "text-rose-600 dark:text-rose-400",
    },
    {
      icon: ShieldCheck,
      title: "ReGrade Trust Score (0–100)",
      subtitle: "Explainable Composite Safety Rating",
      description:
        "Every listing gets a single composite score combining AI verification confidence (30%), seller track record (25%), anti-fraud clearance (20%), price fairness (15%), and hardware specs (10%).",
      tag: "Deterministic Math Index",
      color: "from-indigo-500/10 to-indigo-500/0",
      accent: "text-indigo-600 dark:text-indigo-400",
      hasModalTrigger: true,
    },
    {
      icon: Clock,
      title: "72-Hour Post-Delivery Window",
      subtitle: "Funds Held Safely Until Inspection",
      description:
        "Upon delivery confirmation, a 72-hour timer begins. Buyers inspect their device against the AI report. Payout eligibility is released only when confirmed or when the 72-hour window safely clears.",
      tag: "Dispute & Return Safety",
      color: "from-amber-500/10 to-amber-500/0",
      accent: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Wrench,
      title: "Certified Partner Refurbishment",
      subtitle: "Local Repair Shops Upgrade Device Life",
      description:
        "Devices needing battery swaps, screen replacements, or thermal cleaning can be routed to authorized local repair shops. The upgraded Grade A/B device is then dispatched directly to the buyer.",
      tag: "Repair Cost Estimation",
      color: "from-cyan-500/10 to-cyan-500/0",
      accent: "text-cyan-600 dark:text-cyan-400",
    },
  ];

  return (
    <section id="trust" className="py-20 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3 border border-teal-200 dark:border-teal-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The ReGrade Trust Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built to Eliminate Information Asymmetry
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Every feature on ReGrade is engineered to make peer-to-peer electronics transactions as safe, predictable, and transparent as buying brand new.
          </p>
        </div>

        {/* 6 Trust Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.title}
                className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7 flex flex-col justify-between hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
              >
                <div>
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${pillar.accent}`} />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-3">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Optional Action Button */}
                {pillar.hasModalTrigger && (
                  <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                    >
                      <span>Explore Trust Score Formula</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Trust Score Breakdown Modal */}
      <TrustScoreModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
