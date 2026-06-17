"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Building2, FlagIcon } from "lucide-react";

interface CoverageProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const CITIES = [
  { name: "Trujillo", href: "/cobertura-industrial/trujillo/" },
  { name: "Arequipa", href: "/cobertura-industrial/arequipa/" },
] as const;

const LIMA_CITIES = [
  { name: "Lima", href: "/cobertura-industrial/lima/" },
  { name: "Callao", href: "/cobertura-industrial/callao/" },
  { name: "Lurín", href: "/cobertura-industrial/lurin/" },
  {
    name: "Santiago de Surco",
    href: "/cobertura-industrial/santiago-de-surco/",
  },
] as const;

export function Coverage({
  title = "Cobertura industrial",
  subtitle = "Presencia territorial",
  className,
}: CoverageProps) {
  return (
    <section
      className={cn(
        "section border-y border-border/40 bg-background-alt py-11 sm:py-12 md:py-14",
        className,
      )}
    >
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <header className="max-w-xl text-left lg:pt-1 flex flex-col items-start justify-center gap-3">
            {subtitle && (
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent sm:text-sm">
                {subtitle}
              </p>
            )}
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.06em] text-primary sm:text-3xl md:text-[5rem]">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
              Brindamos soporte técnico presencial en las principales zonas
              industriales del Perú.
            </p>
          </header>

          <div className="flex min-w-0 flex-col items-center justify-center gap-3 sm:mt-9 sm:gap-4">
          <div
            className={cn(
              "w-full min-w-0 rounded-2xl border border-primary/12 bg-primary/95 p-3 shadow-[0_24px_58px_-38px_hsl(var(--primary)_/_0.55)] sm:p-4",
            )}
          >
            <div className="grid min-h-[240px] gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-4 md:min-h-[280px]">
              <div className="flex flex-col gap-4 rounded-xl border border-white/70 bg-white p-4 shadow-[0_16px_38px_-30px_hsl(var(--primary)_/_0.42)] sm:p-5">
                <div>
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 bg-primary/10">
                      <FlagIcon className="h-[1.125rem] w-[1.125rem] text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground sm:text-base">
                      En la capital
                    </h3>
                  </div>
                  <p className="mb-3 text-xs text-muted-foreground sm:text-sm">
                    Distritos de Lima Metropolitana.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {LIMA_CITIES.map((city) => (
                      <a
                        key={city.name}
                        href={city.href}
                        className="rounded-md border border-border/50 bg-primary/[0.07] px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-[0_10px_24px_-22px_hsl(var(--primary)_/_0.30)] transition hover:border-primary/20 hover:bg-primary/[0.04] sm:px-3 sm:text-xs"
                      >
                        {city.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border/80 pt-4">
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 bg-primary/10">
                      <Building2 className="h-[1.125rem] w-[1.125rem] text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground sm:text-base">
                      Otras ciudades
                    </h3>
                  </div>
                  <p className="mb-3 text-xs text-muted-foreground sm:text-sm">
                    Cobertura nacional.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CITIES.map((city) => (
                      <a
                        key={city.name}
                        href={city.href}
                        className="rounded-md border border-border/50 bg-primary/[0.07] px-2.5 py-1.5 text-[11px] font-medium text-foreground shadow-[0_10px_24px_-22px_hsl(var(--primary)_/_0.30)] transition hover:border-primary/20 hover:bg-primary/[0.04] sm:px-3 sm:text-xs"
                      >
                        {city.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1442211064373!2d-76.97313572536497!3d-12.102277688138837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c94ed03b03db%3A0x2d69082002bce007!2sACOGAS%20%7C%20Soluciones%20Industriales%20para%20GLP%2C%20GN%20y%20Vapor!5e0!3m2!1ses!2spe!4v1773358132766!5m2!1ses!2spe"
                width={600}
                height={280}
                className="h-full min-h-[220px] w-full shrink-0 rounded-xl border border-border/60 md:min-h-0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa ubicación ACOGAS"
              />
            </div>
          </div>
          <div className="flex w-full min-w-0 flex-col items-stretch gap-2 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start">
            <Button
              href="/cobertura-industrial/"
              size="sm"
              className="h-auto min-h-10 w-full whitespace-normal px-4 py-2.5 text-center text-[11px] leading-snug sm:w-auto sm:max-w-[15rem] sm:text-xs"
            >
              Encuéntranos cerca de ti
            </Button>
            <Button
              href="/contacto"
              size="sm"
              className="h-auto min-h-10 w-full whitespace-normal px-4 py-2.5 text-center text-[11px] leading-snug sm:w-auto sm:max-w-[15rem] sm:text-xs"
            >
              Solicitar visita en mi zona
            </Button>
          </div>
        </div>
        </div>

        
      </div>
    </section>
  );
}
