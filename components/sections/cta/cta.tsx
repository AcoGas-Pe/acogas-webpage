import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAProps {
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  variant?: "default" | "primary" | "accent";
  className?: string;
}

export function CTA({
  title = "¿Listo para Comenzar?",
  description = "Contáctanos hoy y descubre cómo podemos ayudarte con tus necesidades de gas y energía.",
  primaryAction = {
    label: "Contactar Ahora",
    href: "/contacto",
  },
  secondaryAction,
  variant = "default",
  className,
}: CTAProps) {
  const isLight = variant === "default";
  const sectionClass = isLight
    ? "bg-background-light text-light-foreground"
    : variant === "primary"
      ? "bg-primary text-primary-foreground"
      : "bg-accent text-accent-foreground";

  const textColor = isLight ? "text-light-foreground" : "text-white";
  const mutedColor = isLight ? "text-light-foreground/80" : "text-white/90";

  return (
    <section
      className={cn(
        "section min-h-[60dvh] flex items-center justify-center",
        sectionClass,
        className
      )}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className={cn("text-4xl font-bold", textColor)}>{title}</h2>
          {description && (
            <p className={cn("text-lg leading-relaxed", mutedColor)}>
              {description}
            </p>
          )}
          <p className="italic font-semibold text-primary text-center text-xl">
            “Liderar la industria con tecnología, criterio y responsabilidad.”
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            {primaryAction && (
              <Button
                href={primaryAction.href}
                size="lg"
                variant={isLight ? "default" : "secondary"}
                className={isLight ? "bg-primary text-primary-foreground hover:bg-primary-light" : ""}
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                href={secondaryAction.href}
                variant="outline"
                size="lg"
                className={isLight ? "border-primary text-primary hover:bg-primary/10" : "border-white text-white hover:bg-white/10"}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
