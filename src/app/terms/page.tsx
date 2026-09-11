import type { Metadata } from "next";
import Link from "next/link";
import { ContactEmail } from "@/components/ContactEmail";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, contactMailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE_NAME} — free educational calculators. Contact ${CONTACT_EMAIL} with questions.`,
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    title: "Terms of Use | MyCalcsWorld",
    description: "Terms of use for MyCalcsWorld educational calculators.",
    url: `${SITE_URL}/terms`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Use | MyCalcsWorld",
    description: "Terms of use for MyCalcsWorld educational calculators.",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl font-semibold text-foreground">Terms of Use</h1>
      <p className="mt-4 text-sm text-muted">Last updated: September 11, 2026 (IST)</p>

      <div className="mt-6 space-y-4 text-muted leading-relaxed">
        <p>
          Welcome to MyCalcsWorld ({SITE_URL}). By using this website you agree to these
          Terms of Use. If you do not agree, please do not use the site.
        </p>

        <h2 className="text-lg font-semibold text-foreground pt-2">Educational estimates only</h2>
        <p>
          All calculators, guides, charts, and results are provided for general educational
          and informational purposes. They are estimates, not guarantees, and do{" "}
          <strong className="text-foreground">not</strong> constitute professional financial,
          investment, tax, legal, engineering, or medical advice. See our{" "}
          <Link href="/disclaimer" className="text-brand hover:underline">
            Disclaimer
          </Link>
          .
        </p>

        <h2 className="text-lg font-semibold text-foreground pt-2">Acceptable use</h2>
        <p>
          You may use the tools for personal planning, education, and legitimate business
          research. You may not misuse the site (for example by attempting to disrupt
          service, scrape in a way that harms availability, or misrepresent results as
          official bank, government, or clinical outputs).
        </p>

        <h2 className="text-lg font-semibold text-foreground pt-2">Intellectual property</h2>
        <p>
          Site branding, original guides, FAQs, and UI copy are created for MyCalcsWorld.
          You may link to our pages; please do not copy substantial guide text wholesale
          without permission.
        </p>

        <h2 className="text-lg font-semibold text-foreground pt-2">Advertising &amp; affiliates</h2>
        <p>
          The site may display ads (including Google AdSense) and may use related
          measurement technologies. Ad partners have their own policies. See{" "}
          <Link href="/privacy" className="text-brand hover:underline">
            Privacy
          </Link>
          .
        </p>

        <h2 className="text-lg font-semibold text-foreground pt-2">No warranties</h2>
        <p>
          The site is provided “as is” without warranties of any kind. We do not warrant
          uninterrupted availability or that every formula matches a specific product,
          syllabus, or clinical protocol.
        </p>

        <h2 className="text-lg font-semibold text-foreground pt-2">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, MyCalcsWorld and its operators are not
          liable for decisions or losses arising from use of the calculators or content.
          Always verify critical numbers with a qualified professional or primary source.
        </p>

        <h2 className="text-lg font-semibold text-foreground pt-2">Changes</h2>
        <p>
          We may update these terms from time to time. The “Last updated” date above
          reflects the latest revision. Continued use after changes means you accept the
          updated terms.
        </p>

        <h2 className="text-lg font-semibold text-foreground pt-2">Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <ContactEmail href={contactMailto("Terms of Use question")} className="text-brand underline" />{" "}
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
