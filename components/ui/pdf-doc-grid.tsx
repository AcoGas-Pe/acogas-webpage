"use client";

import { useEffect, useMemo, useState } from "react";
import type { CatalogoDocs } from "@/domain/product";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

function absoluteDocUrl(url: string): string {
  if (typeof window === "undefined") return url;
  return new URL(url, window.location.origin).href;
}

/**
 * PDF preview URL: page 1 + Adobe-style open params where the viewer supports them.
 */
export function pdfPreviewPageOneSrc(url: string): string {
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

export interface PdfDocGridProps {
  docs: CatalogoDocs[];
  onDocSelect: (doc: CatalogoDocs) => void;
}

export interface PdfDocListWithPreviewProps extends PdfDocGridProps {
  /** Nombre accesible de la zona de vista previa */
  previewAriaLabel?: string;
}

/** Lista vertical + vista previa fija (estilo catálogo Soluciones / productos) */
export function PdfDocListWithPreview({
  docs,
  onDocSelect,
  previewAriaLabel = "Vista previa del PDF",
}: PdfDocListWithPreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const docsFingerprint = useMemo(
    () => docs.map((d) => d.url).join("\0"),
    [docs],
  );

  /** Otra lista de documentos (p. ej. otro tab u otro producto): reiniciar selección */
  useEffect(() => {
    setSelectedIndex(0);
  }, [docsFingerprint]);

  if (docs.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No hay documentos en esta categoría por ahora.
      </p>
    );
  }

  const selected = docs[Math.min(selectedIndex, docs.length - 1)];
  const safeIdx = Math.min(selectedIndex, docs.length - 1);

  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
      <ul
        className="flex max-h-[min(50vh,420px)] min-h-0 flex-col gap-1 overflow-y-auto pr-1 xl:max-h-[560px] xl:w-[min(100%,20rem)] xl:shrink-0"
        role="list"
      >
        {docs.map((doc, index) => {
          const isActive = safeIdx === index;
          return (
            <li key={`${doc.categoria}-${doc.url}-${index}`}>
              <div
                className={cn(
                  "flex rounded-lg border transition-colors",
                  isActive ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/40",
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "min-w-0 flex-1 px-3 py-2.5 text-left text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "text-primary" : "text-foreground hover:text-primary",
                  )}
                >
                  <span className="line-clamp-2">{doc.nombre}</span>
                  {doc.paginas ? (
                    <span className="mt-1 block text-xs font-normal text-muted-foreground">
                      {doc.paginas}
                    </span>
                  ) : null}
                </button>
                <button
                  type="button"
                  aria-label={`Descargar ${doc.nombre}`}
                  onClick={() => onDocSelect(doc)}
                  className="shrink-0 border-l border-border px-3 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  <Download className="size-4" aria-hidden />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        className="min-h-[min(50vh,360px)] min-w-0 flex-1 overflow-hidden rounded-lg border border-border bg-muted xl:min-h-[520px]"
        aria-label={previewAriaLabel}
      >
        <iframe
          key={selected.url}
          title={`Vista previa: ${selected.nombre}`}
          src={pdfPreviewPageOneSrc(selected.url)}
          className="h-full min-h-[min(50vh,360px)] w-full border-0 bg-muted xl:min-h-[520px]"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/** Lista + vista previa al hover */
export function PdfDocGrid({ docs, onDocSelect }: PdfDocGridProps) {
  const [hoverDocUrl, setHoverDocUrl] = useState<string | null>(null);

  if (docs.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No hay documentos en esta categoría por ahora.
      </p>
    );
  }

  return (
    <ul className="grid h-[50dvh] grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {docs.map((doc, index) => (
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
              onClick={() => onDocSelect(doc)}
              className="group/btn flex w-full cursor-pointer items-start gap-3 rounded-md border border-transparent p-3 text-left transition-colors duration-200 hover:border-border hover:bg-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-foreground transition-colors group-hover/btn:text-primary">
                  {doc.nombre}
                </span>
                {doc.paginas && (
                  <span className="mt-1 inline-block rounded bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground">
                    {doc.paginas}
                  </span>
                )}
              </span>
              <Download
                className="size-4 shrink-0 text-muted-foreground transition-colors group-hover/btn:text-primary"
                aria-hidden
              />
            </button>

            {hoverDocUrl === doc.url && (
              <div
                className={cn(
                  "absolute z-50 hidden md:block",
                  "left-0 top-full mt-2 w-[min(20rem,calc(100vw-3rem))]",
                  "rounded-lg border border-border bg-card p-3 shadow-xl ring-1 ring-black/5",
                  "xl:left-full xl:top-0 xl:ml-3 xl:mt-0",
                )}
                role="tooltip"
              >
                <p className="mb-2 line-clamp-5 wrap-break-word text-xs font-medium leading-snug text-foreground">
                  {doc.nombre}
                </p>
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
  );
}
