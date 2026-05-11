import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services-data";
import { productosUrlForServicioSlug } from "@/lib/servicios-product-catalog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import {
  generateBreadcrumbSchema,
  getServicePageSchema,
  siteConfig,
} from "@/lib/seo-config";
import { generateDynamicMetadata } from "@/lib/seo-metadata";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ServiceIntro } from "@/components/sections/servicio/service-intro";
import { IndustrialValueStrip } from "@/components/sections/shared/industrial-value-strip";
import { ServiceFeatures } from "@/components/sections/servicio/service-features";
import { ServiceBenefits } from "@/components/sections/servicio/service-benefits";
import { ServiceApplications } from "@/components/sections/servicio/service-applications";
import { ServiceFAQ } from "@/components/sections/servicio/service-faq";
import { Clients } from "@/components/sections/clients/clients";
import { CTA } from "@/components/sections/cta/cta";
import { CONTACT, formatPhoneTel } from "@/lib/business-config";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Servicio no encontrado" };

  return generateDynamicMetadata(`/servicios/${slug}/`, {
    title: service.metaTitle,
    description: service.metaDescription,
    image: service.heroImage || "/assets/images/revision-refineria.webp",
    openGraphType: "website",
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const pageUrl = `${siteConfig.url}/servicios/${slug}/`;
  const telHref = `tel:${formatPhoneTel(CONTACT.phone[0])}`;

  return (
    <>
      <JsonLdScripts
        pathname={`/servicios/${slug}/`}
        includeBreadcrumb={false}
        extra={[
          generateBreadcrumbSchema([
            { name: "Inicio", url: siteConfig.url },
            { name: "Servicios", url: `${siteConfig.url}/servicios/` },
            { name: service.shortTitle, url: pageUrl },
          ]),
          getServicePageSchema({
            name: service.title,
            description: service.metaDescription,
            url: pageUrl,
            serviceType: service.shortTitle,
            image: service.heroImage,
          }),
        ]}
      />
      <PagesHero
        title={service.title}
        subtitle={service.shortTitle}
        description={service.description}
        image={service.heroImage || "/assets/images/revision-refineria.webp"}
        primaryAction={{ label: "Solicitar cotización", href: `/contacto?servicio=${service.slug}` }}
        secondaryAction={{
          label: "Ver productos filtrados",
          href: productosUrlForServicioSlug(service.slug),
        }}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios/" },
          { label: service.shortTitle, href: `/servicios/${service.slug}/` },
        ]}
      />

      <ServiceIntro service={service} />
      <IndustrialValueStrip headingId="servicio-propuesta-valor-heading" />
      <ServiceFeatures service={service} />
      <ServiceBenefits service={service} />
      <Clients subtitle="Marcas líderes" />
      <ServiceApplications service={service} />
      <ServiceFAQ service={service} />
      <CTA
        title={`¿Siguiente paso para ${service.shortTitle}?`}
        description={service.ctaDescription}
        primaryAction={{
          label: "Contactar por este servicio",
          href: `/contacto?servicio=${service.slug}`,
          icon: "arrow",
        }}
        secondaryAction={{
          label: "Preguntas frecuentes",
          href: "/preguntas-frecuentes/",
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
