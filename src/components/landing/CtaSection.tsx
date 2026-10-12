import { ArrowRight, PackagePlus, ShieldCheck } from "lucide-react";

export function CtaSection() {
  return (
    <section id="sell-cta" className="bg-[#faf8f4] py-24">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="overflow-hidden rounded-[30px] bg-[#26231f] px-7 py-10 text-white sm:px-12 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e8a16f]">Have a device to pass on?</p><h2 className="mt-4 max-w-lg text-[38px] font-medium leading-[1.05] tracking-[-0.05em] sm:text-[50px]">Make its next listing as honest as its last chapter.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-[#cac1b9]">The future seller flow will guide you through the details people actually need when they are buying used tech.</p></div>
            <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/5 p-5"><PackagePlus className="h-5 w-5 text-[#e8a16f]" /><p className="mt-6 text-[12px] font-bold">List with clarity</p><p className="mt-1 text-[11px] leading-5 text-[#c7bdb5]">Capture the condition, specs, and supporting photos in one place.</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-5"><ShieldCheck className="h-5 w-5 text-[#e8a16f]" /><p className="mt-6 text-[12px] font-bold">Give buyers confidence</p><p className="mt-1 text-[11px] leading-5 text-[#c7bdb5]">Set expectations early with practical condition context.</p></div></div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6"><a href="#featured" className="inline-flex items-center gap-2 rounded-xl bg-[#d96532] px-5 py-3 text-[12px] font-bold text-white transition hover:bg-[#e07645]">Browse example listings <ArrowRight className="h-4 w-4" /></a></div>
        </div>
      </div>
    </section>
  );
}
