import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCalculators, getCalculator, calculatorPath } from "@/lib/calculators/registry";
import { getCalculatorSeoContent } from "@/lib/seo/calculatorContent";
import { CalculatorView } from "@/components/CalculatorView";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
  const title = seo?.seoTitle || calc.name;
  const description = seo?.seoDescription || calc.description;
  const path = calculatorPath(calc);
  const canonical = `${SITE_URL}${path}`;
  const ogImage = {
    url: "/logo-mark-lg.png",
    width: 256,
    height: 256,
    alt: SITE_NAME,
  };

  return {
    title,
    description,
    keywords: calc.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      images: [ogImage],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [ogImage.url],
    },
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
