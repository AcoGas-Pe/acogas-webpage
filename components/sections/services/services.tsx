import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Flame, Gauge, Wind, Atom } from "lucide-react";

interface Solution {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  applications: string[];
}

interface ServicesProps {
  title?: string;
  subtitle?: string;
  solutions?: Solution[];
  className?: string;
}

const defaultSolutions: Solution[] = [
  {
    title: "GLP",
    description:
      "Soluciones integrales en almacenamiento, vaporización, regulación y distribución de Gas Licuado de Petróleo.",
    href: "/soluciones/glp/",
    icon: Gauge,
    applications: ["Regulación", "Vaporización", "Medición", "Almacenamiento"],
  },
  {
    title: "Gas Natural",
    description:
      "Regulación, medición y control para estaciones de gas natural con equipos de clase mundial.",
    href: "/soluciones/gas-natural/",
    icon: Flame,
    applications: ["Estaciones ERM", "Control de presión", "Medición", "Odorización"],
  },
  {
    title: "Vapor",
    description:
      "Control y regulación de vapor para procesos industriales con máxima eficiencia y seguridad.",
    href: "/soluciones/vapor/",
    icon: Wind,
    applications: ["Regulación de presión", "Trampas de vapor", "Válvulas de control", "Accesorios"],
  },
  {
    title: "Procesos Especiales",
    description:
      "Soluciones para multigases y aplicaciones especiales en procesos industriales complejos.",
    href: "/soluciones/procesos-especiales/",
    icon: Atom,
    applications: ["Aire comprimido", "Gases inertes", "Fluidos térmicos", "Aplicaciones especiales"],
  },
];

export function Services({
  title = "Soluciones por Energía",
  subtitle = "Nuestras Soluciones",
  solutions = defaultSolutions,
  className,
}: ServicesProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background", className)}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Image + overlay text */}
          <div className="relative rounded-md overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] sm:min-h-[360px]">
            <Image
              src="/assets/config/placeholder-image.png"
              alt="Instalación industrial de gas - Acogas"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-1">
                {subtitle}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                {title}
              </h2>
              <p className="text-sm text-foreground/70 mt-2 max-w-md">
                Desarrollamos soluciones técnicas integrales con marcas líderes
                para cada tipo de energía y proceso industrial.
              </p>
            </div>
          </div>

          {/* Right: Solution cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <a
                  key={index}
                  href={solution.href}
                  className="card-base group p-5 sm:p-6 flex flex-col gap-3 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {solution.applications.slice(0, 3).map((app, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-primary/5 text-primary/80 border border-primary/10"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
