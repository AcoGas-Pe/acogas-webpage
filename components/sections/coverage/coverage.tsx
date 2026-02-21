"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Building2 } from "lucide-react";

interface Region {
  name: string;
  description: string;
  cities: string[];
  contactPhone?: string;
  href: string;
}

interface CoverageProps {
  title?: string;
  subtitle?: string;
  regions?: Region[];
  className?: string;
}

const defaultRegions: Region[] = [
  {
    name: "Lima",
    description: "Sede principal y centro de operaciones. Cobertura completa en Lima Metropolitana y Callao.",
    cities: ["Lurín", "Callao", "Santiago de Surco", "Villa El Salvador", "Ate"],
    contactPhone: "+51998345895",
    href: "/cobertura-industrial/lima/",
  },
  {
    name: "Norte",
    description: "Cobertura en la zona norte del país. Soporte técnico para operaciones industriales.",
    cities: ["Trujillo", "Chiclayo", "Piura", "Chimbote"],
    contactPhone: "+51994296627",
    href: "/cobertura-industrial/norte/",
  },
  {
    name: "Sur",
    description: "Presencia en la zona sur. Acompañamiento técnico para minería y agroindustria.",
    cities: ["Arequipa", "Tacna", "Ica", "Cusco"],
    contactPhone: "+51994296627",
    href: "/cobertura-industrial/sur/",
  },
];

export function Coverage({
  title = "Cobertura a Nivel Nacional",
  subtitle = "Presencia Territorial",
  regions = defaultRegions,
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
            Brindamos soporte técnico presencial en las principales zonas industriales del Perú, con capacidad de respuesta para visitas técnicas y diagnóstico en campo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {regions.map((region) => (
            <a
              key={region.name}
              href={region.href}
              className="card-base group p-6 flex flex-col hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {region.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {region.cities.length} ciudades
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {region.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {region.cities.slice(0, 4).map((city) => (
                  <span
                    key={city}
                    className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {city}
                  </span>
                ))}
                {region.cities.length > 4 && (
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    +{region.cities.length - 4} más
                  </span>
                )}
              </div>

              {region.contactPhone && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Phone className="w-4 h-4" />
                  <span>{region.contactPhone}</span>
                </div>
              )}
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/cobertura-industrial/" variant="outline" size="lg">
              <Building2 className="mr-2 w-4 h-4" />
              Ver todas las ubicaciones
            </Button>
            <Button href="/contacto?tipo=visita" size="lg">
              Solicitar visita en mi zona
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
