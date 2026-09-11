import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import {
  allCalculators,
  calculatorCount,
  calculatorPath,
  getFeaturedCalculators,
  getPopularCalculators,
} from "@/lib/calculators/registry";
import { CalculatorCard } from "@/components/CalculatorCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import { SearchBar } from "@/components/SearchBar";
import { AdSlot } from "@/components/AdSlot";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Calculators — Browse 280+ Free Tools",
  description:
    "Browse every MyCalcsWorld calculator by category — finance, math, health, conversion, and more. Free tools with guides, FAQs, and charts. No signup.",
  alternates: { canonical: `${SITE_URL}/calculators` },
  openGraph: {
    title: "All Calculators | MyCalcsWorld",
    description:
      "Browse 280+ free calculators with guides and FAQs — mortgage, EMI, BMI, currency, and more.",
    url: `${SITE_URL}/calculators`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/logo-mark-lg.png", width: 256, height: 256, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary",
    title: "All Calculators | MyCalcsWorld",
    description: "Browse 280+ free calculators with guides and FAQs.",
    images: ["/logo-mark-lg.png"],
  },
};

export default function CalculatorsHubPage() {
  const featured = getFeaturedCalculators().slice(0, 9);
  const popular = getPopularCalculators().slice(0, 12);
  const byCategory = categories.map((cat) => ({
    cat,
    tools: allCalculators
      .filter((c) => c.category === cat.slug)
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-10 min-w-0 overflow-x-clip">
      <nav className="mb-4 text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Calculators</span>
      </nav>

      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        All calculators
      </h1>
      <p className="mt-3 max-w-3xl text-muted leading-relaxed">
        {calculatorCount}+ free MyCalcsWorld tools with how-to steps, worked examples,
        formula notes, and FAQs on every page. Pick a category or search.
      </p>

      <div className="mt-6 max-w-xl">
        <SearchBar />
      </div>

      <div className="mt-6 flex flex-wrap gap-2" aria-label="Jump to category">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`#cat-${c.slug}`}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted hover:border-brand hover:text-brand"
          >
            <CategoryIcon icon={c.icon} size="sm" />
            {c.name}
          </a>
        ))}
      </div>

      <AdSlot placement="header" className="mt-8 no-print" />

      {featured.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-xl font-semibold text-foreground">Featured</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CalculatorCard key={c.slug} calc={c} />
            ))}
          </div>
        </section>
      )}

      {popular.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-xl font-semibold text-foreground">Popular</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => (
              <CalculatorCard key={c.slug} calc={c} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 space-y-12">
        {byCategory.map(({ cat, tools }) => (
          <div key={cat.slug} id={`cat-${cat.slug}`} className="scroll-mt-28">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground inline-flex items-center gap-2">
                  <CategoryIcon icon={cat.icon} size="md" />
                  {cat.name}
                </h2>
                <p className="mt-1 text-sm text-muted">{tools.length} tools</p>
              </div>
              <Link
                href={`/categories/${cat.slug}`}
                className="text-sm font-medium text-brand hover:underline"
              >
                Open category →
              </Link>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={calculatorPath(c)}
                    className="flex min-h-11 items-center rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground hover:border-brand transition"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
