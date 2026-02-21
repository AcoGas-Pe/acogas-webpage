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
} from "lucide-react";

interface Industry {
  name: string;
  slug: string;
  url: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface IndustriesProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "alimentos-bebidas": Utensils,
  "pesquera": Fish,
  "agroindustria": Wheat,
  "mineria": Mountain,
  "papel-carton": FileText,
  "industria-general": Factory,
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
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background-alt", className)}>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <a
                key={industry.slug}
                href={industry.url}
                className="card-base group p-5 sm:p-6 flex flex-col items-center text-center gap-3 hover:-translate-y-1"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                  {industry.name}
                </h3>
              </a>
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
