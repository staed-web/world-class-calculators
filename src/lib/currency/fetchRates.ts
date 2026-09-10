import {
  CURRENCY_CODES,
  FALLBACK_RATES_USD,
  DEFAULT_CURRENCY,
} from "./currencies";

export interface FxPayload {
  ok: boolean;
  base: string;
  /** Units of each currency per 1 USD */
  rates: Record<string, number>;
  fetchedAt: string;
  source: string;
  disclaimer: string;
  revalidateSeconds: number;
  usingFallback?: boolean;
  errors?: string[];
}

const DISCLAIMER =
  "FX rates are delayed estimates for education only — not executable trade quotes. Always verify with your bank or a licensed provider before transferring money.";

const REVALIDATE = 3600;

/**
 * Fetch USD-based rates from frankfurter.app (ECB, free, no key).
 * Falls back to static snapshot on failure.
 */
export async function fetchFxRates(): Promise<FxPayload> {
  const fetchedAt = new Date().toISOString();
  const wanted = CURRENCY_CODES.filter((c) => c !== "USD");
  const errors: string[] = [];

  try {
    const url = `https://api.frankfurter.app/latest?from=USD&to=${wanted.join(",")}`;
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`frankfurter HTTP ${res.status}`);
    }
    const data = (await res.json()) as {
      base?: string;
      date?: string;
      rates?: Record<string, number>;
    };
    const rates: Record<string, number> = { USD: 1 };
    for (const [code, rate] of Object.entries(data.rates ?? {})) {
      if (Number.isFinite(rate) && rate > 0) rates[code] = rate;
    }
    // Merge any missing codes from fallback so UI never blanks
    for (const code of CURRENCY_CODES) {
      if (rates[code] == null) rates[code] = FALLBACK_RATES_USD[code] ?? 1;
    }
    return {
      ok: true,
      base: DEFAULT_CURRENCY,
      rates,
      fetchedAt: data.date ? `${data.date}T00:00:00.000Z` : fetchedAt,
      source: "frankfurter.app (ECB reference)",
      disclaimer: DISCLAIMER,
      revalidateSeconds: REVALIDATE,
    };
  } catch (e) {
    errors.push(e instanceof Error ? e.message : String(e));
    return {
      ok: false,
      base: DEFAULT_CURRENCY,
      rates: { ...FALLBACK_RATES_USD },
      fetchedAt,
      source: "static fallback snapshot",
      disclaimer: DISCLAIMER,
      revalidateSeconds: REVALIDATE,
      usingFallback: true,
      errors,
    };
  }
}
