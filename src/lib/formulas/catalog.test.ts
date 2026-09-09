import { describe, expect, it } from "vitest";
import {
  creditCardPayoff,
  matrix2x2Det,
  binomialProbability,
  toRoman,
  fromRoman,
  convertBase,
  meanAbsoluteDeviation,
  bondCurrentYield,
  peRatio,
  dividendYield,
  interestOnlyPayment,
  gstInvoiceSplit,
  fencePosts,
  roofPitch,
  ohmsLaw,
  freefall,
  resistorSeries,
  resistorParallel,
  businessDaysBetween,
  zodiacSign,
  percentageMega,
  nthRoot,
  coneVolume,
  amortizeYearlySummary,
  proteinNeed,
  stepsToDistance,
} from "./catalog";

describe("creditCardPayoff", () => {
  it("pays off a simple zero-interest balance", () => {
    const r = creditCardPayoff(1000, 0, 250);
    expect(r.months).toBe(4);
    expect(r.totalInterest).toBeCloseTo(0, 5);
  });
});

describe("matrix and binomial", () => {
  it("det of identity-ish", () => {
    expect(matrix2x2Det(1, 2, 3, 4)).toBe(-2);
  });
  it("binomial fair coin P(X=2) n=4", () => {
    expect(binomialProbability(4, 2, 0.5)).toBeCloseTo(0.375, 5);
  });
});

describe("roman and bases", () => {
  it("round-trips roman", () => {
    expect(toRoman(2026)).toBe("MMXXVI");
    expect(fromRoman("MMXXVI")).toBe(2026);
  });
  it("converts hex", () => {
    expect(convertBase("FF", 16, 10)).toBe("255");
    expect(convertBase("255", 10, 2)).toBe("11111111");
  });
});

describe("stats and finance helpers", () => {
  it("MAD", () => {
    expect(meanAbsoluteDeviation([1, 2, 3, 4])).toBeCloseTo(1, 5);
  });
  it("yields and PE", () => {
    expect(bondCurrentYield(50, 1000)).toBeCloseTo(5, 5);
    expect(peRatio(100, 5)).toBeCloseTo(20, 5);
    expect(dividendYield(2, 50)).toBeCloseTo(4, 5);
    expect(interestOnlyPayment(120000, 6)).toBeCloseTo(600, 5);
  });
  it("gst split", () => {
    const r = gstInvoiceSplit(118, 18);
    expect(r.taxable).toBeCloseTo(100, 5);
    expect(r.gst).toBeCloseTo(18, 5);
  });
});

describe("construction / science", () => {
  it("fence posts", () => {
    expect(fencePosts(100, 8)).toBe(14);
  });
  it("roof pitch 6/12", () => {
    const r = roofPitch(6, 12);
    expect(r.pitchRatio).toBe("6.0/12");
    expect(r.degrees).toBeCloseTo(26.565, 2);
  });
  it("ohms law", () => {
    const r = ohmsLaw({ i: 2, r: 6 });
    expect(r?.v).toBeCloseTo(12, 5);
    expect(r?.p).toBeCloseTo(24, 5);
  });
  it("freefall from height", () => {
    const r = freefall({ height: 100, g: 9.80665 });
    expect(r.time).toBeCloseTo(4.516, 2);
  });
  it("resistors", () => {
    expect(resistorSeries([100, 200])).toBe(300);
    expect(resistorParallel([100, 100])).toBeCloseTo(50, 5);
  });
});

describe("dates and misc", () => {
  it("business days", () => {
    // 2026-09-01 Tue to 2026-09-04 Fri inclusive = 4
    expect(businessDaysBetween("2026-09-01", "2026-09-04")).toBe(4);
  });
  it("zodiac", () => {
    expect(zodiacSign(9, 9)).toBe("Virgo");
  });
  it("percentage mega", () => {
    expect(percentageMega("what_is", 20, 150)).toBeCloseTo(30, 5);
    expect(percentageMega("is_what", 30, 150)).toBeCloseTo(20, 5);
  });
  it("nth root and cone", () => {
    expect(nthRoot(81, 2)).toBeCloseTo(9, 5);
    expect(coneVolume(3, 5)).toBeCloseTo((1 / 3) * Math.PI * 9 * 5, 5);
  });
  it("amortize yearly length", () => {
    expect(amortizeYearlySummary(200000, 6, 5)).toHaveLength(5);
  });
  it("protein and steps", () => {
    expect(proteinNeed(70, "athlete")).toBeCloseTo(126, 5);
    const s = stepsToDistance(10000, 0.78);
    expect(s.km).toBeCloseTo(7.8, 2);
  });
});
