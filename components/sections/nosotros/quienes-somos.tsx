import Image from "next/image";
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
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">
          {PRIMARY_SLOGAN}
        </p>
        <h1 className="mx-auto mb-12 max-w-4xl text-center text-2xl font-bold uppercase leading-tight tracking-[0.06em] text-primary sm:mb-14 sm:text-3xl md:text-[2.125rem]">
          Socio estratégico para la industria peruana
        </h1>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-5 text-left">
            <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
              <a
                href="/"
                className="font-semibold text-primary transition-colors hover:text-primary-light"
              >
                Acogas Industrial S.A.C.
              </a>{" "}
              es un socio estratégico de la industria, especializado en el diseño,
              provisión y acompañamiento técnico-comercial de soluciones integrales
              para GLP, gas natural, vapor y otros procesos industriales, mediante
              equipos, ingeniería aplicada y servicios especializados.
            </p>
            <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
              Comercializamos y representamos marcas de referencia mundial, entre
              ellas Fisher (GLP, GN y otros), Tartarini, Spence, Cash, Anderson
              Greenwood, Crosby, Kunkle, Marston, Enardo, Varec, Corken, Liquid
              Controls y Cavagna, con el fin de asegurar seguridad, eficiencia
              operativa, precisión, cumplimiento normativo y confiabilidad en
              cada proyecto, desde la selección del equipo hasta su aplicación en
              campo.
            </p>

            <div className="mt-2 space-y-4 border-t border-border pt-8">
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

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg lg:aspect-[5/6] lg:min-h-[22rem]">
            <Image
              src="/assets/images/general-industry.webp"
              alt="Instalaciones industriales — ACOGAS"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
