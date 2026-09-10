import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { CalculatorCard } from "@/components/CalculatorCard";
import { searchCalculators } from "@/lib/calculators/registry";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Search Calculators",
  description: "Find the right calculator by name or keyword on MyCalcsWorld.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = q ? searchCalculators(q) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-serif text-3xl font-semibold text-foreground">Search</h1>
      <div className="mt-4 max-w-xl">
        <SearchBar initialQuery={q} autofocus />
      </div>
      <AdSlot placement="header" className="my-6" />
      {q ? (
        results.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-muted">
              {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((c) => (
                <CalculatorCard key={`${c.category}/${c.slug}`} calc={c} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-base font-semibold text-foreground">
              No calculators match “{q}”
            </p>
            <p className="mt-2 text-sm text-muted max-w-md mx-auto">
              Try a shorter keyword (emi, bmi, tip, sip), check spelling, or pick a
              popular tool below.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {[
                ["Mortgage", "/calculators/finance/mortgage"],
                ["EMI", "/calculators/finance/loan-emi"],
                ["SIP", "/calculators/finance/sip"],
                ["BMI", "/calculators/health-fitness/bmi"],
                ["FX", "/calculators/finance/currency-converter"],
                ["Tip", "/calculators/finance/tip"],
                ["Scientific", "/calculators/math/scientific"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium hover:border-brand hover:text-brand"
                >
                  {label}
                </Link>
              ))}
            </div>
            <Link
              href="/#categories"
              className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-brand hover:underline"
            >
              Browse all categories →
            </Link>
          </div>
        )
      ) : (
        <div className="mt-6 space-y-4">
          <p className="text-muted text-sm">
            Type a keyword to search the catalog (mortgage, BMI, SIP, tip…).
          </p>
          <div className="flex flex-wrap gap-2">
            {["mortgage", "emi", "sip", "bmi", "tip", "compound interest", "gpa"].map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted hover:border-brand hover:text-brand"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
