import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { WhyReGradeStrip } from "@/components/landing/WhyReGradeStrip";
import { CategoryGrid } from "@/components/landing/CategoryGrid";
import { FeaturedListings } from "@/components/landing/FeaturedListings";
import { AiGradingExplainer } from "@/components/landing/AiGradingExplainer";
import { FairPricingExplainer } from "@/components/landing/FairPricingExplainer";
import { FulfillmentComparison } from "@/components/landing/FulfillmentComparison";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f4] text-[#26231f] antialiased">
      {/* 1. Elegant Light Sticky Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section with Clean Product Showcase & Trust Score Panel */}
        <HeroSection />

        {/* 3. Why ReGrade? Feature Strip */}
        <WhyReGradeStrip />

        {/* 4. Shop by Category — 8 Categories */}
        <CategoryGrid />

        {/* 5. Featured Devices — Image-First Product Cards */}
        <FeaturedListings />

        {/* 6. AI Grading Explanation (Grades A-D Breakdown) */}
        <AiGradingExplainer />

        {/* 7. Fair Pricing Explanation (Indian Market Depreciation in ₹) */}
        <FairPricingExplainer />

        {/* 8. As-Is vs Refurbished Comparison */}
        <FulfillmentComparison />

        {/* 9. Seller CTA Section */}
        <CtaSection />
      </main>

      {/* 10. Clean Neutral Footer */}
      <Footer />
    </div>
  );
}
