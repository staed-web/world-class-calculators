import { COMMODITIES } from "./constants";
import type { CommodityQuote, CommoditiesPayload } from "./types";

export type { CommodityQuote, CommoditiesPayload } from "./types";

const DISCLAIMER =
  "Prices are delayed/illustrative market quotes from free public feeds — not executable trade prices. Verify with your broker or bullion dealer before buying or selling.";

type GoldApiRow = {
  price?: number;
  currency?: string;
  updatedAt?: string;
  name?: string;
  symbol?: string;
  error?: string;
};

async function fetchGoldApi(symbol: string): Promise<GoldApiRow> {
  const res = await fetch(`https://api.gold-api.com/price/${symbol}`, {
    headers: { Accept: "application/json", "User-Agent": "mycalcsworld/1.0" },
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`gold-api ${symbol} HTTP ${res.status}`);
  return (await res.json()) as GoldApiRow;
}

async function fetchYahooLast(symbol: string): Promise<{
  price: number;
  currency: string;
  updatedAt: string | null;
}> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol
  )}?interval=1d&range=1d`;
  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`yahoo ${symbol} HTTP ${res.status}`);
  const data = (await res.json()) as {
    chart?: {
      result?: Array<{
        meta?: {
          regularMarketPrice?: number;
          currency?: string;
          regularMarketTime?: number;
        };
      }>;
    };
  };
  const meta = data.chart?.result?.[0]?.meta;
  const price = meta?.regularMarketPrice;
  if (!Number.isFinite(price)) throw new Error(`yahoo ${symbol} missing price`);
  return {
    price: price as number,
    currency: meta?.currency ?? "USD",
    updatedAt: meta?.regularMarketTime
      ? new Date(meta.regularMarketTime * 1000).toISOString()
      : null,
  };
}

/** Server-side fetch of live commodity quotes (cached via Next fetch revalidate). */
export async function fetchCommodityQuotes(): Promise<CommoditiesPayload> {
  const errors: string[] = [];
  const quotes: CommodityQuote[] = [];

  await Promise.all(
    COMMODITIES.map(async (c) => {
      try {
        if (c.goldApiSymbol) {
          const row = await fetchGoldApi(c.goldApiSymbol);
          if (row.error || !Number.isFinite(row.price)) {
            throw new Error(row.error || "invalid price");
          }
          quotes.push({
            id: c.id,
            name: c.name,
            symbol: c.symbol,
            price: row.price as number,
            currency: row.currency || "USD",
            quoteUnit: c.quoteUnit,
            updatedAt: row.updatedAt ?? null,
            source: "gold-api.com",
          });
          return;
        }
        if (c.yahooSymbol) {
          const row = await fetchYahooLast(c.yahooSymbol);
          quotes.push({
            id: c.id,
            name: c.name,
            symbol: c.symbol,
            price: row.price,
            currency: row.currency,
            quoteUnit: c.quoteUnit,
            updatedAt: row.updatedAt,
            source: "Yahoo Finance (futures)",
          });
        }
      } catch (e) {
        errors.push(`${c.id}: ${e instanceof Error ? e.message : String(e)}`);
      }
    })
  );

  quotes.sort(
    (a, b) =>
      COMMODITIES.findIndex((x) => x.id === a.id) -
      COMMODITIES.findIndex((x) => x.id === b.id)
  );

  return {
    ok: quotes.length > 0,
    currency: "USD",
    fetchedAt: new Date().toISOString(),
    revalidateSeconds: 600,
    disclaimer: DISCLAIMER,
    quotes,
    errors,
  };
}
