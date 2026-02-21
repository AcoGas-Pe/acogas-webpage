import { Hero } from "@/components/sections/hero/hero";
import { StatsBar } from "@/components/sections/stats-bar/stats-bar";
import { Industries } from "@/components/sections/industries/industries";
import { Services } from "@/components/sections/services/services";
import { Features } from "@/components/sections/features/features";
import { Clients } from "@/components/sections/clients/clients";
import { Coverage } from "@/components/sections/coverage/coverage";
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
        description="Más de 53 años desarrollando soluciones técnicas seguras, eficientes y normativamente confiables para la industria peruana, integrando tecnología de clase mundial con acompañamiento real en campo."
        primaryAction={{ label: "Solicitar Visita Técnica", href: "/contacto?tipo=visita" }}
        secondaryAction={{ label: "Solicitar Diagnóstico", href: "/contacto?tipo=diagnostico" }}
        tertiaryAction={{ label: "Ver Productos", href: "/productos" }}
      />

      <StatsBar />
      <Industries />
      <Services />
      <Features />
      <Clients />
      <Coverage />
      <Testimonials />
      <CTA />
    </>
  );
}
