import { describe, expect, it } from "vitest";
import {
  calculatorSeoContent,
  getCalculatorSeoContent,
  getAllCalculatorSeoCoverage,
  popularPlanningSlugs,
  seoContentSlugs,
  highTrafficSlugs,
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

const PARITY_SPOT_CHECK = [
  "mortgage",
  "loan-emi",
  "sip",
  "bmi",
  "tip",
  "percentage",
  "pythagoras",
  "gst-vat",
  "currency-converter",
  "compound-interest",
  "daily-compound-interest",
] as const;

function sectionScore(c: NonNullable<ReturnType<typeof getCalculatorSeoContent>>) {
  return {
    overview: c.overview?.length ?? 0,
    howToUse: c.howToUse?.length ?? 0,
    howToInterpret: c.howToInterpret?.length ?? 0,
    whenToUse: c.whenToUse?.length ?? 0,
    commonMistakes: c.commonMistakes?.length ?? 0,
    faqs: c.faqs?.length ?? 0,
    exampleSteps: c.workedExample?.steps.length ?? 0,
    formula: c.formulaNote?.length ?? 0,
  };
}

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
      expect((c!.howToUse?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(5);
      expect((c!.howToInterpret?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(4);
      expect((c!.faqs?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(5);
      expect((c!.workedExample?.steps.length ?? 0), calc.slug).toBeGreaterThanOrEqual(3);
      expect((c!.formulaNote?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(40);
      expect((c!.seoDescription?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(40);
      expect((c!.whenToUse?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(4);
      expect((c!.commonMistakes?.length ?? 0), calc.slug).toBeGreaterThanOrEqual(4);
    }
  });

  it("spot-check tools match daily-compound section richness", () => {
    const flag = sectionScore(getCalculatorSeoContent("daily-compound-interest")!);
    expect(flag.overview).toBeGreaterThan(700);
    expect(flag.howToUse).toBeGreaterThanOrEqual(6);
    expect(flag.faqs).toBeGreaterThanOrEqual(8);

    for (const slug of PARITY_SPOT_CHECK) {
      const s = sectionScore(getCalculatorSeoContent(slug)!);
      expect(s.overview, slug).toBeGreaterThanOrEqual(500);
      expect(s.howToUse, slug).toBeGreaterThanOrEqual(6);
      expect(s.howToInterpret, slug).toBeGreaterThanOrEqual(5);
      expect(s.whenToUse, slug).toBeGreaterThanOrEqual(5);
      expect(s.commonMistakes, slug).toBeGreaterThanOrEqual(5);
      expect(s.faqs, slug).toBeGreaterThanOrEqual(6);
      expect(s.exampleSteps, slug).toBeGreaterThanOrEqual(4);
      expect(s.formula, slug).toBeGreaterThanOrEqual(120);
    }
  });

  it("nearly all calculators expose the full guide section set", () => {
    let full = 0;
    for (const calc of allCalculators) {
      const s = sectionScore(getCalculatorSeoContent(calc.slug)!);
      const ok =
        s.overview >= 400 &&
        s.howToUse >= 5 &&
        s.howToInterpret >= 4 &&
        s.whenToUse >= 4 &&
        s.commonMistakes >= 4 &&
        s.faqs >= 6 &&
        s.exampleSteps >= 4 &&
        s.formula >= 80;
      if (ok) full += 1;
    }
    // Parity bar: almost the entire catalog — long-tail defaults + merge padding.
    expect(full).toBeGreaterThanOrEqual(Math.floor(allCalculators.length * 0.95));
  });

  it("every calculator has unique seoTitle and meta description", () => {
    const titles = new Map<string, string>();
    const descs = new Map<string, string>();
    for (const calc of allCalculators) {
      const c = getCalculatorSeoContent(calc.slug)!;
      const title = (c.seoTitle || "").trim();
      const desc = (c.seoDescription || "").trim();
      expect(title.length, calc.slug).toBeGreaterThanOrEqual(12);
      expect(desc.length, calc.slug).toBeGreaterThanOrEqual(40);
      if (titles.has(title)) {
        throw new Error(`Duplicate seoTitle for ${calc.slug} and ${titles.get(title)}: ${title}`);
      }
      titles.set(title, calc.slug);
      // Descriptions may rarely collide on thin stubs; prefer uniqueness.
      if (descs.has(desc)) {
        throw new Error(`Duplicate seoDescription for ${calc.slug} and ${descs.get(desc)}`);
      }
      descs.set(desc, calc.slug);
    }
  });

  it("high-traffic planning tools stay deep", () => {
    expect(highTrafficSlugs.length).toBeGreaterThanOrEqual(50);
    for (const slug of highTrafficSlugs) {
      expect(getCalculatorBySlug(slug), slug).toBeTruthy();
      const c = getCalculatorSeoContent(slug)!;
      expect((c.overview?.length ?? 0), slug).toBeGreaterThanOrEqual(400);
      expect((c.howToUse?.length ?? 0), slug).toBeGreaterThanOrEqual(5);
      expect((c.faqs?.length ?? 0), slug).toBeGreaterThanOrEqual(5);
      expect((c.seoTitle?.length ?? 0), slug).toBeGreaterThanOrEqual(12);
      expect((c.seoDescription?.length ?? 0), slug).toBeGreaterThanOrEqual(50);
    }
  });
});
