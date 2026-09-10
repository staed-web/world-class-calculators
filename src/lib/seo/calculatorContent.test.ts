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
  it("covers 90+ commercial slug overrides with real FAQs", () => {
    expect(seoContentSlugs.length).toBeGreaterThanOrEqual(95);
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


  it("worked examples include concrete demo numbers for form calculators", () => {
    const sample = allCalculators
      .filter((c) => c.kind === "form" && c.compute && c.fields?.length)
      .slice(0, 40);
    let withDigits = 0;
    for (const calc of sample) {
      const c = getCalculatorSeoContent(calc.slug);
      const blob = `${c?.workedExample?.result ?? ""} ${c?.workedExample?.steps.join(" ") ?? ""}`;
      if (/\d/.test(blob)) withDigits += 1;
    }
    expect(withDigits).toBeGreaterThanOrEqual(30);
  });

  it("flagship extras from overridesExtra are deep", () => {
    for (const slug of ["compound-interest", "tip", "percentage", "roi", "cagr", "break-even"] as const) {
      const c = getCalculatorSeoContent(slug);
      expect(c?.overview?.length ?? 0).toBeGreaterThan(200);
      expect(c?.workedExample?.steps.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(c?.whenToUse?.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(c?.commonMistakes?.length ?? 0).toBeGreaterThanOrEqual(3);
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
