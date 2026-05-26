import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getPhoneDisplay, GOOGLE_MAPS } from "@/lib/business-config";
import { getAllCities } from "@/lib/cities-data";
import Image from "next/image";
import {
  Clock,
  Factory,
  MapPin,
  Package,
  Phone,
  Pill,
  Shirt,
  Warehouse,
} from "lucide-react";
import { CoberturaCitySelector } from "./cobertura-city-selector";
import { CoberturaIndustrialCityBlocks } from "./cobertura-industrial-city-blocks";

const CITY_NAV_ITEMS = getAllCities().map((c) => ({
  slug: c.slug,
  name: c.name,
  region: c.region,
}));

const SECTORS_INTRO_GREY =
  "Soluciones técnicas especializadas para los principales sectores industriales de la región.";

/** Extrae URL del iframe de embed configurado */
function googleMapsEmbedSrc(): string {
  const m = GOOGLE_MAPS.embedCode.match(/src="([^"]+)"/);
  return (
    m?.[1] ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1442211064373!2d-76.97313572536497!3d-12.102277688138837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c94ed03b03db%3A0x2d69082002bce007!2sACOGAS%20%7C%20Soluciones%20Industriales%20para%20GLP%2C%20GN%20y%20Vapor!5e0!3m2!1ses!2spe!4v1773358132766!5m2!1ses!2spe"
  );
}

interface SectorTileProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  description: string;
  image: string;
}

function SectorTile({ icon: Icon, label, description, image }: SectorTileProps) {
  return (
    <div className="card-base group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/90 text-primary shadow-sm">
          <Icon
            className="h-6 w-6 shrink-0"
            strokeWidth={1.55}
            aria-hidden
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h4 className="text-[11px] font-bold uppercase tracking-wide text-foreground sm:text-xs">
          {label}
        </h4>
        <p className="text-[13px] leading-snug text-foreground/90 sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

function RegionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/15">
        <MapPin className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" aria-hidden />
      </span>
      <h2 className="text-lg font-bold uppercase tracking-[0.1em] text-primary sm:text-xl md:text-2xl">
        {title}
      </h2>
    </div>
  );
}

function SectoresBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border border-border/50 bg-card p-5 shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.34)]",
        className,
      )}
    >
      <h3 className="text-base font-bold text-accent">Sectores que atendemos</h3>
      <p className="max-w-2xl text-sm text-muted-foreground">{SECTORS_INTRO_GREY}</p>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/[0.06]">
        <Icon className="h-[1.15rem] w-[1.15rem] text-primary" strokeWidth={1.65} aria-hidden />
      </div>
      <div className="min-w-0 pt-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

