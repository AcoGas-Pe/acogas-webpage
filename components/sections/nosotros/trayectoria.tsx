import Image from "next/image";
import { Compass, Target } from "lucide-react";

export function Trayectoria() {
  return (
    <section
      id="trayectoria"
      className="section mx-auto bg-background-light text-center text-foreground"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="card-base flex flex-col overflow-hidden rounded-[1.75rem] bg-card text-left">
              <div className="relative aspect-[16/9] bg-muted">
                <Image
                  src="/assets/images/industry-plant-industrial-plant.webp"
                  alt="Planta industrial — trayectoria ACOGAS"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/90 text-primary shadow-sm">
                  <Compass className="h-6 w-6" aria-hidden />
                </div>
              </div>
              <div className="flex flex-1 flex-col items-start gap-4 p-6 sm:p-8">
                <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Hacia dónde vamos
                </span>
                <h2 className="text-3xl font-bold text-primary">Visión</h2>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Ser el referente indiscutible en el Perú en soluciones
                  industriales de regulación, control y gestión de energía,
                  reconocido por la excelencia técnica, la seriedad comercial y la
                  capacidad de desarrollar mercados complejos junto a fabricantes
                  líderes.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Aspiramos a consolidarnos como el principal aliado estratégico
                  de la industria en GLP, Gas Natural, Vapor y procesos
                  especiales, expandiendo nuestra presencia territorial y nuestro
                  portafolio sin perder el sello que nos distingue.
                </p>
              </div>
            </div>

            <div className="card-base flex flex-col overflow-hidden rounded-[1.75rem] bg-card text-left">
              <div className="relative aspect-[16/9] bg-muted">
                <Image
                  src="/assets/images/regulacion-presion.webp"
                  alt="Regulación de presión industrial — trayectoria ACOGAS"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/90 text-primary shadow-sm">
                  <Target className="h-6 w-6" aria-hidden />
                </div>
              </div>
              <div className="flex flex-1 flex-col items-start gap-4 p-6 sm:p-8">
                <span className="rounded-lg bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Por qué existimos
                </span>
                <h2 className="text-3xl font-bold text-primary">Propósito</h2>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Poner la experiencia al servicio del desarrollo industrial del
                  país, acompañando a las empresas en decisiones técnicas
                  críticas, reduciendo riesgos operativos y elevando estándares de
                  seguridad y eficiencia.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Creemos que la energía bien gestionada transforma industrias, y
                  que la combinación de personas expertas, marcas líderes y
                  disciplina comercial genera relaciones de largo plazo.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 w-full max-w-4xl rounded-[2rem] bg-primary px-6 py-5 shadow-xl">
            <p className="text-center text-xl font-semibold italic text-primary-foreground">
              “Liderar la industria con tecnología, criterio y responsabilidad.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}