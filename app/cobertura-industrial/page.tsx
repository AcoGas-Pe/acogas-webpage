import { PagesHero } from "@/components/sections/hero/pages-hero";
import { Clients } from "@/components/sections/clients/clients";
import { CTA } from "@/components/sections/cta/cta";
import { getAllCities, getLimaCities, getRegionalCities } from "@/lib/cities-data";
import { Building2, FlagIcon, MapPin } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cobertura Industrial | ACOGAS - Presencia Nacional",
  description: "Cobertura técnica en las principales zonas industriales del Perú. Lima, Arequipa, Trujillo y más ciudades con soporte técnico presencial.",
};

export default function CoberturaIndustrialPage() {
  const limaCities = getLimaCities();
  const regionalCities = getRegionalCities();

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

      <section className="section py-16 sm:py-20 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
              Nuestras Ubicaciones
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Ciudades con Cobertura
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Seleccione una ciudad para conocer nuestros servicios y soluciones disponibles en su zona.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Lima Metropolitana */}
            <div className="card-base card-tint-2 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <FlagIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Lima Metropolitana</h3>
                  <p className="text-sm text-muted-foreground">Capital y distritos industriales</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {limaCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/cobertura-industrial/${city.slug}/`}
                    className="group flex items-center gap-2 p-3 rounded-lg bg-background border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {city.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Otras Ciudades */}
            <div className="card-base card-tint-2 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Cobertura Regional</h3>
                  <p className="text-sm text-muted-foreground">Principales ciudades del Perú</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {regionalCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/cobertura-industrial/${city.slug}/`}
                    className="group flex items-center gap-2 p-3 rounded-lg bg-background border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block">
                        {city.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{city.region}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section py-16 sm:py-20 bg-linear-to-r from-gray-900 via-primary to-gray-900">
        <div className="container ">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">Por qué elegirnos</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 !tracking-wider">
                Nuestra propuesta de valor industrial
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 glass-panel backdrop-blur-xs rounded-lg">
                <div className="w-20 h-20 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white/80">50+</span>
                </div>
                <h3 className="font-bold text-white/80 mb-2">Años de Experiencia</h3>
                <p className="text-sm text-white/50">
                  Más de cinco décadas de experiencia en soluciones industriales.
                </p>
              </div>

              <div className="text-center p-6 glass-panel backdrop-blur-xs rounded-lg">
                <div className="w-20 h-20 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white/80">24/7</span>
                </div>
                <h3 className="font-bold text-white/80 mb-2">Soporte Técnico</h3>
                <p className="text-sm text-white/50">
                  Atención técnica disponible cuando más lo necesita.
                </p>
              </div>

              <div className="text-center p-6 glass-panel backdrop-blur-xs rounded-lg">
                <div className="w-20 h-20 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white/80">100%</span>
                </div>
                <h3 className="font-bold text-white/80 mb-2">Certificados</h3>
                <p className="text-sm text-white/50">
                  Equipos certificados con las mejores marcas mundiales.
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
