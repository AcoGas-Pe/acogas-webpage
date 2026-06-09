"use client";

import type { Product } from "@/domain/product";
import { PRODUCT_IMAGE_FALLBACK } from "@/lib/default-images";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuoteCart } from "@/contexts/quote-cart-context";
import { useProductsCatalog } from "@/contexts/products-catalog-context";
import { toProductSummary } from "@/lib/products-summary";

interface ProductsMainSectionProps {
  product: Product;
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function ProductsMainSection({ product }: ProductsMainSectionProps) {
  const { addProduct, open: openQuoteCart } = useQuoteCart();
  const { hydrateSummaries } = useProductsCatalog();

  useEffect(() => {
    hydrateSummaries([toProductSummary(product)]);
  }, [product, hydrateSummaries]);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Productos", href: "/productos/" },
    ...(product.marca
      ? [
          {
            label: product.marca,
            href: `/productos/?marca=${encodeURIComponent(product.marca)}`,
          },
        ]
      : []),
    {
      label: product.modelo || "Producto",
      href: `/productos/${product.slug}/`,
    },
  ];
  const [prodCount, setProdCount] = useState(1);
  const handleProdCount = (count: number) => {
    setProdCount(Math.min(10, Math.max(1, count)));
  };
  return (
    <section className="  flex flex-col py-16 sm:py-20 md:py-24">
      <div
        className="mb-4 text-sm font-light max-w-7xl container pt-20" 
        aria-label="Breadcrumb"
      >
        <ol className="list-none p-0 inline-flex items-center text-muted-foreground">
          {breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.href}>
              <a
                href={breadcrumb.href}
                className="hover:text-primary hover:underline transition-colors"
              >
                {breadcrumb.label}
              </a>
              <span className="mx-1 text-gray-400">/</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="container max-w-6xl grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
        <div className="relative min-h-[280px] w-full overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-lg shadow-primary/5 lg:sticky lg:top-24 lg:min-h-[min(70vh,520px)]">
          <Image
            src={product.imagen || PRODUCT_IMAGE_FALLBACK}
            alt={product.modelo || "Producto"}
            fill
            className="object-contain p-6 sm:p-8"
            sizes="(max-width:1024px) 100vw, 45vw"
            priority
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl mb-1 !font-semibold !tracking-wide text-foreground md:text-3xl">
            {product.modelo}
          </h1>
          <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 px-2 text-sm">
            {product.marca ? (
              <a
                href={`/productos/?marca=${encodeURIComponent(product.marca)}`}
                className="text-primary font-light transition-all hover:font-semibold"
              >
                {product.marca}
              </a>
            ) : null}
            {product.grupoEmpresarial?.trim() ? (
              <>
                {product.marca ? (
                  <span className="text-muted-foreground font-light" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span className="font-medium text-muted-foreground">
                  {product.grupoEmpresarial.trim()}
                </span>
              </>
            ) : null}
          </div>
          <span className="text-sm flex border-b border-primary px-2 font-bold text-primary">
            Características
          </span>
          <ul className="grid grid-cols-1 gap-2 py-3">
            {product.caracteristicas?.map((carac, idx) => (
              <li
                key={idx}
                className="rounded-lg border border-border/80 bg-muted/20 px-3 py-2 text-sm text-foreground/90"
              >
                {carac}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="inline-flex items-center rounded-lg border border-border bg-muted/30">
              <button
                type="button"
                className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-l-lg"
                onClick={() => handleProdCount(prodCount - 1)}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="min-w-[2.5rem] px-2 text-center text-sm font-semibold tabular-nums">
                {prodCount}
              </span>
              <button
                type="button"
                className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-r-lg"
                onClick={() => handleProdCount(prodCount + 1)}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            <Button
              variant="default"
              type="button"
              size="sm"
              className="w-full sm:w-auto min-h-10"
              onClick={() => {
                addProduct(product.slug, prodCount);
                openQuoteCart();
              }}
            >
              Agregar a cotizacion
            </Button>
            <Button
              variant="outline"
              type="button"
              size="sm"
              className="w-full sm:w-auto min-h-10"
              onClick={() => {
                document
                  .getElementById("descargas-catalogo")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Ver documentacion
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
