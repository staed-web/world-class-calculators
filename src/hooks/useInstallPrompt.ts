"use client";

import { useCallback, useEffect, useState } from "react";

const DISMISS_KEY = "mcw-install-dismissed";
const DISMISS_MS = 21 * 24 * 60 * 60 * 1000; // 3 weeks

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOs = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return iOS || iPadOs;
}

function isStandaloneDisplay() {
  if (typeof window === "undefined") return false;
  const mq = window.matchMedia("(display-mode: standalone)").matches;
  const nav = Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
  return mq || nav;
}

function readDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_MS;
  } catch {
    return false;
  }
}

export function useInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(true);
  const [standalone, setStandalone] = useState(true);
  const [ios, setIos] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStandalone(isStandaloneDisplay());
    setIos(isIosDevice());
    setDismissed(readDismissed());
    setReady(true);

    function onBip(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    }
    function onInstalled() {
      setDeferred(null);
      setStandalone(true);
    }
    window.addEventListener("beforeinstallprompt", onBip);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferred) return false;
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      setDeferred(null);
      if (choice.outcome === "accepted") {
        setStandalone(true);
        return true;
      }
      dismiss();
      return false;
    } catch {
      return false;
    }
  }, [deferred, dismiss]);

  const canNativePrompt = Boolean(deferred) && !standalone;
  const showIosTip = ios && !standalone;
  const canOffer = ready && !standalone && !dismissed && (canNativePrompt || showIosTip);
  /** Always available in menu when installable (ignore dismiss for explicit menu action). */
  const menuOffer =
    ready && !standalone && (canNativePrompt || showIosTip);

  return {
    ready,
    standalone,
    ios,
    canNativePrompt,
    showIosTip,
    canOffer,
    menuOffer,
    promptInstall,
    dismiss,
  };
}
