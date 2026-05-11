/**
 * Navigation Configuration
 * Single source of truth for desktop mega menus + mobile sidebar.
 */

import {
  hrefProductosPorSolucion,
  SOLUCIONES_NAV_PILARES,
} from "@/lib/soluciones-navegacion-catalogo";
import { productosUrlForServicioSlug } from "@/lib/servicios-product-catalog";

export interface NavMenuItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavMenuSection {
  title: string;
  href: string;
}

export interface NavMenuCategory {
  label: string;
  href: string;
  sections: NavMenuSection[];
}

export interface NavMenuColumn {
  title: string;
  href?: string;
  items?: NavMenuItem[];
  /** When set, column renders as level-1 categories with sections (second level) */
  categories?: NavMenuCategory[];
}

export type NavMenuLayout = "default" | "stackedProducts";

export interface NavMenuConfig {
  /** Main link for the trigger (e.g., "Ver todos los productos") */
  mainLink?: NavMenuItem;
  /** Image section for the mega menu (ignored when layout = stackedProducts) */
  image?: {
    src: string;
    alt: string;
    title: string;
    description?: string;
    href: string;
  };
  /** Columns of items */
  columns: NavMenuColumn[];
  /** Layout variant: default | stackedProducts (no image, stack Marcas+Industrias, 2 cols for Tipo) */
  layout?: NavMenuLayout;
}

export interface NavItem {
  label: string;
  href: string;
  type: "link" | "trigger";
  menuKey?: keyof typeof NAV_MENUS;
}

function buildSolucionesNavCategories(): NavMenuCategory[] {
  return SOLUCIONES_NAV_PILARES.map((pillar) => ({
    label: pillar.label,
    href: hrefProductosPorSolucion(pillar.macro),
    sections: pillar.sections.map((s) => ({
      title: s.title,
      href: hrefProductosPorSolucion(pillar.macro, s.categoria),
    })),
  }));
}

