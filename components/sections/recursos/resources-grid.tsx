import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BookOpen,
  Download,
  Shield,
  Wrench,
  HelpCircle,
} from "lucide-react";

interface Resource {
  title: string;
  description: string;
  type: "guide" | "datasheet" | "manual" | "regulation";
  icon: React.ComponentType<{ className?: string }>;
}

interface ResourcesGridProps {
  className?: string;
}

const resources: Resource[] = [
  {
    title: "Guía de Selección de Reguladores",
    description:
      "Criterios técnicos para seleccionar reguladores de presión en aplicaciones de GLP y Gas Natural.",
    type: "guide",
    icon: BookOpen,
  },
  {
    title: "Catálogo Fisher - Válvulas de Control",
    description:
      "Especificaciones técnicas de válvulas de control Fisher para procesos industriales.",
    type: "datasheet",
    icon: FileText,
  },
  {
    title: "Manual de Seguridad en Instalaciones de GLP",
    description:
      "Guía de buenas prácticas y normas de seguridad para instalaciones de almacenamiento y distribución de GLP.",
    type: "manual",
    icon: Shield,
  },
  {
    title: "Normas Técnicas Peruanas - Gas Natural",
    description:
      "Resumen de normativas NTP aplicables a instalaciones de gas natural en Perú.",
    type: "regulation",
    icon: FileText,
  },
  {
    title: "Guía de Mantenimiento Preventivo",
    description:
      "Procedimientos recomendados de mantenimiento para equipos de regulación, medición y control.",
    type: "manual",
    icon: Wrench,
  },
  {
    title: "Preguntas Frecuentes Técnicas",
    description:
      "Respuestas a las consultas más comunes sobre selección de equipos, compatibilidad y aplicación.",
    type: "guide",
    icon: HelpCircle,
  },
];

const typeLabels: Record<Resource["type"], string> = {
  guide: "Guía",
  datasheet: "Ficha Técnica",
  manual: "Manual",
  regulation: "Normativa",
};

export function ResourcesGrid({ className }: ResourcesGridProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background", className)}>
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Centro de Recursos
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Documentación y Guías Técnicas
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Acceda a catálogos, manuales, normativas y guías de selección para
            tomar decisiones técnicas informadas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={index}
                className="card-base group p-5 sm:p-6 flex flex-col gap-4 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-sm border border-accent/20 shrink-0">
                    {typeLabels[resource.type]}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5">
                    {resource.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {resource.description}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full min-h-9 gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary"
                >
                  <Download className="w-3.5 h-3.5" />
                  Descargar
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
