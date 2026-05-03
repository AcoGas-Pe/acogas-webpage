import type { ComponentType } from "react";

import type { City } from "@/domain/city";
import { getCityBySlug } from "@/lib/cities-data";
import { cn } from "@/lib/utils";
import {
  Apple,
  Building2,
  Factory,
  Footprints,
  Hotel,
  MapPin,
  Pickaxe,
  Ship,
  Shirt,
  Stethoscope,
  Warehouse,
  Wheat,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SECTORES_GREY =
  "Soluciones técnicas especializadas para los principales sectores industriales de la región.";

/** Orden de columnas dentro del hub (coincide con maquetación). */
const INDUSTRY_ORDER: Record<string, string[]> = {
  callao: ["Manufactura", "Almacenamiento", "Portuario"],
  "santiago-de-surco": ["Comercial", "Hotelería", "Salud"],
  trujillo: ["Manufactura", "Alimentos", "Agroindustria", "Calzado"],
  arequipa: ["Manufactura", "Minería", "Agroindustria", "Textil"],
};

const INDUSTRY_ICONS: Record<
  string,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  Manufactura: Factory,
  Almacenamiento: Warehouse,
  Portuario: Ship,
  Logística: Warehouse,
  Comercial: Building2,
  Hotelería: Hotel,
  Salud: Stethoscope,
  Alimentos: Apple,
  Agroindustria: Wheat,
  Calzado: Footprints,
  Minería: Pickaxe,
  Textil: Shirt,
};

function RegionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <MapPin className="h-6 w-6 shrink-0 text-accent sm:h-7 sm:w-7" aria-hidden />
      <h2 className="text-lg font-bold uppercase tracking-[0.1em] text-primary sm:text-xl md:text-2xl">
        {title}
      </h2>
    </div>
  );
}

function SectoresHeading() {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-bold text-accent">Sectores que atendemos</h3>
      <p className="max-w-2xl text-sm text-muted-foreground">{SECTORES_GREY}</p>
    </div>
  );
}

function orderedIndustries(city: City, slug: string) {
  const order = INDUSTRY_ORDER[slug];
  if (!order?.length) return city.industries;
  const byName = Object.fromEntries(city.industries.map((i) => [i.name, i]));
  return order.map((name) => byName[name]).filter(Boolean) as typeof city.industries;
}

function SectorCell({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const Icon = INDUSTRY_ICONS[name] ?? Factory;
  return (
    <div className="flex flex-col gap-2.5">
      <Icon className="h-9 w-9 shrink-0 text-foreground" strokeWidth={1.35} aria-hidden />
      <h4 className="text-[11px] font-bold uppercase tracking-wide text-foreground sm:text-xs">
        {name}
      </h4>
      <p className="text-[13px] leading-snug text-foreground/90 sm:text-sm">{description}</p>
    </div>
  );
}

function CityIndustrialArticle({
  slug,
  gridCols,
}: {
  slug: string;
  gridCols: "3" | "4";
}) {
  const city = getCityBySlug(slug);
  if (!city) return null;

  const rows = orderedIndustries(city, slug);
  const intro = city.hero?.description ?? "";
  const isArequipa = slug === "arequipa";

  return (
    <article
      className={cn(
        "space-y-8 border-t border-border mt-14 sm:space-y-10 sm:pt-16",
      )}
    >
      <RegionHeader title={city.name} />

      {isArequipa ? (
        <p className="text-sm font-bold text-foreground sm:text-base">{SECTORES_GREY}</p>
      ) : (
        intro && (
          <p className="text-sm font-normal text-foreground sm:text-base">{intro}</p>
        )
      )}

      <SectoresHeading />

      <div
        className={cn(
          "grid gap-8 border-t border-border/80 pt-8 sm:gap-10 sm:pt-10",
          gridCols === "4"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 md:grid-cols-3",
        )}
      >
        {rows.map((row) => (
          <SectorCell key={row.name} name={row.name} description={row.description} />
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <Button
          href={`/cobertura-industrial/${slug}/`}
          size="lg"
          className="min-h-12 w-full justify-center uppercase tracking-wide sm:w-auto sm:min-w-[15rem]"
        >
          Ver cobertura · {city.name}
        </Button>
        <Button
          href={`/contacto?tipo=visita&ciudad=${slug}`}
          variant="outline"
          size="lg"
          className="min-h-12 w-full justify-center uppercase tracking-wide sm:w-auto sm:min-w-[15rem]"
        >
          Solicitar visita · {city.name}
        </Button>
      </div>
    </article>
  );
}

const EXTRA_CITY_BLOCKS: readonly { slug: string; gridCols: "3" | "4" }[] = [
  { slug: "callao", gridCols: "3" },
  { slug: "santiago-de-surco", gridCols: "3" },
  { slug: "trujillo", gridCols: "4" },
  { slug: "arequipa", gridCols: "4" },
];

export interface CoberturaIndustrialCityBlocksProps {
  className?: string;
}

/** Callao, Santiago de Surco, Trujillo y Arequipa (hub cobertura). */
export function CoberturaIndustrialCityBlocks({
  className,
}: CoberturaIndustrialCityBlocksProps) {
  return (
    <div className={cn("gap-4", className)}>
      {EXTRA_CITY_BLOCKS.map((b) => (
        <CityIndustrialArticle key={b.slug} slug={b.slug} gridCols={b.gridCols} />
      ))}
    </div>
  );
}
