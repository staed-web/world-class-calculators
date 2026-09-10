"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CommoditiesPayload, CommodityQuote } from "@/lib/commodities/types";
import {
  GRAMS_PER_TROY_OZ,
  gramsToTroyOz,
  type CommodityId,
} from "@/lib/commodities/constants";
import { fmtMoney, fmtNumber } from "@/lib/format";

type Mode = "spot" | "metal-value" | "jewelry-melt" | "commodity-unit";

const METAL_IDS: CommodityId[] = ["gold", "silver", "platinum", "palladium"];

function formatUpdated(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " IST";
  } catch {
    return iso;
  }
}

export function LiveCommoditiesCalculator({ mode }: { mode: Mode }) {
  const [data, setData] = useState<CommoditiesPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [metal, setMetal] = useState<CommodityId>("gold");
  const [weight, setWeight] = useState("10");
  const [weightUnit, setWeightUnit] = useState<"g" | "oz" | "kg" | "lb">("g");
  const [purity, setPurity] = useState("916"); // 22K
  const [commodity, setCommodity] = useState<CommodityId>("gold");
  const [qty, setQty] = useState("1");

  const applyPayload = useCallback((json: CommoditiesPayload) => {
    setData(json);
    if (!json.ok) {
      setFetchError(
        json.errors?.length
          ? json.errors.join("; ")
          : "Live feed temporarily unavailable."
      );
    } else {
      setFetchError(null);
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/commodities", { cache: "no-store" });
      const json = (await res.json()) as CommoditiesPayload;
      applyPayload(json);
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : "Network error fetching prices.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [applyPayload]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/commodities", { cache: "no-store" });
        const json = (await res.json()) as CommoditiesPayload;
        if (cancelled) return;
        applyPayload(json);
      } catch (e) {
        if (cancelled) return;
        setFetchError(e instanceof Error ? e.message : "Network error fetching prices.");
        setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [applyPayload]);

  const byId = useMemo(() => {
    const m = new Map<CommodityId, CommodityQuote>();
    for (const q of data?.quotes ?? []) m.set(q.id, q);
    return m;
  }, [data]);

  const selectedMetal = byId.get(metal);
  const selectedCommodity = byId.get(commodity);

  const metalValue = useMemo(() => {
    if (!selectedMetal) return null;
    const w = Number(weight);
    if (!Number.isFinite(w) || w < 0) return null;
    let troyOz = 0;
    if (weightUnit === "g") troyOz = gramsToTroyOz(w);
    else if (weightUnit === "oz") troyOz = w;
    else if (weightUnit === "kg") troyOz = gramsToTroyOz(w * 1000);
    else troyOz = w; // treat lb as troy lb approximation note — for precious metals prefer g/oz
    // For copper (lb quote) handled in commodity-unit mode
    const pureFraction = 1;
    const value = selectedMetal.price * troyOz * pureFraction;
    return { troyOz, value, perGram: selectedMetal.price / GRAMS_PER_TROY_OZ };
  }, [selectedMetal, weight, weightUnit]);

  const jewelryValue = useMemo(() => {
    if (!selectedMetal) return null;
    const w = Number(weight);
    const pur = Number(purity);
    if (!Number.isFinite(w) || w < 0 || !Number.isFinite(pur) || pur <= 0 || pur > 1000) {
      return null;
    }
    const grams = weightUnit === "g" ? w : weightUnit === "oz" ? w * GRAMS_PER_TROY_OZ : weightUnit === "kg" ? w * 1000 : w * 453.59237;
    const fineGrams = grams * (pur / 1000);
    const troyOz = gramsToTroyOz(fineGrams);
    const value = selectedMetal.price * troyOz;
    return { fineGrams, troyOz, value, purityPct: (pur / 1000) * 100 };
  }, [selectedMetal, weight, weightUnit, purity]);

  const unitConvert = useMemo(() => {
    if (!selectedCommodity) return null;
    const q = Number(qty);
    if (!Number.isFinite(q) || q < 0) return null;
    const price = selectedCommodity.price;
    if (selectedCommodity.id === "crude_oil") {
      return {
        lines: [
          { label: "Value", value: fmtMoney(price * q) },
          { label: "Unit price", value: `${fmtMoney(price)} / barrel` },
        ],
      };
    }
    if (selectedCommodity.id === "copper") {
      const qtyNum = q;
      let lbsQty = qtyNum;
      if (weightUnit === "kg") lbsQty = qtyNum / 0.45359237;
      else if (weightUnit === "g") lbsQty = qtyNum / 453.59237;
      else if (weightUnit === "oz") lbsQty = (qtyNum * GRAMS_PER_TROY_OZ) / 453.59237;
      else lbsQty = qtyNum;
      return {
        lines: [
          { label: "Value", value: fmtMoney(price * lbsQty) },
          { label: "Unit price", value: `${fmtMoney(price)} / lb` },
          { label: "Quantity (lb)", value: fmtNumber(lbsQty, 4) },
        ],
      };
    }
    // precious metals: qty in selected weight unit
    let troyOz = q;
    if (weightUnit === "g") troyOz = gramsToTroyOz(q);
    else if (weightUnit === "kg") troyOz = gramsToTroyOz(q * 1000);
    else if (weightUnit === "lb") troyOz = gramsToTroyOz(q * 453.59237);
    return {
      lines: [
        { label: "Value", value: fmtMoney(price * troyOz) },
        { label: "Unit price", value: `${fmtMoney(price)} / troy oz` },
        { label: "Per gram", value: fmtMoney(price / GRAMS_PER_TROY_OZ) },
        { label: "Troy ounces", value: fmtNumber(troyOz, 6) },
      ],
    };
  }, [selectedCommodity, qty, weightUnit]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        <div>
          <p className="font-semibold">Live commodity feed</p>
          <p className="text-xs text-amber-800/80">
            {loading
              ? "Fetching quotes…"
              : data
                ? `Last fetched ${formatUpdated(data.fetchedAt)} · cached ~${data.revalidateSeconds / 60} min`
                : "No data"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-800"
        >
          Refresh
        </button>
      </div>

      {fetchError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          Could not load live prices: {fetchError}
          {data?.quotes?.length ? (
            <span className="block mt-1 text-rose-700">
              Showing any quotes that did load; missing symbols are omitted.
            </span>
          ) : (
            <span className="block mt-1">We do not show invented “live” numbers.</span>
          )}
        </div>
      )}

      {mode === "spot" && (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-background text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Metal / commodity</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {(data?.quotes ?? []).map((q) => (
                <tr key={q.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {q.name}{" "}
                    <span className="text-xs text-muted">({q.symbol})</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[var(--accent)] dark:text-brand">
                    {fmtMoney(q.price, q.currency, q.id === "copper" ? 4 : 2)}
                  </td>
                  <td className="px-4 py-3 text-muted">{q.quoteUnit}</td>
                  <td className="px-4 py-3 text-xs text-muted">
                    {formatUpdated(q.updatedAt)}
                    <div className="text-[10px] text-muted">{q.source}</div>
                  </td>
                </tr>
              ))}
              {!loading && !(data?.quotes?.length) && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted">
                    No quotes available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {mode === "metal-value" && (
        <div className="grid gap-6 lg:grid-cols-5">
          <form
            className="lg:col-span-3 space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <FieldSelect
              label="Metal"
              value={metal}
              onChange={(v) => setMetal(v as CommodityId)}
              options={METAL_IDS.map((id) => ({
                value: id,
                label: id.charAt(0).toUpperCase() + id.slice(1),
              }))}
            />
            <FieldNumber label="Weight" value={weight} onChange={setWeight} />
            <FieldSelect
              label="Weight unit"
              value={weightUnit}
              onChange={(v) => setWeightUnit(v as typeof weightUnit)}
              options={[
                { value: "g", label: "Grams" },
                { value: "oz", label: "Troy ounces" },
                { value: "kg", label: "Kilograms" },
              ]}
            />
            {selectedMetal && (
              <p className="text-xs text-muted">
                Spot: {fmtMoney(selectedMetal.price)} / troy oz ·{" "}
                {fmtMoney(selectedMetal.price / GRAMS_PER_TROY_OZ)} / g
              </p>
            )}
          </form>
          <Results
            items={
              metalValue && selectedMetal
                ? [
                    {
                      label: "Estimated value",
                      value: fmtMoney(metalValue.value),
                      emphasize: true,
                    },
                    { label: "Troy ounces", value: fmtNumber(metalValue.troyOz, 6) },
                    {
                      label: "Spot / oz",
                      value: fmtMoney(selectedMetal.price),
                    },
                  ]
                : null
            }
          />
        </div>
      )}

      {mode === "jewelry-melt" && (
        <div className="grid gap-6 lg:grid-cols-5">
          <form
            className="lg:col-span-3 space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <FieldSelect
              label="Metal"
              value={metal}
              onChange={(v) => setMetal(v as CommodityId)}
              options={METAL_IDS.map((id) => ({
                value: id,
                label: id.charAt(0).toUpperCase() + id.slice(1),
              }))}
            />
            <FieldNumber label="Gross weight" value={weight} onChange={setWeight} />
            <FieldSelect
              label="Weight unit"
              value={weightUnit}
              onChange={(v) => setWeightUnit(v as typeof weightUnit)}
              options={[
                { value: "g", label: "Grams" },
                { value: "oz", label: "Troy ounces" },
              ]}
            />
            <FieldSelect
              label="Purity (fineness / 1000)"
              value={purity}
              onChange={setPurity}
              options={[
                { value: "999", label: "24K / .999 fine" },
                { value: "916", label: "22K / .916" },
                { value: "750", label: "18K / .750" },
                { value: "585", label: "14K / .585" },
                { value: "417", label: "10K / .417" },
                { value: "925", label: "Sterling silver .925" },
              ]}
            />
            <p className="text-xs text-muted">
              Melt-ish estimate = fine metal content × spot. Dealers pay less after fees,
              stones, and workmanship — educational only.
            </p>
          </form>
          <Results
            items={
              jewelryValue && selectedMetal
                ? [
                    {
                      label: "Melt-ish estimate",
                      value: fmtMoney(jewelryValue.value),
                      emphasize: true,
                    },
                    {
                      label: "Fine metal",
                      value: `${fmtNumber(jewelryValue.fineGrams, 4)} g (${fmtNumber(jewelryValue.purityPct, 1)}%)`,
                    },
                    { label: "Fine troy oz", value: fmtNumber(jewelryValue.troyOz, 6) },
                    { label: "Spot / oz", value: fmtMoney(selectedMetal.price) },
                  ]
                : null
            }
          />
        </div>
      )}

      {mode === "commodity-unit" && (
        <div className="grid gap-6 lg:grid-cols-5">
          <form
            className="lg:col-span-3 space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <FieldSelect
              label="Commodity"
              value={commodity}
              onChange={(v) => setCommodity(v as CommodityId)}
              options={(data?.quotes ?? []).map((q) => ({
                value: q.id,
                label: `${q.name} (${q.quoteUnit})`,
              }))}
            />
            <FieldNumber
              label={commodity === "crude_oil" ? "Barrels" : "Quantity"}
              value={qty}
              onChange={setQty}
            />
            {commodity !== "crude_oil" && (
              <FieldSelect
                label="Unit"
                value={weightUnit}
                onChange={(v) => setWeightUnit(v as typeof weightUnit)}
                options={
                  commodity === "copper"
                    ? [
                        { value: "lb", label: "Pounds" },
                        { value: "kg", label: "Kilograms" },
                        { value: "g", label: "Grams" },
                      ]
                    : [
                        { value: "g", label: "Grams" },
                        { value: "oz", label: "Troy ounces" },
                        { value: "kg", label: "Kilograms" },
                      ]
                }
              />
            )}
          </form>
          <Results
            items={
              unitConvert
                ? unitConvert.lines.map((l, i) => ({
                    label: l.label,
                    value: l.value,
                    emphasize: i === 0,
                  }))
                : null
            }
          />
        </div>
      )}

      {data?.disclaimer && (
        <p className="text-xs text-muted">{data.disclaimer}</p>
      )}
    </div>
  );
}

function FieldNumber({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      />
    </div>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Results({
  items,
}: {
  items: Array<{ label: string; value: string; emphasize?: boolean }> | null;
}) {
  if (!items) {
    return (
      <div className="lg:col-span-2 rounded-xl border border-dashed border-border bg-background p-6 text-sm text-muted">
        Enter values to see results (requires a live quote).
      </div>
    );
  }
  return (
    <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--accent)] dark:text-brand">
        Results
      </h2>
      <dl className="space-y-3">
        {items.map((item) => (
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
          </div>
        ))}
      </dl>
    </div>
  );
}
