import type { CategoryMeta, CategorySlug } from "./types";

export const categories: CategoryMeta[] = [
  {
    slug: "finance",
    name: "Finance",
    description:
      "Mortgage, loans, interest, taxes, savings, retirement, and money tools.",
    icon: "💰",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    slug: "math",
    name: "Math",
    description:
      "Basic and scientific math, fractions, percentages, averages, and more.",
    icon: "∑",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  {
    slug: "health-fitness",
    name: "Health & Fitness",
    description: "BMI, BMR, calories, body fat, macros, and pregnancy tools.",
    icon: "❤️",
    color: "bg-rose-100 text-rose-800 border-rose-200",
  },
  {
    slug: "conversion",
    name: "Conversion",
    description:
      "Length, weight, temperature, area, volume, speed, data, and time.",
    icon: "🔄",
    color: "bg-sky-100 text-sky-800 border-sky-200",
  },
  {
    slug: "date-time",
    name: "Date & Time",
    description: "Date differences, age from DOB, and add or subtract days.",
    icon: "📅",
    color: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    slug: "everyday-life",
    name: "Everyday Life",
    description: "Tips, bill split, fuel cost, GPA, passwords, and random picks.",
    icon: "🏠",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    slug: "science-engineering",
    name: "Science & Engineering",
    description: "Physics and engineering helpers for students and makers.",
    icon: "🔬",
    color: "bg-violet-100 text-violet-800 border-violet-200",
  },
  {
    slug: "business",
    name: "Business",
    description: "Margins, markup, break-even, hourly-to-salary, and ROI tools.",
    icon: "📊",
    color: "bg-teal-100 text-teal-800 border-teal-200",
  },
  {
    slug: "education",
    name: "Education",
    description: "GPA, grade percentage, and study-friendly math helpers.",
    icon: "🎓",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    slug: "statistics",
    name: "Statistics",
    description: "Mean, median, mode, standard deviation, and ratio tools.",
    icon: "📈",
    color: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  },
  {
    slug: "commodities",
    name: "Commodities & Metals",
    description:
      "Live gold, silver, platinum, copper, and crude oil quotes plus weight/value tools.",
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
