import Image from "next/image";
import {
  CENTRAL_MESSAGE_ALT,
  CENTRAL_MESSAGE_SHORT,
  MISSION_TAGLINE,
  PRIMARY_SLOGAN,
  TECH_COMMERCIAL_SLOGAN,
} from "@/lib/strategic-brands";

export function QuienesSomos() {
  return (
    <section
      id="quienes-somos"
      className="section mx-auto bg-background text-foreground text-center"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">
            {PRIMARY_SLOGAN}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Socio estratégico para la industria peruana
          </h2>
          <div className="flex sm:flex-row flex-col items-start text-left justify-start p-4 gap-8 text-foreground">
            <div className="flex flex-col items-start justify-start gap-4 w-full sm:w-1/2">
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                <a
                  href="/"
                  className="text-primary hover:text-primary-light transition-colors font-semibold"
                >
                  Acogas Industrial S.A.C.
                </a>{" "}
                es un socio estratégico de la industria, especializado en el
                diseño, provisión y acompañamiento técnico-comercial de
                soluciones integrales para GLP, gas natural, vapor y otros
                procesos industriales, mediante equipos, ingeniería aplicada y
                servicios especializados.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                Comercializamos y representamos marcas de referencia mundial ,
                entre ellas Fisher (GLP, GN y otros), Tartarini, Spence, Cash,
                Anderson Greenwood, Crosby, Kunkle, Marston, Enardo, Varec,
                Corken, Liquid Controls y Cavagna, con el fin de asegurar
                seguridad, eficiencia operativa, precisión, cumplimiento
                normativo y confiabilidad en cada proyecto, desde la selección
                del equipo hasta su aplicación en campo.
              </p>
              <div className="flex flex-col items-start gap-3 p-4 rounded-lg border border-primary/15 bg-primary/5 w-full">
                <p className="text-sm sm:text-base text-foreground/90 font-medium leading-snug">
                  {CENTRAL_MESSAGE_SHORT}
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  "{CENTRAL_MESSAGE_ALT}"
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground italic border-l-2 border-accent pl-3">
                  {TECH_COMMERCIAL_SLOGAN}
                </p>
              </div>
            </div>
            <Image
              src="/assets/config/placeholder-image.png"
              alt="Equipo de Acogas Industrial"
              width={500}
              height={500}
              className="shadow-[8px_8px_0px_0px_theme(colors.accent.DEFAULT)] w-full max-w-md mx-auto sm:mx-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
