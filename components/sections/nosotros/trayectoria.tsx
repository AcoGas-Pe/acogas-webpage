export function Trayectoria() {
    return (
        <section id="trayectoria" className="section mx-auto bg-background-light text-light-foreground text-center">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Visión */}
                        <div className="flex flex-col items-start text-left gap-4">
                            <h2 className="text-3xl font-bold text-primary mb-2">Visión</h2>
                            <p className="text-lg text-light-foreground/80">
                                Ser el referente indiscutible en el Perú en soluciones industriales de regulación, control y gestión de energía, reconocido por la excelencia técnica, la seriedad comercial y la capacidad de desarrollar mercados complejos junto a fabricantes líderes.
                            </p>
                            <p className="text-lg text-light-foreground/80">
                                Aspiramos a consolidarnos como el principal aliado estratégico de la industria en GLP, Gas Natural, Vapor y procesos especiales, expandiendo nuestra presencia territorial y nuestro portafolio, sin perder el sello que nos distingue: confianza, experiencia y respaldo real.
                            </p>
                        </div>
                        {/* Propósito */}
                        <div className="flex flex-col items-start text-left gap-4">
                            <h2 className="text-3xl font-bold text-primary mb-2">Propósito</h2>
                            <p className="text-lg text-light-foreground/80">
                                Nuestro propósito es poner la experiencia al servicio del desarrollo industrial del país, acompañando a las empresas en la toma de decisiones técnicas críticas, reduciendo riesgos operativos y elevando estándares de seguridad y eficiencia.
                            </p>
                            <p className="text-lg text-light-foreground/80">
                                Creemos firmemente que la energía bien gestionada transforma industrias, y que la combinación de personas expertas, marcas líderes y disciplina comercial genera relaciones de largo plazo y crecimiento sostenible.
                            </p>
                        </div>
                    </div>
                    <div className="py-4 px-4 rounded-lg w-full ">
                                <p className="italic font-semibold text-primary text-center text-xl">
                                    “Liderar la industria con tecnología, criterio y responsabilidad.”
                                </p>
                            </div>
                </div>
            </div>
        </section>
    );
}