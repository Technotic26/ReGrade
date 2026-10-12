"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const grades = {
  A: { name: "Excellent", note: "Minimal visible wear", surface: "Clean screen and body", battery: "85% or above", use: "All reported checks pass" },
  B: { name: "Good", note: "Light everyday wear", surface: "Minor scratches or scuffs", battery: "80% or above", use: "All reported checks pass" },
  C: { name: "Used, clearly", note: "Noticeable cosmetic wear", surface: "Visible marks, intact display", battery: "May be below 80%", use: "Functional condition recorded" },
  D: { name: "Needs attention", note: "Defects disclosed upfront", surface: "Damage or heavy wear", battery: "May need replacement", use: "Best considered with refurbishment" },
} as const;

export function AiGradingExplainer() {
  const [selected, setSelected] = useState<keyof typeof grades>("A");
  const grade = grades[selected];

  return (
    <section id="ai-grading" className="bg-[#26231f] py-24 text-white">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e8a16f]">The ReGrade standard</p>
          <h2 className="mt-4 max-w-md text-[40px] font-medium leading-[1.06] tracking-[-0.045em] sm:text-[50px]">A grade should tell you something.</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#c8c0b9]">ReGrade is designed around clear condition language — not a single letter with no context. Compare the standard a listing is assessed against before you buy.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {(Object.keys(grades) as Array<keyof typeof grades>).map((key) => (
              <button key={key} onClick={() => setSelected(key)} className={`rounded-full border px-4 py-2 text-[11px] font-bold transition ${selected === key ? "border-[#d96532] bg-[#d96532] text-white" : "border-white/15 text-[#d1c8c0] hover:border-white/40"}`}>
                Grade {key}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[26px] bg-[#f7f2ec] p-6 text-[#26231f] sm:p-8">
          <div className="flex items-start justify-between gap-5 border-b border-[#e2d8ce] pb-7">
            <div className="flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d96532] text-2xl font-bold text-white">{selected}</span><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9b9087]">Condition grade</p><h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">{grade.name}</h3></div></div>
            <span className="rounded-full bg-[#ede5dd] px-3 py-1.5 text-[10px] font-bold text-[#6e655d]">{grade.note}</span>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[['Cosmetic condition', grade.surface], ['Battery health', grade.battery], ['Functionality', grade.use]].map(([label, value]) => <div key={label} className="rounded-2xl border border-[#e3d9cf] bg-white p-4"><p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#9b9087]">{label}</p><p className="mt-2 text-[12px] font-semibold leading-5 text-[#413b35]">{value}</p></div>)}
          </div>
          <div className="mt-6 flex items-center gap-2 text-[11px] text-[#766d65]"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f8e9e0] text-[#d96532]"><Check className="h-3 w-3" /></span> The final report will show the reasons behind the grade.</div>
        </div>
      </div>
    </section>
  );
}
