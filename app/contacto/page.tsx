import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ContactForm } from "@/components/sections/contacto/contact-form";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import type { Metadata } from "next";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";

export const metadata: Metadata = generateMetadataFromConfig("/contacto/");

export default function ContactoPage() {
  return (
    <>
      <JsonLdScripts pathname="/contacto/" />
      <PagesHero
        title="Contactenos"
        subtitle="Contacto"
        description="Solicite una visita técnica, cotización o soporte. Nuestro equipo está listo para atenderle."
        image="/assets/images/agricola-revision.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Contacto", href: "/contacto" },
        ]}
      />
      <ContactForm />
    </>
  );
}
