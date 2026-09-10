import { NextResponse } from "next/server";
import { fetchFxRates } from "@/lib/currency/fetchRates";

export const revalidate = 3600;

export async function GET() {
  try {
    const payload = await fetchFxRates();
    const status = payload.ok ? 200 : 200; // still return usable fallback rates
    return NextResponse.json(payload, {
      status,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (e) {
    const { FALLBACK_RATES_USD } = await import("@/lib/currency/currencies");
    return NextResponse.json(
      {
        ok: false,
        base: "USD",
        rates: FALLBACK_RATES_USD,
        fetchedAt: new Date().toISOString(),
        source: "static fallback snapshot",
        disclaimer:
          "FX feed unavailable — showing illustrative snapshot rates. Not for trading.",
        revalidateSeconds: 3600,
        usingFallback: true,
        errors: [e instanceof Error ? e.message : String(e)],
      },
      { status: 200 }
    );
  }
}
