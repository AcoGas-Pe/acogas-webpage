import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ClipboardCheck, Phone } from "lucide-react";

interface CTAAction {
  label: string;
  href: string;
  icon?: "arrow" | "clipboard" | "phone";
}

interface CTAProps {
  title?: string;
  description?: string;
  primaryAction?: CTAAction;
  secondaryAction?: CTAAction;
  tertiaryAction?: CTAAction;
  className?: string;
}

export function CTA({
  title = "¿Listo para optimizar su operación?",
  description = "Solicite una visita técnica o diagnóstico sin compromiso. Nuestro equipo evaluará sus necesidades y le propondrá la solución más segura y eficiente.",
  primaryAction = {
    label: "Solicitar Visita Técnica",
    href: "/contacto?tipo=visita",
    icon: "arrow",
  },
  secondaryAction = {
    label: "Solicitar Diagnóstico",
    href: "/contacto?tipo=diagnostico",
    icon: "clipboard",
  },
  tertiaryAction = {
    label: "Llamar Ahora",
    href: "tel:+51998345895",
    icon: "phone",
  },
  className,
}: CTAProps) {
  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case "clipboard":
        return <ClipboardCheck className="mr-2 w-4 h-4" />;
      case "phone":
        return <Phone className="mr-2 w-4 h-4" />;
      default:
        return <ArrowRight className="ml-2 w-4 h-4" />;
    }
  };
  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 md:py-24",
        className
      )}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary-muted to-background"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary-light)/0.2),transparent_70%)]" aria-hidden />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-primary-foreground/80 leading-relaxed max-w-xl mx-auto">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-8 sm:pt-10">
            {primaryAction && (
              <Button
                href={primaryAction.href}
                size="lg"
                className="min-h-12 w-full sm:w-auto bg-white text-primary-muted font-bold hover:bg-white/90 hover:text-primary shadow-lg"
              >
                {primaryAction.label}
                {primaryAction.icon === "arrow" && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            )}
            {secondaryAction && (
              <Button
                href={secondaryAction.href}
                variant="outline"
                size="lg"
                className="min-h-12 w-full sm:w-auto border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
              >
                {secondaryAction.icon !== "arrow" && getIcon(secondaryAction.icon)}
                {secondaryAction.label}
              </Button>
            )}
            {tertiaryAction && (
              <Button
                href={tertiaryAction.href}
                variant="ghost"
                size="lg"
                className="min-h-12 w-full sm:w-auto text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                {tertiaryAction.icon !== "arrow" && getIcon(tertiaryAction.icon)}
                {tertiaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
