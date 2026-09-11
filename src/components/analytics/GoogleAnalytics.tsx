import Script from "next/script";

/** Default production GA4 stream for MyCalcsWorld (public client ID). Override with NEXT_PUBLIC_GA_MEASUREMENT_ID. */
const DEFAULT_GA_ID = "G-Q3KLWD6CME";

/**
 * GA4 — loads gtag when a Measurement ID is available.
 */
export function GoogleAnalytics() {
  const id = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || DEFAULT_GA_ID).trim();
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
