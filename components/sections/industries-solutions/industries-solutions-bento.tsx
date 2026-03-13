"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PRODUCT_INDUSTRIES } from "@/lib/business-config";
import {
  Utensils,
  Fish,
  Wheat,
  Mountain,
  FileText,
  Factory,
  Flame,
  Gauge,
  Wind,
  Atom,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

type IndustryGridAttr = "small" | "large" | "tall";

const industryCardConfig: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; grid: IndustryGridAttr }
> = {
  "alimentos-bebidas": { icon: Utensils, grid: "large" },
  "pesquera": { icon: Fish, grid: "small" },
  "agroindustria": { icon: Wheat, grid: "tall" },
  "mineria": { icon: Mountain, grid: "small" },
  "papel-carton": { icon: FileText, grid: "large" },
  "industria-general": { icon: Factory, grid: "large" },
};

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> =
  Object.fromEntries(
    Object.entries(industryCardConfig).map(([slug, config]) => [slug, config.icon])
  ) as Record<string, React.ComponentType<{ className?: string }>>;

const industryGridAttrs: Record<string, IndustryGridAttr> = Object.fromEntries(
  Object.entries(industryCardConfig).map(([slug, config]) => [slug, config.grid])
) as Record<string, IndustryGridAttr>;

const solutions = [
  { title: "GLP", icon: Gauge, grid: "large" },
  { title: "Gas Natural", icon: Flame, grid: "large" },
  { title: "Vapor", icon: Wind, grid: "large" },
  { title: "Procesos Especiales", icon: Atom, grid: "large" },
];

export function IndustriesSolutionsBento() {
  return (
    <section className="section py-16 sm:py-20 md:py-24 bg-background-alt" aria-label="Industrias y Soluciones">
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Conoce nuestro alcance
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Industrias y Soluciones
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Atendemos diversos sectores con soluciones técnicas por tipo de energía y proceso.
          </p>
        </div>

        {/* Bento grid: Industries (left) | Solutions (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-2">

          {/* Right: Solutions — con enlace a Soluciones */}
          <div className="flex flex-col">
            <div className="gap-2 grid-cols-4 grid-rows-3 sm:grid-rows-4 grid h-full">
              <Link href="/soluciones/" className="hover:scale-99 transition-all duration-300 hover:cursor-pointer hover:bg-primary-light/20 group h-full flex flex-col justify-between row-span-1 sm:row-span-4 p-6 col-span-4 sm:col-span-2 rounded-md bg-primary/10 border border-primary/20 text-foreground">
                
                <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Al alcance de tu industria</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Ofrecemos soluciones integrales diseñadas para cubrir una amplia gama de necesidades energéticas y aplicaciones industriales, asegurando eficiencia, seguridad y confiabilidad en cada proceso.
                </p>
                </div>

                <span className="flex flex-row items-center gap-1 hover:bg-transparent text-sm group-hover:text-primary w-full sm:w-auto">
                Explora soluciones
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>

              </Link>
              {solutions.map((sol) => {
                const Icon = sol.icon;
                const gridAttr = sol.grid || "small";
                return (
                  <div
                    key={sol.title}
                    className={cn(
                      "hover:scale-95 transition-all duration-300 hover:bg-primary-light/20 group relative flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-md border text-foreground overflow-hidden",
                      "bg-primary/10 border-primary/20 text-foreground",
                      gridAttr === "small" && "col-span-1",
                      gridAttr === "large" && "col-span-2",
                      gridAttr === "tall" && "row-span-2",
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {sol.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left: Industries — solo mencionar sectores */}
          <div className="flex flex-col">
            <div className="gap-2 grid-cols-2 sm:grid-cols-4 grid-rows-3 grid h-full">

              <div className="h-full hover:scale-95 transition-transform duration-300 order-2 p-6 col-span-2 rounded-md bg-primary/10 border border-primary/20 text-foreground">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Industrias</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Sectores en los que desarrollamos soluciones específicas.
                  </p>
                </div>


              </div>

              {PRODUCT_INDUSTRIES.map((ind) => {
                const Icon = industryIcons[ind.slug] || Factory;
                const gridAttr = industryGridAttrs[ind.slug] || "small";
                const bgImage = ind.image || "";
                return (
                  <div
                    key={ind.slug}
                    className={cn(
                      "relative group hover:scale-95 transition-transform duration-300 flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-md border text-foreground overflow-hidden",
                      bgImage
                        ? "border-white/20 text-white h-[100px] sm:h-full"
                        : "bg-primary/10 border-primary/20 text-foreground",
                      gridAttr === "small" && "col-span-1",
                      gridAttr === "large" && "col-span-1 sm:col-span-2",
                      gridAttr === "tall" && "row-span-1 col-span-1 sm:row-span-2",
                    )}
                    
                  >
                    <div className="flex items-center gap-2 z-1">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{ind.name}</span>
                    </div>
                    {bgImage && (
                      <div className="absolute inset-0 z-0 transition-all duration-300 pointer-events-none group-hover:scale-110">
                        <Image
                          src={bgImage}
                          alt={ind.name}
                          fill
                          className="object-cover w-full h-full rounded-md"
                          style={{ transition: 'transform 0.3s' }}
                        />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />
                      </div>
                    )}
                    </div>
                );
              })}
            </div>
          </div>



        </div>
      </div>
    </section>
  );
}
