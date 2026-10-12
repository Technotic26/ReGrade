import { ClipboardCheck, IndianRupee, ScanLine, ShieldCheck } from "lucide-react";

const features = [
  { icon: ScanLine, title: "Condition, not guesswork", description: "Every future listing is designed to show the detail behind its grade." },
  { icon: IndianRupee, title: "Prices with context", description: "See a fair-price reference alongside the condition and age of a device." },
  { icon: ClipboardCheck, title: "Details that travel with it", description: "Specs, reported wear, and checks live together in one clear record." },
  { icon: ShieldCheck, title: "72 hours to inspect", description: "A more considered way to buy tech someone else has finished using." },
];

export function WhyReGradeStrip() {
  return (
    <section className="border-y border-[#e4dbd2] bg-white py-5">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-[#e9e1d9] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3 px-3 py-5 sm:px-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8e9e0] text-[#d96532]"><Icon className="h-4 w-4" /></span>
              <div><h2 className="text-[12px] font-bold text-[#302c28]">{title}</h2><p className="mt-1 text-[11px] leading-5 text-[#7a7169]">{description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