function InfoHighlight({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-bold text-foreground">{title}</h4>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

const limaSectorTiles: SectorTileProps[] = [
  {
    icon: Factory,
    label: "Manufactura",
    description:
      "Plantas industriales en Ate, Santa Anita y Lurigancho.",
    image: "/assets/images/industry-plant-industrial-plant.webp",
  },
  {
    icon: Package,
    label: "Alimentos y bebidas",
    description:
      "Industria alimentaria en Lima Norte y Lima Sur.",
    image: "/assets/images/beer-brewery-metal-tanks.webp",
  },
  {
    icon: Shirt,
    label: "Textil",
    description: "Sector textil en Gamarra y zonas industriales.",
    image: "/assets/images/textile.webp",
  },
  {
    icon: Pill,
    label: "Farmacéutica",
    description:
      "Laboratorios y plantas farmacéuticas.",
    image: "/assets/images/tanks-petrochemistry-silos-406908.webp",
  },
];

const lurinSectorTiles: SectorTileProps[] = [
  {
    icon: Factory,
    label: "Manufactura",
    description:
      "Plantas industriales del corredor sur.",
    image: "/assets/images/industry-plant-industrial-plant.webp",
  },
  {
    icon: Warehouse,
    label: "Logística",
    description:
      "Centros de distribución y almacenes.",
    image: "/assets/images/logistics.webp",
  },
];

export interface CoberturaIndustrialRegionsProps {
  className?: string;
}

/** Contenido detallado Lima Metropolitana + Lurín (página hub cobertura). */
export function CoberturaIndustrialRegions({ className }: CoberturaIndustrialRegionsProps) {
  const phoneDisplay = getPhoneDisplay();

  return (
    <section className={cn("section bg-background-alt", className)}>
      <div className="container max-w-6xl py-14 sm:py-16 md:py-16">
        <CoberturaCitySelector
          id="selector-ciudad-cobertura"
          cities={CITY_NAV_ITEMS}
          className="mb-10 scroll-mt-24 sm:mb-12"
        />

        {/* Lima Metropolitana */}
        <article className="space-y-8 sm:space-y-10">
          <RegionHeader title="Lima Metropolitana" />

          <div className="space-y-3">
            <p className="text-sm font-bold text-foreground sm:text-base">
              Más de 50 años brindando soluciones técnicas seguras y eficientes
              para la industria en Lima.
            </p>
            <p className="text-sm font-normal text-foreground/95 sm:text-base">
              Soporte técnico presencial, productos de clase mundial y
              acompañamiento real en campo.
            </p>
          </div>

          <SectoresBlock />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {limaSectorTiles.map((t) => (
              <SectorTile key={t.label} {...t} />
            ))}
          </div>

          <div className="rounded-[2rem] border border-border/45 bg-background p-4 shadow-[0_24px_58px_-38px_hsl(var(--primary)_/_0.42)] sm:p-5 md:p-6">
            <div className="mb-6 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                Ubicación
              </p>
              <h3 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
                Cobertura en Lima
              </h3>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
              <div className="rounded-[1.5rem] border border-border/50 bg-card p-5 shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.34)] sm:p-6">
                <h4 className="text-base font-bold text-primary sm:text-lg">
                  Servicio técnico en Lima
                </h4>

                <div className="mt-6 space-y-4 border-b border-border/50 pb-6">
                  <InfoRow
                    icon={MapPin}
                    label="Cobertura"
                    value="Lima Metropolitana"
                  />
                  <InfoRow
                    icon={Clock}
                    label="Tiempo de respuesta"
                    value="48 horas hábiles"
                  />
                  <InfoRow
                    icon={Phone}
                    label="Contacto"
                    value={phoneDisplay}
                  />
                </div>

                <div className="mt-6 space-y-5">
                  <InfoHighlight title="Respuesta inmediata">
                    Atención técnica en Lima Metropolitana con tiempos de
                    respuesta menores a 24 horas.
                  </InfoHighlight>
                  <InfoHighlight title="Inventario local">
                    Stock permanente de equipos y repuestos en nuestra sede en
                    Lima.
                  </InfoHighlight>
                  <InfoHighlight title="Equipo especializado">
                    Ingenieros certificados con experiencia en plantas
                    industriales de Lima.
                  </InfoHighlight>
                </div>

                <div className="mt-8 flex flex-col gap-3 w-full">
                  <Button
                    href="/cobertura-industrial/lima/"
                    variant="outline"
                    size="lg"
                    className="min-h-12 flex-1 justify-center uppercase tracking-wide sm:min-w-[12rem]"
                  >
                    Ver cobertura ciudad Lima
                  </Button>
                  <Button
                    href="/contacto?tipo=visita&ciudad=lima"
                    size="lg"
                    className="min-h-12 flex-1 justify-center uppercase tracking-wide sm:min-w-[12rem]"
                  >
                    Solicitar visita en Lima
                  </Button>
                </div>
              </div>

              <iframe
                title="Mapa cobertura Lima — ACOGAS"
                src={googleMapsEmbedSrc()}
                className="min-h-[280px] w-full rounded-[1.5rem] border border-border/45 bg-white shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.34)] sm:min-h-[320px] lg:min-h-full"
                height={360}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </article>

        {/* Lurín */}
        <article className="mt-16 space-y-8 rounded-[2rem] border border-border/45 bg-background p-5 shadow-[0_24px_58px_-38px_hsl(var(--primary)_/_0.42)] sm:mt-20 sm:space-y-10 sm:p-8">
          <RegionHeader title="Lurín" />

          <p className="text-sm font-bold text-foreground sm:text-base">
            Cobertura especializada para el corredor industrial de Lurín.
            Equipos de clase mundial para la creciente zona industrial del sur
            de Lima.
          </p>

          <SectoresBlock />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:max-w-3xl">
            {lurinSectorTiles.map((t) => (
              <SectorTile key={t.label} {...t} />
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              href="/cobertura-industrial/lurin/"
              size="lg"
              className="min-h-12 w-full uppercase tracking-wide sm:w-auto sm:min-w-[14rem] justify-center"
            >
              Ver cobertura Lurín
            </Button>
            <Button
              href="/contacto?tipo=visita&ciudad=lurin"
              variant="outline"
              size="lg"
              className="min-h-12 w-full uppercase tracking-wide sm:w-auto sm:min-w-[14rem] justify-center"
            >
              Solicitar visita en Lurín
            </Button>
          </div>
        </article>

        <CoberturaIndustrialCityBlocks />

        <div className="mt-14 border-t border-border/45 pt-12 sm:mt-16 sm:pt-14">
          <p className="mb-5 text-center text-sm font-semibold text-foreground">
            ¿Tu planta está en otra ciudad?
          </p>
          <CoberturaCitySelector cities={CITY_NAV_ITEMS} />
        </div>
      </div>
    </section>
  );
}
