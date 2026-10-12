"use client";

import {
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Check,
  ArrowRight,
} from "lucide-react";
import type { CategorySelection } from "@/types/seller-listing";

interface StepCategoryProps {
  selectedCategory: CategorySelection | null;
  onSelect: (category: CategorySelection) => void;
  onNext: () => void;
}

const CATEGORIES: CategorySelection[] = [
  {
    id: "cat-1",
    slug: "smartphones",
    name: "Smartphones",
    iconName: "Smartphone",
    tagline: "Apple iPhones, Samsung Galaxy, Pixel & Android flagships",
  },
  {
    id: "cat-2",
    slug: "laptops",
    name: "Laptops & MacBooks",
    iconName: "Laptop",
    tagline: "MacBook Air/Pro, Windows ultrabooks, and workstations",
  },
  {
    id: "cat-3",
    slug: "tablets",
    name: "Tablets & iPads",
    iconName: "Tablet",
    tagline: "Apple iPad Pro/Air/Mini, Samsung Galaxy Tabs",
  },
  {
    id: "cat-4",
    slug: "gaming-consoles",
    name: "Gaming Consoles",
    iconName: "Gamepad2",
    tagline: "PlayStation 5/4, Xbox Series X/S, Nintendo Switch",
  },
  {
    id: "cat-5",
    slug: "headphones-audio",
    name: "Headphones & Audio",
    iconName: "Headphones",
    tagline: "Wireless earbuds, ANC over-ear headphones, DACs",
  },
  {
    id: "cat-6",
    slug: "smartwatches",
    name: "Smartwatches",
    iconName: "Watch",
    tagline: "Apple Watch, Galaxy Watch, Garmin fitness wearables",
  },
  {
    id: "cat-7",
    slug: "cameras-lenses",
    name: "Cameras & Lenses",
    iconName: "Camera",
    tagline: "Mirrorless bodies, DSLR cameras, prime & zoom lenses",
  },
  {
    id: "cat-8",
    slug: "monitors-displays",
    name: "Monitors & Displays",
    iconName: "Monitor",
    tagline: "Gaming monitors, 4K creative displays, ultrawides",
  },
];

function getCategoryIcon(name: string) {
  switch (name) {
    case "Smartphone":
      return <Smartphone className="h-6 w-6" />;
    case "Laptop":
      return <Laptop className="h-6 w-6" />;
    case "Tablet":
      return <Tablet className="h-6 w-6" />;
    case "Gamepad2":
      return <Gamepad2 className="h-6 w-6" />;
    case "Headphones":
      return <Headphones className="h-6 w-6" />;
    case "Watch":
      return <Watch className="h-6 w-6" />;
    case "Camera":
      return <Camera className="h-6 w-6" />;
    case "Monitor":
      return <Monitor className="h-6 w-6" />;
    default:
      return <Smartphone className="h-6 w-6" />;
  }
}

export function StepCategory({
  selectedCategory,
  onSelect,
  onNext,
}: StepCategoryProps) {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d96532]">
          Step 1 of 5
        </span>
        <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.04em] text-[#26231f]">
          Select Device Category
        </h2>
        <p className="mt-1 text-[13px] text-[#716960]">
          Choose the product category for the device you want to list on ReGrade.
        </p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory?.slug === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onSelect(cat)}
              className={`group relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                isSelected
                  ? "border-[#d96532] bg-[#fff8f5] shadow-sm ring-1 ring-[#d96532]"
                  : "border-[#e4dbd2] bg-white hover:border-[#d9b6a3] hover:bg-[#faf6f2]"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${
                  isSelected
                    ? "bg-[#d96532] text-white shadow-sm"
                    : "bg-[#f4efe9] text-[#716960] group-hover:bg-[#eee7de] group-hover:text-[#26231f]"
                }`}
              >
                {getCategoryIcon(cat.iconName)}
              </div>

              <div className="flex-1 pr-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-bold text-[#26231f]">
                    {cat.name}
                  </h3>
                </div>
                <p className="mt-1 text-[11px] leading-4 text-[#716960]">
                  {cat.tagline}
                </p>
              </div>

              <div
                className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition ${
                  isSelected
                    ? "border-[#d96532] bg-[#d96532] text-white"
                    : "border-[#d4c9be] bg-white"
                }`}
              >
                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 border-t border-[#e4dbd2]">
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedCategory}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26231f] px-6 py-3 text-[13px] font-bold text-white transition hover:bg-[#d96532] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue to Product Details <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
