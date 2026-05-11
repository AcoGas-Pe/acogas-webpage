import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import {
  CONTACT,
  formatPhoneTel,
  getIndustryBySlug,
  PRODUCT_INDUSTRY_SLUGS,
} from "@/lib/business-config";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import {
  generateBreadcrumbSchema,
  getWebPageSchema,
  siteConfig,
} from "@/lib/seo-config";
import { generateDynamicMetadata } from "@/lib/seo-metadata";
import { IndustrialValueStrip } from "@/components/sections/shared/industrial-value-strip";
import { IndustriaIntro } from "@/components/sections/industria/industria-intro";
import { IndustriaCapacidades } from "@/components/sections/industria/industria-capacidades";
import { IndustriaFaq } from "@/components/sections/industria/industria-faq";
import { Clients } from "@/components/sections/clients/clients";
import { CTA } from "@/components/sections/cta/cta";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCT_INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) {
    return { title: "Industria no encontrada" };
  }

  const title = `${industry.name} | Industrias | ${siteConfig.name}`;
  const description =
    industry.description ??
    `${industry.name}: soluciones industriales en GLP, gas natural, vapor y procesos con Acogas.`;

  return generateDynamicMetadata(`/industrias/${slug}/`, {
    title,
    description,
    image: industry.image,
    openGraphType: "website",
  });
}

export default async function IndustriaSectorPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const pageUrl = `${siteConfig.url}/industrias/${slug}/`;
  const telHref = `tel:${formatPhoneTel(CONTACT.phone[0])}`;

  return (
    <>
      <JsonLdScripts
        pathname={`/industrias/${slug}/`}
        includeBreadcrumb={false}
        extra={[
          generateBreadcrumbSchema([
            { name: "Inicio", url: siteConfig.url },
            { name: "Industrias", url: `${siteConfig.url}/industrias/` },
            { name: industry.name, url: pageUrl },
          ]),
          getWebPageSchema({
            name: `${industry.name} | Industrias`,
            description: industry.description,
            url: pageUrl,
          }),
        ]}
      />
      <PagesHero
        title={industry.name}
        subtitle="Industrias"
        description={industry.description}
        image={industry.image}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Industrias", href: "/industrias/" },
          { label: industry.name, href: industry.url },
        ]}
        primaryAction={{
          label: "Solicitar visita técnica",
          href: "/contacto/?tipo=visita",
        }}
        secondaryAction={{ label: "Ver productos", href: "/productos/" }}
      />

      <IndustriaIntro industry={industry} />
      <IndustrialValueStrip headingId={`industria-propuesta-valor-${industry.slug}`} />
      <IndustriaCapacidades industry={industry} />
      <Clients subtitle="Marcas líderes" />
      <IndustriaFaq industry={industry} />
      <CTA
        title={`¿Seguimos con ${industry.name}?`}
        description="Coordine visita técnica, cotización o diagnóstico. Respondemos con criterio de ingeniería y marcas líderes en GLP, gas natural y vapor."
        primaryAction={{
          label: "Programar visita técnica",
          href: "/contacto/?tipo=visita",
          icon: "arrow",
        }}
        secondaryAction={{
          label: "Solicitar cotización",
          href: "/cotizar/",
          icon: "clipboard",
        }}
        tertiaryAction={{
          label: "Llamar ahora",
          href: telHref,
          icon: "phone",
        }}
      />
    </>
  );
}
