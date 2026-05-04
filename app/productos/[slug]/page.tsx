import { getProductBySlug, getAllProductSlugs } from "@/lib/products-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateDynamicMetadata } from "@/lib/seo-metadata";
import { ProductsMainSection } from "@/components/sections/producto/main-section";
import {
  ProductCmsFooterSections,
  ProductCmsMainSections,
} from "@/components/sections/producto/product-cms-sections";
import { AdditionalProductData } from "@/components/sections/producto/extra-data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return generateDynamicMetadata(`/productos/${slug}/`, {
    title: `${product.modelo} | ${product.marca}`,
    description: product.descripcion ?? `Producto ${product.modelo} de ${product.marca}.`,
  });
}

export default async function ProductoPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <ProductsMainSection product={product} />
      <ProductCmsMainSections product={product} />
      <div id="descargas-catalogo" className="scroll-mt-24">
        <AdditionalProductData product={product} />
      </div>
      <ProductCmsFooterSections product={product} />
    </>
  );
}
