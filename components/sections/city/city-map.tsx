"use client";

import { cn } from "@/lib/utils";
import { City } from "@/domain/city";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";

interface CityMapProps {
  city: City;
  className?: string;
}

export function CityMap({ city, className }: CityMapProps) {
  return (
    <section className={cn("section bg-background py-16 sm:py-20 md:py-24", className)}>
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Ubicación
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Cobertura en {city.name}
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="card-base flex flex-col justify-between rounded-[1.5rem] bg-card p-6 sm:p-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">
                Servicio Técnico en {city.name}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Cobertura</p>
                    <p className="text-sm text-muted-foreground">{city.region}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Tiempo de Respuesta</p>
                    <p className="text-sm text-muted-foreground">
                      {city.isLimaDistrict ? "Menor a 24 horas" : "48 horas hábiles"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Contacto</p>
                    <p className="text-sm text-muted-foreground">+51 1 349 4500</p>
                  </div>
                </div>
              </div>

              {city.features.map((feature, index) => (
                <div key={index} className="mb-3">
                  <p className="text-sm font-medium text-foreground">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            <Button href={`/contacto?tipo=visita&ciudad=${city.slug}`} className="mt-6 w-full">
              Solicitar Visita en {city.name}
            </Button>
          </div>

          {city.mapEmbedUrl && (
            <div className="min-h-[350px] overflow-hidden rounded-[1.5rem] border border-border/45 bg-white shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.34)]">
              <iframe
                src={city.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de cobertura ACOGAS en ${city.name}`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
