"use client";

import { useMemo, useState } from "react";
import type { ResultChartBar, ResultItem, ResultTable } from "@/lib/types";
import { getCalculator } from "@/lib/calculators/registry";

export function CalculatorForm({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const calc = getCalculator(category, slug);
  const fields = calc?.fields ?? [];
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of fields) {
      init[f.id] =
        f.defaultValue !== undefined && f.defaultValue !== null
          ? String(f.defaultValue)
          : "";
    }
    return init;
  });
  const [showResults, setShowResults] = useState(true);

  const display = useMemo(() => {
    if (!calc?.compute || !showResults) return null;
    return calc.compute(values);
  }, [calc, values, showResults]);

  if (!calc) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
        Calculator not found.
      </div>
    );
  }

  function setField(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
    setShowResults(true);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowResults(true);
  }

  function onReset() {
    const init: Record<string, string> = {};
    for (const f of fields) {
      init[f.id] =
        f.defaultValue !== undefined && f.defaultValue !== null
          ? String(f.defaultValue)
          : "";
    }
    setValues(init);
    setShowResults(true);
  }

  const output = display;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <form
        onSubmit={onSubmit}
        className="lg:col-span-3 space-y-4 rounded-2xl surface-card p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Inputs
          </h2>
          <p className="text-xs text-muted">Live results as you type</p>
        </div>
        {fields.map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className="mb-1 block text-sm font-medium text-foreground">
              {f.label}
            </label>
            {f.type === "select" ? (
              <select
                id={f.id}
                value={values[f.id] ?? ""}
                onChange={(e) => setField(f.id, e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                {f.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea
                id={f.id}
                value={values[f.id] ?? ""}
                onChange={(e) => setField(f.id, e.target.value)}
                rows={4}
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              />
            ) : (
              <div className="relative">
                {f.prefix && (
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">
                    {f.prefix}
                  </span>
                )}
                <input
                  id={f.id}
                  type={f.type}
                  value={values[f.id] ?? ""}
                  onChange={(e) => setField(f.id, e.target.value)}
                  min={f.min}
                  max={f.max}
                  step={f.step ?? "any"}
                  placeholder={f.placeholder}
                  className={`w-full rounded-xl border border-border bg-card py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)] ${
                    f.prefix ? "pl-7 pr-3" : f.suffix ? "pl-3 pr-14" : "px-3"
                  }`}
                />
                {f.suffix && (
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm">
                    {f.suffix}
                  </span>
                )}
              </div>
            )}
            {f.helpText && <p className="mt-1 text-xs text-muted">{f.helpText}</p>}
          </div>
        ))}
        <div className="sticky bottom-3 flex gap-2 pt-2 no-print">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-brand py-3 text-sm font-semibold text-white hover:opacity-90 transition"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground hover:border-brand"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="lg:col-span-2 space-y-3">
        <ResultsPanel output={output} />
        {calc.formulaNote && (
          <details className="rounded-2xl border border-border bg-card p-4 text-sm">
            <summary className="cursor-pointer font-semibold text-foreground">
              Formula / how it works
            </summary>
            <p className="mt-2 text-muted leading-relaxed whitespace-pre-wrap">
              {calc.formulaNote}
            </p>
          </details>
        )}
      </div>
    </div>
  );
}

function ResultsPanel({
  output,
}: {
  output: ResultItem[] | { error: string } | null;
}) {
  if (!output) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/60 p-6 text-sm text-muted">
        Enter values to see results.
      </div>
    );
  }
  if ("error" in output) {
    return (
      <div className="rounded-2xl border border-rose-300 bg-rose-50 p-6 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
        {output.error}
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50 to-white p-6 shadow-sm dark:border-teal-900 dark:from-teal-950/40 dark:to-card">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">
          Results
        </h2>
        <button
          type="button"
          onClick={() => window.print()}
          className="no-print text-xs font-medium text-teal-700 hover:underline dark:text-teal-300"
        >
          Print / Share
        </button>
      </div>
      <dl className="space-y-3">
        {output.map((item) => (
          <div key={item.label}>
            <dt className="text-xs text-muted">{item.label}</dt>
            <dd
              className={
                item.emphasize
                  ? "text-xl font-bold text-foreground"
                  : "text-base font-medium text-foreground"
              }
            >
              {item.value}
            </dd>
            {item.hint && <p className="text-xs text-muted">{item.hint}</p>}
            {item.chart && item.chart.length > 0 && <MiniBars data={item.chart} />}
            {item.table && <ResultTableView table={item.table} />}
          </div>
        ))}
      </dl>
    </div>
  );
}

function MiniBars({ data }: { data: ResultChartBar[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="mt-3 space-y-1" aria-hidden>
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2 text-[10px] text-muted">
          <span className="w-8 shrink-0">{d.label}</span>
          <div className="h-2 flex-1 rounded-full bg-teal-100 dark:bg-teal-950">
            <div
              className="h-2 rounded-full bg-teal-500"
              style={{ width: `${Math.max(2, (d.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ResultTableView({ table }: { table: ResultTable }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-left text-xs">
        <thead className="bg-slate-50 dark:bg-slate-900/60">
          <tr>
            {table.headers.map((h) => (
              <th key={h} className="px-2 py-1.5 font-semibold text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t border-border odd:bg-white/40 dark:odd:bg-white/5">
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-1.5 whitespace-nowrap text-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
