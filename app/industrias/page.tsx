import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { Button } from "@/components/ui/button";
import { PRODUCT_INDUSTRIES } from "@/lib/business-config";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import { cn } from "@/lib/utils";
import {
  Factory,
  FileText,
  Fish,
  FlaskConical,
  Fuel,
  Mountain,
  Shirt,
  Truck,
  Utensils,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = generateMetadataFromConfig("/industrias/");

const industryIcons: Record<string, LucideIcon> = {
  agroindustria: Wheat,
  energia: Zap,
  mineria: Mountain,
  pesquera: Fish,
  "papel-carton": FileText,
  "quimico-plastico": FlaskConical,
  textil: Shirt,
  "alimentos-bebidas": Utensils,
  transporte: Truck,
  "entorno-glp": Fuel,
};

export default function IndustriasHubPage() {
  return (
    <>
      <JsonLdScripts pathname="/industrias/" />
      <PagesHero
        title="Industrias que atendemos"
        subtitle="Sectores"
        description="Soluciones técnicas integradas para GLP, gas natural, vapor y procesos especiales, adaptadas a cada cadena productiva y normativa aplicable."
        image="/assets/images/industrias-herolike.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Industrias", href: "/industrias/" },
        ]}
        primaryAction={{ label: "Contactar", href: "/contacto/" }}
        secondaryAction={{ label: "Catálogo de productos", href: "/productos/" }}
      />

      <section className="section border-t border-border/40 bg-background-alt py-12 sm:py-16">
        <div className="container">
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
            Elija un sector para conocer el enfoque de ingeniería, equipos y soporte que aplicamos en planta.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_INDUSTRIES.map((ind) => {
              const Icon = industryIcons[ind.slug] ?? Factory;

              return (
                <Link
                  key={ind.slug}
                  href={ind.url}
                  className={cn(
                    "group relative flex min-h-[180px] overflow-hidden rounded-[1.5rem] border border-border/50 bg-card shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.34)] transition-shadow hover:shadow-[0_22px_50px_-34px_hsl(var(--primary)_/_0.42)]",
                    !ind.image && "bg-muted/40",
                  )}
                >
                  {ind.image ? (
                    <>
                      <Image
                        src={ind.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/40 to-black/15"
                        aria-hidden
                      />
                    </>
                  ) : null}
                  <div className="absolute left-4 top-4 z-[1] flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/90 text-primary shadow-sm">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="relative z-[1] flex flex-col justify-end p-5 sm:p-6">
                    <h2
                      className={cn(
                        "text-lg font-bold uppercase tracking-wide sm:text-xl",
                        ind.image ? "text-white" : "text-foreground",
                      )}
                    >
                      {ind.name}
                    </h2>
                    {ind.description ? (
                      <p
                        className={cn(
                          "mt-2 text-sm leading-snug line-clamp-2",
                          ind.image ? "text-white/90" : "text-muted-foreground",
                        )}
                      >
                        {ind.description}
                      </p>
                    ) : null}
                    <span
                      className={cn(
                        "mt-3 inline-flex text-xs font-semibold uppercase tracking-wider",
                        ind.image ? "text-white/95" : "text-primary",
                      )}
                    >
                      Ver sector →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/productos/" size="lg">
              Explorar productos
            </Button>
            <Button href="/servicios/" variant="secondary" size="lg">
              Servicios técnicos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
