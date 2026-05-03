"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { PRODUCT_INDUSTRIES } from "@/lib/business-config";
import {
  Flame,
  Gauge,
  Wind,
  Fuel,
  ArrowRight,
  Truck,
  Shield,
  CogIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const solutions = [
  { title: "GLP", icon: Gauge },
  { title: "Gas natural", icon: Flame },
  { title: "Vapor", icon: Wind },
  { title: "Combustibles líquidos", icon: Fuel },
  { title: "Control de procesos", icon: CogIcon },
  { title: "Almacenamiento seguro", icon: Shield },
  { title: "Transferencia de fluidos", icon: Truck },
] as const;

/** Tarjeta alcance (dos columnas) + rejilla de industrias con fotografía */
export function IndustriesSolutionsBento() {
  return (
    <section
      className="section border-y border-border/60 bg-linear-to-b from-background-alt via-background-alt to-muted/35 py-11 text-foreground sm:py-14 md:py-16"
      aria-label="Industrias y Soluciones"
    >
      <div className="container">
        <header className="mb-6 text-center sm:mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent sm:text-sm">
            Conoce nuestro alcance
          </p>
          <h2 className="text-2xl font-bold uppercase tracking-[0.08em] text-primary sm:text-3xl md:text-4xl">
            Industrias y soluciones
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground/85 sm:text-base">
            Atendemos diversos sectores con soluciones técnicas por tipo de
            energía y proceso.
          </p>
        </header>

        <div
          className={cn(
            "rounded-xl border border-primary/12 bg-card p-5 shadow-[0_2px_16px_-2px_rgb(0_0_0_/_0.1),0_1px_4px_-1px_rgb(0_0_0_/_0.05)]",
            "ring-1 ring-black/[0.04] sm:p-6 md:p-7",
          )}
        >
          <div className="grid gap-7 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start md:gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
            <div className="flex min-w-0 flex-col">
              <h3 className="text-base font-bold uppercase tracking-[0.06em] text-foreground sm:text-lg">
                Al alcance de tu industria
              </h3>
              <p className="mt-2.5 max-w-xl text-sm leading-snug text-foreground/90 sm:text-[0.9375rem] sm:leading-relaxed">
                Ofrecemos soluciones integrales diseñadas para cubrir una amplia
                gama de necesidades energéticas y aplicaciones industriales,
                asegurando eficiencia, seguridad y confiabilidad en cada
                proceso.
              </p>
              <Link
                href="/soluciones/"
                className="group mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground underline-offset-4 transition-colors hover:text-primary"
              >
                Explorar soluciones
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>

            <ul className="grid grid-cols-2 gap-2 sm:gap-2.5 md:border-l md:border-border/80 md:pl-8 lg:pl-9">
              {solutions.map((sol) => {
                const Icon = sol.icon;
                return (
                  <li key={sol.title} className="flex items-center gap-2.5 sm:gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center text-primary sm:h-9 sm:w-9">
                      <Icon
                        className="h-[1.375rem] w-[1.375rem] sm:h-6 sm:w-6"
                        aria-hidden
                        strokeWidth={1.75}
                      />
                    </span>
                    <span className="text-[11px] font-semibold uppercase leading-tight tracking-wide text-foreground sm:text-xs">
                      {sol.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-5">
          <header className="mb-5 text-center sm:mb-6">
            <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-foreground sm:text-xl">
              Industrias
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Sectores en los que desarrollamos soluciones específicas.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-5">
            {PRODUCT_INDUSTRIES.map((ind) => {
              const bgImage = ind.image || "";
              return (
                <Link
                  key={ind.slug}
                  href={ind.url}
                  className={cn(
                    "group relative flex aspect-[4/3] min-h-[76px] items-center justify-center overflow-hidden rounded-md sm:min-h-[88px] md:aspect-[16/11] md:min-h-[84px]",
                    !bgImage && "border border-border bg-muted/50",
                  )}
                >
                  {bgImage && (
                    <>
                      <Image
                        src={bgImage}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                      <div
                        className="absolute inset-0 bg-black/55 transition-colors duration-300 group-hover:bg-black/45"
                        aria-hidden
                      />
                    </>
                  )}
                  <span
                    className={cn(
                      "relative z-[1] px-2 text-center text-[11px] font-bold uppercase leading-tight tracking-wide sm:text-xs",
                      bgImage ? "text-white" : "text-foreground",
                    )}
                  >
                    {ind.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <p className="mt-5 text-center sm:mt-6">
            <Button href="/industrias/" variant="nav" size="lg" className="gap-2 group hover:bg-primary/10">
              Ver todas las industrias
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}
