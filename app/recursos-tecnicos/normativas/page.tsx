import { CTA } from "@/components/sections/cta/cta";
import { NormativasPdfDownloads } from "@/components/sections/recursos/normativas-pdf-downloads";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { BUSINESS_INFO } from "@/lib/business-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Normativas y cumplimiento | ${BUSINESS_INFO.name}`,
  description:
    "Mapa normativo Perú e internacional para GLP, gas natural, vapor y procesos industriales: DS, OSINERGMIN, NTP y estándares NFPA, ASME, API, IEC. Rutas oficiales de consulta.",
};

export default function RecursosTecnicosNormativasPage() {
  return (
    <>
      <PagesHero
        title="Normativas y cumplimiento"
        subtitle="Recursos técnicos"
        description="Marco peruano, NTP y estándares internacionales de referencia para diseño, operación y fiscalización en GLP, gas natural y vapor."
        image="/assets/images/refiner2.webp"
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
