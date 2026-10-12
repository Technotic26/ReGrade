"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Package,
  Search,
  ShoppingBag,
  Sun,
  Tag,
  X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { CATEGORIES_DATA, FEATURED_PRODUCTS } from "@/data/mock-landing-data";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// ─── Nav links ──────────────────────────────────────────────────────────────
const links = [
  ["Home", "/"],
  ["Browse", "/browse"],
  ["Categories", "/browse"],
  ["The ReGrade Standard", "#ai-grading"],
  ["Pricing", "#pricing-engine"],
] as const;

// ─── Dark mode store ────────────────────────────────────────────────────────
const themeEvent = "regrade-theme-change";
const getTheme = () =>
  window.localStorage.getItem("regrade-theme") === "dark" ||
  (!window.localStorage.getItem("regrade-theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);
const getServerTheme = () => false;
const subscribeTheme = (callback: () => void) => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener(themeEvent, callback);
  media.addEventListener("change", callback);
  return () => {
    window.removeEventListener(themeEvent, callback);
    media.removeEventListener("change", callback);
  };
};

// ─── Component ───────────────────────────────────────────────────────────────
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userRole, setUserRole] = useState<"buyer" | "seller" | "admin" | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const dark = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const router = useRouter();
  const supabase = createClient();

  // Sync dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Fetch initial session, load role, and subscribe to auth changes
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const fetchRole = async (u: SupabaseUser) => {
      try {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", u.id)
          .single();
        const r = (data as unknown as { role?: "buyer" | "seller" | "admin" } | null)?.role;
        setUserRole(r ?? (u.user_metadata?.role as "buyer" | "seller") ?? "buyer");
      } catch {
        setUserRole((u.user_metadata?.role as "buyer" | "seller") ?? "buyer");
      }
    };

    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u);
      if (u) fetchRole(u);
    }).catch(() => {});

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          fetchRole(u);
        } else {
          setUserRole(null);
        }
      }
    );
    return () => listener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search autocomplete suggestions
  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    const categoryMatches = CATEGORIES_DATA.filter((c) =>
      `${c.name} ${c.tagline}`.toLowerCase().includes(value)
    ).map((c) => ({ label: c.name, detail: "Category", href: `/categories/${c.slug}` }));
    const productMatches = FEATURED_PRODUCTS.filter((p) =>
      `${p.name} ${p.category}`.toLowerCase().includes(value)
    ).map((p) => ({ label: p.name, detail: p.category, href: `/browse?q=${encodeURIComponent(p.name)}` }));
    return [...categoryMatches, ...productMatches].slice(0, 6);
  }, [query]);

  const visit = useCallback(
    (href: string) => {
      router.push(href);
      setFocused(false);
      setOpen(false);
      setActiveSuggestion(-1);
    },
    [router]
  );

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    visit(query.trim() ? `/browse?q=${encodeURIComponent(query.trim())}` : "/browse");
  };

  const toggleTheme = () => {
    window.localStorage.setItem("regrade-theme", dark ? "light" : "dark");
    window.dispatchEvent(new Event(themeEvent));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    setUser(null);
    setUserRole(null);
    router.push("/");
    router.refresh();
  };

  // User display name (initials for avatar)
  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "";
  const initials = displayName
    ? displayName
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const isSeller = userRole === "seller";

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4dbd2] bg-[#faf8f4]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center gap-4 px-5 lg:gap-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="ReGrade home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26231f] text-[13px] font-bold tracking-[-0.08em] text-white shadow-[0_5px_14px_rgba(38,35,31,0.15)]">
            RG
          </span>
          <span className="leading-none">
            <span className="block text-[20px] font-semibold tracking-[-0.04em] text-[#25231f]">
              Re<span className="text-[#d96532]">Grade</span>
            </span>
            <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.17em] text-[#93887d]">
              Pre-owned, made clear
            </span>
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={submitSearch} className="relative hidden w-full max-w-[245px] md:block">
          <label className="relative block">
            <span className="sr-only">Search devices</span>
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9b9087]" />
            <input
              value={query}
              onFocus={() => { setFocused(true); setActiveSuggestion(-1); }}
              onBlur={() => window.setTimeout(() => setFocused(false), 120)}
              onChange={(e) => { setQuery(e.target.value); setActiveSuggestion(-1); }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" && suggestions.length) { e.preventDefault(); setFocused(true); setActiveSuggestion((c) => Math.min(c + 1, suggestions.length - 1)); }
                if (e.key === "ArrowUp" && suggestions.length) { e.preventDefault(); setActiveSuggestion((c) => Math.max(c - 1, 0)); }
                if (e.key === "Enter" && activeSuggestion >= 0 && suggestions[activeSuggestion]) { e.preventDefault(); visit(suggestions[activeSuggestion].href); }
                if (e.key === "Escape") { setFocused(false); setActiveSuggestion(-1); }
              }}
              placeholder="Search devices"
              className="h-9 w-full rounded-xl border border-[#e2d9cf] bg-white pl-9 pr-3 text-[11px] text-[#3a342f] outline-none placeholder:text-[#a79c92] focus:border-[#d96532]"
            />
          </label>
          {focused && query.trim() && (
            <div className="absolute left-0 right-0 top-11 overflow-hidden rounded-xl border border-[#e2d9cf] bg-white p-1 shadow-[0_12px_30px_rgba(48,37,28,0.14)]">
              {suggestions.length
                ? suggestions.map((s, i) => (
                    <button
                      key={s.href}
                      type="button"
                      onMouseDown={() => visit(s.href)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${activeSuggestion === i ? "bg-[#f5eee8]" : "hover:bg-[#f5eee8]"}`}
                    >
                      <span className="text-[11px] font-bold text-[#352f2a]">{s.label}</span>
                      <span className="text-[9px] font-semibold text-[#9c9086]">{s.detail}</span>
                    </button>
                  ))
                : <p className="px-3 py-3 text-[11px] text-[#756b63]">No matching categories or devices.</p>}
            </div>
          )}
        </form>

        {/* Primary nav links */}
        <nav className="hidden flex-1 items-center justify-center gap-0.5 xl:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="rounded-lg px-3 py-2 text-[11px] font-semibold text-[#716960] transition hover:bg-[#f1ece6] hover:text-[#26231f]">
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-[#e2d9cf] bg-white p-2 text-[#625b53] transition hover:border-[#d96532] hover:text-[#d96532]"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          {user ? (
            /* ── Authenticated ── */
            <div className="flex items-center gap-3">
              {/* Role-tailored action button */}
              {isSeller ? (
                <Link
                  href="/sell"
                  className="flex items-center gap-1.5 rounded-xl bg-[#26231f] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#d96532]"
                >
                  <Tag className="h-3.5 w-3.5" /> Sell A Device <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <Link
                  href="/browse"
                  className="flex items-center gap-1.5 rounded-xl border border-[#e2d9cf] bg-white px-4 py-2.5 text-[11px] font-bold text-[#26231f] transition hover:border-[#d96532] hover:text-[#d96532]"
                >
                  <ShoppingBag className="h-3.5 w-3.5 text-[#d96532]" /> Browse Devices
                </Link>
              )}

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2.5 rounded-xl border border-[#e2d9cf] bg-white px-3 py-2 text-[11px] font-bold text-[#26231f] transition hover:border-[#d96532]"
                  aria-expanded={userMenuOpen}
                  aria-label="User menu"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d96532] text-[10px] font-bold text-white">
                    {initials}
                  </span>
                  <span className="max-w-[90px] truncate">{displayName.split(" ")[0]}</span>
                  <span className="rounded-full bg-[#f4efe9] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#716960]">
                    {isSeller ? "Seller" : "Buyer"}
                  </span>
                </button>

                {userMenuOpen && (
                  <>
                    <button
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                      aria-label="Close menu"
                    />
                    <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-[18px] border border-[#e2d9cf] bg-white shadow-[0_16px_40px_rgba(48,37,28,0.14)]">
                      <div className="border-b border-[#f0e9e1] px-4 py-3">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-[11px] font-bold text-[#26231f]">{displayName}</p>
                          <span className="rounded-full bg-[#fff2ea] border border-[#d96532]/30 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#d96532]">
                            {isSeller ? "Seller" : "Buyer"}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[10px] text-[#9b9087]">{user.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold text-[#3a342f] transition hover:bg-[#f5eee8] hover:text-[#d96532]"
                      >
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                      </Link>

                      {isSeller ? (
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 text-[12px] font-semibold text-[#3a342f] transition hover:bg-[#f5eee8] hover:text-[#d96532]"
                        >
                          <span className="flex items-center gap-2.5">
                            <ClipboardList className="h-4 w-4" /> My Listings
                          </span>
                          <span className="text-[9px] font-bold uppercase text-[#a99e94]">Soon</span>
                        </Link>
                      ) : (
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 text-[12px] font-semibold text-[#3a342f] transition hover:bg-[#f5eee8] hover:text-[#d96532]"
                        >
                          <span className="flex items-center gap-2.5">
                            <Package className="h-4 w-4" /> My Orders
                          </span>
                          <span className="text-[9px] font-bold uppercase text-[#a99e94]">Soon</span>
                        </Link>
                      )}

                      <Link
                        href="/auth/onboarding"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold text-[#3a342f] transition hover:bg-[#f5eee8] hover:text-[#d96532]"
                      >
                        <Tag className="h-4 w-4" /> Switch Role
                      </Link>

                      <div className="border-t border-[#f0e9e1]">
                        <button
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold text-rose-600 transition hover:bg-rose-50"
                        >
                          <LogOut className="h-4 w-4" /> Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* ── Unauthenticated ── */
            <>
              <a
                href="#comparison"
                className="text-[11px] font-semibold text-[#625b53] transition hover:text-[#d96532]"
              >
                How It Works
              </a>
              <Link
                href="/auth/login"
                className="rounded-xl border border-[#e2d9cf] bg-white px-4 py-2.5 text-[11px] font-bold text-[#26231f] transition hover:border-[#d96532] hover:text-[#d96532]"
              >
                Sign In
              </Link>
              <a
                href="#sell-cta"
                className="flex items-center gap-1.5 rounded-xl bg-[#26231f] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#d96532]"
              >
                Sell A Device <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </>
          )}
        </div>

        {/* Mobile right side */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-[#e2d9cf] bg-white p-2 text-[#625b53]"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => setOpen((c) => !c)}
            className="rounded-xl border border-[#e2d9cf] bg-white p-2"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5 text-[#25231f]" /> : <Menu className="h-5 w-5 text-[#25231f]" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-[#e8e1d8] bg-[#faf8f4] px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-semibold text-[#504a44] hover:bg-[#f1ece6]"
            >
              {label}
            </a>
          ))}

          <div className="mt-3 border-t border-[#e8e1d8] pt-3">
            {user ? (
              <>
                <div className="mb-2 flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d96532] text-[12px] font-bold text-white">
                      {initials}
                    </span>
                    <div>
                      <p className="text-[12px] font-bold text-[#26231f]">{displayName}</p>
                      <p className="text-[10px] text-[#9b9087]">{user.email}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#fff2ea] border border-[#d96532]/30 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d96532]">
                    {isSeller ? "Seller" : "Buyer"}
                  </span>
                </div>

                {isSeller ? (
                  <Link
                    href="/sell"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg bg-[#26231f] px-3 py-3 text-sm font-bold text-white mb-2"
                  >
                    <Tag className="h-4 w-4" /> Sell A Device
                  </Link>
                ) : (
                  <Link
                    href="/browse"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-[#e2d9cf] bg-white px-3 py-3 text-sm font-bold text-[#26231f] mb-2"
                  >
                    <ShoppingBag className="h-4 w-4 text-[#d96532]" /> Browse Devices
                  </Link>
                )}

                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-[#504a44] hover:bg-[#f1ece6]"
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>

                <Link
                  href="/auth/onboarding"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-[#504a44] hover:bg-[#f1ece6]"
                >
                  <Tag className="h-4 w-4" /> Switch Role ({isSeller ? "Buyer" : "Seller"})
                </Link>

                <button
                  onClick={() => { handleSignOut(); setOpen(false); }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl border border-[#e4dbd2] bg-white px-4 py-3 text-center text-sm font-bold text-[#26231f]"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-[#26231f] px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
