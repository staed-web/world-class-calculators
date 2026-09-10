import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CalculatorCard } from "@/components/CalculatorCard";
import { AdSlot } from "@/components/AdSlot";
import { HomeScientificWidget } from "@/components/HomeScientificWidget";
import {
  calculatorCount,
  getCalculatorBySlug,
  getFeaturedCalculators,
  getPopularCalculators,
  calculatorPath,
} from "@/lib/calculators/registry";
import { popularPlanningSlugs } from "@/lib/seo/calculatorContent";
import { RecentlyUsedCalculators } from "@/components/RecentlyUsedCalculators";

export default function HomePage() {
  const featured = getFeaturedCalculators().slice(0, 9);
  const popular = getPopularCalculators().slice(0, 12);
  const planningPopular = popularPlanningSlugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] ambient-mesh" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-[28rem] ambient-grid opacity-40" aria-hidden />

      <section
        className="relative overflow-hidden border-b border-border text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--hero-from), var(--hero-via) 45%, var(--hero-to))",
        }}
      >
        <div className="hero-orb -left-10 top-8 h-56 w-56 bg-teal-300/40" />
        <div className="hero-orb right-0 top-20 h-64 w-64 bg-indigo-400/35" style={{ animationDelay: "1.5s" }} />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_15%_20%,white,transparent_42%),radial-gradient(circle_at_85%_10%,#a5b4fc,transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="rise-in mb-5 flex items-center gap-3">
            <Image
              src="/logo-v2.png"
              alt="MyCalcsWorld"
              width={56}
              height={56}
              className="h-14 w-14 rounded-2xl object-cover shadow-lg ring-2 ring-white/20"
              priority
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-100">
                MyCalcsWorld
              </p>
              <p className="text-xs text-teal-50/90">
                {calculatorCount}+ free calculators · live FX · charts · 3D math
              </p>
            </div>
          </div>
          <h1 className="rise-in max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
            Free calculators with real guides — built for everyone, worldwide.
          </h1>
          <p className="rise-in mt-5 max-w-2xl text-lg text-teal-50/95" style={{ animationDelay: "80ms" }}>
            Mortgage, EMI, daily compound interest, BMI, live FX, and{" "}
            {calculatorCount}+ guided tools — how-to steps, worked examples, formula
            notes, and FAQs on every page. Works great on phones, no signup. Search with{" "}
            <span className="font-semibold">⌘K</span> /{" "}
            <span className="font-semibold">Ctrl+K</span>.
          </p>
          <div className="rise-in mt-8 max-w-xl" style={{ animationDelay: "120ms" }}>
            <SearchBar size="lg" showShortcut />
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {[
              "mortgage",
              "currency converter",
              "sip growth",
              "bmi",
              "3d function",
              "amortization",
              "daily compound interest",
            ].map((q) => (
              <Link
                key={q}
                href={`/search?q=${encodeURIComponent(q)}`}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm transition hover:bg-white/25"
              >
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="relative mx-auto max-w-6xl px-4 py-10 space-y-14">
        <AdSlot placement="header" className="no-print" />

        <RecentlyUsedCalculators />

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Live FX & money", d: "Pick USD, EUR, GBP, INR, AED and more — results format in your currency." },
            { t: "Charts & schedules", d: "Amortization tables, SIP curves, daily-compound snapshots — in results when supported." },
            { t: `${calculatorCount}+ guided tools`, d: "Every calculator includes how-to, worked example, formula notes, and FAQs." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl surface-card glass-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <h2 className="font-semibold text-foreground">{x.t}</h2>
              <p className="mt-1 text-sm text-muted">{x.d}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Browse by category</h2>
              <p className="text-muted text-sm mt-1">
                Dense directories with counts — find tools in one tap.
              </p>
            </div>
            <div id="categories">
              <CategoryGrid />
            </div>
          </div>
          <HomeScientificWidget />
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Featured</h2>
            <Link href="/calculators/finance/currency-converter" className="text-sm font-medium text-brand hover:underline">
              Try live FX →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CalculatorCard key={`${c.category}/${c.slug}`} calc={c} />
            ))}
          </div>
        </section>

        <AdSlot placement="in-content" className="no-print" />

        <section>
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Popular planning tools</h2>
              <p className="text-sm text-muted mt-1">
                EMI, SIP, GST/VAT, live FX, gold — everyday money tools.
              </p>
            </div>
            <Link href="/calculators/finance/loan-emi" className="text-sm font-medium text-brand hover:underline shrink-0">
              EMI calculator →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {planningPopular.slice(0, 6).map((c) => (
              <CalculatorCard key={`${c.category}/${c.slug}`} calc={c} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {planningPopular.slice(6).map((c) => (
              <Link
                key={c.slug}
                href={calculatorPath(c)}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted hover:border-brand hover:text-brand"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-foreground">Popular</h2>
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
