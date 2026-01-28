import { Metadata } from 'next';
import { getSEOConfig, siteConfig, getOrganizationSchema, getLocalBusinessSchema, getWebsiteSchema, getServiceSchema, getArticleSchema, getCityLocalBusinessSchema, getCityPlaceSchema, getServicePageSchema, getThingsToDoSchema, getFAQSchema, getBusinessSchema, getPortfolioSchema } from './seo-config';
// import { generateBreadcrumbSchema } from './breadcrumb-utils';

interface BlogPostData {
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
}

/**
 * Generate Next.js Metadata from SEO Config
 * Use this in page-level generateMetadata() functions
 * 
 * @param pathname - The current page pathname
 * @returns Complete Next.js Metadata object
 */
export function generateMetadataFromConfig(pathname: string): Metadata {
  try {
    const seo = getSEOConfig(pathname);
    
    // Ensure description is under 160 characters
    const description = truncateDescription(seo.description || '', 160);
    
    const metadata = {
      title: seo.title,
      description: description,
      keywords: seo.keywords,
      authors: seo.author ? [{ name: seo.author }] : [{ name: siteConfig.author }],
      creator: siteConfig.author,
      publisher: siteConfig.name,

      alternates: {
        canonical: seo.canonical,
      },

      openGraph: {
        type: seo.ogType,
        locale: seo.language || 'en_US',
        url: seo.canonical,
        title: seo.socialTitle || seo.title,
        description: truncateDescription(seo.socialDescription || seo.description || '', 160),
        siteName: siteConfig.name,
        images: [
          {
            url: generateOGImageUrl(seo.socialImage, seo.ogImage),
            width: 1200,
            height: 630,
            alt: seo.description || `${siteConfig.name} - ${seo.title}`,
          },
        ],
      },

      twitter: {
        card: seo.twitterCard,
        title: seo.socialTitle || seo.title,
        description: truncateDescription(seo.socialDescription || seo.description || '', 160),
        images: [generateOGImageUrl(seo.socialImage, seo.ogImage)],
        creator: siteConfig.social.twitterHandle ? `@${siteConfig.social.twitterHandle}` : undefined,
      },

      robots: {
        index: !seo.noIndex,
        follow: !seo.noFollow,
        googleBot: {
          index: !seo.noIndex,
          follow: !seo.noFollow,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },

      // Additional metadata for local SEO and explicit meta title
      other: {
        'meta:title': seo.title || siteConfig.name,
        'geo.region': seo.geoRegion || 'US-TX',
        'geo.position': seo.geoPosition || '30.2672;-97.7431',
        'geo.placename': seo.geoPlacename || 'Austin, TX',
      },

      // LinkedIn specific fields
      ...(seo.linkedinTitle && {
        linkedin: {
          title: seo.linkedinTitle,
          description: seo.linkedinDescription,
          image: generateOGImageUrl(seo.linkedinImage, seo.ogImage),
        },
      }),
      
      // Facebook specific fields
      ...(seo.facebookAppId && {
        facebook: {
          appId: seo.facebookAppId,
        },
      }),
    };

    return metadata;
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return fallback metadata
    return {
      title: siteConfig.name,
      description: siteConfig.description,
      openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        images: [`${siteConfig.url}/assets/config/og.png`],
      },
    };
  }
}

/**
 * Generate structured data scripts for page
 * Use this in your layout or page components
 * 
 * @param pathname - Optional pathname for page-specific structured data
 * @returns Array of script objects for structured data
 */
/**
 * Truncate meta description to stay under 160 characters
 * Ensures optimal display in search results
 * 
 * @param description - Original description text
 * @param maxLength - Maximum allowed length (default: 160)
 * @returns Truncated description with ellipsis if needed
 */
export function truncateDescription(description: string, maxLength: number = 160): string {
  if (!description) return '';
  
  // If already within limit, return as-is
  if (description.length <= maxLength) {
    return description;
  }
  
  // Truncate to maxLength - 3 (for ellipsis)
  // Try to break at last space to avoid cutting words
  const truncated = description.substring(0, maxLength - 3);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // If we find a space in the last 20 characters, break there
  if (lastSpaceIndex > maxLength - 23) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  // Otherwise, hard truncate
  return truncated + '...';
}

/**
 * Generate OG image URL with fallbacks
 * Ensures there's always a valid OG image URL
 * 
 * @param customImage - Custom image URL (optional)
 * @param seoImage - SEO config image URL (optional)
 * @param defaultImage - Default image filename (optional)
 * @returns Valid OG image URL
 */
export function generateOGImageUrl(
  customImage?: string,
  seoImage?: string,
  defaultImage: string = 'og.png'
): string {
  // Priority: custom > seo config > default
  const imageUrl = customImage || seoImage || `${siteConfig.url}/${defaultImage}`;
  
  // Ensure absolute URL
  if (imageUrl.startsWith('/')) {
    return `${siteConfig.url}${imageUrl}`;
  }
  
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  return `${siteConfig.url}/${imageUrl}`;
}

