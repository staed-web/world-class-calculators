import { describe, expect, it } from "vitest";
import { convertAmount, FALLBACK_RATES_USD } from "./currencies";

describe("convertAmount", () => {
  it("identity USD→USD", () => {
    expect(convertAmount(100, "USD", "USD", FALLBACK_RATES_USD)).toBeCloseTo(100);
  });
  it("USD→EUR uses rate", () => {
    const out = convertAmount(100, "USD", "EUR", FALLBACK_RATES_USD);
    expect(out).toBeCloseTo(100 * FALLBACK_RATES_USD.EUR);
  });
  it("round-trips EUR→USD→EUR", () => {
    const eur = 50;
    const usd = convertAmount(eur, "EUR", "USD", FALLBACK_RATES_USD);
    const back = convertAmount(usd, "USD", "EUR", FALLBACK_RATES_USD);
    expect(back).toBeCloseTo(eur, 6);
  });
});
