import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ServicesCTAProps {
  className?: string;
}

export function ServicesCTA({ className }: ServicesCTAProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background-alt", className)}>
      <div className="container">
        <div className="card-base overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-0">
              <Image
                src="/assets/config/placeholder-image.png"
                alt="Equipo técnico Acogas en campo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card lg:bg-gradient-to-l lg:from-card lg:to-transparent" aria-hidden />
            </div>

            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
                ¿No encuentra lo que busca?
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Soluciones a la medida de su operación
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md">
                Cada planta es diferente. Contáctenos para una evaluación
                personalizada y le propondremos la solución técnica más segura y
                eficiente para su caso.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button href="/contacto" size="lg" className="min-h-12 w-full sm:w-auto">
                  Solicitar visita técnica
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
