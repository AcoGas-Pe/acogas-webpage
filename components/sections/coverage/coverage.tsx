"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, FlagIcon } from "lucide-react";

interface CoverageProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

/** City pages: each city has its own page. Hub shows Lima + Ciudades. */
const CITIES = [
  { name: "Trujillo", href: "/cobertura-industrial/trujillo/" },
  { name: "Arequipa", href: "/cobertura-industrial/arequipa/" },
] as const;

const LIMA_CITIES = [
  { name: "Lima", href: "/cobertura-industrial/lima/" },
  { name: "Callao", href: "/cobertura-industrial/callao/" },
  { name: "Lurín", href: "/cobertura-industrial/lurin/" },
  { name: "Santiago de Surco", href: "/cobertura-industrial/santiago-de-surco/" },
] as const;

export function Coverage({
  title = "Cobertura Industrial",
  subtitle = "Presencia Territorial",
  className,
}: CoverageProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background", className)}>
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          {subtitle && (
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
              {subtitle}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Brindamos soporte técnico presencial en las principales zonas industriales del Perú.
          </p>
        </div>

        {/* 2 columns: Lima | Ciudades (city page hub) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <div>
          <div className="card-base card-tint-2 p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <FlagIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">En la Capital</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Distritos de Lima Metropolitana.
              </p>
              <div className="flex flex-wrap gap-2">
                {LIMA_CITIES.map((city) => (
                  <a
                    key={city.name}
                    href={city.href}
                    className="text-xs sm:text-sm px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 hover:border-primary/30 transition-colors">
                    {city.name}
                  </a>
                ))}
              </div>
              <div className="w-full flex border-b border-primary-light/50 py-2"></div>
              <div className="flex items-center gap-3 mb-4 mt-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Otras Ciudades</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Cobertura nacional
              </p>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <a
                    key={city.name}
                    href={city.href}
                    className="text-xs sm:text-sm px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 hover:border-primary/30 transition-colors">
                    {city.name}
                  </a>
                ))}
              </div>
              <Button href="/cobertura-industrial/" variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
                Descubre todas las sucursales
              </Button>
            </div>

          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1442211064373!2d-76.97313572536497!3d-12.102277688138837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c94ed03b03db%3A0x2d69082002bce007!2sACOGAS%20%7C%20Soluciones%20Industriales%20para%20GLP%2C%20GN%20y%20Vapor!5e0!3m2!1ses!2spe!4v1773358132766!5m2!1ses!2spe"
            width={600}
            height={350}
            style={{ border: 0, width: "100%", height: "100%" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa ubicación ACOGAS"
          ></iframe>
        </div>

        <div className="text-center mt-10">
          <Button href="/contacto?tipo=visita" size="lg">
            Solicitar visita en mi zona
          </Button>
        </div>
      </div>
    </section>
  );
}
