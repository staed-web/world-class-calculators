import Link from "next/link";
import type { CalculatorMeta } from "@/lib/types";
import { categoryMap } from "@/lib/categories";
import { calculatorPath } from "@/lib/calculators/registry";

export function CalculatorCard({ calc }: { calc: CalculatorMeta }) {
  const cat = categoryMap[calc.category];
  return (
    <Link
      href={calculatorPath(calc)}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
    >
      <span
        className={`mb-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium ${cat?.color ?? ""}`}
      >
        {cat?.icon} {cat?.name}
      </span>
      <h3 className="font-semibold text-slate-900 group-hover:text-teal-700">
        {calc.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-500">{calc.description}</p>
    </Link>
  );
}
