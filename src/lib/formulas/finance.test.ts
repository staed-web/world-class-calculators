import { describe, expect, it } from "vitest";
import {
  mortgagePayment,
  compoundInterest,
  simpleInterest,
  tipAmount,
  apyFromApr,
  debtPayoffMonths,
  gstVat,
  dailyCompoundInterest,
  totalDaysFromYMD,
  sampleDailyCompoundPoints,
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

describe("totalDaysFromYMD", () => {
  it("uses 365/30 convention", () => {
    expect(totalDaysFromYMD(1, 0, 0)).toBe(365);
    expect(totalDaysFromYMD(0, 1, 0)).toBe(30);
    expect(totalDaysFromYMD(1, 2, 5)).toBe(365 + 60 + 5);
  });
});

describe("dailyCompoundInterest", () => {
  it("matches $1000 @ 0.4%/day for 365 days", () => {
    const r = dailyCompoundInterest({
      principal: 1000,
      ratePct: 0.4,
      rateMode: "daily",
      totalDays: 365,
    });
    expect(r.futureValue).toBeCloseTo(4293.4377972993, 4);
    expect(r.totalInterest).toBeCloseTo(3293.4377972993, 4);
    expect(r.cashWithdrawn).toBeCloseTo(0, 8);
    expect(r.compoundingDays).toBe(365);
  });

  it("matches closed form with annual rate / 365", () => {
    const r = dailyCompoundInterest({
      principal: 1000,
      ratePct: 5,
      rateMode: "annual",
      totalDays: 365,
    });
    const expected = 1000 * Math.pow(1 + 0.05 / 365, 365);
    expect(r.futureValue).toBeCloseTo(expected, 6);
  });

  it("applies partial reinvest and tracks cash withdrawn", () => {
    const r = dailyCompoundInterest({
      principal: 5000,
      ratePct: 0.5,
      rateMode: "daily",
      totalDays: 1,
      reinvestPct: 80,
    });
    expect(r.futureValue).toBeCloseTo(5020, 6);
    expect(r.cashWithdrawn).toBeCloseTo(5, 6);
    expect(r.totalInterest).toBeCloseTo(25, 6);
  });

  it("adds end-of-period daily deposits", () => {
    const r = dailyCompoundInterest({
      principal: 1000,
      ratePct: 0,
      rateMode: "daily",
      totalDays: 10,
      depositAmount: 50,
      depositFrequency: "daily",
    });
    expect(r.futureValue).toBeCloseTo(1500, 6);
    expect(r.additionalDeposits).toBeCloseTo(500, 6);
  });

  it("adds monthly deposits every 30 calendar days", () => {
    const r = dailyCompoundInterest({
      principal: 1000,
      ratePct: 0,
      rateMode: "daily",
      totalDays: 90,
      depositAmount: 100,
      depositFrequency: "monthly",
    });
    expect(r.additionalDeposits).toBeCloseTo(300, 6);
    expect(r.futureValue).toBeCloseTo(1300, 6);
  });

  it("filters weekends so compounding days ≈ business days", () => {
    const r = dailyCompoundInterest({
      principal: 1000,
      ratePct: 0.1,
      rateMode: "daily",
      totalDays: 365,
      excludeWeekends: true,
      startDate: new Date(Date.UTC(2024, 0, 1)),
    });
    // 2024 is a leap? Jan 1 2024 + 365 days span = 365 calendar days; ~261 weekdays
    expect(r.compoundingDays).toBeGreaterThan(250);
    expect(r.compoundingDays).toBeLessThan(270);
    expect(r.compoundingDays).toBeLessThan(365);
    const full = dailyCompoundInterest({
      principal: 1000,
      ratePct: 0.1,
      rateMode: "daily",
      totalDays: 365,
      excludeWeekends: false,
    });
    expect(r.futureValue).toBeLessThan(full.futureValue);
  });

  it("samples chart points without dropping endpoints", () => {
    const r = dailyCompoundInterest({
      principal: 1000,
      ratePct: 0.1,
      rateMode: "daily",
      totalDays: 400,
    });
    const s = sampleDailyCompoundPoints(r.points, 40);
    expect(s.length).toBe(40);
    expect(s[0].day).toBe(1);
    expect(s[s.length - 1].day).toBe(400);
  });
});
