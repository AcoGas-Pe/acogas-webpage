import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Slideshow } from "./slideshow";

interface HeroProps {
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
}

export function Hero({
  title = "Soluciones Profesionales en Gas y Energía",
  subtitle = "Confianza y Calidad",
  description = "Comprometidos con la excelencia en el suministro de gas y energía para hogares y empresas. Seguridad, confiabilidad y servicio de primera clase.",
  primaryAction = {
    label: "Contactar",
    href: "/contacto",
  },
  secondaryAction,
  className,
  image = "/assets/images/refinery.webp",
}: HeroProps) {
  return (
    <section className={cn("section flex items-center justify-center bg-background", className)}>
      {/* Background image + overlay */}
      {image && (
        <div className="absolute inset-0 w-full h-full">
          <Slideshow />
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/70 to-black/20" aria-hidden />
        </div>
      )}
      <div className="container mx-auto px-4 py-16 z-10">
        <div className="max-w-7xl mx-auto text-left">
          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm font-semibold uppercase tracking-[1rem] text-primary mb-4">
              {subtitle}
            </p>
          )}
          
          {/* Main Title - Black Lives display font */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl max-w-2xl font-semibold text-foreground !tracking-wide [font-family:var(--font-hero)]">
            {title}
          </h1>
          
          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-left items-center pt-8">
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
        </div>
      </div>
    </section>
  );
}
