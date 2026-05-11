import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ServicesGrid } from "@/components/sections/servicios/services-grid";
import { ServicesCTA } from "@/components/sections/servicios/services-cta";
import { Clients } from "@/components/sections/clients/clients";
import type { Metadata } from "next";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";

export const metadata: Metadata = generateMetadataFromConfig("/servicios/");

export default function ServiciosPage() {
  return (
    <>
      <JsonLdScripts pathname="/servicios/" />
      <PagesHero
        title="Servicios y soluciones"
        titleClassName="uppercase tracking-tight"
        subtitle="Lo que ofrecemos"
        description="Soluciones técnicas integrales respaldadas por más de 50 años de experiencia y las mejores marcas de la industria."
        image="/assets/images/pipes-white.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
        ]}
      />
      <ServicesGrid />
      <Clients />
      <ServicesCTA />
    </>
  );
}
