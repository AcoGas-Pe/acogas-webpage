import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Flame,
  Gauge,
  Wind,
  Settings,
  ArrowRight,
  Thermometer,
  Droplets,
} from "lucide-react";

interface ServiceDetail {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface ServicesGridProps {
  className?: string;
}

const services: ServiceDetail[] = [
  {
    title: "Gas Natural",
    description:
      "Regulación, medición y control para estaciones de gas natural con equipos de clase mundial. Diseño, dimensionamiento y puesta en marcha.",
    features: [
      "Estaciones de regulación y medición",
      "Válvulas de control y seguridad",
      "Dimensionamiento y selección de equipos",
    ],
    icon: Flame,
    href: "/productos/gas-natural",
  },
  {
    title: "Gas Licuado de Petróleo (GLP)",
    description:
      "Soluciones integrales en almacenamiento, vaporización, regulación y distribución de GLP para industria y comercio.",
    features: [
      "Vaporizadores y reguladores",
      "Bombas y compresores (Corken)",
      "Sistemas de medición (Liquid Controls)",
    ],
    icon: Gauge,
    href: "/productos/gas-lp",
  },
  {
    title: "Vapor y Fluidos Térmicos",
    description:
      "Control y regulación de vapor, fluidos térmicos y procesos especiales para plantas industriales.",
    features: [
      "Reguladores de presión y temperatura",
      "Válvulas de seguridad y alivio",
      "Trampas de vapor y accesorios",
    ],
    icon: Wind,
    href: "/productos/equipos",
  },
  {
    title: "Ingeniería de Campo",
    description:
      "Acompañamiento técnico desde la ingeniería conceptual hasta la puesta en marcha y capacitación en planta.",
    features: [
      "Visitas técnicas y diagnóstico",
      "Puesta en marcha y commissioning",
      "Capacitación al personal de planta",
    ],
    icon: Settings,
    href: "/contacto",
  },
  {
    title: "Instrumentación y Control",
    description:
      "Instrumentación de procesos industriales con tecnología Emerson para monitoreo, control y automatización.",
    features: [
      "Transmisores de presión y temperatura",
      "Controladores de flujo",
      "Sistemas de telemetría",
    ],
    icon: Thermometer,
    href: "/productos/",
  },
  {
    title: "Componentes y Repuestos",
    description:
      "Suministro de componentes originales Cavagna, Corken, Liquid Controls y Fisher para mantenimiento y recambio.",
    features: [
      "Repuestos originales certificados",
      "Kits de mantenimiento preventivo",
      "Asesoría en compatibilidad",
    ],
    icon: Droplets,
    href: "/productos/",
  },
];

export function ServicesGrid({ className }: ServicesGridProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background", className)}>
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Lo que ofrecemos
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Servicios y Soluciones
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Soluciones técnicas integrales respaldadas por más de 53 años de
            experiencia y las mejores marcas de la industria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="card-base group p-5 sm:p-6 flex flex-col gap-4 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>

                <ul className="space-y-1.5">
                  {service.features.map((f, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-foreground/80 flex items-start gap-2"
                    >
                      <span className="text-accent mt-0.5 shrink-0">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href={service.href}
                  variant="link"
                  size="sm"
                  className="w-fit p-0 h-auto text-primary gap-1"
                >
                  Ver más <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
