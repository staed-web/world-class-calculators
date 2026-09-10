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
  for (const c of getCalculatorsByCategory(calc.category)) {
    if (seen.has(c.slug)) continue;
    padded.push(c);
    seen.add(c.slug);
    if (padded.length >= 6) break;
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      {seo?.faqs && seo.faqs.length > 0 && (
        <FaqJsonLd faqs={seo.faqs} pageUrl={pageUrl} name={calc.name} />
      )}

      <nav className="mb-4 text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/categories/${calc.category}`} className="hover:text-brand">
          {cat?.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{calc.name}</span>
      </nav>

      <div className="mb-5 sm:mb-6">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${cat?.color ?? ""}`}
        >
          {cat?.icon} {cat?.name}
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {calc.name}
        </h1>
        <p className="mt-2 max-w-2xl text-muted text-sm sm:text-base">
          {seo?.seoDescription || calc.description}
        </p>
        <TrustStrip />
      </div>

      {/* Above-the-fold banner — single, not stacked */}
      <AdSlot placement="header" className="mb-6 no-print" />

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          {renderCalc(calc)}
          {/* High-viewability in-content after results — content guide follows so FAQs aren't buried under ads */}
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
              href="mailto:hello@mycalcsworld.online"
              className="text-brand hover:underline"
            >
              hello@mycalcsworld.online
            </a>
          </p>
        </div>
        <aside className="hidden lg:block space-y-4 no-print">
          <AdSlot placement="sidebar" />
          {related.length > 0 && (
            <div className="rounded-2xl surface-card p-4 sticky top-[28rem]">
              <h2 className="mb-3 text-sm font-semibold text-foreground">Related tools</h2>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={calculatorPath(r)}
                      className="block rounded-xl border border-border bg-background px-3 py-2 text-sm hover:border-brand transition"
                    >
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-10 sm:mt-12 no-print">
          <h2 className="mb-4 text-xl font-bold text-foreground">You might also like</h2>
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
