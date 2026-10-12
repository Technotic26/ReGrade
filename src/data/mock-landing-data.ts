export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  image: string;
  deviceCount: number;
  startingPriceINR: number;
  tier: 1 | 2;
  badgeText: string;
  tagline: string;
}

export interface ReGradeProduct {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  grade: "A" | "B" | "C" | "D";
  gradeLabel: string;
  condition: string;
  age: string;
  price: number;
  originalPrice: number;
  trustScore: number;
  specs: {
    storage?: string;
    ram?: string;
    batteryHealth?: number;
    color?: string;
    screenSize?: string;
  };
  refurbAvailable: boolean;
  refurbPrice?: number;
  sellerCity: string;
}

export const CATEGORIES_DATA: CategoryItem[] = [
  { id: "cat-1", slug: "smartphones", name: "Smartphones", iconName: "Smartphone", image: "/products/iphone-13.svg", deviceCount: 142, startingPriceINR: 7999, tier: 1, badgeText: "Visual review", tagline: "Phones with an explainable condition report" },
  { id: "cat-2", slug: "laptops", name: "Laptops & MacBooks", iconName: "Laptop", image: "/products/macbook-air.svg", deviceCount: 88, startingPriceINR: 18500, tier: 1, badgeText: "Visual review", tagline: "Work-ready machines, clearly documented" },
  { id: "cat-3", slug: "tablets", name: "Tablets & iPads", iconName: "Tablet", image: "/products/ipad-air.svg", deviceCount: 64, startingPriceINR: 11499, tier: 2, badgeText: "Verified checklist", tagline: "Portable screens with practical detail" },
  { id: "cat-4", slug: "gaming-consoles", name: "Gaming Consoles", iconName: "Gamepad2", image: "/products/ps5-console.svg", deviceCount: 39, startingPriceINR: 14999, tier: 1, badgeText: "Visual review", tagline: "Play-tested hardware, ready for another round" },
  { id: "cat-5", slug: "audio", name: "Headphones & Audio", iconName: "Headphones", image: "/products/airpods.svg", deviceCount: 56, startingPriceINR: 3499, tier: 2, badgeText: "Verified checklist", tagline: "Sound gear with the essentials covered" },
  { id: "cat-6", slug: "smartwatches", name: "Smartwatches", iconName: "Watch", image: "/products/galaxy-watch.svg", deviceCount: 47, startingPriceINR: 4999, tier: 2, badgeText: "Verified checklist", tagline: "Wearables with battery and screen details" },
  { id: "cat-7", slug: "cameras", name: "Cameras & Lenses", iconName: "Camera", image: "/products/canon-camera.svg", deviceCount: 28, startingPriceINR: 22000, tier: 2, badgeText: "Verified checklist", tagline: "Capture gear with honest usage notes" },
  { id: "cat-8", slug: "monitors", name: "Monitors & Displays", iconName: "Monitor", image: "/products/gaming-monitor.svg", deviceCount: 31, startingPriceINR: 6499, tier: 2, badgeText: "Verified checklist", tagline: "Screens assessed for everyday use" },
];

export const FEATURED_PRODUCTS: ReGradeProduct[] = [
  {
    id: "prod-1",
    name: "iPhone 13 (128GB)",
    category: "Smartphones",
    categorySlug: "smartphones",
    image: "/products/iphone-13.svg",
    grade: "A",
    gradeLabel: "Pristine",
    condition: "Midnight • 14 Months Old",
    age: "14 Months Old",
    price: 35999,
    originalPrice: 69900,
    trustScore: 94,
    specs: { storage: "128GB", batteryHealth: 91, color: "Midnight" },
    refurbAvailable: true,
    refurbPrice: 38799,
    sellerCity: "Bangalore, KA",
  },
  {
    id: "prod-2",
    name: "MacBook Air M1 (256GB)",
    category: "Laptops",
    categorySlug: "laptops",
    image: "/products/macbook-air.svg",
    grade: "B",
    gradeLabel: "Good",
    condition: "Space Grey • 2 Years Old",
    age: "2 Years Old",
    price: 44500,
    originalPrice: 92900,
    trustScore: 90,
    specs: { ram: "8GB Unified", storage: "256GB SSD", batteryHealth: 87, color: "Space Grey" },
    refurbAvailable: true,
    refurbPrice: 48500,
    sellerCity: "Mumbai, MH",
  },
  {
    id: "prod-3",
    name: "AirPods Pro (2nd Gen)",
    category: "Audio",
    categorySlug: "audio",
    image: "/products/airpods.svg",
    grade: "A",
    gradeLabel: "Pristine",
    condition: "Lightly Used",
    age: "8 Months Old",
    price: 16499,
    originalPrice: 24900,
    trustScore: 95,
    specs: { batteryHealth: 94, color: "White" },
    refurbAvailable: false,
    sellerCity: "Delhi NCR",
  },
  {
    id: "prod-4",
    name: "Samsung Galaxy Watch 6",
    category: "Smartwatches",
    categorySlug: "smartwatches",
    image: "/products/galaxy-watch.svg",
    grade: "A",
    gradeLabel: "Pristine",
    condition: "44mm • 1.5 Years Old",
    age: "1.5 Years Old",
    price: 8999,
    originalPrice: 15999,
    trustScore: 93,
    specs: { batteryHealth: 94, color: "Graphite", screenSize: "1.5\" AMOLED" },
    refurbAvailable: false,
    sellerCity: "Hyderabad, TS",
  },
  {
    id: "prod-5",
    name: "Sony PlayStation 5 Digital Edition (825GB)",
    category: "Gaming Consoles",
    categorySlug: "gaming-consoles",
    image: "/products/ps5-console.svg",
    grade: "A",
    gradeLabel: "Pristine",
    condition: "1 Year Old",
    age: "1 Year Old",
    price: 31999,
    originalPrice: 44900,
    trustScore: 96,
    specs: { storage: "825GB SSD", color: "White" },
    refurbAvailable: false,
    sellerCity: "Bangalore, KA",
  },
  {
    id: "prod-6",
    name: "Canon EOS 200D II DSLR",
    category: "Cameras",
    categorySlug: "cameras",
    image: "/products/canon-camera.svg",
    grade: "B",
    gradeLabel: "Good",
    condition: "18-55mm IS STM • 2 Years Old",
    age: "2 Years Old",
    price: 24999,
    originalPrice: 38900,
    trustScore: 89,
    specs: { color: "Matte Black" },
    refurbAvailable: true,
    refurbPrice: 27500,
    sellerCity: "Chennai, TN",
  },
];

export const TRUST_SCORE_FACTORS = [
  { name: "AI Visual Verification", weight: 30, description: "Computer vision defect localization and multi-angle cosmetic assessment.", scoreSample: "96 / 100" },
  { name: "Seller Historical Reliability", weight: 25, description: "Verified order completion track record, dispute metrics, and customer feedback.", scoreSample: "92 / 100" },
  { name: "Anti-Fraud & Authenticity", weight: 20, description: "Perceptual image hash duplicate checks, IMEI/serial validation, and price outlier checks.", scoreSample: "98 / 100" },
  { name: "Price Fairness Index", weight: 15, description: "Calibrated alignment with dynamic Indian market depreciation bounds.", scoreSample: "90 / 100" },
  { name: "Hardware Spec Completeness", weight: 10, description: "Comprehensive declaration of specs, battery health, and functional sensors.", scoreSample: "88 / 100" },
];
