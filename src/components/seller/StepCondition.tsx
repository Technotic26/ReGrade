"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type {
  ConditionData,
  OverallConditionType,
  ScreenConditionType,
  BodyConditionType,
} from "@/types/seller-listing";

interface StepConditionProps {
  condition: ConditionData;
  categorySlug: string;
  onChange: (condition: ConditionData) => void;
  onNext: () => void;
  onBack: () => void;
}

const OVERALL_CONDITIONS: {
  id: OverallConditionType;
  title: string;
  description: string;
}[] = [
  {
    id: "like_new",
    title: "Like New / Flawless",
    description: "Barely used, zero scratches or dents. Flawless hardware and screen.",
  },
  {
    id: "excellent",
    title: "Excellent",
    description: "Very light micro-wear visible only under direct light. 100% functional.",
  },
  {
    id: "good",
    title: "Good",
    description: "Moderate signs of honest use (minor scuffs or edge wear). Works perfectly.",
  },
  {
    id: "fair",
    title: "Fair",
    description: "Visible scratches, deeper scuffs, or minor battery wear. Fully functional.",
  },
];

const SCREEN_CONDITIONS: {
  id: ScreenConditionType;
  title: string;
  description: string;
}[] = [
  {
    id: "flawless",
    title: "Flawless — No Scratches",
    description: "Screen looks brand new. No dead pixels or micro-scratches.",
  },
  {
    id: "minor_scratches",
    title: "Minor Hairline Scratches",
    description: "Faint hairline scratches only visible when screen is turned off.",
  },
  {
    id: "deep_scratches",
    title: "Visible / Deep Scratches",
    description: "Scratches can be felt with a fingernail or seen when display is on.",
  },
  {
    id: "cracked",
    title: "Cracked or Chipped Glass",
    description: "Surface glass has hairline cracks or edge chipping.",
  },
  {
    id: "not_applicable",
    title: "Not Applicable",
    description: "For audio or devices without a display screen.",
  },
];

const BODY_CONDITIONS: {
  id: BodyConditionType;
  title: string;
  description: string;
}[] = [
  {
    id: "pristine",
    title: "Pristine",
    description: "Enclosure has no dings, paint chips, or corner scuffs.",
  },
  {
    id: "light_wear",
    title: "Light Cosmetic Wear",
    description: "Very slight corner rub or minor pocket wear.",
  },
  {
    id: "visible_dents_scuffs",
    title: "Visible Scuffs & Dents",
    description: "Small corner dents, noticeable frame scuffs, or paint fading.",
  },
  {
    id: "heavy_wear",
    title: "Heavy Wear",
    description: "Significant casing damage, heavy scuffing, or missing port covers.",
  },
];

const FUNCTIONAL_ITEMS = [
  "None — Everything works 100% properly",
  "Battery health degraded (drains faster than normal)",
  "Camera has minor haze, dust, or lens scratch",
  "Speaker / Microphone volume lower than normal",
  "Buttons / switches require extra force",
  "Charging port requires slight angle to connect",
  "Display has minor backlight bleed or dead pixel",
  "Biometric sensor (Face ID / Fingerprint) faulty",
];

const ACCESSORIES_ITEMS = [
  "Original Retail Box",
  "Original Wall Charger",
  "Original Charging Cable",
  "Warranty Card / Purchase Bill / Invoice",
  "Protective Case / Screen Protector",
  "Extra Straps / Ear tips / Attachments",
  "None — Device Only",
];

