"use client";

import { cn } from "@/lib/utils";
import { City } from "@/domain/city";
import { Factory, Building2, Wheat, Pill, Shirt, Package, Ship, Pickaxe } from "lucide-react";

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

export function CityIndustries({ city, className }: CityIndustriesProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background", className)}>
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
            return (
              <div
                key={index}
                className="card-base group p-5 sm:p-6 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground">{industry.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
