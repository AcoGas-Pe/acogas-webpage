/**
 * Cliente mínimo para WPGraphQL (solo servidor: usa desde Server Actions, route handlers o fetch en RSC).
 *
 * .env.local:
 *   WORDPRESS_GRAPHQL_URL=https://tu-dominio.com/graphql
 *
 * Si el endpoint es privado, usa WORDPRESS_GRAPHQL_SECRET o Application Password según tu WPGraphQL/JWT setup.
 *
 * Depuración: WORDPRESS_PRODUCTS_DEBUG=1 amplía el detalle de errores GraphQL en consola del servidor.
 * Cache: WORDPRESS_REVALIDATE_SECONDS (default 300) en fetch GraphQL y unstable_cache.
 */

import { getWordPressRevalidateSeconds } from "@/lib/wordpress/cache-revalidate";
import {
  isWpProductsDebugEnabled,
  wpProductsVerbose,
} from "@/lib/wordpress/products-debug-log";

const getEndpoint = () =>
  process.env.WORDPRESS_GRAPHQL_URL?.replace(/\/$/, "") || "";

export async function wpGraphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const endpoint = getEndpoint();
  if (!endpoint) {
    throw new Error(
      "WORDPRESS_GRAPHQL_URL no está definida. Añádela en .env.local",
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const auth = process.env.WORDPRESS_GRAPHQL_AUTH_HEADER;
  if (auth) {
    headers.Authorization = auth.startsWith("Basic ") || auth.startsWith("Bearer ")
      ? auth
      : `Bearer ${auth}`;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: getWordPressRevalidateSeconds() },
  });

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };

  if (!res.ok) {
    if (isWpProductsDebugEnabled()) {
      wpProductsVerbose(`HTTP ${res.status} en ${safeGraphqlHost(endpoint)}`);
    }
    throw new Error(`GraphQL HTTP ${res.status}`);
  }
  if (json.errors?.length) {
    if (isWpProductsDebugEnabled()) {
      wpProductsVerbose("Respuesta GraphQL con errors:", JSON.stringify(json.errors, null, 2));
    }
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (json.data === undefined) {
    throw new Error("GraphQL: respuesta sin data");
  }

  return json.data;
}

function safeGraphqlHost(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "(URL inválida)";
  }
}
