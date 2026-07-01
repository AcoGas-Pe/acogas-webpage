import { PagesHero } from "@/components/sections/hero/pages-hero";
import { LegalDocument } from "@/components/sections/legal/legal-document";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { LEGAL_LAST_UPDATED, TERMS_SECTIONS } from "@/lib/legal-content";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataFromConfig(
  "/terminos-y-condiciones/",
);

export default function TerminosYCondicionesPage() {
  return (
    <>
      <JsonLdScripts pathname="/terminos-y-condiciones/" />
      <PagesHero
        title="Términos y Condiciones"
        subtitle="Legal"
        description="Condiciones de uso del sitio web y de la información publicada por Acogas."
        image="/assets/images/refinery.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          {
            label: "Términos y Condiciones",
            href: "/terminos-y-condiciones/",
          },
        ]}
      />
      <LegalDocument
        sections={TERMS_SECTIONS}
        lastUpdated={LEGAL_LAST_UPDATED}
      />
    </>
  );
}
