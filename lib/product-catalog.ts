import type { Product } from "@/domain/product";

export interface ProductCatalogFacets {
  marcas: string[];
  gruposEmpresariales: string[];
  macroCategorias: string[];
  categorias: string[];
  tiposBrochure: string[];
  fluidos: string[];
}

function uniqSorted(values: Iterable<string>): string[] {
  return [...new Set(values)].filter(Boolean).sort((a, b) => a.localeCompare(b, "es"));
}

export function buildCatalogFacets(products: Product[]): ProductCatalogFacets {
  const marcas: string[] = [];
  const grupos: string[] = [];
  const macros: string[] = [];
  const cats: string[] = [];
  const tipos: string[] = [];
  const fluids: string[] = [];

  for (const p of products) {
    if (p.marca?.trim()) marcas.push(p.marca.trim());
    if (p.grupoEmpresarial?.trim()) grupos.push(p.grupoEmpresarial.trim());
    if (p.macroCategoria?.trim()) macros.push(p.macroCategoria.trim());
    if (p.categoria?.trim()) cats.push(p.categoria.trim());
    if (p.tipoBrochure?.trim()) tipos.push(p.tipoBrochure.trim());
    for (const f of p.fluidosYGases ?? []) {
      if (f.valor?.trim()) fluids.push(f.valor.trim());
    }
  }

  return {
    marcas: uniqSorted(marcas),
    gruposEmpresariales: uniqSorted(grupos),
    macroCategorias: uniqSorted(macros),
    categorias: uniqSorted(cats),
    tiposBrochure: uniqSorted(tipos),
    fluidos: uniqSorted(fluids),
  };
}

export type CatalogFilters = {
  marcas: string[];
  gruposEmpresariales: string[];
  macroCategorias: string[];
  categorias: string[];
  tiposBrochure: string[];
  fluidos: string[];
};

export const emptyCatalogFilters = (): CatalogFilters => ({
  marcas: [],
  gruposEmpresariales: [],
  macroCategorias: [],
  categorias: [],
  tiposBrochure: [],
  fluidos: [],
});

function matchesField(selected: string[], value: string | undefined): boolean {
  if (selected.length === 0) return true;
  if (!value?.trim()) return false;
  return selected.includes(value.trim());
}

export function filterProductsByFacets(
  products: Product[],
  filters: CatalogFilters,
): Product[] {
  return products.filter((p) => {
    if (!matchesField(filters.marcas, p.marca)) return false;
    if (!matchesField(filters.gruposEmpresariales, p.grupoEmpresarial)) return false;
    if (!matchesField(filters.macroCategorias, p.macroCategoria)) return false;
    if (!matchesField(filters.categorias, p.categoria)) return false;
    if (!matchesField(filters.tiposBrochure, p.tipoBrochure)) return false;
    if (filters.fluidos.length === 0) return true;
    const set = new Set((p.fluidosYGases ?? []).map((f) => f.valor?.trim()).filter(Boolean));
    return filters.fluidos.some((f) => set.has(f));
  });
}

/** Búsqueda en texto libre (nombre, marca, descripción, brochure, fluidos). */
export function productMatchesSearchQuery(product: Product, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return true;
  const chunks: string[] = [];
  if (product.modelo) chunks.push(product.modelo);
  if (product.marca) chunks.push(product.marca);
  if (product.slug) chunks.push(product.slug);
  if (product.descripcion) chunks.push(product.descripcion);
  if (product.tipoBrochure) chunks.push(product.tipoBrochure);
  if (product.macroCategoria) chunks.push(product.macroCategoria);
  if (product.categoria) chunks.push(product.categoria);
  if (product.grupoEmpresarial) chunks.push(product.grupoEmpresarial);
  for (const f of product.fluidosYGases ?? []) {
    if (f.valor) chunks.push(f.valor);
  }
  const haystack = chunks.join(" ").toLowerCase();
  return haystack.includes(q);
}

export function filterAndSearchProducts(
  products: Product[],
  filters: CatalogFilters,
  search: string,
): Product[] {
  let list = filterProductsByFacets(products, filters);
  if (search.trim()) {
    list = list.filter((p) => productMatchesSearchQuery(p, search));
  }
  return list;
}

export type SearchSuggestion = { slug: string; label: string; subtitle?: string };

export function buildSearchSuggestions(
  products: Product[],
  query: string,
  limit = 8,
): SearchSuggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored: { p: Product; score: number }[] = [];
  for (const p of products) {
    const modelo = (p.modelo ?? "").toLowerCase();
    const marca = (p.marca ?? "").toLowerCase();
    let score = 0;
    if (modelo.startsWith(q)) score += 100;
    else if (modelo.includes(q)) score += 50;
    if (marca.includes(q)) score += 30;
    if (score === 0 && productMatchesSearchQuery(p, q)) score += 15;
    if (score > 0) scored.push({ p, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ p }) => ({
    slug: p.slug,
    label: p.modelo ?? p.slug,
    subtitle: p.marca,
  }));
}
