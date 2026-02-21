import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  content: string;
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
    content:
      "Excelente servicio y atención. El suministro de gas es constante y confiable. Muy recomendado para cualquier operación industrial.",
  },
  {
    name: "María González",
    role: "Propietaria",
    company: "Distribuidora MGZ",
    content:
      "Llevamos años trabajando con Acogas y siempre han sido profesionales y puntuales. La mejor opción en soluciones de gas para nuestra planta.",
  },
  {
    name: "Carlos Rodríguez",
    role: "Director de Operaciones",
    company: "Industria XYZ",
    content:
      "Servicio de primera calidad. Su compromiso con la seguridad y eficiencia es excepcional. Nos acompañan desde el diseño hasta la puesta en marcha.",
  },
];

export function Testimonials({
  title = "Lo Que Dicen Nuestros Clientes",
  subtitle = "Testimonios",
  testimonials = defaultTestimonials,
  className,
}: TestimonialsProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background", className)}>
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          {subtitle && (
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
              {subtitle}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={cn(
                "card-base relative p-5 sm:p-6 md:p-8 flex flex-col group",
                index === 0 && "md:col-span-2"
              )}
            >
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/20 mb-4 shrink-0" />
              <blockquote
                className={cn(
                  "text-foreground/90 leading-relaxed flex-1 mb-6",
                  index === 0
                    ? "text-base sm:text-lg md:text-xl"
                    : "text-sm sm:text-base"
                )}
              >
                {t.content}
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {t.name}
                  </p>
                  {(t.role || t.company) && (
                    <p className="text-xs text-muted-foreground truncate">
                      {[t.role, t.company].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
