"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, Suspense } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured yet. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.");
      return;
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(
        signInError.message === "Invalid login credentials"
          ? "Incorrect email or password. Please try again."
          : "Something went wrong. Please try again."
      );
      setLoading(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  async function handleGoogleLogin() {
    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured yet. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.");
      return;
    }

    setOauthLoading(true);
    setError(null);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (oauthError) {
      setError("Google sign-in failed. Please try email instead.");
      setOauthLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link
        href="/"
        className="mb-10 flex items-center gap-3"
        aria-label="ReGrade home"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26231f] text-[13px] font-bold tracking-[-0.08em] text-white shadow-[0_5px_14px_rgba(38,35,31,0.15)]">
          RG
        </span>
        <span className="text-[20px] font-semibold tracking-[-0.04em] text-[#25231f]">
          Re<span className="text-[#d96532]">Grade</span>
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-[420px] rounded-[24px] border border-[#e4dbd2] bg-white p-8 shadow-[0_8px_32px_rgba(38,35,31,0.07)]">
        <h1 className="text-[26px] font-semibold tracking-[-0.04em] text-[#26231f]">
          Sign in to ReGrade
        </h1>
        <p className="mt-1.5 text-[13px] leading-6 text-[#716960]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-[#d96532] hover:underline"
          >
            Create one free
          </Link>
        </p>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={oauthLoading || loading}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-[#e4dbd2] bg-white px-4 py-3 text-[13px] font-semibold text-[#26231f] transition hover:border-[#d96532] hover:bg-[#fff8f5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {oauthLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#d96532]" />
          ) : (
            <GoogleIcon />
          )}
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e4dbd2]" />
          <span className="text-[11px] font-semibold text-[#a99e94]">OR</span>
          <div className="h-px flex-1 bg-[#e4dbd2]" />
        </div>

        {/* Email / Password form */}
        <form onSubmit={handleLogin} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[12px] font-semibold text-[#4a4540]"
            >
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
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[12px] font-semibold text-[#4a4540]"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="h-11 w-full rounded-xl border border-[#e0d9d1] bg-[#faf8f4] px-3.5 pr-10 text-[13px] text-[#26231f] outline-none placeholder:text-[#b8afa6] focus:border-[#d96532] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b9087] hover:text-[#d96532]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
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
            className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#26231f] text-[13px] font-bold text-white transition hover:bg-[#d96532] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Sign in <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>

      <p className="mt-6 text-[11px] text-[#a99e94]">
        By signing in you agree to the{" "}
        <span className="font-semibold text-[#716960]">Terms of Service</span>{" "}
        and{" "}
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#d96532]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
