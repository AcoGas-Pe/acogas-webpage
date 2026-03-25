"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { QuoteCartLine } from "@/lib/quote-cart-storage";
import {
  clampQuantity,
  loadQuoteCart,
  saveQuoteCart,
} from "@/lib/quote-cart-storage";

interface QuoteCartContextValue {
  lines: QuoteCartLine[];
  totalQuantity: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addProduct: (slug: string, quantity: number) => void;
  setLineQuantity: (slug: string, quantity: number) => void;
  removeLine: (slug: string) => void;
  clear: () => void;
}

const QuoteCartContext = createContext<QuoteCartContextValue | null>(null);

function mergeLines(lines: QuoteCartLine[]): QuoteCartLine[] {
  const map = new Map<string, number>();
  for (const row of lines) {
    const q = clampQuantity(row.quantity);
    map.set(row.slug, clampQuantity((map.get(row.slug) ?? 0) + q));
  }
  return [...map.entries()].map(([slug, quantity]) => ({ slug, quantity }));
}

export function QuoteCartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<QuoteCartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(loadQuoteCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveQuoteCart(lines);
  }, [lines, hydrated]);

  const persist = useCallback((updater: (prev: QuoteCartLine[]) => QuoteCartLine[]) => {
    setLines((prev) => mergeLines(updater(prev)));
  }, []);

  const addProduct = useCallback(
    (slug: string, quantity: number) => {
      const q = clampQuantity(quantity);
      persist((prev) => {
        const existing = prev.find((l) => l.slug === slug);
        if (existing) {
          return prev.map((l) =>
            l.slug === slug ? { ...l, quantity: clampQuantity(l.quantity + q) } : l,
          );
        }
        return [...prev, { slug, quantity: q }];
      });
    },
    [persist],
  );

  const setLineQuantity = useCallback(
    (slug: string, quantity: number) => {
      if (quantity < 1) {
        setLines((prev) => prev.filter((l) => l.slug !== slug));
        return;
      }
      const q = clampQuantity(quantity);
      persist((prev) =>
        prev.map((l) => (l.slug === slug ? { ...l, quantity: q } : l)),
      );
    },
    [persist],
  );

  const removeLine = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const totalQuantity = useMemo(
    () => lines.reduce((acc, l) => acc + l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      totalQuantity,
      isOpen,
      open,
      close,
      toggle,
      addProduct,
      setLineQuantity,
      removeLine,
      clear,
    }),
    [
      lines,
      totalQuantity,
      isOpen,
      open,
      close,
      toggle,
      addProduct,
      setLineQuantity,
      removeLine,
      clear,
    ],
  );

  return (
    <QuoteCartContext.Provider value={value}>{children}</QuoteCartContext.Provider>
  );
}

export function useQuoteCart(): QuoteCartContextValue {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) {
    throw new Error("useQuoteCart must be used within QuoteCartProvider");
  }
  return ctx;
}
