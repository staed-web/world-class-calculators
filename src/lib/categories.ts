import type { CategoryMeta, CategorySlug } from "./types";

export const categories: CategoryMeta[] = [
  {
    slug: "finance",
    name: "Finance",
    description:
      "Mortgage & EMI payments, daily/compound interest, SIP growth, taxes, savings, retirement, APR vs APY, and multi-currency money tools — each with guides, worked examples, and FAQs.",
    icon: "💰",
    color: "bg-[#e8f2ef] text-[#0d4f46] border-[#c5ddd7]",
  },
  {
    slug: "math",
    name: "Math",
    description:
      "Basic and scientific math, percentages, averages, algebra solvers, geometry (circle, Pythagoras), graphing, and showcase 3D tools — with formula notes you can check against homework.",
    icon: "∑",
    color: "bg-[#e8eef5] text-[#07234a] border-[#c5d0e0]",
  },
  {
    slug: "health-fitness",
    name: "Health & Fitness",
    description:
      "BMI, BMR, TDEE, macros, body fat, water intake, one-rep max, and pregnancy due-date tools using published educational formulas — not medical advice.",
    icon: "❤️",
    color: "bg-[#f5ebea] text-[#6b3a3a] border-[#e0cbc8]",
  },
  {
    slug: "conversion",
    name: "Conversion",
    description:
      "Length, weight, temperature, area, volume, speed, cooking, data, and time converters with clear SI / customary factors for school, travel, and DIY.",
    icon: "🔄",
    color: "bg-[#eaf1f5] text-[#1e3a4c] border-[#c8d7e0]",
  },
  {
    slug: "date-time",
    name: "Date & Time",
    description:
      "Date differences, age from date of birth, add/subtract days, and business-day helpers — leap years respected, holiday calendars usually manual.",
    icon: "📅",
    color: "bg-[#f5f0e6] text-[#5c4a28] border-[#e0d5bc]",
  },
  {
    slug: "everyday-life",
    name: "Everyday Life",
    description:
      "Tips, bill split, fuel cost, recipe scaling, DIY quantities, GPA helpers, and household planning calculators with practical defaults.",
    icon: "🏠",
    color: "bg-[#f3eee8] text-[#5a4030] border-[#ddd0c2]",
  },
  {
    slug: "science-engineering",
    name: "Science & Engineering",
    description:
      "Ohm’s law, kinetics, speed/distance/time, energy, and other textbook physics/engineering helpers with SI-friendly inputs for class and lab checks.",
    icon: "🔬",
    color: "bg-[#eeecf3] text-[#3a3558] border-[#d4d0e0]",
  },
  {
    slug: "business",
    name: "Business",
    description:
      "Margin vs markup, break-even, hourly-to-salary, ROI, and pricing helpers so founders can pressure-test ideas before a full spreadsheet model.",
    icon: "📊",
    color: "bg-[#e7f3f1] text-[#0d5c56] border-[#c5ddd7]",
  },
  {
    slug: "education",
    name: "Education",
    description:
      "Final grade needed, grade percentage, GPA-style helpers, and study-friendly math — match your syllabus weights before trusting a target score.",
    icon: "🎓",
    color: "bg-[#e8eef5] text-[#1e3a5f] border-[#c5d0e0]",
  },
  {
    slug: "statistics",
    name: "Statistics",
    description:
      "Mean, median, mode, standard deviation, combinations/permutations, and classical probability helpers for homework and quick exploratory checks.",
    icon: "📈",
    color: "bg-[#f0ecef] text-[#4a3548] border-[#d8cfd6]",
  },
  {
    slug: "commodities",
    name: "Commodities & Metals",
    description:
      "Live gold, silver, platinum, copper, and crude reference quotes plus weight, purity, and jewelry melt-value estimators — delayed educational feeds, not trade tickets.",
    icon: "🪙",
    color: "bg-[#f5f0e4] text-[#5c4a22] border-[#e0d4b0]",
  },
];

export const categoryMap: Record<CategorySlug, CategoryMeta> = Object.fromEntries(
  categories.map((c) => [c.slug, c])
) as Record<CategorySlug, CategoryMeta>;

export function getCategory(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}
