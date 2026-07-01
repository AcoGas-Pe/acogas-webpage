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
        "section relative w-full overflow-x-hidden bg-background pt-20 lg:min-h-[88dvh]",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full",
          showMedia && "flex flex-col lg:min-h-[calc(88dvh-5rem)] lg:block",
        )}
      >
        {/* Mobile: video arriba, texto abajo. Desktop: split diagonal */}
        {showMedia && (
          <div className="relative z-0 aspect-[16/10] max-h-[min(42dvh,22rem)] w-full shrink-0 sm:max-h-[min(45dvh,26rem)] lg:absolute lg:inset-0 lg:aspect-auto lg:max-h-none lg:min-h-0">
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
            "relative z-30 flex min-w-0 flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 lg:py-16",
            showMedia
              ? "w-full bg-background lg:absolute lg:inset-y-0 lg:left-0 lg:max-w-[min(58%,44rem)] lg:bg-transparent lg:pl-[max(1rem,calc((100vw-80rem)/2+1rem))] lg:pr-6 xl:max-w-[58%] xl:pr-8"
              : "container mx-auto max-w-7xl",
          )}
        >
          <div className="relative w-full min-w-0 max-w-2xl">
            {subtitle && (
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent sm:mb-5 sm:text-sm sm:tracking-[0.35rem] md:tracking-[0.45rem]">
                {subtitle}
              </p>
            )}

            <h1 className="max-w-4xl text-balance text-[1.65rem] font-bold leading-[1.15] tracking-wide text-primary [font-family:var(--font-hero)] min-[400px]:text-[1.85rem] sm:text-3xl md:text-4xl lg:text-[2.15rem] lg:leading-[1.2] xl:text-[2.45rem] 2xl:text-[3rem] 2xl:leading-tight">
              {heroDisplayTitle(title)}
            </h1>

            {description && (
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-foreground/90 sm:mt-5 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                {description}
              </p>
            )}

            <div className="mt-6 flex w-full min-w-0 flex-col gap-2 sm:mt-8">
              <div className="grid w-full min-w-0 grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {primaryAction && (
                  <Button
                    href={primaryAction.href}
                    variant={primaryAction.variant ?? "default"}
                    size="lg"
                    className="min-h-11 w-full min-w-0 px-4 text-xs sm:min-h-12 sm:px-6 sm:text-sm"
                  >
                    {primaryAction.href.startsWith("tel:") && (
                      <Phone className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                    )}
                    <span className="truncate">{primaryAction.label}</span>
                  </Button>
                )}
                {tertiaryAction && (
                  <Button
                    href={tertiaryAction.href}
                    variant={tertiaryAction.variant ?? "outline"}
                    size="lg"
                    className="min-h-11 w-full min-w-0 px-4 text-xs sm:min-h-12 sm:px-6 sm:text-sm"
                  >
                    <span className="truncate">{tertiaryAction.label}</span>
                  </Button>
                )}
              </div>
              {secondaryAction && (
                <Button
                  href={secondaryAction.href}
                  variant={secondaryAction.variant ?? "secondary"}
                  size="lg"
                  className="min-h-11 w-full min-w-0 px-4 text-xs sm:min-h-12 sm:px-6 sm:text-sm"
                >
                  <ClipboardCheck className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{secondaryAction.label}</span>
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
