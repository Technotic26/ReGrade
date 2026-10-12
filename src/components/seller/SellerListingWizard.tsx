"use client";

import { useState } from "react";
import {
  Check,
  ChevronRight,
  Sparkles,
  Smartphone,
  Info,
} from "lucide-react";
import type {
  SellerListingFormData,
  WizardStep,
  CategorySelection,
} from "@/types/seller-listing";
import { StepCategory } from "@/components/seller/StepCategory";
import { StepDetails } from "@/components/seller/StepDetails";
import { StepCondition } from "@/components/seller/StepCondition";
import {
  StepPhotos,
  getDefaultPhotoSlots,
} from "@/components/seller/StepPhotos";
import { StepReview } from "@/components/seller/StepReview";

const INITIAL_FORM_DATA: SellerListingFormData = {
  category: null,
  details: {
    title: "",
    brand: "",
    model: "",
    city: "",
    description: "",
    storage: "128GB",
    ram: "8GB",
    batteryHealth: "88",
  },
  condition: {
    overallCondition: "excellent",
    screenCondition: "flawless",
    bodyCondition: "light_wear",
    functionalIssues: ["None — Everything works 100% properly"],
    accessoriesIncluded: ["Original Charging Cable"],
  },
  photos: {},
};

const STEPS = [
  { step: 1, label: "Category" },
  { step: 2, label: "Product Details" },
  { step: 3, label: "Condition" },
  { step: 4, label: "Photos" },
  { step: 5, label: "Review" },
] as const;

export function SellerListingWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [formData, setFormData] = useState<SellerListingFormData>(INITIAL_FORM_DATA);

  function handleSelectCategory(cat: CategorySelection) {
    setFormData((prev) => ({
      ...prev,
      category: cat,
      photos: getDefaultPhotoSlots(cat.slug),
    }));
  }

  function handleReset() {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
  }

  return (
    <div className="mx-auto max-w-[900px]">
      {/* Stepper Progress Bar */}
      <nav aria-label="Listing Progress" className="mb-8 overflow-x-auto">
        <ol className="flex min-w-[620px] items-center justify-between gap-2 border-b border-[#e4dbd2] pb-6">
          {STEPS.map(({ step, label }) => {
            const isCompleted = currentStep > step;
            const isCurrent = currentStep === step;
            const isClickable = currentStep > step;

            return (
              <li key={step} className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && setCurrentStep(step as WizardStep)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-1.5 transition text-left ${
                    isCurrent
                      ? "bg-[#26231f] text-white shadow-sm"
                      : isCompleted
                      ? "bg-[#fff2ea] text-[#d96532] hover:bg-[#ffe6d8] cursor-pointer"
                      : "bg-transparent text-[#9b9087] cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      isCurrent
                        ? "bg-[#d96532] text-white"
                        : isCompleted
                        ? "bg-[#d96532] text-white"
                        : "bg-[#e4dbd2] text-[#716960]"
                    }`}
                  >
                    {isCompleted ? <Check className="h-3 w-3 stroke-[3]" /> : step}
                  </span>
                  <span className="text-[12px] font-bold tracking-tight whitespace-nowrap">
                    {label}
                  </span>
                </button>

                {step < 5 && (
                  <ChevronRight className="h-4 w-4 text-[#c0b8b0] shrink-0" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Step Content */}
      <div className="transition-all">
        {currentStep === 1 && (
          <StepCategory
            selectedCategory={formData.category}
            onSelect={handleSelectCategory}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && formData.category && (
          <StepDetails
            category={formData.category}
            details={formData.details}
            onChange={(details) => setFormData((prev) => ({ ...prev, details }))}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && formData.category && (
          <StepCondition
            categorySlug={formData.category.slug}
            condition={formData.condition}
            onChange={(condition) =>
              setFormData((prev) => ({ ...prev, condition }))
            }
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && formData.category && (
          <StepPhotos
            categorySlug={formData.category.slug}
            photos={formData.photos}
            onChange={(photos) => setFormData((prev) => ({ ...prev, photos }))}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <StepReview
            formData={formData}
            onBack={() => setCurrentStep(4)}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
