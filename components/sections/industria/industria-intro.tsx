import type { ProductIndustry } from "@/lib/business-config";
import { cn } from "@/lib/utils";

interface IndustriaIntroProps {
  industry: ProductIndustry;
  className?: string;
}

export function IndustriaIntro({ industry, className }: IndustriaIntroProps) {
  return (
    <section
      className={cn(
        "section border-b border-border/60 bg-background py-12 sm:py-14 md:py-16",
        className,
      )}
    >
      <div className="container">
        <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8 md:p-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-accent sm:text-start">
            Sector · {industry.name}
          </p>
          {industry.description ? (
            <p className="mt-4 text-center text-base font-medium text-foreground sm:text-start sm:text-lg">
              {industry.description}
            </p>
          ) : null}
          <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground sm:text-start sm:text-base">
            En <strong className="text-foreground">{industry.name}</strong> aplicamos criterio
            de ingeniería, equipos de marcas líderes y cumplimiento normativo para instalaciones
            de GLP, gas natural, vapor y fluidos de proceso. Partimos del diagnóstico en campo,
            dimensionamos correctamente y acompañamos la puesta en marcha y el soporte posterior.
          </p>
        </div>
      </div>
    </section>
  );
}
