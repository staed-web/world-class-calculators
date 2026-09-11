import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, contactMailto } from "@/lib/site";
import { ContactEmail } from "@/components/ContactEmail";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important disclaimer — MyCalcsWorld calculator estimates are not professional financial, tax, medical, or legal advice.",
  alternates: { canonical: `${SITE_URL}/disclaimer` },
  openGraph: {
    title: "Disclaimer | MyCalcsWorld",
    description: "Estimates only — not professional advice.",
    url: `${SITE_URL}/disclaimer`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Disclaimer | MyCalcsWorld",
    description: "Estimates only — not professional advice.",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl font-semibold text-foreground">Disclaimer</h1>
      <p className="mt-4 text-sm text-muted">Last updated: September 11, 2026 (IST)</p>
      <div className="mt-6 space-y-4 text-muted leading-relaxed">
        <p>
          All calculators and results on MyCalcsWorld are provided for
          general educational and informational purposes only. They are{" "}
          <strong className="text-foreground">estimates</strong>, not guarantees.
        </p>
        <p>
          Nothing on this site constitutes professional financial, investment, tax,
          legal, engineering, or medical advice. Always consult a qualified professional
          before making decisions that affect your money, health, or legal rights.
        </p>
        <p>
          Formulas may use simplifying assumptions. Currency conversion uses periodically
          refreshed reference FX rates (with a static fallback if the feed is down) — not
          executable trade prices. Commodity and metal quotes come from
          free delayed public feeds and are not executable trade prices. Health metrics
          such as BMI, body fat, calorie, and pregnancy estimates are screening / planning
          tools, not diagnoses or clinical care.
        </p>
        <p>
          We strive for accuracy but provide the site “as is” without warranties of any
          kind. Use at your own risk. Related policies:{" "}
          <Link href="/terms" className="text-brand hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand hover:underline">
            Privacy
          </Link>
          .
        </p>
        <p>
          Questions?{" "}
          <Link href="/contact" className="text-brand hover:underline">
            Contact us
          </Link>{" "}
          or email{" "}
          <ContactEmail href={contactMailto("Disclaimer question")} className="text-brand hover:underline" />
          .
        </p>
      </div>
    </div>
  );
}
