import type { CategoryMeta, CategorySlug } from "./types";

export const categories: CategoryMeta[] = [
  {
    slug: "finance",
    name: "Finance",
    description:
      "Mortgage & EMI payments, daily/compound interest, SIP growth, taxes, savings, retirement, APR vs APY, and multi-currency money tools — each with guides, worked examples, and FAQs.",
    icon: "💰",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    slug: "math",
    name: "Math",
    description:
      "Basic and scientific math, percentages, averages, algebra solvers, geometry (circle, Pythagoras), graphing, and showcase 3D tools — with formula notes you can check against homework.",
    icon: "∑",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  {
    slug: "health-fitness",
    name: "Health & Fitness",
    description:
      "BMI, BMR, TDEE, macros, body fat, water intake, one-rep max, and pregnancy due-date tools using published educational formulas — not medical advice.",
    icon: "❤️",
    color: "bg-rose-100 text-rose-800 border-rose-200",
  },
  {
    slug: "conversion",
    name: "Conversion",
    description:
      "Length, weight, temperature, area, volume, speed, cooking, data, and time converters with clear SI / customary factors for school, travel, and DIY.",
    icon: "🔄",
    color: "bg-sky-100 text-sky-800 border-sky-200",
  },
  {
    slug: "date-time",
    name: "Date & Time",
    description:
      "Date differences, age from date of birth, add/subtract days, and business-day helpers — leap years respected, holiday calendars usually manual.",
    icon: "📅",
    color: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    slug: "everyday-life",
    name: "Everyday Life",
    description:
      "Tips, bill split, fuel cost, recipe scaling, DIY quantities, GPA helpers, and household planning calculators with practical defaults.",
    icon: "🏠",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    slug: "science-engineering",
    name: "Science & Engineering",
    description:
      "Ohm’s law, kinetics, speed/distance/time, energy, and other textbook physics/engineering helpers with SI-friendly inputs for class and lab checks.",
    icon: "🔬",
    color: "bg-violet-100 text-violet-800 border-violet-200",
  },
  {
    slug: "business",
    name: "Business",
    description:
      "Margin vs markup, break-even, hourly-to-salary, ROI, and pricing helpers so founders can pressure-test ideas before a full spreadsheet model.",
    icon: "📊",
    color: "bg-teal-100 text-teal-800 border-teal-200",
  },
  {
    slug: "education",
    name: "Education",
    description:
      "Final grade needed, grade percentage, GPA-style helpers, and study-friendly math — match your syllabus weights before trusting a target score.",
    icon: "🎓",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    slug: "statistics",
    name: "Statistics",
    description:
      "Mean, median, mode, standard deviation, combinations/permutations, and classical probability helpers for homework and quick exploratory checks.",
    icon: "📈",
    color: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  },
  {
    slug: "commodities",
    name: "Commodities & Metals",
    description:
      "Live gold, silver, platinum, copper, and crude reference quotes plus weight, purity, and jewelry melt-value estimators — delayed educational feeds, not trade tickets.",
    icon: "🪙",
    color: "bg-yellow-100 text-yellow-900 border-yellow-200",
  },
];

export const categoryMap: Record<CategorySlug, CategoryMeta> = Object.fromEntries(
  categories.map((c) => [c.slug, c])
) as Record<CategorySlug, CategoryMeta>;

export function getCategory(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}
