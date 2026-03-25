import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { CTA } from "@/components/sections/cta/cta";
import {
  STRATEGIC_BRANDS,
  STRATEGIC_PARTNERS_HEADING,
  STRATEGIC_PARTNERS_CLOSING,
} from "@/lib/strategic-brands";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = generateMetadataFromConfig("/marcas/");

export default function MarcasPage() {
  return (
    <>
      <PagesHero
        title={STRATEGIC_PARTNERS_HEADING.title}
        subtitle={`${STRATEGIC_PARTNERS_HEADING.eyebrow} · ${STRATEGIC_PARTNERS_HEADING.subtitle}`}
        description="Integración de equipos, ingeniería y servicios con marcas líderes en regulación, seguridad, vapor, bombas y medición."
        image="/assets/images/refinery.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Marcas", href: "/marcas/" },
        ]}
        primaryAction={{ label: "Contactar", href: "/contacto/" }}
        secondaryAction={{ label: "Productos", href: "/productos/" }}
      />

      <section className="section py-12 sm:py-16 bg-background border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <p className="text-center text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12">
            {STRATEGIC_PARTNERS_CLOSING}
          </p>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STRATEGIC_BRANDS.map((brand) => (
              <li key={brand.slug}>
                <Link
                  href={`/marcas/${brand.slug}/`}
                  className={cn(
                    "group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all",
                    "hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  )}
                >
                  <div className="flex min-h-[4rem] items-center justify-center gap-3 rounded-lg border border-primary/15 bg-primary/5 px-3 py-3">
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt=""
                        width={120}
                        height={48}
                        className="h-10 w-auto max-w-[120px] object-contain opacity-90 group-hover:opacity-100"
                      />
                    ) : null}
                    <span className="text-center text-base font-bold text-primary leading-tight">
                      {brand.name}
                    </span>
                  </div>
                  {brand.line ? (
                    <p className="mt-2 text-center text-xs font-medium text-muted-foreground">
                      {brand.line}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm text-foreground/85 leading-relaxed flex-1">
                    {brand.shortDescription}
                  </p>
                  <span className="mt-4 text-sm font-medium text-primary group-hover:underline">
                    Ver ficha de marca
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA
        title="¿Necesita integrar una solución con estas marcas?"
        description="Coordine con nuestro equipo comercial una visita técnica o una cotización alineada a su proceso."
        primaryAction={{ label: "Contactar", href: "/contacto/", icon: "arrow" }}
        secondaryAction={{ label: "Ver productos", href: "/productos/", icon: "clipboard" }}
        tertiaryAction={{ label: "Llamar ahora", href: "tel:+51998345895", icon: "phone" }}
      />
    </>
  );
}
