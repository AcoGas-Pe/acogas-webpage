import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Service } from "@/domain/service";
import { Button } from "@/components/ui/button";
import { LifeBuoy, MessageCircleQuestionMark, PhoneCall } from "lucide-react";
import { ServiceFaqAccordion } from "@/components/sections/servicio/service-faq-accordion";

interface ServiceFAQProps {
  service: Service;
  className?: string;
}

export function ServiceFAQ({ service, className }: ServiceFAQProps) {
  if (service.faqs.length === 0) return null;

  const items = service.faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <section
      className={cn(
        "section border-t border-border/60 bg-background-alt py-16 sm:py-20 md:py-24",
        className,
      )}
      aria-labelledby={`faq-servicio-${service.slug}-heading`}
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent sm:text-sm">
            FAQ · {service.shortTitle}
          </p>
          <h2
            id={`faq-servicio-${service.slug}-heading`}
            className="mt-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl"
          >
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Respuestas directas sobre {service.shortTitle.toLowerCase()} y próximos pasos.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <ServiceFaqAccordion items={items} />
        </div>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-primary/25 bg-linear-to-br from-primary/[0.08] via-card to-card shadow-sm sm:mt-12">
          <div className="flex flex-col items-center gap-5 p-6 text-center sm:p-8 md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-primary/10">
              <LifeBuoy
                className="h-7 w-7 text-accent"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>

            <div className="max-w-xl space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary sm:text-sm">
                ¿Tu duda no está acá?
              </p>
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                Consultá con un especialista
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Mirá el centro de FAQs del sitio para preguntas generales, o
                escribinos describiendo tu caso particular en{" "}
                <span className="font-medium text-foreground">{service.shortTitle}</span>
                .
              </p>
            </div>

            <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button
                href={`/contacto?servicio=${service.slug}`}
                size="lg"
                className="w-full sm:w-auto"
              >
                <PhoneCall className="mr-2 h-4 w-4" aria-hidden />
                Consultar este servicio
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
              También accesible en{" "}
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
