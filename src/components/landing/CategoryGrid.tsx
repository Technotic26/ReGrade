"use client";

import Image from "next/image";
import type { ElementType } from "react";
import { ArrowUpRight, Camera, Gamepad2, Headphones, Laptop, Monitor, Smartphone, Tablet, Watch } from "lucide-react";
import { CATEGORIES_DATA } from "@/data/mock-landing-data";
import { formatINR } from "@/lib/utils";

const icons: Record<string, ElementType> = { Smartphone, Laptop, Tablet, Gamepad2, Headphones, Watch, Camera, Monitor };

export function CategoryGrid() {
  return (
    <section id="categories" className="bg-[#faf8f4] py-24">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid gap-8 border-b border-[#e4dbd2] pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d96532]">Shop with a clearer starting point</p>
            <h2 className="mt-3 max-w-xl text-[39px] font-medium leading-[1.05] tracking-[-0.045em] text-[#26231f] sm:text-[48px]">Tech worth a second look.</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#716960]">Eight categories, each with condition details that make sense for the device in front of you.</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-4">
          {CATEGORIES_DATA.map((category) => {
            const Icon = icons[category.iconName] ?? Smartphone;
            return (
              <a key={category.id} href={`/categories/${category.slug}`} className="group border-b border-[#e4dbd2] pb-6">
                <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-[#f2ede6] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#efe3d8]">
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold text-[#756c64]">{category.badgeText}</span>
                  <Image src={category.image} alt={category.name} width={140} height={140} unoptimized className="h-28 w-28 object-contain drop-shadow-[0_14px_14px_rgba(38,35,31,0.13)] transition duration-300 group-hover:scale-105" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5"><Icon className="h-3.5 w-3.5 text-[#d96532]" /><h3 className="text-[14px] font-bold tracking-[-0.02em] text-[#302c28]">{category.name}</h3></div>
                    <p className="mt-1.5 min-h-10 text-[11px] leading-5 text-[#80766d]">{category.tagline}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#a0968d] transition group-hover:text-[#d96532]" />
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9a9087]">From <span className="ml-1 font-bold normal-case tracking-normal text-[#4b453f]">{formatINR(category.startingPriceINR)}</span></p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
