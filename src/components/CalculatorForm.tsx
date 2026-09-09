"use client";

import { useMemo, useState } from "react";
import type { ResultItem } from "@/lib/types";
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
  const [, setSubmitted] = useState(false);

  const display = useMemo(() => {
    if (!calc?.compute) return null;
    return calc.compute(values);
  }, [calc, values]);

  if (!calc) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800">
        Calculator not found.
      </div>
    );
  }

  function setField(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
    setSubmitted(true);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const output = display;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <form
        onSubmit={onSubmit}
        className="lg:col-span-3 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {fields.map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className="mb-1 block text-sm font-medium text-slate-700">
              {f.label}
            </label>
            {f.type === "select" ? (
              <select
                id={f.id}
                value={values[f.id] ?? ""}
                onChange={(e) => setField(f.id, e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
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
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            ) : (
              <div className="relative">
                {f.prefix && (
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
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
                  className={`w-full rounded-xl border border-slate-200 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 ${
                    f.prefix ? "pl-7 pr-3" : f.suffix ? "pl-3 pr-14" : "px-3"
                  }`}
                />
                {f.suffix && (
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    {f.suffix}
                  </span>
                )}
              </div>
            )}
            {f.helpText && <p className="mt-1 text-xs text-slate-400">{f.helpText}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition"
        >
          Calculate
        </button>
      </form>

      <div className="lg:col-span-2">
        <ResultsPanel output={output} />
        {calc.formulaNote && (
          <p className="mt-3 text-xs text-slate-500">{calc.formulaNote}</p>
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
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-400">
        Enter values and calculate to see results.
      </div>
    );
  }
  if ("error" in output) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800">
        {output.error}
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-800 mb-3">
        Results
      </h2>
      <dl className="space-y-3">
        {output.map((item) => (
          <div key={item.label}>
            <dt className="text-xs text-slate-500">{item.label}</dt>
            <dd
              className={
                item.emphasize
                  ? "text-xl font-bold text-slate-900"
                  : "text-base font-medium text-slate-800"
              }
            >
              {item.value}
            </dd>
            {item.hint && <p className="text-xs text-slate-400">{item.hint}</p>}
          </div>
        ))}
      </dl>
    </div>
  );
}
