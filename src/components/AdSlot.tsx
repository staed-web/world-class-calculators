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
 * In-flow AdSense only. Sticky mobile bottom ads are hard-disabled.
 * Keeps `ins.adsbygoogle` in the DOM for crawlers/reviewers; collapses
 * reserved visual height (~0–40px) until an ad actually fills.
 */
export function AdSlot({ placement, className = "" }: AdSlotProps) {
  const disabled = placement === "sticky-mobile";
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slot = slotFor(placement) || process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT;
  const pushed = useRef(false);
  const [visible, setVisible] = useState(false);
  const [filled, setFilled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !client) return;
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
      { rootMargin: "160px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [disabled, client]);

  useEffect(() => {
    if (disabled || !client || !visible || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // blocked or not ready — keep markup in DOM
    }
  }, [disabled, client, visible]);

  useEffect(() => {
    if (disabled || !client || !rootRef.current) return;
    const root = rootRef.current;
    const check = () => {
      const ins = root.querySelector("ins.adsbygoogle");
      const iframe = root.querySelector("iframe");
      const status = ins?.getAttribute("data-ad-status");
      if (status === "filled" || (iframe && iframe.clientHeight > 24)) {
        setFilled(true);
        return true;
      }
      if (status === "unfilled") {
        setFilled(false);
        return true;
      }
      return false;
    };
    check();
    const mo = new MutationObserver(() => {
      check();
    });
    mo.observe(root, { childList: true, subtree: true, attributes: true });
    const poll = window.setInterval(() => {
      check();
    }, 1200);
    return () => {
      mo.disconnect();
      window.clearInterval(poll);
    };
  }, [disabled, client, visible]);

  if (disabled || !client) {
    return null;
  }

  // Collapse reserved height until filled; keep ins in DOM for AdSense review.
  const shellClass = filled
    ? placement === "sidebar"
      ? "hidden lg:block min-h-[200px] w-full sticky top-24"
      : placement === "header" || placement === "footer"
        ? "min-h-0 max-h-[90px] sm:max-h-[120px] w-full max-w-6xl mx-auto overflow-hidden"
        : "min-h-0 max-h-[100px] sm:max-h-[140px] w-full overflow-hidden"
    : "ad-slot-collapsed w-full max-w-6xl mx-auto";

  return (
    <div
      ref={rootRef}
      data-adslot={placement}
      data-ad-placement={placement}
      data-ad-filled={filled ? "true" : "false"}
      className={`${shellClass} ${className}`}
      aria-hidden={filled ? undefined : true}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          minHeight: filled ? undefined : 1,
          maxHeight: filled ? undefined : 40,
        }}
        data-ad-client={client}
        data-ad-slot={slot || undefined}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
