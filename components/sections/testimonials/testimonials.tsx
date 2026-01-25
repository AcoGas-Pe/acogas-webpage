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
    <section className={cn("section flex items-center justify-center bg-background", className)}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {subtitle}
              </p>
            )}
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {title}
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-muted p-8 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] hover:shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-4px_rgb(0_0_0_/_0.1)] transition-all duration-200 hover:-translate-y-1"
              >
                {/* Rating */}
                {testimonial.rating && (
                  <div className="mb-4 text-accent text-lg">
                    {"★".repeat(testimonial.rating)}
                  </div>
                )}
                
                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  {testimonial.role && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
