"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product, CatalogoDocs } from "@/domain/product";
import { Download } from "lucide-react";
import { DownloadGateModal } from "@/components/ui/download-gate-modal";
import { isProductDownloadGateSatisfied } from "@/lib/download-gate-storage";
import { triggerFileDownload } from "@/lib/trigger-file-download";
import { cn } from "@/lib/utils";

interface AdditionalProductDataProps {
  product: Product;
}

/** Category keys from data — tabs appear in this order when they have documents */
const DOC_TAB_ORDER = ["Generales", "Específicos", "Esquemáticos"] as const;

const DOC_TAB_SET = new Set<string>(DOC_TAB_ORDER);

function absoluteDocUrl(url: string): string {
  if (typeof window === "undefined") return url;
  return new URL(url, window.location.origin).href;
}

/**
 * PDF preview URL: page 1 + Adobe-style open params where the viewer supports them.
 * toolbar=0 / navpanes=0 / statusbar=0 reduce chrome (print, download, side panes).
 * Not all browsers honor every flag; Chromium usually respects toolbar.
 */
function pdfPreviewPageOneSrc(url: string): string {
  const base = absoluteDocUrl(url);
  const pathOnly = base.split("#")[0] ?? base;
  const params = [
    "page=1",
    "toolbar=0",
    "navpanes=0",
    "statusbar=0",
    "view=FitH",
  ].join("&");
  return `${pathOnly}#${params}`;
}

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
  /** Which document row is hovered — mounts iframe preview for that row only */
  const [hoverDocUrl, setHoverDocUrl] = useState<string | null>(null);

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

  const handleDocClick = useCallback(
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
        <h2 className="text-2xl font-bold mb-6">Documentos relacionados</h2>
        <div className="rounded-lg border border-border bg-card shadow-sm overflow-visible">
          <div
            role="tablist"
            aria-label="Categorías de documentos"
            className="flex flex-wrap sm:flex-nowrap border-b border-border bg-muted/30"
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
                    "relative flex-1 min-w-0 px-3 py-3 sm:px-5 sm:py-3.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-wide transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    selected
                      ? "bg-card text-primary border-b-2 border-primary -mb-px z-1"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-b-2 border-transparent"
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
            <ul className="grid grid-cols-1 h-[50dvh] sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {activeDocs.map((doc, index) => (
                <li
                  key={`${doc.categoria}-${doc.url}-${index}`}
                  className="relative min-h-0"
                >
                  <div
                    className="relative"
                    onMouseEnter={() => setHoverDocUrl(doc.url)}
                    onMouseLeave={() => setHoverDocUrl(null)}
                  >
                    <button
                      type="button"
                      onClick={() => handleDocClick(doc)}
                      className="cursor-pointer w-full text-left flex items-start gap-3 p-3 rounded-md border border-transparent hover:border-border hover:bg-card-hover transition-colors duration-200 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="text-foreground group-hover/btn:text-primary transition-colors block truncate">
                          {doc.nombre}
                        </span>
                        {doc.paginas && (
                          <span className="inline-block mt-1 text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                            {doc.paginas}
                          </span>
                        )}
                      </span>
                      <Download
                        className="size-4 shrink-0 text-muted-foreground group-hover/btn:text-primary transition-colors"
                        aria-hidden
                      />
                    </button>

                    {hoverDocUrl === doc.url && (
                      <div
                        className={cn(
                          "absolute z-50 hidden md:block",
                          "left-0 top-full mt-2 w-[min(20rem,calc(100vw-3rem))]",
                          "rounded-lg border border-border bg-card p-3 shadow-xl ring-1 ring-black/5",
                          "xl:left-full xl:top-0 xl:ml-3 xl:mt-0"
                        )}
                        role="tooltip"
                      >
                        <p className="mb-2 line-clamp-5 text-xs font-medium leading-snug text-foreground wrap-break-word">
                          {doc.nombre}
                        </p>
                        {/* overflow-hidden clips PDF viewer scrollbars (iframe slightly larger than box) */}
                        <div className="relative h-60 w-full overflow-hidden rounded border border-border bg-muted">
                          <iframe
                            title={`Vista previa (pág. 1): ${doc.nombre}`}
                            src={pdfPreviewPageOneSrc(doc.url)}
                            className="pointer-events-none absolute left-0 top-0 h-[calc(100%+1.25rem)] w-[calc(100%+1.25rem)] max-w-none border-0 bg-muted"
                            loading="lazy"
                            tabIndex={-1}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
