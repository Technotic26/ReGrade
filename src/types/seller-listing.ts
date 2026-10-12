export type WizardStep = 1 | 2 | 3 | 4 | 5;

export interface CategorySelection {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  tagline: string;
}

export interface ProductDetailsData {
  title: string;
  brand: string;
  model: string;
  city: string;
  description: string;
  askingPriceINR?: number;
  // Category specific specs
  storage?: string;
  ram?: string;
  batteryHealth?: number | string;
  processor?: string;
  screenSize?: string;
  edition?: string;
  controllerCount?: number | string;
  cellular?: boolean;
  shutterCount?: number | string;
  refreshRate?: string;
}

export type OverallConditionType = "like_new" | "excellent" | "good" | "fair";
export type ScreenConditionType = "flawless" | "minor_scratches" | "deep_scratches" | "cracked" | "not_applicable";
export type BodyConditionType = "pristine" | "light_wear" | "visible_dents_scuffs" | "heavy_wear";

export interface ConditionData {
  overallCondition: OverallConditionType;
  screenCondition: ScreenConditionType;
  bodyCondition: BodyConditionType;
  functionalIssues: string[];
  accessoriesIncluded: string[];
  notes?: string;
}

export interface PhotoSlotItem {
  id: string;
  label: string;
  guideText: string;
  required: boolean;
  file?: File;
  previewUrl?: string;
}

export interface SellerListingFormData {
  category: CategorySelection | null;
  details: ProductDetailsData;
  condition: ConditionData;
  photos: Record<string, PhotoSlotItem>;
}
