"use client";

import type { Product } from "@/domain/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useQuoteCart } from "@/contexts/quote-cart-context";

interface ProductsMainSectionProps {
  product: Product;
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function ProductsMainSection({ product }: ProductsMainSectionProps) {
  const { addProduct, open: openQuoteCart } = useQuoteCart();
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Productos", href: "/productos/" },
    { label: product.marca || "", href:  `/${(product.marca || "").toLowerCase()}/`  },
    {
      label: product.modelo || "Producto",
      href: `/${product.slug}/`,
    },
  ];
  const [prodCount, setProdCount] = useState(0);
  const handleProdCount = (count: number) => {
    setProdCount(count);
    if (count < 0) {
      setProdCount(0);
    }
    if (count > 10) {
      setProdCount(10);
    }
  };
  return (
    <section className="  flex flex-col py-16 sm:py-20 md:py-24">
      <div
        className="mb-4 text-sm font-light max-w-7xl container"
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
        <div className="relative min-h-[280px] w-full overflow-hidden rounded-xl border border-border bg-muted lg:sticky lg:top-24 lg:min-h-[min(70vh,520px)]">
          <Image
            src={product.imagen || "/assets/config/placeholder-image.png"}
            alt={product.modelo || "Producto"}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 45vw"
            priority
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl mb-1 !font-semibold !tracking-wide text-foreground md:text-3xl">
            {product.modelo}
          </h1>
          <a
            href={`/${(product.marca || "").toLowerCase()}/`}
            className="text-sm px-2 mb-4 text-primary font-light hover:font-bold  transition-all"
          >
            {product.marca}
          </a>
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
          <div className="mt-2 flex flex-row flex-wrap gap-2">
            <Button
              variant="default"
              type="button"
              size="sm"
              className="w-full sm:w-fit min-h-10"
              onClick={() => {
                document
                  .getElementById("descargas-catalogo")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Ver documentación
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="w-full sm:w-fit min-h-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => {
                const qty = Math.max(1, prodCount);
                addProduct(product.slug, qty);
                openQuoteCart();
              }}
            >
              Agregar a cotización ({prodCount})
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleProdCount(prodCount - 1)}
              className="w-full sm:w-fit min-h-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              -
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleProdCount(prodCount + 1)}
              className="w-full sm:w-fit min-h-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              +
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
