"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "alimentos-bebidas": Utensils,
  "pesquera": Fish,
  "agroindustria": Wheat,
  "mineria": Mountain,
  "papel-carton": FileText,
  "industria-general": Factory,
};

const solutions = [
  { title: "GLP", href: "/productos/", icon: Gauge },
  { title: "Gas Natural", href: "/productos/", icon: Flame },
  { title: "Vapor", href: "/productos/", icon: Wind },
  { title: "Procesos Especiales", href: "/productos/", icon: Atom },
];

export function IndustriesSolutionsBento() {
  return (
    <section className="section py-16 sm:py-20 md:py-24 bg-background-alt" aria-label="Industrias y Soluciones">
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Sectores e Industrias
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Industrias y Soluciones
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Atendemos diversos sectores con soluciones técnicas por tipo de energía y proceso.
          </p>
        </div>

        {/* Bento grid: Industries (left) | Solutions (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: Industries — solo mencionar sectores */}
          <div className="card-base card-tint-1 p-6 sm:p-8 flex flex-col">
            <h3 className="text-lg font-bold text-foreground mb-1">Industrias</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Sectores en los que desarrollamos soluciones específicas.
            </p>
            <div className="flex flex-wrap gap-2">
              {PRODUCT_INDUSTRIES.map((ind) => {
                const Icon = industryIcons[ind.slug] || Factory;
                return (
                  <span
                    key={ind.slug}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-foreground"
                  >
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    {ind.name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: Solutions — con enlace a Soluciones */}
          <div className="card-base card-tint-2 p-6 sm:p-8 flex flex-col">
            <h3 className="text-lg font-bold text-foreground mb-1">Soluciones</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Por tipo de energía y aplicación industrial.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {solutions.map((sol) => {
                const Icon = sol.icon;
                return (
                  <Link
                    key={sol.title}
                    href={sol.href}
                    className={cn(
                      "card-base card-tint-3 p-4 flex items-center gap-3 group hover:-translate-y-0.5 transition-transform"
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {sol.title}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>
            <div className="mt-6">
              <Button href="/soluciones/" variant="outline" size="lg" className="w-full sm:w-auto">
                Ver todas las soluciones
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
