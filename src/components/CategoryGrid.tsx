import Link from "next/link";
import { categories } from "@/lib/categories";
import { getCalculatorsByCategory } from "@/lib/calculators/registry";
import { CategoryIcon } from "./CategoryIcon";

export function CategoryGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => {
        const count = getCalculatorsByCategory(c.slug).length;
        return (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className={`rounded-xl border p-4 transition hover:shadow-md ${c.color}`}
          >
            <div className="flex items-start justify-between gap-2">
              <CategoryIcon icon={c.icon} size="lg" className="mb-2" />
              <span className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-[var(--accent)] dark:bg-black/25">
                {count}
              </span>
            </div>
            <div className="font-serif font-semibold">{c.name}</div>
            <div className="text-xs opacity-80 mt-1 line-clamp-2">{c.description}</div>
          </Link>
        );
      })}
    </div>
  );
}
