import { PagesHero } from "@/components/sections/hero/pages-hero";
import { LegalDocument } from "@/components/sections/legal/legal-document";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { LEGAL_LAST_UPDATED, PRIVACY_POLICY_SECTIONS } from "@/lib/legal-content";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataFromConfig(
  "/politica-de-privacidad/",
);

export default function PoliticaDePrivacidadPage() {
  return (
    <>
      <JsonLdScripts pathname="/politica-de-privacidad/" />
      <PagesHero
        title="Política de Privacidad"
        subtitle="Legal"
        description="Cómo recopilamos, usamos y protegemos sus datos personales cuando interactúa con Acogas."
        image="/assets/images/refinery.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          {
            label: "Política de Privacidad",
            href: "/politica-de-privacidad/",
          },
        ]}
      />
      <LegalDocument
        sections={PRIVACY_POLICY_SECTIONS}
        lastUpdated={LEGAL_LAST_UPDATED}
      />
    </>
  );
}
