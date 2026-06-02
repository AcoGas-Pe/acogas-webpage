import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { Metadata } from "next";
import { getWordPressRevalidateSeconds } from "@/lib/wordpress/cache-revalidate";
import { wpGraphqlFetch } from "@/lib/wordpress/graphql/client";
import {
  isTruthyEnvFlag,
  isWpProductsDebugEnabled,
} from "@/lib/wordpress/products-debug-log";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categories: string[];
  author: string;
  readTime: string;
  image?: string;
  imageAlt?: string;
  date?: string;
  modified?: string;
}

type WpBlogNode = {
  slug?: string | null;
  title?: string | null;
  date?: string | null;
  modified?: string | null;
  blogsAcogas?: {
    postContent?: string | null;
    categorias?: string | null;
    autor?: string | null;
    readTime?: string | null;
    blogImage?: {
      node?: {
        mediaItemUrl?: string | null;
        altText?: string | null;
      } | null;
    } | null;
  } | null;
};

type WpBlogResponse = {
  blogsDeAcogas?: {
    nodes?: WpBlogNode[] | null;
    pageInfo?: {
      hasNextPage?: boolean | null;
      endCursor?: string | null;
    } | null;
  } | null;
};

const BLOG_QUERY = /* GraphQL */ `
  query BlogsDeAcogas($first: Int = 50, $after: String) {
    blogsDeAcogas(first: $first, after: $after) {
      nodes {
        slug
        title
        date
        modified
        blogsAcogas {
          postContent
          categorias
          autor
          readTime
          blogImage {
            node {
              mediaItemUrl
              altText
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

function useWordPressBlog(): boolean {
  if (process.env.USE_WORDPRESS_BLOG !== undefined) {
    return isTruthyEnvFlag(process.env.USE_WORDPRESS_BLOG);
  }
  return true;
}

function blogFetchError(error: unknown): void {
  if (process.env.NODE_ENV === "development" || isWpProductsDebugEnabled()) {
    console.error("[WP blog] GraphQL / red:", error);
  }
}

function blogInfo(...args: unknown[]): void {
  if (process.env.NODE_ENV === "development" || isWpProductsDebugEnabled()) {
    console.log("[WP blog]", ...args);
  }
}

function blogVerbose(...args: unknown[]): void {
  if (!isWpProductsDebugEnabled()) return;
  console.log("[WP blog][debug]", ...args);
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function stripMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMarkdownTitle(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || null;
}

function buildExcerpt(content: string): string {
  const plain = stripMarkdown(content);
  return plain.length > 160 ? `${plain.slice(0, 157).trim()}...` : plain;
}

function fallbackSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitCategories(value?: string | null): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function mapBlogNode(node: WpBlogNode): BlogPost | null {
  const content = node.blogsAcogas?.postContent?.trim() ?? "";
  const slug = node.slug?.trim() || fallbackSlug(node.title?.trim() || extractMarkdownTitle(content) || "articulo-acogas");
  const wpTitle = node.title?.trim();
  const title =
    extractMarkdownTitle(content) ||
    (wpTitle && wpTitle !== slug ? wpTitle : null) ||
    wpTitle ||
    "Artículo Acogas";
  if (!slug || !content) return null;

  return {
    slug,
    title,
    excerpt: buildExcerpt(content),
    content,
    categories: splitCategories(node.blogsAcogas?.categorias),
    author: node.blogsAcogas?.autor?.trim() || "Acogas",
    readTime: node.blogsAcogas?.readTime?.trim() || "Lectura breve",
    image: node.blogsAcogas?.blogImage?.node?.mediaItemUrl?.trim() || undefined,
    imageAlt: node.blogsAcogas?.blogImage?.node?.altText?.trim() || title,
    date: node.date ?? undefined,
    modified: node.modified ?? undefined,
  };
}

async function fetchWordPressBlogPostsFromApi(): Promise<BlogPost[]> {
  const allNodes: WpBlogNode[] = [];
  let after: string | null = null;
  let batches = 0;
  const MAX_BATCHES = 20;

  for (;;) {
    if (batches >= MAX_BATCHES) break;
    batches += 1;

    const data: WpBlogResponse = await wpGraphqlFetch<WpBlogResponse>(BLOG_QUERY, {
      first: 50,
      after,
    });
    const conn = data.blogsDeAcogas;
    const nodes = conn?.nodes ?? [];
    allNodes.push(...nodes);

    const pageInfo = conn?.pageInfo;
    const hasNextPage = Boolean(pageInfo?.hasNextPage && nodes.length > 0);
    const nextCursor = pageInfo?.endCursor ?? null;
    if (!hasNextPage || !nextCursor) break;
    after = nextCursor;
  }

  blogVerbose(
    `Campo "blogsDeAcogas": ${allNodes.length} nodos en ${batches} petición(es) (hasta 50 por petición)`,
  );

  const posts = allNodes
    .map(mapBlogNode)
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => {
      const left = a.date ? new Date(a.date).getTime() : 0;
      const right = b.date ? new Date(b.date).getTime() : 0;
      return right - left;
    });

  blogVerbose(`→ ${posts.length} artículos tras map (nodos sin postContent se omiten)`);
  if (posts.length > 0) {
    blogInfo(`Origen: WordPress · ${posts.length} artículo(s) · RootQuery.blogsDeAcogas(…)`);
  } else if (allNodes.length > 0) {
    console.warn(
      "[WP blog] WordPress devolvió nodos pero 0 artículos tras mapear. ¿postContent vacío en todos?",
    );
  } else {
    blogInfo("Origen: WordPress · 0 artículos publicados en blogsDeAcogas.");
  }

  return posts;
}

const getCachedWordPressBlogPosts = unstable_cache(
  fetchWordPressBlogPostsFromApi,
  ["wordpress-blog-posts"],
  {
    revalidate: getWordPressRevalidateSeconds(),
    tags: ["wordpress-blog"],
  },
);

export const resolveAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  if (!useWordPressBlog()) return [];

  try {
    return await getCachedWordPressBlogPosts();
  } catch (error) {
    blogFetchError(error);
    console.warn(
      "[WP blog] No se pudo leer WordPress; se mostrará el blog vacío. Mensaje:",
      error instanceof Error ? error.message : String(error),
    );
    return [];
  }
});

export async function resolveRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await resolveAllBlogPosts();
  return posts.slice(0, limit);
}

export async function resolveBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await resolveAllBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function resolveAllBlogSlugs(): Promise<string[]> {
  const posts = await resolveAllBlogPosts();
  return posts.map((post) => post.slug);
}

export async function resolveRelatedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const posts = await resolveAllBlogPosts();
  const categorySet = new Set(post.categories.map((category) => category.toLowerCase()));
  const relatedByCategory = posts.filter(
    (candidate) =>
      candidate.slug !== post.slug &&
      candidate.categories.some((category) => categorySet.has(category.toLowerCase())),
  );
  const fallback = posts.filter((candidate) => candidate.slug !== post.slug);
  const merged = [...relatedByCategory, ...fallback];
  const unique = new Map(merged.map((candidate) => [candidate.slug, candidate]));
  return Array.from(unique.values()).slice(0, limit);
}

export function blogPostMetadata(post: BlogPost): Metadata {
  return {
    title: `${post.title} | Blog Acogas`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `/blog/${post.slug}/`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}/`,
      images: post.image ? [{ url: post.image, alt: post.imageAlt ?? post.title }] : undefined,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      tags: post.categories,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}
