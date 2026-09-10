import Link from "next/link";
import Image from "next/image";
import { BrandWordmark } from "@/components/BrandWordmark";
import { categories } from "@/lib/categories";
import { calculatorCount } from "@/lib/calculators/registry";
import { AdSlot } from "./AdSlot";
import { ContactEmail } from "./ContactEmail";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#0a1f3d] bg-[#07234a] text-slate-300 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <AdSlot placement="footer" className="mb-8 bg-[#0a2d5c]/60 border-[#0a1f3d] no-print" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Image
                src="/logo-mark.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-[color-mix(in_oklab,var(--gold)_45%,transparent)]"
              />
              <BrandWordmark tone="light" size="sm" />
            </div>
            <p className="text-sm text-slate-400">
              Free online calculators for finance, math, health, and everyday life —{" "}
              {calculatorCount}+ working tools, live FX, and clearer UX than
              ad-heavy calculator directories.
            </p>
          </div>
          <div>
            <p className="font-serif text-white font-semibold mb-2">Categories</p>
            <ul className="space-y-1 text-sm">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="hover:text-[#9fd4cf]">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-serif text-white font-semibold mb-2">More</p>
            <ul className="space-y-1 text-sm">
              {categories.slice(6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="hover:text-[#9fd4cf]">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-serif text-white font-semibold mb-2">Legal</p>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#9fd4cf]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#9fd4cf]">
                  Contact
                </Link>
              </li>
              <li>
                <ContactEmail className="hover:text-[#9fd4cf]" />
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#9fd4cf]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#9fd4cf]">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/calculators/finance/currency-converter" className="hover:text-[#9fd4cf]">
                  Currency converter
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} MyCalcsWorld. Estimates only — not
          professional advice. FX rates are delayed educational quotes. Guides and
          FAQs are original MyCalcsWorld copy. Contact{" "}
          <ContactEmail className="text-[#9fd4cf] hover:underline" />
          .
        </p>
      </div>
    </footer>
  );
}
