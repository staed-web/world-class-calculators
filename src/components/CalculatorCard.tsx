import Link from "next/link";
import type { CalculatorMeta } from "@/lib/types";
import { categoryMap } from "@/lib/categories";
import { calculatorPath } from "@/lib/calculators/registry";
import { CategoryIcon } from "./CategoryIcon";

export function CalculatorCard({ calc }: { calc: CalculatorMeta }) {
  const cat = categoryMap[calc.category];
  return (
    <Link
      href={calculatorPath(calc)}
      className="group relative flex flex-col overflow-hidden rounded-xl surface-card p-5 transition duration-200 hover:border-[color-mix(in_oklab,var(--accent)_30%,var(--border))] hover:shadow-md"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-[var(--accent)] opacity-0 transition group-hover:opacity-100" />
      <span
        className={`mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cat?.color ?? ""}`}
      >
        {cat?.icon ? <CategoryIcon icon={cat.icon} size="sm" /> : null}
        {cat?.name}
      </span>
      <h3 className="font-serif font-semibold tracking-tight text-foreground group-hover:text-[var(--accent)]">
        {calc.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{calc.description}</p>
    </Link>
  );
}
