import {
  generateBreadcrumbSchema,
  getBusinessSchema,
  getSEOConfig,
  getWebsiteSchema,
} from "@/lib/seo-config";

export interface JsonLdScriptsProps {
  /** Ruta con slash final (ej. `/nosotros/`) para breadcrumbs desde seo-config. */
  pathname: string;
  /** Schemas adicionales (Product, Service, FAQPage, Place, etc.). */
  extra?: Record<string, unknown>[];
  /** Si es false, no se emite BreadcrumbList (p. ej. cuando va en `extra`). */
  includeBreadcrumb?: boolean;
}

function stringifySchema(schema: Record<string, unknown>): string {
  return JSON.stringify(schema);
}

/**
 * JSON-LD estándar del sitio: WebSite, negocio (LocalBusiness) y breadcrumbs opcionales.
 */
export function JsonLdScripts({
  pathname,
  extra = [],
  includeBreadcrumb = true,
}: JsonLdScriptsProps) {
  const seo = getSEOConfig(pathname);
  const schemas: Record<string, unknown>[] = [
    getWebsiteSchema(),
    getBusinessSchema(),
  ];

  if (includeBreadcrumb && seo.breadcrumbs?.length) {
    schemas.push(generateBreadcrumbSchema(seo.breadcrumbs));
  }

  schemas.push(...extra);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifySchema(schema) }}
        />
      ))}
    </>
  );
}
