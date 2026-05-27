import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { BlogPostCard } from "@/components/blog-post-card";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { MarkdownContent } from "@/components/markdown-content";
import {
  blogPostMetadata,
  resolveAllBlogSlugs,
  resolveBlogPostBySlug,
  resolveRelatedBlogPosts,
} from "@/lib/blog-resolve";
import { generateBreadcrumbSchema, siteConfig } from "@/lib/seo-config";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await resolveAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolveBlogPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };
  return blogPostMetadata(post);
}

function formatDate(date?: string): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await resolveBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await resolveRelatedBlogPosts(post, 3);
  const date = formatDate(post.date);
  const modifiedDate = post.modified && post.modified !== post.date ? formatDate(post.modified) : null;
  const pageUrl = `${siteConfig.url}/blog/${post.slug}/`;

  return (
    <>
      <JsonLdScripts
        pathname={`/blog/${post.slug}/`}
        includeBreadcrumb={false}
        extra={[
          generateBreadcrumbSchema([
            { name: "Inicio", url: siteConfig.url },
            { name: "Blog", url: `${siteConfig.url}/blog/` },
            { name: post.title, url: pageUrl },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
            },
            datePublished: post.date,
            dateModified: post.modified ?? post.date,
            mainEntityOfPage: pageUrl,
            url: pageUrl,
            articleSection: post.categories[0] ?? "Blog",
            keywords: post.categories.join(", "),
            timeRequired: post.readTime,
            inLanguage: "es-PE",
          },
        ]}
      />

      <article className="bg-background">
        <header className="relative overflow-hidden border-b border-border/40 bg-background-alt pt-28">
          {post.image ? (
            <div className="absolute inset-0" aria-hidden>
              <Image
                src={post.image}
                alt=""
                fill
                priority
                className="object-contain p-6 opacity-15"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/70" />
            </div>
          ) : null}

          <div className="container relative z-10 pb-12 sm:pb-16 md:pb-20">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Volver al blog
            </Link>
            <div className="mt-6 max-w-4xl">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-[0.15em] text-accent">
                {date ? <span>Publicado: {date}</span> : null}
                {modifiedDate ? <span>Actualizado: {modifiedDate}</span> : null}
                <span>Lectura: {post.readTime}</span>
                <span>{post.author}</span>
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {post.excerpt}
              </p>
              {post.categories.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-lg border border-primary/15 bg-primary/[0.07] px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </header>

        {post.image ? (
          <div className="container -mt-8 relative z-10">
            <div className="relative mx-auto aspect-[16/8] max-w-5xl overflow-hidden rounded-[1.75rem] border border-border/50 bg-card shadow-[0_24px_58px_-38px_hsl(var(--primary)_/_0.42)]">
              <Image
                src={post.image}
                alt={post.imageAlt ?? post.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 64rem"
              />
            </div>
          </div>
        ) : null}

        <section className="section py-12 sm:py-16 md:py-20">
          <div className="container">
            <MarkdownContent content={post.content} />
          </div>
        </section>

        {relatedPosts.length > 0 ? (
          <section className="section border-t border-border/40 bg-background-alt py-14 sm:py-16 md:py-20">
            <div className="container">
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent sm:text-sm">
                  También puede interesarte
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                  Artículos relacionados
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>
    </>
  );
}
