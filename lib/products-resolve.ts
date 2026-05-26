import { cache } from "react";
import type { Product } from "@/domain/product";
import {
  getAllProductSlugs as getAllStaticSlugsFromData,
  getAllProducts as getAllStaticProductsFromData,
  getProductBySlug as getProductBySlugFromData,
} from "@/lib/products-data";
import { getWpProductsGraphqlRootField } from "@/lib/wordpress/graphql/queries/soluciones-productos";
import { getWordPressProducts } from "@/lib/wordpress/products-from-wordpress";
import {
  isTruthyEnvFlag,
  wpProductsInfo,
  wpProductsVerbose,
  wpProductsWarn,
  wpProductsLogFetchError,
} from "@/lib/wordpress/products-debug-log";

function useWordPressProducts(): boolean {
  const isProductionBuild =
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.npm_lifecycle_event === "build";

  if (isProductionBuild && !isTruthyEnvFlag(process.env.USE_WORDPRESS_PRODUCTS_DURING_BUILD)) {
    return false;
  }

  if (process.env.USE_WORDPRESS_PRODUCTS !== undefined) {
    return isTruthyEnvFlag(process.env.USE_WORDPRESS_PRODUCTS);
  }

  return true;
}

/** Catálogo unificado: WordPress si está activado y responde; si no, JSON estático. */
export const resolveAllProducts = cache(async (): Promise<Product[]> => {
  if (!useWordPressProducts()) {
    wpProductsVerbose("USE_WORDPRESS_PRODUCTS desactivado → catálogo desde JSON estático.");
    return getAllStaticProductsFromData();
  }
  try {
    const wp = await getWordPressProducts();
    if (wp.length > 0) {
      wpProductsInfo(
        `Origen: WordPress · ${wp.length} productos · RootQuery.${getWpProductsGraphqlRootField()}(…)`,
      );
      return wp;
    }
    wpProductsWarn(
      "WordPress devolvió 0 productos tras mapear. ¿Campo GraphQL distinto, sin publicados o ACF vacío? Revisando: WORDPRESS_GRAPHQL_PRODUCTS_FIELD, datosProducto. Se usa JSON estático.",
    );
  } catch (e) {
    wpProductsLogFetchError(e);
    wpProductsWarn(
      "No se pudo leer WordPress; usando JSON estático. Mensaje:",
      e instanceof Error ? e.message : String(e),
    );
  }
  return getAllStaticProductsFromData();
});

export async function resolveProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await resolveAllProducts();
  return all.find((p) => p.slug === slug);
}

export async function resolveAllProductSlugs(): Promise<string[]> {
  const all = await resolveAllProducts();
  return all.map((p) => p.slug);
}

/** Acceso síncrono al JSON estático (p. ej. código cliente que no puede await). */
export function getStaticProductBySlug(slug: string): Product | undefined {
  return getProductBySlugFromData(slug);
}

export function getAllStaticProductSlugsSync(): string[] {
  return getAllStaticSlugsFromData();
}
