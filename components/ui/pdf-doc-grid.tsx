"use client";

import { useState } from "react";
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

/** Lista + vista previa al hover (mismo patrón que documentos de producto) */
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
