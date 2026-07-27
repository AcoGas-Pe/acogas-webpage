import { hrefProductosPorSolucion } from "@/lib/soluciones-navegacion-catalogo";

/** Footer “Productos” column — links to catalog filters (macro), not obsolete category routes. */
export const FOOTER_PRODUCT_LINKS = [
  {
    name: "Equipo de bombeo y compresión",
    href: hrefProductosPorSolucion("Equipo de bombeo y compresión"),
  },
  {
    name: "Regulación y control de presión",
    href: hrefProductosPorSolucion("Regulación y control de presión"),
  },
  {
    name: "Seguridad, alivio y vacío",
    href: hrefProductosPorSolucion("Seguridad, Alivio y Vacío"),
  },
  {
    name: "Inertización, recuperación de vapor y tanques",
    href: hrefProductosPorSolucion(
      "Inertización, Recuperación de vapor y Tanques",
    ),
  },
  {
    name: "Control de temperatura y vapor",
    href: hrefProductosPorSolucion("Control de Temperatura y Vapor"),
  },
  {
    name: "Control de flujo, filtración y ruido",
    href: hrefProductosPorSolucion("Control de Flujo, Filtración y Ruido"),
  },
  {
    name: "Sistemas, estaciones y soluciones integrales",
    href: hrefProductosPorSolucion(
      "Sistemas, Estaciones y Soluciones Integrales",
    ),
  },
  {
    name: "Automatización, medición y control",
    href: hrefProductosPorSolucion("Automatización, Medición y Control"),
  },
  {
    name: "Autogas y aplicaciones especiales",
    href: hrefProductosPorSolucion("Autogas y Aplicaciones Especiales"),
  },
  {
    name: "Accesorios y otros componentes",
    href: hrefProductosPorSolucion("Accesorios y otros componentes"),
  },
] as const;
