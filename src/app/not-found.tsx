import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import {
  calculatorPath,
  getCalculatorBySlug,
  getPopularCalculators,
} from "@/lib/calculators/registry";

const helpfulSlugs = [
  "mortgage",
  "loan-emi",
  "sip",
  "bmi",
  "currency-converter",
  "scientific",
  "tip",
  "daily-compound-interest",
] as const;

export default function NotFound() {
  const popular = getPopularCalculators().slice(0, 6);
  const helpful = helpfulSlugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
        404
      </p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
        We could not find that page
      </h1>
      <p className="mt-3 text-muted leading-relaxed">
        The link may be outdated, or the calculator moved. Search the catalog or
        jump to a popular tool below.
      </p>

      <div className="mt-8 max-w-xl">
        <SearchBar size="lg" autofocus />
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-lg font-semibold text-foreground">Helpful calculators</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {helpful.map((c) => (
            <li key={c.slug}>
              <Link
                href={calculatorPath(c)}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium hover:border-brand hover:text-brand"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {popular.length > 0 && (
        <div className="mt-8">
          <h2 className="font-serif text-lg font-semibold text-foreground">Popular right now</h2>
          <ul className="mt-3 space-y-2">
            {popular.map((c) => (
              <li key={c.slug}>
                <Link
                  href={calculatorPath(c)}
                  className="text-sm font-medium text-brand hover:underline"
                >
                  {c.name}
                </Link>
                <span className="text-muted text-sm"> — {c.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link href="/" className="font-semibold text-brand hover:underline">
          ← Home
        </Link>
        <Link href="/#categories" className="font-semibold text-brand hover:underline">
          Browse categories
        </Link>
        <Link href="/contact" className="font-semibold text-brand hover:underline">
          Contact
        </Link>
      </div>
    </div>
  );
}
