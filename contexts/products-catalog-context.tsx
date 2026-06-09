"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { getStaticProductBySlug } from "@/lib/products-resolve";
import {
  readProductsSummaryBrowserCache,
  writeProductsSummaryBrowserCache,
  type ProductSummary,
} from "@/lib/products-summary-cache";

export type { ProductSummary };

interface ProductsCatalogContextValue {
  getProduct: (slug: string) => ProductSummary | undefined;
  loaded: boolean;
  /** Fusiona resúmenes (p. ej. desde SSR de /productos o ficha de producto). */
  hydrateSummaries: (list: ProductSummary[]) => void;
  /** Carga catálogo completo solo si hace falta (carrito, etc.). */
  ensureLoaded: () => Promise<void>;
}

const ProductsCatalogContext = createContext<ProductsCatalogContextValue | null>(
  null,
);

function summariesToMap(list: ProductSummary[]): Map<string, ProductSummary> {
  return new Map(list.map((p) => [p.slug, p]));
}

export function ProductsCatalogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bySlug, setBySlug] = useState<Map<string, ProductSummary>>(() => {
    const cached = readProductsSummaryBrowserCache();
    return cached?.length ? summariesToMap(cached) : new Map();
  });
  const [loaded, setLoaded] = useState(() => {
    const cached = readProductsSummaryBrowserCache();
    return Boolean(cached?.length);
  });
  const fetchPromiseRef = useRef<Promise<void> | null>(null);
  const bySlugRef = useRef(bySlug);
  bySlugRef.current = bySlug;

  const hydrateSummaries = useCallback((list: ProductSummary[]) => {
    if (list.length === 0) return;
    setBySlug((prev) => {
      const next = new Map(prev);
      for (const item of list) next.set(item.slug, item);
      return next;
    });
    setLoaded(true);
  }, []);

  const ensureLoaded = useCallback(async () => {
    if (bySlugRef.current.size > 0) return;

    const cached = readProductsSummaryBrowserCache();
    if (cached?.length) {
      setBySlug(summariesToMap(cached));
      setLoaded(true);
      return;
    }

    if (fetchPromiseRef.current) {
      await fetchPromiseRef.current;
      return;
    }

    fetchPromiseRef.current = fetch("/api/products")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((list: ProductSummary[]) => {
        if (list.length > 0) {
          writeProductsSummaryBrowserCache(list);
          setBySlug(summariesToMap(list));
        }
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      })
      .finally(() => {
        fetchPromiseRef.current = null;
      });

    await fetchPromiseRef.current;
  }, []);

  const getProduct = useCallback(
    (slug: string): ProductSummary | undefined => {
      const fromMap = bySlug.get(slug);
      if (fromMap) return fromMap;
      const staticP = getStaticProductBySlug(slug);
      if (!staticP) return undefined;
      return {
        slug: staticP.slug,
        modelo: staticP.modelo,
        marca: staticP.marca,
        imagen: staticP.imagen,
        macroCategoria: staticP.macroCategoria,
      };
    },
    [bySlug],
  );

  const value = useMemo(
    () => ({ getProduct, loaded, hydrateSummaries, ensureLoaded }),
    [getProduct, loaded, hydrateSummaries, ensureLoaded],
  );

  return (
    <ProductsCatalogContext.Provider value={value}>
      {children}
    </ProductsCatalogContext.Provider>
  );
}

export function useProductsCatalog(): ProductsCatalogContextValue {
  const ctx = useContext(ProductsCatalogContext);
  if (!ctx) {
    throw new Error(
      "useProductsCatalog must be used within ProductsCatalogProvider",
    );
  }
  return ctx;
}
