import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SellerListingWizard } from "@/components/seller/SellerListingWizard";
import {
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Tag,
  ShieldAlert,
} from "lucide-react";

export const metadata = {
  title: "Sell A Device | ReGrade",
  description: "List your pre-owned electronics with transparent condition declarations and fair AI pricing on ReGrade.",
};

export default async function SellPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/sell");
  }

  // Fetch the user's role
  const { data: profile } = (await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()) as { data: { role: string } | null };

  const effectiveRole =
    profile?.role ??
    (user.user_metadata?.role as string | undefined) ??
    "buyer";

  const isSellerOrAdmin =
    effectiveRole === "seller" || effectiveRole === "admin";

  // Access Control: If user is a Buyer, show a dedicated role-switch gate
  if (!isSellerOrAdmin) {
    return (
      <div className="min-h-screen bg-[#faf8f4] text-[#26231f]">
        <Navbar />

        <main className="mx-auto max-w-[640px] px-5 py-16 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2ea] text-[#d96532]">
            <Tag className="h-7 w-7" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d96532]">
            Seller Access Required
          </span>

          <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.04em] text-[#26231f]">
            Switch to Seller Mode to List Devices
          </h1>

          <p className="mt-3 text-[14px] leading-6 text-[#716960]">
            Your ReGrade account is currently set to <strong>Buyer Mode</strong>. Switch to <strong>Seller Mode</strong> to access the guided 5-step listing wizard, AI inspection, and device valuation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/auth/onboarding?next=/sell"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#26231f] px-6 py-3 text-[13px] font-bold text-white transition hover:bg-[#d96532]"
            >
              <RefreshCw className="h-4 w-4" /> Switch to Seller Mode
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#e4dbd2] bg-white px-6 py-3 text-[13px] font-bold text-[#4a4540] transition hover:border-[#d96532] hover:text-[#d96532]"
            >
              Back to Dashboard
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#26231f]">
      <Navbar />

      <main className="mx-auto max-w-[1280px] px-5 py-10 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 border-b border-[#e4dbd2] pb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d96532]">
              Seller Portal
            </span>
            <span className="rounded-full bg-[#fff2ea] border border-[#d96532]/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d96532]">
              Milestone 3A Foundation
            </span>
          </div>

          <h1 className="mt-2 text-[32px] font-medium tracking-[-0.05em]">
            List Your Pre-Owned Device
          </h1>
          <p className="mt-1 text-[13px] text-[#716960]">
            Complete the 5-step guided wizard with accurate specifications and local photo previews.
          </p>
        </div>

        {/* 5-Step Wizard */}
        <SellerListingWizard />
      </main>

      <Footer />
    </div>
  );
}
