import { 
  CORE_SERVICES,
  BUSINESS_CATEGORIES, 
  BUSINESS_INFO, 
  CONTACT, 
  SOCIAL_MEDIA, 
  GOOGLE_MAPS, 
  BUSINESS_HOURS_SCHEMA,
  CORE_SERVICE_NAMES,
  LOCATIONS,
  getCopyright,
  getLocationsString
} from "./business-config";

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords: string[];
  canonical: string;
  ogImage: string;
  /** Segunda imagen en og:image (logo). `false` = no añadir logo. Por defecto se usa OG_IMAGE_DEFAULTS.brandLogo. */
  ogBrandLogo?: string | false;
  ogType: 'website' | 'article';
  twitterCard: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  noFollow?: boolean;
  language?: string;
  geoRegion?: string;
  geoPosition?: string;
  geoPlacename?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  // LinkedIn specific fields
  linkedinTitle?: string;
  linkedinDescription?: string;
  linkedinImage?: string;
  linkedinAuthor?: string;
  // Facebook specific fields
  facebookAppId?: string;
  facebookAdmins?: string[];
  // Additional social media fields
  socialImage?: string; // Alternative social sharing image
  socialTitle?: string; // Alternative social sharing title
  socialDescription?: string; // Alternative social sharing description
  // Schema.org fields
  articleSection?: string;
  articleTag?: string[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  logo: string;
  favicon: string;
  themeColor: string;
  author: string;
  copyright: string;
  social: {
    facebook?: string;
    facebookAppId?: string;
    twitter?: string;
    twitterHandle?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    whatsapp?: string;
    tiktok?: string;
    pinterest?: string;
    snapchat?: string;
    telegram?: string;
    nextdoor?: string;
    yelp?: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessHours: string;
  services: string[];
  coordinates?: {
    latitude: string;
    longitude: string;
  };
  verification?: {
    google?: string;
  };
}

/*
Note from SEB: When doing the seo config make sure to change the url to match our website url this way the og image will reference the correct image on build
Remember on localhost the url will be http://localhost:3000 but in production it will be another one.
*/

// Import from business config for dynamic values
export const siteConfig: SiteConfig = {
  name: BUSINESS_INFO.name,
  url: (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://acogas.pe'),
  description: `Soluciones industriales seguras y eficientes en GLP, Gas Natural, Vapor y Procesos Especiales en ${CONTACT.city}, ${CONTACT.state}. ${BUSINESS_INFO.ctaText}`,
  logo: BUSINESS_INFO.logoUrl || "/assets/config/logo.png",
  favicon: "/assets/config/favicon.ico",
  themeColor: "#3B82F6",
  author: BUSINESS_INFO.name,
  copyright: getCopyright(),
  social: {
    facebook: SOCIAL_MEDIA.facebook,
    twitter: SOCIAL_MEDIA.twitter,
    twitterHandle: SOCIAL_MEDIA.twitter?.split('/').pop(),
    instagram: SOCIAL_MEDIA.instagram,
    linkedin: SOCIAL_MEDIA.linkedin,
    pinterest: SOCIAL_MEDIA.pinterest,
    yelp: SOCIAL_MEDIA.yelp,
    nextdoor: SOCIAL_MEDIA.nextdoor
  },
  contact: {
    phone: CONTACT.phone[0],
    email: CONTACT.email[0],
    address: CONTACT.street,
    city: CONTACT.city,
    state: CONTACT.state,
    zipCode: CONTACT.zip,
    country: "Peru"
  },
  businessHours: BUSINESS_HOURS_SCHEMA,
  services: CORE_SERVICE_NAMES,
  coordinates: {
    latitude: GOOGLE_MAPS.latitude,
    longitude: GOOGLE_MAPS.longitude
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  }
};

/** Rutas públicas para Open Graph / Twitter (single source of truth). */
export const OG_IMAGE_DEFAULTS = {
  heroBackground: "/assets/images/refinery.webp",
  brandLogo: "/assets/config/logo.png",
  productFallback: "/assets/images/revision-en-planta.webp",
} as const;

export const seoConfigs: Record<string, SEOConfig> = {
  "/": {
    title: "ACOGAS | Soluciones Industriales para GLP, GN y Vapor",
    description: `Soluciones industriales seguras y eficientes en GLP, gas natural y vapor. Marcas líderes (Emerson, Corken, Cavagna, Liquid Controls). ${BUSINESS_INFO.ctaText}`,
    keywords: [
      BUSINESS_INFO.primaryKeyword.toLowerCase(),
      "acogas",
      "glp",
      "gas natural",
      "vapor",
      "reguladores",
      "válvulas",
      "medición",
      CONTACT.city.toLowerCase(),
      CONTACT.state.toLowerCase()
    ],
    canonical: `${siteConfig.url}/`,
    ogImage: "/assets/images/refinery.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `${BUSINESS_INFO.name} | ${BUSINESS_INFO.primaryKeyword}`,
    linkedinDescription: `Soluciones industriales en ${CONTACT.city}. GLP, Gas Natural, Vapor y Procesos Especiales. ${BUSINESS_INFO.ctaText}`,
    linkedinImage: "/assets/images/refinery.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `${BUSINESS_INFO.name} | Soluciones industriales`,
    socialDescription: `GLP, Gas Natural, Vapor y Procesos Especiales. Marcas líderes y soporte técnico especializado.`,
    socialImage: "/assets/images/refinery.webp",
    articleSection: BUSINESS_INFO.primaryKeyword,
    breadcrumbs: [{ name: "Inicio", url: siteConfig.url }]
  },

  "/nosotros/": {
    title: `Nosotros | ${BUSINESS_INFO.name}`,
    description: `Conoce a ${BUSINESS_INFO.name}. Más de 50 años desarrollando soluciones técnicas con marcas líderes, acompañando a la industria peruana desde el diagnóstico hasta la puesta en marcha.`,
    keywords: ["nosotros", BUSINESS_INFO.name.toLowerCase(), "acogas", "soluciones industriales", "ingeniería", "soporte técnico"],
    canonical: `${siteConfig.url}/nosotros/`,
    ogImage: "/assets/images/revision-planta.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Nosotros | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Conoce nuestra experiencia y enfoque en soluciones industriales para GLP, Gas Natural, Vapor y Procesos Especiales.`,
    linkedinImage: "/assets/images/revision-planta.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Nosotros | ${BUSINESS_INFO.name}`,
    socialDescription: `Experiencia, ingeniería y soporte técnico para la industria.`,
    socialImage: "/assets/images/revision-planta.webp",
    articleSection: "Empresa",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Nosotros", url: `${siteConfig.url}/nosotros/` }
    ]
  },

  "/cotizar/": {
    title: `Cotizar | ${BUSINESS_INFO.name}`,
    description: `Solicite cotización de equipos y soluciones industriales en GLP, Gas Natural, Vapor y procesos. Respuesta orientada a su aplicación y normativa.`,
    keywords: ["cotización", "cotizar", "GLP", "gas natural", "vapor", "equipos industriales", "acogas", CONTACT.city.toLowerCase()],
    canonical: `${siteConfig.url}/cotizar/`,
    ogImage: "/assets/images/refinery.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Cotizar | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Solicite una propuesta técnica y comercial alineada a su operación.`,
    linkedinImage: "/assets/images/refinery.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Cotizar | ${BUSINESS_INFO.name}`,
    socialDescription: `Equipos y soluciones industriales con respaldo técnico y normativo.`,
    socialImage: "/assets/images/refinery.webp",
    articleSection: "Cotización",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Cotizar", url: `${siteConfig.url}/cotizar/` },
    ],
  },

  "/contacto/": {
    title: `Contacto | ${BUSINESS_INFO.name}`,
    description: `Contáctanos para asesoría técnica especializada en GLP, Gas Natural, Vapor y Procesos Especiales. ${BUSINESS_INFO.ctaText}`,
    keywords: ["contacto", "acogas", "visita técnica", "asesoría", "ventas", CONTACT.city.toLowerCase(), CONTACT.state.toLowerCase()],
    canonical: `${siteConfig.url}/contacto/`,
    ogImage: "/assets/images/agricola-revision.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Contacto | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Solicita una visita técnica especializada. Respuesta rápida y soporte experto.`,
    linkedinImage: "/assets/images/agricola-revision.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Contacto | ${BUSINESS_INFO.name}`,
    socialDescription: `Solicita una visita técnica especializada y cotiza con expertos.`,
    socialImage: "/assets/images/agricola-revision.webp",
    articleSection: "Contacto",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Contacto", url: `${siteConfig.url}/contacto/` }
    ]
  },

  "/preguntas-frecuentes/": {
    title: `Preguntas frecuentes | ${BUSINESS_INFO.name}`,
    description:
      "Respuestas sobre marcas representadas, visitas técnicas, normativa peruana, cotizaciones, capacitación y cobertura nacional en GLP, gas natural y vapor.",
    keywords: [
      "FAQ",
      "preguntas frecuentes",
      "acogas",
      "visita técnica",
      "normativa",
      "GLP",
      "gas natural",
      "vapor",
      CONTACT.city.toLowerCase(),
    ],
    canonical: `${siteConfig.url}/preguntas-frecuentes/`,
    ogImage: "/assets/images/refinery.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Preguntas frecuentes | ${BUSINESS_INFO.name}`,
    linkedinDescription:
      "Información clara sobre servicios, normativa y soporte técnico industrial.",
    linkedinImage: "/assets/images/refinery.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `FAQ | ${BUSINESS_INFO.name}`,
    socialDescription:
      "Dudas habituales sobre ingeniería, equipos y soporte en campo.",
    socialImage: "/assets/images/refinery.webp",
    articleSection: "Soporte",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      {
        name: "Preguntas frecuentes",
        url: `${siteConfig.url}/preguntas-frecuentes/`,
      },
    ],
  },

  "/recursos/": {
    title: `Recursos técnicos | ${BUSINESS_INFO.name}`,
    description:
      "Catálogos, manuales técnicos, normativas y guías de selección para GLP, gas natural y vapor. Centro de documentación y cumplimiento para ingeniería y operación.",
    keywords: [
      "recursos técnicos",
      "catálogos",
      "manuales",
      "normativas",
      "GLP",
      "gas natural",
      "vapor",
      "documentación",
      "acogas",
    ],
    canonical: `${siteConfig.url}/recursos/`,
    ogImage: "/assets/images/trabajando-carton.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Recursos técnicos | ${BUSINESS_INFO.name}`,
    linkedinDescription:
      "Documentación técnica, normativa y herramientas para proyectos industriales.",
    linkedinImage: "/assets/images/trabajando-carton.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Recursos | ${BUSINESS_INFO.name}`,
    socialDescription:
      "Catálogos, normativas y guías para GLP, gas natural y vapor.",
    socialImage: "/assets/images/trabajando-carton.webp",
    articleSection: "Recursos técnicos",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Recursos técnicos", url: `${siteConfig.url}/recursos/` },
    ],
  },

  "/blog/": {
    title: `Blog técnico | ${BUSINESS_INFO.name}`,
    description:
      "Artículos técnicos, novedades y criterios de aplicación para GLP, gas natural, vapor y procesos industriales.",
    keywords: [
      "blog técnico",
      "GLP",
      "gas natural",
      "vapor",
      "procesos industriales",
      "seguridad industrial",
      "acogas",
    ],
    canonical: `${siteConfig.url}/blog/`,
    ogImage: "/assets/images/industry-plant-industrial-plant.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Blog técnico | ${BUSINESS_INFO.name}`,
    linkedinDescription:
      "Artículos técnicos y novedades para decisiones industriales.",
    linkedinImage: "/assets/images/industry-plant-industrial-plant.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Blog técnico | ${BUSINESS_INFO.name}`,
    socialDescription:
      "Criterios técnicos para GLP, gas natural, vapor y procesos industriales.",
    socialImage: "/assets/images/industry-plant-industrial-plant.webp",
    articleSection: "Blog",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Blog", url: `${siteConfig.url}/blog/` },
    ],
  },

  "/cobertura-industrial/": {
    title: `Cobertura industrial | ${BUSINESS_INFO.name}`,
    description:
      "Presencia y soporte técnico en las principales zonas industriales del Perú: Lima Metropolitana, Lurín, Arequipa, Trujillo y más ciudades con visitas en campo.",
    keywords: [
      "cobertura",
      "Lima",
      "Arequipa",
      "Trujillo",
      "soporte técnico",
      "visita técnica",
      "industria",
      "acogas",
    ],
    canonical: `${siteConfig.url}/cobertura-industrial/`,
    ogImage: "/assets/images/revision-industria.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Cobertura industrial | ${BUSINESS_INFO.name}`,
    linkedinDescription:
      "Zonas industriales atendidas con ingeniería, equipos y soporte presencial.",
    linkedinImage: "/assets/images/revision-industria.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Cobertura industrial | ${BUSINESS_INFO.name}`,
    socialDescription:
      "Soporte técnico nacional en GLP, gas natural y vapor.",
    socialImage: "/assets/images/revision-industria.webp",
    articleSection: "Cobertura",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Cobertura industrial", url: `${siteConfig.url}/cobertura-industrial/` },
    ],
  },

  "/productos/": {
    title: `Productos | ${BUSINESS_INFO.name}`,
    description: `Explora nuestras categorías de productos industriales: regulación y control de presión, medición, vapor, bombas y compresores, seguridad y procesos especiales.`,
    keywords: ["productos", "reguladores", "válvulas", "medición", "bombas", "compresores", "vapor", "seguridad", "acogas"],
    canonical: `${siteConfig.url}/productos/`,
    ogImage: "/assets/images/refinery.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Productos | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Productos industriales para GLP, Gas Natural, Vapor y Procesos Especiales.`,
    linkedinImage: "/assets/images/refinery.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Productos | ${BUSINESS_INFO.name}`,
    socialDescription: `Categorías de productos industriales y marcas líderes.`,
    socialImage: "/assets/images/refinery.webp",
    articleSection: "Productos",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Productos", url: `${siteConfig.url}/productos/` }
    ]
  },

  "/marcas/": {
    title: `Marcas | ${BUSINESS_INFO.name}`,
    description: `Socios estratégicos: Fisher, Tartarini, Spence, Cash, Anderson Greenwood, Crosby, Kunkle, Marston, Enardo, Varec, Corken, Liquid Controls y Cavagna. Fichas por marca y soporte técnico.`,
    keywords: ["marcas", "emerson", "fisher", "tartarini", "cash", "spence", "corken", "cavagna", "liquid controls", "acogas"],
    canonical: `${siteConfig.url}/marcas/`,
    ogImage: "/assets/images/refinery.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Marcas | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Representamos marcas líderes para regulación, medición, vapor, bombas y compresores.`,
    linkedinImage: "/assets/images/refinery.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Marcas | ${BUSINESS_INFO.name}`,
    socialDescription: `Marcas líderes y soporte técnico especializado.`,
    socialImage: "/assets/images/refinery.webp",
    articleSection: "Marcas",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Marcas", url: `${siteConfig.url}/marcas/` }
    ]
  },

  "/industrias/": {
    title: `Industrias | ${BUSINESS_INFO.name}`,
    description: `Soluciones por sector: agroindustria, energía, minería, pesca, cartón y papel, químico y plástico, textil, alimentos y bebidas, transporte y entorno GLP.`,
    keywords: [
      "industrias",
      "agroindustria",
      "energía",
      "minería",
      "pesca",
      "cartón y papel",
      "químico",
      "textil",
      "alimentos y bebidas",
      "transporte",
      "glp",
      "acogas",
    ],
    canonical: `${siteConfig.url}/industrias/`,
    ogImage: "/assets/images/refinery.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Industrias | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Aplicaciones industriales para GLP, Gas Natural, Vapor y Procesos Especiales.`,
    linkedinImage: "/assets/images/refinery.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Industrias | ${BUSINESS_INFO.name}`,
    socialDescription: `Soluciones por industria y soporte especializado.`,
    socialImage: "/assets/images/refinery.webp",
    articleSection: "Industrias",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Industrias", url: `${siteConfig.url}/industrias/` }
    ]
  },

  "/recursos-tecnicos/normativas/": {
    title: `Normativas y cumplimiento | ${BUSINESS_INFO.name}`,
    description:
      "Mapa normativo Perú e internacional para GLP, gas natural industrial y vapor: leyes, DS, OSINERGMIN, NTP y estándares NFPA, ASME, API, IEC. Consulta de fuentes oficiales.",
    keywords: [
      "normativas",
      "GLP",
      "gas natural",
      "OSINERGMIN",
      "NTP",
      "NFPA",
      "ASME",
      "B31.8",
      "cumplimiento",
      "acogas",
    ],
    canonical: `${siteConfig.url}/recursos-tecnicos/normativas/`,
    ogImage: "/assets/images/mineria.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Normativas y cumplimiento | ${BUSINESS_INFO.name}`,
    linkedinDescription:
      "Referencia técnica: marco peruano y estándares internacionales para instalaciones industriales.",
    linkedinImage: "/assets/images/mineria.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Normativas | ${BUSINESS_INFO.name}`,
    socialDescription:
      "GLP, gas natural, vapor: normativa nacional y rutas de consulta internacional.",
    socialImage: "/assets/images/mineria.webp",
    articleSection: "Recursos técnicos",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Recursos técnicos", url: `${siteConfig.url}/recursos/` },
      { name: "Normativas", url: `${siteConfig.url}/recursos-tecnicos/normativas/` },
    ],
  },

  "/recursos-tecnicos/certificados/": {
    title: `Certificados de fabricante | ${BUSINESS_INFO.name}`,
    description:
      "Descarga de certificaciones ISO, SIL, UL y documentación asociada para marcas Fisher, Tartarini y Spence, con acceso tras registro.",
    keywords: [
      "certificados",
      "ISO",
      "SIL",
      "UL",
      "Fisher",
      "Tartarini",
      "Spence",
      "documentación técnica",
      "acogas",
    ],
    canonical: `${siteConfig.url}/recursos-tecnicos/certificados/`,
    ogImage: "/assets/images/revision-refineria.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Certificados de fabricante | ${BUSINESS_INFO.name}`,
    linkedinDescription:
      "Certificaciones y documentos oficiales de fabricante para ingeniería y compras.",
    linkedinImage: "/assets/images/refinery.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Certificados | ${BUSINESS_INFO.name}`,
    socialDescription:
      "Fisher, Tartarini, Spence: certificados y cuadros comparativos descargables.",
    socialImage: "/assets/images/refinery.webp",
    articleSection: "Recursos técnicos",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Recursos técnicos", url: `${siteConfig.url}/recursos/` },
      {
        name: "Certificados",
        url: `${siteConfig.url}/recursos-tecnicos/certificados/`,
      },
    ],
  },

  "/servicios/": {
    title: `Servicios | ${BUSINESS_INFO.name}`,
    description: `Servicios para la industria: ingeniería y dimensionamiento, selección de equipos, diagnóstico técnico, soporte técnico y mantenimiento industrial.`,
    keywords: ["servicios", "ingeniería", "dimensionamiento", "selección de equipos", "diagnóstico técnico", "soporte técnico", "mantenimiento industrial", "acogas"],
    canonical: `${siteConfig.url}/servicios/`,
    ogImage: "/assets/images/pipes-white.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Servicios | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Acompañamiento técnico desde el diagnóstico hasta la puesta en marcha.`,
    linkedinImage: "/assets/images/pipes-white.webp",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Servicios | ${BUSINESS_INFO.name}`,
    socialDescription: `Ingeniería, selección, diagnóstico, soporte y mantenimiento industrial.`,
    socialImage: "/assets/images/pipes-white.webp",
    articleSection: "Servicios",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Servicios", url: `${siteConfig.url}/servicios/` }
    ]
  }
};

export const defaultSEO: SEOConfig = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["acogas", "soluciones industriales", "glp", "gas natural", "vapor", "procesos especiales"],
  canonical: siteConfig.url,
  ogImage: OG_IMAGE_DEFAULTS.heroBackground,
  ogBrandLogo: OG_IMAGE_DEFAULTS.brandLogo,
  ogType: "website",
  twitterCard: "summary_large_image",
  language: "es-PE",
  linkedinTitle: siteConfig.name,
  linkedinDescription: siteConfig.description,
  linkedinImage: OG_IMAGE_DEFAULTS.heroBackground,
  linkedinAuthor: siteConfig.author,
  facebookAppId: siteConfig.social.facebookAppId,
  socialTitle: siteConfig.name,
  socialDescription: siteConfig.description,
  socialImage: OG_IMAGE_DEFAULTS.heroBackground,
  articleSection: "General",
  breadcrumbs: [
    { name: "Inicio", url: siteConfig.url }
  ]
};

function mergeHubChild(hubPath: string, normalizedPath: string): SEOConfig | null {
  const hub = seoConfigs[hubPath];
  if (!hub) return null;
  return {
    ...defaultSEO,
    ...hub,
    canonical: `${siteConfig.url}${normalizedPath}`,
  };
}

export function getSEOConfig(pathname: string): SEOConfig {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const direct = seoConfigs[normalizedPath];
  if (direct) return direct;

  /** Fichas de producto: heredan SEO del hub /productos/ (keywords, OG base, etc.). */
  if (
    normalizedPath.startsWith("/productos/") &&
    normalizedPath.length > "/productos/".length
  ) {
    const merged = mergeHubChild("/productos/", normalizedPath);
    if (merged) return merged;
  }

  /** Detalle de servicio */
  if (
    normalizedPath.startsWith("/servicios/") &&
    normalizedPath !== "/servicios/"
  ) {
    const merged = mergeHubChild("/servicios/", normalizedPath);
    if (merged) return merged;
  }

  /** Ficha de marca */
  if (normalizedPath.startsWith("/marcas/") && normalizedPath !== "/marcas/") {
    const merged = mergeHubChild("/marcas/", normalizedPath);
    if (merged) return merged;
  }

  /** Ciudad / zona — cobertura industrial */
  if (
    normalizedPath.startsWith("/cobertura-industrial/") &&
    normalizedPath !== "/cobertura-industrial/"
  ) {
    const merged = mergeHubChild("/cobertura-industrial/", normalizedPath);
    if (merged) return merged;
  }

  /** Industria sectorial */
  if (
    normalizedPath.startsWith("/industrias/") &&
    normalizedPath !== "/industrias/"
  ) {
    const merged = mergeHubChild("/industrias/", normalizedPath);
    if (merged) return merged;
  }

  return defaultSEO;
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": siteConfig.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.contact.phone,
      "contactType": "Customer Support",
      "areaServed": siteConfig.contact.country,
      "availableLanguage": "Spanish"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.city,
      "postalCode": siteConfig.contact.zipCode,
      "addressCountry": siteConfig.contact.country
    },
    "sameAs": Object.values(siteConfig.social).filter(Boolean)
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.city,
      "postalCode": siteConfig.contact.zipCode,
      "addressCountry": siteConfig.contact.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": GOOGLE_MAPS.latitude,
      "longitude": GOOGLE_MAPS.longitude
    },
    "openingHours": siteConfig.businessHours,
    "areaServed": {
      "@type": "City",
      "name": siteConfig.contact.city
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios",
      "itemListElement": siteConfig.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    }
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": siteConfig.description,
  };
}

export function getServiceSchema(pathname: string) {
  const seoConfig = getSEOConfig(pathname);
  
  // Find service from CORE_SERVICES by matching URL
  const service = CORE_SERVICES.find(s => 
    pathname.includes(s.url.replace(/^\//, '').replace(/\/$/, ''))
  );
  
  if (!service) return null;
  
  const serviceType = service.name;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceType,
    "description": seoConfig.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteConfig.name,
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.contact.address,
        "addressLocality": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.city,
        "postalCode": siteConfig.contact.zipCode,
        "addressCountry": siteConfig.contact.country
      },
      "areaServed": LOCATIONS.map(loc => ({
        "@type": "City",
        "name": loc.city,
        "addressRegion": loc.state
      })),
      "url": seoConfig.canonical
    },
    "serviceType": serviceType,
    "areaServed": LOCATIONS.map(loc => ({
      "@type": "City",
      "name": loc.city,
      "addressRegion": loc.state
    })),
    "offers": {
      "@type": "Offer",
      "description": `Professional ${serviceType.toLowerCase()} services with free consultation`,
      "priceCurrency": "USD"
    }
  };
}

/**
 * Generate LocalBusiness schema for city/location pages
 * ONLY applies to the actual city where the business is located, NOT for service areas
 * For service areas, use getCityPlaceSchema instead
 */
export function getCityLocalBusinessSchema(cityData: {
  name: string;
  state: string;
  description: string;
  latitude?: string;
  longitude?: string;
  servicesOffered?: string[];
  isBusinessLocation?: boolean; // New flag to indicate if this is the actual business location
}) {
  // Only return LocalBusiness schema if this is the actual business location
  if (!cityData.isBusinessLocation) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${siteConfig.name} - ${cityData.name}, ${cityData.state}`,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": cityData.description || `Professional services in ${cityData.name}, ${cityData.state}`,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "Peru"
    },
    ...(cityData.latitude && cityData.longitude && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.latitude,
        "longitude": cityData.longitude
      }
    }),
    "openingHours": siteConfig.businessHours,
    "areaServed": {
      "@type": "City",
      "name": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "Peru"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Services in ${cityData.name}`,
      "itemListElement": (cityData.servicesOffered || siteConfig.services).map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "areaServed": {
            "@type": "City",
            "name": cityData.name
          }
        }
      }))
    },
    "priceRange": "$$",
  };
}

/**
 * Generate City/Place schema for service area pages (not business location)
 * Use this for cities that are service areas, not where the business is located
 */
export function getCityPlaceSchema(cityData: {
  name: string;
  state: string;
  description: string;
  latitude?: string;
  longitude?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${cityData.name}, ${cityData.state}`,
    "description": cityData.description || `${siteConfig.name} serves ${cityData.name}, ${cityData.state}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "Peru"
    },
    ...(cityData.latitude && cityData.longitude && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.latitude,
        "longitude": cityData.longitude
      }
    }),
    "additionalType": "City"
  };
}

/**
 * Generate City/Place schema for "Things to Do" pages
 * NO TouristDestination schema - use City/Place schema instead
 */
export function getThingsToDoSchema(thingsToDoData: {
  cityName: string;
  state: string;
  description: string;
  url: string;
  latitude?: number;
  longitude?: number;
  attractions: Array<{
    name: string;
    address: string;
    description: string;
    type: string;
    category: string;
    mapUrl?: string;
  }>;
  totalAttractions?: number;
}) {
  return [
    // City/Place schema for the city
    {
      "@context": "https://schema.org",
      "@type": "City",
      "name": `${thingsToDoData.cityName}`,
      "description": thingsToDoData.description,
      "url": thingsToDoData.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": thingsToDoData.cityName,
        "addressRegion": thingsToDoData.state,
        "addressCountry": "Peru"
      },
      ...(thingsToDoData.latitude && thingsToDoData.longitude && {
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": thingsToDoData.latitude,
          "longitude": thingsToDoData.longitude
        }
      }),
      "containedInPlace": {
        "@type": "State",
        "name": thingsToDoData.state
      }
    },
    // ItemList schema with all attractions
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Things to Do in ${thingsToDoData.cityName}, ${thingsToDoData.state}`,
      "description": `Top attractions and activities in ${thingsToDoData.cityName}`,
      "numberOfItems": thingsToDoData.totalAttractions || thingsToDoData.attractions.length,
      "itemListElement": thingsToDoData.attractions.map((attraction, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Place",
          "name": attraction.name,
          "description": attraction.description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": attraction.address,
            "addressLocality": thingsToDoData.cityName,
            "addressRegion": thingsToDoData.state,
            "addressCountry": "Peru"
          },
          "additionalType": attraction.type,
          ...(attraction.mapUrl && {
            "hasMap": attraction.mapUrl
          })
        }
      }))
    }
  ];
}

