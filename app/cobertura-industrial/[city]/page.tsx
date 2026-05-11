import { getCityBySlug, getAllCitySlugs } from "@/lib/cities-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLdScripts } from "@/components/json-ld-scripts";
import {
  generateBreadcrumbSchema,
  getCityPlaceSchema,
  siteConfig,
} from "@/lib/seo-config";
import { generateDynamicMetadata } from "@/lib/seo-metadata";
import { Hero } from "@/components/sections/hero/hero";
import { StatsBar } from "@/components/sections/stats-bar/stats-bar";
import { IndustriesSolutionsBento } from "@/components/sections/industries-solutions/industries-solutions-bento";
import { Features } from "@/components/sections/features/features";
import { Clients } from "@/components/sections/clients/clients";
import { Testimonials } from "@/components/sections/testimonials/testimonials";
import { CTA } from "@/components/sections/cta/cta";
import { CityIndustries } from "@/components/sections/city/city-industries";
import { CityMap } from "@/components/sections/city/city-map";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: "Ciudad no encontrada" };

  return generateDynamicMetadata(`/cobertura-industrial/${slug}/`, {
    title: city.metaTitle,
    description: city.metaDescription,
    image: "/assets/images/revision-industria.webp",
    openGraphType: "website",
  });
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Cobertura Industrial", href: "/cobertura-industrial" },
    { label: city.name, href: `/cobertura-industrial/${city.slug}` },
  ];

  const pageUrl = `${siteConfig.url}/cobertura-industrial/${slug}/`;

  return (
    <>
      <JsonLdScripts
        pathname={`/cobertura-industrial/${slug}/`}
        includeBreadcrumb={false}
        extra={[
          generateBreadcrumbSchema([
            { name: "Inicio", url: siteConfig.url },
            {
              name: "Cobertura industrial",
              url: `${siteConfig.url}/cobertura-industrial/`,
            },
            { name: city.name, url: pageUrl },
          ]),
          getCityPlaceSchema({
            name: city.name,
            state: city.region || "Perú",
            description: city.metaDescription,
          }),
        ]}
      />
      <Hero
        title={city.hero.title}
        subtitle={city.hero.subtitle}
        description={city.hero.description}
        primaryAction={city.hero.primaryAction}
        secondaryAction={city.hero.secondaryAction}
        tertiaryAction={city.hero.tertiaryAction}
      />
      <Clients />
      <StatsBar stats={city.stats} />
      <IndustriesSolutionsBento />
      <CityIndustries city={city} />
      <Features />
      <CityMap city={city} />
      <Testimonials />
      <CTA />
    </>
  );
}
