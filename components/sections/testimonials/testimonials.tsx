import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Juan Pérez",
    role: "Gerente General",
    company: "Empresa ABC",
    content: "Excelente servicio y atención. El suministro de gas es constante y confiable. Muy recomendado.",
    rating: 5,
  },
  {
    name: "María González",
    role: "Propietaria",
    content: "Llevamos años trabajando con Acogas y siempre han sido profesionales y puntuales. La mejor opción.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Director de Operaciones",
    company: "Industria XYZ",
    content: "Servicio de primera calidad. Su compromiso con la seguridad y eficiencia es excepcional.",
    rating: 5,
  },
];

export function Testimonials({
  title = "Lo Que Dicen Nuestros Clientes",
  subtitle = "Testimonios",
  testimonials = defaultTestimonials,
  className,
}: TestimonialsProps) {
  return (
    <section className={cn("section min-h-[75dvh] mx-auto bg-background", className)}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {subtitle && (
              <p className="text-muted-foreground/80 text-sm mb-2">{subtitle}</p>
            )}
            <h2 className="text-4xl font-bold text-foreground">{title}</h2>
          </div>

          {/* Bento-style testimonials: first large, next two side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
            {testimonials.map((t, index) => {
              const isFeatured = index === 0;
              return (
                <div
                  key={index}
                  className={cn(
                    "card-base flex flex-col p-6",
                    isFeatured && "md:row-span-2 md:flex md:justify-center md:py-8"
                  )}
                >
                  {t.rating != null && (
                    <div className="mb-4 text-primary text-lg">
                      {"★".repeat(t.rating)}
                    </div>
                  )}
                  <p
                    className={cn(
                      "text-foreground leading-relaxed italic flex-1",
                      isFeatured ? "text-lg" : "text-base"
                    )}
                  >
                    "{t.content}"
                  </p>
                  <div className="border-t border-border pt-4 mt-4">
                    <p className="font-bold text-primary">{t.name}</p>
                    {(t.role || t.company) && (
                      <p className="text-sm text-muted-foreground">
                        {[t.role, t.company].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
