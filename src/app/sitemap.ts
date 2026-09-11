import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { allCalculators, calculatorPath } from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/calculators",
    "/search",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/calculators" ? 0.9 : 0.5,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${SITE_URL}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const calcRoutes = allCalculators.map((c) => ({
    url: `${SITE_URL}${calculatorPath(c)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calcRoutes];
}
