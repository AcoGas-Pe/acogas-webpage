import type { ComponentType } from "react";

import type { City } from "@/domain/city";
import { getCityBySlug } from "@/lib/cities-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
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

const INDUSTRY_IMAGES: Record<string, string> = {
  Manufactura: "/assets/images/industry-plant-industrial-plant.webp",
  Almacenamiento: "/assets/images/logistics.webp",
  Portuario: "/assets/images/gasoline-tanks-port-industry.webp",
  Logística: "/assets/images/logistics.webp",
  Comercial: "/assets/images/revision-en-planta.webp",
  Hotelería: "/assets/images/pintura-vajilla.webp",
  Salud: "/assets/images/tanks-petrochemistry-silos-406908.webp",
  Alimentos: "/assets/images/beer-brewery-metal-tanks.webp",
  Agroindustria: "/assets/images/agricultural-silos-building-exterior.webp",
  Calzado: "/assets/images/textile-products.webp",
  Minería: "/assets/images/open-pit-mining-commodity.webp",
  Textil: "/assets/images/textile.webp",
};

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

function SectoresHeading() {
  return (
    <div className="rounded-[1.5rem] border border-border/50 bg-card p-5 shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.34)]">
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
  const image = INDUSTRY_IMAGES[name] ?? "/assets/images/revision-industria.webp";
  return (
    <div className="card-base group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/90 text-primary shadow-sm">
          <Icon className="h-6 w-6 shrink-0" strokeWidth={1.55} aria-hidden />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h4 className="text-[11px] font-bold uppercase tracking-wide text-foreground sm:text-xs">
          {name}
        </h4>
        <p className="text-[13px] leading-snug text-foreground/90 sm:text-sm">{description}</p>
      </div>
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
        "mt-14 space-y-8 rounded-[2rem] border border-border/45 bg-background p-5 shadow-[0_24px_58px_-38px_hsl(var(--primary)_/_0.42)] sm:space-y-10 sm:p-8",
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
          "grid gap-5 sm:gap-6",
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
