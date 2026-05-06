/**
 * Logs del flujo WordPress → catálogo (solo servidor).
 *
 * - En `NODE_ENV=development` verás líneas resumidas en la terminal de `next dev`.
 * - Para más detalle (nodos GraphQL vs mapeados, host del endpoint): en .env.local
 *   WORDPRESS_PRODUCTS_DEBUG=1
 */

/** Acepta 1, true, yes, on; a veces en .env se escribe por error "10" en vez de "1". */
export function isTruthyEnvFlag(raw: string | undefined): boolean {
  const v = raw?.trim().toLowerCase();
  if (!v) return false;
  if (v === "0" || v === "false" || v === "no" || v === "off") return false;
  return v === "1" || v === "true" || v === "yes" || v === "on" || v === "10";
}

export function isWpProductsDebugEnabled(): boolean {
  return isTruthyEnvFlag(process.env.WORDPRESS_PRODUCTS_DEBUG);
}

function allowDevSummary(): boolean {
  return process.env.NODE_ENV === "development" || isWpProductsDebugEnabled();
}

/** Mensaje corto: desarrollo o WORDPRESS_PRODUCTS_DEBUG. */
export function wpProductsInfo(...args: unknown[]): void {
  if (!allowDevSummary()) return;
  console.log("[WP productos]", ...args);
}

/** Siempre que se llame: errores / advertencias importantes. */
export function wpProductsWarn(...args: unknown[]): void {
  console.warn("[WP productos]", ...args);
}

export function wpProductsError(...args: unknown[]): void {
  console.error("[WP productos]", ...args);
}

/** Errores de fetch GraphQL: desarrollo o DEBUG (evita ruido en prod). */
export function wpProductsLogFetchError(e: unknown): void {
  if (process.env.NODE_ENV === "development" || isWpProductsDebugEnabled()) {
    console.error("[WP productos] GraphQL / red:", e);
  }
}

/** Detalle extra solo con WORDPRESS_PRODUCTS_DEBUG. */
export function wpProductsVerbose(...args: unknown[]): void {
  if (!isWpProductsDebugEnabled()) return;
  console.log("[WP productos][debug]", ...args);
}
