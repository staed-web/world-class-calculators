import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { PwaRegister } from "@/components/PwaRegister";
import { InstallApp } from "@/components/InstallApp";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mycalcsworld.online";


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#07234a" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  colorScheme: "light dark",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MyCalcsWorld — Free Online Calculators",
    template: "%s | MyCalcsWorld",
  },
  description:
    "Free online calculators for finance, math, health, and everyday life. 280+ working tools with interactive charts, live FX, and 3D math — mortgage, SIP, BMI, and more.",
  applicationName: "MyCalcsWorld",
  appleWebApp: {
    capable: true,
    title: "MyCalcs",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "MyCalcsWorld",
    title: "MyCalcsWorld",
    description:
      "Free online calculators for finance, math, health, and everyday life.",
    images: [{ url: "/logo-mark-lg.png", width: 256, height: 256, alt: "MyCalcsWorld" }],
  },
  twitter: {
    card: "summary",
    title: "MyCalcsWorld",
    description: "Free online calculators for finance, math, health, and everyday life.",
    images: ["/logo-mark-lg.png"],
  },
  robots: { index: true, follow: true },
  other: {
    "google-adsense-account": "ca-pub-9372118866074955",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9372118866074955";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Script
          id="wcc-theme-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("wcc-theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})();`,
          }}
        />
        {/* App shell: subtle wash lives here (not on body/html) so portals stay viewport-fixed. */}
        <div className="relative isolate flex min-h-full flex-1 flex-col">
          <div
            className="pointer-events-none absolute inset-0 -z-10 ambient-mesh opacity-80"
            aria-hidden
          />
          <CurrencyProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <InstallApp />
            <PwaRegister />
          </CurrencyProvider>
        </div>
        {adsenseClient ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        {/* Dedicated portal mount: last in body, outside app shell / not a flex+fixed trap. */}
        <div id="app-portal" />
      </body>
    </html>
  );
}
