"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { ArrowRight, Check, Loader2, ShoppingBag, Tag } from "lucide-react";

type OnboardingRole = "buyer" | "seller";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [selectedRole, setSelectedRole] = useState<OnboardingRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialChecking, setInitialChecking] = useState(() => isSupabaseConfigured());
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    async function checkUser() {
      try {
        const { data: { user }, error: userErr } = await supabase.auth.getUser();
        if (userErr || !user) {
          router.push(`/auth/login?next=/auth/onboarding`);
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        const role =
          (profile as unknown as { role?: string } | null)?.role ??
          (user.user_metadata?.role as string | undefined);

        if (role === "admin") {
          router.push(next);
          return;
        }
        if (role === "seller") {
          setSelectedRole("seller");
        } else if (role === "buyer") {
          setSelectedRole("buyer");
        }
      } catch (err) {
        console.warn("[onboarding] checkUser warning:", err);
      } finally {
        setInitialChecking(false);
      }
    }

    checkUser();
  }, [router, supabase, next]);

  async function handleConfirmRole() {
    if (!selectedRole) {
      setError("Please select how you want to use ReGrade before continuing.");
      return;
    }

    setLoading(true);
    setError(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("[onboarding] Auth session missing or error:", userError);
      router.push("/auth/login?next=/auth/onboarding");
      return;
    }

    // 1. Sync Supabase Auth user metadata
    const { error: metaError } = await supabase.auth.updateUser({
      data: { role: selectedRole },
    });

    if (metaError) {
      console.error("[onboarding] updateUser metadata error:", {
        message: metaError.message,
        code: metaError.code,
      });
    }

    // 2. Check existing profile to prevent demoting an admin
    const { data: profile } = (await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle()) as { data: { role: string } | null };

    if (profile?.role === "admin") {
      router.push(next);
      return;
    }

    // 3. Upsert profile safely with selected role
    const { error: saveError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name:
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          null,
        avatar_url:
          user.user_metadata?.avatar_url ??
          user.user_metadata?.picture ??
          null,
        role: selectedRole,
      } as never);

    if (saveError) {
      console.error("[onboarding] Failed to save profile:", {
        message: saveError.message,
        code: saveError.code,
        details: saveError.details,
        hint: saveError.hint,
      });
      setError(
        saveError.message
          ? `Failed to save your role: ${saveError.message}`
          : "Failed to save your role. Please try again."
      );
      setLoading(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  if (initialChecking) {
    return (
      <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#d96532]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-3" aria-label="ReGrade home">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26231f] text-[13px] font-bold tracking-[-0.08em] text-white shadow-[0_5px_14px_rgba(38,35,31,0.15)]">
          RG
        </span>
        <span className="text-[20px] font-semibold tracking-[-0.04em] text-[#25231f]">
          Re<span className="text-[#d96532]">Grade</span>
        </span>
      </Link>

      <div className="w-full max-w-[500px] rounded-[24px] border border-[#e4dbd2] bg-white p-8 shadow-[0_8px_32px_rgba(38,35,31,0.07)]">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c95e2c]">
          Account Setup
        </span>
        <h1 className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#26231f]">
          How do you want to use ReGrade?
        </h1>
        <p className="mt-2 text-[13px] leading-6 text-[#716960]">
          Select your primary role. This tailors your dashboard and navigation experience. You can both buy and sell anytime.
        </p>

        <div className="mt-6 grid gap-3.5">
          {/* Option 1: Buy Used Tech */}
          <button
            type="button"
            onClick={() => {
              setSelectedRole("buyer");
              setError(null);
            }}
            className={`flex items-start gap-4 rounded-2xl p-4 border text-left transition-all ${
              selectedRole === "buyer"
                ? "border-[#d96532] bg-[#fff8f5] ring-1 ring-[#d96532] shadow-sm"
                : "border-[#e4dbd2] bg-white hover:border-[#d9b6a3] hover:bg-[#faf6f2]"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                selectedRole === "buyer"
                  ? "bg-[#d96532] text-white"
                  : "bg-[#f4efe9] text-[#716960]"
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-bold text-[#26231f]">Buy Used Tech</p>
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border transition ${
                    selectedRole === "buyer"
                      ? "border-[#d96532] bg-[#d96532] text-white"
                      : "border-[#d4c9be] bg-white"
                  }`}
                >
                  {selectedRole === "buyer" && <Check className="h-2.5 w-2.5" />}
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#d96532]">
                Buyer Experience
              </p>
              <p className="mt-1.5 text-[12px] leading-5 text-[#716960]">
                Browse AI-verified devices, inspect full condition reports, and purchase with 72h protection.
              </p>
            </div>
          </button>

          {/* Option 2: Sell Your Device */}
          <button
            type="button"
            onClick={() => {
              setSelectedRole("seller");
              setError(null);
            }}
            className={`flex items-start gap-4 rounded-2xl p-4 border text-left transition-all ${
              selectedRole === "seller"
                ? "border-[#d96532] bg-[#fff8f5] ring-1 ring-[#d96532] shadow-sm"
                : "border-[#e4dbd2] bg-white hover:border-[#d9b6a3] hover:bg-[#faf6f2]"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                selectedRole === "seller"
                  ? "bg-[#d96532] text-white"
                  : "bg-[#f4efe9] text-[#716960]"
              }`}
            >
              <Tag className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-bold text-[#26231f]">Sell Your Device</p>
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border transition ${
                    selectedRole === "seller"
                      ? "border-[#d96532] bg-[#d96532] text-white"
                      : "border-[#d4c9be] bg-white"
                  }`}
                >
                  {selectedRole === "seller" && <Check className="h-2.5 w-2.5" />}
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#d96532]">
                Seller Experience
              </p>
              <p className="mt-1.5 text-[12px] leading-5 text-[#716960]">
                List your pre-owned electronics, receive fair market valuation, and manage listings.
              </p>
            </div>
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[12px] font-medium text-rose-700"
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleConfirmRole}
          disabled={loading || !selectedRole}
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#26231f] text-[13px] font-bold text-white transition hover:bg-[#d96532] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Continue to Dashboard <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#d96532]" />
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
