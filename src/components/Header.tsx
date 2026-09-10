import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/categories";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencyPicker } from "./CurrencyPicker";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border/80 backdrop-blur-xl"
      style={{ background: "var(--header)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2 sm:gap-3 px-4 py-2.5 sm:py-3">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 font-bold text-lg tracking-tight"
          aria-label="MyCalcsWorld home"
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl shadow-sm ring-1 ring-black/5 transition group-hover:scale-105"
            priority
          />
          <span className="hidden xs:inline sm:inline">
            <span className="text-brand">MyCalcs</span>
            <span className="text-foreground">World</span>
          </span>
        </Link>
        <div className="hidden flex-1 md:block max-w-md ml-auto">
          <SearchBar showShortcut />
        </div>
        <nav className="hidden lg:flex items-center gap-3 text-sm font-medium text-muted">
          <Link href="/#categories" className="hover:text-brand transition">
            Categories
          </Link>
          <Link href="/calculators/finance/currency-converter" className="hover:text-brand transition">
            FX
          </Link>
          <Link href="/calculators/math/3d-function" className="hover:text-brand transition">
            3D
          </Link>
          <Link href="/about" className="hover:text-brand transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-brand transition">
            Contact
          </Link>
        </nav>
        <CurrencyPicker compact className="shrink-0" />
        <ThemeToggle />
      </div>
      <div
        className="border-t border-border/70 overflow-x-auto"
        style={{ background: "color-mix(in oklab, var(--background) 70%, transparent)" }}
      >
        <div className="mx-auto flex max-w-6xl gap-1 px-4 py-2 text-xs font-medium text-muted">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="whitespace-nowrap rounded-full px-3 py-1 transition hover:bg-card hover:text-brand hover:shadow-sm"
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
