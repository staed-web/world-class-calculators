import { describe, expect, it } from "vitest";
import {
  mortgagePayment,
  compoundInterest,
  simpleInterest,
  tipAmount,
  apyFromApr,
  debtPayoffMonths,
  gstVat,
} from "./finance";

describe("mortgagePayment", () => {
  it("matches a known 30-year fixed payment", () => {
    const pmt = mortgagePayment(300000, 6.5, 30);
    expect(pmt).toBeCloseTo(1896.2, 0);
  });

  it("handles zero interest", () => {
    expect(mortgagePayment(12000, 0, 1)).toBeCloseTo(1000, 5);
  });
});

describe("compoundInterest", () => {
  it("compounds monthly", () => {
    const r = compoundInterest(1000, 10, 1, 12);
    expect(r.total).toBeCloseTo(1104.71, 1);
  });
});

describe("simpleInterest", () => {
  it("computes I = Prt", () => {
    const r = simpleInterest(1000, 5, 2);
    expect(r.interest).toBe(100);
    expect(r.total).toBe(1100);
  });
});

describe("tipAmount", () => {
  it("splits tip across people", () => {
    const r = tipAmount(100, 20, 4);
    expect(r.tip).toBe(20);
    expect(r.total).toBe(120);
    expect(r.perPerson).toBe(30);
  });
});

describe("apyFromApr", () => {
  it("converts APR to APY", () => {
    const apy = apyFromApr(5, 12);
    expect(apy).toBeCloseTo(5.116, 2);
  });
});

describe("debtPayoffMonths", () => {
  it("estimates payoff horizon", () => {
    const r = debtPayoffMonths(5000, 12, 200);
    expect(r.months).toBeGreaterThan(20);
    expect(r.months).toBeLessThan(40);
  });
});

describe("gstVat", () => {
  it("adds exclusive tax", () => {
    const r = gstVat(100, 10, "exclusive");
    expect(r.tax).toBeCloseTo(10);
    expect(r.gross).toBeCloseTo(110);
  });

  it("extracts inclusive tax", () => {
    const r = gstVat(110, 10, "inclusive");
    expect(r.net).toBeCloseTo(100);
    expect(r.tax).toBeCloseTo(10);
  });
});
