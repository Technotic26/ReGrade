"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ArrowUpRight, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CATEGORIES_DATA, FEATURED_PRODUCTS } from "@/data/mock-landing-data";
import { formatINR } from "@/lib/utils";

function BrowseContent() {
  const params = useSearchParams();
  const query = params.get("q")?.trim().toLowerCase() ?? "";
  const categories = CATEGORIES_DATA.filter(
    (category) =>
      !query ||
      `${category.name} ${category.tagline}`.toLowerCase().includes(query)
  );
  const products = FEATURED_PRODUCTS.filter(
    (product) =>
      !query ||
      `${product.name} ${product.category}`.toLowerCase().includes(query)
  );

  return (
    <main className="mx-auto max-w-[1280px] px-5 py-14 lg:px-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c95e2c]">
        Browse ReGrade
      </p>
      <h1 className="mt-4 text-[42px] font-medium tracking-[-0.05em] sm:text-[56px]">
        {query ? `Results for “${params.get("q")}”` : "Find your next device."}
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[#716960]">
        Explore categories and example listings. Every category has its own
        dedicated page, ready for the live catalogue.
      </p>

      <form className="mt-8 max-w-xl" action="/browse">
        <label className="relative block">
          <span className="sr-only">Search the catalogue</span>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#968b82]" />
          <input
            name="q"
            defaultValue={params.get("q") ?? ""}
            placeholder="Search a device or category"
            className="h-12 w-full rounded-xl border border-[#ded3c9] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#d96532]"
          />
        </label>
      </form>

      <section className="mt-14">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9e9389]">
              Categories
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Browse by device type
            </h2>
          </div>
          <span className="text-[11px] text-[#776d65]">
            {categories.length} found
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group rounded-2xl border border-[#e4dbd2] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#d9b6a3]"
            >
              <div className="flex h-28 items-center justify-center rounded-xl bg-[#f4efe9]">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  unoptimized
                  className="h-20 w-20 object-contain"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-[13px] font-bold">{category.name}</h3>
                <ArrowUpRight className="h-4 w-4 text-[#d96532]" />
              </div>
              <p className="mt-1 text-[11px] leading-5 text-[#7c726a]">
                {category.tagline}
              </p>
            </Link>
          ))}
        </div>
        {categories.length === 0 && (
          <p className="mt-6 text-sm text-[#776d65]">
            No categories match this search.
          </p>
        )}
      </section>

      <section className="mt-16 border-t border-[#e4dbd2] pt-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9e9389]">
          Example listings
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="overflow-hidden rounded-2xl border border-[#e4dbd2] bg-white transition hover:-translate-y-0.5 hover:border-[#d9b6a3]"
            >
              <div className="flex h-48 items-center justify-center bg-[#f4efe9]">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={180}
                  unoptimized
                  className="h-36 w-36 object-contain"
                />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a0958b]">
                  {product.category} · Grade {product.grade}
                </p>
                <h3 className="mt-2 text-[16px] font-semibold">
                  {product.name}
                </h3>
                <p className="mt-3 text-[15px] font-bold">
                  {formatINR(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {products.length === 0 && (
          <p className="mt-6 text-sm text-[#776d65]">
            No example listings match this search yet.
          </p>
        )}
      </section>
    </main>
  );
}

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#26231f]">
      <Navbar />
      <Suspense
        fallback={
          <main className="mx-auto flex min-h-[60vh] max-w-[1280px] items-center justify-center px-5">
            <Loader2 className="h-8 w-8 animate-spin text-[#d96532]" />
          </main>
        }
      >
        <BrowseContent />
      </Suspense>
      <Footer />
    </div>
  );
}
