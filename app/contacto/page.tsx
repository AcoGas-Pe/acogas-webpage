import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ContactForm } from "@/components/sections/contacto/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Acogas Industrial",
  description: "Contáctenos para solicitar una visita técnica, cotización o soporte. Estamos listos para ayudarle con sus necesidades de GLP, Gas Natural y Vapor.",
};

export default function ContactoPage() {
  return (
    <>
      <PagesHero
        title="Contáctenos"
        subtitle="Contacto"
        description="Solicite una visita técnica, cotización o soporte. Nuestro equipo está listo para atenderle."
        image="/assets/images/refiner3.jpg"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Contacto", href: "/contacto" },
        ]}
      />
      <ContactForm />
    </>
  );
}
