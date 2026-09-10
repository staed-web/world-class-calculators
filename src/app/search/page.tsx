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
      <h1 className="text-3xl font-bold text-foreground">Search</h1>
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
          <div className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted">
              No calculators match “{q}”. Try a shorter keyword, or browse categories.
            </p>
            <Link
              href="/#categories"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand hover:underline"
            >
              Browse categories →
            </Link>
          </div>
        )
      ) : (
        <p className="text-muted mt-6 text-sm">
          Type a keyword to search the catalog (mortgage, BMI, SIP, tip…).
        </p>
      )}
    </div>
  );
}
