"use client";

import { cn } from "@/lib/utils";
import { ShieldCheck, Zap, Users, Award, Wrench, FileCheck } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    title: "Seguridad Garantizada",
    description: "Cumplimos con los más altos estándares de seguridad en el manejo y distribución de gas.",
    icon: ShieldCheck,
  },
  {
    title: "Servicio Confiable",
    description: "Suministro continuo y confiable para hogares y empresas las 24 horas del día.",
    icon: Zap,
  },
  {
    title: "Atención Personalizada",
    description: "Equipo profesional dedicado a brindar el mejor servicio y atención al cliente.",
    icon: Users,
  },
  {
    title: "Experiencia Técnica",
    description: "Más de 53 años desarrollando soluciones con criterio ingenieril y respaldo de marca.",
    icon: Award,
  },
  {
    title: "Soluciones Integrales",
    description: "Desde selección de equipo hasta correcta aplicación en campo, con acompañamiento real.",
    icon: Wrench,
  },
  {
    title: "Cumplimiento Normativo",
    description: "Normas nacionales e internacionales para proteger personas, instalaciones y procesos.",
    icon: FileCheck,
  },
];

export function Features({
  title = "Por Qué Elegirnos",
  subtitle = "Nuestras Ventajas",
  features = defaultFeatures,
  className,
}: FeaturesProps) {
  return (
    <section className={cn("section min-h-[90dvh] mx-auto bg-background", className)}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {subtitle && (
              <p className="text-muted-foreground/80 text-sm mb-2">{subtitle}</p>
            )}
            <h2 className="text-4xl font-bold text-foreground">{title}</h2>
          </div>

          {/* Bento grid: 3 cols, mixed sizes - one large (2x2), rest standard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isLarge = index === 0;
              return (
                <div
                  key={index}
                  className={cn(
                    "cursor-default flex flex-col bg-card-foreground relative items-center justify-center p-6 rounded-md group hover:bg-primary-light/20 transition-all duration-500 overflow-hidden",
                    isLarge && "md:col-span-2 md:row-span-2 min-h-[280px]"
                  )}
                >
                  {Icon && (
                    <span className="absolute text-primary text-4xl opacity-10 group-hover:opacity-100 transition-all duration-500">
                      <Icon size={isLarge ? 180 : 120} strokeWidth={2.2} />
                    </span>
                  )}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-background/80 font-semibold text-sm max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
