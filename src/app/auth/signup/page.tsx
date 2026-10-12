"use client";

import Link from "next/link";
import { useState, FormEvent, Suspense } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Eye, EyeOff, ArrowRight, Loader2, Check, ShoppingBag, Tag } from "lucide-react";

type SignupRole = "buyer" | "seller";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "At least one number", test: (p: string) => /\d/.test(p) },
  { label: "At least one letter", test: (p: string) => /[a-zA-Z]/.test(p) },
];

function SignupForm() {
  const [selectedRole, setSelectedRole] = useState<SignupRole | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const passwordValid = PASSWORD_RULES.every((r) => r.test(password));

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(
        "Supabase is not configured yet. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file."
      );
      return;
    }

    if (!selectedRole) {
      setError("Please select how you want to use ReGrade (Buy or Sell).");
      return;
    }

    if (!passwordValid) {
      setError("Please meet all password requirements before continuing.");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          role: selectedRole, // Safely pass only 'buyer' or 'seller'
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?role=${selectedRole}`,
      },
    });

    if (signUpError) {
      if (signUpError.message.toLowerCase().includes("already registered")) {
        setError("This email is already registered. Try signing in instead.");
      } else {
        setError(signUpError.message ?? "Signup failed. Please try again.");
      }
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  async function handleGoogleSignup() {
    if (!isSupabaseConfigured()) {
      setError(
        "Supabase is not configured yet. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file."
      );
      return;
    }

    if (!selectedRole) {
      setError("Please select how you want to use ReGrade before continuing with Google.");
      return;
    }

    setOauthLoading(true);
    setError(null);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?role=${selectedRole}&next=/dashboard`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (oauthError) {
      setError("Google sign-up failed. Please try email instead.");
      setOauthLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#faf8f4] flex flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-10 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26231f] text-[13px] font-bold tracking-[-0.08em] text-white shadow-[0_5px_14px_rgba(38,35,31,0.15)]">
            RG
          </span>
          <span className="text-[20px] font-semibold tracking-[-0.04em] text-[#25231f]">
            Re<span className="text-[#d96532]">Grade</span>
          </span>
        </Link>

        <div className="w-full max-w-[440px] rounded-[24px] border border-[#e4dbd2] bg-white p-8 shadow-[0_8px_32px_rgba(38,35,31,0.07)] text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2ea] text-[#d96532]">
            <Check className="h-7 w-7" />
          </div>
          <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#26231f]">
            Check your email
          </h2>
          <p className="mt-3 text-[13px] leading-6 text-[#716960]">
            We sent a confirmation link to{" "}
            <strong className="text-[#26231f]">{email}</strong>. Click the link
            to activate your account as a{" "}
            <strong className="text-[#d96532] capitalize">{selectedRole}</strong> and start using ReGrade.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#e4dbd2] px-5 py-2.5 text-[12px] font-bold text-[#26231f] transition hover:border-[#d96532] hover:text-[#d96532]"
          >
            Back to sign in
          </Link>
        </div>
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

      {/* Card */}
      <div className="w-full max-w-[480px] rounded-[24px] border border-[#e4dbd2] bg-white p-8 shadow-[0_8px_32px_rgba(38,35,31,0.07)]">
        <h1 className="text-[26px] font-semibold tracking-[-0.04em] text-[#26231f]">
          Create your account
        </h1>
        <p className="mt-1.5 text-[13px] leading-6 text-[#716960]">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-[#d96532] hover:underline">
            Sign in
          </Link>
        </p>

        {/* ─── REQUIRED ROLE SELECTION ─── */}
        <div className="mt-6">
          <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#4a4540]">
            How do you want to use ReGrade? <span className="text-[#d96532]">*</span>
          </label>
          <p className="mt-1 text-[11px] text-[#716960]">
            Choose your primary intent. You can always browse or sell later.
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {/* 1. Buy Used Tech */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole("buyer");
                if (error?.includes("select how you want to use")) setError(null);
              }}
              className={`relative flex flex-col text-left rounded-2xl p-4 border transition-all ${
                selectedRole === "buyer"
                  ? "border-[#d96532] bg-[#fff8f5] shadow-sm ring-1 ring-[#d96532]"
                  : "border-[#e4dbd2] bg-white hover:border-[#d9b6a3] hover:bg-[#faf6f2]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                    selectedRole === "buyer"
                      ? "bg-[#d96532] text-white"
                      : "bg-[#f4efe9] text-[#716960]"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                </span>
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
              <p className="mt-3 text-[14px] font-bold text-[#26231f]">
                Buy Used Tech
              </p>
              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d96532]">
                Buyer
              </p>
              <p className="mt-2 text-[11px] leading-4 text-[#716960]">
                Browse and purchase verified pre-owned devices with 72h protection.
              </p>
            </button>

            {/* 2. Sell Your Device */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole("seller");
                if (error?.includes("select how you want to use")) setError(null);
              }}
              className={`relative flex flex-col text-left rounded-2xl p-4 border transition-all ${
                selectedRole === "seller"
                  ? "border-[#d96532] bg-[#fff8f5] shadow-sm ring-1 ring-[#d96532]"
                  : "border-[#e4dbd2] bg-white hover:border-[#d9b6a3] hover:bg-[#faf6f2]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                    selectedRole === "seller"
                      ? "bg-[#d96532] text-white"
                      : "bg-[#f4efe9] text-[#716960]"
                  }`}
                >
                  <Tag className="h-4 w-4" />
                </span>
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
              <p className="mt-3 text-[14px] font-bold text-[#26231f]">
                Sell Your Device
              </p>
              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d96532]">
                Seller
              </p>
              <p className="mt-2 text-[11px] leading-4 text-[#716960]">
                List your used device, get fair AI pricing, and sell transparently.
              </p>
            </button>
          </div>
        </div>

        {/* Google OAuth */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={oauthLoading || loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#e4dbd2] bg-white px-4 py-3 text-[13px] font-semibold text-[#26231f] transition hover:border-[#d96532] hover:bg-[#fff8f5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {oauthLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#d96532]" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </button>
          {!selectedRole && (
            <p className="mt-1.5 text-center text-[10px] text-[#9b9087]">
              Please pick Buy or Sell above before clicking Google.
            </p>
          )}
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e4dbd2]" />
          <span className="text-[11px] font-semibold text-[#a99e94]">OR</span>
          <div className="h-px flex-1 bg-[#e4dbd2]" />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSignup} noValidate className="space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-[12px] font-semibold text-[#4a4540]">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Arjun Sharma"
              className="h-11 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3.5 text-[13px] text-[#26231f] outline-none placeholder:text-[#b8afa6] focus:border-[#d96532] focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[12px] font-semibold text-[#4a4540]">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3.5 text-[13px] text-[#26231f] outline-none placeholder:text-[#b8afa6] focus:border-[#d96532] focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-[12px] font-semibold text-[#4a4540]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                className="h-11 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3.5 pr-10 text-[13px] text-[#26231f] outline-none placeholder:text-[#b8afa6] focus:border-[#d96532] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9087] hover:text-[#d96532]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Password rules */}
            {password.length > 0 && (
              <ul className="mt-2.5 space-y-1.5">
                {PASSWORD_RULES.map((rule) => {
                  const passed = rule.test(password);
                  return (
                    <li
                      key={rule.label}
                      className={`flex items-center gap-2 text-[11px] font-medium transition-colors ${
                        passed ? "text-emerald-600" : "text-[#9b9087]"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          passed ? "bg-emerald-100" : "bg-[#f1ebe4]"
                        }`}
                      >
                        {passed && <Check className="h-2.5 w-2.5" />}
                      </span>
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[12px] font-medium text-rose-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || oauthLoading}
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#26231f] text-[13px] font-bold text-white transition hover:bg-[#d96532] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Create account {selectedRole ? `as ${selectedRole === "buyer" ? "Buyer" : "Seller"}` : ""} <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>

      <p className="mt-6 text-[11px] text-[#a99e94]">
        By creating an account you agree to the{" "}
        <span className="font-semibold text-[#716960]">Terms of Service</span> and{" "}
        <span className="font-semibold text-[#716960]">Privacy Policy</span>.
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#d96532]" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
