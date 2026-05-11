import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { CTA } from "@/components/sections/cta/cta";
import {
  STRATEGIC_BRANDS,
  STRATEGIC_PARTNERS_HEADING,
  STRATEGIC_PARTNERS_CLOSING,
  strategicBrandLogoUsesFullColor,
} from "@/lib/strategic-brands";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import { CertificadosPdfDownloads } from "@/components/sections/recursos/certificados-pdf-downloads";
import { MARCAS_CERTIFICADOS_DOWNLOAD_GATE_SLUG } from "@/lib/certificados-pdfs-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = generateMetadataFromConfig("/marcas/");

export default function MarcasPage() {
  return (
    <>
      <JsonLdScripts pathname="/marcas/" />
      <PagesHero
        title={STRATEGIC_PARTNERS_HEADING.title}
        subtitle={`${STRATEGIC_PARTNERS_HEADING.eyebrow} · ${STRATEGIC_PARTNERS_HEADING.subtitle}`}
        description="Integración de equipos, ingeniería y servicios con marcas líderes en regulación, seguridad, vapor, bombas y medición."
        image="/assets/images/metales-trabajando.webp"
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
                        className={
                          strategicBrandLogoUsesFullColor(brand.slug)
                            ? "h-10 w-auto max-w-[120px] object-contain opacity-90 group-hover:opacity-100"
                            : "h-10 w-auto max-w-[120px] object-contain opacity-90 grayscale group-hover:opacity-100"
                        }
                      />
                    ) : null}
                    
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

      <CertificadosPdfDownloads
        gateSlug={MARCAS_CERTIFICADOS_DOWNLOAD_GATE_SLUG}
        sectionTitle="Certificados de fabricante"
        description="Documentación ISO, SIL, UL y más para Fisher, Tartarini y Spence."
        requireDownloadGate={false}
      />

      <section
        className="section border-b border-border bg-muted/15 py-14 sm:py-16"
        aria-labelledby="cartas-autorizacion-heading"
      >
        <div className="container max-w-4xl mx-auto px-4">
          <h2
            id="cartas-autorizacion-heading"
            className="text-2xl font-bold text-foreground sm:text-3xl"
          >
            Cartas de autorización
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Documentación de representación y autorización por marca, unificada en
            esta sección cuando esté disponible. Contenido en preparación —
            próximamente podrá descargar el paquete consolidado.
          </p>
          <div className="mt-8 rounded-xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
            <p className="text-sm font-medium text-foreground">
              Material pendiente de envío
            </p>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              Publicaremos aquí las cartas oficiales tan pronto como recibamos los
              archivos finales.
            </p>
          </div>
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
