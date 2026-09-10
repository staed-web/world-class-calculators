"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { compoundingSchedule } from "@/lib/formulas/finance";
import { cylinderGeometry, pythagorean3d, sphereGeometry } from "@/lib/formulas/wave2";
import { fmtMoney, fmtNumber } from "@/lib/format";
import { ResultLineChartView } from "@/components/charts/ResultLineChart";

const FunctionSurfaceViz = dynamic(
  () => import("./FunctionSurface").then((m) => m.FunctionSurfaceViz),
  { ssr: false, loading: () => <VizSkeleton /> }
);
const Pythagoras3DViz = dynamic(
  () => import("./Pythagoras3D").then((m) => m.Pythagoras3DViz),
  { ssr: false, loading: () => <VizSkeleton /> }
);
const Sphere3DViz = dynamic(
  () => import("./SphereCylinder3D").then((m) => m.Sphere3DViz),
  { ssr: false, loading: () => <VizSkeleton /> }
);
const Cylinder3DViz = dynamic(
  () => import("./SphereCylinder3D").then((m) => m.Cylinder3DViz),
  { ssr: false, loading: () => <VizSkeleton /> }
);
const CompoundBars3DViz = dynamic(
  () => import("./CompoundBars3D").then((m) => m.CompoundBars3DViz),
  { ssr: false, loading: () => <VizSkeleton /> }
);

function VizSkeleton() {
  return (
    <div className="flex h-72 items-center justify-center rounded-2xl border border-border bg-card text-sm text-muted">
      Loading interactive 3D…
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  suffix,
  step = "any",
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
  step?: string | number;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-foreground">{label}</span>
      <div className="relative">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-3 pr-12 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function Results({ items }: { items: Array<{ label: string; value: string; emphasize?: boolean }> }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] dark:text-brand">
        Results
      </h3>
      <dl className="space-y-2">
        {items.map((it) => (
          <div key={it.label}>
            <dt className="text-xs text-muted">{it.label}</dt>
            <dd className={it.emphasize ? "text-xl font-bold" : "text-base font-medium"}>{it.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Function3DCalculator() {
  const [mode, setMode] = useState<"ripple" | "saddle" | "gaussian">("ripple");
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-4 rounded-2xl surface-card p-6 lg:col-span-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Surface</h2>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Function family</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as typeof mode)}
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm"
          >
            <option value="ripple">z = sin(r)·e^(−r) ripple</option>
            <option value="saddle">z = x² − y² saddle</option>
            <option value="gaussian">z = e^(−(x²+y²)) bump</option>
          </select>
        </label>
        <p className="text-sm text-muted leading-relaxed">
          Drag to orbit the mesh. Built with Three.js / React Three Fiber and lazy-loaded so the rest of the site stays fast.
        </p>
      </div>
      <div className="lg:col-span-3 space-y-4">
        <FunctionSurfaceViz mode={mode} />
        <Results
          items={[
            { label: "Mode", value: mode, emphasize: true },
            { label: "Engine", value: "react-three-fiber + drei" },
          ]}
        />
      </div>
    </div>
  );
}

export function Pythagoras3DCalculator() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [c, setC] = useState(12);
  const r = pythagorean3d(a, b, c);
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-4 rounded-2xl surface-card p-6 lg:col-span-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Dimensions</h2>
        <Field label="Side a" value={a} onChange={setA} min={0.1} />
        <Field label="Side b" value={b} onChange={setB} min={0.1} />
        <Field label="Side c (depth)" value={c} onChange={setC} min={0.1} />
      </div>
      <div className="lg:col-span-3 space-y-4">
        <Pythagoras3DViz a={a} b={b} c={c} />
        <Results
          items={[
            { label: "Face hypotenuse", value: fmtNumber(r.hypotenuse2d, 6) },
            { label: "Space diagonal", value: fmtNumber(r.spaceDiagonal ?? NaN, 6), emphasize: true },
          ]}
        />
      </div>
    </div>
  );
}

export function Sphere3DCalculator() {
  const [radius, setRadius] = useState(2);
  const g = sphereGeometry(radius);
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-4 rounded-2xl surface-card p-6 lg:col-span-2">
        <Field label="Radius" value={radius} onChange={setRadius} min={0.1} step={0.1} />
      </div>
      <div className="lg:col-span-3 space-y-4">
        <Sphere3DViz radius={radius} />
        <Results
          items={[
            { label: "Volume", value: fmtNumber(g.volume, 6), emphasize: true },
            { label: "Surface area", value: fmtNumber(g.surface, 6) },
            { label: "Diameter", value: fmtNumber(g.diameter, 4) },
          ]}
        />
      </div>
    </div>
  );
}

export function Cylinder3DCalculator() {
  const [radius, setRadius] = useState(2);
  const [height, setHeight] = useState(5);
  const g = cylinderGeometry(radius, height);
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-4 rounded-2xl surface-card p-6 lg:col-span-2">
        <Field label="Radius" value={radius} onChange={setRadius} min={0.1} step={0.1} />
        <Field label="Height" value={height} onChange={setHeight} min={0.1} step={0.1} />
      </div>
      <div className="lg:col-span-3 space-y-4">
        <Cylinder3DViz radius={radius} height={height} />
        <Results
          items={[
            { label: "Volume", value: fmtNumber(g.volume, 6), emphasize: true },
            { label: "Lateral area", value: fmtNumber(g.lateral, 6) },
            { label: "Total surface", value: fmtNumber(g.totalSurface, 6) },
          ]}
        />
      </div>
    </div>
  );
}

export function Compound3DCalculator() {
  const [principal, setPrincipal] = useState(5000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(12);
  const schedule = useMemo(
    () => compoundingSchedule(principal, rate, years, 12),
    [principal, rate, years]
  );
  const values = schedule.map((s) => s.balance);
  const final = values[values.length - 1] ?? principal;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-4 rounded-2xl surface-card p-6 lg:col-span-2">
        <Field label="Principal" value={principal} onChange={setPrincipal} min={0} suffix="$" />
        <Field label="Annual rate" value={rate} onChange={setRate} min={0} suffix="%" step={0.1} />
        <Field label="Years" value={years} onChange={setYears} min={1} max={30} step={1} />
      </div>
      <div className="lg:col-span-3 space-y-4">
        <CompoundBars3DViz values={values} />
        <Results
          items={[
            { label: "Final balance", value: fmtMoney(final), emphasize: true },
            { label: "Interest earned", value: fmtMoney(final - principal) },
          ]}
        />
        <div className="rounded-2xl surface-card p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">2D growth chart</p>
          <ResultLineChartView
            variant="area"
            data={{
              xKey: "year",
              series: [{ key: "balance", label: "Balance", color: "#0d9488" }],
              points: schedule.map((s) => ({ year: s.year, balance: s.balance })),
            }}
          />
        </div>
      </div>
    </div>
  );
}
