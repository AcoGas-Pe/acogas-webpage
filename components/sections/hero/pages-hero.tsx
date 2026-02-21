import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface PagesHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" aria-hidden />
        </div>
      )}
      {!image && (
        <div className="absolute inset-0 bg-gradient-to-br from-background-alt to-background" aria-hidden />
      )}

      <div className="container relative z-10 pb-10 sm:pb-14 pt-28 sm:pt-32">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
              {breadcrumbs.map((bc, i) => (
                <li key={bc.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-border">/</span>}
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
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-3">
            {subtitle}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight max-w-3xl [font-family:var(--font-hero)]">
          {title}
        </h1>

        {description && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed">
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
