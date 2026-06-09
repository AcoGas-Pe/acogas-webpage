"use client";

import { useEffect, useRef } from "react";
import { useProductsCatalog } from "@/contexts/products-catalog-context";
import type { ProductSummary } from "@/lib/products-summary-cache";
import { writeProductsSummaryBrowserCache } from "@/lib/products-summary-cache";

interface CatalogSummariesHydrateProps {
  summaries: ProductSummary[];
  /** Si true, persiste la lista completa en localStorage (p. ej. página de catálogo). */
  persistFullCatalog?: boolean;
}

/** Sincroniza datos SSR del catálogo al contexto del carrito sin fetch extra. */
export function CatalogSummariesHydrate({
  summaries,
  persistFullCatalog = false,
}: CatalogSummariesHydrateProps) {
  const { hydrateSummaries } = useProductsCatalog();
  const persistedRef = useRef(false);

  useEffect(() => {
    hydrateSummaries(summaries);
    if (persistFullCatalog && summaries.length > 0 && !persistedRef.current) {
      writeProductsSummaryBrowserCache(summaries);
      persistedRef.current = true;
    }
  }, [summaries, hydrateSummaries, persistFullCatalog]);

  return null;
}
