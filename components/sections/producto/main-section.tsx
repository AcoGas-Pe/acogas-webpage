"use client";

import type { Product } from "@/domain/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";


interface ProductsMainSectionProps {
  product: Product;
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

/* pending feature after finishing design,
 we add the cart functionality with number input too depending on the product */

export function ProductsMainSection({
  product,
}: ProductsMainSectionProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Productos", href: "/productos" },
    { label: product.marca || "Producto", href: `/productos/${product.slug}` },
    { label: product.modelo || "Producto", href: `/productos/${product.slug}/${product.modelo}` },
  ];
  return (
    <section className="  flex flex-col py-16 sm:py-20 md:py-24">
      <div className="mb-4 text-sm font-light max-w-7xl container" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex items-center text-muted-foreground">
          {breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.href}>
              <a href={breadcrumb.href} className="hover:text-primary hover:underline transition-colors">{breadcrumb.label}</a>
              <span className="mx-1 text-gray-400">/</span>
            </li>
          ))}
        </ol>
      </div>
      <div className=" container max-w-5xl flex flex-row justify-between">
       <div className="container">
        <Image 
        src={product.imagen || "/assets/config/placeholder-image.png"} 
        alt={product.modelo || "Producto"} width={100} height={100} 
        className="w-full h-[60dvh] object-cover" />
        </div>
        <div className="container">
        <h1 className="text-2xl mb-2 !font-semibold !tracking-wide text-foreground">
          {product.modelo}
        </h1>
        <p className="text-sm px-2 mb-4 text-muted-foreground font-light" >
          {product.marca}
        </p>
        <p className="text-sm px-2 mb-8 text-muted-foreground max-w-lg px-2" >
          {product.descripcion}
        </p>
        <div className="flex flex-row gap-2">
        <Button variant="default" href="#descargas-catalogo" size="sm" className="w-full sm:w-fit min-h-10">
          Descargar catálogo
        </Button>
        <Button variant="outline" size="sm" href="/cotizar/" className="w-full sm:w-fit min-h-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Solicitar cotización
        </Button>
        </div>
        <span className="text-sm flex py-2 opacity-50 px-2 border-b border-muted-foreground font-light w-full">
        </span>
        

        
        <ul className="list-disc grid grid-cols-2 gap-4 list-inside text-sm px-2 text-muted-foreground font-light">
          {product.caracteristicas?.map((caracteristica) => (
            <li key={caracteristica}>{caracteristica}</li>
          ))}
        </ul>
        </div>
      </div> 
    </section>
  );
}
