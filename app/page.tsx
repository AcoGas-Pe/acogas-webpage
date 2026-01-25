import { Hero } from "@/components/sections/hero/hero";
import { Features } from "@/components/sections/features/features";
import { ProductGrid } from "@/components/sections/product-grid/product-grid";
import { Testimonials } from "@/components/sections/testimonials/testimonials";
import { CTA } from "@/components/sections/cta/cta";

export default function Home() {
  return (
    <main>
      <Hero
        title="Soluciones Profesionales en Gas y Energía"
        subtitle="Confianza y Calidad"
        description="Comprometidos con la excelencia en el suministro de gas y energía para hogares y empresas. Seguridad, confiabilidad y servicio de primera clase."
        primaryAction={{
          label: "Contactar",
          href: "/contacto",
        }}
        secondaryAction={{
          label: "Ver Productos",
          href: "/productos",
        }}
      />
      <Features />
      <ProductGrid />
      <Testimonials />
      <CTA />
    </main>
  );
}
