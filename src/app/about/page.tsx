import type { Metadata } from "next";
import { calculatorCount } from "@/lib/calculators/registry";

export const metadata: Metadata = {
  title: "About",
  description: "About MyCalcsWorld — mission, scope, and how the site works.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 prose prose-slate">
      <h1 className="text-3xl font-bold text-slate-900">About</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        MyCalcsWorld is a free online hub of {calculatorCount} working
        calculators spanning finance, math, health & fitness, unit conversion, dates,
        everyday life, science & engineering, business, education, and statistics.
      </p>
      <p className="mt-4 text-slate-600 leading-relaxed">
        We aim for the clarity of top calculator destinations — large catalog, fast UX,
        and trustworthy formulas — while keeping everything client-side so your inputs
        never need to leave the browser for core calculations.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-slate-900">What this site is</h2>
      <ul className="mt-2 list-disc pl-5 text-slate-600 space-y-1">
        <li>A polished hub with search, categories, and SEO-friendly pages</li>
        <li>A growing seed suite of real calculators (not stubs)</li>
        <li>An extension-friendly registry so new tools are easy to add</li>
      </ul>
      <h2 className="mt-8 text-xl font-semibold text-slate-900">What this site is not</h2>
      <p className="mt-2 text-slate-600 leading-relaxed">
        We do not claim to include every calculator on earth. Professional advice,
        live market data feeds, and regulated financial products are out of scope.
        Currency rates on this site are illustrative snapshots.
      </p>
    </div>
  );
}
