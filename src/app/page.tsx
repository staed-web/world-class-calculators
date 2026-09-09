import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CalculatorCard } from "@/components/CalculatorCard";
import { AdSlot } from "@/components/AdSlot";
import { HomeScientificWidget } from "@/components/HomeScientificWidget";
import {
  calculatorCount,
  getFeaturedCalculators,
  getPopularCalculators,
} from "@/lib/calculators/registry";

export default function HomePage() {
  const featured = getFeaturedCalculators().slice(0, 6);
  const popular = getPopularCalculators().slice(0, 12);

  return (
    <div>
      <section
        className="relative overflow-hidden border-b border-border text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--hero-from), var(--hero-via) 45%, var(--hero-to))",
        }}
      >
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_15%_20%,white,transparent_42%),radial-gradient(circle_at_85%_10%,#a5b4fc,transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-100">
            {calculatorCount}+ free calculators · mobile-first · dark mode
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Faster calculators. Clearer results. More tools than the ad-stuffed hubs.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-teal-50/95">
            Finance, math, health, construction, cooking, science, and conversions —
            accurate, keyboard-friendly, and print-ready. Search with{" "}
            <span className="font-semibold">⌘K</span> /{" "}
            <span className="font-semibold">Ctrl+K</span>.
          </p>
          <div className="mt-8 max-w-xl">
            <SearchBar size="lg" showShortcut />
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {["mortgage", "credit card payoff", "percentage", "bmi", "concrete", "ohm"].map(
              (q) => (
                <Link
                  key={q}
                  href={`/search?q=${encodeURIComponent(q)}`}
                  className="rounded-full bg-white/15 px-3 py-1 hover:bg-white/25"
                >
                  {q}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-14">
        <AdSlot placement="header" className="no-print" />

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Browse by category</h2>
                <p className="text-muted text-sm mt-1">
                  Dense directories with counts — find tools in one tap.
                </p>
              </div>
            </div>
            <div id="categories">
              <CategoryGrid />
            </div>
          </div>
          <HomeScientificWidget />
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-bold text-foreground">Featured</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CalculatorCard key={`${c.category}/${c.slug}`} calc={c} />
            ))}
          </div>
        </section>

        <AdSlot placement="in-content" className="no-print" />

        <section>
          <h2 className="mb-5 text-2xl font-bold text-foreground">Popular</h2>
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
