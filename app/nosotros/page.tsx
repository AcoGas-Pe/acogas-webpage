import { PagesHero } from "@/components/sections/hero/pages-hero";
import { QuienesSomos } from "@/components/sections/nosotros/quienes-somos";
import { PropuestaValor } from "@/components/sections/nosotros/propuesta-valor";
import { Trayectoria } from "@/components/sections/nosotros/trayectoria";

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
    </>
  )
}