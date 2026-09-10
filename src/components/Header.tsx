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
            src="/logo-v2.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 rounded-xl object-cover shadow-sm ring-1 ring-teal-500/20 transition group-hover:scale-105 group-hover:ring-teal-400/40"
            priority
          />
          <span className="hidden min-[380px]:inline">
            <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent dark:from-teal-300 dark:to-indigo-300">
              MyCalcs
            </span>
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
        <CurrencyPicker compact className="shrink-0 ml-auto md:ml-0" />
        <ThemeToggle />
      </div>

      {/* Mobile quick links — visible when desktop nav is hidden */}
      <div className="lg:hidden border-t border-border/60">
        <nav
          aria-label="Mobile"
          className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-1.5 text-xs font-medium text-muted"
        >
          <Link
            href="/#categories"
            className="whitespace-nowrap rounded-full px-2.5 py-1 hover:bg-card hover:text-brand"
          >
            Categories
          </Link>
          <Link
            href="/calculators/finance/loan-emi"
            className="whitespace-nowrap rounded-full px-2.5 py-1 hover:bg-card hover:text-brand"
          >
            EMI
          </Link>
          <Link
            href="/calculators/finance/currency-converter"
            className="whitespace-nowrap rounded-full px-2.5 py-1 hover:bg-card hover:text-brand"
          >
            FX
          </Link>
          <Link
            href="/calculators/finance/daily-compound-interest"
            className="whitespace-nowrap rounded-full px-2.5 py-1 hover:bg-card hover:text-brand"
          >
            Daily compound
          </Link>
          <Link
            href="/about"
            className="whitespace-nowrap rounded-full px-2.5 py-1 hover:bg-card hover:text-brand"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full px-2.5 py-1 hover:bg-card hover:text-brand"
          >
            Contact
          </Link>
        </nav>
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
