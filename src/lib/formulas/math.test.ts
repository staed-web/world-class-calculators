import { describe, expect, it } from "vitest";
import {
  mean,
  median,
  mode,
  gcd,
  lcm,
  isPrime,
  quadratic,
  percentageChange,
  simplifyFraction,
  stdDeviation,
} from "./math";

describe("averages", () => {
  it("computes mean median mode", () => {
    const nums = [2, 4, 4, 6, 8];
    expect(mean(nums)).toBe(4.8);
    expect(median(nums)).toBe(4);
    expect(mode(nums)).toEqual([4]);
  });
});

describe("gcd lcm", () => {
  it("works for positives", () => {
    expect(gcd(24, 36)).toBe(12);
    expect(lcm(24, 36)).toBe(72);
  });
});

describe("isPrime", () => {
  it("detects primes", () => {
    expect(isPrime(97)).toBe(true);
    expect(isPrime(100)).toBe(false);
    expect(isPrime(1)).toBe(false);
  });
});

describe("quadratic", () => {
  it("solves x^2 - 3x + 2", () => {
    const r = quadratic(1, -3, 2);
    expect(r.roots.sort()).toEqual([1, 2]);
  });
});

describe("percentageChange", () => {
  it("handles increase", () => {
    expect(percentageChange(80, 100)).toBeCloseTo(25);
  });
});

describe("simplifyFraction", () => {
  it("reduces 2/4", () => {
    expect(simplifyFraction(2, 4)).toEqual({ num: 1, den: 2 });
  });
});

describe("stdDeviation", () => {
  it("sample stdev for known set", () => {
    const sd = stdDeviation([2, 4, 4, 4, 5, 5, 7, 9], true);
    expect(sd).toBeCloseTo(2.138, 2);
  });
});
