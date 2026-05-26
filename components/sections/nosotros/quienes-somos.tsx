import Image from "next/image";
import Link from "next/link";
import {
  CENTRAL_MESSAGE_ALT,
  CENTRAL_MESSAGE_SHORT,
  PRIMARY_SLOGAN,
  TECH_COMMERCIAL_SLOGAN,
} from "@/lib/strategic-brands";

export function QuienesSomos() {
  return (
    <section
      id="quienes-somos"
      className="section bg-background pb-14 pt-12 text-foreground sm:pb-16 sm:pt-16 md:pb-20 md:pt-20"
    >
      <div className="container mx-auto max-w-6xl px-4">

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="glass-panel rounded-[2rem] px-5 py-6 text-left sm:px-7 sm:py-8">
            <p className="text-pretty text-base leading-relaxed text-foreground/90 sm:text-lg">
              <Link
                href="/"
                className="font-semibold text-primary transition-colors hover:text-primary-light"
              >
                Acogas Industrial S.A.C.
              </Link>{" "}
              es un socio estratégico de la industria peruana, especializado en el
              diseño, provisión y acompañamiento técnico-comercial de soluciones
              integrales para GLP, gas natural, vapor y procesos industriales.
              Integramos equipos, ingeniería aplicada y servicios especializados
              con marcas de referencia mundial, entre
              ellas Fisher (GLP, GN y otros), Tartarini, Spence, Cash, Anderson
              Greenwood, Crosby, Kunkle, Marston, Enardo, Varec, Corken, Liquid
              Controls y Cavagna, para asegurar seguridad, eficiencia
              operativa, precisión, cumplimiento normativo y confiabilidad en
              cada proyecto, desde la selección del equipo hasta su aplicación en
              campo.
            </p>

            <div className="mt-8 space-y-4 border-t border-border/70 pt-6">
              <p className="text-base font-bold text-foreground sm:text-lg">
                {CENTRAL_MESSAGE_SHORT}
              </p>
              <p className="text-base italic leading-relaxed text-foreground/85 sm:text-lg">
                &ldquo;{CENTRAL_MESSAGE_ALT}&rdquo;
              </p>
              <p className="border-l-4 border-accent pl-4 text-sm font-semibold uppercase tracking-wide text-foreground sm:text-base">
                {TECH_COMMERCIAL_SLOGAN}
              </p>
            </div>
          </div>

          <div className="relative min-h-[24rem] w-full lg:min-h-[34rem]">
            <div className="absolute left-0 top-0 h-[76%] w-[78%] overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-border/70">
              <Image
                src="/assets/images/trabajando-refineria.webp"
                alt="Instalaciones industriales de Acogas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 78vw, 38vw"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 h-[46%] w-[52%] overflow-hidden rounded-[1.5rem] border-4 border-background shadow-2xl">
              <Image
                src="/assets/images/revision-en-planta.webp"
                alt="Revisión técnica en planta industrial"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 52vw, 24vw"
              />
            </div>
            <div className="absolute bottom-[18%] left-[8%] rounded-xl bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg">
              +50 años de experiencia
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
