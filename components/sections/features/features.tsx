"use client";

import { cn } from "@/lib/utils";
import {
  History,
  BadgeCheck,
  Headphones,
  Workflow,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
    title: "Trayectoria que forma industria",
    description:
      "Más de cincuenta años como referente técnico y espacio de formación para profesionales y empresarios del sector energético e industrial en el Perú.",
    icon: History,
    highlight: "+50 años",
  },
  {
    title: "Tecnología de clase mundial",
    description:
      "Representación y comercialización de marcas globales con desempeño comprobado, alineadas a certificaciones y estándares internacionales del sector.",
    icon: BadgeCheck,
    highlight: "Marcas líderes",
  },
  {
    title: "Soporte técnico real",
    description:
      "Acompañamiento antes, durante y después de cada implementación, con presencia en campo y criterio aplicado a su realidad operativa.",
    icon: Headphones,
    highlight: "En planta",
  },
  {
    title: "Enfoque por proceso",
    description:
      "No comercializamos productos aislados ni soluciones genéricas por catálogo: diseñamos según la necesidad energética, operativa o industrial del cliente.",
    icon: Workflow,
    highlight: "Por solución",
  },
  {
    title: "Capacidad de diagnóstico",
    description:
      "Evaluación de condiciones reales para proponer alternativas seguras, eficientes y sostenibles, con criterio de ingeniería y visión de riesgo.",
    icon: ClipboardList,
    highlight: "Ingeniería aplicada",
  },
  {
    title: "Cumplimiento normativo certificado",
    description:
      "Trabajamos con equipos y soluciones acordes a OSINERGMIN, MINEM y estándares internacionales aplicables, orientados a operaciones auditables y seguras.",
    icon: ShieldCheck,
    highlight: "Normativa",
  },
];

export function Features({
  title = "Nuestros pilares",
  subtitle = "Por qué elegirnos",
  features = defaultFeatures,
  className,
}: FeaturesProps) {
  return (
    <section
      className={cn(
        "section relative py-16 sm:py-20 md:py-24 text-foreground",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center [transform:translateZ(0)]" aria-hidden>
        <Image
          src="/assets/images/general-industry.webp"
          alt=""
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="container relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-left mb-10 sm:mb-14 col-span-2">
          {subtitle && (
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
              {subtitle}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {title}
          </h2>
          <p className="my-3 text-sm sm:text-base text-white opacity-80 max-w-2xl">
            Impulsamos la operación energética e industrial de nuestros clientes
            con soluciones seguras, eficientes y normativamente confiables. No
            somos un proveedor de catálogo: somos el socio industrial que
            convierte la energía en operación segura.
          </p>
          <p className="mb-4 text-xs sm:text-sm text-white opacity-80 max-w-2xl leading-relaxed">
            No ofrecemos catálogos aislados: integramos equipos, ingeniería y
            servicios según su proceso.
          </p>
          <Button
            variant="outline"
            href="/nosotros#propuesta-valor"
            size="sm"
            className="w-full sm:w-fit min-h-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Conócenos
          </Button>
        </div>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={cn(
                "flex-col glass-panel justify-start group px-5 py-4 sm:px-6 sm:py-6 flex items-start gap-4 relative", // add relative positioning here
                "transition-all duration-300 ease-in-out hover:-translate-y-1",
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 bg-primary/20 backdrop-blur-xs backdrop-saturate-100 transform-[translateZ(0)]"
              />
              {feature.highlight && (
                <span className="text-[10px] px-1.5 py-0.5 self-end rounded bg-accent/10 z-10 text-accent font-semibold">
                  {feature.highlight}
                </span>
              )}
              <div className="flex items-start gap-2 w-full">
                {/* Clip decorative icon without overflow:hidden on .glass-panel (breaks backdrop-filter) */}
                <Icon className="w-full h-full p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-50" />

                <div className="min-w-0 flex-1 z-10">
                  {" "}
                  {/* ensure it sits above the icon */}
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white opacity-80 leading-relaxed">
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
