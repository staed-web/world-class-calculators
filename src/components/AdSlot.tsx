"use client";

import { useEffect, useRef, useState } from "react";

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
 * In-flow AdSense slots only. Sticky mobile bottom ads are hard-disabled.
 * Mobile reserved height stays modest to avoid huge blank gaps.
 */
export function AdSlot({ placement, className = "" }: AdSlotProps) {
  if (placement === "sticky-mobile") {
    return null;
  }

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slot = slotFor(placement) || process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT;
  const pushed = useRef(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Lazy: only mount/push when near viewport — reduces blank reserved chrome
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!client || !visible || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense may not be ready yet / blocked
    }
  }, [client, visible]);

  // Modest mobile heights; larger on md+
  const sizeClass =
    placement === "sidebar"
      ? "hidden lg:block min-h-[250px] w-full sticky top-24"
      : placement === "header"
        ? "min-h-[50px] sm:min-h-[90px] w-full max-w-6xl mx-auto max-h-[120px] sm:max-h-none overflow-hidden"
        : placement === "footer"
          ? "min-h-[50px] sm:min-h-[90px] w-full max-h-[120px] sm:max-h-none overflow-hidden"
          : "min-h-[50px] sm:min-h-[100px] w-full max-h-[140px] sm:max-h-none overflow-hidden";

  if (!client) {
    return (
      <div
        ref={rootRef}
        data-adslot={placement}
        className={`flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-[10px] sm:text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 ${sizeClass} ${className}`}
        aria-hidden="true"
        data-ad-placement={placement}
      >
        Ad ({placement})
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      data-adslot={placement}
      className={`${sizeClass} ${className}`}
      data-ad-placement={placement}
    >
      {visible ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot || undefined}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="h-[50px] sm:h-[90px]" aria-hidden />
      )}
    </div>
  );
}
