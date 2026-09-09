import Link from "next/link";
import { categories } from "@/lib/categories";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur" style={{ background: "var(--header)" }}>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="shrink-0 font-bold text-brand text-lg tracking-tight">
          MyCalcs<span className="text-foreground">World</span>
        </Link>
        <div className="hidden flex-1 md:block max-w-md ml-auto">
          <SearchBar showShortcut />
        </div>
        <nav className="hidden lg:flex items-center gap-3 text-sm font-medium text-muted">
          <Link href="/#categories" className="hover:text-brand">
            Categories
          </Link>
          <Link href="/about" className="hover:text-brand">
            About
          </Link>
        </nav>
        <ThemeToggle />
      </div>
      <div className="border-t border-border/70 overflow-x-auto" style={{ background: "color-mix(in oklab, var(--background) 70%, transparent)" }}>
        <div className="mx-auto flex max-w-6xl gap-1 px-4 py-2 text-xs font-medium text-muted">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="whitespace-nowrap rounded-full px-3 py-1 hover:bg-card hover:text-brand hover:shadow-sm transition"
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
