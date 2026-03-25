import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ProductsCatalogClient } from "@/components/productos/products-catalog-client";
import { buildCatalogFacets } from "@/lib/product-catalog";
import { getAllProducts } from "@/lib/products-data";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataFromConfig("/productos/");

export default function ProductosPage() {
  const products = getAllProducts();
  const facets = buildCatalogFacets(products);

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
      <ProductsCatalogClient products={products} facets={facets} />
    </>
  );
}
