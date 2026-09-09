import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for MyCalcsWorld.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-4 text-sm text-slate-500">Last updated: September 9, 2026</p>
      <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
        <p>
          MyCalcsWorld performs calculator math in your browser. We do not
          require an account to use the tools.
        </p>
        <h2 className="text-lg font-semibold text-slate-900 pt-2">Information we collect</h2>
        <p>
          Standard web server and hosting logs (such as IP address, user agent, and
          pages requested) may be collected by our hosting provider (e.g. Vercel).
          Calculator inputs are processed client-side and are not intentionally stored
          on our servers.
        </p>
        <h2 className="text-lg font-semibold text-slate-900 pt-2">Cookies & advertising</h2>
        <p>
          If Google AdSense or similar partners are enabled via environment variables,
          those partners may use cookies or similar technologies to serve ads and measure
          performance. See Google&apos;s policies for details on ad personalization controls.
        </p>
        <h2 className="text-lg font-semibold text-slate-900 pt-2">Contact</h2>
        <p>
          For privacy questions about this open project, open an issue on the GitHub
          repository.
        </p>
      </div>
    </div>
  );
}
