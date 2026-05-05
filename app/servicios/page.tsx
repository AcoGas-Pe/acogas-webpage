import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ServicesGrid } from "@/components/sections/servicios/services-grid";
import { ServicesCTA } from "@/components/sections/servicios/services-cta";
import { Clients } from "@/components/sections/clients/clients";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | Acogas Industrial",
  description: "Soluciones técnicas integrales en GLP, Gas Natural, Vapor, instrumentación y repuestos. Más de 50 años de experiencia con marcas líderes mundiales.",
};

export default function ServiciosPage() {
  return (
    <>
      <PagesHero
        title="Servicios y soluciones"
        titleClassName="uppercase tracking-tight"
        subtitle="Lo que ofrecemos"
        description="Soluciones técnicas integrales respaldadas por más de 50 años de experiencia y las mejores marcas de la industria."
        image="/assets/images/refinery.webp"
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
