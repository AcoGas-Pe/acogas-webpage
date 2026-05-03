import { CTA } from "@/components/sections/cta/cta";
import { CertificadosPdfDownloads } from "@/components/sections/recursos/certificados-pdf-downloads";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { CERTIFICADOS_DOWNLOAD_GATE_SLUG } from "@/lib/certificados-pdfs-data";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataFromConfig(
  "/recursos-tecnicos/certificados/"
);

export default function RecursosTecnicosCertificadosPage() {
  return (
    <>
      <PagesHero
        title="Certificados de fabricante"
        subtitle="Recursos técnicos"
        description="Certificaciones ISO, SIL, UL y demás documentación oficial disponible para las marcas Fisher, Tartarini y Spence."
        image="/assets/images/refiner2.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Recursos técnicos", href: "/recursos-tecnicos/" },
          { label: "Certificados", href: "/recursos-tecnicos/certificados/" },
        ]}
      />
      <CertificadosPdfDownloads
        gateSlug={CERTIFICADOS_DOWNLOAD_GATE_SLUG}
        sectionTitle="Certificados disponibles"
        description="Tras completar el formulario podrá descargar los certificados y documentos asociados a cada marca."
      />
      <CTA
        title="¿Necesita otro documento o validación técnica?"
        description="Indíquenos marca, norma o proyecto y le orientamos con la documentación adecuada."
        primaryAction={{
          label: "Contactar",
          href: "/contacto/",
          icon: "arrow",
        }}
        secondaryAction={{
          label: "Normativas",
          href: "/recursos-tecnicos/normativas/",
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
