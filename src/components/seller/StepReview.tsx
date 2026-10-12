"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  ExternalLink,
  IndianRupee,
  Info,
  MapPin,
  Package,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";
import type { SellerListingFormData } from "@/types/seller-listing";

interface StepReviewProps {
  formData: SellerListingFormData;
  onBack: () => void;
  onReset: () => void;
}

export function StepReview({
  formData,
  onBack,
  onReset,
}: StepReviewProps) {
  const [submitted, setSubmitted] = useState(false);

  const { category, details, condition, photos } = formData;

  const uploadedPhotos = Object.values(photos).filter((p) => Boolean(p.previewUrl));

  function getConditionLabel(cond: string) {
    switch (cond) {
      case "like_new":
        return "Like New / Flawless";
      case "excellent":
        return "Excellent";
      case "good":
        return "Good";
      case "fair":
        return "Fair";
      case "flawless":
        return "Flawless";
      case "minor_scratches":
        return "Minor Hairline Scratches";
      case "deep_scratches":
        return "Visible / Deep Scratches";
      case "cracked":
        return "Cracked Glass";
      case "pristine":
        return "Pristine";
      case "light_wear":
        return "Light Cosmetic Wear";
      case "visible_dents_scuffs":
        return "Visible Scuffs & Dents";
      case "heavy_wear":
        return "Heavy Wear";
      default:
        return cond;
    }
  }

  function handleSubmitDemo() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#e4dbd2] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2ea] text-[#d96532]">
          <CheckCircle className="h-8 w-8" />
        </div>

        <span className="rounded-full bg-[#fff2ea] border border-[#d96532]/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d96532]">
          Milestone 3A Listing Preview Verified
        </span>

        <h2 className="mt-4 text-[26px] font-semibold tracking-[-0.04em] text-[#26231f]">
          Listing Flow Completed
        </h2>

        <p className="mx-auto mt-2 max-w-[500px] text-[13px] leading-6 text-[#716960]">
          Your device information, seller declarations, and local photo previews have been verified in the 5-step wizard.
        </p>

        <div className="mx-auto my-6 max-w-[480px] rounded-xl border border-[#e4dbd2] bg-[#faf8f4] p-4 text-left text-[12px] text-[#4a4540]">
          <p className="font-bold text-[#26231f]">Upcoming in Milestone 3:</p>
          <ul className="mt-1.5 list-disc pl-4 space-y-1 text-[#716960]">
            <li>Cloudinary permanent image upload pipeline</li>
            <li>Computer Vision AI inspection &amp; Condition Grade (A/B/C/D)</li>
            <li>Algorithmic fair market pricing recommendation</li>
            <li>Real database persistence to Supabase <code className="text-[#26231f]">listings</code> table</li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl border border-[#e4dbd2] bg-white px-5 py-2.5 text-[12px] font-bold text-[#4a4540] transition hover:border-[#d96532] hover:text-[#d96532]"
          >
            <RotateCcw className="h-3.5 w-3.5" /> List Another Device
          </button>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-[#26231f] px-6 py-2.5 text-[12px] font-bold text-white transition hover:bg-[#d96532]"
          >
            Go to Seller Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d96532]">
          Step 5 of 5
        </span>
        <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.04em] text-[#26231f]">
          Review Listing Details
        </h2>
        <p className="mt-1 text-[13px] text-[#716960]">
          Review your device specifications and condition declarations before finalizing.
        </p>
      </div>

      <div className="space-y-5">
        {/* Header summary card */}
        <div className="rounded-2xl border border-[#e4dbd2] bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0e9e1] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#fff2ea] border border-[#d96532]/30 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d96532]">
                  {category?.name}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-[#716960]">
                  <MapPin className="h-3.5 w-3.5 text-[#d96532]" /> {details.city}
                </span>
              </div>

              <h3 className="mt-2 text-[20px] font-bold text-[#26231f]">
                {details.title}
              </h3>
              <p className="text-[12px] text-[#716960]">
                Brand: <strong className="text-[#26231f]">{details.brand}</strong> · Model: <strong className="text-[#26231f]">{details.model}</strong>
              </p>
            </div>

            <div className="rounded-2xl bg-[#faf8f4] border border-[#e4dbd2] p-4 text-right sm:min-w-[160px]">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#9b9087]">
                Asking Price
              </p>
              <p className="mt-0.5 flex items-center justify-end text-[22px] font-bold text-[#26231f]">
                <IndianRupee className="h-4 w-4" />
                {details.askingPriceINR?.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Specifications grid */}
          <div className="mt-5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9b9087] mb-3">
              Technical Specifications
            </h4>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {details.storage && (
                <div className="rounded-xl bg-[#faf8f4] p-3 border border-[#f0e9e1]">
                  <p className="text-[9px] font-bold uppercase text-[#9b9087]">Storage</p>
                  <p className="mt-0.5 text-[13px] font-bold text-[#26231f]">{details.storage}</p>
                </div>
              )}

              {details.ram && (
                <div className="rounded-xl bg-[#faf8f4] p-3 border border-[#f0e9e1]">
                  <p className="text-[9px] font-bold uppercase text-[#9b9087]">RAM</p>
                  <p className="mt-0.5 text-[13px] font-bold text-[#26231f]">{details.ram}</p>
                </div>
              )}

              {details.batteryHealth && (
                <div className="rounded-xl bg-[#faf8f4] p-3 border border-[#f0e9e1]">
                  <p className="text-[9px] font-bold uppercase text-[#9b9087]">Battery Health</p>
                  <p className="mt-0.5 text-[13px] font-bold text-[#26231f]">{details.batteryHealth}%</p>
                </div>
              )}

              {details.processor && (
                <div className="rounded-xl bg-[#faf8f4] p-3 border border-[#f0e9e1]">
                  <p className="text-[9px] font-bold uppercase text-[#9b9087]">Processor</p>
                  <p className="mt-0.5 text-[13px] font-bold text-[#26231f]">{details.processor}</p>
                </div>
              )}

              {details.edition && (
                <div className="rounded-xl bg-[#faf8f4] p-3 border border-[#f0e9e1]">
                  <p className="text-[9px] font-bold uppercase text-[#9b9087]">Edition</p>
                  <p className="mt-0.5 text-[13px] font-bold text-[#26231f]">{details.edition}</p>
                </div>
              )}

              {details.controllerCount !== undefined && (
                <div className="rounded-xl bg-[#faf8f4] p-3 border border-[#f0e9e1]">
                  <p className="text-[9px] font-bold uppercase text-[#9b9087]">Controllers</p>
                  <p className="mt-0.5 text-[13px] font-bold text-[#26231f]">{details.controllerCount}</p>
                </div>
              )}

              {details.cellular !== undefined && (
                <div className="rounded-xl bg-[#faf8f4] p-3 border border-[#f0e9e1]">
                  <p className="text-[9px] font-bold uppercase text-[#9b9087]">Connectivity</p>
                  <p className="mt-0.5 text-[13px] font-bold text-[#26231f]">{details.cellular ? "Cellular + Wi-Fi" : "Wi-Fi Only"}</p>
                </div>
              )}
            </div>
          </div>

          {details.description && (
            <div className="mt-5 pt-5 border-t border-[#f0e9e1]">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9b9087] mb-1.5">
                Seller Notes
              </h4>
              <p className="text-[13px] leading-6 text-[#4a4540]">
                {details.description}
              </p>
            </div>
          )}
        </div>

        {/* Condition Summary */}
        <div className="rounded-2xl border border-[#e4dbd2] bg-white p-6 shadow-sm">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9b9087] mb-3">
            Seller Condition Declarations
          </h4>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#faf8f4] p-3.5 border border-[#f0e9e1]">
              <p className="text-[10px] font-bold uppercase text-[#9b9087]">Overall Rating</p>
              <p className="mt-1 text-[13px] font-bold text-[#26231f]">
                {getConditionLabel(condition.overallCondition)}
              </p>
            </div>

            {condition.screenCondition !== "not_applicable" && (
              <div className="rounded-xl bg-[#faf8f4] p-3.5 border border-[#f0e9e1]">
                <p className="text-[10px] font-bold uppercase text-[#9b9087]">Screen Status</p>
                <p className="mt-1 text-[13px] font-bold text-[#26231f]">
                  {getConditionLabel(condition.screenCondition)}
                </p>
              </div>
            )}

            <div className="rounded-xl bg-[#faf8f4] p-3.5 border border-[#f0e9e1]">
              <p className="text-[10px] font-bold uppercase text-[#9b9087]">Body Enclosure</p>
              <p className="mt-1 text-[13px] font-bold text-[#26231f]">
                {getConditionLabel(condition.bodyCondition)}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 pt-4 border-t border-[#f0e9e1]">
            <div>
              <p className="text-[11px] font-bold text-[#4a4540] mb-2">Functional Status:</p>
              {condition.functionalIssues.length > 0 ? (
                <ul className="space-y-1.5">
                  {condition.functionalIssues.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[12px] text-[#26231f]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d96532]" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[12px] text-[#716960]">None declared</p>
              )}
            </div>

            <div>
              <p className="text-[11px] font-bold text-[#4a4540] mb-2">Accessories Included:</p>
              {condition.accessoriesIncluded.length > 0 ? (
                <ul className="space-y-1.5">
                  {condition.accessoriesIncluded.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[12px] text-[#26231f]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[12px] text-[#716960]">Device only</p>
              )}
            </div>
          </div>
        </div>

        {/* Photos Preview Gallery */}
        <div className="rounded-2xl border border-[#e4dbd2] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9b9087]">
              Attached Photos ({uploadedPhotos.length} Angles)
            </h4>
            <span className="text-[10px] text-[#716960]">
              Local preview
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {uploadedPhotos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-xl border border-[#e4dbd2] bg-[#faf8f4] p-2"
              >
                <div className="h-28 w-full">
                  <img
                    src={photo.previewUrl}
                    alt={photo.label}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="mt-2 text-center text-[10px] font-bold text-[#4a4540]">
                  {photo.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Action */}
      <div className="flex items-center justify-between pt-4 border-t border-[#e4dbd2]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-[#e4dbd2] bg-white px-5 py-3 text-[13px] font-bold text-[#4a4540] transition hover:border-[#d96532] hover:text-[#d96532]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Photos
        </button>

        <button
          type="button"
          onClick={handleSubmitDemo}
          className="inline-flex items-center gap-2 rounded-xl bg-[#d96532] px-7 py-3 text-[13px] font-bold text-white shadow-sm transition hover:bg-[#e07645]"
        >
          <Check className="h-4 w-4" /> Submit Listing (Demo)
        </button>
      </div>
    </div>
  );
}
