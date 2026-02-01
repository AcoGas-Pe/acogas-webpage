import { PagesHero } from "@/components/sections/hero/pages-hero";
import { Slideshow } from "@/components/sections/hero/slideshow";

export default function NosotrosPage() {
  return (
    <>
      <PagesHero
        title="Nosotros"
        subtitle="Soluciones industriales seguras y eficientes en GLP, Gas Natural, Vapor y Procesos Especiales."
        image="/assets/config/placeholder-image.png"
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros", href: "/nosotros" }]}
      />
    </>
  )
}