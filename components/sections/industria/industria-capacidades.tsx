import type { ProductIndustry } from "@/lib/business-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ClipboardCheck,
  Gauge,
  Layers,
  PackageSearch,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

interface IndustriaCapacidadesProps {
  industry: ProductIndustry;
  className?: string;
}

interface CapacityBlock {
  title: string;
  body: string;
  Icon: LucideIcon;
}

const blocks = (sector: string): CapacityBlock[] => [
  {
    title: "Equipos y sistemas",
    body: `Selección y suministro de regulación, seguridad, medición y bombas según la aplicación en ${sector}, con trazabilidad normativa y marcas de referencia.`,
    Icon: PackageSearch,
  },
  {
    title: "Medición y control",
    body: `Instrumentación, regulación y control de presión, caudal y temperatura adaptados al fluido de proceso y a la criticidad operativa.`,
    Icon: Gauge,
  },
  {
    title: "Ingeniería y campo",
    body: `Servicios de ingeniería, diagnóstico técnico y mantenimiento industrial orientados a continuidad operativa y seguridad en planta.`,
    Icon: Wrench,
  },
  {
    title: "Seguridad y cumplimiento",
    body: `Diseño y operación con criterios NTP, OSINERGMIN y estándares internacionales aplicables (NFPA, ASME, API) según corresponda.`,
    Icon: ShieldCheck,
  },
  {
    title: "Integración multifluido",
    body: `Soluciones que combinan GLP, gas natural, vapor y procesos especiales en una misma instalación, con criterio de planta.`,
    Icon: Layers,
  },
  {
    title: "Propuestas a medida",
    body: `Cotización y propuestas técnicas alineadas a su operación, fluido de proceso y normativa vigente.`,
    Icon: ClipboardCheck,
  },
];

export function IndustriaCapacidades({ industry, className }: IndustriaCapacidadesProps) {
  const items = blocks(industry.name);

  return (
    <section
      className={cn(
        "section border-y border-border/60 bg-background py-14 sm:py-16 md:py-20",
        className,
      )}
      aria-labelledby={`capacidades-${industry.slug}`}
    >
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent sm:text-sm">
            Cómo trabajamos
          </p>
          <h2
            id={`capacidades-${industry.slug}`}
            className="mt-2 text-2xl font-bold uppercase tracking-[0.08em] text-foreground sm:text-3xl md:text-[2rem]"
          >
            Capacidades en {industry.name}
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map(({ title, body, Icon }) => (
            <div
              key={title}
              className={cn(
                "flex flex-col rounded-xl border border-border bg-card p-6 text-left shadow-sm",
                "transition hover:border-primary/25 hover:shadow-md",
              )}
            >
              <div className="mb-4 flex justify-center sm:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden />
                </div>
              </div>
              <h3 className="text-center text-sm font-bold uppercase tracking-wide text-primary sm:text-left sm:text-base">
                {title}
              </h3>
              <p className="mt-3 text-justify text-sm leading-relaxed text-muted-foreground sm:text-start">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:justify-center">
          <Button href="/cotizar/" size="lg">
            Solicitar cotización
          </Button>
          <Button href="/servicios/" variant="secondary" size="lg">
            Ver servicios
          </Button>
          <Button href="/industrias/" variant="outline" size="lg">
            Todas las industrias
          </Button>
        </div>
      </div>
    </section>
  );
}
