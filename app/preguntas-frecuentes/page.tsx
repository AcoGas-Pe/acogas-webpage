import { PagesHero } from "@/components/sections/hero/pages-hero";
import { SiteFaqAccordion } from "@/components/sections/recursos/site-faq-accordion";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { SITE_FAQ_ITEMS } from "@/lib/site-faq-data";
import { getFAQSchema } from "@/lib/seo-config";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataFromConfig(
  "/preguntas-frecuentes/",
);

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <JsonLdScripts
        pathname="/preguntas-frecuentes/"
        extra={[getFAQSchema({ questions: SITE_FAQ_ITEMS })]}
      />

      <PagesHero
        title="Preguntas frecuentes"
        subtitle="Soporte"
        description="Aclaraciones rápidas sobre marcas, visitas técnicas, normativa, tiempos de respuesta y cobertura."
        image="/assets/images/refinery.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Preguntas frecuentes", href: "/preguntas-frecuentes/" },
        ]}
      />

      <section className="section bg-background-alt py-16 sm:py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <SiteFaqAccordion items={SITE_FAQ_ITEMS} />
          </div>
        </div>
      </section>
    </>
  );
}
