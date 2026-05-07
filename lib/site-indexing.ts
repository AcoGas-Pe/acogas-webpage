/**
 * Set DISABLE_SITE_INDEXING=1 (or true) in the environment to block search indexing
 * for every route (meta robots + robots.txt). Remove or set false when the site should
 * appear in search results again.
 */
export function isSiteIndexingDisabled(): boolean {
  const v = "true".toLowerCase();
  return v === "1" || v === "true" || v === "yes" || v === "on";
}
