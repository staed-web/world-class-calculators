"use client";

import { useCurrency } from "./CurrencyProvider";

export function CurrencyPicker({
  compact = false,
  className = "",
  id,
}: {
  compact?: boolean;
  className?: string;
  id?: string;
}) {
  const { currency, setCurrency, currencies, loading } = useCurrency();

  return (
    <label
      className={`inline-flex items-center gap-1.5 ${className}`}
      title="Display currency for money results"
    >
      {!compact && (
        <span className="text-xs font-medium text-muted hidden sm:inline">Currency</span>
      )}
      <select
        id={id}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        disabled={loading && currencies.length === 0}
        aria-label="Select display currency"
        className={
          compact
            ? "h-10 max-w-[4.6rem] sm:max-w-[6.25rem] rounded-xl border border-border bg-card px-1.5 text-[11px] sm:text-xs font-semibold text-foreground transition hover:border-brand focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            : "h-9 max-w-[7.5rem] rounded-xl border border-border bg-card px-2 text-xs font-semibold text-foreground transition hover:border-brand focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        }
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {compact ? c.code : `${c.symbol} ${c.code}`}
          </option>
        ))}
      </select>
    </label>
  );
}
