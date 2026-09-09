import { NextResponse } from "next/server";
import { fetchCommodityQuotes } from "@/lib/commodities/fetchPrices";

export const revalidate = 600;

export async function GET() {
  try {
    const payload = await fetchCommodityQuotes();
    const status = payload.ok ? 200 : 503;
    return NextResponse.json(payload, {
      status,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        currency: "USD",
        fetchedAt: new Date().toISOString(),
        revalidateSeconds: 600,
        disclaimer:
          "Live commodity feed unavailable. Try again shortly — we never invent fake live prices.",
        quotes: [],
        errors: [e instanceof Error ? e.message : String(e)],
      },
      { status: 503 }
    );
  }
}
