"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Image as ImageIcon,
  Info,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import type { PhotoSlotItem } from "@/types/seller-listing";

interface StepPhotosProps {
  photos: Record<string, PhotoSlotItem>;
  categorySlug: string;
  onChange: (photos: Record<string, PhotoSlotItem>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function getDefaultPhotoSlots(categorySlug: string): Record<string, PhotoSlotItem> {
  const isAudio = categorySlug === "headphones-audio";

  return {
    front: {
      id: "front",
      label: "Front Face",
      guideText: isAudio ? "Front view of headphones / case" : "Front angle showing full display",
      required: true,
    },
    back: {
      id: "back",
      label: "Back Panel",
      guideText: isAudio ? "Back view / charging case base" : "Rear cover, camera module & logo",
      required: true,
    },
    left_side: {
      id: "left_side",
      label: "Left Edge & Profile",
      guideText: "Left frame showing volume buttons / edge condition",
      required: false,
    },
    right_side: {
      id: "right_side",
      label: "Right Edge & Profile",
      guideText: "Right frame showing power key & SIM tray / ports",
      required: false,
    },
    screen_on: {
      id: "screen_on",
      label: isAudio ? "Ear Tips / Cushions" : "Screen Powered ON",
      guideText: isAudio ? "Clear view of cushions or ear tips" : "Display lit up showing white/bright background (no dead pixels)",
      required: !isAudio,
    },
    ports: {
      id: "ports",
      label: "Charging Port & Speaker",
      guideText: "Close-up of USB-C / Lightning / audio ports",
      required: false,
    },
    accessories: {
      id: "accessories",
      label: "Accessories & Box",
      guideText: "Original box, charger, bill, and bundled accessories together",
      required: false,
    },
  };
}

export function StepPhotos({
  photos,
  categorySlug,
  onChange,
  onNext,
  onBack,
}: StepPhotosProps) {
  const [error, setError] = useState<string | null>(null);

  // Initialize slots if empty
  const currentSlots = Object.keys(photos).length > 0
    ? photos
    : getDefaultPhotoSlots(categorySlug);

  function handleFileSelected(slotId: string, file: File | null) {
    if (!file) return;

    // Validate image format
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    // Validate size (< 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setError("Image file size should be less than 15MB.");
      return;
    }

    setError(null);
    const previewUrl = URL.createObjectURL(file);

    const updated = {
      ...currentSlots,
      [slotId]: {
        ...currentSlots[slotId],
        file,
        previewUrl,
      },
    };

    onChange(updated);
  }

  function handleRemovePhoto(slotId: string) {
    const slot = currentSlots[slotId];
    if (slot?.previewUrl) {
      URL.revokeObjectURL(slot.previewUrl);
    }

    const updated = {
      ...currentSlots,
      [slotId]: {
        ...currentSlots[slotId],
        file: undefined,
        previewUrl: undefined,
      },
    };

    onChange(updated);
  }

  function handleContinue() {
    // Check if required photos are uploaded
    const missingRequired = Object.values(currentSlots).filter(
      (slot) => slot.required && !slot.previewUrl
    );

    if (missingRequired.length > 0) {
      setError(
        `Please provide required photos: ${missingRequired
          .map((s) => s.label)
          .join(", ")}.`
      );
      return;
    }

    setError(null);
    onNext();
  }

  const uploadedCount = Object.values(currentSlots).filter(
    (s) => !!s.previewUrl
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d96532]">
            Step 4 of 5
          </span>
          <span className="text-[12px] font-semibold text-[#716960]">
            {uploadedCount} of {Object.keys(currentSlots).length} angles captured
          </span>
        </div>
        <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.04em] text-[#26231f]">
          Device Photos &amp; Angles
        </h2>
        <p className="mt-1 text-[13px] text-[#716960]">
          Upload clean photos from multiple angles in natural lighting.
        </p>
      </div>

      {/* Local Preview Notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#e4dbd2] bg-[#fff8f5] p-4 text-[12px] text-[#4a4540]">
        <Info className="h-5 w-5 shrink-0 text-[#d96532] mt-0.5" />
        <div>
          <p className="font-bold text-[#26231f]">
            Local Browser Preview (Milestone 3A)
          </p>
          <p className="mt-0.5 leading-5 text-[#716960]">
            Selected photos are previewed locally in your browser state. Cloud image storage and automated visual grading will be connected in Milestone 3.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-[12px] font-medium text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Photo Slots Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(currentSlots).map((slot) => {
          const hasImage = Boolean(slot.previewUrl);

          return (
            <div
              key={slot.id}
              className={`relative flex flex-col rounded-2xl border bg-white p-4 transition ${
                hasImage
                  ? "border-emerald-300 ring-1 ring-emerald-200 shadow-sm"
                  : "border-[#e4dbd2] hover:border-[#d9b6a3]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-bold text-[#26231f]">
                    {slot.label}
                  </span>
                  {slot.required && (
                    <span className="text-[10px] font-bold text-[#d96532]">*</span>
                  )}
                </div>

                {hasImage && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Ready
                  </span>
                )}
              </div>

              <p className="text-[10px] text-[#9b9087] leading-4 mb-3 min-h-[32px]">
                {slot.guideText}
              </p>

              {/* Upload Box / Image Preview */}
              <div className="relative mt-auto h-40 w-full overflow-hidden rounded-xl border border-dashed border-[#e0d9d1] bg-[#faf8f4] flex items-center justify-center">
                {hasImage ? (
                  <>
                    {/* Local Preview */}
                    <img
                      src={slot.previewUrl}
                      alt={slot.label}
                      className="h-full w-full object-contain p-2"
                    />

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(slot.id)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/70 text-white backdrop-blur-sm transition hover:bg-rose-600"
                      title="Remove photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </>
                ) : (
                  <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4 text-center transition hover:bg-[#f4efe9]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eee7de] text-[#716960] mb-2">
                      <Camera className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#26231f]">
                      Choose photo
                    </span>
                    <span className="mt-0.5 text-[9px] text-[#9b9087]">
                      PNG, JPG up to 15MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileSelected(slot.id, file);
                      }}
                      className="sr-only"
                    />
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#e4dbd2]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-[#e4dbd2] bg-white px-5 py-3 text-[13px] font-bold text-[#4a4540] transition hover:border-[#d96532] hover:text-[#d96532]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Condition
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26231f] px-6 py-3 text-[13px] font-bold text-white transition hover:bg-[#d96532]"
        >
          Continue to Review <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
