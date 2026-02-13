/**
 * Navigation Configuration
 * Single source of truth for desktop mega menus + mobile sidebar.
 */

export interface NavMenuItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavMenuSection {
  title: string;
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

// Navigation Menus Configuration
export const NAV_MENUS = {
  productos: {
    mainLink: {
      label: "Ver todos los productos",
      href: "/productos/",
    },
    layout: "stackedProducts",
    columns: [
      {
        title: "Marcas",
        href: "/marcas/",
        items: [
          { label: "Emerson", href: "/marcas/emerson/" },
          { label: "Corken", href: "/marcas/corken/" },
          { label: "Cavagna", href: "/marcas/cavagna/" },
          { label: "Liquid Controls", href: "/marcas/liquid-controls/" },
        ],
      },
      {
        title: "Industrias",
        href: "/industrias/",
        items: [
          { label: "Alimentos y Bebidas", href: "/industrias/alimentos-bebidas/" },
          { label: "Pesquera", href: "/industrias/pesquera/" },
          { label: "Agroindustria", href: "/industrias/agroindustria/" },
          { label: "Minería", href: "/industrias/mineria/" },
          { label: "Papel y Cartón", href: "/industrias/papel-carton/" },
          { label: "Industria General", href: "/industrias/industria-general/" },
        ],
      },
      {
        title: "Nuestros productos",
        href: "/productos/",
        categories: [
          {
            label: "Regulación y Control de Presión",
            href: "/productos/regulacion-control-presion/",
            sections: [
              { title: "Reguladores de Presión" },
              { title: "Válvulas de Control" },
              { title: "Estaciones de Regulación" },
            ],
          },
          {
            label: "Medición y Control de Flujo",
            href: "/productos/medicion-control-flujo/",
            sections: [
              { title: "Medidores Industriales" },
              { title: "Sistemas de Medición" },
              { title: "Accesorios de Medición" },
            ],
          },
          {
            label: "Vapor y Procesos Térmicos",
            href: "/productos/vapor-procesos-termicos/",
            sections: [
              { title: "Regulación de Vapor" },
              { title: "Trampas de Vapor" },
              { title: "Accesorios para Vapor" },
            ],
          },
          {
            label: "Bombas y Compresores",
            href: "/productos/bombas-compresores/",
            sections: [
              { title: "Bombas Industriales" },
              { title: "Compresores Industriales" },
            ],
          },
          {
            label: "Seguridad y Alivio de Presión",
            href: "/productos/seguridad-alivio-presion/",
            sections: [
              { title: "Válvulas de Seguridad" },
              { title: "Sistemas de Protección" },
            ],
          },
        ],
      },
    ],
  } satisfies NavMenuConfig,

  nosotros: {
    image: {
      src: "/assets/config/placeholder-image.png",
      alt: "Quienes Somos",
      title: "Quiénes Somos",
      description: "Más de 53 años desarrollando soluciones técnicas con marcas líderes",
      href: "/nosotros#quienes-somos",
    },
    columns: [
      {
        title: "Empresa",
        href: "/nosotros/",
        items: [
          { label: "Nosotros", href: "/nosotros/", description: "Conócenos en detalle" },
          { label: "Trayectoria", href: "/nosotros#trayectoria", description: "Nuestro recorrido a lo largo de los años" },
          { label: "Propuesta de Valor", href: "/nosotros#propuesta-valor", description: "Nuestras fortalezas y beneficios" },
        ],
      },
      {
        title: "Recursos",
        href: "/recursos-tecnicos/",
        items: [
          { label: "Blog Técnico", href: "/recursos-tecnicos/blog/", description: "Artículos y novedades técnicas" },
          { label: "Catálogos", href: "/recursos-tecnicos/catalogos/", description: "Catálogos de productos" },
          { label: "Fichas Técnicas", href: "/recursos-tecnicos/fichas-tecnicas/", description: "Especificaciones técnicas" },
          { label: "Normativa y Cumplimiento", href: "/recursos-tecnicos/normativa-cumplimiento/", description: "Regulaciones y estándares" },
        ],
      },
    ],
  } satisfies NavMenuConfig,

  contacto: {
    image: {
      src: "/assets/config/placeholder-image.png",
      alt: "Contacto",
      title: "Contacto",
      description: "Contacta con nosotros para obtener más información",
      href: "/contacto/",
    },
    columns: [
      {
        title: "Contacto",
        href: "/contacto/",
        items: [
          { label: "Asesoría Técnica", href: "/contacto#asesoria-tecnica/", description: "Consulta con nuestros expertos" },
          { label: "Hablar con un Especialista", href: "/contacto#hablar-especialista/", description: "Contacta directamente con nosotros" },
        ],
      },
    ],
  } satisfies NavMenuConfig,

  coberturaIndustrial: {
        image: {
      src: "/assets/config/placeholder-image.png",
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
          { label: "Lurín", href: "/cobertura-industrial/lima/lurin", description: "Ver ubicaciones en Lurín" },
          { label: "Callao", href: "/cobertura-industrial/lima/callao", description: "Ver ubicaciones en Callao" },
          { label: "Santiago de Surco", href: "/cobertura-industrial/lima/santiago-de-surco", description: "Ver ubicaciones en Santiago de Surco" },
        ],
      },
      {
        title: "Otras ciudades",
        href: "/cobertura-industrial/",
        items: [
          { label: "Trujillo", href: "/cobertura-industrial/trujillo/", description: "Ver ubicaciones en Trujillo" },
          { label: "Arequipa", href: "/cobertura-industrial/arequipa/", description: "Ver ubicaciones en Arequipa" },
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
          { label: "Ingeniería y Dimensionamiento", href: "/servicios/ingenieria-dimensionamiento/", description: "Soluciones a medida" },
          { label: "Selección de Equipos", href: "/servicios/seleccion-equipos/", description: "Elige el equipo ideal" },
          { label: "Diagnóstico Técnico", href: "/servicios/diagnostico-tecnico/", description: "Revisión profesional" },
          { label: "Soporte Técnico", href: "/servicios/soporte-tecnico/", description: "Ayuda especializada" },
          { label: "Mantenimiento Industrial", href: "/servicios/mantenimiento-industrial/", description: "Cuidado preventivo y correctivo" },
        ],
      },
    ],
  } satisfies NavMenuConfig,
} as const;

// Main Navigation Items (desktop triggers)
export const NAV_ITEMS: NavItem[] = [
  { label: "Nosotros", href: "/nosotros/", type: "trigger", menuKey: "nosotros" },
  { label: "Cobertura Industrial", href: "/cobertura-industrial/", type: "trigger", menuKey: "coberturaIndustrial" },
  { label: "Productos", href: "/productos/", type: "trigger", menuKey: "productos" },
  { label: "Servicios", href: "/servicios/", type: "trigger", menuKey: "servicios" },
  { label: "Contacto", href: "/contacto/", type: "trigger", menuKey: "contacto" },
];

