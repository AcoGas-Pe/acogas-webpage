"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, Building2 } from "lucide-react";

interface CoverageProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

/** City pages: each city has its own page. Hub shows Lima + Ciudades. */
const LIMA_HREF = "/cobertura-industrial/lima/";
const CITIES = [
  { name: "Trujillo", href: "/cobertura-industrial/trujillo/" },
  { name: "Arequipa", href: "/cobertura-industrial/arequipa/" },
  { name: "Chiclayo", href: "/cobertura-industrial/chiclayo/" },
  { name: "Piura", href: "/cobertura-industrial/piura/" },
  { name: "Chimbote", href: "/cobertura-industrial/chimbote/" },
  { name: "Ica", href: "/cobertura-industrial/ica/" },
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
            Brindamos soporte técnico presencial en las principales zonas industriales del Perú. Cada ciudad tiene su propia página.
          </p>
        </div>

        {/* 2 columns: Lima | Ciudades (city page hub) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <a
            href={LIMA_HREF}
            className="card-base card-tint-1 group p-6 sm:p-8 flex flex-col hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Lima</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Sede principal y centro de operaciones. Cobertura en Lima Metropolitana y Callao.
            </p>
            <span className="text-sm font-semibold text-primary mt-4 inline-flex items-center gap-1 group-hover:underline">
              Ver cobertura en Lima
            </span>
          </a>

          <div className="card-base card-tint-2 p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Ciudades</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Otras ciudades con cobertura industrial.
            </p>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <a
                  key={city.name}
                  href={city.href}
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 hover:border-primary/30 transition-colors"
                >
                  {city.name}
                </a>
              ))}
            </div>
            <Button href="/cobertura-industrial/" variant="outline" size="sm" className="mt-4 w-full sm:w-auto">
              Ver todas las ubicaciones
            </Button>
          </div>
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
