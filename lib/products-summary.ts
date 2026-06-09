import type { Product } from "@/domain/product";
import type { ProductSummary } from "@/lib/products-summary-cache";

export function toProductSummaries(products: Product[]): ProductSummary[] {
  return products.map((p) => ({
    slug: p.slug,
    modelo: p.modelo,
    marca: p.marca,
    imagen: p.imagen,
    macroCategoria: p.macroCategoria,
  }));
}

export function toProductSummary(product: Product): ProductSummary {
  return {
    slug: product.slug,
    modelo: product.modelo,
    marca: product.marca,
    imagen: product.imagen,
    macroCategoria: product.macroCategoria,
  };
}
