import Link from "next/link";
import type { CalculatorMeta } from "@/lib/types";
import { categoryMap } from "@/lib/categories";
import {
  getCalculatorBySlug,
  calculatorPath,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";
import { getCalculatorSeoContent } from "@/lib/seo/calculatorContent";
import { CalculatorForm } from "./CalculatorForm";
import { ScientificCalculator } from "./ScientificCalculator";
import { LiveCommoditiesCalculator } from "./LiveCommoditiesCalculator";
import { LiveCurrencyConverter } from "./LiveCurrencyConverter";
import { AdSlot } from "./AdSlot";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { CalculatorCard } from "./CalculatorCard";
import {
  CalculatorGuide,
  FaqJsonLd,
  TrustStrip,
} from "./seo/CalculatorGuide";
import { TrackRecentCalculator } from "./TrackRecentCalculator";
import { FavoriteButton } from "./FavoriteButton";
import { CONTACT_EMAIL, contactMailto } from "@/lib/site";
import {
  Function3DCalculator,
  Pythagoras3DCalculator,
  Sphere3DCalculator,
  Cylinder3DCalculator,
  Compound3DCalculator,
} from "./viz/CustomVizCalculators";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mycalcsworld.online";

function relatedFor(calc: CalculatorMeta): CalculatorMeta[] {
  const fromMeta = (calc.related ?? [])
    .map((slug) => getCalculatorBySlug(slug))
    .filter(Boolean) as CalculatorMeta[];
  const seen = new Set(fromMeta.map((c) => c.slug));
  seen.add(calc.slug);
  const padded = [...fromMeta];

  const keys = new Set(
    [calc.slug, ...calc.keywords, calc.name]
      .join(" ")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2)
  );

  const scored = getCalculatorsByCategory(calc.category)
    .filter((c) => !seen.has(c.slug))
    .map((c) => {
      const hay = [c.slug, c.name, ...c.keywords].join(" ").toLowerCase();
      let score = 0;
      for (const k of keys) {
        if (hay.includes(k)) score += 1;
      }
      if (c.popular || c.featured) score += 0.5;
      return { c, score };
    })
    .sort((a, b) => b.score - a.score);

  for (const { c } of scored) {
    if (seen.has(c.slug)) continue;
    padded.push(c);
    seen.add(c.slug);
    if (padded.length >= 8) break;
  }
  return padded.slice(0, 8);
}

function renderCalc(calc: CalculatorMeta) {
  if (calc.kind === "custom") {
    switch (calc.customKey) {
      case "scientific":
        return <ScientificCalculator />;
      case "commodities-spot":
        return <LiveCommoditiesCalculator mode="spot" />;
      case "commodities-metal-value":
        return <LiveCommoditiesCalculator mode="metal-value" />;
      case "commodities-jewelry-melt":
        return <LiveCommoditiesCalculator mode="jewelry-melt" />;
      case "commodities-unit":
        return <LiveCommoditiesCalculator mode="commodity-unit" />;
      case "currency-live":
        return <LiveCurrencyConverter />;
      case "3d-function":
        return <Function3DCalculator />;
      case "pythagoras-3d":
        return <Pythagoras3DCalculator />;
      case "sphere-3d":
        return <Sphere3DCalculator />;
      case "cylinder-3d":
        return <Cylinder3DCalculator />;
      case "compound-3d":
        return <Compound3DCalculator />;
      default:
        break;
    }
  }
  return <CalculatorForm category={calc.category} slug={calc.slug} />;
}

