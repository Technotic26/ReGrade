import Image from "next/image";
import { ArrowDownRight, ArrowRight, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#faf8f4]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 pb-12 pt-14 lg:grid-cols-[0.84fr_1.16fr] lg:items-end lg:px-8 lg:pb-16 lg:pt-20">
        <div className="relative z-10 pb-3 lg:pb-10">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c95e2c]"><span className="h-1.5 w-1.5 rounded-full bg-[#d96532]" />Pre-owned, made clear</p>
          <h1 className="mt-5 max-w-xl text-[48px] font-medium leading-[0.99] tracking-[-0.06em] text-[#26231f] sm:text-[63px] lg:text-[72px]">Give good tech<br />a better next<br /><span className="text-[#d96532]">chapter.</span></h1>
          <p className="mt-7 max-w-md text-[15px] leading-7 text-[#716960]">A more transparent marketplace for electronics that still have plenty left to give — with clear condition language, fair price context, and room to inspect.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#featured" className="inline-flex items-center gap-3 rounded-xl bg-[#26231f] px-5 py-3.5 text-[12px] font-bold text-white transition hover:bg-[#d96532]">Explore devices <ArrowRight className="h-4 w-4" /></a>
            <a href="#ai-grading" className="inline-flex items-center gap-3 rounded-xl border border-[#ddd2c7] bg-white px-5 py-3.5 text-[12px] font-bold text-[#49423b] transition hover:border-[#d96532] hover:text-[#d96532]">See the standard <ArrowDownRight className="h-4 w-4" /></a>
          </div>
          <div className="mt-10 flex items-center gap-3 text-[11px] font-medium text-[#776e65]"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8e9e0] text-[#d96532]"><ShieldCheck className="h-4 w-4" /></span>72-hour buyer protection is built into the experience.</div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[30px] border border-[#e4dbd2] bg-[#eee8e0] shadow-[0_28px_70px_rgba(67,48,35,0.12)]">
            <Image src="/products/regrade-hero-still-life.png" alt="A smartphone, laptop, and wireless earbuds arranged in a warm studio setting" width={1536} height={1024} priority className="aspect-[1.32/1] w-full object-cover" />
          </div>
          <div className="absolute bottom-5 left-5 rounded-2xl border border-[#e7ddd4] bg-white/95 px-4 py-3 shadow-[0_10px_28px_rgba(56,42,31,0.12)] backdrop-blur-sm sm:bottom-7 sm:left-7">
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#9c9188]">A listing should explain itself</p>
            <p className="mt-1 text-[12px] font-bold text-[#322d28]">Condition · price · trust</p>
          </div>
        </div>
      </div>
    </section>
  );
}
