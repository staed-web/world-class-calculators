"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type DirectoryItem = {
  slug: string;
  category: string;
  name: string;
  description: string;
  keywords: string[];
  href: string;
};

export function CategoryDirectory({ items }: { items: DirectoryItem[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((c) => {
      const hay = [c.name, c.description, c.slug, ...c.keywords].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [items, q]);

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="cat-filter" className="sr-only">
          Filter calculators in this category
        </label>
        <input
          id="cat-filter"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search within this category…"
          className="w-full rounded-xl border border-border bg-card px-3 py-3 text-base sm:text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)] min-h-11"
        />
        <p className="mt-2 text-xs text-muted">
          Showing {filtered.length} of {items.length}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
          No calculators match “{q}”. Try a shorter keyword.
        </div>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {filtered.map((c) => (
            <li key={c.slug}>
              <Link
                href={c.href}
                className="flex flex-col gap-0.5 px-4 py-3 transition hover:bg-brand-soft/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-foreground">{c.name}</span>
                <span className="line-clamp-1 text-sm text-muted sm:max-w-md sm:text-right">
                  {c.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
