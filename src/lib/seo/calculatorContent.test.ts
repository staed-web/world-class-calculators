import { describe, expect, it } from "vitest";
import {
  calculatorSeoContent,
  getCalculatorSeoContent,
  getAllCalculatorSeoCoverage,
  popularPlanningSlugs,
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
    expect(seoContentSlugs.length).toBeGreaterThanOrEqual(75);
    for (const slug of seoContentSlugs) {
      const c = calculatorSeoContent[slug];
      expect(c.faqs?.length ?? 0).toBeGreaterThanOrEqual(4);
      expect(getCalculatorBySlug(slug)).toBeTruthy();
    }
  });

  it("flagships have overview, how-to, and worked examples", () => {
    for (const slug of FLAGSHIPS) {
      const c = getCalculatorSeoContent(slug);
      expect(c?.overview?.length ?? 0).toBeGreaterThan(160);
      expect(c?.howToUse?.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(c?.workedExample?.steps.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(c?.faqs?.length ?? 0).toBeGreaterThanOrEqual(4);
    }
  });

  it("Popular planning slugs resolve", () => {
    for (const slug of popularPlanningSlugs) {
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
      expect((c!.overview?.length ?? 0), calc.slug).toBeGreaterThan(160);
      expect((c!.howToUse?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(4);
      expect((c!.howToInterpret?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(3);
      expect((c!.faqs?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(4);
      expect((c!.workedExample?.steps.length ?? 0), calc.slug).toBeGreaterThanOrEqual(3);
      expect((c!.formulaNote?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(40);
      expect((c!.seoDescription?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(40);
      expect((c!.whenToUse?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(3);
      expect((c!.commonMistakes?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(3);
    }
  });
});
