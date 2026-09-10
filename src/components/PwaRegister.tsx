"use client";

import { useEffect } from "react";

/** Registers the service worker in production only; marks standalone display. */
export function PwaRegister() {
  useEffect(() => {
    const root = document.documentElement;
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    root.classList.toggle("standalone-app", standalone);
    if (standalone && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
      root.classList.add("standalone-ios");
    }

    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        /* SW optional — fail quiet */
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
