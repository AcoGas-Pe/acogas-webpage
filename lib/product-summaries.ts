import type { Product } from "@/domain/product";
import { getAllProducts } from "@/lib/products-data";

export type ProductCardSummary = Pick<Product, "slug" | "modelo" | "marca" | "imagen">;

function toSummary(p: Product): ProductCardSummary {
  return {
    slug: p.slug,
    modelo: p.modelo,
    marca: p.marca,
    imagen: p.imagen,
  };
}

/** Resuelve slugs contra el catálogo (por defecto estático; pasar `catalog` si vienes de WP). */
export function getProductSummariesBySlugs(
  slugs: string[] | undefined,
  catalog?: Product[],
): ProductCardSummary[] {
  if (!slugs?.length) return [];
  const list = catalog ?? getAllProducts();
  const bySlug = new Map(list.map((p) => [p.slug, p] as const));
  const out: ProductCardSummary[] = [];
  for (const s of slugs) {
    const p = bySlug.get(s);
    if (p) {
      out.push(toSummary(p));
    }
  }
  return out;
}

function sameMarca(a: string | undefined, b: string | undefined): boolean {
  const x = a?.trim().toLowerCase();
  const y = b?.trim().toLowerCase();
  return Boolean(x && y && x === y);
}

function sameTaxonomy(p: Product, other: Product): number {
  let score = 0;
  if (p.macroCategoria?.trim() && p.macroCategoria === other.macroCategoria) score += 2;
  if (p.categoria?.trim() && p.categoria === other.categoria) score += 2;
  if (p.tipoBrochure?.trim() && p.tipoBrochure === other.tipoBrochure) score += 1;
  return score;
}

/**
 * Productos relacionados: primero `relacionadosSlugs` (orden CMS); si no hay o faltan entradas,
 * completa con otros del mismo catálogo (misma marca, luego afinidad por categorías).
 */
export function getRelatedProductSummaries(
  product: Product,
  options?: { limit?: number; catalog?: Product[] },
): ProductCardSummary[] {
  const limit = options?.limit ?? 6;
  const all = options?.catalog ?? getAllProducts();
  const bySlug = new Map(all.map((p) => [p.slug, p] as const));
  const seen = new Set<string>();
  const out: ProductCardSummary[] = [];

  const push = (p: Product | undefined) => {
    if (!p || p.slug === product.slug || seen.has(p.slug)) return;
    seen.add(p.slug);
    out.push(toSummary(p));
  };

  for (const s of product.relacionadosSlugs ?? []) {
    push(bySlug.get(s));
    if (out.length >= limit) return out;
  }

  const marcaMatches = all.filter(
    (p) => p.slug !== product.slug && sameMarca(p.marca, product.marca) && p.marca?.trim(),
  );
  marcaMatches.sort((a, b) => sameTaxonomy(product, b) - sameTaxonomy(product, a));
  for (const p of marcaMatches) {
    push(p);
    if (out.length >= limit) return out;
  }

  const scored = all
    .filter((p) => p.slug !== product.slug && !seen.has(p.slug))
    .map((p) => ({ p, score: sameTaxonomy(product, p) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  for (const { p } of scored) {
    push(p);
    if (out.length >= limit) return out;
  }

  return out;
}
