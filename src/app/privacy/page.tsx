import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_URL, contactMailto } from "@/lib/site";
import { ContactEmail } from "@/components/ContactEmail";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for MyCalcsWorld. Contact ${CONTACT_EMAIL} with privacy questions.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: "Privacy Policy | MyCalcsWorld",
    description: "How MyCalcsWorld handles logs, ads, and optional analytics.",
    url: `${SITE_URL}/privacy`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | MyCalcsWorld",
    description: "How MyCalcsWorld handles logs, ads, and optional analytics.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl font-semibold text-foreground">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: September 11, 2026 (IST)</p>
      <div className="mt-6 space-y-4 text-muted leading-relaxed">
        <p>
          MyCalcsWorld performs calculator math in your browser. We do not
          require an account to use the tools.
        </p>
        <h2 className="text-lg font-semibold text-foreground pt-2">Information we collect</h2>
        <p>
          Standard web server and hosting logs (such as IP address, user agent, and
          pages requested) may be collected by our hosting provider. Calculator inputs
          are processed client-side and are not intentionally stored on our servers.
          Favorites and recently used shortcuts (if you enable them) stay in your
          device&apos;s localStorage only.
        </p>
        <h2 className="text-lg font-semibold text-foreground pt-2">Cookies &amp; advertising</h2>
        <p>
          We may show ads through Google AdSense or similar partners. Those partners may
          use cookies or similar technologies to serve ads and measure performance. See
          Google&apos;s policies for details on ad personalization controls. Our publisher
          ID is documented in ads.txt.
        </p>
        <h2 className="text-lg font-semibold text-foreground pt-2">Optional analytics</h2>
        <p>
          If Google Analytics 4 is enabled in production (via an environment measurement
          ID), it may collect aggregated usage metrics such as page views. When that ID
          is not set, the GA script does not load.
        </p>
        <h2 className="text-lg font-semibold text-foreground pt-2">Third-party links &amp; FX feeds</h2>
        <p>
          Currency and commodity helpers may call public reference feeds. Those providers
          process requests under their own terms. Delayed educational quotes are not
          executable trade prices.
        </p>
        <h2 className="text-lg font-semibold text-foreground pt-2">Contact</h2>
        <p>
          For privacy questions, email{" "}
          <ContactEmail href={contactMailto("Privacy question")} className="text-brand underline" />{" "}
          or use the{" "}
          <Link href="/contact" className="text-brand underline">
            contact page
          </Link>
          . See also{" "}
          <Link href="/terms" className="text-brand underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/disclaimer" className="text-brand underline">
            Disclaimer
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
