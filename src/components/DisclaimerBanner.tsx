import Link from "next/link";

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-slate-500 mt-4">
        Estimates only — not professional financial, medical, or legal advice.{" "}
        <Link href="/disclaimer" className="underline hover:text-teal-700">
          Full disclaimer
        </Link>
      </p>
    );
  }
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong className="font-semibold">Disclaimer:</strong> Results are estimates
      for educational purposes and are not a substitute for professional financial,
      medical, legal, or tax advice.{" "}
      <Link href="/disclaimer" className="underline font-medium">
        Read more
      </Link>
    </div>
  );
}
