import type { MetadataRoute } from "next";

/** Classic navy from globals.css — Mark 2 seal */
const THEME_COLOR = "#07234a";
const BACKGROUND_COLOR = "#0b1220";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "MyCalcsWorld",
    short_name: "MyCalcs",
    description:
      "Free online calculators for finance, math, health, and everyday life — EMI, SIP, BMI, live FX, and more.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "any",
    background_color: BACKGROUND_COLOR,
    theme_color: THEME_COLOR,
    categories: ["finance", "utilities", "education"],
    lang: "en",
    dir: "ltr",
    prefer_related_applications: false,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
