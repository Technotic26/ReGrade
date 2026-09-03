import { 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  TrendingUp, 
  Smartphone, 
  Laptop, 
  Gamepad2, 
  Headphones, 
  Watch, 
  Camera, 
  Tv, 
  Tablet,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function Home() {
  const categories = [
    { name: "Smartphones", icon: Smartphone, tier: "Tier 1: Vision AI" },
    { name: "Laptops", icon: Laptop, tier: "Tier 1: Vision AI" },
    { name: "Gaming Consoles", icon: Gamepad2, tier: "Tier 1: Vision AI" },
    { name: "Tablets", icon: Tablet, tier: "Tier 2: Rule-Based" },
    { name: "Audio & Headphones", icon: Headphones, tier: "Tier 2: Rule-Based" },
    { name: "Smartwatches", icon: Watch, tier: "Tier 2: Rule-Based" },
    { name: "Cameras & Lenses", icon: Camera, tier: "Tier 2: Rule-Based" },
    { name: "Monitors & Displays", icon: Tv, tier: "Tier 2: Rule-Based" },
  ];

  const pillars = [
    {
      icon: Cpu,
      title: "AI Condition Assessment",
      description: "Automated multi-angle computer vision grading into Grades A, B, C, and D with localized bounding boxes.",
    },
    {
      icon: TrendingUp,
      title: "Dynamic Fair Valuation",
      description: "Depreciation-calibrated Indian pricing model in INR (₹) delivering transparent market price bands.",
    },
    {
      icon: Wrench,
      title: "Dual Fulfillment",
      description: "Choose to Buy As-Is directly from sellers, or route through certified local repair shops to Buy Refurbished.",
    },
    {
      icon: ShieldCheck,
      title: "ReGrade Trust Score & 72h Window",
      description: "Explainable 0–100 trust rating backed by an escrow-style 72-hour post-delivery inspection guarantee.",
    },
  ];

  return (
    <main className="flex-1 flex flex-col">
      {/* Navigation Bar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              RG
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Re<span className="text-teal-600">Grade</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-medium border border-teal-200 dark:border-teal-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              B.Tech Project Milestone 1 Foundation
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-sm font-medium mb-6">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>Next.js Monolith Foundation Ready</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight">
          AI-Powered Trust for Used Electronics Recommerce
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Eliminating information asymmetry and fraud in peer-to-peer electronics transactions across India with automated grading, fair pricing, and certified local refurbishment.
        </p>
      </section>

      {/* Pillars Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Core Architecture Pillars</h2>
            <p className="text-slate-500 text-sm mt-1">Foundational capabilities defined in source-of-truth documentation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col items-start"
                >
                  <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 Categories Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Supported Product Taxonomy</h2>
          <p className="text-slate-500 text-sm mt-1">Multi-category marketplace architecture with tiered AI grading</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center text-center group hover:border-teal-500 transition-colors"
              >
                <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-teal-50 dark:group-hover:bg-teal-950 group-hover:text-teal-600 transition-colors mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-sm text-slate-900 dark:text-white">{cat.name}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{cat.tier}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-slate-900 text-center text-xs text-slate-500">
        <p>ReGrade Final-Year B.Tech Project &bull; Next.js App Router Architecture</p>
      </footer>
    </main>
  );
}
