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
};

export default nextConfig;
