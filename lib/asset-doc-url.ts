/** Rutas bajo `public/assets/docs/`. Codifica segmentos para espacios, tildes y símbolos en nombres de archivo. */
export function assetDoc(...segments: string[]): string {
  return (
    "/assets/docs/" + segments.map((s) => encodeURIComponent(s)).join("/")
  );
}
