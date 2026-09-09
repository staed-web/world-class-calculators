import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategory } from "@/lib/categories";
import { getCalculatorsByCategory } from "@/lib/calculators/registry";
import { CalculatorCard } from "@/components/CalculatorCard";
import { AdSlot } from "@/components/AdSlot";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-teal-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{cat.name}</span>
      </nav>
      <div className={`mb-6 inline-flex rounded-2xl border px-4 py-2 text-sm ${cat.color}`}>
        {cat.icon} {cat.name}
      </div>
      <h1 className="text-3xl font-bold text-slate-900">{cat.name} Calculators</h1>
      <p className="mt-2 max-w-2xl text-slate-600">{cat.description}</p>
      <p className="mt-1 text-sm text-slate-400">{calcs.length} tools in this category</p>

      <AdSlot placement="header" className="my-6" />

      {calcs.length === 0 ? (
        <p className="text-slate-500">More calculators coming soon in this category.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calcs.map((c) => (
            <CalculatorCard key={c.slug} calc={c} />
          ))}
        </div>
      )}
    </div>
  );
}
