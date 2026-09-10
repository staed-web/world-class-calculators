export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  /** Typical fraction digits for display */
  digits?: number;
}

/** Supported display / converter currencies */
export const CURRENCIES: CurrencyInfo[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", digits: 0 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", digits: 0 },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "PLN", name: "Polish Złoty", symbol: "zł" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", digits: 0 },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
];

export const CURRENCY_CODES = CURRENCIES.map((c) => c.code);

export const currencyMap = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c])
) as Record<string, CurrencyInfo>;

export const DEFAULT_CURRENCY = "USD";

/** Fallback USD-based rates when the live feed is unavailable */
export const FALLBACK_RATES_USD: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  JPY: 149,
  AUD: 1.52,
  CAD: 1.36,
  AED: 3.67,
  CHF: 0.88,
  SGD: 1.34,
  HKD: 7.82,
  NZD: 1.66,
  CNY: 7.24,
  KRW: 1350,
  BRL: 5.05,
  MXN: 17.2,
  ZAR: 18.5,
  SEK: 10.5,
  NOK: 10.7,
  DKK: 6.85,
  PLN: 3.95,
  TRY: 32.5,
  THB: 35.5,
  PHP: 56.5,
  IDR: 15800,
  MYR: 4.7,
};

export function currencySymbol(code: string): string {
  return currencyMap[code]?.symbol ?? code;
}

export function convertAmount(
  amount: number,
  from: string,
  to: string,
  ratesUsd: Record<string, number>
): number {
  const fromRate = ratesUsd[from];
  const toRate = ratesUsd[to];
  if (!fromRate || !toRate) return NaN;
  // rates are "units of currency per 1 USD"
  const usd = amount / fromRate;
  return usd * toRate;
}
