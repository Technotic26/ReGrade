"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  ShieldCheck,
} from "lucide-react";

const products = [
  {
    id: "prod-1",
    name: "Apple iPhone 13",
    meta: "128GB · Midnight",
    image: "/products/iphone-13.svg",
    grade: "A",
    confidence: "96%",
    price: "₹35,999",
    original: "₹69,900",
    battery: "91%",
    trust: "94",
  },
  {
    id: "prod-2",
    name: "MacBook Air M1",
    meta: "256GB · Space Grey",
    image: "/products/macbook-air.svg",
    grade: "B",
    confidence: "92%",
    price: "₹44,500",
    original: "₹92,900",
    battery: "87%",
    trust: "90",
  },
  {
    id: "prod-5",
    name: "PlayStation 5",
    meta: "Digital Edition · 825GB",
    image: "/products/ps5-console.svg",
    grade: "A",
    confidence: "95%",
    price: "₹31,999",
    original: "₹44,990",
    battery: "Verified",
    trust: "96",
  },
];

export function FeaturedListings() {
  const main = products[0];
  const side = products.slice(1);

  return (
    <section id="featured" className="bg-[#fbfaf7] py-24">

      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">

        {/* heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#b85c35]">
              Featured on ReGrade
            </div>

            <h2 className="max-w-[650px] text-[40px] font-medium leading-[1.05] tracking-[-0.045em] text-[#25231f] sm:text-[48px]">
              Good devices.
              <br />
              <span className="text-[#8d8176]">
                Properly verified.
              </span>
            </h2>

            <p className="mt-4 max-w-[550px] text-sm leading-7 text-[#776e65]">
              A few devices currently standing out for their
              condition, value and ReGrade Trust Score.
            </p>
          </div>

          <a
            href="#categories"
            className="flex items-center gap-2 text-[12px] font-bold text-[#b85c35]"
          >
            Browse all devices
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* FEATURE GRID */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_0.85fr]">

          {/* MAIN */}
          <article className="group overflow-hidden rounded-[26px] border border-[#e3dbd2] bg-white transition hover:shadow-[0_20px_55px_rgba(50,40,30,0.09)]">

            <div className="relative flex h-[390px] items-center justify-center bg-[#f3efe9]">

              <img
                src={main.image}
                alt={main.name}
                className="h-[285px] w-auto object-contain drop-shadow-[0_25px_25px_rgba(40,35,30,0.18)] transition duration-500 group-hover:scale-105"
              />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-[#e2d8ce] bg-white px-3 py-2 shadow-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b85c35] text-[10px] font-black text-white">
                  {main.grade}
                </span>
                <span className="text-[10px] font-bold text-[#423d37]">
                  Grade {main.grade}
                </span>
                <span className="text-[9px] text-[#978d84]">
                  {main.confidence}
                </span>
              </div>

              <button className="absolute right-5 top-5 rounded-full border border-[#e2d8ce] bg-white p-2.5 text-[#716960] shadow-sm hover:text-[#b85c35]">
                <Heart className="h-4 w-4" />
              </button>

              <div className="absolute bottom-5 right-5 rounded-2xl border border-[#e2d8ce] bg-white px-4 py-3 shadow-sm">
                <div className="text-[8px] font-bold uppercase tracking-wider text-[#9d9288]">
                  Fair price
                </div>
                <div className="mt-1 text-xl font-bold text-[#25231f]">
                  {main.price}
                </div>
              </div>
            </div>

            <div className="p-6">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#a09489]">
                    {main.meta}
                  </div>

                  <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.035em] text-[#282521]">
                    {main.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#827970]">
                    Excellent condition · {main.battery} battery health
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-[#f8f1eb] px-3 py-2">
                  <ShieldCheck className="h-4 w-4 text-[#b85c35]" />
                  <div>
                    <div className="text-[8px] uppercase text-[#9d9288]">
                      Trust
                    </div>
                    <div className="text-sm font-bold text-[#292621]">
                      {main.trust}/100
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#ebe4dc] pt-5">

                <div>
                  <span className="text-xs text-[#aaa097] line-through">
                    {main.original}
                  </span>
                  <span className="ml-3 text-[10px] font-bold text-[#b85c35]">
                    Verified value
                  </span>
                </div>

                <Link href={`/products/${main.id}`} className="flex items-center gap-2 rounded-xl bg-[#25231f] px-5 py-3 text-[11px] font-bold text-white transition hover:bg-[#b85c35]">
                  View device
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

              </div>
            </div>
          </article>

          {/* SIDE */}
          <div className="grid gap-5">

            {side.map((product) => (
              <article
                key={product.name}
                className="group grid grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[24px] border border-[#e3dbd2] bg-white transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(50,40,30,0.08)]"
              >

                <div className="relative flex min-h-[250px] items-center justify-center bg-[#f3efe9]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[175px] max-w-[85%] object-contain drop-shadow-[0_15px_15px_rgba(40,35,30,0.16)] transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#b85c35] text-[10px] font-black text-white">
                    {product.grade}
                  </div>
                </div>

                <div className="flex flex-col justify-between p-5">

                  <div>
                    <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#a09489]">
                      {product.meta}
                    </div>

                    <h3 className="mt-1 text-[18px] font-semibold leading-tight tracking-[-0.025em] text-[#292621]">
                      {product.name}
                    </h3>

                    <div className="mt-4 flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#b85c35]" />
                      <span className="text-[10px] font-semibold text-[#6f675f]">
                        Trust {product.trust}/100
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-[9px] text-[#a0968c]">
                      Fair market price
                    </div>

                    <div className="mt-1 text-xl font-bold text-[#25231f]">
                      {product.price}
                    </div>

                    <Link href={`/products/${product.id}`} className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-[#b85c35]">
                      View details
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                </div>
              </article>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
