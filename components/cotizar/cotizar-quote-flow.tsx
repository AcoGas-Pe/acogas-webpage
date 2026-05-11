"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/domain/product";
import { useQuoteCart } from "@/contexts/quote-cart-context";
import { getProductBySlug } from "@/lib/products-data";
import { MAX_QTY_PER_LINE } from "@/lib/quote-cart-storage";
import {
  buildQuoteWhatsappMessage,
  quoteWhatsappHref,
} from "@/lib/quote-whatsapp";
import { Button } from "@/components/ui/button";
import { PRODUCT_IMAGE_FALLBACK } from "@/lib/default-images";
import Image from "next/image";

const MIN_SEARCH_LEN = 2;

interface CotizarQuoteFlowProps {
  products: Product[];
}

export function CotizarQuoteFlow({ products }: CotizarQuoteFlowProps) {
  const [query, setQuery] = useState("");
  const { lines, addProduct, totalQuantity } = useQuoteCart();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < MIN_SEARCH_LEN) return [];
    return products.filter((p) => {
      const hay = [
        p.modelo,
        p.marca,
        p.slug,
        p.descripcion,
        p.submodelo,
        p.grupoEmpresarial,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [products, query]);

  const trimmed = query.trim();
  const searching = trimmed.length >= MIN_SEARCH_LEN;

  const sendWhatsapp = () => {
    if (lines.length === 0) return;
    const items = lines.map((line) => {
      const p = getProductBySlug(line.slug);
      return {
        slug: line.slug,
        modelo: p?.modelo ?? line.slug,
        marca: p?.marca,
        quantity: line.quantity,
      };
    });
    const msg = buildQuoteWhatsappMessage(items);
    window.open(quoteWhatsappHref(msg), "_blank", "noopener,noreferrer");
  };

  let listEmptyMessage: string | null = null;
  if (trimmed.length === 0) {
    listEmptyMessage =
      "Escriba al menos dos letras para buscar en el catálogo. No mostramos todo el listado para mantener la página ágil y ordenada.";
  } else if (trimmed.length < MIN_SEARCH_LEN) {
    listEmptyMessage = `Siga escribiendo: faltan ${MIN_SEARCH_LEN - trimmed.length} carácter${MIN_SEARCH_LEN - trimmed.length === 1 ? "" : "es"}.`;
  } else if (filtered.length === 0) {
    listEmptyMessage =
      "No hay productos que coincidan con la búsqueda. Pruebe con otra palabra (modelo o marca).";
  }

  return (
    <section className="section border-y border-border bg-muted/30 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-4xl space-y-8 px-4">
        <div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Buscar productos
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Por nombre de modelo o marca. Solo se listan coincidencias dentro de un recuadro con
            scroll si hay muchos resultados.
          </p>
          <label htmlFor="cotizar-search" className="sr-only">
            Buscar producto
          </label>
          <input
            id="cotizar-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej. Fisher, modelo, marca…"
            autoComplete="off"
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {searching ? (
            <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
              {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
            </p>
          ) : null}
        </div>

        <div className="rounded-xl border border-border bg-background shadow-sm">
          <div
            className="max-h-[min(28rem,50dvh)] min-h-[8rem] overflow-y-auto overscroll-y-contain"
            aria-label="Resultados de búsqueda de productos"
          >
            {listEmptyMessage !== null ? (
              <div className="flex min-h-[8rem] items-center justify-center px-4 py-10 text-center text-sm text-muted-foreground">
                {listEmptyMessage}
              </div>
            ) : (
              <ul className="divide-y divide-border" role="list">
                {filtered.map((product) => (
                  <li key={product.slug}>
                    <ProductQuoteCompactRow product={product} onAdd={(qty) => addProduct(product.slug, qty)} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-5 rounded-xl border border-border bg-background p-6 shadow-sm">
          <div>
            <h3 className="text-lg font-semibold">Enviar cotización</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalQuantity === 0
                ? "Agregue al menos un producto desde el buscador para enviar por WhatsApp."
                : `Revise su lista (${totalQuantity} unidad${totalQuantity === 1 ? "" : "es"}) y envíe por WhatsApp.`}
            </p>
          </div>

          {lines.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Vista previa
              </p>
              <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-muted/20">
                {lines.map((line) => (
                  <QuoteSendPreviewRow key={line.slug} slug={line.slug} quantity={line.quantity} />
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-muted/10 px-4 py-8 text-center text-sm text-muted-foreground">
              Su cotización aparecerá aquí con foto, nombre y cantidad.
            </div>
          )}

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              size="lg"
              className="min-h-12 w-full shrink-0 sm:w-auto"
              disabled={lines.length === 0}
              onClick={sendWhatsapp}
            >
              Enviar por WhatsApp
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Se abrirá WhatsApp con los productos, cantidades y enlaces a cada ficha del sitio.
          </p>
        </div>
      </div>
    </section>
  );
}

function QuoteSendPreviewRow({
  slug,
  quantity,
}: {
  slug: string;
  quantity: number;
}) {
  const p = getProductBySlug(slug);
  const img = p?.imagen ?? PRODUCT_IMAGE_FALLBACK;
  const title = p?.modelo ?? slug;
  const marca = p?.marca;

  return (
    <li className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
      <Link
        href={`/productos/${slug}/`}
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-border/60 sm:h-16 sm:w-16"
      >
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {title}
          </p>
          {marca ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{marca}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-xs text-muted-foreground sm:hidden">Cantidad</span>
          <span className="inline-flex min-w-11 items-center justify-center rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-bold tabular-nums text-primary">
            {quantity}
          </span>
        </div>
      </div>
    </li>
  );
}

function ProductQuoteCompactRow({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (qty: number) => void;
}) {
  const [qty, setQty] = useState(1);

  const bump = (delta: number) => {
    setQty((q) => Math.min(MAX_QTY_PER_LINE, Math.max(1, q + delta)));
  };

  const title = product.modelo?.trim() || product.slug;
  const subtitle = product.marca?.trim();

  return (
    <div className="flex flex-col gap-3 px-3 py-3.5 transition-colors hover:bg-muted/35 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4">
      <div className="min-w-0 flex-1">
        <Link
          href={`/productos/${product.slug}/`}
          className="text-sm font-semibold text-foreground hover:text-primary sm:text-[0.9375rem]"
        >
          {title}
        </Link>
        {subtitle ? (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <div className="inline-flex items-center rounded-md border border-border bg-background">
          <button
            type="button"
            className="px-3 py-2 text-sm font-medium hover:bg-muted"
            onClick={() => bump(-1)}
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <span className="min-w-[2.5ch] px-2 text-center text-sm tabular-nums">{qty}</span>
          <button
            type="button"
            className="px-3 py-2 text-sm font-medium hover:bg-muted"
            onClick={() => bump(1)}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-h-9 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          onClick={() => onAdd(qty)}
        >
          Agregar
        </Button>
        <Link
          href={`/productos/${product.slug}/`}
          className="text-xs font-medium text-primary underline-offset-4 hover:underline max-sm:hidden"
        >
          Ficha
        </Link>
      </div>
    </div>
  );
}
