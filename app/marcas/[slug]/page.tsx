import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagesHero } from "@/components/sections/hero/pages-hero";
import { CTA } from "@/components/sections/cta/cta";
import {
  getStrategicBrandBySlug,
  getAllStrategicBrandSlugs,
  STRATEGIC_PARTNERS_CLOSING,
} from "@/lib/strategic-brands";
import { siteConfig } from "@/lib/seo-config";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllStrategicBrandSlugs().map((slug) => ({ slug }));
}

function truncateMeta(s: string, max: number): string {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1).trim()}…`;
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getStrategicBrandBySlug(slug);
  if (!brand) {
    return { title: "Marca no encontrada" };
  }
  const title = `${brand.name} | ${siteConfig.name}`;
  const description = truncateMeta(brand.shortDescription, 160);
  const canonical = `${siteConfig.url}/marcas/${slug}/`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: siteConfig.name,
    },
  };
}

export default async function MarcaPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getStrategicBrandBySlug(slug);
  if (!brand) notFound();

  const displayTitle = brand.line ? `${brand.name} · ${brand.line}` : brand.name;

  return (
    <>
      <PagesHero
        title={brand.name}
        subtitle={brand.line}
        description={brand.shortDescription}
        image="/assets/images/refinery.webp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Marcas", href: "/marcas/" },
          { label: brand.name, href: `/marcas/${brand.slug}/` },
        ]}
        primaryAction={{ label: "Solicitar información", href: "/contacto/" }}
        secondaryAction={{ label: "Todas las marcas", href: "/marcas/" }}
      />

      <section className="section py-10 sm:py-14 bg-background">
        <div className="container max-w-3xl mx-auto px-4">
          {brand.logo ? (
            <div className="flex justify-center mb-8">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={220}
                height={88}
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
          ) : null}
          <h2 className="sr-only">{displayTitle}</h2>
          <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
            {brand.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-10 pt-8 border-t border-border text-sm text-foreground/80 italic">
            {STRATEGIC_PARTNERS_CLOSING}
          </p>
          <p className="mt-6">
            <Link
              href="/marcas/"
              className="text-primary font-medium hover:underline"
            >
              ← Volver a socios estratégicos
            </Link>
          </p>
        </div>
      </section>

      <CTA
        title="¿Desea avanzar con esta marca en su proyecto?"
        description="Le ayudamos a dimensionar equipos, integrar soluciones y acompañar la puesta en marcha con criterio técnico."
        primaryAction={{ label: "Contactar", href: "/contacto/", icon: "arrow" }}
        secondaryAction={{ label: "Catálogo de productos", href: "/productos/", icon: "clipboard" }}
        tertiaryAction={{ label: "Llamar ahora", href: "tel:+51998345895", icon: "phone" }}
      />
    </>
  );
}
