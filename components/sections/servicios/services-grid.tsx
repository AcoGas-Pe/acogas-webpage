import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Ruler,
  PackageSearch,
  ClipboardCheck,
  Headphones,
  Wrench,
  ArrowRight,
} from "lucide-react";

interface ServiceDetail {
  title: string;
  subtitle: string;
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
    title: "Ingeniería y Dimensionamiento",
    subtitle: "Soluciones a medida",
    description:
      "Diseñamos soluciones técnicas personalizadas para cada proyecto. Dimensionamiento de equipos, cálculo de capacidades y especificaciones según sus requerimientos operativos.",
    features: [
      "Ingeniería conceptual y de detalle",
      "Cálculo y dimensionamiento de equipos",
      "Especificaciones técnicas personalizadas",
    ],
    icon: Ruler,
    href: "/servicios/ingenieria-dimensionamiento",
  },
  {
    title: "Selección de Equipos",
    subtitle: "Elige el equipo ideal",
    description:
      "Le ayudamos a elegir el equipo correcto para su aplicación. Asesoría técnica basada en condiciones de operación, normativas y mejores prácticas de la industria.",
    features: [
      "Asesoría técnica especializada",
      "Comparativa de alternativas",
      "Recomendaciones según normativa",
    ],
    icon: PackageSearch,
    href: "/servicios/seleccion-equipos",
  },
  {
    title: "Diagnóstico Técnico",
    subtitle: "Revisión profesional",
    description:
      "Evaluación completa de sus instalaciones para identificar oportunidades de mejora, riesgos operativos y optimización de procesos.",
    features: [
      "Inspección en campo",
      "Análisis de condiciones operativas",
      "Informe técnico con recomendaciones",
    ],
    icon: ClipboardCheck,
    href: "/servicios/diagnostico-tecnico",
  },
  {
    title: "Soporte Técnico",
    subtitle: "Ayuda especializada",
    description:
      "Acompañamiento técnico continuo para resolver dudas, problemas operativos y consultas sobre sus equipos y sistemas.",
    features: [
      "Atención telefónica y remota",
      "Resolución de problemas operativos",
      "Consultas técnicas especializadas",
    ],
    icon: Headphones,
    href: "/servicios/soporte-tecnico",
  },
  {
    title: "Mantenimiento Industrial",
    subtitle: "Cuidado preventivo y correctivo",
    description:
      "Servicios de mantenimiento para garantizar la continuidad operativa de sus equipos. Programas preventivos y atención correctiva con repuestos originales.",
    features: [
      "Mantenimiento preventivo programado",
      "Mantenimiento correctivo",
      "Repuestos originales certificados",
    ],
    icon: Wrench,
    href: "/servicios/mantenimiento-industrial",
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
            Soluciones técnicas integrales respaldadas por más de 50 años de
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
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-xs text-accent font-medium">{service.subtitle}</p>
                  </div>
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