/**
 * Generate Service schema for individual service pages
 * More flexible than the existing getServiceSchema
 */
export function toAbsoluteAssetUrl(pathOrUrl: string): string {
  const t = pathOrUrl.trim();
  if (!t) return siteConfig.url;
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  const base = siteConfig.url.replace(/\/$/, "");
  const path = t.startsWith("/") ? t : `/${t}`;
  return `${base}${path}`;
}

export function getServicePageSchema(serviceData: {
  name: string;
  description: string;
  url: string;
  category?: string;
  price?: string;
  serviceType?: string;
  areaServed?: string[];
  /** Imagen representativa del servicio (ruta bajo /public o URL absoluta). */
  image?: string;
}) {
  const areaDefault = serviceData.areaServed || [
    {
      "@type": "City",
      "name": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.state,
    },
  ];

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData.name,
    "description": serviceData.description,
    "url": serviceData.url,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteConfig.name,
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}${siteConfig.logo}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.contact.address,
        "addressLocality": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.city,
        "postalCode": siteConfig.contact.zipCode,
        "addressCountry": siteConfig.contact.country,
      },
      "areaServed": areaDefault,
    },
    "serviceType": serviceData.serviceType || serviceData.category || serviceData.name,
    "category": serviceData.category,
    "areaServed": areaDefault,
  };

  if (serviceData.price) {
    schema.offers = {
      "@type": "Offer",
      "description": `Consultoría y servicio: ${serviceData.name}`,
      "priceCurrency": "PEN",
      "price": serviceData.price,
      "availability": "https://schema.org/InStock",
      "url": serviceData.url,
      "seller": {
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url,
      },
    };
  }

  const img = serviceData.image?.trim();
  if (img) {
    schema.image = toAbsoluteAssetUrl(img);
  }

  return schema;
}

