import { cache } from "react";
import type { Product } from "@/domain/product";
import { wpGraphqlFetch } from "@/lib/wordpress/graphql/client";
import {
  buildSolucionesProductosQuery,
  getWpProductsGraphqlRootField,
} from "@/lib/wordpress/graphql/queries/soluciones-productos";
import { mapWpSolucionesToProducts } from "@/lib/wordpress/map-wp-solucion-to-product";
import { wpProductsVerbose } from "@/lib/wordpress/products-debug-log";

/** Lista de productos desde WPGraphQL (misma consulta que el catálogo). En caché por request. */
export const getWordPressProducts = cache(async (): Promise<Product[]> => {
  const data = await wpGraphqlFetch<Record<string, unknown>>(buildSolucionesProductosQuery());
  const root = getWpProductsGraphqlRootField();
  const rawCount =
    (data[root] as { nodes?: unknown[] } | undefined)?.nodes?.length ?? 0;
  const products = mapWpSolucionesToProducts(data);
  wpProductsVerbose(
    `Campo "${root}": ${rawCount} nodos en GraphQL → ${products.length} productos tras map`,
  );
  return products;
});
