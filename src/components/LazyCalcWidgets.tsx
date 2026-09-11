"use client";

import dynamic from "next/dynamic";

function ChunkFallback({ label }: { label: string }) {
  return (
    <div
      className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted"
      role="status"
      aria-live="polite"
    >
      Loading {label}…
    </div>
  );
}

export const LazyScientificCalculator = dynamic(
  () =>
    import("./ScientificCalculator").then((m) => m.ScientificCalculator),
  { loading: () => <ChunkFallback label="scientific keypad" /> }
);

export const LazyLiveCommoditiesCalculator = dynamic(
  () =>
    import("./LiveCommoditiesCalculator").then(
      (m) => m.LiveCommoditiesCalculator
    ),
  { loading: () => <ChunkFallback label="commodities" /> }
);

export const LazyLiveCurrencyConverter = dynamic(
  () =>
    import("./LiveCurrencyConverter").then((m) => m.LiveCurrencyConverter),
  { loading: () => <ChunkFallback label="currency converter" /> }
);

export const LazyFunction3DCalculator = dynamic(
  () =>
    import("./viz/CustomVizCalculators").then((m) => m.Function3DCalculator),
  { ssr: false, loading: () => <ChunkFallback label="3D surface" /> }
);

export const LazyPythagoras3DCalculator = dynamic(
  () =>
    import("./viz/CustomVizCalculators").then((m) => m.Pythagoras3DCalculator),
  { ssr: false, loading: () => <ChunkFallback label="3D triangle" /> }
);

export const LazySphere3DCalculator = dynamic(
  () =>
    import("./viz/CustomVizCalculators").then((m) => m.Sphere3DCalculator),
  { ssr: false, loading: () => <ChunkFallback label="3D sphere" /> }
);

export const LazyCylinder3DCalculator = dynamic(
  () =>
    import("./viz/CustomVizCalculators").then((m) => m.Cylinder3DCalculator),
  { ssr: false, loading: () => <ChunkFallback label="3D cylinder" /> }
);

export const LazyCompound3DCalculator = dynamic(
  () =>
    import("./viz/CustomVizCalculators").then((m) => m.Compound3DCalculator),
  { ssr: false, loading: () => <ChunkFallback label="3D compound" /> }
);