export function CalculatorView({ calc }: { calc: CalculatorMeta }) {
  const cat = categoryMap[calc.category];
  const related = relatedFor(calc);
  const seo = getCalculatorSeoContent(calc.slug);
  const pageUrl = `${siteUrl}${calculatorPath(calc)}`;
  const href = calculatorPath(calc);

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-4 py-5 sm:py-8 min-w-0 w-full overflow-x-clip">
      <TrackRecentCalculator
        slug={calc.slug}
        category={calc.category}
        name={calc.name}
        href={href}
      />
      {seo?.faqs && seo.faqs.length > 0 && (
        <FaqJsonLd faqs={seo.faqs} pageUrl={pageUrl} name={calc.name} />
      )}

      <nav className="mb-4 text-sm text-muted overflow-x-auto" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-1">
          <li>
            <Link href="/" className="hover:text-brand">
              Home
            </Link>
          </li>
          <li aria-hidden className="px-1">/</li>
          <li>
            <Link href={`/categories/${calc.category}`} className="hover:text-brand">
              {cat?.name}
            </Link>
          </li>
          <li aria-hidden className="px-1">/</li>
          <li className="text-foreground">{calc.name}</li>
        </ol>
      </nav>

      <div className="mb-5 sm:mb-6">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${cat?.color ?? ""}`}
        >
          {cat?.icon} {cat?.name}
        </span>
        <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-balance">
          {calc.name}
        </h1>
        <p className="mt-2 max-w-3xl text-muted text-sm sm:text-base leading-relaxed">
          {seo?.seoDescription || calc.description}
        </p>
        <TrustStrip />
        <div className="mt-3 flex flex-wrap items-center gap-2 no-print">
          <FavoriteButton
            slug={calc.slug}
            category={calc.category}
            name={calc.name}
            href={href}
          />
        </div>
        {seo && (
          <div
            className="mt-4 flex flex-wrap gap-2 no-print"
            aria-label="Page shortcuts"
          >
            <a
              href="#calculator-guide"
              className="inline-flex min-h-10 items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-2 text-xs font-semibold text-brand hover:bg-brand/10 transition"
            >
              Guide & FAQ ↓
            </a>
            <a
              href="#guide-when"
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-muted hover:border-brand hover:text-brand transition"
            >
              When to use
            </a>
            <a
              href="#guide-example"
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-muted hover:border-brand hover:text-brand transition"
            >
              Example
            </a>
            <a
              href="#guide-mistakes"
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-muted hover:border-brand hover:text-brand transition"
            >
              Mistakes
            </a>
            <a
              href="#guide-formula"
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-muted hover:border-brand hover:text-brand transition"
            >
              Formula
            </a>
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-4 min-w-0">
        <div className="lg:col-span-3 space-y-8 min-w-0">
          {renderCalc(calc)}
          <AdSlot placement="header" className="no-print" />
          <AdSlot placement="in-content" className="no-print" />
          {seo && (
            <CalculatorGuide
              content={seo}
              formulaNote={calc.formulaNote || seo.formulaNote}
            />
          )}
          <DisclaimerBanner />
          <p className="text-xs text-muted">
            Questions about this tool?{" "}
            <Link href="/contact" className="text-brand hover:underline">
              Contact MyCalcsWorld
            </Link>{" "}
            ·{" "}
            <a
              href={contactMailto(`Question about ${calc.name}`)}
              className="text-brand hover:underline break-all"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <aside className="hidden lg:block space-y-4 no-print">
          <AdSlot placement="sidebar" />
          {related.length > 0 && (
            <div className="rounded-xl surface-card p-4 sticky top-28">
              <h2 className="mb-3 font-serif text-sm font-semibold text-foreground">
                Related tools
              </h2>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={calculatorPath(r)}
                      className="block rounded-xl border border-border bg-background px-3 py-2.5 text-sm hover:border-brand transition min-h-11"
                    >
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href="#calculator-guide"
                className="mt-4 block text-center text-xs font-semibold text-brand hover:underline"
              >
                Guide & FAQ on this page ↓
              </a>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile related rail (desktop has sidebar) */}
      {related.length > 0 && (
        <section className="mt-8 lg:hidden no-print" aria-label="Related tools">
          <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">Related tools</h2>
          <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch]">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={calculatorPath(r)}
                className="shrink-0 inline-flex min-h-11 items-center rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium hover:border-brand"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10 sm:mt-12 no-print">
          <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
            You might also like
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 6).map((r) => (
              <CalculatorCard key={r.slug} calc={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
