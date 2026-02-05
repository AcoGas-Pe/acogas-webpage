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
  const variantStyles = {
    default: "bg-background",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  const textColor = variant === "primary" || variant === "accent" 
    ? "text-white" 
    : "text-foreground";

  return (
    <section className={cn("section !min-h-[60dvh] !h-[60dvh] flex items-center justify-center", variantStyles[variant], className)}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className={cn("text-4xl md:text-5xl font-bold", textColor)}>
            {title}
          </h2>
          
          {description && (
            <p className={cn("text-lg md:text-xl leading-relaxed", variant === "primary" || variant === "accent" ? "text-white/90" : "text-muted-foreground")}>
              {description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            {primaryAction && (
              <Button 
                href={primaryAction.href}
                size="lg"
                variant={variant === "primary" || variant === "accent" ? "secondary" : "default"}
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button 
                href={secondaryAction.href}
                variant={variant === "primary" || variant === "accent" ? "outline" : "outline"}
                size="lg"
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
