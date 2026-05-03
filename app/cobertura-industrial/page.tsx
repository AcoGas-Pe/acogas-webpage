import { PagesHero } from "@/components/sections/hero/pages-hero";
import { Clients } from "@/components/sections/clients/clients";
import { CTA } from "@/components/sections/cta/cta";
import { CoberturaIndustrialRegions } from "@/components/sections/cobertura-industrial/cobertura-industrial-regions";
import { getCityBySlug, getRegionalCities } from "@/lib/cities-data";
import { MapPin } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cobertura Industrial | ACOGAS - Presencia Nacional",
  description:
    "Cobertura técnica en las principales zonas industriales del Perú. Lima Metropolitana, Lurín, Arequipa, Trujillo y más ciudades con soporte técnico presencial.",
};

const LIMA_AREA_QUICK = ["lima", "callao", "lurin"] as const;

export default function CoberturaIndustrialPage() {
  const regionalCities = getRegionalCities();
  const limaQuickLinks = LIMA_AREA_QUICK.map((slug) => getCityBySlug(slug)).filter(
    (c): c is NonNullable<ReturnType<typeof getCityBySlug>> => Boolean(c),
  );
  const cityHubLinks = [...limaQuickLinks, ...regionalCities];

  return (
    <>
      <PagesHero
        title="Cobertura Industrial Nacional"
        subtitle="Presencia Territorial"
        description="Brindamos soporte técnico presencial en las principales zonas industriales del Perú. Más de 50 años de experiencia con equipos de clase mundial."
        image="/assets/images/refinery.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Cobertura Industrial", href: "/cobertura-industrial" },
        ]}
      />

      <CoberturaIndustrialRegions />

      <section className="section border-y border-border/60 bg-muted/25 py-12 sm:py-14">
        <div className="container">
          <div className="mx-auto">
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              Otras ciudades con cobertura
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enlaces a zonas industriales fuera del ámbito Lima Metropolitana
              central. También podés usar el{" "}
              <Link
                href="/cobertura-industrial/#selector-ciudad-cobertura"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                selector de ciudad
              </Link>{" "}
              arriba en la página.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cityHubLinks.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cobertura-industrial/${city.slug}/`}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4 transition hover:border-primary/35 hover:bg-primary/[0.04]"
                >
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
                      {city.name}
                    </span>
                    {city.region ? (
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {city.region}
                      </span>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-linear-to-r from-gray-900 via-primary to-gray-900 py-16 sm:py-20">
        <div className="container ">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-accent">
                Por qué elegirnos
              </p>
              <h2 className="mb-4 text-2xl font-bold !tracking-wider text-white sm:text-3xl">
                Nuestra propuesta de valor industrial
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="glass-panel backdrop-blur-xs rounded-lg p-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-sm border border-primary/20 bg-primary/10">
                  <span className="text-2xl font-bold text-white/80">50+</span>
                </div>
                <h3 className="mb-2 font-bold text-white/80">
                  Años de experiencia
                </h3>
                <p className="text-sm text-white/50">
                  Más de cinco décadas en soluciones industriales.
                </p>
              </div>

              <div className="glass-panel backdrop-blur-xs rounded-lg p-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-sm border border-primary/20 bg-primary/10">
                  <span className="text-2xl font-bold text-white/80">24/7</span>
                </div>
                <h3 className="mb-2 font-bold text-white/80">
                  Soporte técnico
                </h3>
                <p className="text-sm text-white/50">
                  Atención técnica cuando más lo necesita.
                </p>
              </div>

              <div className="glass-panel backdrop-blur-xs rounded-lg p-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-sm border border-primary/20 bg-primary/10">
                  <span className="text-2xl font-bold text-white/80">100%</span>
                </div>
                <h3 className="mb-2 font-bold text-white/80">Certificados</h3>
                <p className="text-sm text-white/50">
                  Equipos con las mejores marcas mundiales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Clients />
      <CTA />
    </>
  );
}
