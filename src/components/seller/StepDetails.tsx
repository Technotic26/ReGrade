"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, AlertCircle, IndianRupee } from "lucide-react";
import type {
  CategorySelection,
  ProductDetailsData,
} from "@/types/seller-listing";

interface StepDetailsProps {
  category: CategorySelection;
  details: ProductDetailsData;
  onChange: (details: ProductDetailsData) => void;
  onNext: () => void;
  onBack: () => void;
}

const COMMON_CITIES = [
  "Bengaluru",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

export function StepDetails({
  category,
  details,
  onChange,
  onNext,
  onBack,
}: StepDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isPhone = category.slug === "smartphones";
  const isLaptop = category.slug === "laptops";
  const isConsole = category.slug === "gaming-consoles";
  const isTablet = category.slug === "tablets";
  const isCamera = category.slug === "cameras-lenses";
  const isMonitor = category.slug === "monitors-displays";

  function updateField<K extends keyof ProductDetailsData>(
    field: K,
    value: ProductDetailsData[K]
  ) {
    onChange({ ...details, [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleContinue() {
    const newErrors: Record<string, string> = {};

    if (!details.title.trim()) {
      newErrors.title = "Product title is required";
    } else if (details.title.trim().length < 5) {
      newErrors.title = "Title should be at least 5 characters";
    }

    if (!details.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (!details.model.trim()) {
      newErrors.model = "Model is required";
    }

    if (!details.city.trim()) {
      newErrors.city = "Please select or enter your city";
    }

    if (!details.askingPriceINR || details.askingPriceINR <= 0) {
      newErrors.askingPriceINR = "Please enter a valid asking price (₹)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext();
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d96532]">
            Step 2 of 5
          </span>
          <span className="rounded-full bg-[#f4efe9] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#716960]">
            {category.name}
          </span>
        </div>
        <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.04em] text-[#26231f]">
          Product Details
        </h2>
        <p className="mt-1 text-[13px] text-[#716960]">
          Provide specific model, location, and technical specifications.
        </p>
      </div>

      <div className="rounded-2xl border border-[#e4dbd2] bg-white p-6 shadow-sm space-y-5">
        {/* Title */}
        <div>
          <label className="block text-[12px] font-bold text-[#4a4540]">
            Listing Title <span className="text-[#d96532]">*</span>
          </label>
          <input
            type="text"
            value={details.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder={`e.g. Apple iPhone 14 Pro 128GB Deep Purple (${details.city || "Bengaluru"})`}
            className={`mt-1.5 h-11 w-full rounded-xl border bg-[#faf8f4] px-3.5 text-[13px] text-[#26231f] outline-none placeholder:text-[#a99e94] focus:border-[#d96532] focus:bg-white ${
              errors.title ? "border-rose-400 bg-rose-50/30" : "border-[#e0d9d1]"
            }`}
          />
          {errors.title && (
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-rose-600">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.title}
            </p>
          )}
        </div>

        {/* Brand & Model Row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-[12px] font-bold text-[#4a4540]">
              Brand <span className="text-[#d96532]">*</span>
            </label>
            <input
              type="text"
              value={details.brand}
              onChange={(e) => updateField("brand", e.target.value)}
              placeholder="e.g. Apple, Samsung, Sony, Dell"
              className={`mt-1.5 h-11 w-full rounded-xl border bg-[#faf8f4] px-3.5 text-[13px] text-[#26231f] outline-none placeholder:text-[#a99e94] focus:border-[#d96532] focus:bg-white ${
                errors.brand ? "border-rose-400" : "border-[#e0d9d1]"
              }`}
            />
            {errors.brand && (
              <p className="mt-1 text-[11px] font-medium text-rose-600">
                {errors.brand}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#4a4540]">
              Model / Variant <span className="text-[#d96532]">*</span>
            </label>
            <input
              type="text"
              value={details.model}
              onChange={(e) => updateField("model", e.target.value)}
              placeholder="e.g. iPhone 14 Pro, XPS 15 9520, PS5 Disc"
              className={`mt-1.5 h-11 w-full rounded-xl border bg-[#faf8f4] px-3.5 text-[13px] text-[#26231f] outline-none placeholder:text-[#a99e94] focus:border-[#d96532] focus:bg-white ${
                errors.model ? "border-rose-400" : "border-[#e0d9d1]"
              }`}
            />
            {errors.model && (
              <p className="mt-1 text-[11px] font-medium text-rose-600">
                {errors.model}
              </p>
            )}
          </div>
        </div>

        {/* City & Asking Price */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-[12px] font-bold text-[#4a4540]">
              City / Location <span className="text-[#d96532]">*</span>
            </label>
            <input
              type="text"
              value={details.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="e.g. Bengaluru, Mumbai, Pune"
              className={`mt-1.5 h-11 w-full rounded-xl border bg-[#faf8f4] px-3.5 text-[13px] text-[#26231f] outline-none placeholder:text-[#a99e94] focus:border-[#d96532] focus:bg-white ${
                errors.city ? "border-rose-400" : "border-[#e0d9d1]"
              }`}
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {COMMON_CITIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateField("city", c)}
                  className={`rounded-lg px-2 py-0.5 text-[10px] font-semibold transition ${
                    details.city === c
                      ? "bg-[#d96532] text-white"
                      : "bg-[#f4efe9] text-[#716960] hover:bg-[#eae3d9] hover:text-[#26231f]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            {errors.city && (
              <p className="mt-1 text-[11px] font-medium text-rose-600">
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#4a4540]">
              Asking Price (₹ INR) <span className="text-[#d96532]">*</span>
            </label>
            <div className="relative mt-1.5">
              <IndianRupee className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b9087]" />
              <input
                type="number"
                min="500"
                step="500"
                value={details.askingPriceINR || ""}
                onChange={(e) =>
                  updateField(
                    "askingPriceINR",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                placeholder="42000"
                className={`h-11 w-full rounded-xl border bg-[#faf8f4] pl-9 pr-3.5 text-[14px] font-bold text-[#26231f] outline-none placeholder:text-[#a99e94] focus:border-[#d96532] focus:bg-white ${
                  errors.askingPriceINR ? "border-rose-400" : "border-[#e0d9d1]"
                }`}
              />
            </div>
            <p className="mt-1 text-[10px] text-[#9b9087]">
              Fair market valuation suggestions will be provided in Milestone 3.
            </p>
            {errors.askingPriceINR && (
              <p className="mt-1 text-[11px] font-medium text-rose-600">
                {errors.askingPriceINR}
              </p>
            )}
          </div>
        </div>

        {/* Category-Specific Specifications */}
        <div className="pt-2 border-t border-[#f0e9e1]">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9b9087]">
            {category.name} Specifications
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* Smartphone Specs */}
            {isPhone && (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    Storage Capacity
                  </label>
                  <select
                    value={details.storage || "128GB"}
                    onChange={(e) => updateField("storage", e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] font-medium text-[#26231f] outline-none focus:border-[#d96532]"
                  >
                    <option value="64GB">64 GB</option>
                    <option value="128GB">128 GB</option>
                    <option value="256GB">256 GB</option>
                    <option value="512GB">512 GB</option>
                    <option value="1TB">1 TB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    RAM
                  </label>
                  <select
                    value={details.ram || "6GB"}
                    onChange={(e) => updateField("ram", e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] font-medium text-[#26231f] outline-none focus:border-[#d96532]"
                  >
                    <option value="4GB">4 GB</option>
                    <option value="6GB">6 GB</option>
                    <option value="8GB">8 GB</option>
                    <option value="12GB">12 GB</option>
                    <option value="16GB">16 GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    Battery Health % (iOS / Android)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={details.batteryHealth || ""}
                    onChange={(e) =>
                      updateField("batteryHealth", e.target.value)
                    }
                    placeholder="e.g. 88"
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] text-[#26231f] outline-none focus:border-[#d96532]"
                  />
                </div>
              </>
            )}

            {/* Laptop Specs */}
            {isLaptop && (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    RAM Memory
                  </label>
                  <select
                    value={details.ram || "16GB"}
                    onChange={(e) => updateField("ram", e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] font-medium text-[#26231f] outline-none focus:border-[#d96532]"
                  >
                    <option value="8GB">8 GB</option>
                    <option value="16GB">16 GB</option>
                    <option value="24GB">24 GB</option>
                    <option value="32GB">32 GB</option>
                    <option value="64GB">64 GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    SSD Storage
                  </label>
                  <select
                    value={details.storage || "512GB SSD"}
                    onChange={(e) => updateField("storage", e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] font-medium text-[#26231f] outline-none focus:border-[#d96532]"
                  >
                    <option value="256GB SSD">256 GB SSD</option>
                    <option value="512GB SSD">512 GB SSD</option>
                    <option value="1TB SSD">1 TB SSD</option>
                    <option value="2TB SSD">2 TB SSD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    Processor / Chip
                  </label>
                  <input
                    type="text"
                    value={details.processor || ""}
                    onChange={(e) => updateField("processor", e.target.value)}
                    placeholder="e.g. Apple M2, Intel Core i7 13700H"
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] text-[#26231f] outline-none focus:border-[#d96532]"
                  />
                </div>
              </>
            )}

            {/* Gaming Console Specs */}
            {isConsole && (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    Internal Storage
                  </label>
                  <select
                    value={details.storage || "825GB"}
                    onChange={(e) => updateField("storage", e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] font-medium text-[#26231f] outline-none focus:border-[#d96532]"
                  >
                    <option value="500GB">500 GB</option>
                    <option value="825GB">825 GB (PS5 Standard)</option>
                    <option value="1TB">1 TB</option>
                    <option value="2TB">2 TB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    Edition
                  </label>
                  <input
                    type="text"
                    value={details.edition || ""}
                    onChange={(e) => updateField("edition", e.target.value)}
                    placeholder="e.g. Disc Edition, OLED, Slim"
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] text-[#26231f] outline-none focus:border-[#d96532]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    Controllers Included
                  </label>
                  <select
                    value={details.controllerCount || "1"}
                    onChange={(e) =>
                      updateField("controllerCount", e.target.value)
                    }
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] font-medium text-[#26231f] outline-none focus:border-[#d96532]"
                  >
                    <option value="1">1 Original Controller</option>
                    <option value="2">2 Controllers</option>
                    <option value="0">Console Only (0)</option>
                  </select>
                </div>
              </>
            )}

            {/* Tablet Specs */}
            {isTablet && (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    Storage
                  </label>
                  <select
                    value={details.storage || "128GB"}
                    onChange={(e) => updateField("storage", e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] font-medium text-[#26231f] outline-none focus:border-[#d96532]"
                  >
                    <option value="64GB">64 GB</option>
                    <option value="128GB">128 GB</option>
                    <option value="256GB">256 GB</option>
                    <option value="512GB">512 GB</option>
                    <option value="1TB">1 TB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4a4540]">
                    Connectivity
                  </label>
                  <select
                    value={details.cellular ? "cellular" : "wifi"}
                    onChange={(e) =>
                      updateField("cellular", e.target.value === "cellular")
                    }
                    className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] font-medium text-[#26231f] outline-none focus:border-[#d96532]"
                  >
                    <option value="wifi">Wi-Fi Only</option>
                    <option value="cellular">Wi-Fi + Cellular (SIM)</option>
                  </select>
                </div>
              </>
            )}

            {/* Camera Specs */}
            {isCamera && (
              <div>
                <label className="block text-[11px] font-semibold text-[#4a4540]">
                  Shutter Count (if known)
                </label>
                <input
                  type="number"
                  value={details.shutterCount || ""}
                  onChange={(e) => updateField("shutterCount", e.target.value)}
                  placeholder="e.g. 12500"
                  className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] text-[#26231f] outline-none focus:border-[#d96532]"
                />
              </div>
            )}

            {/* Monitor Specs */}
            {isMonitor && (
              <div>
                <label className="block text-[11px] font-semibold text-[#4a4540]">
                  Refresh Rate
                </label>
                <select
                  value={details.refreshRate || "144Hz"}
                  onChange={(e) => updateField("refreshRate", e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3 text-[12px] font-medium text-[#26231f] outline-none focus:border-[#d96532]"
                >
                  <option value="60Hz">60 Hz</option>
                  <option value="75Hz">75 Hz</option>
                  <option value="120Hz">120 Hz</option>
                  <option value="144Hz">144 Hz</option>
                  <option value="165Hz">165 Hz</option>
                  <option value="240Hz">240 Hz</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[12px] font-bold text-[#4a4540]">
            Seller Description & Notes
          </label>
          <textarea
            rows={3}
            value={details.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Mention any usage history, reason for selling, bill/warranty details, or specific cosmetic notes..."
            className="mt-1.5 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] p-3 text-[13px] text-[#26231f] outline-none placeholder:text-[#a99e94] focus:border-[#d96532] focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#e4dbd2]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-[#e4dbd2] bg-white px-5 py-3 text-[13px] font-bold text-[#4a4540] transition hover:border-[#d96532] hover:text-[#d96532]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26231f] px-6 py-3 text-[13px] font-bold text-white transition hover:bg-[#d96532]"
        >
          Continue to Condition <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
