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

const ctaActionBtnClass =
  "min-h-12 w-full border-2 border-white bg-white px-5 text-accent shadow-md hover:bg-white/95 hover:text-accent sm:w-auto sm:min-w-[11.5rem] justify-center font-bold";

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
        return <ClipboardCheck className="mr-2 h-4 w-4 shrink-0" aria-hidden />;
      case "phone":
        return <Phone className="mr-2 h-4 w-4 shrink-0" aria-hidden />;
      default:
        return <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden />;
    }
  };

  return (
    <section
      className={cn(
        "section relative overflow-hidden py-12 sm:py-16 md:py-16",
        className,
      )}
    >
      <Image
        src="/assets/images/planta-nuclear.webp"
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-primary/55" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25" aria-hidden />

      <div className="relative z-10 container px-4 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-xl border border-white/18 bg-primary/88 px-5 py-7 shadow-[0_12px_40px_-12px_rgb(0_0_0_/_0.35)] backdrop-blur-[1px] sm:px-8 sm:py-9 md:px-10 md:py-10">
          <h2 className="text-center text-xl font-bold uppercase leading-snug tracking-[0.04em] text-white sm:text-2xl md:text-[1.625rem]">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/90 sm:text-base">
              {description}
            </p>
          )}
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            {primaryAction && (
              <Button
                href={primaryAction.href}
                size="lg"
                variant="outline"
                className={cn(ctaActionBtnClass, "uppercase tracking-wide")}
              >
                {primaryAction.label}
                {primaryAction.icon === "arrow" && getIcon("arrow")}
              </Button>
            )}
            {secondaryAction && (
              <Button
                href={secondaryAction.href}
                size="lg"
                variant="outline"
                className={cn(ctaActionBtnClass, "uppercase tracking-wide")}
              >
                {secondaryAction.icon &&
                  secondaryAction.icon !== "arrow" &&
                  getIcon(secondaryAction.icon)}
                {secondaryAction.label}
              </Button>
            )}
            {tertiaryAction && (
              <Button
                href={tertiaryAction.href}
                size="lg"
                variant="outline"
                className={cn(ctaActionBtnClass, "uppercase tracking-wide")}
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
