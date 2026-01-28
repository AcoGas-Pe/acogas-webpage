import { MetadataRoute } from 'next';
import { seoConfigs, siteConfig } from '@/lib/seo-config';
/*
import { getAllPosts } from '@/lib/blog-utils';
import { getAllThingsToDoPages } from '@/lib/things-to-do-utils';
import servicesData from '@/data/services.json';
import { getCityUrls } from '@/lib/city-utils';
*/

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  const routes = Object.entries(seoConfigs).map(([path]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1.0 : 0.8,
  }));
/*
  // Add blog post routes from markdown files in content/posts
  // This automatically includes all published posts
  const allPosts = getAllPosts();
  const blogPostRoutes = allPosts.map((post) => {
    // Ensure URL has trailing slash
    let postUrl = post.permalink || `/${post.slug}/`;
    // Remove leading slash if present (baseUrl already has it or we'll add it)
    postUrl = postUrl.startsWith('/') ? postUrl : `/${postUrl}`;
    // Ensure trailing slash
    postUrl = postUrl.endsWith('/') ? postUrl : `${postUrl}/`;
    
    return {
      url: `${baseUrl}${postUrl}`,
      lastModified: new Date(post.publishedAt || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });
*/
/*
  // Add service routes
  const serviceRoutes = servicesData.services.map((service) => ({
    url: `${baseUrl}/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: service.isCore ? 0.9 : 0.7,
  }));

  // Add things-to-do pages
  const thingsToDoPages = getAllThingsToDoPages();
  const thingsToDoRoutes: MetadataRoute.Sitemap = thingsToDoPages.map((page) => {
    const publishedDate = new Date(page.date || new Date());
    return {
      url: `${baseUrl}/${page.slug}/`,
      lastModified: publishedDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  // Add city routes using centralized city utilities
  const cityRoutes = getCityUrls(baseUrl);

  return [...routes, ...blogPostRoutes, ...serviceRoutes, ...thingsToDoRoutes, ...cityRoutes];
*/
return routes;
}
