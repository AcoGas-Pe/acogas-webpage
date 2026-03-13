import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { ServiceFeatures } from "@/components/sections/servicio/service-features";
import { ServiceBenefits } from "@/components/sections/servicio/service-benefits";
import { ServiceApplications } from "@/components/sections/servicio/service-applications";
import { ServiceFAQ } from "@/components/sections/servicio/service-faq";
import { ServiceCTA } from "@/components/sections/servicio/service-cta";
import { Clients } from "@/components/sections/clients/clients";

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
  
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <PagesHero
        title={service.title}
        subtitle={service.shortTitle}
        description={service.description}
        image={service.heroImage || "/assets/images/refinery.webp"}
        primaryAction={{ label: "Solicitar Cotización", href: `/contacto?servicio=${service.slug}` }}
        secondaryAction={{ label: "Ver Productos", href: "/productos" }}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: service.shortTitle, href: `/servicios/${service.slug}` },
        ]}
      />

      <section className="section py-12 sm:py-16 bg-background">
        <div className="container max-w-4xl mx-auto">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {service.longDescription}
          </p>
        </div>
      </section>

      <ServiceFeatures service={service} />
      <ServiceBenefits service={service} />
      <Clients />
      <ServiceApplications service={service} />
      <ServiceFAQ service={service} />
      <ServiceCTA service={service} />
    </>
  );
}
