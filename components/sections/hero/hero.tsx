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
  title = "Soluciones Profesionales en Gas y Energia",
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
    <section className={cn("section relative min-h-[80dvh] pt-20 flex items-end md:items-center justify-center bg-background pb-12 md:pb-16", className)}>
      {/* Background image + overlay */}
      {image && (
        <div className="absolute inset-0 w-full h-full">
          <Slideshow />
          {/* overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-white/92 via-white/62 to-black/38" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_52%,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.62)_32%,rgba(255,255,255,0.20)_54%,transparent_72%),linear-gradient(to_bottom,rgba(7,19,38,0.28),transparent_30%,rgba(7,19,38,0.18))]" aria-hidden />
        </div>
      )}
      <div className="container max-w-7xl flex items-start flex-col justify-start mx-auto px-4 py-16 z-10">
        <div className="max-w-3xl text-left">
          {/* Subtitle */}
          {subtitle && (
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35rem] text-accent drop-shadow-sm sm:tracking-[0.5rem]">
              {subtitle}
            </p>
          )}

          <h1 className="max-w-2xl text-2xl font-bold text-primary !tracking-wider [font-family:var(--font-hero)] drop-shadow-[0_3px_24px_rgba(255,255,255,0.80)] md:text-3xl lg:text-4xl">
            {title}
          </h1>

          {description && (
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-foreground/90 sm:text-base">
              {description}
            </p>
          )}

        </div>
          <div className="flex flex-row flex-wrap items-center justify-start gap-3 pt-8 sm:gap-4">
            {primaryAction && (
              <Button href={primaryAction.href} size="lg" className="min-h-12 w-auto justify-center whitespace-nowrap">
                {primaryAction.href.startsWith("tel:") && (
                  <Phone className="mr-2 w-4 h-4 shrink-0" aria-hidden />
                )}
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button href={secondaryAction.href} variant="secondary" size="lg" className="min-h-12 w-auto justify-center whitespace-nowrap">
                <ClipboardCheck className="mr-2 w-4 h-4 shrink-0" />
                {secondaryAction.label}
              </Button>
            )}
            {tertiaryAction && (
              <Button href={tertiaryAction.href} variant="outline" size="lg" className="min-h-12 w-auto justify-center whitespace-nowrap">
                {tertiaryAction.label}
              </Button>
            )}
          </div>
      </div>
    </section>
  );
}
