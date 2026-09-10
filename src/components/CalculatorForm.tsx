"use client";

import { useMemo, useState } from "react";
import type { FieldDef, ResultChartBar, ResultItem, ResultTable } from "@/lib/types";
import { getCalculator } from "@/lib/calculators/registry";
import { ResultLineChartView } from "@/components/charts/ResultLineChart";
import { AnimatedNumber } from "@/components/charts/AnimatedNumber";
import { useCurrency } from "./CurrencyProvider";
import { CurrencyPicker } from "./CurrencyPicker";

function FieldControl({
  f,
  values,
  setField,
  fieldPrefix,
  inputClass,
}: {
  f: FieldDef;
  values: Record<string, string>;
  setField: (id: string, value: string) => void;
  fieldPrefix: (prefix?: string) => string | undefined;
  inputClass: string;
}) {
  const prefix = fieldPrefix(f.prefix);
  const labelUnit =
    f.suffix && !f.label.includes(`(${f.suffix})`) && !f.label.includes(f.suffix)
      ? ` (${f.suffix})`
      : "";
  const isRequired = f.required === true;
  return (
    <div key={f.id}>
      <label htmlFor={f.id} className="mb-1.5 block text-sm font-medium text-foreground">
        {f.label}
        {labelUnit && !f.suffix ? (
          <span className="text-muted font-normal">{labelUnit}</span>
        ) : null}
      </label>
      {f.type === "select" ? (
        <select
          id={f.id}
          value={values[f.id] ?? ""}
          onChange={(e) => setField(f.id, e.target.value)}
          className={`${inputClass} px-3`}
          required={isRequired}
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
          className={`${inputClass} px-3`}
          required={isRequired}
        />
      ) : (
        <div className="relative">
          {prefix && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm font-medium">
              {prefix}
            </span>
          )}
          <input
            id={f.id}
            type={f.type}
            inputMode={f.type === "number" ? "decimal" : undefined}
            value={values[f.id] ?? ""}
            onChange={(e) => setField(f.id, e.target.value)}
            min={f.min}
            max={f.max}
            step={f.step ?? "any"}
            placeholder={f.placeholder}
            required={isRequired}
            className={`${inputClass} ${
              prefix ? "pl-9 pr-3" : f.suffix ? "pl-3 pr-14" : "px-3"
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
  );
}

function isFieldVisible(f: FieldDef, values: Record<string, string>): boolean {
  if (!f.visibleWhen) return true;
  const dep = values[f.visibleWhen.field] ?? "";
  return f.visibleWhen.in.includes(dep);
}

export function CalculatorForm({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const calc = getCalculator(category, slug);
  const fields = calc?.fields ?? [];
  const { symbol, currency } = useCurrency();
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
  const hasAdvanced = fields.some((f) => f.advanced);
  const [showAdvanced, setShowAdvanced] = useState(() => {
    // Open if any advanced default is non-default-ish for daily compound-style tools
    return false;
  });

  const usesMoney = Boolean(
    calc?.usesMoney ||
      fields.some((f) => f.prefix === "$" || f.money) ||
      category === "finance" ||
      category === "business"
  );

  const display = useMemo(() => {
    if (!calc?.compute || !showResults) return null;
    void currency;
    return calc.compute(values);
  }, [calc, values, showResults, currency]);

  if (!calc) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
        Calculator not found. Try searching from the home page.
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
    document.getElementById("calc-results")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  function onLoadExample() {
    const init: Record<string, string> = {};
    for (const f of fields) {
      init[f.id] =
        f.defaultValue !== undefined && f.defaultValue !== null
          ? String(f.defaultValue)
          : "";
    }
    setValues(init);
    setShowResults(true);
    if (hasAdvanced) setShowAdvanced(true);
  }

  function onReset() {
    const init: Record<string, string> = {};
    for (const f of fields) {
      init[f.id] = "";
    }
    setValues(init);
    setShowResults(false);
  }

  const output = display;

  function fieldPrefix(prefix?: string): string | undefined {
    if (!prefix) return undefined;
    if (prefix === "$") return symbol;
    return prefix;
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-card py-3 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)] min-h-11";

  const primaryFields = fields.filter((f) => !f.advanced && isFieldVisible(f, values));
  const advancedFields = fields.filter((f) => f.advanced && isFieldVisible(f, values));
  const advancedActiveCount = advancedFields.filter((f) => {
    const def =
      f.defaultValue !== undefined && f.defaultValue !== null
        ? String(f.defaultValue)
        : "";
    const cur = values[f.id] ?? "";
    if (f.type === "select") {
      // highlight when not the “none/no” style defaults
      if (["none", "no"].includes(def) && cur !== def) return true;
      return false;
    }
    return cur !== "" && cur !== def;
  }).length;

  return (
    <div className="grid gap-6 lg:grid-cols-5 min-w-0 w-full">
      <form
        onSubmit={onSubmit}
        className="lg:col-span-3 space-y-4 rounded-2xl surface-card glass-card p-4 sm:p-6 min-w-0 w-full"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Inputs
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Results update as you type — keep the essentials filled first
            </p>
          </div>
          {usesMoney && (
            <CurrencyPicker id={`currency-${slug}`} className="no-print" />
          )}
        </div>

        {primaryFields.map((f) => (
          <FieldControl
            key={f.id}
            f={f}
            values={values}
            setField={setField}
            fieldPrefix={fieldPrefix}
            inputClass={inputClass}
          />
        ))}

        {hasAdvanced && (
          <div className="rounded-xl border border-border/80 bg-background/40 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced((s) => !s)}
              className="flex w-full min-h-12 items-center justify-between gap-3 px-3.5 py-3 text-left text-sm font-semibold text-foreground hover:bg-card/60 transition"
              aria-expanded={showAdvanced}
            >
              <span className="flex flex-wrap items-center gap-2">
                More options
                {advancedActiveCount > 0 && (
                  <span className="inline-flex rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-semibold text-teal-900 dark:bg-teal-950/60 dark:text-teal-100">
                    {advancedActiveCount} adjusted
                  </span>
                )}
              </span>
              <span className="text-muted" aria-hidden>
                {showAdvanced ? "▾" : "▸"}
              </span>
            </button>
            {showAdvanced && (
              <div className="space-y-4 border-t border-border/70 px-3.5 pb-4 pt-3">
                <p className="text-xs text-muted">
                  Optional extras stay collapsed so the main form stays simple.
                  Open this when you need finer control.
                </p>
                {advancedFields.length === 0 ? (
                  <p className="text-xs text-muted">
                    No extra fields for the current mode.
                  </p>
                ) : (
                  advancedFields.map((f) => (
                    <FieldControl
                      key={f.id}
                      f={f}
                      values={values}
                      setField={setField}
                      fieldPrefix={fieldPrefix}
                      inputClass={inputClass}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        )}

        <div className="sticky bottom-3 z-10 flex flex-wrap gap-2 pt-2 no-print safe-pb">
          <button
            type="submit"
            className="flex-1 min-h-12 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={onLoadExample}
            className="min-h-12 rounded-xl border border-teal-200/80 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-900 hover:border-teal-400 transition dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-100"
            title="Load the demo numbers from this tool’s worked example"
          >
            Try example
          </button>
          <button
            type="button"
            onClick={onReset}
            className="min-h-12 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground hover:border-brand transition"
          >
            Reset
          </button>
        </div>
      </form>

      <div id="calc-results" className="lg:col-span-2 space-y-3 scroll-mt-28 min-w-0 w-full">
        <ResultsPanel
          output={output}
          currency={usesMoney ? currency : undefined}
          calcName={calc.name}
        />
        {calc.formulaNote && (
          <details className="rounded-2xl border border-border bg-card p-4 text-sm">
            <summary className="cursor-pointer font-semibold text-foreground min-h-11 flex items-center">
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

function summarizeResults(
  output: ResultItem[],
  calcName: string,
  currency?: string
): string {
  const lines = [
    `${calcName} — MyCalcsWorld`,
    currency ? `Currency: ${currency}` : null,
    ...output.map((item) => `${item.label}: ${item.value}${item.hint ? ` (${item.hint})` : ""}`),
    "",
    "Educational estimate only — not professional advice.",
    "https://mycalcsworld.online",
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

function partitionResults(output: ResultItem[]) {
  const primary: ResultItem[] = [];
  const secondary: ResultItem[] = [];
  const visuals: ResultItem[] = [];
  const notes: ResultItem[] = [];
  for (const item of output) {
    const hasVisual = Boolean(item.chart?.length || item.lineChart || item.table);
    const isNote =
      /disclaimer|note|warning/i.test(item.label) ||
      (/illustrative|not investment|not professional/i.test(item.value) && !item.emphasize);
    if (isNote && !hasVisual) {
      notes.push(item);
    } else if (hasVisual) {
      visuals.push(item);
    } else if (item.emphasize) {
      primary.push(item);
    } else {
      secondary.push(item);
    }
  }
  return { primary, secondary, visuals, notes };
}

function ResultsPanel({
  output,
  currency,
  calcName,
}: {
  output: ResultItem[] | { error: string } | null;
  currency?: string;
  calcName: string;
}) {
  const [copied, setCopied] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  if (!output) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/60 p-6 text-sm text-muted text-center">
        <p className="font-medium text-foreground mb-1">Your results will show here</p>
        <p>
          Fill the main inputs — the panel updates live. On a phone, tap{" "}
          <span className="font-semibold text-foreground">Calculate</span> to jump to
          this panel.
        </p>
        <p className="mt-2 text-xs">
          Not sure where to start? Tap{" "}
          <span className="font-semibold text-foreground">Try example</span> for demo
          numbers that match the worked example below.
        </p>
      </div>
    );
  }
  if ("error" in output) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-amber-300/80 bg-amber-50/90 p-5 sm:p-6 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
      >
        <p className="font-semibold text-amber-950 dark:text-amber-50 mb-1">
          Almost there — check a few inputs
        </p>
        <p>{output.error}</p>
        <p className="mt-3 text-xs opacity-90">
          Tip: blank optional fields are fine when labeled optional; required numbers
          need digits only. Then tap Calculate again.
        </p>
      </div>
    );
  }

  async function copySummary() {
    const text = summarizeResults(output as ResultItem[], calcName, currency);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setShareMsg("Copy blocked — select the results and copy manually.");
      setTimeout(() => setShareMsg(""), 3000);
    }
  }

  async function shareSummary() {
    const text = summarizeResults(output as ResultItem[], calcName, currency);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: calcName, text });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }
    await copySummary();
  }

  const { primary, secondary, visuals, notes } = partitionResults(output);

  return (
    <div
      id="print-results"
      className="result-panel rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/95 via-white to-indigo-50/40 p-4 sm:p-6 shadow-sm backdrop-blur-sm dark:border-teal-900 dark:from-teal-950/50 dark:via-card dark:to-indigo-950/30 min-w-0 overflow-hidden"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">
          Results{currency ? ` · ${currency}` : ""}
        </h2>
        <div className="no-print flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={copySummary}
            className="inline-flex min-h-9 items-center rounded-lg border border-teal-200/80 bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-teal-800 hover:bg-white dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-200"
            aria-label="Copy results summary"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <button
            type="button"
            onClick={shareSummary}
            className="inline-flex min-h-9 items-center rounded-lg border border-teal-200/80 bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-teal-800 hover:bg-white dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-200"
            aria-label="Share results summary"
          >
            Share
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-9 items-center rounded-lg border border-teal-200/80 bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-teal-800 hover:bg-white dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-200"
            aria-label="Print results"
          >
            Print
          </button>
        </div>
      </div>
      {shareMsg && (
        <p className="mb-2 text-xs text-amber-800 dark:text-amber-200" role="status">
          {shareMsg}
        </p>
      )}

      {primary.length > 0 && (
        <div className="space-y-2.5 mb-4">
          {primary.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-teal-300/80 bg-white/85 px-3.5 py-3 shadow-sm dark:border-teal-800 dark:bg-teal-950/40"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-800/80 dark:text-teal-300/90">
                {item.label}
              </p>
              <div className="mt-0.5 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                <AnimatedNumber value={item.value} emphasize />
              </div>
              {item.hint && <p className="mt-1 text-xs text-muted">{item.hint}</p>}
            </div>
          ))}
        </div>
      )}

      {secondary.length > 0 && (
        <dl className="grid gap-2.5 sm:grid-cols-2 mb-4">
          {secondary.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border/70 bg-white/50 px-3 py-2.5 dark:bg-white/5"
            >
              <dt className="text-xs text-muted">{item.label}</dt>
              <dd className="mt-0.5">
                <AnimatedNumber value={item.value} />
              </dd>
              {item.hint && <p className="text-xs text-muted">{item.hint}</p>}
            </div>
          ))}
        </dl>
      )}

      {visuals.length > 0 && (
        <div className="space-y-4 mb-3">
          {visuals.map((item) => (
            <div key={item.label} className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {item.label}
                {item.value ? (
                  <span className="ml-1 font-normal normal-case text-muted/80">
                    · {item.value}
                  </span>
                ) : null}
              </p>
              {item.hint && <p className="text-xs text-muted mb-1">{item.hint}</p>}
              {item.chart && item.chart.length > 0 && (
                <div className="mt-2">
                  <MiniBars data={item.chart} />
                </div>
              )}
              {item.lineChart && (
                <div className="mt-2 overflow-x-auto">
                  <div className="min-w-[260px]">
                    <ResultLineChartView data={item.lineChart} variant="area" />
                  </div>
                </div>
              )}
              {item.table && (
                <div className="mt-2">
                  <ResultTableView table={item.table} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {notes.length > 0 && (
        <div className="space-y-2 border-t border-border/60 pt-3">
          {notes.map((item) => (
            <div key={item.label} className="text-xs text-muted">
              <span className="font-semibold text-foreground/80">{item.label}: </span>
              {item.value}
              {item.hint ? ` — ${item.hint}` : ""}
            </div>
          ))}
        </div>
      )}
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
    <div className="table-scroll mt-3 rounded-xl border border-border">
      <table className="min-w-full text-left text-xs">
        <thead className="bg-slate-50 dark:bg-slate-900/60">
          <tr>
            {table.headers.map((h) => (
              <th key={h} className="px-2 py-2 font-semibold text-muted whitespace-nowrap">
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
