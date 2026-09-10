import Link from "next/link";

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-muted mt-4">
        Estimates only — not professional financial, medical, or legal advice.{" "}
        <Link href="/disclaimer" className="underline hover:text-brand">
          Full disclaimer
        </Link>
      </p>
    );
  }
  return (
    <div className="rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100">
      <strong className="font-semibold">Disclaimer:</strong> Results are estimates
      for educational purposes and are not a substitute for professional financial,
      medical, legal, or tax advice. FX and commodity quotes are delayed reference
      data.{" "}
      <Link href="/disclaimer" className="underline font-medium">
        Read more
      </Link>
    </div>
  );
}
