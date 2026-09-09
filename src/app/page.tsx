import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CalculatorCard } from "@/components/CalculatorCard";
import { AdSlot } from "@/components/AdSlot";
import {
  calculatorCount,
  getFeaturedCalculators,
  getPopularCalculators,
} from "@/lib/calculators/registry";

export default function HomePage() {
  const featured = getFeaturedCalculators().slice(0, 6);
  const popular = getPopularCalculators().slice(0, 9);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-100">
            {calculatorCount} free calculators
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            World-class calculators for money, math, health & everyday life
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-teal-50">
            Fast, accurate, mobile-friendly tools — inspired by the best calculator
            hubs on the web. No signup. Results stay in your browser.
          </p>
          <div className="mt-8 max-w-xl">
            <SearchBar size="lg" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {["mortgage", "bmi", "compound-interest", "tip", "temperature"].map(
              (slug) => (
                <Link
                  key={slug}
                  href={`/search?q=${slug}`}
                  className="rounded-full bg-white/15 px-3 py-1 hover:bg-white/25"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-14">
        <AdSlot placement="header" />

        <section id="categories">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Browse by category</h2>
              <p className="text-slate-500 text-sm mt-1">
                Ten categories covering finance through statistics.
              </p>
            </div>
          </div>
          <CategoryGrid />
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-bold text-slate-900">Featured</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CalculatorCard key={`${c.category}/${c.slug}`} calc={c} />
            ))}
          </div>
        </section>

        <AdSlot placement="in-content" />

        <section>
          <h2 className="mb-5 text-2xl font-bold text-slate-900">Popular</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => (
              <CalculatorCard key={`${c.category}/${c.slug}`} calc={c} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
