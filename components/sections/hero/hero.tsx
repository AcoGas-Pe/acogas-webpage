import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function Hero({
  title = "Soluciones Profesionales en Gas y Energía",
  subtitle = "Confianza y Calidad",
  description = "Comprometidos con la excelencia en el suministro de gas y energía para hogares y empresas. Seguridad, confiabilidad y servicio de primera clase.",
  primaryAction = {
    label: "Contactar",
    href: "/contacto",
  },
  secondaryAction,
  className,
}: HeroProps) {
  return (
    <section className={cn("section flex items-center justify-center bg-background", className)}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              {subtitle}
            </p>
          )}
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {title}
          </h1>
          
          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            {primaryAction && (
              <Button href={primaryAction.href} size="lg">
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button href={secondaryAction.href} variant="outline" size="lg">
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