/**
 * Producto industrial (ficha de catálogo). Sin precio público: `offers` indica canal de consulta.
 */
export function getProductSchema(input: {
  name: string;
  description?: string;
  image?: string;
  brand?: string;
  sku?: string;
  url: string;
}) {
  const productUrl = input.url.startsWith("http")
    ? input.url
    : toAbsoluteAssetUrl(input.url.startsWith("/") ? input.url : `/${input.url}`);

  const img = input.image?.trim();

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": input.name,
    "description": input.description,
    "sku": input.sku || input.name,
    ...(input.brand && {
      brand: { "@type": "Brand", "name": input.brand },
    }),
    ...(img && { image: toAbsoluteAssetUrl(img) }),
    "url": productUrl,
    offers: {
      "@type": "Offer",
      "url": productUrl,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url,
      },
    },
  };
}

/** Marca representada + página de contenido (sin duplicar precios inventados). */
export function getMarcaStructuredSchemas(input: {
  name: string;
  logo?: string;
  pageUrl: string;
  description?: string;
}): Record<string, unknown>[] {
  const pageUrl = input.pageUrl.startsWith("http")
    ? input.pageUrl
    : toAbsoluteAssetUrl(
        input.pageUrl.startsWith("/") ? input.pageUrl : `/${input.pageUrl}`,
      );

  const brandSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: input.name,
  };
  const logo = input.logo?.trim();
  if (logo) {
    brandSchema.logo = toAbsoluteAssetUrl(logo);
  }

  return [
    brandSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${input.name} | ${siteConfig.name}`,
      description: input.description,
      url: pageUrl,
      about: { "@type": "Brand", name: input.name },
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  ];
}

export function getWebPageSchema(input: {
  name: string;
  description?: string;
  url: string;
}) {
  const url = input.url.startsWith("http")
    ? input.url
    : toAbsoluteAssetUrl(input.url.startsWith("/") ? input.url : `/${input.url}`);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function getArticleSchema(postData: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: { name: string; title: string; avatar: string };
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: string;
  seo: { metaTitle: string; metaDescription: string; keywords: string };
}) {
  const baseUrl = siteConfig.url;
  const articleUrl = `${baseUrl}/${postData.category.toLowerCase().replace(/\s+/g, '-')}/${postData.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": postData.seo.metaTitle || postData.title,
    "description": postData.seo.metaDescription || postData.excerpt,
    "image": postData.featuredImage ? `${baseUrl}${postData.featuredImage}` : undefined,
    "author": {
      "@type": "Person",
      "name": postData.author.name,
      "jobTitle": postData.author.title,
      "image": postData.author.avatar ? `${baseUrl}${postData.author.avatar}` : undefined
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": postData.publishedAt,
    "dateModified": postData.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "url": articleUrl,
    "articleSection": postData.category,
    "keywords": postData.seo.keywords || postData.tags.join(', '),
    "wordCount": postData.content.split(' ').length,
    "timeRequired": postData.readTime,
    "inLanguage": "es-PE",
    "isPartOf": {
      "@type": "Blog",
      "name": `${siteConfig.name} Blog`,
      "url": `${baseUrl}/blog`
    }
  };
}

/**
 * Generate HowTo schema for blog posts with "How to" in the title
 * Use this in addition to Article schema for instructional content
 */
export function getHowToSchema(postData: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  featuredImage?: string;
  steps?: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) {
  const baseUrl = siteConfig.url;
  const articleUrl = `${baseUrl}/${postData.category.toLowerCase().replace(/\s+/g, '-')}/${postData.slug}`;
  
  // Extract steps from content if not provided
  const steps = postData.steps || [];
  
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": postData.title,
    "description": postData.excerpt,
    "image": postData.featuredImage ? `${baseUrl}${postData.featuredImage}` : undefined,
    "url": articleUrl,
    "datePublished": postData.publishedAt,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && {
        "image": `${baseUrl}${step.image}`
      })
    })),
    "totalTime": "PT30M",
    "supply": [],
    "tool": []
  };
}

