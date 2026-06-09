import type { Metadata } from "next";
import Link from "next/link";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { BlogPostCard } from "@/components/blog-post-card";
import { Button } from "@/components/ui/button";
import { resolveAllBlogPosts } from "@/lib/blog-resolve";
import { cn } from "@/lib/utils";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog técnico | Acogas",
  description:
    "Artículos técnicos, novedades y criterios de aplicación para GLP, gas natural, vapor y procesos industriales.",
  alternates: {
    canonical: "/blog/",
  },
};

interface BlogPageProps {
  searchParams?: Promise<{ page?: string }>;
}

const POSTS_PER_PAGE = 9;

function parsePage(value?: string): number {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

function pageHref(page: number): string {
  return page <= 1 ? "/blog/" : `/blog/?page=${page}`;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const posts = await resolveAllBlogPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(parsePage(params?.page), totalPages);
  const pagePosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <>
      <JsonLdScripts pathname="/blog/" />
      <PagesHero
        title="Blog tecnico"
        subtitle="Novedades"
        description="Artículos técnicos, novedades y criterios de aplicación para GLP, gas natural, vapor y procesos industriales."
        image="/assets/images/industry-plant-industrial-plant.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog/" },
        ]}
      />

      <section className="section border-t border-border/40 bg-background-alt py-14 sm:py-16 md:py-20">
        <div className="container">
          {posts.length > 0 ? (
            <>
              <div className="mb-8 flex flex-col gap-2 text-center sm:mb-10">
                <p className="text-sm font-semibold text-muted-foreground">
                  Mostrando {pagePosts.length} de {posts.length} artículos
                </p>
                {totalPages > 1 ? (
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
                    Página {currentPage} de {totalPages}
                  </p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pagePosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>

              {totalPages > 1 ? (
                <nav
                  className="mt-12 flex flex-wrap items-center justify-center gap-2"
                  aria-label="Paginación de blog"
                >
                  <Link
                    href={pageHref(Math.max(1, currentPage - 1))}
                    aria-disabled={currentPage === 1}
                    className={cn(
                      "rounded-xl border border-border/60 bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/20 hover:bg-primary/[0.06]",
                      currentPage === 1 && "pointer-events-none opacity-45",
                    )}
                  >
                    Anterior
                  </Link>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <Link
                      key={page}
                      href={pageHref(page)}
                      aria-current={page === currentPage ? "page" : undefined}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card text-sm font-bold text-primary shadow-sm transition hover:border-primary/20 hover:bg-primary/[0.06]",
                        page === currentPage && "border-primary/25 bg-primary text-primary-foreground",
                      )}
                    >
                      {page}
                    </Link>
                  ))}
                  <Link
                    href={pageHref(Math.min(totalPages, currentPage + 1))}
                    aria-disabled={currentPage === totalPages}
                    className={cn(
                      "rounded-xl border border-border/60 bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/20 hover:bg-primary/[0.06]",
                      currentPage === totalPages && "pointer-events-none opacity-45",
                    )}
                  >
                    Siguiente
                  </Link>
                </nav>
              ) : null}
            </>
          ) : (
            <div className="mx-auto flex min-h-[220px] max-w-3xl flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-border/55 bg-card p-8 text-center shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.34)]">
              <h2 className="text-xl font-bold text-primary">Contenido en preparación</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                El blog está listo para integrarse con WordPress. Cuando existan artículos publicados,
                aparecerán automáticamente en esta página.
              </p>
              <Button href="/contacto/" className="mt-6">
                Contactar a Acogas
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
