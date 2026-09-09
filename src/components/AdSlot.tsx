"use client";

import { useEffect, useRef } from "react";

type AdPlacement = "header" | "in-content" | "sidebar" | "sticky-mobile" | "footer";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

function slotFor(placement: AdPlacement): string | undefined {
  switch (placement) {
    case "header":
      return process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER;
    case "in-content":
      return process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT;
    case "sidebar":
      return process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR;
    case "sticky-mobile":
      return process.env.NEXT_PUBLIC_ADSENSE_SLOT_STICKY_MOBILE;
    case "footer":
      return process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER;
    default:
      return process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT;
  }
}

/**
 * AdSense-ready slot. Uses NEXT_PUBLIC_ADSENSE_CLIENT_ID (defaults via next.config).
 * Slot IDs optional — Auto ads / format=auto can fill without them once approved.
 */
export function AdSlot({ placement, className = "" }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slot = slotFor(placement) || process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT;
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense may not be ready yet / blocked
    }
  }, [client]);

  const sizeClass =
    placement === "sticky-mobile"
      ? "fixed bottom-0 inset-x-0 z-40 h-14 md:hidden"
      : placement === "sidebar"
        ? "min-h-[250px] w-full"
        : placement === "header"
          ? "min-h-[90px] w-full"
          : "min-h-[100px] w-full";

  if (!client) {
    return (
      <div
        data-adslot={placement}
        className={`flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400 ${sizeClass} ${className}`}
        aria-hidden="true"
        data-ad-placement={placement}
      >
        Ad placeholder ({placement})
      </div>
    );
  }

  return (
    <div
      data-adslot={placement}
      className={`${sizeClass} ${className}`}
      data-ad-placement={placement}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot || undefined}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
