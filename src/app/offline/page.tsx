import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-6">
        <Image
          src="/icons/icon-192.png"
          alt=""
          width={88}
          height={88}
          className="relative h-20 w-20 rounded-full shadow-md ring-1 ring-[color-mix(in_oklab,var(--gold)_45%,transparent)]"
          priority
        />
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
        Offline
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        You’re offline
      </h1>
      <p className="mt-3 max-w-md text-muted leading-relaxed">
        MyCalcsWorld needs a connection for live rates and fresh pages. Local
        calculators you already opened may still work — try again when you’re
        back online.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/"
          className="btn-primary inline-flex min-h-11 items-center justify-center px-5 text-sm shadow-sm"
        >
          Try again
        </a>
        <Link
          href="/calculators/math/scientific"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
        >
          Open scientific
        </Link>
      </div>
    </div>
  );
}
