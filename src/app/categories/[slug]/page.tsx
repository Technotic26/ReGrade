import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CATEGORIES_DATA, FEATURED_PRODUCTS } from "@/data/mock-landing-data";
import { formatINR } from "@/lib/utils";

export async function generateStaticParams() {
  return CATEGORIES_DATA.map(({ slug }) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES_DATA.find((item) => item.slug === slug);
  if (!category) notFound();
  const products = FEATURED_PRODUCTS.filter((product) => product.categorySlug === category.slug);

  return <div className="min-h-screen bg-[#faf8f4] text-[#26231f]"><Navbar /><main><section className="border-b border-[#e4dbd2] bg-[#f1ebe4]"><div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-12 lg:grid-cols-[1fr_.75fr] lg:items-center lg:px-8"><div><Link href="/browse" className="inline-flex items-center gap-2 text-[11px] font-bold text-[#756b63] transition hover:text-[#d96532]"><ArrowLeft className="h-3.5 w-3.5" />All Categories</Link><p className="mt-8 text-[10px] font-bold uppercase tracking-[0.17em] text-[#c95e2c]">{category.badgeText}</p><h1 className="mt-3 text-[42px] font-medium tracking-[-0.05em] sm:text-[56px]">{category.name}</h1><p className="mt-4 max-w-xl text-sm leading-7 text-[#716960]">{category.tagline}. ReGrade will tailor condition questions and inspection detail to this type of device.</p></div><div className="flex h-56 items-center justify-center rounded-[26px] bg-[#faf8f4] sm:h-64"><Image src={category.image} alt={category.name} width={240} height={240} unoptimized className="h-48 w-48 object-contain drop-shadow-[0_18px_20px_rgba(45,38,31,0.14)]" /></div></div></section><section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8"><div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9b9087]">Example listings</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Available to explore</h2>{products.length ? <div className="mt-7 grid gap-4 sm:grid-cols-2">{products.map((product) => <Link key={product.id} href={`/products/${product.id}`} className="overflow-hidden rounded-2xl border border-[#e4dbd2] bg-white transition hover:-translate-y-0.5 hover:border-[#d9b6a3]"><div className="flex h-48 items-center justify-center bg-[#f4efe9]"><Image src={product.image} alt={product.name} width={180} height={180} unoptimized className="h-36 w-36 object-contain" /></div><div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a0958b]">Grade {product.grade} · Trust {product.trustScore}/100</p><h3 className="mt-2 text-[16px] font-semibold">{product.name}</h3><p className="mt-3 text-[15px] font-bold">{formatINR(product.price)}</p></div></Link>)}</div> : <div className="mt-7 rounded-2xl border border-dashed border-[#d9cfc5] bg-white p-7"><p className="text-[14px] font-semibold">This category page is ready for its catalogue.</p><p className="mt-2 text-sm leading-6 text-[#716960]">Listings will appear here as sellers publish devices in this category.</p></div>}</div><aside className="rounded-[26px] bg-[#26231f] p-7 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#e8a16f]">What this page will show</p><ul className="mt-6 space-y-4 text-[12px] leading-6 text-[#ddd5ce]">{["Category-specific condition details", "Clear price and grade context", "An explainable Trust Score", "Available As-Is or Refurbished choices"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#e8a16f]" />{item}</li>)}</ul><Link href="/browse" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#d96532] px-4 py-3 text-[11px] font-bold transition hover:bg-[#e07645]">Browse All Devices <ArrowUpRight className="h-3.5 w-3.5" /></Link></aside></div></section></main><Footer /></div>;
}
