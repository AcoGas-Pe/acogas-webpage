import { PagesHero } from "@/components/sections/hero/pages-hero";
import { CotizarQuoteFlow } from "@/components/cotizar/cotizar-quote-flow";
import { Button } from "@/components/ui/button";
import { CONTACT, formatPhoneTel } from "@/lib/business-config";
import { getAllProducts } from "@/lib/products-data";
import { Metadata } from "next";
import { generateMetadataFromConfig } from "@/lib/seo-metadata";
import Link from "next/link";

export const metadata: Metadata = generateMetadataFromConfig("/cotizar/");

export default function CotizarPage() {
  const telHref = `tel:${formatPhoneTel(CONTACT.phone[0])}`;
  const products = getAllProducts();

  return (
    <>
      <PagesHero
        title="Solicitar cotización"
        subtitle="Propuestas técnicas y comerciales"
        description="Indíquenos su aplicación, fluido de trabajo y requisitos normativos. Nuestro equipo preparará una propuesta alineada a su operación, sin ofrecer productos aislados por catálogo."
        image="/assets/images/refiner3.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Cotizar", href: "/cotizar" },
        ]}
      />
      <CotizarQuoteFlow products={products} />
      <section className="section py-16 sm:py-20 md:py-24 bg-background">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
            La cotización puede incluir selección de equipo, dimensionamiento preliminar, plazos de suministro y
            condiciones comerciales según el alcance acordado. Para requerimientos urgentes, contáctenos por los
            canales corporativos indicados a continuación.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center flex-wrap">
            <Button href="/contacto?tipo=cotizacion" size="lg" className="w-full sm:w-auto min-h-12">
              Enviar solicitud por formulario
            </Button>
            <Button href={telHref} variant="outline" size="lg" className="w-full sm:w-auto min-h-12">
              Llamar ahora
            </Button>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Correo:{" "}
            <Link href={`mailto:${CONTACT.email[1]}`} className="text-primary hover:underline">
              {CONTACT.email[1]}
            </Link>
            {" · "}
            <Link href={`mailto:${CONTACT.email[0]}`} className="text-primary hover:underline">
              {CONTACT.email[0]}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
