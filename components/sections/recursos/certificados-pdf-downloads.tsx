"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CatalogoDocs } from "@/domain/product";
import { DownloadGateModal } from "@/components/ui/download-gate-modal";
import { PdfDocGrid } from "@/components/ui/pdf-doc-grid";
import { isProductDownloadGateSatisfied } from "@/lib/download-gate-storage";
import { triggerFileDownload } from "@/lib/trigger-file-download";
import {
  CERTIFICADO_BRAND_SLUGS,
  certificadosFisher,
  certificadosSpence,
  certificadosTartarini,
  getCertificadosForStrategicBrandSlug,
} from "@/lib/certificados-pdfs-data";
import { cn } from "@/lib/utils";

const TAB_LABEL: Record<(typeof CERTIFICADO_BRAND_SLUGS)[number], string> = {
  fisher: "Fisher",
  tartarini: "Tartarini",
  spence: "Spence",
};

function docsForBrandTab(
  slug: (typeof CERTIFICADO_BRAND_SLUGS)[number]
): CatalogoDocs[] {
  switch (slug) {
    case "fisher":
      return certificadosFisher;
    case "tartarini":
      return certificadosTartarini;
    case "spence":
      return certificadosSpence;
    default:
      return [];
  }
}

export interface CertificadosPdfDownloadsProps {
  /** Clave del gate HubSpot (p. ej. página de recursos vs. marcas) */
  gateSlug: string;
  /**
   * Slug de marca estratégica (`fisher`, …). Si se omite, se muestran pestañas por marca.
   * Si la marca no tiene certificados en `/assets/docs/certificados/`, no se renderiza nada.
   */
  brandSlug?: string | null;
  /** Título de sección visible (accesible) */
  sectionTitle: string;
  /** Párrafo opcional bajo el título */
  description?: string;
  /** Si es false, descarga directa sin formulario previo */
  requireDownloadGate?: boolean;
}

export function CertificadosPdfDownloads({
  gateSlug,
  brandSlug = null,
  sectionTitle,
  description,
  requireDownloadGate = true,
}: CertificadosPdfDownloadsProps) {
  const [pendingDownload, setPendingDownload] = useState<{
    url: string;
    nombre: string;
  } | null>(null);

  const singleBrandDocs = useMemo(() => {
    if (!brandSlug?.trim()) return null;
    return getCertificadosForStrategicBrandSlug(brandSlug.trim());
  }, [brandSlug]);

  const [activeBrandTab, setActiveBrandTab] =
    useState<(typeof CERTIFICADO_BRAND_SLUGS)[number]>("fisher");

  useEffect(() => {
    if (singleBrandDocs !== null) return;
    const first = CERTIFICADO_BRAND_SLUGS[0];
    if (first) setActiveBrandTab(first);
  }, [singleBrandDocs]);

  const activeDocs = useMemo(() => {
    if (singleBrandDocs !== null) return singleBrandDocs;
    return docsForBrandTab(activeBrandTab);
  }, [singleBrandDocs, activeBrandTab]);

  const handleDocSelect = useCallback(
    async (doc: CatalogoDocs) => {
      if (
        !requireDownloadGate ||
        isProductDownloadGateSatisfied(gateSlug)
      ) {
        await triggerFileDownload(doc.url, doc.nombre);
        return;
      }
      setPendingDownload({ url: doc.url, nombre: doc.nombre });
    },
    [gateSlug, requireDownloadGate]
  );

  if (singleBrandDocs !== null && singleBrandDocs.length === 0) {
    return null;
  }

  return (
    <section
      className="border-b border-border/60 bg-muted/20 py-16 sm:py-20 md:py-24"
      aria-labelledby="certificados-downloads-heading"
    >
      {requireDownloadGate ? (
        <DownloadGateModal
          open={pendingDownload !== null}
          onClose={() => setPendingDownload(null)}
          productSlug={gateSlug}
          downloadUrl={pendingDownload?.url ?? ""}
          documentTitle={pendingDownload?.nombre ?? ""}
        />
      ) : null}

      <div className="container">
        <h2
          id="certificados-downloads-heading"
          className="mb-3 text-2xl font-bold text-foreground"
        >
          {sectionTitle}
        </h2>
        {description ? (
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}

        <div className="overflow-visible rounded-lg border border-border bg-card shadow-sm">
          {singleBrandDocs === null && (
            <div
              role="tablist"
              aria-label="Marca"
              className="flex flex-wrap border-b border-border bg-muted/30 sm:flex-nowrap"
            >
              {CERTIFICADO_BRAND_SLUGS.map((slug) => {
                const selected = activeBrandTab === slug;
                const tabId = `cert-tab-${slug}`;
                const panelId = `cert-panel-${slug}`;
                return (
                  <button
                    key={slug}
                    type="button"
                    role="tab"
                    id={tabId}
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveBrandTab(slug)}
                    className={cn(
                      "relative min-w-0 flex-1 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide transition-colors sm:px-5 sm:py-3.5 sm:text-sm",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      selected
                        ? "z-1 border-b-2 border-primary bg-card text-primary -mb-px"
                        : "border-b-2 border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {TAB_LABEL[slug]}
                  </button>
                );
              })}
            </div>
          )}

          <div
            role="tabpanel"
            id={
              singleBrandDocs === null
                ? `cert-panel-${activeBrandTab}`
                : undefined
            }
            aria-labelledby={
              singleBrandDocs === null
                ? `cert-tab-${activeBrandTab}`
                : undefined
            }
            className="px-4 py-4 sm:px-8 sm:py-6"
          >
            <PdfDocGrid docs={activeDocs} onDocSelect={handleDocSelect} />
          </div>
        </div>
      </div>
    </section>
  );
}
