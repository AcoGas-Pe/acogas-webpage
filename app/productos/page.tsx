import { Suspense } from "react";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ProductsCatalogClient } from "@/components/productos/products-catalog-client";
import { buildCatalogFacets } from "@/lib/product-catalog";
import { resolveAllProducts } from "@/lib/products-resolve";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import type { Metadata } from "next";

/** Render bajo demanda (evita HTML del build con JSON estático); datos WP cacheados vía unstable_cache. */
export const dynamic = "force-dynamic";
export const metadata: Metadata = generateMetadataFromConfig("/productos/");

export default async function ProductosPage() {
  const products = await resolveAllProducts();
  const facets = buildCatalogFacets(products);

  return (
    <>
      <JsonLdScripts pathname="/productos/" />
      <PagesHero
        title="Productos"
        subtitle="Catálogo industrial"
        description="Filtre por marca, categoría, tipo de brochure y fluido. Busque por nombre y cambie entre vista en cuadrícula o en lista."
        image="/assets/images/alimentos.webp"
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
