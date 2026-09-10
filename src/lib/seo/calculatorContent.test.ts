import { describe, expect, it } from "vitest";
import {
  calculatorSeoContent,
  getCalculatorSeoContent,
  getAllCalculatorSeoCoverage,
  popularInIndiaSlugs,
  seoContentSlugs,
} from "./calculatorContent";
import { allCalculators, getCalculatorBySlug } from "@/lib/calculators/registry";

const FLAGSHIPS = [
  "mortgage",
  "loan-emi",
  "sip",
  "gst-vat",
  "bmi",
  "salary-after-tax-in",
  "daily-compound-interest",
] as const;

describe("calculator SEO content", () => {
  it("covers 30+ commercial slug overrides with real FAQs", () => {
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

  it("every registry calculator gets substantial default detail sections", () => {
    const coverage = getAllCalculatorSeoCoverage();
    expect(coverage.total).toBe(allCalculators.length);
    expect(coverage.total).toBeGreaterThanOrEqual(200);
    expect(coverage.withOverride + coverage.defaultsOnly).toBe(coverage.total);

    for (const calc of allCalculators) {
      const c = getCalculatorSeoContent(calc.slug);
      expect(c, calc.slug).toBeTruthy();
      expect((c!.overview?.length ?? 0), calc.slug).toBeGreaterThan(80);
      expect((c!.howToUse?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(3);
      expect((c!.howToUseIndia?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(2);
      expect((c!.howToUseUS?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(2);
      expect((c!.howToInterpret?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(2);
      expect((c!.faqs?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(4);
      expect((c!.workedExample?.steps.length ?? 0), calc.slug).toBeGreaterThanOrEqual(3);
      expect((c!.formulaNote?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(40);
      expect((c!.seoDescription?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(40);
    }
  });
});
