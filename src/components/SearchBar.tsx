"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar({
  initialQuery = "",
  size = "md",
  autofocus = false,
}: {
  initialQuery?: string;
  size?: "md" | "lg";
  autofocus?: boolean;
}) {
  const [q, setQ] = useState(initialQuery);
  const router = useRouter();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  const pad = size === "lg" ? "px-5 py-3.5 text-base" : "px-3 py-2 text-sm";

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-2" role="search">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search calculators (e.g. mortgage, BMI, tip…)"
        className={`flex-1 rounded-xl border border-slate-200 bg-white shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 ${pad}`}
        aria-label="Search calculators"
        autoFocus={autofocus}
      />
      <button
        type="submit"
        className={`rounded-xl bg-teal-600 font-semibold text-white hover:bg-teal-700 transition-colors ${pad}`}
      >
        Search
      </button>
    </form>
  );
}
