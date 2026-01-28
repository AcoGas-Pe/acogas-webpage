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
    twitterHandle?: string; // Just the handle without @
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
}

/*
Note from SEB: When doing the seo config make sure to change the url to match our website url this way the og image will reference the correct image on build
Remember on localhost the url will be http://localhost:3000 but in production it will be another one.
*/

// Import from business config for dynamic values
export const siteConfig: SiteConfig = {
  name: BUSINESS_INFO.name,
  url: (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.acogas.pe'),
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
  }
};

export const seoConfigs: Record<string, SEOConfig> = {
  "/": {
    title: `${BUSINESS_INFO.name} | ${BUSINESS_INFO.primaryKeyword}`,
    description: `Soluciones industriales seguras y eficientes en GLP, Gas Natural, Vapor y Procesos Especiales. Marcas líderes (Emerson, Corken, Cavagna y Liquid Controls). ${BUSINESS_INFO.ctaText}`,
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
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `${BUSINESS_INFO.name} | ${BUSINESS_INFO.primaryKeyword}`,
    linkedinDescription: `Soluciones industriales en ${CONTACT.city}. GLP, Gas Natural, Vapor y Procesos Especiales. ${BUSINESS_INFO.ctaText}`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `${BUSINESS_INFO.name} | Soluciones industriales`,
    socialDescription: `GLP, Gas Natural, Vapor y Procesos Especiales. Marcas líderes y soporte técnico especializado.`,
    socialImage: "/assets/config/og.png",
    articleSection: BUSINESS_INFO.primaryKeyword,
    breadcrumbs: [{ name: "Inicio", url: siteConfig.url }]
  },

  "/nosotros/": {
    title: `Nosotros | ${BUSINESS_INFO.name}`,
    description: `Conoce a ${BUSINESS_INFO.name}. Más de 53 años desarrollando soluciones técnicas con marcas líderes, acompañando a la industria peruana desde el diagnóstico hasta la puesta en marcha.`,
    keywords: ["nosotros", BUSINESS_INFO.name.toLowerCase(), "acogas", "soluciones industriales", "ingeniería", "soporte técnico"],
    canonical: `${siteConfig.url}/nosotros/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Nosotros | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Conoce nuestra experiencia y enfoque en soluciones industriales para GLP, Gas Natural, Vapor y Procesos Especiales.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Nosotros | ${BUSINESS_INFO.name}`,
    socialDescription: `Experiencia, ingeniería y soporte técnico para la industria.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Empresa",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Nosotros", url: `${siteConfig.url}/nosotros/` }
    ]
  },

  "/contacto/": {
    title: `Contacto | ${BUSINESS_INFO.name}`,
    description: `Contáctanos para asesoría técnica especializada en GLP, Gas Natural, Vapor y Procesos Especiales. ${BUSINESS_INFO.ctaText}`,
    keywords: ["contacto", "acogas", "visita técnica", "asesoría", "ventas", CONTACT.city.toLowerCase(), CONTACT.state.toLowerCase()],
    canonical: `${siteConfig.url}/contacto/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Contacto | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Solicita una visita técnica especializada. Respuesta rápida y soporte experto.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Contacto | ${BUSINESS_INFO.name}`,
    socialDescription: `Solicita una visita técnica especializada y cotiza con expertos.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Contacto",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Contacto", url: `${siteConfig.url}/contacto/` }
    ]
  },

  "/productos/": {
    title: `Productos | ${BUSINESS_INFO.name}`,
    description: `Explora nuestras categorías de productos industriales: regulación y control de presión, medición, vapor, bombas y compresores, seguridad y procesos especiales.`,
    keywords: ["productos", "reguladores", "válvulas", "medición", "bombas", "compresores", "vapor", "seguridad", "acogas"],
    canonical: `${siteConfig.url}/productos/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Productos | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Productos industriales para GLP, Gas Natural, Vapor y Procesos Especiales.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Productos | ${BUSINESS_INFO.name}`,
    socialDescription: `Categorías de productos industriales y marcas líderes.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Productos",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Productos", url: `${siteConfig.url}/productos/` }
    ]
  },

  "/marcas/": {
    title: `Marcas | ${BUSINESS_INFO.name}`,
    description: `Marcas líderes en soluciones industriales: Emerson (Fisher, Tartarini, Cash, Spence), Corken, Cavagna y Liquid Controls.`,
    keywords: ["marcas", "emerson", "fisher", "tartarini", "cash", "spence", "corken", "cavagna", "liquid controls", "acogas"],
    canonical: `${siteConfig.url}/marcas/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Marcas | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Representamos marcas líderes para regulación, medición, vapor, bombas y compresores.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Marcas | ${BUSINESS_INFO.name}`,
    socialDescription: `Marcas líderes y soporte técnico especializado.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Marcas",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Marcas", url: `${siteConfig.url}/marcas/` }
    ]
  },

  "/industrias/": {
    title: `Industrias | ${BUSINESS_INFO.name}`,
    description: `Soluciones para industrias como alimentos y bebidas, pesquera, agroindustria, minería, papel y cartón, e industria general.`,
    keywords: ["industrias", "alimentos y bebidas", "pesquera", "agroindustria", "minería", "papel y cartón", "industria general", "acogas"],
    canonical: `${siteConfig.url}/industrias/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Industrias | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Aplicaciones industriales para GLP, Gas Natural, Vapor y Procesos Especiales.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Industrias | ${BUSINESS_INFO.name}`,
    socialDescription: `Soluciones por industria y soporte especializado.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Industrias",
    breadcrumbs: [
      { name: "Inicio", url: siteConfig.url },
      { name: "Industrias", url: `${siteConfig.url}/industrias/` }
    ]
  },

  "/servicios/": {
    title: `Servicios | ${BUSINESS_INFO.name}`,
    description: `Servicios para la industria: ingeniería y dimensionamiento, selección de equipos, diagnóstico técnico, soporte técnico y mantenimiento industrial.`,
    keywords: ["servicios", "ingeniería", "dimensionamiento", "selección de equipos", "diagnóstico técnico", "soporte técnico", "mantenimiento industrial", "acogas"],
    canonical: `${siteConfig.url}/servicios/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "es-PE",
    geoRegion: "PE-LIM",
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Servicios | ${BUSINESS_INFO.name}`,
    linkedinDescription: `Acompañamiento técnico desde el diagnóstico hasta la puesta en marcha.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Servicios | ${BUSINESS_INFO.name}`,
    socialDescription: `Ingeniería, selección, diagnóstico, soporte y mantenimiento industrial.`,
    socialImage: "/assets/config/og.png",
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
  ogImage: `${siteConfig.url}/assets/config/og.png`,
  ogType: "website",
  twitterCard: "summary",
  language: "es-PE",
  linkedinTitle: siteConfig.name,
  linkedinDescription: siteConfig.description,
  linkedinImage: `${siteConfig.url}/assets/config/og.png`,
  linkedinAuthor: siteConfig.author,
  facebookAppId: siteConfig.social.facebookAppId,
  socialTitle: siteConfig.name,
  socialDescription: siteConfig.description,
  socialImage: `${siteConfig.url}/assets/config/og.png`,
  articleSection: "General",
  breadcrumbs: [
    { name: "Inicio", url: siteConfig.url }
  ]
};

export function getSEOConfig(pathname: string): SEOConfig {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return seoConfigs[normalizedPath] || defaultSEO;
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
export function getServicePageSchema(serviceData: {
  name: string;
  description: string;
  url: string;
  category?: string;
  price?: string;
  serviceType?: string;
  areaServed?: string[];
}) {
  return {
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
        "addressCountry": siteConfig.contact.country
      },
      "areaServed": serviceData.areaServed || [
        {
          "@type": "City",
          "name": siteConfig.contact.city,
          "addressRegion": siteConfig.contact.state
        }
      ],
    },
    "serviceType": serviceData.serviceType || serviceData.category || serviceData.name,
    "category": serviceData.category,
    "areaServed": serviceData.areaServed || [
      {
        "@type": "City",
        "name": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.state
      }
    ],
    "offers": {
      "@type": "Offer",
      "description": `Professional ${serviceData.name.toLowerCase()} with free consultation`,
      "priceCurrency": "USD",
      "price": serviceData.price || "0",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD",
        "price": serviceData.price || "0"
      },
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0]
    },
    "brand": {
      "@type": "Brand",
      "name": siteConfig.name
    },
    "image": `${siteConfig.url}${siteConfig.logo}`
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