/**
 * Pilares "Nuestras soluciones" del menú Soluciones ↔ filtros del catálogo (`macro` + `cat` en query).
 * Los valores deben alinearse con `macroCategoria` y `categoria` en datos de producto.
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
    label: "Regulación y Control de Presión",
    macro: "Regulación y control de presión",
    sections: [
      {
        title: "Reguladores de Presión",
        categoria: "Válvulas y Reguladores de Presión",
      },
      { title: "Válvulas de Control", categoria: "Válvulas de control" },
      { title: "Estaciones de Regulación", categoria: "Estaciones de regulación" },
    ],
  },
  {
    label: "Medición y Control de Flujo",
    macro: "Medición y control de flujo",
    sections: [
      { title: "Medidores Industriales", categoria: "Medidores industriales" },
      { title: "Sistemas de Medición", categoria: "Sistemas de medición" },
      { title: "Accesorios de Medición", categoria: "Accesorios de medición" },
    ],
  },
  {
    label: "Vapor y Procesos Térmicos",
    macro: "Vapor y procesos térmicos",
    sections: [
      { title: "Regulación de Vapor", categoria: "Regulación de vapor" },
      { title: "Trampas de Vapor", categoria: "Trampas de vapor" },
      { title: "Accesorios para Vapor", categoria: "Accesorios para vapor" },
    ],
  },
  {
    label: "Bombas y Compresores",
    macro: "Bombas y compresores",
    sections: [
      { title: "Bombas Industriales", categoria: "Bombas industriales" },
      { title: "Compresores Industriales", categoria: "Compresores industriales" },
    ],
  },
  {
    label: "Seguridad y Alivio de Presión",
    macro: "Seguridad y alivio de presión",
    sections: [
      { title: "Válvulas de Seguridad", categoria: "Válvulas de seguridad" },
      { title: "Sistemas de Protección", categoria: "Sistemas de protección" },
    ],
  },
  {
    label: "Procesos Especiales y Multifluidos",
    macro: "Procesos especiales y multifluidos",
    sections: [
      { title: "Regulación de Gas Natural", categoria: "Regulación de gas natural" },
      { title: "Regulación de GLP", categoria: "Regulación de GLP" },
      {
        title: "Regulación de Aire y Otros Fluidos",
        categoria: "Regulación de aire y otros fluidos",
      },
    ],
  },
];

export function hrefProductosPorSolucion(macro: string, categoria?: string): string {
  const params = new URLSearchParams();
  params.append("macro", macro.trim());
  if (categoria?.trim())
    params.append("cat", categoria.trim());
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
