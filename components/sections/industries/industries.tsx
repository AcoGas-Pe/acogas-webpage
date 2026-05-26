"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PRODUCT_INDUSTRIES } from "@/lib/business-config";
import Image from "next/image";
import Link from "next/link";
import {
  Utensils,
  Fish,
  Wheat,
  Mountain,
  FileText,
  Factory,
  Zap,
  FlaskConical,
  Shirt,
  Truck,
  Fuel,
} from "lucide-react";

interface Industry {
  name: string;
  slug: string;
  url: string;
  description?: string;
  image?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface IndustriesProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  agroindustria: Wheat,
  energia: Zap,
  mineria: Mountain,
  pesquera: Fish,
  "papel-carton": FileText,
  "quimico-plastico": FlaskConical,
  textil: Shirt,
  "alimentos-bebidas": Utensils,
  transporte: Truck,
  "entorno-glp": Fuel,
};

const industries: Industry[] = PRODUCT_INDUSTRIES.map((industry) => ({
  ...industry,
  icon: industryIcons[industry.slug] || Factory,
}));

export function Industries({
  title = "Industrias que Atendemos",
  subtitle = "Soluciones por Sector",
  className,
}: IndustriesProps) {
  return (
    <section className={cn("section bg-background-alt py-16 text-foreground sm:py-20 md:py-24", className)}>
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
            Desarrollamos soluciones específicas para cada sector, combinando producto, aplicación y normativa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <Link
                key={industry.slug}
                href={industry.url}
                className="card-base group flex min-h-[160px] flex-col overflow-hidden rounded-[1.5rem] bg-card text-left hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] bg-muted">
                  {industry.image ? (
                    <Image
                      src={industry.image}
                      alt={industry.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/90 text-primary shadow-sm">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xs font-bold leading-tight text-foreground sm:text-sm">
                    {industry.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button href="/industrias/" variant="outline" size="lg">
            Ver todas las industrias
          </Button>
        </div>
      </div>
    </section>
  );
}
