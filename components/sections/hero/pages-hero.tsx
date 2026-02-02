import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface PagesHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
  image?: string;
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
}

export function PagesHero({
  title = "Acogas",
  subtitle = "Soluciones industriales seguras y eficientes en GLP, Gas Natural, Vapor y Procesos Especiales.",
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
        "section flex items-center justify-center bg-background relative overflow-hidden",
        className
      )}
      style={{ minHeight: "30rem" }}
    >
      {/* Background image + overlay */}
      {image && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full object-cover"
            priority
          />
          {/* overlay */}
          <div className="absolute inset-0 bg-black/70" aria-hidden />
        </div>
      )}
      <div className="container mx-auto px-4 py-16 z-10">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          

          
          {/* Main Title - Black Lives display font */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold [font-family:var(--font-hero)] [word-spacing:0.35em] ![letter-spacing:0.1em]">
            {title}
          </h1>
{/* Subtitle */}
          {subtitle && (
            <p className="text-sm uppercase tracking-wider text-secondary-foreground mb-4">
              {subtitle}
            </p>
          )}
{/* Breadcrumbs */}
          {breadcrumbs && (
            <div
              className="flex flex-wrap justify-center items-center gap-2 mb-4"
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center space-x-1">
                {breadcrumbs.map((breadcrumb, i) => (
                  <li key={breadcrumb.href} className="inline-flex items-center">
                    <Link
                      href={breadcrumb.href}
                      className={
                        i === breadcrumbs.length - 1
                          ? "font-light text-primary-light opacity-80 hover:opacity-100 transition-all duration-200"
                          : " text-muted-foreground opacity-90 hover:text-primary-light hover:opacity-100 transition-all duration-200"
                      }
                      aria-current={i === breadcrumbs.length - 1 ? "page" : undefined}
                    >
                      {breadcrumb.label}
                    </Link>
                    {i < breadcrumbs.length - 1 && (
                      <span className="mx-2">/</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              {primaryAction && (
                <Button href={primaryAction.href} size="lg">
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button href={secondaryAction.href} variant="outline" size="lg">
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
