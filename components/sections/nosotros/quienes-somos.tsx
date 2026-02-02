import Image from "next/image";

export function QuienesSomos() {
  return (
    <section id="quienes-somos" className="section mx-auto bg-background-light text-light-foreground text-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Experiencia, Confianza y Trayectoria en Soluciones Industriales
          </h2>
          <div className="flex flex-row items-start text-left justify-start p-4 gap-4 ">
            <div className="flex flex-col items-start justify-start gap-3 w-1/2">
            <p className="text-lg text-light-foreground opacity-60">
              Con más de <span className="font-bold">53 años</span> de experiencia, en 
              <a href="/" className="text-primary hover:text-primary-light transition-colors font-bold"> ACOGAS INDUSTRIAL S.A.C. </a>
              nos hemos consolidado como un socio estratégico en el sector energético e industrial.
            </p>
            <p className="text-lg text-light-foreground opacity-60">
            Comercializamos y representamos marcas líderes a nivel mundial como Emerson (Fisher, Tartarini, Spence, Cash, Corken, Liquid Controls y Cavagna), garantizando seguridad, eficiencia operativa, precisión, cumplimiento normativo y confiabilidad en cada proyecto, desde la selección del equipo hasta su correcta aplicación en campo.
            </p>
            
            <div className="flex flex-col items-start justify-start gap-3 p-4">
            
            <p className="text-lg text-light-foreground/50 italic">
            <q> No vendemos productos, <span className="font-bold text-primary/90">desarrollamos soluciones integrales</span> para GLP, Gas Natural, Vapor y procesos industriales con respaldo técnico, normativo y de marca.</q>
            </p>
            <p className="text-sm text-light-foreground/30 italic">~ Acogas Industrial S.A.C.</p>
            </div>



            </div>
            <Image
              src="/assets/config/placeholder-image.png"
              alt="Equipo de Acogas Industrial"
              width={500}
              height={500}
              className="shadow-[8px_8px_0px_0px_theme(colors.accent.DEFAULT)]"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}