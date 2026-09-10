import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    // Public AdSense publisher ID (also in ads.txt). Overridable via Vercel env.
    NEXT_PUBLIC_ADSENSE_CLIENT_ID:
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9372118866074955",
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "https://mycalcsworld.online",
  },
  async redirects() {
    return [
      // Category shorthand: /calculators/finance → /categories/finance
      {
        source: "/calculators/:category",
        destination: "/categories/:category",
        permanent: false,
      },
      // Common slug aliases
      {
        source: "/calculators/finance/emi",
        destination: "/calculators/finance/loan-emi",
        permanent: true,
      },
      {
        source: "/calculators/finance/emi-calculator",
        destination: "/calculators/finance/loan-emi",
        permanent: true,
      },
      {
        source: "/calculators/finance/loan",
        destination: "/calculators/finance/loan-emi",
        permanent: true,
      },
      {
        source: "/calculators/finance/gst",
        destination: "/calculators/finance/gst-vat",
        permanent: true,
      },
      {
        source: "/calculators/finance/sip-calculator",
        destination: "/calculators/finance/sip",
        permanent: true,
      },
      {
        source: "/calculators/finance/currency",
        destination: "/calculators/finance/currency-converter",
        permanent: true,
      },
      {
        source: "/calculators/finance/fx",
        destination: "/calculators/finance/currency-converter",
        permanent: true,
      },
      {
        source: "/calculators/health/bmi",
        destination: "/calculators/health-fitness/bmi",
        permanent: true,
      },
      {
        source: "/calculators/health-fitness/body-mass-index",
        destination: "/calculators/health-fitness/bmi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
