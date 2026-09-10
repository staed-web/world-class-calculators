"use client";

import { useMemo, useState } from "react";
import { useCurrency } from "./CurrencyProvider";
import { convertAmount, currencySymbol } from "@/lib/currency/currencies";
import { fmtMoney, fmtNumber } from "@/lib/format";

export function LiveCurrencyConverter() {
  const { rates, currencies, source, fetchedAt, disclaimer, usingFallback, loading } =
    useCurrency();
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const result = useMemo(() => {
    const n = Number(String(amount).replace(/,/g, ""));
    if (!Number.isFinite(n)) return null;
    const converted = convertAmount(n, from, to, rates);
    if (!Number.isFinite(converted)) return null;
    const rate = convertAmount(1, from, to, rates);
    return { converted, rate, amount: n };
  }, [amount, from, to, rates]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-4 rounded-2xl surface-card glass-card p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Convert
          </h2>
          <p className="text-xs text-muted">
            {loading ? "Loading rates…" : usingFallback ? "Fallback rates" : "Live feed"}
          </p>
        </div>

        <div>
          <label htmlFor="fx-amount" className="mb-1 block text-sm font-medium">
            Amount
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
              {currencySymbol(from)}
            </span>
            <input
              id="fx-amount"
              type="number"
              min={0}
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] items-end">
          <div>
            <label htmlFor="fx-from" className="mb-1 block text-sm font-medium">
              From
            </label>
            <select
              id="fx-from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={swap}
            className="mb-0.5 h-10 w-10 shrink-0 rounded-xl border border-border bg-card text-sm font-bold hover:border-brand"
            aria-label="Swap currencies"
            title="Swap"
          >
            ⇄
          </button>
          <div>
            <label htmlFor="fx-to" className="mb-1 block text-sm font-medium">
              To
            </label>
            <select
              id="fx-to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xs text-muted leading-relaxed">
          Source: {source}
          {fetchedAt ? ` · as of ${new Date(fetchedAt).toLocaleString()}` : ""}.{" "}
          {disclaimer}
        </p>
      </div>

      <div className="lg:col-span-2">
        <div className="result-panel rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/95 via-white to-indigo-50/40 p-6 shadow-sm dark:border-teal-900 dark:from-teal-950/50 dark:via-card dark:to-indigo-950/30">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">
            Results
          </h2>
          {result ? (
            <dl className="space-y-3">
              <div>
                <dt className="text-xs text-muted">Converted amount</dt>
                <dd className="text-2xl font-bold text-foreground tracking-tight">
                  {fmtMoney(result.converted, to)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Exchange rate</dt>
                <dd className="text-sm font-semibold">
                  1 {from} = {fmtNumber(result.rate, 6)} {to}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Inverse</dt>
                <dd className="text-sm">
                  1 {to} = {fmtNumber(1 / result.rate, 6)} {from}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-muted">Enter a valid amount to convert.</p>
          )}
        </div>
      </div>
    </div>
  );
}
