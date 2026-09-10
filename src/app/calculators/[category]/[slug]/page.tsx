import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCalculators, getCalculator } from "@/lib/calculators/registry";
import { getCalculatorSeoContent } from "@/lib/seo/calculatorContent";
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
  const seo = getCalculatorSeoContent(calc.slug);
  return {
    title: seo?.seoTitle || calc.name,
    description: seo?.seoDescription || calc.description,
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
