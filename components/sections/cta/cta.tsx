import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ClipboardCheck, Phone } from "lucide-react";
import Image from "next/image";
import { CONTACT, formatPhoneTel } from "@/lib/business-config";

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

const defaultTel = `tel:${formatPhoneTel(CONTACT.phone[0])}`;

export function CTA({
  title = "¿Desea una propuesta alineada a su operación?",
  description =
    "Coordine una visita técnica o un diagnóstico con nuestros especialistas. Analizamos su requerimiento con criterio de ingeniería y normativa aplicable, sin comprometer lo que no podemos respaldar en campo.",
  primaryAction = {
    label: "Programar visita técnica",
    href: "/contacto?tipo=visita",
    icon: "arrow",
  },
  secondaryAction = {
    label: "Solicitar diagnóstico",
    href: "/contacto?tipo=diagnostico",
    icon: "clipboard",
  },
  tertiaryAction = {
    label: "Llamar ahora",
    href: defaultTel,
    icon: "phone",
  },
  className,
}: CTAProps) {
  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case "clipboard":
        return <ClipboardCheck className="mr-2 w-4 h-4 shrink-0" aria-hidden />;
      case "phone":
        return <Phone className="mr-2 w-4 h-4 shrink-0" aria-hidden />;
      default:
        return <ArrowRight className="ml-2 w-4 h-4 shrink-0" aria-hidden />;
    }
  };
  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 md:py-24",
        className
      )}
    >
      <Image
        src="/assets/images/refinery.webp"
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full sm:object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-primary/80" aria-hidden />

      <div className="relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="text-center glass-panel backdrop-blur-xs rounded-xl p-6 sm:p-8 max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-3xl sm:mt-5 text-sm sm:text-base text-white opacity-80 leading-relaxed mx-auto">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-8 sm:pt-10">
            {primaryAction && (
              <Button
                href={primaryAction.href}
                size="lg"
                className="min-h-12 w-full sm:w-auto sm:min-w-[200px] bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:text-primary-foreground shadow-lg inline-flex justify-center"
              >
                {primaryAction.label}
                {primaryAction.icon === "arrow" && getIcon("arrow")}
              </Button>
            )}
            {secondaryAction && (
              <Button
                href={secondaryAction.href}
                variant="outline"
                size="lg"
                className="min-h-12 w-full sm:w-auto sm:min-w-[200px] border-primary text-primary bg-transparent hover:text-primary hover:bg-primary/10 hover:border-primary inline-flex justify-center"
              >
                {secondaryAction.icon && secondaryAction.icon !== "arrow" && getIcon(secondaryAction.icon)}
                {secondaryAction.label}
              </Button>
            )}
            {tertiaryAction && (
              <Button
                href={tertiaryAction.href}
                variant="outline"
                size="lg"
                className="min-h-12 w-full sm:w-auto sm:min-w-[200px] border-border text-foreground hover:text-primary bg-background/80 hover:bg-background inline-flex justify-center"
              >
                {getIcon(tertiaryAction.icon ?? "phone")}
                {tertiaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
