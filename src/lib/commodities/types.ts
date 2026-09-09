import type { CommodityId } from "./constants";

export interface CommodityQuote {
  id: CommodityId;
  name: string;
  symbol: string;
  price: number;
  currency: string;
  quoteUnit: string;
  updatedAt: string | null;
  source: string;
}

export interface CommoditiesPayload {
  ok: boolean;
  currency: string;
  fetchedAt: string;
  revalidateSeconds: number;
  disclaimer: string;
  quotes: CommodityQuote[];
  errors: string[];
  stale?: boolean;
}
