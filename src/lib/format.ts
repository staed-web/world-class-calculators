export function parseNum(v: string | undefined | null): number {
  if (v === undefined || v === null || v === "") return NaN;
  const n = Number(String(v).replace(/,/g, "").trim());
  return n;
}

export function fmtMoney(n: number, currency = "USD", digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(n);
  } catch {
    return `$${n.toFixed(digits)}`;
  }
}

export function fmtNumber(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: Number.isInteger(n) ? 0 : Math.min(digits, 2),
  }).format(n);
}

export function fmtPercent(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return `${fmtNumber(n, digits)}%`;
}

export function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function round(n: number, digits = 2): number {
  const p = 10 ** digits;
  return Math.round(n * p) / p;
}
