"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product, CatalogoDocs } from "@/domain/product";
import { DownloadGateModal } from "@/components/ui/download-gate-modal";
import { PdfDocListWithPreview } from "@/components/ui/pdf-doc-grid";
import { isProductDownloadGateSatisfied } from "@/lib/download-gate-storage";
import { triggerFileDownload } from "@/lib/trigger-file-download";
import { cn } from "@/lib/utils";

interface AdditionalProductDataProps {
  product: Product;
}

/** Category keys from data — tabs appear in this order when they have documents */
const DOC_TAB_ORDER = ["Generales", "Específicos", "Esquemáticos", "Otros"] as const;

const DOC_TAB_SET = new Set<string>(DOC_TAB_ORDER);

function groupDocsByCategory(docs: CatalogoDocs[]) {
  const groups = new Map<string, CatalogoDocs[]>();
  for (const doc of docs) {
    const list = groups.get(doc.categoria) ?? [];
    list.push(doc);
    groups.set(doc.categoria, list);
  }
  return groups;
}

export function AdditionalProductData({ product }: AdditionalProductDataProps) {
  const docs = product.catalogoDocs ?? [];
  const [pendingDownload, setPendingDownload] = useState<{
    url: string;
    nombre: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<string>("");

  const byCategory = useMemo(() => groupDocsByCategory(docs), [docs]);

  const tabs = useMemo(() => {
    const ordered = DOC_TAB_ORDER.filter(
      (cat) => (byCategory.get(cat)?.length ?? 0) > 0
    );
    const extra = Array.from(byCategory.keys())
      .filter((k) => !DOC_TAB_SET.has(k))
      .sort((a, b) => a.localeCompare(b, "es"));
    return [...ordered, ...extra];
  }, [byCategory]);

  useEffect(() => {
    setActiveTab((prev) => {
      if (tabs.length === 0) return "";
      if (prev && tabs.includes(prev)) return prev;
      return tabs[0];
    });
  }, [product.slug, tabs]);

  const activeDocs = activeTab ? byCategory.get(activeTab) ?? [] : [];

  const handleDocSelect = useCallback(
    async (doc: CatalogoDocs) => {
      if (isProductDownloadGateSatisfied(product.slug)) {
        await triggerFileDownload(doc.url, doc.nombre);
        return;
      }
      setPendingDownload({ url: doc.url, nombre: doc.nombre });
    },
    [product.slug]
  );

  if (docs.length === 0) return null;

  return (
    <section className="flex flex-col py-16 sm:py-20 md:py-24">
      <DownloadGateModal
        open={pendingDownload !== null}
        onClose={() => setPendingDownload(null)}
        productSlug={product.slug}
        downloadUrl={pendingDownload?.url ?? ""}
        documentTitle={pendingDownload?.nombre ?? ""}
      />
      <div className="container">
        <h2 className="mb-6 text-2xl font-bold">Documentos relacionados</h2>
        <div className="overflow-visible rounded-lg border border-border bg-card shadow-sm">
          <div
            role="tablist"
            aria-label="Categorías de documentos"
            className="flex flex-wrap border-b border-border bg-muted/30 sm:flex-nowrap"
          >
            {tabs.map((categoria) => {
              const selected = activeTab === categoria;
              const tabId = `doc-tab-${categoria.replace(/\s+/g, "-")}`;
              const panelId = `doc-panel-${categoria.replace(/\s+/g, "-")}`;
              return (
                <button
                  key={categoria}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveTab(categoria)}
                  className={cn(
                    "relative min-w-0 flex-1 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide transition-colors sm:px-5 sm:py-3.5 sm:text-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    selected
                      ? "z-1 border-b-2 border-primary bg-card text-primary -mb-px"
                      : "border-b-2 border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}
                >
                  {categoria}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={
              activeTab
                ? `doc-panel-${activeTab.replace(/\s+/g, "-")}`
                : undefined
            }
            aria-labelledby={
              activeTab
                ? `doc-tab-${activeTab.replace(/\s+/g, "-")}`
                : undefined
            }
            className="px-4 py-4 sm:px-8 sm:py-6"
          >
            <PdfDocListWithPreview
              key={activeTab}
              docs={activeDocs}
              onDocSelect={handleDocSelect}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
