import { Hero } from "@/components/sections/hero/hero";
import { HeroCarousel } from "@/components/sections/hero/hero-carousel";
import { StatsBar } from "@/components/sections/stats-bar/stats-bar";
import { IndustriesSolutionsBento } from "@/components/sections/industries-solutions/industries-solutions-bento";
import { Features } from "@/components/sections/features/features";
import { Clients } from "@/components/sections/clients/clients";
import { Coverage } from "@/components/sections/coverage/coverage";
import { Testimonials } from "@/components/sections/testimonials/testimonials";
import { CTA } from "@/components/sections/cta/cta";
import { Novedades } from "@/components/sections/novedades/novedades";
import { Metadata } from "next";
import {
  generateMetadataFromConfig,
  generateStructuredData,
} from "@/lib/seo-metadata";
import { CONTACT, formatPhoneTel } from "@/lib/business-config";
import { PRIMARY_SLOGAN, TECH_COMMERCIAL_SLOGAN } from "@/lib/strategic-brands";

export const metadata: Metadata = generateMetadataFromConfig("/");

export default function Home() {
  const structuredData = generateStructuredData("/");

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
        title="Ingeniería aplicada a GLP, gas natural, vapor y procesos industriales."
        subtitle="Control y Criterio"
        description={`${PRIMARY_SLOGAN} Más de cincuenta años acompañando a la industria peruana con criterio técnico, marcas de referencia mundial y presencia en campo.`}
        primaryAction={{
          label: "Llamar ahora",
          href: `tel:${formatPhoneTel(CONTACT.phone[0])}`,
        }}
        secondaryAction={{
          label: "Programar visita técnica",
          href: "/contacto?tipo=visita",
        }}
        tertiaryAction={{
          label: "Solicitar diagnóstico",
          href: "/contacto?tipo=diagnostico",
        }}
        noBackground
      />
      <Clients />
      <StatsBar />
      <IndustriesSolutionsBento />
      <Features />
      <Coverage />
      <Testimonials />
      <CTA />
      <Novedades />
    </>
  );
}
