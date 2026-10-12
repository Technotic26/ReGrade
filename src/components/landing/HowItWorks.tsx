"use client";

import React, { useState } from "react";
import { 
  Camera, 
  Cpu, 
  Sparkles, 
  Truck, 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  TrendingUp, 
  Layers,
  ArrowRight
} from "lucide-react";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      stepNumber: "01",
      icon: Camera,
      title: "Guided Multi-Angle Upload",
      tagline: "Standardized Image Capture in 60 Seconds",
      description:
        "Sellers are guided through category-specific angle prompts (e.g. Screen ON/OFF, ports, chassis, camera module). Our system scrubs private EXIF data and computes perceptual image hashes to prevent duplicate or stolen photos.",
      highlights: [
        "Category-specific angle guidance",
        "pHash duplicate & stolen image screening",
        "IMEI & serial number validation",
      ],
      badge: "Seller Experience",
    },
    {
      stepNumber: "02",
      icon: Cpu,
      title: "AI Grading & Fair Pricing",
      tagline: "Automated Inspection & Market Valuation",
      description:
        "The AI defect engine analyzes surface anomalies (scratches, cracks, dents, keycap wear) and assigns a condition Grade (A, B, C, D) with localized bounding boxes. Our depreciation algorithm calculates a fair market price band in INR (₹).",
      highlights: [
        "Defect bounding-box localization",
        "Transparent Grade A, B, C, D output",
        "Indian depreciation-based valuation",
      ],
      badge: "AI Processing Engine",
    },
    {
      stepNumber: "03",
      icon: Wrench,
      title: "Buy As-Is or Refurbished",
      tagline: "Dual Fulfillment & 72h Protection",
      description:
        "Buyers choose between Direct As-Is delivery or routing the item through certified local repair partners for battery/screen replacement or ultrasonic cleaning. All orders feature a 72-hour inspection window.",
      highlights: [
        "Buy As-Is for direct peer value",
        "Buy Refurbished for certified upgrades",
        "72-Hour post-delivery inspection window",
      ],
      badge: "Buyer & Partner Hub",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3 border border-teal-200 dark:border-teal-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent 3-Step Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How ReGrade Works
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Eliminating guesswork, haggling, and distrust in second-hand electronics with an automated verification and fulfillment pipeline.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx + 1;

            return (
              <div
                key={step.stepNumber}
                onClick={() => setActiveStep(idx + 1)}
                className={`relative rounded-3xl p-8 border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-b from-teal-500/[0.06] via-white dark:via-slate-900 to-white dark:to-slate-900 border-teal-500 shadow-xl shadow-teal-500/10 ring-1 ring-teal-500"
                    : "bg-slate-50/70 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-teal-600 dark:text-teal-400">
                      {step.stepNumber}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-3">
                    {step.tagline}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Checklist Highlights */}
                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
                  {step.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
