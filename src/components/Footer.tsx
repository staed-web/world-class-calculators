import Link from "next/link";
import { categories } from "@/lib/categories";
import { calculatorCount } from "@/lib/calculators/registry";
import { AdSlot } from "./AdSlot";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <AdSlot placement="footer" className="mb-8 bg-slate-800 border-slate-700" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-white font-bold text-lg mb-2">World-Class Calculators</p>
            <p className="text-sm text-slate-400">
              A free hub of {calculatorCount}+ working calculators for finance, math,
              health, conversion, and everyday decisions.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">Categories</p>
            <ul className="space-y-1 text-sm">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="hover:text-teal-300">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">More</p>
            <ul className="space-y-1 text-sm">
              {categories.slice(6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="hover:text-teal-300">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">Legal</p>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/about" className="hover:text-teal-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-teal-300">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-teal-300">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} World-Class Calculators. Estimates only — not
          professional advice.
        </p>
      </div>
      <AdSlot placement="sticky-mobile" />
    </footer>
  );
}
