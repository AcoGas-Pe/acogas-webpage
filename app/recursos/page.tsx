import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ResourcesGrid } from "@/components/sections/recursos/resources-grid";
import { FAQSection } from "@/components/sections/recursos/faq-section";
import { CTA } from "@/components/sections/cta/cta";
import type { Metadata } from "next";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";

export const metadata: Metadata = generateMetadataFromConfig("/recursos/");

export default function RecursosPage() {
  return (
    <>
      <JsonLdScripts pathname="/recursos/" />
      <PagesHero
        title="Centro de Recursos Tecnicos"
        subtitle="Recursos"
        description="Catálogos, manuales, normativas y guías técnicas para apoyar sus decisiones de ingeniería."
        image="/assets/images/trabajando-carton.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Recursos", href: "/recursos" },
        ]}
      />
      <ResourcesGrid />
      <FAQSection />
      <CTA
        title="¿Necesita asesoría técnica personalizada?"
        description="Nuestro equipo de ingenieros puede ayudarle a seleccionar los equipos y soluciones correctas para su operación."
      />
    </>
  );
}
