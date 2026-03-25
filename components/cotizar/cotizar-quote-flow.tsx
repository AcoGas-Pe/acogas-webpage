"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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

interface CotizarQuoteFlowProps {
  products: Product[];
}

export function CotizarQuoteFlow({ products }: CotizarQuoteFlowProps) {
  const [query, setQuery] = useState("");
  const { lines, addProduct, totalQuantity } = useQuoteCart();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const hay = [p.modelo, p.marca, p.slug, p.descripcion]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [products, query]);

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

  return (
    <section className="section py-16 sm:py-20 md:py-24 bg-muted/30 border-y border-border">
      <div className="container max-w-4xl mx-auto px-4 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Buscar productos
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Busque por nombre, marca o palabras clave. Ajuste la cantidad y agréguelo a su
            cotización, igual que en la ficha del producto.
          </p>
          <label htmlFor="cotizar-search" className="sr-only">
            Buscar producto
          </label>
          <input
            id="cotizar-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej. Fisher, bomba, regulador…"
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <ul className="space-y-4">
          {filtered.length === 0 ? (
            <li className="text-sm text-muted-foreground py-8 text-center">
              No hay productos que coincidan con su búsqueda.
            </li>
          ) : (
            filtered.map((product) => (
              <li key={product.slug}>
                <ProductQuoteRow product={product} onAdd={(qty) => addProduct(product.slug, qty)} />
              </li>
            ))
          )}
        </ul>

        <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-semibold">Enviar cotización</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {totalQuantity === 0
                ? "Agregue al menos un producto para enviar por WhatsApp."
                : `Revise su lista (${totalQuantity} unidad${totalQuantity === 1 ? "" : "es"}) y envíe por WhatsApp.`}
            </p>
          </div>

          {lines.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Vista previa
              </p>
              <ul className="rounded-lg border border-border divide-y divide-border bg-muted/20 overflow-hidden">
                {lines.map((line) => (
                  <QuoteSendPreviewRow key={line.slug} slug={line.slug} quantity={line.quantity} />
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-muted/10 px-4 py-8 text-center text-sm text-muted-foreground">
              Su cotización aparecerá aquí con imagen, nombre y cantidad.
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-1">
            <Button
              type="button"
              size="lg"
              className="w-full sm:w-auto min-h-12 shrink-0"
              disabled={lines.length === 0}
              onClick={sendWhatsapp}
            >
              Enviar por WhatsApp
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Se abrirá WhatsApp con un mensaje que incluye los productos, cantidades y enlaces a
            cada ficha.
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
  const img = p?.imagen ?? "/assets/config/placeholder-image.png";
  const title = p?.modelo ?? slug;
  const marca = p?.marca;

  return (
    <li className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
      <Link
        href={`/productos/${slug}/`}
        className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-border/60"
      >
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </Link>
      <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
            {title}
          </p>
          {marca ? (
            <p className="text-xs text-muted-foreground mt-0.5">{marca}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground sm:hidden">Cantidad</span>
          <span className="inline-flex items-center justify-center min-w-11 rounded-md bg-primary/10 px-3 py-1.5 text-sm font-bold tabular-nums text-primary border border-primary/20">
            {quantity}
          </span>
        </div>
      </div>
    </li>
  );
}

function ProductQuoteRow({
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

  const img = product.imagen ?? "/assets/config/placeholder-image.png";
  const title = product.modelo ?? product.slug;

  return (
    <div className="flex flex-col sm:flex-row gap-4 rounded-lg border border-border bg-background p-4">
      <Link
        href={`/productos/${product.slug}/`}
        className="relative h-28 w-full sm:w-36 shrink-0 overflow-hidden rounded-md bg-muted"
      >
        <Image src={img} alt="" fill className="object-cover" sizes="(max-width:640px) 100vw, 144px" />
      </Link>
      <div className="min-w-0 flex-1 flex flex-col gap-3">
        <div>
          <Link
            href={`/productos/${product.slug}/`}
            className="text-base font-semibold text-foreground hover:text-primary line-clamp-2"
          >
            {title}
          </Link>
          {product.marca ? (
            <p className="text-sm text-muted-foreground mt-1">{product.marca}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          <div className="inline-flex items-center rounded-md border border-border">
            <button
              type="button"
              className="px-3 py-2 text-sm font-medium hover:bg-muted"
              onClick={() => bump(-1)}
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <span className="px-3 text-sm tabular-nums min-w-[2.5ch] text-center">{qty}</span>
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
            className="min-h-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => onAdd(qty)}
          >
            Agregar a cotización
          </Button>
        </div>
      </div>
    </div>
  );
}
