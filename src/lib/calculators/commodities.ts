import type { CalculatorMeta } from "../types";

export const commoditiesCalculators: CalculatorMeta[] = [
  {
    slug: "metals-spot",
    category: "commodities",
    name: "Live Metals & Commodities Spot",
    description:
      "Live spot quotes for gold, silver, platinum, palladium, copper, and WTI crude oil.",
    keywords: [
      "gold price",
      "silver price",
      "platinum",
      "palladium",
      "copper",
      "crude oil",
      "commodities",
      "live metal prices",
    ],
    featured: true,
    popular: true,
    kind: "custom",
    customKey: "commodities-spot",
    formulaNote:
      "Free feeds (gold-api.com + Yahoo Finance futures). Quotes may be delayed; not tradeable prices.",
    related: ["gold-value", "jewelry-melt", "commodity-unit"],
  },
  {
    slug: "gold-value",
    category: "commodities",
    name: "Gold / Metal Value by Weight",
    description:
      "Estimate the value of gold, silver, platinum, or palladium from live spot and weight.",
    keywords: ["gold value", "gold calculator", "grams of gold", "troy ounce"],
    featured: true,
    popular: true,
    kind: "custom",
    customKey: "commodities-metal-value",
    related: ["metals-spot", "jewelry-melt", "commodity-unit"],
  },
  {
    slug: "jewelry-melt",
    category: "commodities",
    name: "Jewelry Melt-ish Estimate",
    description:
      "Rough melt value from jewelry weight, purity (karat/fineness), and live spot metal prices.",
    keywords: ["jewelry melt", "karat", "22k", "gold purity", "scrap gold"],
    kind: "custom",
    customKey: "commodities-jewelry-melt",
    formulaNote:
      "Educational melt estimate only — dealers deduct fees; gemstones and workmanship are ignored.",
    related: ["gold-value", "metals-spot"],
  },
  {
    slug: "commodity-unit",
    category: "commodities",
    name: "Commodity Unit Value Converter",
    description:
      "Convert weight or barrels into USD value using live unit prices for metals, copper, or oil.",
    keywords: ["commodity converter", "copper price", "oil barrel", "metal unit"],
    kind: "custom",
    customKey: "commodities-unit",
    related: ["metals-spot", "gold-value"],
  },
];
