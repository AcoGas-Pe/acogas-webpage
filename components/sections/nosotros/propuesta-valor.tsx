"use client";

import Image from "next/image";
import {
  Award,
  Cog,
  Lightbulb,
  Lock,
  Scale,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  InfiniteCarousel,
  InfiniteCarouselItem,
} from "@/components/ui/infinite-carousel";
import { STRATEGIC_BRANDS, VISION_TAGLINE } from "@/lib/strategic-brands";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Seguridad y cumplimiento normativo",
    description:
      "La seguridad es principio operativo. Promovemos el cumplimiento de normas nacionales e internacionales (OSINERGMIN, MINEM, MINAM), protegiendo personas, instalaciones y procesos.",
    icon: Lock,
  },
  {
    title: "Excelencia técnica",
    description:
      "Cada recomendación, cotización o proyecto se sustenta en criterio de ingeniería, conocimiento aplicado y experiencia en campo.",
    icon: Cog,
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
    icon: Lightbulb,
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
] as const;

export function PropuestaValor() {
  return (
    <>
      <section
        id="propuesta-valor"
        className="section border-y border-border/60 bg-background py-14 sm:py-16 md:py-20"
      >
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold uppercase tracking-[0.08em] text-foreground sm:text-3xl md:text-[2rem]">
            Valores corporativos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
            {VISION_TAGLINE}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className={cn(
                    "flex flex-col rounded-xl border border-border bg-card p-6 text-left shadow-sm",
                    "transition hover:border-primary/25 hover:shadow-md",
                  )}
                >
                  <div className="mb-4 flex justify-center sm:justify-start">
                    <Icon
                      className="h-8 w-8 text-accent"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                  <h3 className="text-center text-sm font-bold uppercase tracking-wide text-primary sm:text-left sm:text-base">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-justify text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="socios-estrategicos"
        className="section relative overflow-hidden py-14 text-white sm:py-16 md:py-20"
      >
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src="/assets/images/refiner2.webp"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/92" />
        </div>

        <div className="container relative z-10 mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold uppercase tracking-[0.08em] text-white sm:text-3xl md:text-[2rem]">
            Socios estratégicos
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-white/85 sm:text-base">
            Marcas que nos permiten integrar soluciones completas, no productos
            aislados. Cada socio aporta tecnología probada y respaldo global en
            regulación, seguridad y control de procesos.
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-white/15 bg-black/15 py-6 sm:mt-12 sm:py-8">
            <InfiniteCarousel
              speed={38}
              gap="gap-6"
              pauseOnHover
              className="px-2 sm:px-4"
            >
              {STRATEGIC_BRANDS.map((partner) => (
                <InfiniteCarouselItem
                  key={partner.slug}
                  className="min-w-[300px] max-w-[320px] sm:min-w-[320px]"
                >
                  <Link
                    href={`/marcas/${partner.slug}/`}
                    className="flex h-full min-h-[220px] flex-col rounded-xl border border-white/12 bg-white/8 p-5 text-left backdrop-blur-[2px] transition hover:border-white/25 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <div className="flex min-h-[4.5rem] items-center justify-center rounded-full bg-white px-4 py-3 shadow-sm">
                      {partner.logo ? (
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={200}
                          height={48}
                          className="h-9 w-auto max-w-[200px] object-contain object-center"
                        />
                      ) : (
                        <span className="text-center text-sm font-bold uppercase tracking-wide text-accent">
                          {partner.name}
                        </span>
                      )}
                    </div>
                    {partner.line ? (
                      <p className="mt-2 text-center text-xs font-medium text-white/70">
                        {partner.line}
                      </p>
                    ) : null}
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-white/88">
                      {partner.shortDescription}
                    </p>
                    <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-white">
                      Ver ficha →
                    </span>
                  </Link>
                </InfiniteCarouselItem>
              ))}
            </InfiniteCarousel>
          </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button href="/marcas/" size="sm" className="group !bg-white !text-accent transition-all duration-200">
           Descubre nuestros socios
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
          </Button>
        
        </div>  
        </div>
      </section>
    </>
  );
}