/**
 * Generate FAQ schema for FAQ pages
 * Use this for pages with frequently asked questions
 */
export function getFAQSchema(faqData: {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.questions.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function getPortfolioSchema(portfolioData: {
  name: string;
  description: string;
  url: string;
  projects: Array<{
    id: number;
    title: string;
    category: string;
    image: string;
    date?: string;
    location?: string;
    description: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": portfolioData.name,
    "description": portfolioData.description,
    "url": portfolioData.url,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}${siteConfig.logo}`
    }
  };
}

/**
 * Valid Schema.org business types for local businesses
 * Choose the one that best matches your business type
 */
/**
 * Generate dynamic business schema for homepage
 * @param businessType - The Schema.org business type (defaults to value from business config)
 * @param options - Optional configuration for rating, price range, etc.
 */
export function getBusinessSchema(
  businessType?: string
) {
  // Use LocalBusiness as default schema type
  // Note: If you need a specific Schema.org type, pass it as businessType parameter
  // or add SCHEMA_TYPE to business-config.ts
  const defaultBusinessType: string = businessType || "LocalBusiness";

  return {
    "@context": "https://schema.org",
    "@type": businessType || defaultBusinessType,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.city,
      "postalCode": siteConfig.contact.zipCode,
      "addressCountry": siteConfig.contact.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.coordinates?.latitude,
      "longitude": siteConfig.coordinates?.longitude
    },
    "openingHours": siteConfig.businessHours,
    "areaServed": LOCATIONS.map(loc => ({
      "@type": "City",
      "name": loc.city,
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios",
      "itemListElement": siteConfig.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    },
    "sameAs": Object.values(siteConfig.social).filter(Boolean)
  };
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

/**
 * Generate schema for the services page
 * Includes Organization, Service Catalog (ItemList), and Breadcrumb schemas
 */
export function getServicesPageSchema(services: Array<{
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  isCore: boolean;
}>) {
  const coreServices = services.filter(service => service.isCore);
  
  return [
    // Organization schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}${siteConfig.logo}`,
      "description": siteConfig.description,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": siteConfig.contact.phone,
        "contactType": "Customer Support",
        "areaServed": siteConfig.contact.country,
        "availableLanguage": "Spanish"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.contact.address,
        "addressLocality": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.city,
        "postalCode": siteConfig.contact.zipCode,
        "addressCountry": siteConfig.contact.country
      },
      "sameAs": Object.values(siteConfig.social).filter(Boolean)
    },
    // Service catalog schema (ItemList)
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Servicios de ${siteConfig.name}`,
      "description": `Servicios ofrecidos por ${siteConfig.name}`,
      "numberOfItems": coreServices.length,
      "itemListElement": coreServices.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "url": `${siteConfig.url}/${service.slug}`,
          "provider": {
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.url
          },
          "serviceType": service.category,
          "offers": {
            "@type": "Offer",
            "description": service.description,
            "priceCurrency": "PEN"
          }
        }
      }))
    },
    // Breadcrumb schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": siteConfig.url
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Servicios",
          "item": `${siteConfig.url}/servicios/`
        }
      ]
    }
  ];
}