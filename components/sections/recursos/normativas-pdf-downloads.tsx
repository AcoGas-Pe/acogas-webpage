"use client";

import { useCallback, useMemo, useState } from "react";
import type { CatalogoDocs } from "@/domain/product";
import { DownloadGateModal } from "@/components/ui/download-gate-modal";
import { PdfDocGrid } from "@/components/ui/pdf-doc-grid";
import { isProductDownloadGateSatisfied } from "@/lib/download-gate-storage";
import { triggerFileDownload } from "@/lib/trigger-file-download";
import {
  NORMATIVAS_DOWNLOAD_GATE_SLUG,
  normativasInternacionalesSueltos,
  normativasPeruanasLeyesYDecretos,
  normativasPeruanasNormasTecnicas,
  normativasPeruanasResoluciones,
  otrasNormativasDocumentosSueltos,
} from "@/lib/normativas-pdfs-data";
import { cn } from "@/lib/utils";

const PE_TAB_ORDER = [
  { id: "resoluciones", label: "Resoluciones" },
  { id: "normas-tecnicas", label: "Normas técnicas" },
  { id: "leyes-decretos", label: "Leyes y Decretos" },
] as const;

type MacroTab = "peruanas" | "internacionales";
type PeTabId = (typeof PE_TAB_ORDER)[number]["id"];

function peDocsForTab(id: PeTabId): CatalogoDocs[] {
  switch (id) {
    case "resoluciones":
      return normativasPeruanasResoluciones;
    case "normas-tecnicas":
      return normativasPeruanasNormasTecnicas;
    case "leyes-decretos":
      return normativasPeruanasLeyesYDecretos;
    default:
      return [];
  }
}

export function NormativasPdfDownloads() {
  const [pendingDownload, setPendingDownload] = useState<{
    url: string;
    nombre: string;
  } | null>(null);

  const [macroTab, setMacroTab] = useState<MacroTab>("peruanas");
  const [peTab, setPeTab] = useState<PeTabId>("resoluciones");

  const activeDocs = useMemo(() => {
    if (macroTab === "internacionales") return normativasInternacionalesSueltos;
    return peDocsForTab(peTab);
  }, [macroTab, peTab]);

  const handleDocSelect = useCallback(async (doc: CatalogoDocs) => {
    if (isProductDownloadGateSatisfied(NORMATIVAS_DOWNLOAD_GATE_SLUG)) {
      await triggerFileDownload(doc.url, doc.nombre);
      return;
    }
    setPendingDownload({ url: doc.url, nombre: doc.nombre });
  }, []);

  const hasOtras = otrasNormativasDocumentosSueltos.length > 0;

  return (
    <div className="border-b border-border/60 bg-muted/20 py-16 sm:py-20 md:py-24">
      <DownloadGateModal
        open={pendingDownload !== null}
        onClose={() => setPendingDownload(null)}
        productSlug={NORMATIVAS_DOWNLOAD_GATE_SLUG}
        downloadUrl={pendingDownload?.url ?? ""}
        documentTitle={pendingDownload?.nombre ?? ""}
      />

      <div className="container space-y-16 sm:space-y-20">
        <section aria-labelledby="normativas-web-heading">
          <h2
            id="normativas-web-heading"
            className="mb-6 text-2xl font-bold text-foreground"
          >
            Normativas para web
          </h2>

          <div className="overflow-visible rounded-lg border border-border bg-card shadow-sm">
            <div
              role="tablist"
              aria-label="Alcance normativo"
              className="flex flex-wrap border-b border-border bg-muted/30 sm:flex-nowrap"
            >
              <MacroTabButton
                selected={macroTab === "peruanas"}
                onClick={() => setMacroTab("peruanas")}
                id="macro-tab-pe"
                controlsId="macro-panel-normativas-web"
                label="Normativas peruanas"
              />
              <MacroTabButton
                selected={macroTab === "internacionales"}
                onClick={() => setMacroTab("internacionales")}
                id="macro-tab-int"
                controlsId="macro-panel-normativas-web"
                label="Normas internacionales"
              />
            </div>

            {macroTab === "peruanas" && (
              <div
                role="tablist"
                aria-label="Tipo de normativa peruana"
                className="flex flex-wrap border-b border-border bg-muted/15 sm:flex-nowrap"
              >
                {PE_TAB_ORDER.map((t) => (
                  <MacroTabButton
                    key={t.id}
                    selected={peTab === t.id}
                    onClick={() => setPeTab(t.id)}
                    id={`pe-tab-${t.id}`}
                    controlsId="macro-panel-normativas-web"
                    label={t.label}
                    sublevel
                  />
                ))}
              </div>
            )}

            <div
              role="tabpanel"
              id="macro-panel-normativas-web"
              aria-labelledby={
                macroTab === "peruanas" ? `pe-tab-${peTab}` : "macro-tab-int"
              }
              className="px-4 py-4 sm:px-8 sm:py-6"
            >
              {macroTab === "internacionales" && (
                <p className="mb-4 text-sm text-muted-foreground">
                  Documentos sueltos y referencias internacionales de apoyo a
                  ingeniería (sustituya por PDFs propios alojados en el sitio
                  cuando corresponda).
                </p>
              )}
              <PdfDocGrid docs={activeDocs} onDocSelect={handleDocSelect} />
            </div>
          </div>
        </section>

        {hasOtras && (
          <section aria-labelledby="otras-normativas-heading">
            <h2
              id="otras-normativas-heading"
              className="mb-6 text-2xl font-bold text-foreground"
            >
              Otras normativas (documentos sueltos)
            </h2>
            <div className="overflow-visible rounded-lg border border-border bg-card shadow-sm">
              <div className="px-4 py-4 sm:px-8 sm:py-6">
                <PdfDocGrid
                  docs={otrasNormativasDocumentosSueltos}
                  onDocSelect={handleDocSelect}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function MacroTabButton({
  selected,
  onClick,
  id,
  controlsId,
  label,
  sublevel,
}: {
  selected: boolean;
  onClick: () => void;
  id: string;
  controlsId: string;
  label: string;
  sublevel?: boolean;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={selected}
      aria-controls={controlsId}
      tabIndex={selected ? 0 : -1}
      onClick={onClick}
      className={cn(
        "relative min-w-0 flex-1 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide transition-colors sm:px-5 sm:py-3.5 sm:text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sublevel
          ? selected
            ? "z-1 border-b-2 border-primary bg-card/80 text-primary -mb-px"
            : "border-b-2 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          : selected
            ? "z-1 border-b-2 border-primary bg-card text-primary -mb-px"
            : "border-b-2 border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
