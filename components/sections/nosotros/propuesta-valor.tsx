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
    image: "/assets/images/regulacion-presion.webp",
  },
  {
    title: "Excelencia técnica",
    description:
      "Cada recomendación, cotización o proyecto se sustenta en criterio de ingeniería, conocimiento aplicado y experiencia en campo.",
    icon: Cog,
    image: "/assets/images/manifold-pic1.webp",
  },
  {
    title: "Integridad y transparencia",
    description:
      "Actuamos con honestidad, claridad y responsabilidad. No comprometemos expectativas que no podamos respaldar técnicamente.",
    icon: Scale,
    image: "/assets/images/manometer-measurement-metrology-536467.webp",
  },
  {
    title: "Innovación con sentido práctico",
    description:
      "Incorporamos tecnología y nuevas soluciones cuando aportan valor medible al cliente y a su operación.",
    icon: Lightbulb,
    image: "/assets/images/medidor-liquid.webp",
  },
  {
    title: "Experiencia y respaldo",
    description:
      "Más de cincuenta años en el sector permiten anticipar riesgos y acompañar decisiones críticas con criterio.",
    icon: Award,
    image: "/assets/images/oil-refinery-in-anacortes.webp",
  },
  {
    title: "Cercanía y empatía industrial",
    description:
      "Escuchamos, comprendemos procesos y hablamos el lenguaje de la planta, no únicamente el del catálogo.",
    icon: Users,
    image: "/assets/images/revision-en-planta-3.webp",
  },
] as const;

export function PropuestaValor() {
  return (
    <>
      <section
        id="propuesta-valor"
        className="section border-y border-border/40 bg-background-alt py-14 sm:py-16 md:py-20"
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
                    "group flex flex-col overflow-hidden rounded-[1.5rem] border border-border/50 bg-card text-left shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.34)]",
                    "transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_22px_50px_-34px_hsl(var(--primary)_/_0.42)]",
                  )}
                >
                  <div className="relative aspect-[16/10] bg-muted">
                    <Image
                      src={value.image}
                      alt={`${value.title} — propuesta de valor ACOGAS`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/90 text-primary shadow-sm">
                      <Icon
                        className="h-6 w-6"
                        strokeWidth={1.55}
                        aria-hidden
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-center text-sm font-bold uppercase tracking-wide text-primary sm:text-left sm:text-base">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
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
            src="/assets/images/revision-refineria-2.webp"
            alt="Fondo industrial — revisión en refinería"
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

          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/20 bg-black/20 py-6 shadow-2xl shadow-black/15 backdrop-blur-[2px] sm:mt-12 sm:py-8">
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
                    className="flex h-full min-h-[220px] flex-col rounded-[1.5rem] border border-white/15 bg-white/10 p-5 text-left shadow-lg shadow-black/10 backdrop-blur-[2px] transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <div className="flex min-h-[4.5rem] items-center justify-center rounded-2xl bg-white px-4 py-3 shadow-sm">
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
            <Button
              href="/marcas/"
              size="sm"
              className="group !bg-white !text-accent transition-all duration-200"
            >
              Descubre nuestros socios
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
