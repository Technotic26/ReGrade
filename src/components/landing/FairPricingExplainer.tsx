import { ArrowDown, CircleDollarSign, ReceiptText } from "lucide-react";
import { formatINR } from "@/lib/utils";

const examples = [
  { name: "iPhone 13", age: "14 months old", launch: 69900, price: 35999, grade: "Grade A" },
  { name: "MacBook Air M1", age: "2 years old", launch: 92900, price: 44500, grade: "Grade B" },
  { name: "PlayStation 5", age: "1 year old", launch: 44990, price: 31999, grade: "Grade A" },
];

export function FairPricingExplainer() {
  return (
    <section id="pricing-engine" className="bg-[#f1ebe4] py-24">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c95e2c]">Fair pricing, in plain view</p>
            <h2 className="mt-4 max-w-md text-[40px] font-medium leading-[1.05] tracking-[-0.05em] text-[#26231f] sm:text-[50px]">Less mystery around the number.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#716960]">A price is easier to understand when the original cost, device age, and condition sit beside it. That is the context ReGrade is designed to show.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[{ icon: ReceiptText, title: "Starting point", text: "Original Indian launch price" }, { icon: ArrowDown, title: "Time in use", text: "Age and category depreciation" }, { icon: CircleDollarSign, title: "Condition", text: "Grade, battery and reported wear" }].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-[#e1d6cb] bg-[#faf8f4] p-5"><Icon className="h-5 w-5 text-[#d96532]" /><h3 className="mt-5 text-[12px] font-bold text-[#39332d]">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#7b7168]">{text}</p></div>)}
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[26px] border border-[#ded2c7] bg-[#fffdfa]">
          <div className="flex flex-col justify-between gap-2 border-b border-[#ebe1d7] px-6 py-5 sm:flex-row sm:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a0958b]">Sample fair-price references</p><p className="mt-1 text-[12px] text-[#6f665f]">Illustrative examples — not live market valuations.</p></div><span className="rounded-full bg-[#f8e9e0] px-3 py-1.5 text-[10px] font-bold text-[#b9552d]">All prices in INR</span></div>
          <div className="divide-y divide-[#eee5dc]">
            {examples.map((example) => <div key={example.name} className="grid gap-4 px-6 py-5 sm:grid-cols-[1.15fr_.8fr_.8fr_auto] sm:items-center"><div><h3 className="text-[14px] font-bold text-[#302b27]">{example.name}</h3><p className="mt-1 text-[11px] text-[#847a72]">{example.age} · {example.grade}</p></div><div><p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#aaa096]">Launch price</p><p className="mt-1 text-[12px] text-[#847a72] line-through">{formatINR(example.launch)}</p></div><div><p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#aaa096]">Reference</p><p className="mt-1 text-[14px] font-bold text-[#302b27]">{formatINR(example.price)}</p></div><span className="justify-self-start rounded-full border border-[#ead8cd] px-3 py-1.5 text-[10px] font-bold text-[#b9552d]">View breakdown</span></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
