"use client";

import { useState } from "react";
import { ArrowRight, Check, PackageCheck, Wrench } from "lucide-react";
import { formatINR } from "@/lib/utils";

const examples = {
  Smartphone: { name: "iPhone 12", asIs: 22500, refurbished: 25300, work: "Battery replacement and deep clean" },
  Laptop: { name: "ThinkPad T14 Gen 2", asIs: 27500, refurbished: 31500, work: "Battery, thermal service and deep clean" },
  Console: { name: "PlayStation 4 Pro", asIs: 16500, refurbished: 17500, work: "Fan service and thermal refresh" },
};

export function FulfillmentComparison() {
  const [active, setActive] = useState<keyof typeof examples>("Smartphone");
  const selected = examples[active];

  return (
    <section id="comparison" className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c95e2c]">How it works</p><h2 className="mt-4 text-[40px] font-medium leading-[1.05] tracking-[-0.05em] text-[#26231f] sm:text-[50px]">Choose the next chapter for your device.</h2><p className="mt-5 text-sm leading-7 text-[#716960]">Buy a device in its documented condition, or choose a refurbishment path before it reaches you.</p></div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[26px] border border-[#e4dbd2] bg-[#faf8f4] p-7 sm:p-9"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eee6de] text-[#4a423b]"><PackageCheck className="h-5 w-5" /></div><p className="mt-7 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9c9188]">Option 01</p><h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#292520]">Buy As-Is</h3><p className="mt-3 max-w-md text-sm leading-7 text-[#716960]">Receive the device as described in its condition report, directly from the seller.</p><ul className="mt-7 space-y-3 border-t border-[#e5ddd5] pt-6 text-[12px] text-[#4c453e]">{["Condition report stays with the listing", "Direct delivery from the seller", "72-hour time to inspect after delivery"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d96532]" />{item}</li>)}</ul></article>
          <article className="rounded-[26px] bg-[#26231f] p-7 text-white sm:p-9"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#483a31] text-[#e8a16f]"><Wrench className="h-5 w-5" /></div><p className="mt-7 text-[10px] font-bold uppercase tracking-[0.15em] text-[#e8a16f]">Option 02</p><h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">Buy Refurbished</h3><p className="mt-3 max-w-md text-sm leading-7 text-[#c9c0b8]">Route the device through a partner workflow for agreed diagnostics, repair and quality checks.</p><ul className="mt-7 space-y-3 border-t border-white/10 pt-6 text-[12px] text-[#ece5de]">{["Clear parts-and-labour context", "Quality check before dispatch", "Useful for devices needing attention"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#e8a16f]" />{item}</li>)}</ul></article>
        </div>

        <div className="mt-5 rounded-[26px] border border-[#e4dbd2] bg-[#f4efe9] p-6 sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9b9087]">Illustrative refurbishment context</p><h3 className="mt-2 text-lg font-semibold text-[#302b27]">See the difference before choosing.</h3></div><div className="flex rounded-xl border border-[#ded3c9] bg-white p-1">{(Object.keys(examples) as Array<keyof typeof examples>).map((key) => <button key={key} onClick={() => setActive(key)} className={`rounded-lg px-3 py-2 text-[10px] font-bold transition ${active === key ? "bg-[#26231f] text-white" : "text-[#776d65] hover:text-[#26231f]"}`}>{key}</button>)}</div></div><div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-white p-4"><p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#a0958b]">Device</p><p className="mt-2 text-[13px] font-bold text-[#342f2a]">{selected.name}</p></div><div className="rounded-2xl bg-white p-4"><p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#a0958b]">As-Is reference</p><p className="mt-2 text-[13px] font-bold text-[#342f2a]">{formatINR(selected.asIs)}</p></div><div className="rounded-2xl border border-[#ead9ce] bg-[#fffaf6] p-4"><p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#b55a32]">Refurbished reference</p><p className="mt-2 text-[13px] font-bold text-[#342f2a]">{formatINR(selected.refurbished)}</p><p className="mt-1 text-[10px] text-[#756b63]">{selected.work}</p></div></div></div>
      </div>
    </section>
  );
}
