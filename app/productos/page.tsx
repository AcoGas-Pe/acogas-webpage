import { Suspense } from "react";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ProductsCatalogClient } from "@/components/productos/products-catalog-client";
import { buildCatalogFacets, mergeSolucionesNavIntoFacets } from "@/lib/product-catalog";
import { resolveAllProducts } from "@/lib/products-resolve";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataFromConfig("/productos/");

export default async function ProductosPage() {
  const products = await resolveAllProducts();
  const facets = mergeSolucionesNavIntoFacets(buildCatalogFacets(products));

  return (
    <>
      <PagesHero
        title="Productos"
        subtitle="Catálogo industrial"
        description="Filtre por marca, categoría, tipo de brochure y fluido. Busque por nombre y cambie entre vista en cuadrícula o en lista."
        image="/assets/images/refiner3.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/productos/" },
        ]}
      />
      <Suspense fallback={<div className="section py-20 text-center text-muted-foreground text-sm">Cargando catálogo…</div>}>
        <ProductsCatalogClient products={products} facets={facets} />
      </Suspense>
    </>
  );
}
