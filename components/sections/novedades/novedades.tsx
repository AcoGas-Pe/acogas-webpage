import { cn } from "@/lib/utils";
import { BlogPostCard } from "@/components/blog-post-card";
import { Button } from "@/components/ui/button";
import { resolveRecentBlogPosts } from "@/lib/blog-resolve";

interface NovedadesProps {
  className?: string;
}

export async function Novedades({ className }: NovedadesProps) {
  const posts = await resolveRecentBlogPosts(3);

  return (
    <section
      className={cn("section bg-background py-16 sm:py-20 md:py-24", className)}
      aria-label="Blog"
    >
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Mantenerse actualizado
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Blog técnico
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Artículos técnicos, criterios de aplicación y novedades para decisiones industriales.
          </p>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button href="/blog/" variant="outline" size="lg">
                Ver todos los artículos
              </Button>
            </div>
          </>
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/55 bg-card p-8 text-center shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.34)]">
            <p className="text-sm text-muted-foreground">Contenido en preparación</p>
            <Button href="/blog/" variant="link" className="mt-3">
              Ir al blog
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
