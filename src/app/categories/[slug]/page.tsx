import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategory } from "@/lib/categories";
import {
  getCalculatorsByCategory,
  calculatorPath,
} from "@/lib/calculators/registry";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { AdSlot } from "@/components/AdSlot";
import { CategoryDirectory } from "@/components/CategoryDirectory";
import { CategoryIcon } from "@/components/CategoryIcon";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Category" };
  const title = `${cat.name} Calculators`;
  const description = cat.description;
  const canonical = `${SITE_URL}/categories/${cat.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const calcs = getCalculatorsByCategory(slug);
  const items = calcs.map((c) => ({
    slug: c.slug,
    category: c.category,
    name: c.name,
    description: c.description,
    keywords: c.keywords,
    href: calculatorPath(c),
  }));

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8 min-w-0 overflow-x-clip">
      <nav className="mb-4 text-sm text-muted">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{cat.name}</span>
      </nav>
      <div className={`mb-6 inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm ${cat.color}`}>
        <CategoryIcon icon={cat.icon} size="md" />
        {cat.name}
      </div>
      <h1 className="font-serif text-3xl font-semibold text-foreground">{cat.name} Calculators</h1>
      <p className="mt-2 max-w-3xl text-muted leading-relaxed">{cat.description}</p>
      <p className="mt-2 text-sm text-muted">
        {calcs.length} tools in this category — each calculator page includes how-to steps,
        a worked example, formula notes, and FAQs (not just a bare form).
      </p>
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Other categories">
        {categories
          .filter((c) => c.slug !== cat.slug)
          .map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted hover:border-brand hover:text-brand"
            >
              <CategoryIcon icon={c.icon} size="sm" />
              {c.name}
            </Link>
          ))}
      </div>

      <AdSlot placement="header" className="my-6 no-print" />

      {calcs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
          No calculators in this category yet. Try search or another category from the home page.
        </div>
      ) : (
        <CategoryDirectory items={items} />
      )}
    </div>
  );
}
