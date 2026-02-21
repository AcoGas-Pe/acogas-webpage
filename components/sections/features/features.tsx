"use client";

import { cn } from "@/lib/utils";
import {
  Award,
  BadgeCheck,
  Headphones,
  Factory,
  Compass,
  FileCheck,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    title: "+53 Años de Experiencia",
    description:
      "Más de cinco décadas desarrollando soluciones técnicas seguras y eficientes para la industria peruana.",
    icon: Award,
    highlight: "Desde 1971",
  },
  {
    title: "Marcas Líderes Mundiales",
    description:
      "Representantes autorizados de Emerson, Corken, Cavagna y Liquid Controls con respaldo técnico directo.",
    icon: BadgeCheck,
    highlight: "4 marcas",
  },
  {
    title: "Soporte Técnico Real",
    description:
      "Acompañamiento pre y post venta con ingenieros especializados. Soporte 24/7 para operaciones críticas.",
    icon: Headphones,
    highlight: "24/7",
  },
  {
    title: "Enfoque por Industria",
    description:
      "Soluciones específicas para cada sector: no vendemos productos, resolvemos problemas de proceso.",
    icon: Factory,
    highlight: "6 sectores",
  },
  {
    title: "Diagnóstico y Dimensionamiento",
    description:
      "Capacidad técnica para evaluar, dimensionar y acompañar desde el diseño hasta la puesta en marcha.",
    icon: Compass,
    highlight: "Ingeniería",
  },
  {
    title: "Cumplimiento Normativo",
    description:
      "Productos y soluciones que cumplen con OSINERGMIN, MINAM y normativas internacionales aplicables.",
    icon: FileCheck,
    highlight: "Certificado",
  },
];

export function Features({
  title = "Nuestra Propuesta de Valor",
  subtitle = "Por Qué Elegirnos",
  features = defaultFeatures,
  className,
}: FeaturesProps) {
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
            Desarrollamos soluciones industriales seguras, eficientes y normativamente confiables, integrando tecnología de clase mundial con acompañamiento técnico real en campo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card-base card-accent group p-5 sm:p-6 flex items-start gap-4 hover:-translate-y-0.5"
              >
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      {feature.title}
                    </h3>
                    {feature.highlight && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                        {feature.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
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
