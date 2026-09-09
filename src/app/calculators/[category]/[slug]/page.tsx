import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCalculators, getCalculator } from "@/lib/calculators/registry";
import { CalculatorView } from "@/components/CalculatorView";

export function generateStaticParams() {
  return allCalculators.map((c) => ({
    category: c.category,
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const calc = getCalculator(category, slug);
  if (!calc) return { title: "Calculator" };
  return {
    title: calc.name,
    description: calc.description,
    keywords: calc.keywords,
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const calc = getCalculator(category, slug);
  if (!calc) notFound();
  return <CalculatorView calc={calc} />;
}
