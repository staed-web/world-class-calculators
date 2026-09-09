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
  process.env.NEXT_PUBLIC_SITE_URL || "https://world-class-calculators.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "World-Class Calculators — Free Online Calculator Hub",
    template: "%s | World-Class Calculators",
  },
  description:
    "Free working calculators for finance, math, health, conversion, dates, business, and more. Fast, mobile-friendly, and AdSense-ready.",
  openGraph: {
    type: "website",
    siteName: "World-Class Calculators",
    title: "World-Class Calculators",
    description:
      "A large catalog of free, accurate online calculators — mortgage, BMI, unit conversion, and dozens more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "World-Class Calculators",
    description: "Free online calculators for everyday decisions.",
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
