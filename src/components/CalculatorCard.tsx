import Link from "next/link";
import type { CalculatorMeta } from "@/lib/types";
import { categoryMap } from "@/lib/categories";
import { calculatorPath } from "@/lib/calculators/registry";

export function CalculatorCard({ calc }: { calc: CalculatorMeta }) {
  const cat = categoryMap[calc.category];
  return (
    <Link
      href={calculatorPath(calc)}
      className="group relative flex flex-col overflow-hidden rounded-2xl surface-card p-5 transition duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-lg"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-accent to-transparent opacity-0 transition group-hover:opacity-100" />
      <span
        className={`mb-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium ${cat?.color ?? ""}`}
      >
        {cat?.icon} {cat?.name}
      </span>
      <h3 className="font-semibold tracking-tight text-foreground group-hover:text-brand">
        {calc.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{calc.description}</p>
    </Link>
  );
}
