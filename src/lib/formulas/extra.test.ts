import { describe, expect, it } from "vitest";
import {
  pythagoras,
  heronArea,
  permutation,
  combination,
  fibonacciNth,
  multiStepPercentage,
  circleMetrics,
} from "./math";
import {
  continuousCompound,
  effectiveAnnualRate,
  sipFutureValue,
  ruleOf72,
  cagr,
  npv,
  emiWithExtra,
} from "./finance";
import { waterIntakeLiters, waistHipRatio } from "./health";

describe("pythagoras", () => {
  it("finds classic 3-4-5 hypotenuse", () => {
    expect(pythagoras(3, 4, 0, "c")).toBeCloseTo(5);
  });
  it("finds a leg", () => {
    expect(pythagoras(0, 4, 5, "a")).toBeCloseTo(3);
  });
});

describe("heronArea", () => {
  it("computes area of 3-4-5", () => {
    expect(heronArea(3, 4, 5)).toBeCloseTo(6);
  });
});

describe("permutation combination", () => {
  it("P and C", () => {
    expect(permutation(5, 2)).toBe(20);
    expect(combination(5, 2)).toBe(10);
  });
});

describe("fibonacciNth", () => {
  it("F10 = 55", () => {
    expect(fibonacciNth(10)).toBe(55);
  });
});

describe("multiStepPercentage", () => {
  it("applies successive changes", () => {
    const r = multiStepPercentage(100, [10, -10]);
    expect(r.final).toBeCloseTo(99);
  });
});

describe("circleMetrics", () => {
  it("unit circle area", () => {
    expect(circleMetrics(1).area).toBeCloseTo(Math.PI);
  });
});

describe("continuousCompound", () => {
  it("grows with e^rt", () => {
    const r = continuousCompound(1000, 100, 1);
    expect(r.total).toBeCloseTo(1000 * Math.E, 5);
  });
});

describe("effectiveAnnualRate", () => {
  it("monthly EAR for 12%", () => {
    expect(effectiveAnnualRate(12, 12)).toBeCloseTo(12.6825, 2);
  });
});

describe("sipFutureValue", () => {
  it("returns more than invested at positive rate", () => {
    const r = sipFutureValue(1000, 12, 1);
    expect(r.invested).toBe(12000);
    expect(r.total).toBeGreaterThan(r.invested);
  });
});

describe("ruleOf72 cagr npv", () => {
  it("rule of 72", () => {
    expect(ruleOf72(8)).toBeCloseTo(9);
  });
  it("cagr", () => {
    expect(cagr(100, 121, 2)).toBeCloseTo(10);
  });
  it("npv", () => {
    expect(npv(10, [-100, 110])).toBeCloseTo(0, 5);
  });
});

describe("emiWithExtra", () => {
  it("extra payments reduce months", () => {
    const r = emiWithExtra({
      principal: 100000,
      annualRatePct: 10,
      years: 10,
      extraMonthly: 500,
    });
    expect(r.payoffMonths).toBeLessThan(120);
    expect(r.interestSaved).toBeGreaterThan(0);
  });
});

describe("health helpers", () => {
  it("water intake positive", () => {
    expect(waterIntakeLiters(70, 30)).toBeGreaterThan(2);
  });
  it("waist hip ratio", () => {
    expect(waistHipRatio(80, 100).ratio).toBeCloseTo(0.8);
  });
});
