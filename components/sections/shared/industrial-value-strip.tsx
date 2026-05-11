import { cn } from "@/lib/utils";

interface IndustrialValueStripProps {
  className?: string;
  /** id para aria-labelledby único por página */
  headingId?: string;
}

/**
 * Franja visual alineada con Cobertura industrial: degradado + tarjetas glass.
 */
export function IndustrialValueStrip({
  className,
  headingId = "industrial-propuesta-valor-heading",
}: IndustrialValueStripProps) {
  return (
    <section
      className={cn(
        "section bg-linear-to-r from-gray-900 via-primary to-gray-900 py-16 sm:py-20",
        className,
      )}
      aria-labelledby={headingId}
    >
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Respaldo Acogas
            </p>
            <h2
              id={headingId}
              className="mb-4 text-2xl font-bold !tracking-wider text-white sm:text-3xl"
            >
              Por qué la industria nos elige
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-white/60 sm:text-base">
              Marcas líderes mundiales, ingeniería con criterio y presencia técnica en campo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="glass-panel rounded-lg p-6 text-center backdrop-blur-xs">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-sm border border-primary/35 bg-primary/15">
                <span className="text-2xl font-bold text-white/90">50+</span>
              </div>
              <h3 className="mb-2 font-bold text-white/90">Años de experiencia</h3>
              <p className="text-sm text-white/55">
                Más de cinco décadas en GLP, gas natural, vapor y procesos industriales.
              </p>
            </div>

            <div className="glass-panel rounded-lg p-6 text-center backdrop-blur-xs">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-sm border border-primary/35 bg-primary/15">
                <span className="text-2xl font-bold text-white/90">24/7</span>
              </div>
              <h3 className="mb-2 font-bold text-white/90">Soporte técnico</h3>
              <p className="text-sm text-white/55">
                Atención cuando la planta lo necesita, con ingeniería y campo.
              </p>
            </div>

            <div className="glass-panel rounded-lg p-6 text-center backdrop-blur-xs">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-sm border border-primary/35 bg-primary/15">
                <span className="text-xl font-bold text-white/90">ISO</span>
              </div>
              <h3 className="mb-2 font-bold text-white/90">Marcas líderes</h3>
              <p className="text-sm text-white/55">
                Fisher, Corken, Cavagna, Liquid Controls y socios Emerson con respaldo técnico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
