import Link from "next/link";
import type { ProductIndustry } from "@/lib/business-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Compass, MessageCircleQuestionMark, PhoneCall } from "lucide-react";
import { ServiceFaqAccordion } from "@/components/sections/servicio/service-faq-accordion";
import { getIndustriaSectorFaqs } from "@/lib/industria-sector-faq";

interface IndustriaFaqProps {
  industry: ProductIndustry;
  className?: string;
}

export function IndustriaFaq({ industry, className }: IndustriaFaqProps) {
  const items = getIndustriaSectorFaqs(industry.name);

  return (
    <section
      className={cn(
        "section border-t border-border/60 bg-background-alt py-16 sm:py-20 md:py-24",
        className,
      )}
      aria-labelledby={`faq-industria-${industry.slug}`}
    >
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent sm:text-sm">
            FAQ · {industry.name}
          </p>
          <h2
            id={`faq-industria-${industry.slug}`}
            className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl"
          >
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Dudas típicas al abordar proyectos en {industry.name.toLowerCase()}.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <ServiceFaqAccordion items={items} />
        </div>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-primary/25 bg-linear-to-br from-primary/[0.08] via-card to-card shadow-sm sm:mt-12">
          <div className="flex flex-col items-center gap-5 p-6 text-center sm:p-8 md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-primary/10">
              <Compass
                className="h-7 w-7 text-accent"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>

            <div className="max-w-xl space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary sm:text-sm">
                ¿Querés profundizar en tu sector?
              </p>
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                Hablemos sobre {industry.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Revisá el centro de FAQs del sitio para preguntas generales o
                escribinos mencionando tu sector y caso de uso para una
                respuesta orientada.
              </p>
            </div>

            <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button
                href={`/contacto/?tipo=visita&sector=${encodeURIComponent(
                  industry.slug,
                )}`}
                size="lg"
                className="w-full sm:w-auto"
              >
                <PhoneCall className="mr-2 h-4 w-4" aria-hidden />
                Consultar este sector
              </Button>
              <Button
                href="/preguntas-frecuentes/"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <MessageCircleQuestionMark className="mr-2 h-4 w-4" aria-hidden />
                Ver todas las FAQs
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              FAQ general:{" "}
              <Link
                href="/preguntas-frecuentes/"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                /preguntas-frecuentes
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
