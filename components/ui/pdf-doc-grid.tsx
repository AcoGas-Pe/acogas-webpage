"use client";

import { useEffect, useMemo, useState } from "react";
import type { CatalogoDocs } from "@/domain/product";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

const CERT_DOC_TIPO_LABEL: Partial<Record<string, string>> = {
  garantia: "Garantia",
  respaldo_comercial: "Respaldo comercial",
  otro: "Otro",
};

function absoluteDocUrl(url: string): string {
  if (typeof window === "undefined") return url;
  return new URL(url, window.location.origin).href;
}

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
  previewAriaLabel?: string;
}

function PdfHoverPreview({
  doc,
  className,
}: {
  doc: CatalogoDocs;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none overflow-hidden rounded-lg border border-border bg-muted shadow-lg",
        className,
      )}
      aria-hidden
    >
      <iframe
        title={`Vista previa: ${doc.nombre}`}
        src={pdfPreviewPageOneSrc(doc.url)}
        className="h-full w-full border-0 bg-muted"
        loading="lazy"
        tabIndex={-1}
      />
    </div>
  );
}

/** Lista con mini preview al hover (solo desktop). Click descarga. */
export function PdfDocGrid({ docs, onDocSelect }: PdfDocGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (docs.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No hay documentos en esta categoria por ahora.
      </p>
    );
  }

  const hoveredDoc =
    hoveredIndex !== null ? docs[Math.min(hoveredIndex, docs.length - 1)] : null;

  return (
    <div className="relative">
      {hoveredDoc ? (
        <div className="pointer-events-none absolute right-4 top-0 z-20 hidden h-44 w-32 -translate-y-[calc(100%+0.75rem)] rounded-lg lg:block xl:h-52 xl:w-36">
          <PdfHoverPreview doc={hoveredDoc} className="h-full w-full" />
        </div>
      ) : null}

      <ul className="grid max-h-[min(42dvh,26rem)] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc, index) => (
          <li
            key={`${doc.categoria}-${doc.url}-${index}`}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() =>
              setHoveredIndex((current) => (current === index ? null : current))
            }
          >
            <button
              type="button"
              onClick={() => onDocSelect(doc)}
              className="group/btn flex w-full cursor-pointer items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-3 text-left shadow-sm transition-colors duration-200 hover:border-primary/20 hover:bg-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-foreground transition-colors group-hover/btn:text-primary">
                  {doc.nombre}
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-1">
                  {doc.paginas ? (
                    <span className="inline-block rounded bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground">
                      {doc.paginas}
                    </span>
                  ) : null}
                  {doc.tipo && doc.tipo !== "certificado" ? (
                    <span className="inline-block rounded border border-border bg-primary/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {CERT_DOC_TIPO_LABEL[doc.tipo] ?? doc.tipo}
                    </span>
                  ) : null}
                </span>
              </span>
              <Download
                className="size-4 shrink-0 text-muted-foreground transition-colors group-hover/btn:text-primary"
                aria-hidden
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Pagina de producto: hover cambia preview; click descarga. */
export function PdfDocListWithPreview({
  docs,
  onDocSelect,
  previewAriaLabel = "Vista previa del PDF",
}: PdfDocListWithPreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const docsFingerprint = useMemo(
    () => docs.map((d) => d.url).join("\0"),
    [docs],
  );

  useEffect(() => {
    setSelectedIndex(0);
    setHoveredIndex(null);
  }, [docsFingerprint]);

  if (docs.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No hay documentos en esta categoria por ahora.
      </p>
    );
  }

  const previewIndex =
    hoveredIndex !== null
      ? Math.min(hoveredIndex, docs.length - 1)
      : Math.min(selectedIndex, docs.length - 1);
  const selected = docs[previewIndex];
  const safeIdx = previewIndex;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
      <ul className="flex max-h-[min(50dvh,28rem)] flex-col gap-2 overflow-y-auto pr-1">
        {docs.map((doc, index) => (
          <li
            key={`${doc.categoria}-${doc.url}-${index}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() =>
              setHoveredIndex((current) => (current === index ? null : current))
            }
          >
            <button
              type="button"
              onClick={() => onDocSelect(doc)}
              className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                index === safeIdx
                  ? "border-primary/35 bg-primary/8"
                  : "border-border/60 bg-background/70 hover:border-primary/20 hover:bg-card-hover"
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground line-clamp-2">
                  {doc.nombre}
                </span>
                {doc.paginas ? (
                  <span className="mt-1 inline-block rounded bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground">
                    {doc.paginas}
                  </span>
                ) : null}
              </span>
              <Download className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <div
        className="relative min-h-[min(50dvh,28rem)] overflow-hidden rounded-xl border border-border bg-muted"
        aria-label={previewAriaLabel}
      >
        <iframe
          title={`Vista previa: ${selected.nombre}`}
          src={pdfPreviewPageOneSrc(selected.url)}
          className="absolute inset-0 h-full w-full border-0 bg-muted"
          loading="lazy"
        />
      </div>
    </div>
  );
}
