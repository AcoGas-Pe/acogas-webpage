import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    title: "Seguridad Garantizada",
    description: "Cumplimos con los más altos estándares de seguridad en el manejo y distribución de gas.",
  },
  {
    title: "Servicio Confiable",
    description: "Suministro continuo y confiable para hogares y empresas las 24 horas del día.",
  },
  {
    title: "Atención Personalizada",
    description: "Equipo profesional dedicado a brindar el mejor servicio y atención al cliente.",
  },
];

export function Features({
  title = "Por Qué Elegirnos",
  subtitle = "Nuestras Ventajas",
  features = defaultFeatures,
  className,
}: FeaturesProps) {
  return (
    <section className={cn("section flex items-center justify-center bg-muted", className)}>
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

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-8 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] hover:shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-4px_rgb(0_0_0_/_0.1)] transition-all duration-200 hover:-translate-y-1"
              >
                {feature.icon && (
                  <div className="mb-4 text-primary text-4xl">
                    {feature.icon}
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
