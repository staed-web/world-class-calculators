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
            className={`rounded-xl border p-4 transition hover:shadow-md ${c.color}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div
                aria-hidden
                className="mb-2 inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-current/15 bg-white/55 px-2 text-[11px] font-bold uppercase tracking-[0.12em] dark:bg-black/20"
              >
                {c.icon}
              </div>
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
