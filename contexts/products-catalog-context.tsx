"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getStaticProductBySlug } from "@/lib/products-resolve";

export type ProductSummary = {
  slug: string;
  modelo?: string;
  marca?: string;
  imagen?: string;
  macroCategoria?: string;
};

interface ProductsCatalogContextValue {
  getProduct: (slug: string) => ProductSummary | undefined;
  loaded: boolean;
}

const ProductsCatalogContext = createContext<ProductsCatalogContextValue | null>(
  null,
);

export function ProductsCatalogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bySlug, setBySlug] = useState<Map<string, ProductSummary>>(new Map());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((list: ProductSummary[]) => {
        if (cancelled) return;
        setBySlug(new Map(list.map((p) => [p.slug, p])));
      })
      .catch(() => {
        /* fallback estático vía getProduct */
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const getProduct = useCallback(
    (slug: string): ProductSummary | undefined => {
      const fromApi = bySlug.get(slug);
      if (fromApi) return fromApi;
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

  const value = useMemo(() => ({ getProduct, loaded }), [getProduct, loaded]);

  return (
    <ProductsCatalogContext.Provider value={value}>
      {children}
    </ProductsCatalogContext.Provider>
  );
}

export function useProductsCatalog(): ProductsCatalogContextValue {
  const ctx = useContext(ProductsCatalogContext);
  if (!ctx) {
    throw new Error("useProductsCatalog must be used within ProductsCatalogProvider");
  }
  return ctx;
}
