import { getProductBySlug, getAllProductSlugs } from "@/lib/products-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateDynamicMetadata } from "@/lib/seo-metadata";
import { cn } from "@/lib/utils";
import { EspecificacionItem } from "@/domain/product/types";
import { ProductsMainSection } from "@/components/sections/producto/main-section";
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
      <AdditionalProductData product={product} />

      <section className="section container max-w-4xl mx-auto">
        <div className="space-y-10">
          {/* Marca */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Marca
            </h2>
            <p className="text-lg font-semibold text-foreground">{product.marca}</p>
          </div>
        </div>
      </section>
    </>
  );
}
