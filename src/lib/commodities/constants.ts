/** Troy ounce in grams (exact for precious metals pricing). */
export const GRAMS_PER_TROY_OZ = 31.1034768;

export type CommodityId =
  | "gold"
  | "silver"
  | "platinum"
  | "palladium"
  | "copper"
  | "crude_oil";

export interface CommodityMeta {
  id: CommodityId;
  name: string;
  symbol: string;
  /** Unit the live feed quotes in */
  quoteUnit: string;
  goldApiSymbol?: string;
  yahooSymbol?: string;
}

export const COMMODITIES: CommodityMeta[] = [
  {
    id: "gold",
    name: "Gold",
    symbol: "XAU",
    quoteUnit: "USD / troy oz",
    goldApiSymbol: "XAU",
  },
  {
    id: "silver",
    name: "Silver",
    symbol: "XAG",
    quoteUnit: "USD / troy oz",
    goldApiSymbol: "XAG",
  },
  {
    id: "platinum",
    name: "Platinum",
    symbol: "XPT",
    quoteUnit: "USD / troy oz",
    goldApiSymbol: "XPT",
  },
  {
    id: "palladium",
    name: "Palladium",
    symbol: "XPD",
    quoteUnit: "USD / troy oz",
    goldApiSymbol: "XPD",
  },
  {
    id: "copper",
    name: "Copper",
    symbol: "HG",
    quoteUnit: "USD / lb",
    goldApiSymbol: "HG",
  },
  {
    id: "crude_oil",
    name: "Crude Oil (WTI)",
    symbol: "CL",
    quoteUnit: "USD / barrel",
    yahooSymbol: "CL=F",
  },
];

export function gramsToTroyOz(grams: number): number {
  return grams / GRAMS_PER_TROY_OZ;
}

export function troyOzToGrams(oz: number): number {
  return oz * GRAMS_PER_TROY_OZ;
}

export function lbsToKg(lbs: number): number {
  return lbs * 0.45359237;
}

export function kgToLbs(kg: number): number {
  return kg / 0.45359237;
}
