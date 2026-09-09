import type { CalculatorMeta, CategorySlug } from "../types";
import { financeCalculators } from "./finance";
import { mathCalculators } from "./math";
import { healthCalculators } from "./health";
import { conversionCalculators } from "./conversion";
import { dateTimeCalculators } from "./datetime";
import { everydayCalculators } from "./everyday";
import { businessCalculators } from "./business";
import { statisticsCalculators } from "./statistics";
import { scienceCalculators } from "./science";
import { educationCalculators } from "./education";
import { commoditiesCalculators } from "./commodities";

export const allCalculators: CalculatorMeta[] = [
  ...financeCalculators,
  ...mathCalculators,
  ...healthCalculators,
  ...conversionCalculators,
  ...dateTimeCalculators,
  ...everydayCalculators,
  ...businessCalculators,
  ...statisticsCalculators,
  ...scienceCalculators,
  ...educationCalculators,
  ...commoditiesCalculators,
];

const byKey = new Map(
  allCalculators.map((c) => [`${c.category}/${c.slug}`, c] as const)
);

const bySlug = new Map(allCalculators.map((c) => [c.slug, c]));

export function getCalculator(
  category: string,
  slug: string
): CalculatorMeta | undefined {
  return byKey.get(`${category}/${slug}` as `${CalculatorMeta["category"]}/${string}`);
}

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return bySlug.get(slug);
}

export function getCalculatorsByCategory(
  category: CategorySlug | string
): CalculatorMeta[] {
  return allCalculators.filter((c) => c.category === category);
}

export function getFeaturedCalculators(): CalculatorMeta[] {
  return allCalculators.filter((c) => c.featured);
}

export function getPopularCalculators(): CalculatorMeta[] {
  return allCalculators.filter((c) => c.popular);
}

export function searchCalculators(query: string): CalculatorMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allCalculators.filter((c) => {
    const hay = [c.name, c.description, c.slug, c.category, ...c.keywords]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function calculatorPath(c: CalculatorMeta): string {
  return `/calculators/${c.category}/${c.slug}`;
}

export const calculatorCount = allCalculators.length;
