import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClipboardCheck, Phone } from "lucide-react";
import Image from "next/image";
import { Slideshow } from "./slideshow";

interface HeroAction {
  label: string;
  href: string;
  variant?: "default" | "destructive" | "secondary" | "outline";
}

function heroDisplayTitle(text: string): string {
  return text.normalize("NFD").replace(/\p{M}/gu, "");
}

const DEFAULT_KEYWORDS = [
  "GLP",
  "Gas natural",
  "Vapor",
  "Regulación",
  "Control",
  "Ingeniería",
  "Procesos industriales",
  "Energía",
];

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  tertiaryAction?: HeroAction;
  className?: string;
  /** Static image on the right panel instead of the video slideshow */
  image?: string;
  /** Keywords repeated on the diagonal stripe between text and media */
  keywords?: string[];
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
  image,
  keywords = DEFAULT_KEYWORDS,
  noBackground = false,
}: HeroProps) {
  const showMedia = !noBackground;
  const stripeItems = [...keywords, ...keywords];

  return (
    <section
      className={cn(
        "section relative min-h-[88dvh] w-full overflow-hidden bg-background pt-20",
        className,
      )}
    >
      <div
        className={cn(
          "relative min-h-[calc(88dvh-5rem)] w-full",
          showMedia && "flex flex-col lg:block",
        )}
      >
        {/* Mobile: video arriba, texto abajo. Desktop: split diagonal */}
        {showMedia && (
          <div className="relative z-0 min-h-[38dvh] w-full shrink-0 sm:min-h-[42dvh] lg:absolute lg:inset-0 lg:min-h-0">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            ) : (
              <Slideshow className="absolute inset-0" />
            )}
          </div>
        )}

        {showMedia && (
          <div
            className="hero-split__text-panel pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[58%] lg:block"
            aria-hidden
          />
        )}

        {showMedia && (
          <div
            className="hero-split__keyword-stripe-wrap pointer-events-none absolute top-0 bottom-0 z-20 hidden w-9 overflow-hidden lg:block"
            aria-hidden
          >
            <div className="hero-split__keyword-stripe flex h-full w-full flex-col items-center justify-start py-3 shadow-lg">
              <div className="hero-split__keyword-track flex min-h-[200%] flex-col items-center gap-5">
                {stripeItems.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-primary-foreground [writing-mode:vertical-lr]"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div
          className={cn(
            "relative z-30 flex flex-col justify-center px-4 py-12 sm:px-6 sm:py-14 lg:py-20",
            showMedia
              ? "bg-background lg:absolute lg:inset-y-0 lg:left-0 lg:max-w-[58%] lg:bg-transparent lg:pl-[max(1rem,calc((100vw-80rem)/2+1rem))] lg:pr-10"
              : "container mx-auto max-w-7xl",
          )}
        >
          <div className="relative max-w-2xl">
            {subtitle && (
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.35rem] text-accent sm:text-base sm:tracking-[0.5rem]">
                {subtitle}
              </p>
            )}

            <h1 className="max-w-3xl text-3xl font-bold tracking-wide text-primary [font-family:var(--font-hero)] md:text-4xl lg:text-5xl xl:text-[3.25rem] xl:leading-tight">
              {heroDisplayTitle(title)}
            </h1>

            {description && (
              <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-foreground/90 sm:text-lg sm:leading-8">
                {description}
              </p>
            )}

              <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-start gap-3 pt-8 sm:gap-4">
              {primaryAction && (
                <Button
                  href={primaryAction.href}
                  variant={primaryAction.variant ?? "default"}
                  size="lg"
                  className="min-h-12 w-auto justify-center whitespace-nowrap"
                >
                  {primaryAction.href.startsWith("tel:") && (
                    <Phone className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                  )}
                  {primaryAction.label}
                </Button>
              )}
              {tertiaryAction && (
                <Button
                  href={tertiaryAction.href}
                  variant={tertiaryAction.variant ?? "outline"}
                  size="lg"
                  className="min-h-12 w-auto justify-center whitespace-nowrap"
                >
                  {tertiaryAction.label}
                </Button>
              )}
              </div>
              {secondaryAction && (
                <Button
                  href={secondaryAction.href}
                  variant={secondaryAction.variant ?? "secondary"}
                  size="lg"
                  className="min-h-12 w-auto justify-center whitespace-nowrap"
                >
                  <ClipboardCheck className="mr-2 h-4 w-4 shrink-0" />
                  {secondaryAction.label}
                </Button>
              )}
              
            </div>

            {showMedia && (
              <ul
                className="mt-8 flex flex-wrap gap-2 lg:hidden"
                aria-label="Especialidades"
              >
                {keywords.map((word) => (
                  <li
                    key={word}
                    className="rounded-full border border-primary/15 bg-primary-muted/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary"
                  >
                    {word}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
