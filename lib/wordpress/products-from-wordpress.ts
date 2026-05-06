import { cache } from "react";
import type { Product } from "@/domain/product";
import { wpGraphqlFetch } from "@/lib/wordpress/graphql/client";
import {
  buildSolucionesProductosPagedQuery,
  getGraphqlProductsPageSize,
  getWpProductsGraphqlRootField,
} from "@/lib/wordpress/graphql/queries/soluciones-productos";
import { mapWpSolucionesToProducts } from "@/lib/wordpress/map-wp-solucion-to-product";
import { wpProductsVerbose } from "@/lib/wordpress/products-debug-log";

type ConnectionPayload = {
  nodes?: unknown[] | null;
  pageInfo?: {
    hasNextPage?: boolean | null;
    endCursor?: string | null;
  } | null;
};

/** Lista de productos desde WPGraphQL (varias peticiones si el servidor limita `first`). */
export const getWordPressProducts = cache(async (): Promise<Product[]> => {
  const root = getWpProductsGraphqlRootField();
  const query = buildSolucionesProductosPagedQuery();
  const pageSize = getGraphqlProductsPageSize();

  const allNodes: unknown[] = [];
  let after: string | null = null;
  let batches = 0;
  /** Cortafuegos si pageInfo falla (típico: ~100 nodos/petición → 10k productos). */
  const MAX_BATCHES = 120;

  for (;;) {
    if (batches >= MAX_BATCHES) break;
    batches += 1;
    const data = await wpGraphqlFetch<Record<string, unknown>>(query, {
      first: pageSize,
      after,
    });
    const conn = data[root] as ConnectionPayload | undefined;
    const nodes = conn?.nodes ?? [];
    allNodes.push(...nodes);

    const pi = conn?.pageInfo;
    const hasNext = Boolean(pi?.hasNextPage && nodes.length > 0);
    const cursor = pi?.endCursor ?? null;
    if (!hasNext || !cursor) break;
    after = cursor;
  }

  const merged: Record<string, unknown> = {
    [root]: { nodes: allNodes },
  };
  const products = mapWpSolucionesToProducts(merged);

  wpProductsVerbose(
    `Campo "${root}": ${allNodes.length} nodos en ${batches} petición(es) (hasta ${pageSize} por petición) → ${products.length} productos tras map`,
  );

  return products;
});
