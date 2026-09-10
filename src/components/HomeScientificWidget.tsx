import Link from "next/link";

const KEYS = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ".", "=", "+"];

export function HomeScientificWidget() {
  return (
    <Link
      href="/calculators/math/scientific"
      className="block rounded-xl surface-card p-4 transition hover:-translate-y-0.5 hover:border-brand"
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-serif text-sm font-semibold text-foreground">Scientific keypad</p>
          <p className="text-xs text-muted">Open the full scientific calculator</p>
        </div>
        <span className="text-xs font-medium text-brand">Open →</span>
      </div>
      <div className="rounded-xl bg-[#07234a] px-3 py-2 text-right font-mono text-lg text-[#d4e4f7]">
        0
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {KEYS.map((k) => (
          <span
            key={k}
            className="rounded-lg border border-border bg-background py-2 text-center text-xs font-semibold text-foreground"
          >
            {k}
          </span>
        ))}
      </div>
    </Link>
  );
}
