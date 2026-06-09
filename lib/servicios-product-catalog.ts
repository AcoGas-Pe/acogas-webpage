import type { CatalogFilters } from "@/lib/product-catalog";

/**
 * Enlaces desde menú Servicios y tarjetas hacia `/productos/` con filtros en query.
 * Ajustar presets según catálogo real (valores deben coincidir con facetas exactas).
 */
const SERVICIO_PRESETS: Record<string, Partial<CatalogFilters>> = {
  "ingenieria-dimensionamiento": {
    macroCategorias: ["Regulación y control de presión"],
  },
  "seleccion-equipos": {},
  "diagnostico-tecnico": {},
  "soporte-tecnico": {},
  "mantenimiento-industrial": {
    marcas: ["Corken"],
  },
};

function appendFilterParams(
  params: URLSearchParams,
  key: keyof CatalogFilters,
  values: string[],
) {
  const qKey =
    key === "marcas"
      ? "marca"
      : key === "macroCategorias"
        ? "macro"
        : key === "categorias"
          ? "cat"
          : null;
  if (!qKey) return;
  for (const v of values) {
    if (v.trim()) params.append(qKey, v.trim());
  }
}

/** Ruta de catálogo con filtros aplicables vía query (ver ProductsCatalogClient). */
export function productosUrlForServicioSlug(serviceSlug: string): string {
  const preset = SERVICIO_PRESETS[serviceSlug] ?? {};
  const params = new URLSearchParams();
  (Object.keys(preset) as (keyof CatalogFilters)[]).forEach((k) => {
    const arr = preset[k];
    if (arr && arr.length > 0) appendFilterParams(params, k, arr);
  });
  const qs = params.toString();
  return qs ? `/productos/?${qs}` : "/productos/";
}
