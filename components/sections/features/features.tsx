"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Feature {
  title: string;
  description: string;
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
    highlight: "+50 AÑOS",
  },
  {
    title: "Tecnología de clase mundial",
    description:
      "Representación y comercialización de marcas globales con desempeño comprobado, alineadas a certificaciones y estándares internacionales del sector.",
    highlight: "MARCAS LÍDERES",
  },
  {
    title: "Soporte técnico real",
    description:
      "Acompañamiento antes, durante y después de cada implementación, con presencia en campo y criterio aplicado a su realidad operativa.",
    highlight: "EN PLANTA",
  },
  {
    title: "Enfoque por proceso",
    description:
      "No comercializamos productos aislados ni soluciones genéricas por catálogo: diseñamos según la necesidad energética, operativa o industrial del cliente.",
    highlight: "POR SOLUCIÓN",
  },
  {
    title: "Capacidad de diagnóstico",
    description:
      "Evaluación de condiciones reales para proponer alternativas seguras, eficientes y sostenibles, con criterio de ingeniería y visión de riesgo.",
    highlight: "INGENIERÍA APLICADA",
  },
  {
    title: "Cumplimiento normativo certificado",
    description:
      "Trabajamos con equipos y soluciones acordes a OSINERGMIN, MINEM y estándares internacionales aplicables, orientados a operaciones auditables y seguras.",
    highlight: "NORMATIVA",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-white/[0.08]",
        "bg-[rgba(40,40,40,0.72)] px-6 pb-7 pt-6 shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.05)] transition duration-300",
        "hover:border-white/14 hover:bg-[rgba(40,40,40,0.8)] sm:px-7 sm:pb-[1.75rem] sm:pt-[1.35rem]",
      )}
    >
      {feature.highlight && (
        <span className="mb-5 inline-flex w-fit rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[hsl(var(--accent))] sm:text-[11px] sm:tracking-[0.12em]">
          {feature.highlight}
        </span>
      )}
      <h3 className="text-[0.96875rem] font-bold leading-snug text-white sm:text-base">
        {feature.title}
      </h3>
      <p className="mt-2.5 flex-1 text-[0.8125rem] font-normal leading-relaxed text-white/90 sm:text-sm">
        {feature.description}
      </p>
    </div>
  );
}

export function Features({
  title = "Nuestros pilares",
  subtitle = "¿Por qué elegirnos?",
  features = defaultFeatures,
  className,
}: FeaturesProps) {
  const topRow = features.slice(0, 2);
  const bottomRow = features.slice(2);

  return (
    <section
      className={cn(
        "section relative overflow-hidden py-14 text-white sm:py-16 md:py-[4.25rem]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 [transform:translateZ(0)]"
        aria-hidden
      >
        <Image
          src="/assets/images/revision-procesos.webp"
          alt=""
          fill
          className="scale-105 object-cover object-center blur-[2px]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/[0.55]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:items-stretch">
            <header className="flex flex-col text-left lg:min-h-0 lg:pr-4">
              {subtitle && (
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white sm:text-xs">
                  {subtitle}
                </p>
              )}
              <h2 className="text-[1.5rem] font-extrabold uppercase leading-[1.12] tracking-[0.11em] text-white sm:text-3xl md:text-[2rem] lg:text-[2.125rem]">
                {title}
              </h2>
              <p className="mt-4 max-w-md text-[0.8125rem] font-normal leading-relaxed text-white sm:text-sm">
              Impulsamos la operación energética e industrial de nuestros clientes
con soluciones seguras, eficientes y normativamente confiables. No
somos un proveedor de catálogo: somos el socio industrial que
convierte la energía en operación segura.
              </p>
              <p className="mt-4 max-w-md text-[0.8125rem] font-normal leading-relaxed text-white sm:text-sm">
              No ofrecemos catálogos aislados: integramos equipos, ingeniería y
              servicios según su proceso
              </p>

              <Button
                variant="outline"
                href="/nosotros#propuesta-valor"
                size="sm"
                className="mt-6 min-h-10 w-fit !border-white bg-transparent px-6 text-[11px] font-bold uppercase tracking-[0.18em] !text-white hover:!border-white hover:bg-white/12 hover:!text-white"
              >
                Conócenos
              </Button>
            </header>
            {topRow.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {bottomRow.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
