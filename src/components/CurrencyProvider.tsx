"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  FALLBACK_RATES_USD,
  currencySymbol,
  type CurrencyInfo,
} from "@/lib/currency/currencies";
import { setFormatCurrency } from "@/lib/currency/store";
import type { FxPayload } from "@/lib/currency/fetchRates";

interface CurrencyContextValue {
  currency: string;
  setCurrency: (code: string) => void;
  symbol: string;
  rates: Record<string, number>;
  currencies: CurrencyInfo[];
  loading: boolean;
  source: string;
  fetchedAt: string | null;
  disclaimer: string;
  usingFallback: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "mcw-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState(DEFAULT_CURRENCY);
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES_USD);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("loading…");
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [disclaimer, setDisclaimer] = useState(
    "FX rates are delayed estimates for education only."
  );
  const [usingFallback, setUsingFallback] = useState(false);

  const setCurrency = useCallback((code: string) => {
    setCurrencyState(code);
    setFormatCurrency(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && CURRENCIES.some((c) => c.code === saved)) {
        setCurrencyState(saved);
        setFormatCurrency(saved);
      } else {
        setFormatCurrency(DEFAULT_CURRENCY);
      }
    } catch {
      setFormatCurrency(DEFAULT_CURRENCY);
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/fx", { cache: "default" });
        const data = (await res.json()) as FxPayload;
        if (cancelled) return;
        if (data.rates) setRates(data.rates);
        setSource(data.source);
        setFetchedAt(data.fetchedAt);
        setDisclaimer(data.disclaimer);
        setUsingFallback(Boolean(data.usingFallback) || !data.ok);
      } catch {
        if (!cancelled) {
          setUsingFallback(true);
          setSource("static fallback snapshot");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Keep format store in sync when currency changes
  useEffect(() => {
    setFormatCurrency(currency);
  }, [currency]);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      symbol: currencySymbol(currency),
      rates,
      currencies: CURRENCIES,
      loading,
      source,
      fetchedAt,
      disclaimer,
      usingFallback,
    }),
    [
      currency,
      setCurrency,
      rates,
      loading,
      source,
      fetchedAt,
      disclaimer,
      usingFallback,
    ]
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    // Safe SSR / fallback defaults
    return {
      currency: DEFAULT_CURRENCY,
      setCurrency: () => {},
      symbol: "$",
      rates: FALLBACK_RATES_USD,
      currencies: CURRENCIES,
      loading: false,
      source: "default",
      fetchedAt: null,
      disclaimer: "FX rates are delayed estimates for education only.",
      usingFallback: true,
    };
  }
  return ctx;
}
