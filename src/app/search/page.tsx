import type { Metadata } from "next";
import { SearchBar } from "@/components/SearchBar";
import { CalculatorCard } from "@/components/CalculatorCard";
import { searchCalculators } from "@/lib/calculators/registry";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Search Calculators",
  description: "Find the right calculator by name or keyword.",
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
      <h1 className="text-3xl font-bold text-slate-900">Search</h1>
      <div className="mt-4 max-w-xl">
        <SearchBar initialQuery={q} autofocus />
      </div>
      <AdSlot placement="header" className="my-6" />
      {q ? (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((c) => (
              <CalculatorCard key={`${c.category}/${c.slug}`} calc={c} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-slate-500 mt-6">Type a keyword to search the catalog.</p>
      )}
    </div>
  );
}
