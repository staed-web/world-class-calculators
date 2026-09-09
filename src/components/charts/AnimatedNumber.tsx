"use client";

import { useEffect, useRef, useState } from "react";

/** Subtle count-up for numeric-looking result strings; falls back instantly for non-numeric. */
export function AnimatedNumber({
  value,
  emphasize,
}: {
  value: string;
  emphasize?: boolean;
}) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  const cls = emphasize
    ? "text-xl font-bold text-foreground tabular-nums tracking-tight"
    : "text-base font-medium text-foreground tabular-nums";

  useEffect(() => {
    if (prev.current === value) return;
    prev.current = value;
    const match = value.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
    if (!match) {
      // non-numeric: update on next frame to avoid sync setState-in-effect lint
      const id = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(id);
    }
    const target = Number(match[0]);
    if (!Number.isFinite(target)) {
      const id = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(id);
    }
    const prefix = value.slice(0, match.index ?? 0);
    const suffix = value.slice((match.index ?? 0) + match[0].length);
    const decimals = (match[0].split(".")[1] || "").length;
    const start = performance.now();
    const dur = 480;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      const num = decimals
        ? cur.toFixed(decimals)
        : Math.round(cur).toLocaleString("en-US");
      setDisplay(`${prefix}${num}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span className={cls}>{display}</span>;
}
