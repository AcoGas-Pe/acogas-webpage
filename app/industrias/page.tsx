import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { Button } from "@/components/ui/button";
import { PRODUCT_INDUSTRIES } from "@/lib/business-config";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = generateMetadataFromConfig("/industrias/");

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

      <section className="section border-t border-border bg-background py-12 sm:py-16">
        <div className="container">
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
            Elija un sector para conocer el enfoque de ingeniería, equipos y soporte que aplicamos en planta.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                href={ind.url}
                className={cn(
                  "group relative flex min-h-[160px] overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md",
                  !ind.image && "bg-muted/40",
                )}
              >
                {ind.image ? (
                  <>
                    <Image
                      src={ind.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20"
                      aria-hidden
                    />
                  </>
                ) : null}
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
            ))}
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
