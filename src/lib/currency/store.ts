import { DEFAULT_CURRENCY } from "./currencies";

/** Client-side format currency used by fmtMoney when no explicit currency is passed. */
let activeCurrency = DEFAULT_CURRENCY;

export function getFormatCurrency(): string {
  return activeCurrency;
}

export function setFormatCurrency(code: string): void {
  if (code) activeCurrency = code;
}
