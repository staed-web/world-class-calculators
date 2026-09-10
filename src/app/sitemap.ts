import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { allCalculators, calculatorPath } from "@/lib/calculators/registry";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mycalcsworld.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/search", "/about", "/contact", "/privacy", "/disclaimer"].map(
    (path) => ({
      url: `${siteUrl}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.5,
    })
  );

  const categoryRoutes = categories.map((c) => ({
    url: `${siteUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const calcRoutes = allCalculators.map((c) => ({
    url: `${siteUrl}${calculatorPath(c)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...calcRoutes];
}
