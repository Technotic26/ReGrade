import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowUpRight,
  ClipboardList,
  LogOut,
  Package,
  RefreshCw,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Dashboard — Milestone 2 (Role-Aware Auth Foundation)
 *
 * This page is protected by middleware.ts.
 * Displays tailored experiences for Buyer vs Seller.
 */
export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/dashboard");
  }

  // Fetch the user's profile
  const { data: profile } = (await supabase
    .from("profiles")
    .select("full_name, role, created_at")
    .eq("id", user.id)
    .maybeSingle()) as {
    data: { full_name: string | null; role: string; created_at: string } | null;
    error: unknown;
  };

  const displayName =
    profile?.full_name ??
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "Unnamed User";

  const effectiveRole =
    profile?.role ??
    (user.user_metadata?.role as string | undefined) ??
    "buyer";

  const isSeller = effectiveRole === "seller";
  const roleLabel = isSeller ? "Seller" : "Buyer";

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  // Role-specific dashboard sections
  const BUYER_SECTIONS = [
    {
      icon: ShoppingBag,
      title: "Browse Products",
      description: "Explore AI-inspected smartphones, laptops, and consoles with verified grading.",
      badge: "Available Now",
      href: "/browse",
      isAction: true,
    },
    {
      icon: Package,
      title: "My Orders",
      description: "Track your active purchases, courier tracking, and 72h inspection window.",
      badge: "Coming in Milestone 4",
      href: "#",
      isAction: false,
    },
    {
      icon: User,
      title: "Profile",
      description: "Manage your delivery addresses, contact information, and notifications.",
      badge: "Coming in Milestone 3",
      href: "#",
      isAction: false,
    },
  ];

  const SELLER_SECTIONS = [
    {
      icon: Tag,
      title: "Sell A Device",
      description: "Guided 5-step listing wizard with technical specs and multi-angle photo documentation.",
      badge: "Available Now",
      href: "/sell",
      isAction: true,
    },
    {
      icon: ClipboardList,
      title: "My Listings",
      description: "Manage your active listings, view buyer interest, and review AI condition reports.",
      badge: "Coming in Milestone 3",
      href: "#",
      isAction: false,
    },
    {
      icon: User,
      title: "Seller Profile",
      description: "Manage bank payout details, seller verification credentials, and ratings.",
      badge: "Coming in Milestone 3",
      href: "#",
      isAction: false,
    },
  ];

  const currentSections = isSeller ? SELLER_SECTIONS : BUYER_SECTIONS;

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#26231f]">
      <Navbar />

      <main className="mx-auto max-w-[1280px] px-5 py-12 lg:px-8">
        {/* Page header */}
        <div className="mb-10 border-b border-[#e4dbd2] pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c95e2c]">
                {roleLabel} Dashboard
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#d96532]/30 bg-[#fff2ea] px-2.5 py-0.5 text-[10px] font-bold text-[#d96532]">
                {isSeller ? <Tag className="h-3 w-3" /> : <ShoppingBag className="h-3 w-3" />}
                {roleLabel} Mode
              </span>
            </div>

            <h1 className="mt-3 text-[36px] font-medium tracking-[-0.05em]">
              Welcome back,{" "}
              <span className="text-[#d96532]">
                {displayName.split(" ")[0]}
              </span>
              .
            </h1>
            <p className="mt-2 text-[14px] text-[#716960]">
              {user.email} · Member since {memberSince}
            </p>
          </div>

          <Link
            href="/auth/onboarding"
            className="inline-flex items-center gap-2 rounded-xl border border-[#e4dbd2] bg-white px-4 py-2.5 text-[11px] font-bold text-[#4a4540] transition hover:border-[#d96532] hover:text-[#d96532]"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#d96532]" />
            Switch to {isSeller ? "Buyer" : "Seller"} Mode
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          {/* LEFT — Account card */}
          <aside className="space-y-5">
            {/* Profile summary */}
            <div className="rounded-[22px] border border-[#e4dbd2] bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2ede6] text-[22px] font-bold text-[#d96532]">
                  {displayName.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <p className="text-[15px] font-semibold">{displayName}</p>
                  <p className="mt-0.5 text-[11px] text-[#9b9087]">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#f4efe9] px-3 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#9b9087]">
                    Role
                  </p>
                  <p className="mt-1 text-[13px] font-bold capitalize text-[#d96532]">
                    {roleLabel}
                  </p>
                </div>
                <div className="rounded-xl bg-[#f4efe9] px-3 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#9b9087]">
                    Auth
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[13px] font-bold text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified
                  </p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="overflow-hidden rounded-[22px] border border-[#e4dbd2] bg-white">
              {isSeller ? (
                <>
                  <AccountLink href="/sell" icon={<Tag className="h-4 w-4" />} label="Sell A Device" />
                  <AccountLink href="#" icon={<ClipboardList className="h-4 w-4" />} label="My Listings" disabled />
                  <AccountLink href="#" icon={<User className="h-4 w-4" />} label="Seller Profile" disabled />
                </>
              ) : (
                <>
                  <AccountLink href="/browse" icon={<ShoppingBag className="h-4 w-4" />} label="Browse Products" />
                  <AccountLink href="#" icon={<Package className="h-4 w-4" />} label="My Orders" disabled />
                  <AccountLink href="#" icon={<User className="h-4 w-4" />} label="Buyer Profile" disabled />
                </>
              )}
              <LogoutButton />
            </div>
          </aside>

          {/* RIGHT — Role-specific section cards */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9b9087]">
                {roleLabel} Hub
              </p>
              <span className="text-[11px] text-[#716960]">
                {isSeller ? "Seller tools & listings" : "Shopping & order protection"}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {currentSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.title}
                    className="group rounded-[20px] border border-[#e4dbd2] bg-white p-6 transition hover:border-[#d9b6a3]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4efe9] text-[#d96532]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] ${
                          section.isAction
                            ? "bg-[#fff2ea] text-[#d96532] border border-[#d96532]/30"
                            : "border border-[#e4dbd2] bg-white text-[#9b9087]"
                        }`}
                      >
                        {section.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[15px] font-semibold">
                      {section.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-5 text-[#716960]">
                      {section.description}
                    </p>

                    {section.isAction && (
                      <Link
                        href={section.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#d96532] hover:underline"
                      >
                        Open {section.title} <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                );
              })}

              {/* Action Banner tailored to role */}
              <div className="rounded-[20px] border border-[#26231f] bg-[#26231f] p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#e8a16f]">
                  {isSeller ? "Sell Pre-Owned Tech" : "Verified Recommerce"}
                </p>
                <h3 className="mt-3 text-[18px] font-semibold leading-tight">
                  {isSeller ? (
                    <>
                      List with <span className="text-[#e8a16f]">AI Valuation</span>
                    </>
                  ) : (
                    <>
                      Explore the <span className="text-[#e8a16f]">Verified Catalogue</span>
                    </>
                  )}
                </h3>
                <p className="mt-2 text-[12px] leading-5 text-[#c8bfb8]">
                  {isSeller
                    ? "Complete the 5-step listing flow with photos and technical specs to prepare your listing."
                    : "Browse smartphones, laptops, and gear with transparent condition reports and 72-hour protection."}
                </p>
                <div className="mt-5">
                  {isSeller ? (
                    <Link
                      href="/sell"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#d96532] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#e07645]"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> Start Listing Device <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href="/browse"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#d96532] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#e07645]"
                    >
                      Browse Devices <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function AccountLink({
  href,
  icon,
  label,
  disabled = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
}) {
  const base =
    "flex items-center gap-3 border-b border-[#f0e9e1] px-5 py-3.5 text-[13px] font-semibold last:border-none";
  if (disabled) {
    return (
      <div className={`${base} cursor-not-allowed text-[#c0b8b0]`}>
        {icon}
        {label}
        <span className="ml-auto text-[9px] font-bold uppercase tracking-[0.1em] text-[#c0b8b0]">
          Soon
        </span>
      </div>
    );
  }
  return (
    <Link
      href={href}
      className={`${base} text-[#4a4540] transition hover:bg-[#faf6f2] hover:text-[#d96532]`}
    >
      {icon}
      {label}
      <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-40" />
    </Link>
  );
}

function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        const { createClient: createServerSideClient } = await import(
          "@/lib/supabase/server"
        );
        const supabase = await createServerSideClient();
        await supabase.auth.signOut();
        const { redirect: nextRedirect } = await import("next/navigation");
        nextRedirect("/");
      }}
    >
      <button
        type="submit"
        className="flex w-full items-center gap-3 px-5 py-3.5 text-[13px] font-semibold text-rose-600 transition hover:bg-rose-50"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </form>
  );
}
