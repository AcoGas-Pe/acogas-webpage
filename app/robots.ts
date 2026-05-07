import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo-config";
import { isSiteIndexingDisabled } from "@/lib/site-indexing";

export default function robots(): MetadataRoute.Robots {
  if (isSiteIndexingDisabled()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
