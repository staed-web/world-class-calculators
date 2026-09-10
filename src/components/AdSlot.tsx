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
 * Empty / unfilled slots fail silently — no placeholder banners, no tall blank gaps.
 */
export function AdSlot({ placement, className = "" }: AdSlotProps) {
  // Always call hooks in a stable order; sticky-mobile short-circuits after hooks via render null.
  const disabled = placement === "sticky-mobile";
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slot = slotFor(placement) || process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT;
  const pushed = useRef(false);
  const [visible, setVisible] = useState(false);
  const [filled, setFilled] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
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
      { rootMargin: "120px" }
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
      // blocked or not ready
    }
  }, [disabled, client, visible]);

  useEffect(() => {
    if (disabled || !client || !visible || !rootRef.current) return;
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
        setGiveUp(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const t1 = window.setTimeout(() => {
      if (!check()) setGiveUp(true);
    }, 4000);
    const mo = new MutationObserver(() => {
      check();
    });
    mo.observe(root, { childList: true, subtree: true, attributes: true });
    return () => {
      window.clearTimeout(t1);
      mo.disconnect();
    };
  }, [disabled, client, visible]);

  if (disabled || !client) {
    return null;
  }

  // Collapse until near viewport, or if the slot never fills
  if (!visible || (giveUp && !filled)) {
    return (
      <div
        ref={rootRef}
        data-adslot={placement}
        data-ad-placement={placement}
        className={`h-0 w-full overflow-hidden ${className}`}
        aria-hidden
      />
    );
  }

  const sizeClass =
    placement === "sidebar"
      ? "hidden lg:block min-h-[200px] w-full sticky top-24"
      : filled
        ? placement === "header" || placement === "footer"
          ? "min-h-0 max-h-[90px] sm:max-h-[120px] w-full max-w-6xl mx-auto overflow-hidden"
          : "min-h-0 max-h-[100px] sm:max-h-[140px] w-full overflow-hidden"
        : "min-h-[28px] sm:min-h-[64px] max-h-[64px] sm:max-h-[110px] w-full max-w-6xl mx-auto overflow-hidden";

  return (
    <div
      ref={rootRef}
      data-adslot={placement}
      className={`${sizeClass} ${className}`}
      data-ad-placement={placement}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: filled ? undefined : 28 }}
        data-ad-client={client}
        data-ad-slot={slot || undefined}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
