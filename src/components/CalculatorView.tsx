import Link from "next/link";
import type { CalculatorMeta } from "@/lib/types";
import { categoryMap } from "@/lib/categories";
import { getCalculatorBySlug, calculatorPath } from "@/lib/calculators/registry";
import { CalculatorForm } from "./CalculatorForm";
import { ScientificCalculator } from "./ScientificCalculator";
import { LiveCommoditiesCalculator } from "./LiveCommoditiesCalculator";
import { AdSlot } from "./AdSlot";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { CalculatorCard } from "./CalculatorCard";

export function CalculatorView({ calc }: { calc: CalculatorMeta }) {
  const cat = categoryMap[calc.category];
  const related = (calc.related ?? [])
    .map((slug) => getCalculatorBySlug(slug))
    .filter(Boolean) as CalculatorMeta[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-teal-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/categories/${calc.category}`} className="hover:text-teal-700">
          {cat?.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{calc.name}</span>
      </nav>

      <div className="mb-6">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${cat?.color ?? ""}`}
        >
          {cat?.icon} {cat?.name}
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          {calc.name}
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">{calc.description}</p>
      </div>

      <AdSlot placement="header" className="mb-6" />

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          {calc.kind === "custom" && calc.customKey === "scientific" ? (
            <ScientificCalculator />
          ) : calc.kind === "custom" && calc.customKey === "commodities-spot" ? (
            <LiveCommoditiesCalculator mode="spot" />
          ) : calc.kind === "custom" && calc.customKey === "commodities-metal-value" ? (
            <LiveCommoditiesCalculator mode="metal-value" />
          ) : calc.kind === "custom" && calc.customKey === "commodities-jewelry-melt" ? (
            <LiveCommoditiesCalculator mode="jewelry-melt" />
          ) : calc.kind === "custom" && calc.customKey === "commodities-unit" ? (
            <LiveCommoditiesCalculator mode="commodity-unit" />
          ) : (
            <CalculatorForm category={calc.category} slug={calc.slug} />
          )}
          <AdSlot placement="in-content" />
          <DisclaimerBanner />
        </div>
        <aside className="space-y-4">
          <AdSlot placement="sidebar" />
          {related.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-slate-700">Related</h2>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={calculatorPath(r)}
                      className="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:border-teal-300"
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
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold">You might also like</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((r) => (
              <CalculatorCard key={r.slug} calc={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
