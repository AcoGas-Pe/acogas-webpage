import { cn } from "@/lib/utils";

interface NovedadesProps {
  className?: string;
}

/**
 * Homepage section for blog/CMS content — "Novedades / Mantenerse actualizado".
 * Kept empty for the moment; ready for CMS integration.
 */
export function Novedades({ className }: NovedadesProps) {
  return (
    <section
      className={cn("section py-16 sm:py-20 md:py-24 bg-background", className)}
      aria-label="Novedades"
    >
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Mantenerse actualizado
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Novedades
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Próximamente: noticias, artículos técnicos y novedades del sector.
          </p>
        </div>
        {/* Placeholder for CMS-driven blog grid — keep empty for the moment */}
        <div className="min-h-[200px] flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
          <p className="text-sm text-muted-foreground">Contenido en preparación</p>
        </div>
      </div>
    </section>
  );
}
