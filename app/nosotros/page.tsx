import { PagesHero } from "@/components/sections/hero/pages-hero";
import { QuienesSomos } from "@/components/sections/nosotros/quienes-somos";
import { PropuestaValor } from "@/components/sections/nosotros/propuesta-valor";
import { Trayectoria } from "@/components/sections/nosotros/trayectoria";
import { CTA } from "@/components/sections/cta/cta";

export default function NosotrosPage() {
  return (
    <>
      <PagesHero
        title="Ofreciendo Soluciones Seguras y Eficientes"
        subtitle="Soluciones industriales seguras y eficientes en GLP, Gas Natural, Vapor y Procesos Especiales."
        image="/assets/images/refiner2.jpg"
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros", href: "/nosotros" }]}
      />
      <QuienesSomos />
      <PropuestaValor />
      <Trayectoria />
      <CTA
        title="¿Listo para comenzar?"
        description="Contáctanos hoy y descubre cómo podemos ayudarte con tus necesidades de gas y energía."
        primaryAction={{ label: "Contactar", href: "/contacto" }}
      />
    </>
  )
}