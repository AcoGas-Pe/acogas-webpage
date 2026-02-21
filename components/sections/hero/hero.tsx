import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClipboardCheck } from "lucide-react";
import Image from "next/image";
import { Slideshow } from "./slideshow";

interface HeroAction {
  label: string;
  href: string;
}

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  tertiaryAction?: HeroAction;
  className?: string;
  image?: string;
}

export function Hero({
  title = "Soluciones Profesionales en Gas y Energía",
  subtitle = "Confianza y Calidad",
  description = "Comprometidos con la excelencia en el suministro de gas y energía para hogares y empresas. Seguridad, confiabilidad y servicio de primera clase.",
  primaryAction = {
    label: "Solicitar Visita Técnica",
    href: "/contacto?tipo=visita",
  },
  secondaryAction = {
    label: "Solicitar Diagnóstico",
    href: "/contacto?tipo=diagnostico",
  },
  tertiaryAction,
  className,
  image = "/assets/images/refinery.webp",
}: HeroProps) {
  return (
    <section className={cn("section min-h-[85dvh] flex items-end md:items-center justify-center bg-background pb-12 md:pb-16", className)}>
      {/* Background image + overlay */}
      {image && (
        <div className="absolute inset-0 w-full h-full">
          <Slideshow />
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/70 to-black/20" aria-hidden />
        </div>
      )}
      <div className="container max-w-7xl mx-auto flex items-start justify-start mx-auto px-4 py-16 z-10">
        <div className=" text-left">
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
          
          {/* Actions - Dual CTA Strategy */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-left items-stretch sm:items-center pt-8">
            {primaryAction && (
              <Button href={primaryAction.href} size="lg">
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button href={secondaryAction.href} variant="secondary" size="lg">
                <ClipboardCheck className="mr-2 w-4 h-4" />
                {secondaryAction.label}
              </Button>
            )}
            {tertiaryAction && (
              <Button href={tertiaryAction.href} variant="outline" size="lg">
                {tertiaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
