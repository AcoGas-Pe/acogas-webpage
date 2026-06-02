/** Segundos de cache para respuestas WordPress (Data Cache + unstable_cache). Default: 5 min. */
export function getWordPressRevalidateSeconds(): number {
  const raw = process.env.WORDPRESS_REVALIDATE_SECONDS?.trim();
  if (!raw) return 300;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 300;
}
