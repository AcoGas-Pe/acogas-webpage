import { Hero } from "@/components/sections/hero/hero";
import { Features } from "@/components/sections/features/features";
import { ProductGrid } from "@/components/sections/product-grid/product-grid";
import { Testimonials } from "@/components/sections/testimonials/testimonials";
import { CTA } from "@/components/sections/cta/cta";
import { Metadata } from "next";
import { generateMetadataFromConfig, generateStructuredData } from "@/lib/seo-metadata";

export const metadata: Metadata = generateMetadataFromConfig('/');


export default function Home() {

  const structuredData = generateStructuredData('/');


  return (
    <>
    {structuredData.map((script) => (
        <script
          key={script.id}
          type={script.type}
          dangerouslySetInnerHTML={{ __html: script.children }}
          />
      ))}
      <Hero
        title="Soluciones industriales seguras y eficientes en GLP, Gas Natural, Vapor y Procesos Especiales."
        subtitle="Confianza y Calidad"
        description="Más de 53 años desarrollando soluciones técnicas con marcas líderes como Emerson, Corken, Cavagna y Liquid Controls, acompañando a la industria peruana desde el diagnóstico hasta la puesta en marcha."
        primaryAction={{
          label: "Solicitar visita técnica",
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
    </>

  );
}
