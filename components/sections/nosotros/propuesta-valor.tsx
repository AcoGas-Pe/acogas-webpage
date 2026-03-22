"use client";

import {
  ShieldCheck,
  Lightbulb,
  Scale,
  Sparkles,
  Award,
  Users,
} from "lucide-react";
import { InfiniteCarousel, InfiniteCarouselItem } from "@/components/ui/infinite-carousel";
import { STRATEGIC_BRANDS, VISION_TAGLINE } from "@/lib/strategic-brands";
import { cn } from "@/lib/utils";

export function PropuestaValor() {
  const values = [
    {
      title: "Seguridad y cumplimiento normativo",
      description:
        "La seguridad es principio operativo. Promovemos el cumplimiento de normas nacionales e internacionales (OSINERGMIN, MINEM, MINAM), protegiendo personas, instalaciones y procesos.",
      icon: ShieldCheck,
    },
    {
      title: "Excelencia técnica",
      description:
        "Cada recomendación, cotización o proyecto se sustenta en criterio de ingeniería, conocimiento aplicado y experiencia en campo.",
      icon: Lightbulb,
    },
    {
      title: "Integridad y transparencia",
      description:
        "Actuamos con honestidad, claridad y responsabilidad. No comprometemos expectativas que no podamos respaldar técnicamente.",
      icon: Scale,
    },
    {
      title: "Innovación con sentido práctico",
      description:
        "Incorporamos tecnología y nuevas soluciones cuando aportan valor medible al cliente y a su operación.",
      icon: Sparkles,
    },
    {
      title: "Experiencia y respaldo",
      description:
        "Más de cincuenta años en el sector permiten anticipar riesgos y acompañar decisiones críticas con criterio.",
      icon: Award,
    },
    {
      title: "Cercanía y empatía industrial",
      description:
        "Escuchamos, comprendemos procesos y hablamos el lenguaje de la planta, no únicamente el del catálogo.",
      icon: Users,
    },
  ];

  return (
    <section id="propuesta-valor" className="section py-16 sm:py-20 md:py-24 mx-auto bg-background text-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">Valores corporativos</h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-10 max-w-2xl mx-auto">
            {VISION_TAGLINE}
          </p>
          <div className="flex flex-row items-start justify-center p-4 gap-4 flex-wrap">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="card-base cursor-default flex justify-center flex-col relative items-center justify-start p-4 w-80 min-h-[13rem] group"
                >
                  <span className="absolute text-primary text-4xl opacity-10 transition-all duration-300">
                    <Icon size={150} strokeWidth={2.2} />
                  </span>
                  <div className="mt-8 flex flex-col items-center justify-start relative z-10 gap-2">
                    <h3 className="text-base font-bold text-primary px-1">{value.title}</h3>
                    <p className="text-foreground/80 font-light text-sm leading-relaxed px-2">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full mt-12">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Socios estratégicos</h3>
            <p className="text-sm text-muted-foreground max-w-3xl mx-auto mb-6">
              Marcas que nos permiten integrar soluciones completas, no productos aislados. Las fichas comerciales y
              logotipos oficiales podrán incorporarse conforme disponibilidad de material gráfico.
            </p>
            <InfiniteCarousel speed={32} gap="gap-6" className="py-4">
              {STRATEGIC_BRANDS.map((partner) => (
                <InfiniteCarouselItem
                  key={partner.name}
                  className="card-base min-w-[280px] sm:min-w-[300px] max-w-[320px] flex flex-col items-stretch justify-between p-4 gap-3 text-left"
                >
                  <div
                    className={cn(
                      "flex min-h-[3.5rem] items-center justify-center rounded-md border border-primary/20 bg-primary/5 px-3 py-2",
                    )}
                  >
                    <span className="text-center text-base font-bold text-primary leading-tight">{partner.name}</span>
                  </div>
                  {partner.line && (
                    <p className="text-xs font-medium text-muted-foreground text-center">{partner.line}</p>
                  )}
                  <p className="text-foreground/85 text-xs sm:text-sm leading-relaxed">{partner.shortDescription}</p>
                </InfiniteCarouselItem>
              ))}
            </InfiniteCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}
