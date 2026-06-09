import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

/** aBlackLives no incluye diacriticos; normaliza titulos del H1. */
function heroDisplayTitle(text: string): string {
  return text.normalize("NFD").replace(/\p{M}/gu, "");
}

interface PagesHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  /** Clases extra para el H1 (p. ej. mayúsculas en landings) */
  titleClassName?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  className?: string;
  image?: string;
  breadcrumbs?: { label: string; href: string }[];
}

export function PagesHero({
  title = "Acogas",
  subtitle,
  description,
  titleClassName,
  className,
  image,
  breadcrumbs,
  primaryAction,
  secondaryAction,
}: PagesHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden min-h-[50dvh] sm:min-h-[55dvh]",
        className
      )}
    >
      {image && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/78 to-background/40" aria-hidden />
          <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/45 to-transparent" aria-hidden />
        </div>
      )}
      {!image && (
        <div className="absolute inset-0 bg-gradient-to-br from-background-alt to-background" aria-hidden />
      )}

      <div className="container relative z-10 pb-10 pt-28 sm:pb-14 sm:pt-32">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
              {breadcrumbs.map((bc, i) => (
                <li key={bc.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-foreground/50">/</span>}
                  <Link
                    href={bc.href}
                    className={cn(
                      "transition-colors hover:text-primary",
                      i === breadcrumbs.length - 1 && "text-primary font-medium"
                    )}
                    aria-current={i === breadcrumbs.length - 1 ? "page" : undefined}
                  >
                    {bc.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {subtitle && (
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">
            {subtitle}
          </span>
        )}

        <h1
          className={cn(
            "max-w-3xl text-3xl font-bold leading-tight tracking-tight text-primary drop-shadow-[0_2px_18px_rgba(255,255,255,0.45)] [font-family:var(--font-hero)] sm:text-4xl md:text-5xl",
            titleClassName,
          )}
        >
          {heroDisplayTitle(title)}
        </h1>

        {description && (
          <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-foreground/80 sm:mt-4 sm:text-base md:text-lg">
            {description}
          </p>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8">
            {primaryAction && (
              <Button href={primaryAction.href} size="lg" className="w-full sm:w-auto min-h-12">
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button href={secondaryAction.href} variant="outline" size="lg" className="w-full sm:w-auto min-h-12">
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