// Navigation Menus Configuration
export const NAV_MENUS = {
  soluciones: {
    mainLink: {
      label: "Ver todas las soluciones",
      href: "/productos/",
    },
    layout: "stackedProducts",
    columns: [
      {
        title: "Marcas",
        href: "/marcas/",
        items: [
          { label: "Corken", href: "/marcas/corken/" },
          { label: "Fisher (GLP · GN · Otros)", href: "/marcas/fisher/" },
          { label: "Kunkle", href: "/marcas/kunkle/" },
          { label: "Spence", href: "/marcas/spence/" },
          { label: "Tartarini", href: "/marcas/tartarini/" },
          { label: "Cash", href: "/marcas/cash/" },
          { label: "Anderson Greenwood", href: "/marcas/anderson-greenwood/" },
          { label: "Crosby", href: "/marcas/crosby/" },
          { label: "Marston", href: "/marcas/marston/" },
          { label: "Enardo", href: "/marcas/enardo/" },
          { label: "Varec", href: "/marcas/varec/" },
          { label: "Liquid Controls", href: "/marcas/liquid-controls/" },
          { label: "Cavagna", href: "/marcas/cavagna/" },
        ],
      },
      {
        title: "Nuestras soluciones",
        href: "/productos/",
        categories: buildSolucionesNavCategories(),
      },
    ],
  } satisfies NavMenuConfig,

  nosotros: {
    image: {
      src: "/assets/images/trabajando-refineria.webp",
      alt: "Quienes Somos",
      title: "Quiénes Somos",
      description:
        "Más de 50 años desarrollando soluciones técnicas con marcas líderes",
      href: "/nosotros#quienes-somos",
    },
    columns: [
      {
        title: "Empresa",
        href: "/nosotros/",
        items: [
          {
            label: "Nosotros",
            href: "/nosotros/",
            description: "Conócenos en detalle",
          },
          {
            label: "Soluciones",
            href: "/productos/",
            description: "Líneas de solución por energía y proceso",
          },
          {
            label: "Trayectoria",
            href: "/nosotros#trayectoria",
            description: "Nuestro recorrido a lo largo de los años",
          },
          {
            label: "Propuesta de Valor",
            href: "/nosotros#propuesta-valor",
            description: "Valores y socios estratégicos",
          },
        ],
      },
      {
        title: "Recursos",
        href: "/recursos-tecnicos/",
        items: [
          {
            label: "Blog Técnico",
            href: "/recursos-tecnicos/blog/",
            description: "Artículos y novedades técnicas",
          },
          {
            label: "Normativa y Cumplimiento",
            href: "/recursos-tecnicos/normativas/",
            description: "Regulaciones y estándares",
          },
          {
            label: "Certificados",
            href: "/recursos-tecnicos/certificados/",
            description: "Certificaciones de fabricante (Fisher, Tartarini, Spence)",
          },
        ],
      },
    ],
  } satisfies NavMenuConfig,

  contacto: {
    image: {
      src: "/assets/images/banner-revision.webp",
      alt: "Contacto",
      title: "Contacto",
      description: "Canales corporativos Acogas Industrial",
      href: "/contacto/",
    },
    columns: [
      {
        title: "Acciones",
        href: "/contacto/",
        items: [
          {
            label: "Formulario de contacto",
            href: "/contacto/",
            description: "Visita técnica, diagnóstico o consulta",
          },
          {
            label: "Solicitar cotización",
            href: "/cotizar/",
            description: "Propuesta técnica y comercial",
          },
        ],
      },
    ],
  } satisfies NavMenuConfig,

  coberturaIndustrial: {
    image: {
      src: "/assets/images/planta-industrial.webp",
      alt: "Cobertura Industrial",
      title: "Cobertura Industrial",
      description: "Nuestra presencia en Lima, Trujillo y Arequipa",
      href: "/cobertura-industrial/",
    },
    columns: [
      {
        title: "Lima",
        href: "/cobertura-industrial/lima/",
        items: [
          {
            label: "Lurín",
            href: "/cobertura-industrial/lurin",
            description: "Ver ubicaciones en Lurín",
          },
          {
            label: "Callao",
            href: "/cobertura-industrial/callao",
            description: "Ver ubicaciones en Callao",
          },
          {
            label: "Santiago de Surco",
            href: "/cobertura-industrial/santiago-de-surco",
            description: "Ver ubicaciones en Santiago de Surco",
          },
        ],
      },
      {
        title: "Otras ciudades",
        href: "/cobertura-industrial/",
        items: [
          {
            label: "Trujillo",
            href: "/cobertura-industrial/trujillo/",
            description: "Ver ubicaciones en Trujillo",
          },
          {
            label: "Arequipa",
            href: "/cobertura-industrial/arequipa/",
            description: "Ver ubicaciones en Arequipa",
          },
        ],
      },
    ],
  } satisfies NavMenuConfig,

  servicios: {
    mainLink: {
      label: "Ver todos los servicios",
      href: "/servicios/",
    },
    columns: [
      {
        title: "Servicios",
        href: "/servicios/",
        items: [
          {
            label: "Ingeniería y Dimensionamiento",
            href: "/servicios/ingenieria-dimensionamiento/",
            description: "Soluciones a medida",
          },
          {
            label: "Selección de Equipos",
            href: "/servicios/seleccion-equipos/",
            description: "Elige el equipo ideal",
          },
          {
            label: "Diagnóstico Técnico",
            href: "/servicios/diagnostico-tecnico/",
            description: "Revisión profesional",
          },
          {
            label: "Soporte Técnico",
            href: "/servicios/soporte-tecnico/",
            description: "Ayuda especializada",
          },
          {
            label: "Mantenimiento Industrial",
            href: "/servicios/mantenimiento-industrial/",
            description: "Cuidado preventivo y correctivo",
          },
        ],
      },
    ],
  } satisfies NavMenuConfig,
};

// Main Navigation Items (desktop triggers)
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Nosotros",
    href: "/nosotros/",
    type: "trigger",
    menuKey: "nosotros",
  },
  {
    label: "Cobertura Industrial",
    href: "/cobertura-industrial/",
    type: "trigger",
    menuKey: "coberturaIndustrial",
  },
  {
    label: "Soluciones",
    href: "/productos/",
    type: "trigger",
    menuKey: "soluciones",
  },
  {
    label: "Servicios",
    href: "/servicios/",
    type: "trigger",
    menuKey: "servicios",
  },
  {
    label: "Contacto",
    href: "/contacto/",
    type: "trigger",
    menuKey: "contacto",
  },
];
