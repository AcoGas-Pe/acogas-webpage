"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CatalogoDocs, CertificadoDocumentoTipo } from "@/domain/product";
import { DownloadGateModal } from "@/components/ui/download-gate-modal";
import { PdfDocGrid } from "@/components/ui/pdf-doc-grid";
import { isProductDownloadGateSatisfied } from "@/lib/download-gate-storage";
import { triggerFileDownload } from "@/lib/trigger-file-download";
import {
  certificadosMarcaDocs,
  getCertificadoMarcaTabs,
  getCertificadosForStrategicBrandSlug,
  resolveCertificadoTipo,
} from "@/lib/certificados-pdfs-data";
import { cn } from "@/lib/utils";

const TIPO_FILTER_ORDER: CertificadoDocumentoTipo[] = [
  "certificado",
  "garantia",
  "respaldo_comercial",
  "otro",
];

const TIPO_LABELS: Record<CertificadoDocumentoTipo, string> = {
  certificado: "Certificados",
  garantia: "Garantías",
  respaldo_comercial: "Respaldo comercial",
  otro: "Otros (Excel / comparativos)",
};

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

  const certTabs = useMemo(() => getCertificadoMarcaTabs(), []);

  const [activeMarcaTab, setActiveMarcaTab] = useState<string>("");

  useEffect(() => {
    if (singleBrandDocs !== null) return;
    if (certTabs.length === 0) {
      setActiveMarcaTab("");
      return;
    }
    setActiveMarcaTab((prev) =>
      prev && certTabs.includes(prev) ? prev : certTabs[0] ?? "",
    );
  }, [certTabs, singleBrandDocs]);

  const docsOfActiveMarca = useMemo(() => {
    if (singleBrandDocs !== null) return singleBrandDocs;
    if (!activeMarcaTab) return [];
    return certificadosMarcaDocs.filter(
      (d) => d.categoria === activeMarcaTab,
    );
  }, [singleBrandDocs, activeMarcaTab]);

  const tiposPresentes = useMemo(() => {
    const set = new Set<CertificadoDocumentoTipo>();
    for (const d of docsOfActiveMarca) {
      set.add(resolveCertificadoTipo(d));
    }
    return TIPO_FILTER_ORDER.filter((t) => set.has(t));
  }, [docsOfActiveMarca]);

  const [tipoFilter, setTipoFilter] = useState<CertificadoDocumentoTipo | "all">(
    "all",
  );

  useEffect(() => {
    setTipoFilter("all");
  }, [activeMarcaTab, singleBrandDocs]);

  useEffect(() => {
    if (tipoFilter !== "all" && !tiposPresentes.includes(tipoFilter)) {
      setTipoFilter("all");
    }
  }, [tipoFilter, tiposPresentes]);

  const activeDocs = useMemo(() => {
    if (tipoFilter === "all") return docsOfActiveMarca;
    return docsOfActiveMarca.filter(
      (d) => resolveCertificadoTipo(d) === tipoFilter,
    );
  }, [docsOfActiveMarca, tipoFilter]);

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

  const showMarcaTabs = singleBrandDocs === null && certTabs.length > 0;

  const tabSlug = (marca: string) =>
    `cert-marca-${marca.toLowerCase().replace(/\s+/g, "-")}`;

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
          {showMarcaTabs && (
            <div
              role="tablist"
              aria-label="Marca / fabricante"
              className="flex flex-wrap border-b border-border bg-muted/30 sm:flex-nowrap sm:overflow-x-auto"
            >
              {certTabs.map((marca) => {
                const selected = activeMarcaTab === marca;
                const id = tabSlug(marca);
                return (
                  <button
                    key={marca}
                    type="button"
                    role="tab"
                    id={id}
                    aria-selected={selected}
                    aria-controls={`cert-panel-${id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveMarcaTab(marca)}
                    className={cn(
                      "relative min-w-0 shrink-0 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide transition-colors sm:px-4 sm:py-3.5 sm:text-sm",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      selected
                        ? "z-1 border-b-2 border-primary bg-card text-primary -mb-px"
                        : "border-b-2 border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {marca}
                  </button>
                );
              })}
            </div>
          )}

          {tiposPresentes.length > 0 ? (
            <div
              className="flex flex-wrap gap-2 border-b border-border bg-muted/15 px-4 py-3 sm:px-6"
              role="group"
              aria-label="Tipo de documento"
            >
              <button
                type="button"
                onClick={() => setTipoFilter("all")}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm",
                  tipoFilter === "all"
                    ? "border-primary bg-primary/12 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                Todos
              </button>
              {tiposPresentes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTipoFilter(t)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm",
                    tipoFilter === t
                      ? "border-primary bg-primary/12 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {TIPO_LABELS[t]}
                </button>
              ))}
            </div>
          ) : null}

          <div
            role="tabpanel"
            id={
              showMarcaTabs && activeMarcaTab
                ? `cert-panel-${tabSlug(activeMarcaTab)}`
                : "cert-panel-single-marca"
            }
            aria-labelledby={
              showMarcaTabs && activeMarcaTab
                ? tabSlug(activeMarcaTab)
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
