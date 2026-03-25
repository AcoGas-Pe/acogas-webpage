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
      <div className=" container max-w-5xl flex flex-row justify-between">
        <div className="container">
          <Image
            src={product.imagen || "/assets/config/placeholder-image.png"}
            alt={product.modelo || "Producto"}
            width={100}
            height={100}
            className="w-full h-[60dvh] object-cover"
          />
        </div>
        <div className="container">
          <h1 className="text-2xl mb-1 !font-semibold !tracking-wide text-foreground">
            {product.modelo}
          </h1>
          <a
            href={`/${(product.marca || "").toLowerCase()}/`}
            className="text-sm px-2 mb-4 text-primary font-light hover:font-bold  transition-all"
          >
            {product.marca}
          </a>
          <span className="text-sm flex px-2 border-b border-primary font-bold text-primary w-full">
            Características
          </span>
          <div className=" grid grid-cols-1 gap-2 py-2">
            {product.caracteristicas?.map((carac, idx) => (
              <p key={idx} className="text-sm px-2 text-foreground/80 wrap-normal">
                {carac}
              </p>
            ))}
          </div>
          <div className="mt-2 flex flex-row gap-2">
            <Button
              variant="default"
              href="#descargas-catalogo"
              size="sm"
              className="w-full sm:w-fit min-h-10"
            >
              Descargar catálogo
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
              onClick={() => handleProdCount(prodCount + 1)}
              className="w-full sm:w-fit min-h-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              +
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleProdCount(prodCount - 1)}
              className="w-full sm:w-fit min-h-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              -
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
