"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  className?: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Qué marcas representan?",
    answer:
      "Representamos marcas líderes mundiales como Emerson (Fisher, Tartarini, Spence), Corken, Liquid Controls y Cavagna Group, garantizando equipos de la más alta calidad y respaldo técnico.",
  },
  {
    question: "¿Ofrecen visitas técnicas?",
    answer:
      "Sí, realizamos visitas técnicas sin compromiso para evaluar sus necesidades en planta. Nuestro equipo de ingenieros lo acompaña desde el diagnóstico hasta la puesta en marcha.",
  },
  {
    question: "¿Trabajan con normativas peruanas?",
    answer:
      "Absolutamente. Todas nuestras soluciones cumplen con las Normas Técnicas Peruanas (NTP) y estándares internacionales aplicables a GLP, Gas Natural y Vapor.",
  },
  {
    question: "¿Cuál es el tiempo de respuesta para cotizaciones?",
    answer:
      "Procesamos solicitudes de cotización en un plazo de 24-48 horas hábiles. Para proyectos que requieren ingeniería, el plazo depende de la complejidad de la evaluación.",
  },
  {
    question: "¿Ofrecen capacitación técnica?",
    answer:
      "Sí, brindamos capacitación al personal de planta sobre operación, mantenimiento y seguridad de los equipos que suministramos. También organizamos seminarios técnicos periódicos.",
  },
];

export function FAQSection({ className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background-alt", className)}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="card-base overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-foreground">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      isOpen ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
