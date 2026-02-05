  import {
    ShieldCheck,
    Lightbulb,
    Scale,
    Sparkles,
    Award,
    Users,
  } from "lucide-react";
  
  export function PropuestaValor() {

  const values = [
    {
      title: "Seguridad y Cumplimiento Normativo",
      description: "La seguridad es principio operativo. Cumplimos normas nacionales e internacionales para proteger personas, instalaciones y procesos.",
      icon: ShieldCheck, // Icon Component
    },
    {
      title: "Excelencia Técnica",
      description: "Nuestras soluciones se basan en criterio ingenieril, conocimiento aplicado y experiencia en campo.",
      icon: Lightbulb, // Icon Component
    },
    {
      title: "Integridad y Transparencia",
      description: "Actuamos con honestidad, claridad y responsabilidad. No prometemos lo que no podemos cumplir.",
      icon: Scale, // Icon Component
    },
    {
      title: "Innovación con Sentido Práctico",
      description: "Colaboramos en soluciones tecnológicas que aportan valor real a cada cliente.",
      icon: Sparkles, // Icon Component
    },
    {
      title: "Experiencia y Respaldo",
      description: "Con más de 53 años en el sector, anticipamos riesgos y acompañamos decisiones clave.",
      icon: Award, // Icon Component
    },
    {
      title: "Cercanía y Empatía Industrial",
      description: "Escuchamos y comprendemos los procesos, hablando el lenguaje de la planta.",
      icon: Users, // Icon Component
    },
  ];

  const partners = [
    {
      name: "Emerson",
      image: "/assets/images/emerson.png",
      description: "Líder mundial en automatización y control industrial."
    },
    {
      name: "Corken",
      image: "/assets/images/corken.png",
      description: "Bombas y compresores para GLP y gases; claves para integración y venta cruzada en proyectos industriales."
    },
    {
      name: "Cavagna Group",
      image: "/assets/images/cavagna.png",
      description: "Regulación y componentes para GLP y GN, complemento estratégico para soluciones integrales."
    },
    {
      name: "Liquid Controls",
      image: "/assets/images/liquid-controls.png",
      description: "Medición y control preciso de líquidos y fluidos, brindando confiabilidad e información en tiempo real."
    },
  ];

  return (
    <section id="propuesta-valor" className="section h-[90dvh] mx-auto bg-background text-center">
      <div className="container mx-auto px-4 py-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-2">Conoce Nuestros Valores</h2>
                <p className="text-muted-foreground/80 text-sm mb-4">Lideramos la industria con tecnología, criterio y responsabilidad.</p>
                <div className="flex flex-row items-start justify-start p-4 gap-4 flex-wrap">
                  {values.map((value) => {
                    const Icon = value.icon;
                    return (
                      <div key={value.title} className="cursor-default flex justify-center flex-col bg-card-foreground relative items-center justify-start p-4 w-100 h-50 rounded-md group hover:bg-primary-light/20 transition-all duration-600">
                        <span className="absolute text-primary text-4xl opacity-10 group-hover:opacity-100 transition-all duration-300">
                          <Icon size={150} strokeWidth={2.2} />
                        </span>
                        <div className="group-hover:opacity-0 transition-all duration-600 mt-10 flex flex-col items-center justify-start">
                          <h3 className="text-lg font-bold text-primary">{value.title}</h3>
                        <p className="text-background/80 font-semibold">{value.description}</p>
                        </div>
                 
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-row items-start justify-start p-4 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Nuestros socios</h3>
                    <div className="flex flex-row items-start justify-start p-4 gap-4">
                      {partners.map((partner) => {
                        return (
                          <div key={partner.name} className="flex flex-col items-center justify-between p-4 gap-4">
                            <img src={partner.image} alt={partner.name} className="w-20 h-20" />
                            <h4 className="text-lg font-bold text-primary">{partner.name}</h4>
                            <p className="text-foreground/80 font-semibold">{partner.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </section>
  );
}