import { resolveAllProducts, resolveProductBySlug, resolveAllProductSlugs } from "@/lib/products-resolve";
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
  const slugs = await resolveAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await resolveProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  const brand = product.marca?.trim() || "ACOGAS";
  return generateDynamicMetadata(`/productos/${slug}/`, {
    title: `${product.modelo} | ${brand}`,
    description: product.descripcion ?? `Producto ${product.modelo ?? slug} — ${brand}.`,
  });
}

export default async function ProductoPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    resolveProductBySlug(slug),
    resolveAllProducts(),
  ]);
  if (!product) notFound();

  return (
    <>
      <ProductsMainSection key={product.slug} product={product} />
      <ProductCmsMainSections product={product} />
      <div id="descargas-catalogo" className="scroll-mt-24">
        <AdditionalProductData key={product.slug} product={product} />
      </div>
      <ProductCmsFooterSections product={product} allProducts={allProducts} />
    </>
  );
}