export function generateStructuredData(pathname?: string, additionalData?: { blogPostData?: BlogPostData }) {
  const schemas: Record<string, unknown>[] = [
    getWebsiteSchema(), // Website schema for other pages
    getBusinessSchema(), // Business schema (includes logo) - more comprehensive than LocalBusiness
  ];
  
  // Add service schema for service pages
  if (pathname) {
    const serviceSchema = getServiceSchema(pathname);
    if (serviceSchema) {
      schemas.push(serviceSchema);
    }
  }
  
  // Add article schema for blog posts
  if (additionalData?.blogPostData) {
    const articleSchema = getArticleSchema(additionalData.blogPostData);
    schemas.push(articleSchema);
  }
  

  return schemas.map((schema, index) => ({
    id: `schema-${index}`,
    type: 'application/ld+json' as const,
    children: JSON.stringify(schema, null, 2),
  }));
}

/**
 * Generate custom metadata with overrides
 * Use this when you need to override specific fields
 * 
 * @param pathname - The current page pathname
 * @param overrides - Partial metadata to override
 * @returns Complete Next.js Metadata object with overrides
 */
export function generateCustomMetadata(
  pathname: string, 
  overrides: Partial<Metadata> = {}
): Metadata {
  const baseMetadata = generateMetadataFromConfig(pathname);
  
  return {
    ...baseMetadata,
    ...overrides,
    openGraph: {
      ...baseMetadata.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...overrides.twitter,
    },
  };
}

/**
 * Generate metadata for dynamic routes (blog posts, city pages, etc.)
 * Use this in dynamic page generateMetadata functions
 * 
 * @param pathname - The current page pathname
 * @param dynamicData - Dynamic content data
 * @returns Complete Next.js Metadata object
 */
