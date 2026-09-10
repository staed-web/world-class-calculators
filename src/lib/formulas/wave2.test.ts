import { describe, expect, it } from "vitest";
import {
  balloonLoanPayment,
  biweeklyMortgage,
  aprVsApy,
  distance3d,
  matrixMultiply2x2,
  complexMul,
  seriesSum,
  numericDerivative,
  numericIntegral,
  oneRepMax,
  drywallSheets,
  gravelTonnage,
  tipByCountry,
  splitUneven,
  fuelVsEvCost,
  projectileMotion,
  idealGasLaw,
  pythagorean3d,
  sphereGeometry,
  halfLifeRemaining,
  capacitanceCombo,
  sipGrowthSchedule,
  salaryAfterTaxUs,
  salaryAfterTaxIn,
} from "./wave2";

describe("wave2 finance", () => {
  it("apr vs apy monthly", () => {
    const r = aprVsApy(12, 12);
    expect(r.apy).toBeCloseTo(12.6825, 3);
  });
  it("balloon has remaining balance", () => {
    const r = balloonLoanPayment(200000, 6, 30, 5);
    expect(r.payment).toBeGreaterThan(0);
    expect(r.balloon).toBeGreaterThan(100000);
  });
  it("biweekly saves interest", () => {
    const r = biweeklyMortgage(300000, 6.5, 30);
    expect(r.interestSaved).toBeGreaterThan(0);
    expect(r.monthsSaved).toBeGreaterThan(0);
  });
  it("sip schedule length", () => {
    expect(sipGrowthSchedule(500, 12, 10)).toHaveLength(10);
  });
  it("us tax rough positive", () => {
    const r = salaryAfterTaxUs(90000, "single");
    expect(r.net).toBeLessThan(90000);
    expect(r.net).toBeGreaterThan(60000);
  });
  it("illustrative low-income rebate", () => {
    expect(salaryAfterTaxIn(600000).tax).toBe(0);
  });
});

describe("wave2 math", () => {
  it("3d distance 3-4-12", () => {
    expect(distance3d(0, 0, 0, 3, 4, 12)).toBeCloseTo(13, 8);
  });
  it("matrix 2x2", () => {
    expect(matrixMultiply2x2([1, 2, 3, 4], [5, 6, 7, 8])).toEqual([19, 22, 43, 50]);
  });
  it("complex mul i*i", () => {
    const r = complexMul(0, 1, 0, 1);
    expect(r.re).toBeCloseTo(-1, 8);
    expect(r.im).toBeCloseTo(0, 8);
  });
  it("arithmetic series", () => {
    expect(seriesSum(1, 1, 100, "arithmetic")).toBe(5050);
  });
  it("derivative of x^2 at 3", () => {
    expect(numericDerivative(3, "poly", 1, 0, 0)).toBeCloseTo(6, 4);
  });
  it("integral of sin 0..pi", () => {
    expect(numericIntegral(0, Math.PI, "sin")).toBeCloseTo(2, 3);
  });
  it("pythagoras 3d", () => {
    expect(pythagorean3d(3, 4, 12).spaceDiagonal).toBeCloseTo(13, 8);
  });
  it("sphere volume r=1", () => {
    expect(sphereGeometry(1).volume).toBeCloseTo((4 / 3) * Math.PI, 8);
  });
});

describe("wave2 applied", () => {
  it("1rm epley", () => {
    expect(oneRepMax(100, 5, "epley")).toBeCloseTo(116.666, 2);
  });
  it("drywall sheets", () => {
    expect(drywallSheets(320, 32, 10).sheets).toBe(11);
  });
  it("gravel tonnage positive", () => {
    const r = gravelTonnage(20, 10, 4);
    expect(r.cuYd).toBeCloseTo(2.469, 2);
  });
  it("tip japan zero", () => {
    expect(tipByCountry(100, "jp").tipPct).toBe(0);
  });
  it("uneven split", () => {
    const r = splitUneven(100, [2, 1, 1]);
    expect(r.amounts[0]).toBeCloseTo(50, 5);
  });
  it("fuel vs ev", () => {
    const r = fuelVsEvCost({ miles: 100, mpg: 25, gasPrice: 4, kwhPer100mi: 30, electricityRate: 0.15 });
    expect(r.gasCost).toBeCloseTo(16, 5);
    expect(r.evCost).toBeCloseTo(4.5, 5);
  });
  it("projectile 45 deg symmetry", () => {
    const r = projectileMotion(20, 45);
    expect(r.range).toBeGreaterThan(40);
    expect(r.points[0].y).toBeCloseTo(0, 5);
  });
  it("ideal gas P", () => {
    const p = idealGasLaw({ solve: "p", n: 1, v: 22.4, t: 273.15 });
    expect(p).toBeCloseTo(1, 1);
  });
  it("half life", () => {
    expect(halfLifeRemaining(100, 10, 10)).toBeCloseTo(50, 8);
  });
  it("caps parallel", () => {
    expect(capacitanceCombo([10, 20], "parallel")).toBe(30);
  });
});
