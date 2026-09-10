import { describe, expect, it } from "vitest";
import {
  calculatorSeoContent,
  getCalculatorSeoContent,
  popularInIndiaSlugs,
  seoContentSlugs,
} from "./calculatorContent";
import { getCalculatorBySlug } from "@/lib/calculators/registry";

const FLAGSHIPS = [
  "mortgage",
  "loan-emi",
  "sip",
  "gst-vat",
  "bmi",
  "salary-after-tax-in",
] as const;

describe("calculator SEO content", () => {
  it("covers 30+ commercial slugs with real FAQs", () => {
    expect(seoContentSlugs.length).toBeGreaterThanOrEqual(30);
    for (const slug of seoContentSlugs) {
      const c = calculatorSeoContent[slug];
      expect(c.faqs?.length ?? 0).toBeGreaterThanOrEqual(4);
      expect(getCalculatorBySlug(slug)).toBeTruthy();
    }
  });

  it("flagships have overview, India/US how-to, and worked examples", () => {
    for (const slug of FLAGSHIPS) {
      const c = getCalculatorSeoContent(slug);
      expect(c?.overview?.length ?? 0).toBeGreaterThan(80);
      expect(c?.howToUseIndia?.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(c?.howToUseUS?.length ?? 0).toBeGreaterThanOrEqual(2);
      expect(c?.workedExample?.steps.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(c?.faqs?.length ?? 0).toBeGreaterThanOrEqual(4);
    }
  });

  it("Popular in India slugs resolve", () => {
    for (const slug of popularInIndiaSlugs) {
      expect(getCalculatorBySlug(slug)).toBeTruthy();
    }
  });
});
