import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, contactMailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for MyCalcsWorld. Contact ${CONTACT_EMAIL} with privacy questions.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: September 10, 2026 (IST)</p>
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
        </p>
        <h2 className="text-lg font-semibold text-foreground pt-2">Cookies &amp; advertising</h2>
        <p>
          We may show ads through Google AdSense or similar partners. Those partners may
          use cookies or similar technologies to serve ads and measure performance. See
          Google&apos;s policies for details on ad personalization controls.
        </p>
        <h2 className="text-lg font-semibold text-foreground pt-2">Contact</h2>
        <p>
          For privacy questions, email{" "}
          <a href={contactMailto("Privacy question")} className="text-brand underline break-all">
            {CONTACT_EMAIL}
          </a>{" "}
          or use the{" "}
          <Link href="/contact" className="text-brand underline">
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
