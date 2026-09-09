import Link from "next/link";
import { categories } from "@/lib/categories";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 font-bold text-teal-700 text-lg tracking-tight">
          World-Class<span className="text-slate-800"> Calculators</span>
        </Link>
        <div className="hidden flex-1 md:block max-w-md ml-auto">
          <SearchBar />
        </div>
        <nav className="hidden lg:flex items-center gap-3 text-sm font-medium text-slate-600">
          <Link href="/#categories" className="hover:text-teal-700">
            Categories
          </Link>
          <Link href="/about" className="hover:text-teal-700">
            About
          </Link>
        </nav>
      </div>
      <div className="border-t border-slate-100 bg-slate-50/80 overflow-x-auto">
        <div className="mx-auto flex max-w-6xl gap-1 px-4 py-2 text-xs font-medium text-slate-600">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="whitespace-nowrap rounded-full px-3 py-1 hover:bg-white hover:text-teal-700 hover:shadow-sm transition"
            >
              {c.icon} {c.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>
    </header>
  );
}
