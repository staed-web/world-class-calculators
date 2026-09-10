"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

export function CopyEmailButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select via prompt for older browsers
      window.prompt("Copy email address:", CONTACT_EMAIL);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex min-h-10 items-center justify-center rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:border-brand hover:text-brand transition ${className}`}
      aria-live="polite"
    >
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}