export function StepCondition({
  condition,
  categorySlug,
  onChange,
  onNext,
  onBack,
}: StepConditionProps) {
  const isAudio = categorySlug === "headphones-audio";

  function toggleFunctional(item: string) {
    if (item.startsWith("None")) {
      onChange({
        ...condition,
        functionalIssues: condition.functionalIssues.includes(item)
          ? []
          : [item],
      });
      return;
    }

    const withoutNone = condition.functionalIssues.filter(
      (i) => !i.startsWith("None")
    );
    const exists = withoutNone.includes(item);
    const updated = exists
      ? withoutNone.filter((i) => i !== item)
      : [...withoutNone, item];

    onChange({ ...condition, functionalIssues: updated });
  }

  function toggleAccessory(item: string) {
    if (item.startsWith("None")) {
      onChange({
        ...condition,
        accessoriesIncluded: condition.accessoriesIncluded.includes(item)
          ? []
          : [item],
      });
      return;
    }

    const withoutNone = condition.accessoriesIncluded.filter(
      (i) => !i.startsWith("None")
    );
    const exists = withoutNone.includes(item);
    const updated = exists
      ? withoutNone.filter((i) => i !== item)
      : [...withoutNone, item];

    onChange({ ...condition, accessoriesIncluded: updated });
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d96532]">
          Step 3 of 5
        </span>
        <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.04em] text-[#26231f]">
          Condition &amp; Device Information
        </h2>
        <p className="mt-1 text-[13px] text-[#716960]">
          Declare your device&apos;s physical and functional status honestly to build buyer trust.
        </p>
      </div>

      {/* Honest Seller Notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#e4dbd2] bg-[#fff8f5] p-4 text-[12px] text-[#4a4540]">
        <Info className="h-5 w-5 shrink-0 text-[#d96532] mt-0.5" />
        <div>
          <p className="font-bold text-[#26231f]">
            Seller Declaration Notice
          </p>
          <p className="mt-0.5 leading-5 text-[#716960]">
            These inputs are your honest self-declaration. In Milestone 3, our AI condition inspection will verify device photos to assign the final Grade (A/B/C/D) and ReGrade Trust Score.
          </p>
        </div>
      </div>

      {/* 1. Overall Condition */}
      <div className="rounded-2xl border border-[#e4dbd2] bg-white p-6 shadow-sm">
        <label className="block text-[13px] font-bold text-[#26231f]">
          1. Overall Condition Rating <span className="text-[#d96532]">*</span>
        </label>
        <p className="mt-0.5 text-[11px] text-[#716960]">
          Select the statement that best matches the general wear and tear.
        </p>

        <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
          {OVERALL_CONDITIONS.map((opt) => {
            const isSelected = condition.overallCondition === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onChange({ ...condition, overallCondition: opt.id })
                }
                className={`relative flex flex-col text-left rounded-xl p-3.5 border transition-all ${
                  isSelected
                    ? "border-[#d96532] bg-[#fff8f5] ring-1 ring-[#d96532]"
                    : "border-[#e4dbd2] bg-white hover:border-[#d9b6a3] hover:bg-[#faf6f2]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold text-[#26231f]">
                    {opt.title}
                  </p>
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      isSelected
                        ? "border-[#d96532] bg-[#d96532] text-white"
                        : "border-[#d4c9be] bg-white"
                    }`}
                  >
                    {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-4 text-[#716960]">
                  {opt.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Screen & Display Condition */}
      {!isAudio && (
        <div className="rounded-2xl border border-[#e4dbd2] bg-white p-6 shadow-sm">
          <label className="block text-[13px] font-bold text-[#26231f]">
            2. Screen &amp; Display Condition <span className="text-[#d96532]">*</span>
          </label>
          <p className="mt-0.5 text-[11px] text-[#716960]">
            Assess the glass and display panel for scratches or flaws.
          </p>

          <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
            {SCREEN_CONDITIONS.filter((c) => c.id !== "not_applicable").map(
              (opt) => {
                const isSelected = condition.screenCondition === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      onChange({ ...condition, screenCondition: opt.id })
                    }
                    className={`flex items-start justify-between text-left rounded-xl p-3 border transition-all ${
                      isSelected
                        ? "border-[#d96532] bg-[#fff8f5] ring-1 ring-[#d96532]"
                        : "border-[#e4dbd2] bg-white hover:border-[#d9b6a3]"
                    }`}
                  >
                    <div>
                      <p className="text-[12px] font-bold text-[#26231f]">
                        {opt.title}
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#716960]">
                        {opt.description}
                      </p>
                    </div>
                    <span
                      className={`ml-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-[#d96532] bg-[#d96532] text-white"
                          : "border-[#d4c9be] bg-white"
                      }`}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* 3. Body & Enclosure Condition */}
      <div className="rounded-2xl border border-[#e4dbd2] bg-white p-6 shadow-sm">
        <label className="block text-[13px] font-bold text-[#26231f]">
          3. Body &amp; Enclosure Condition <span className="text-[#d96532]">*</span>
        </label>
        <p className="mt-0.5 text-[11px] text-[#716960]">
          Inspect corners, back panel, frame, and edges.
        </p>

        <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
          {BODY_CONDITIONS.map((opt) => {
            const isSelected = condition.bodyCondition === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onChange({ ...condition, bodyCondition: opt.id })
                }
                className={`flex items-start justify-between text-left rounded-xl p-3 border transition-all ${
                  isSelected
                    ? "border-[#d96532] bg-[#fff8f5] ring-1 ring-[#d96532]"
                    : "border-[#e4dbd2] bg-white hover:border-[#d9b6a3]"
                }`}
              >
                <div>
                  <p className="text-[12px] font-bold text-[#26231f]">
                    {opt.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#716960]">
                    {opt.description}
                  </p>
                </div>
                <span
                  className={`ml-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-[#d96532] bg-[#d96532] text-white"
                      : "border-[#d4c9be] bg-white"
                  }`}
                >
                  {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Functional Checks */}
      <div className="rounded-2xl border border-[#e4dbd2] bg-white p-6 shadow-sm">
        <label className="block text-[13px] font-bold text-[#26231f]">
          4. Functional Status &amp; Known Issues
        </label>
        <p className="mt-0.5 text-[11px] text-[#716960]">
          Select all that apply to your device.
        </p>

        <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
          {FUNCTIONAL_ITEMS.map((item) => {
            const checked = condition.functionalIssues.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleFunctional(item)}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition ${
                  checked
                    ? "border-[#d96532] bg-[#fff8f5] text-[#26231f]"
                    : "border-[#e4dbd2] bg-white text-[#4a4540] hover:border-[#d9b6a3]"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    checked
                      ? "border-[#d96532] bg-[#d96532] text-white"
                      : "border-[#d4c9be] bg-white"
                  }`}
                >
                  {checked && <Check className="h-3 w-3 stroke-[3]" />}
                </span>
                <span className="text-[12px] font-medium leading-4">
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Accessories Included */}
      <div className="rounded-2xl border border-[#e4dbd2] bg-white p-6 shadow-sm">
        <label className="block text-[13px] font-bold text-[#26231f]">
          5. Included Accessories &amp; Packaging
        </label>
        <p className="mt-0.5 text-[11px] text-[#716960]">
          Items bundled with the device increase buyer confidence.
        </p>

        <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
          {ACCESSORIES_ITEMS.map((item) => {
            const checked = condition.accessoriesIncluded.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleAccessory(item)}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition ${
                  checked
                    ? "border-[#d96532] bg-[#fff8f5] text-[#26231f]"
                    : "border-[#e4dbd2] bg-white text-[#4a4540] hover:border-[#d9b6a3]"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    checked
                      ? "border-[#d96532] bg-[#d96532] text-white"
                      : "border-[#d4c9be] bg-white"
                  }`}
                >
                  {checked && <Check className="h-3 w-3 stroke-[3]" />}
                </span>
                <span className="text-[12px] font-medium leading-4">
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#e4dbd2]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-[#e4dbd2] bg-white px-5 py-3 text-[13px] font-bold text-[#4a4540] transition hover:border-[#d96532] hover:text-[#d96532]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Details
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26231f] px-6 py-3 text-[13px] font-bold text-white transition hover:bg-[#d96532]"
        >
          Continue to Photos <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
