"use client";

import { cn } from "@/lib/utils";
import { City } from "@/domain/city";
import { Factory, Building2, Wheat, Pill, Shirt, Package, Ship, Pickaxe } from "lucide-react";
import Image from "next/image";

interface CityIndustriesProps {
  city: City;
  className?: string;
}

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Manufactura": Factory,
  "Alimentos y Bebidas": Package,
  "Textil": Shirt,
  "Farmacéutica": Pill,
  "Portuario": Ship,
  "Almacenamiento": Building2,
  "Logística": Building2,
  "Agroindustria": Wheat,
  "Comercial": Building2,
  "Hotelería": Building2,
  "Salud": Pill,
  "Minería": Pickaxe,
  "Calzado": Factory,
  "Alimentos": Package,
};

const industryImages: Record<string, string> = {
  "Manufactura": "/assets/images/industry-plant-industrial-plant.webp",
  "Alimentos y Bebidas": "/assets/images/beer-brewery-metal-tanks.webp",
  "Textil": "/assets/images/textile.webp",
  "Farmacéutica": "/assets/images/tanks-petrochemistry-silos-406908.webp",
  "Portuario": "/assets/images/gasoline-tanks-port-industry.webp",
  "Almacenamiento": "/assets/images/logistics.webp",
  "Logística": "/assets/images/logistics.webp",
  "Agroindustria": "/assets/images/agricola.webp",
  "Comercial": "/assets/images/revision-en-planta.webp",
  "Hotelería": "/assets/images/pintura-vajilla.webp",
  "Salud": "/assets/images/tanks-petrochemistry-silos-406908.webp",
  "Minería": "/assets/images/open-pit-mining-commodity.webp",
  "Calzado": "/assets/images/textile-products.webp",
  "Alimentos": "/assets/images/beer-brewery-metal-tanks.webp",
};

export function CityIndustries({ city, className }: CityIndustriesProps) {
  return (
    <section className={cn("section bg-background-alt py-16 sm:py-20 md:py-24", className)}>
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Sectores que Atendemos
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Industrias en {city.name}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Soluciones técnicas especializadas para los principales sectores industriales de la región.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {city.industries.map((industry, index) => {
            const Icon = industryIcons[industry.name] || Factory;
            const image =
              industryImages[industry.name] || "/assets/images/revision-industria.webp";
            return (
              <div
                key={index}
                className="card-base group flex flex-col overflow-hidden rounded-[1.5rem] bg-card transition-transform hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={industry.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/90 text-primary shadow-sm">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                  <h3 className="text-base font-bold text-foreground">{industry.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
