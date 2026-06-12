import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getAllServices } from "@/lib/services-data";
import { productosUrlForServicioSlug } from "@/lib/servicios-product-catalog";
import { getFeatureIcon } from "@/lib/section-icons";

interface ServicesGridProps {
  className?: string;
}

/** Textos cortos alineados a la maquetación (bullets). */
const CARD_BULLETS: Record<string, string[]> = {
  "ingenieria-dimensionamiento": [
    "Ingeniería conceptual y de detalle",
    "Dimensionamiento de equipos",
    "Especificaciones técnicas a medida",
  ],
  "seleccion-equipos": [
    "Asesoría técnica especializada",
    "Comparativa de alternativas",
    "Recomendaciones según normativa",
  ],
  "diagnostico-tecnico": [
    "Inspección en campo",
    "Análisis de condiciones operativas",
    "Informe técnico con recomendaciones",
  ],
  "soporte-tecnico": [
    "Atención telefónica y remota",
    "Resolución de problemas operativos",
    "Consultas técnicas especializadas",
  ],
  "mantenimiento-industrial": [
    "Mantenimiento preventivo programado",
    "Mantenimiento correctivo",
    "Repuestos originales certificados",
  ],
};

export function ServicesGrid({ className }: ServicesGridProps) {
  const services = getAllServices();
  const firstRow = services.slice(0, 3);
  const secondRow = services.slice(3, 5);

  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-border/40 bg-background-alt py-16 sm:py-20 md:py-24",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 bottom-0 top-8 z-0 w-[min(55vw,28rem)] opacity-[0.12] sm:opacity-[0.16]"
        aria-hidden
      >
        <Image
          src="/assets/images/isotipo-fondo.webp"
          alt="Isotipo decorativo ACOGAS"
          fill
          className="object-contain object-right-top"
          sizes="(max-width: 768px) 80vw, 28rem"
        />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Lo que ofrecemos
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-primary">
            Servicios y soluciones
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Soluciones técnicas integrales respaldadas por más de 50 años de
            experiencia y las mejores marcas de la industria.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {firstRow.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        {secondRow.length > 0 ? (
          <div className="mt-4 sm:mt-5 flex flex-col items-stretch gap-4 sm:gap-5 md:flex-row md:flex-wrap md:justify-center">
            {secondRow.map((service) => (
              <div
                key={service.slug}
                className="w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)] lg:max-w-md"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: ReturnType<typeof getAllServices>[number] }) {
  const bullets = CARD_BULLETS[service.slug] ?? [];
  const ctaHref = productosUrlForServicioSlug(service.slug);
  const img = service.heroImage ?? "/assets/images/revision-refineria.webp";
  const ServiceIcon = getFeatureIcon(service.title, 0);

  return (
    <article className="card-base group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-card hover:-translate-y-0.5">
      <div className="relative aspect-[16/10] w-full bg-muted">
        <Image
          src={img}
          alt={`Servicio ${service.title} — imagen ilustrativa`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/90 text-primary shadow-sm">
          <ServiceIcon className="h-5 w-5" aria-hidden />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-primary">
            {service.title}
          </h3>
          <p className="text-xs font-semibold text-accent sm:text-sm">
            {service.description}
          </p>
        </div>
        <p className="line-clamp-4 text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
          {service.longDescription}
        </p>
        {bullets.length > 0 ? (
          <ul className="space-y-1.5">
            {bullets.map((f) => (
              <li
                key={f}
                className="text-xs sm:text-sm text-foreground/80 flex items-start gap-2"
              >
                <span className="text-accent mt-0.5 shrink-0">▸</span>
                {f}
              </li>
            ))}
          </ul>
        ) : null}
        <Button
          href={ctaHref}
          variant="link"
          size="sm"
          className="w-fit p-0 h-auto text-primary gap-1"
        >
          Ver catálogo filtrado <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </article>
  );
}