export function generateDynamicMetadata(
  pathname: string,
  dynamicData: {
    title: string;
    description: string;
    content?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
    image?: string;
    keywords?: string[];
  }
): Metadata {
  const seo = getSEOConfig(pathname);
  
  // Ensure canonical URL is properly constructed for dynamic pages
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const canonicalUrl = `${siteConfig.url}${normalizedPath}`;
  
  // Use provided keywords or fall back to SEO config keywords
  const keywords = dynamicData.keywords || seo.keywords;
  
  // Ensure description is under 160 characters
  const description = truncateDescription(dynamicData.description, 160);
  
  return {
    title: dynamicData.title,
    description: description,
    keywords: keywords,
    authors: dynamicData.author ? [{ name: dynamicData.author }] : [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    
    alternates: {
      canonical: canonicalUrl,
    },
    
    openGraph: {
      type: 'article',
      locale: seo.language || 'en_US',
      url: canonicalUrl,
      title: dynamicData.title,
      description: description,
      siteName: siteConfig.name,
      images: [
        {
          url: generateOGImageUrl(dynamicData.image, seo.ogImage),
          width: 1200,
          height: 630,
          alt: dynamicData.description || `${siteConfig.name} - ${dynamicData.title}`,
        },
      ],
      ...(dynamicData.publishedTime && { publishedTime: dynamicData.publishedTime }),
      ...(dynamicData.modifiedTime && { modifiedTime: dynamicData.modifiedTime }),
      ...(dynamicData.author && { authors: [dynamicData.author] }),
      ...(dynamicData.tags && { tags: dynamicData.tags }),
    },
    
    twitter: {
      card: 'summary_large_image',
      title: dynamicData.title,
      description: description,
      images: [generateOGImageUrl(dynamicData.image, seo.ogImage)],
      creator: siteConfig.social.twitterHandle ? `@${siteConfig.social.twitterHandle}` : undefined,
    },
    
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
      googleBot: {
        index: !seo.noIndex,
        follow: !seo.noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Explicit meta title for better SEO tool compatibility
    other: {
      'meta:title': dynamicData.title,
    },
  };
}

/**
 * Generate structured data for dynamic pages
 * Creates appropriate schema based on page type
 * 
 * @param pathname - The current page pathname
 * @param pageData - Page-specific data
 * @returns Array of structured data scripts
 * 
 * @example
 * // For blog posts
 * generateDynamicStructuredData('/blog/my-post/', {
 *   blogPostData: { title, author, content, ... },
 *   breadcrumbs: [...]
 * })
 * 
 * @example
 * // For city pages
 * generateDynamicStructuredData('/austin-tx/', {
 *   cityData: { name: 'Austin', state: 'TX', description, latitude, longitude, servicesOffered },
 *   breadcrumbs: [...]
 * })
 * 
 * @example
 * // For service pages (when you create them)
 * generateDynamicStructuredData('/service-one/', {
 *   serviceData: { 
 *     name: 'Service One',
 *     description: 'Professional service one installation services...',
 *     url: 'https://example.com/service-one/',
 *     category: 'Professional Services',
 *     serviceType: 'Installation',
 *     areaServed: ['Example City', 'North Town', 'South Town', 'East Village']
 *   },
 *   breadcrumbs: [...]
 * })
 * 
 * @example
 * // For things to do pages
 * generateDynamicStructuredData('/things-to-do-in-austin/', {
 *   thingsToDoData: {
 *     cityName: 'Austin',
 *     state: 'TX',
 *     description: 'Discover amazing things to do...',
 *     url: 'https://example.com/things-to-do-in-austin/',
 *     latitude: 30.2672,
 *     longitude: -97.7431,
 *     attractions: [{ name, address, description, type, category }],
 *     totalAttractions: 15
 *   },
 *   breadcrumbs: [...]
 * })
 */
export function generateDynamicStructuredData(
  pathname: string,
  pageData?: {
    blogPostData?: {
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
    };
    cityData?: {
      name: string;
      state: string;
      description: string;
      latitude?: string;
      longitude?: string;
      servicesOffered?: string[];
      isBusinessLocation?: boolean; // Flag to indicate if this is the actual business location
    };
    serviceData?: {
      name: string;
      description: string;
      url: string;
      category?: string;
      price?: string;
      serviceType?: string;
      areaServed?: string[];
    };
    thingsToDoData?: {
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
    };
    faqData?: {
      questions: Array<{
        question: string;
        answer: string;
      }>;
    };
    portfolioData?: {
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
    };
    isHomepage?: boolean;
    breadcrumbs?: Array<{ name: string; url: string }>;
  }
) {
  const schemas: Record<string, unknown>[] = [];
  
  // For homepage - Website and Business Schema (from config)
  // Note: Removed getLocalBusinessSchema() to avoid duplicate logo - getBusinessSchema() is more comprehensive
  if (pageData?.isHomepage) {
    schemas.push(getWebsiteSchema());
    schemas.push(getBusinessSchema()); // Uses business type from business.yaml (includes logo)
    
    // Add breadcrumb schema if provided
    if (pageData?.breadcrumbs && pageData.breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": pageData.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      });
    }
  }
  // For blog posts, use Article schema only (no automatic HowTo detection)
  else if (pageData?.blogPostData) {
    // Add Article schema as primary
    const articleSchema = getArticleSchema(pageData.blogPostData);
    schemas.push(articleSchema);
    
    // Add breadcrumb schema for navigation
    if (pageData?.breadcrumbs && pageData.breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": pageData.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      });
    }
    
    // Add Organization schema for publisher info
    schemas.push(getOrganizationSchema());
  } 
  // For city pages - LocalBusiness ONLY if isBusinessLocation, otherwise use Place schema
  else if (pageData?.cityData) {
    // Only add LocalBusiness schema if this is the actual business location
    if (pageData.cityData.isBusinessLocation) {
      const cityBusinessSchema = getCityLocalBusinessSchema(pageData.cityData);
      if (cityBusinessSchema) {
        schemas.push(cityBusinessSchema);
      }
    } else {
      // Use Place schema for service areas
      const cityPlaceSchema = getCityPlaceSchema(pageData.cityData);
      schemas.push(cityPlaceSchema);
    }
    
    // Add Website schema
    schemas.push(getWebsiteSchema());
    
    // Add breadcrumb schema if provided
    if (pageData?.breadcrumbs && pageData.breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": pageData.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      });
    }
  }
  // For service pages, use Service schema
  else if (pageData?.serviceData) {
    // Add Service schema as primary
    const serviceSchema = getServicePageSchema(pageData.serviceData);
    schemas.push(serviceSchema);
    
    // Add Website schema
    schemas.push(getWebsiteSchema());
    
    // Add breadcrumb schema if provided
    if (pageData?.breadcrumbs && pageData.breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": pageData.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      });
    }
  }
  // For things to do pages, use City/Place schemas (NO TouristDestination)
  else if (pageData?.thingsToDoData) {
    // Add City/Place and ItemList schemas (returns array)
    const thingsToDoSchemas = getThingsToDoSchema(pageData.thingsToDoData);
    schemas.push(...thingsToDoSchemas);
    
    // Add Website schema
    schemas.push(getWebsiteSchema());
    
    // Add breadcrumb schema if provided
    if (pageData?.breadcrumbs && pageData.breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": pageData.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      });
    }
  }
  // For FAQ pages, use FAQ schema
  else if (pageData?.faqData) {
    const faqSchema = getFAQSchema(pageData.faqData);
    schemas.push(faqSchema);
    
    // Add Website schema
    schemas.push(getWebsiteSchema());
    
    // Add breadcrumb schema if provided
    if (pageData?.breadcrumbs && pageData.breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": pageData.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      });
    }
  }
  // For portfolio pages, use CollectionPage and ItemList schema
  else if (pageData?.portfolioData) {
    const portfolioSchema = getPortfolioSchema(pageData.portfolioData);
    schemas.push(portfolioSchema);
    
    // Add Website schema
    schemas.push(getWebsiteSchema());
    
    // Add breadcrumb schema if provided
    if (pageData?.breadcrumbs && pageData.breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": pageData.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      });
    }
  }
  // For other pages, use Website schema (NOT Organization)
  else {
    schemas.push(getWebsiteSchema());
    
    // Add breadcrumb schema if provided
    if (pageData?.breadcrumbs && pageData.breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": pageData.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      });
    }
  }
  
  return schemas.map((schema, index) => ({
    id: `schema-${index}`,
    type: 'application/ld+json' as const,
    children: JSON.stringify(schema, null, 2),
  }));
}
