/**
 * Pilares "Nuestras soluciones" del menú Soluciones ↔ filtros del catálogo (`macro` + `cat` en query).
 * Los valores deben coincidir exactamente con `Product.macroCategoria` y `Product.categoria`
 * (misma convención que `data/products-import.json` y el CMS).
 */

export type SolucionNavSection = {
  title: string;
  /** Valor de `Product.categoria` al filtrar */
  categoria: string;
};

export type SolucionNavPillar = {
  /** Título visible en el menú */
  label: string;
  /** Valor de `Product.macroCategoria` */
  macro: string;
  sections: SolucionNavSection[];
};

export const SOLUCIONES_NAV_PILARES: SolucionNavPillar[] = [
  {
    label: "Regulación y control de presión",
    macro: "Regulación y control de presión",
    sections: [
      {
        title: "Reguladores de Primera y Segunda Etapa",
        categoria: "Reguladores de Primera y Segunda Etapa",
      },
      {
        title: "Válvulas y Reguladores de Contrapresión",
        categoria: "Válvulas y Reguladores de Contrapresión",
      },
      {
        title: "Válvulas y Reguladores de Presión",
        categoria: "Válvulas y Reguladores de Presión",
      },
    ],
  },
  {
    label: "Seguridad, Alivio y Vacío",
    macro: "Seguridad, Alivio y Vacío",
    sections: [
      { title: "Cierre y protección", categoria: "Cierre y protección" },
      {
        title: "Válvulas y Reguladores de Alivio y Seguridad",
        categoria: "Válvulas y Reguladores de Alivio y Seguridad",
      },
      {
        title: "Válvulas y Reguladores de Vacío",
        categoria: "Válvulas y Reguladores de Vacío",
      },
    ],
  },
  {
    label: "Equipo de bombeo y compresión",
    macro: "Equipo de bombeo y compresión",
    sections: [
      { title: "Bombas industriales", categoria: "Bombas industriales" },
      { title: "Compresores", categoria: "Compresores" },
    ],
  },
  {
    label: "Control de Temperatura y Vapor",
    macro: "Control de Temperatura y Vapor",
    sections: [
      {
        title: "Manejo de vapor y Condensado",
        categoria: "Manejo de vapor y Condensado",
      },
      {
        title: "Regulación de temperatura",
        categoria: "Regulación de temperatura",
      },
    ],
  },
  {
    label: "Control de Flujo, Filtración y Ruido",
    macro: "Control de Flujo, Filtración y Ruido",
    sections: [
      {
        title: "Filtración y Silenciamiento",
        categoria: "Filtración y Silenciamiento",
      },
      {
        title: "Válvulas de Control y Flujo",
        categoria: "Válvulas de Control y Flujo",
      },
    ],
  },
  {
    label: "Inertización, Recuperación de vapor y Tanques",
    macro: "Inertización, Recuperación de vapor y Tanques",
    sections: [
      { title: "Inertización de tanques", categoria: "Inertización de tanques" },
      { title: "Recuperación de Vapor", categoria: "Recuperación de Vapor" },
    ],
  },
  {
    label: "Automatización, Medición y Control",
    macro: "Automatización, Medición y Control",
    sections: [
      {
        title: "Filtración y Silenciamiento",
        categoria: "Filtración y Silenciamiento",
      },
    ],
  },
  {
    label: "Sistemas, Estaciones y Soluciones Integrales",
    macro: "Sistemas, Estaciones y Soluciones Integrales",
    sections: [
      {
        title: "Filtración y Silenciamiento",
        categoria: "Filtración y Silenciamiento",
      },
    ],
  },
  {
    label: "Accesorios y otros componentes",
    macro: "Accesorios y otros componentes",
    sections: [
      {
        title: "Filtración y Silenciamiento",
        categoria: "Filtración y Silenciamiento",
      },
    ],
  },
  {
    label: "Autogas y Aplicaciones Especiales",
    macro: "Autogas y Aplicaciones Especiales",
    sections: [
      {
        title: "Filtración y Silenciamiento",
        categoria: "Filtración y Silenciamiento",
      },
    ],
  },
];

export function hrefProductosPorSolucion(macro: string, categoria?: string): string {
  const params = new URLSearchParams();
  params.append("macro", macro.trim());
  if (categoria?.trim()) params.append("cat", categoria.trim());
  return `/productos/?${params.toString()}`;
}

export function todasMacrosSolucionesNav(): string[] {
  return SOLUCIONES_NAV_PILARES.map((p) => p.macro);
}

export function todasCategoriasSolucionesNav(): string[] {
  const acc: string[] = [];
  for (const p of SOLUCIONES_NAV_PILARES) {
    for (const s of p.sections) acc.push(s.categoria);
  }
  return acc;
}
