import type { MetadataRoute } from "next";
import { CORE_SERVICE_URLS, PRODUCT_INDUSTRY_URLS } from "@/lib/business-config";
import { resolveAllBlogSlugs } from "@/lib/blog-resolve";
import { getAllCitySlugs } from "@/lib/cities-data";
import { resolveAllProductSlugs } from "@/lib/products-resolve";
import { seoConfigs, siteConfig } from "@/lib/seo-config";
import { isSiteIndexingDisabled } from "@/lib/site-indexing";
import { getAllStrategicBrandSlugs } from "@/lib/strategic-brands";

function staticRoutes(baseUrl: string): MetadataRoute.Sitemap {
  return Object.entries(seoConfigs).map(([path]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1.0 : 0.8,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isSiteIndexingDisabled()) {
    return [];
  }

  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const industryRoutes: MetadataRoute.Sitemap = PRODUCT_INDUSTRY_URLS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = CORE_SERVICE_URLS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const cityRoutes: MetadataRoute.Sitemap = getAllCitySlugs().map((slug) => ({
    url: `${baseUrl}/cobertura-industrial/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const brandRoutes: MetadataRoute.Sitemap = getAllStrategicBrandSlugs().map((slug) => ({
    url: `${baseUrl}/marcas/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const [productSlugs, blogSlugs] = await Promise.all([
    resolveAllProductSlugs(),
    resolveAllBlogSlugs(),
  ]);

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/productos/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [
    ...staticRoutes(baseUrl),
    ...serviceRoutes,
    ...industryRoutes,
    ...cityRoutes,
    ...brandRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}
