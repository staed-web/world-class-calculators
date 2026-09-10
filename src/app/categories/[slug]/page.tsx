import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategory } from "@/lib/categories";
import {
  getCalculatorsByCategory,
  calculatorPath,
} from "@/lib/calculators/registry";
import { AdSlot } from "@/components/AdSlot";
import { CategoryDirectory } from "@/components/CategoryDirectory";

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
  return {
    title: `${cat.name} Calculators`,
    description: cat.description,
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
      <div className={`mb-6 inline-flex rounded-2xl border px-4 py-2 text-sm ${cat.color}`}>
        {cat.icon} {cat.name}
      </div>
      <h1 className="text-3xl font-bold text-foreground">{cat.name} Calculators</h1>
      <p className="mt-2 max-w-3xl text-muted leading-relaxed">{cat.description}</p>
      <p className="mt-2 text-sm text-muted">
        {calcs.length} tools in this category — each calculator page includes how-to steps,
        a worked example, formula notes, and FAQs (not just a bare form).
      </p>

      <AdSlot placement="header" className="my-6 no-print" />

      {calcs.length === 0 ? (
        <p className="text-muted">More calculators coming soon in this category.</p>
      ) : (
        <CategoryDirectory items={items} />
      )}
    </div>
  );
}
