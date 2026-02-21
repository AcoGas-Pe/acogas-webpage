import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ResourcesGrid } from "@/components/sections/recursos/resources-grid";
import { FAQSection } from "@/components/sections/recursos/faq-section";
import { CTA } from "@/components/sections/cta/cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recursos | Acogas Industrial",
  description: "Acceda a catálogos, manuales técnicos, normativas y guías de selección para GLP, Gas Natural y Vapor. Centro de recursos técnicos de Acogas.",
};

export default function RecursosPage() {
  return (
    <>
      <PagesHero
        title="Centro de Recursos Técnicos"
        subtitle="Recursos"
        description="Catálogos, manuales, normativas y guías técnicas para apoyar sus decisiones de ingeniería."
        image="/assets/images/refiner2.jpg"
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
