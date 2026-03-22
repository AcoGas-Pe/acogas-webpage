import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClipboardCheck, Phone } from "lucide-react";
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
  /** If true, hero has no full-bleed background (carousel is rendered below separately) */
  noBackground?: boolean;
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
    <section className={cn("section min-h-[80dvh] pt-16 flex items-end md:items-center justify-center bg-background pb-12 md:pb-16", className)}>
      {/* Background image + overlay */}
      {image && (
        <div className="absolute inset-0 w-full h-full">
          <Slideshow />
          {/* overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-white/80 via-white/40 to-white/80" aria-hidden />
        </div>
      )}
      <div className="container max-w-7xl flex items-start justify-start mx-auto px-4 py-16 z-10">
        <div className=" text-left">
          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm font-semibold uppercase tracking-[0.5rem] text-accent mb-4">
              {subtitle}
            </p>
          )}

          <h1 className="text-2xl md:text-3xl lg:text-4xl max-w-2xl font-semibold text-primary !tracking-wider [font-family:var(--font-hero)]">
            {title}
          </h1>

          {description && (
            <p className="text-sm sm:text-base text-foreground max-w-2xl leading-relaxed mt-3">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 justify-start items-stretch sm:items-center pt-8">
            {primaryAction && (
              <Button href={primaryAction.href} size="lg" className="w-full sm:w-auto min-h-12 justify-center">
                {primaryAction.href.startsWith("tel:") && (
                  <Phone className="mr-2 w-4 h-4 shrink-0" aria-hidden />
                )}
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button href={secondaryAction.href} variant="secondary" size="lg" className="w-full sm:w-auto min-h-12 justify-center">
                <ClipboardCheck className="mr-2 w-4 h-4 shrink-0" />
                {secondaryAction.label}
              </Button>
            )}
            {tertiaryAction && (
              <Button href={tertiaryAction.href} variant="outline" size="lg" className="w-full sm:w-auto min-h-12 justify-center">
                {tertiaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
