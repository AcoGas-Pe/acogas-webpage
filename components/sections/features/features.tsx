"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Award,
  BadgeCheck,
  Headphones,
  Factory,
  FileCheck,
  RulerDimensionLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    title: "+50 Años de Experiencia",
    description:
      "Más de cinco décadas desarrollando soluciones técnicas seguras y eficientes para la industria peruana.",
    icon: Award,
    highlight: "Desde 1972",
  },
  {
    title: "Marcas Líderes Mundiales",
    description:
      "Representantes autorizados de Emerson, Corken, Cavagna y Liquid Controls con respaldo técnico directo.",
    icon: BadgeCheck,
    highlight: "Reconocidas en el Mundo",
  },
  {
    title: "Soporte Técnico Real",
    description:
      "Acompañamiento pre y post venta con ingenieros especializados. Soporte 24/7 para operaciones críticas.",
    icon: Headphones,
    highlight: "Atención Personalizada",
  },
  {
    title: "Enfoque por Industria",
    description:
      "Soluciones específicas para cada sector: no vendemos productos, resolvemos problemas de proceso.",
    icon: Factory,
    highlight: "Multisectorial",
  },
  {
    title: "Diagnóstico y Dimensionamiento",
    description:
      "Capacidad técnica para evaluar, dimensionar y acompañar desde el diseño hasta la puesta en marcha.",
    icon: RulerDimensionLine,
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
      <div className="container grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-left mb-10 sm:mb-14 col-span-2">
          {subtitle && (
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
              {subtitle}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
          <p className="my-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Desarrollamos soluciones industriales seguras, eficientes y normativamente confiables, integrando tecnología de clase mundial con acompañamiento técnico real en campo.{" "}
          </p>
          <Button variant="outline" size="sm" className="w-full sm:w-fit min-h-10 border-primary text bg-primary hover:bg-primary hover:text-primary-foreground">Conócenos</Button>
        </div>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const tintClass = ["card-tint-1", "card-tint-2", "card-tint-3", "card-tint-4", "card-tint-5", "card-tint-6"][index % 6];
            return (
              <div
                key={index}
                className={cn(
                  tintClass, 
                  "flex-col justify-start group px-5 py-4 sm:px-6 sm:py-6 flex items-start gap-4 relative", // add relative positioning here
                  "transition-all duration-300 ease-in-out hover:-translate-y-1"
                )}
              >
                {feature.highlight && (
                  <span className="text-[10px] px-1.5 py-0.5 self-end rounded bg-primary/10 text-primary font-semibold">
                    {feature.highlight}
                  </span>
                )}
                <div className="flex items-start gap-2 w-full">
                  {/* Fix: Make icon always visible, not appear only on hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full p-6 z-0 pointer-events-none text-primary">
                    <Icon className="w-full h-full text-primary opacity-10" />
                  </div>
                  <div className="min-w-0 flex-1 z-10"> {/* ensure it sits above the icon */}
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm sm:text-base font-bold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
