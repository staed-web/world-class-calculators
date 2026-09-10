"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  readRecentCalculators,
  type RecentCalculatorRef,
} from "@/lib/recentCalculators";

export function RecentlyUsedCalculators({
  className = "",
}: {
  className?: string;
}) {
  const [items, setItems] = useState<RecentCalculatorRef[]>([]);

  useEffect(() => {
    setItems(readRecentCalculators());
    function onStorage(e: StorageEvent) {
      if (e.key === "mcw-recent-calculators") {
        setItems(readRecentCalculators());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!items.length) return null;

  return (
    <section className={className} aria-label="Recently used calculators">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="section-title text-xl sm:text-2xl">
            Recently used
          </h2>
          <p className="text-sm text-muted mt-0.5">
            Saved on this device only — jump back in one tap.
          </p>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] sm:flex-wrap sm:overflow-visible">
        {items.map((r) => (
          <Link
            key={r.slug}
            href={r.href}
            className="shrink-0 inline-flex min-h-11 items-center rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground hover:border-brand hover:text-brand transition"
          >
            {r.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
