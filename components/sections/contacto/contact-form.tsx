"use client";

import { cn } from "@/lib/utils";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

interface ContactFormProps {
  className?: string;
}

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+51 (01) 234-5678",
    href: "tel:+5101234567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contacto@acogas.com.pe",
    href: "mailto:contacto@acogas.com.pe",
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: "Lima, Perú",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun - Vie: 8:00 - 18:00",
  },
];

export function ContactForm({ className }: ContactFormProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background", className)}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
                Información de Contacto
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Hablemos de su proyecto
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Nuestro equipo técnico está listo para ayudarle a encontrar la
                solución correcta para su operación.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const Wrapper = item.href ? "a" : "div";
                return (
                  <Wrapper
                    key={item.label}
                    {...(item.href ? { href: item.href } : {})}
                    className={cn(
                      "card-base card-accent flex items-center gap-4 p-4",
                      item.href && "hover:-translate-y-0.5 cursor-pointer"
                    )}
                  >
                    <div className="shrink-0 w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.value}
                      </p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>

          {/* HubSpot Form */}
          <div className="lg:col-span-3">
            <div className="card-base p-5 sm:p-6 md:p-8">
              <HubSpotForm
                portalId="50826545"
                formId="c2e45d2b-814d-4871-9c28-35cef611b42b"
                region="na1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
