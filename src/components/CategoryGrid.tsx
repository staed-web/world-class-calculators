import Link from "next/link";
import { categories } from "@/lib/categories";
import { getCalculatorsByCategory } from "@/lib/calculators/registry";

export function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {categories.map((c) => {
        const count = getCalculatorsByCategory(c.slug).length;
        return (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className={`rounded-2xl border p-4 transition hover:shadow-md ${c.color}`}
          >
            <div className="text-2xl mb-1">{c.icon}</div>
            <div className="font-semibold">{c.name}</div>
            <div className="text-xs opacity-80 mt-1">{count} calculators</div>
          </Link>
        );
      })}
    </div>
  );
}
