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
        image="/assets/images/refiner2.webp"
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros", href: "/nosotros" }]}
      />
      <QuienesSomos />
      <PropuestaValor />
      <Trayectoria />
      <CTA
        title="¿Desea profundizar en su requerimiento?"
        description="Coordine una visita técnica, un diagnóstico o una conversación con nuestro equipo comercial. Respondemos con criterio de ingeniería y trazabilidad normativa."
        primaryAction={{ label: "Programar visita técnica", href: "/contacto?tipo=visita", icon: "arrow" }}
        secondaryAction={{ label: "Solicitar diagnóstico", href: "/contacto?tipo=diagnostico", icon: "clipboard" }}
        tertiaryAction={{ label: "Llamar ahora", href: "tel:+51998345895", icon: "phone" }}
      />
    </>
  )
}