import { CTA } from "@/components/sections/cta/cta";
import { NormativasPdfDownloads } from "@/components/sections/recursos/normativas-pdf-downloads";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import type { Metadata } from "next";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";

export const metadata: Metadata = generateMetadataFromConfig(
  "/recursos-tecnicos/normativas/",
);

export default function RecursosTecnicosNormativasPage() {
  return (
    <>
      <JsonLdScripts pathname="/recursos-tecnicos/normativas/" />
      <PagesHero
        title="Normativas y cumplimiento"
        subtitle="Recursos técnicos"
        description="Marco peruano, NTP y estándares internacionales de referencia para diseño, operación y fiscalización en GLP, gas natural y vapor."
        image="/assets/images/mineria.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Recursos técnicos", href: "/recursos-tecnicos/" },
          { label: "Normativas", href: "/recursos-tecnicos/normativas" },
        ]}
      />
      <NormativasPdfDownloads requireDownloadGate={false} />
      <CTA
        title="¿Desea profundizar en su requerimiento?"
        description="Coordine una visita técnica, un diagnóstico o una conversación con nuestro equipo comercial. Respondemos con criterio de ingeniería y trazabilidad normativa."
        primaryAction={{
          label: "Programar visita técnica",
          href: "/contacto?tipo=visita",
          icon: "arrow",
        }}
        secondaryAction={{
          label: "Solicitar diagnóstico",
          href: "/contacto?tipo=diagnostico",
          icon: "clipboard",
        }}
        tertiaryAction={{
          label: "Llamar ahora",
          href: "tel:+51998345895",
          icon: "phone",
        }}
      />
    </>
  );
}
