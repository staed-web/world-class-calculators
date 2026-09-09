import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mycalcsworld.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MyCalcsWorld — Free Online Calculators",
    template: "%s | MyCalcsWorld",
  },
  description:
    "Free online calculators for finance, math, health, and everyday life. 200+ working tools — mortgage, BMI, conversions, construction, and more.",
  openGraph: {
    type: "website",
    siteName: "MyCalcsWorld",
    title: "MyCalcsWorld",
    description:
      "Free online calculators for finance, math, health, and everyday life.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyCalcsWorld",
    description: "Free online calculators for finance, math, health, and everyday life.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {adsenseClient ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
