import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ClipboardCheck, Phone } from "lucide-react";
import Image from "next/image";

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
  title = "Recibe una propuesta personalizada para tu industria",
  description = "Agende una visita técnica o diagnóstico sin compromiso. Nuestros especialistas analizan sus requerimientos y le presentan propuestas integrales, alineadas con los más altos estándares de seguridad y rentabilidad operativa.",
  primaryAction = {
    label: "Agendar Visita Técnica",
    href: "/contacto?tipo=visita",
    icon: "arrow",
  },
  secondaryAction = {
    label: "Solicitar Diagnóstico Profesional",
    href: "/contacto?tipo=diagnostico",
    icon: "clipboard",
  },
  tertiaryAction = {
    label: "Contactar Asesor",
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
      <Image
        src="/assets/images/refinery.webp"
        alt="CTA Background"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full sm:object-cover opacity-50"
        aria-hidden
      />
      <div className="absolute inset-0 bg-primary-muted/20" aria-hidden />

      <div className="relative z-10 px-12">
        <div className="text-center bg-card/80 border border-primary/20 p-6 sm:p-8 rounded-lg">
          <h2 className="text-2xl sm:text-4xl font-semibold text-primary-foreground leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-7xl sm:mt-5 text-xs sm:text-sm text-primary-foreground opacity-80 leading-relaxed mx-auto">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-8 sm:pt-10">
            {primaryAction && (
              <Button
                href={primaryAction.href}
                size="sm"
                className="min-h-12 w-full sm:w-auto bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:text-primary-foreground shadow-lg"
              >
                {primaryAction.label}
                <span className="hidden sm:block">{primaryAction.icon === "arrow" && <ArrowRight className="ml-2 w-4 h-4" />}</span>
              </Button>
            )}
            {secondaryAction && (
              <Button
                href={secondaryAction.href}
                variant="outline"
                size="sm"
                className="min-h-12 w-full sm:w-auto border-primary/30 text-primary-foreground bg-transparent hover:bg-primary/10 hover:border-primary/50"
              >
                <span className="hidden sm:block">{secondaryAction.icon !== "arrow" && getIcon(secondaryAction.icon)}</span>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
