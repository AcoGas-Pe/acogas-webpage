import { Suspense } from "react";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { CatalogSummariesHydrate } from "@/components/productos/catalog-summaries-hydrate";
import { ProductsCatalogClient } from "@/components/productos/products-catalog-client";
import { buildCatalogFacets } from "@/lib/product-catalog";
import { resolveAllProducts } from "@/lib/products-resolve";
import { toProductSummaries } from "@/lib/products-summary";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import type { Metadata } from "next";
/** ISR: HTML revalida en sync con cache WordPress (default 5 min). */
export const revalidate = 300;
export const metadata: Metadata = generateMetadataFromConfig("/productos/");

export default async function ProductosPage() {
  const products = await resolveAllProducts();
  const facets = buildCatalogFacets(products);
  const summaries = toProductSummaries(products);

  return (
    <>
      <CatalogSummariesHydrate summaries={summaries} persistFullCatalog />
      <JsonLdScripts pathname="/productos/" />
      <PagesHero
        title="Productos"
        subtitle="Catálogo industrial"
        description="Filtre por marca, macrocategoria y categoria. Busque por nombre y cambie entre vista en cuadricula o en lista."
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
