import Link from "next/link";
import { categories } from "@/lib/categories";
import { getCalculatorsByCategory } from "@/lib/calculators/registry";

export function CategoryGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => {
        const count = getCalculatorsByCategory(c.slug).length;
        return (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className={`rounded-2xl border p-4 transition hover:shadow-md hover:-translate-y-0.5 ${c.color}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="text-2xl mb-1">{c.icon}</div>
              <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-semibold dark:bg-black/20">
                {count}
              </span>
            </div>
            <div className="font-semibold">{c.name}</div>
            <div className="text-xs opacity-80 mt-1 line-clamp-2">{c.description}</div>
          </Link>
        );
      })}
    </div>
  );
}
