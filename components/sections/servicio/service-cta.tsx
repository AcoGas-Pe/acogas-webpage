"use client";

import { cn } from "@/lib/utils";
import { Service } from "@/domain/service";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

interface ServiceCTAProps {
  service: Service;
  className?: string;
}

export function ServiceCTA({ service, className }: ServiceCTAProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-primary", className)}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {service.ctaTitle}
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 mb-8">
            {service.ctaDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={`/contacto?servicio=${service.slug}`}
              size="lg"
              variant="secondary"
              className="min-h-12"
            >
              <Mail className="w-4 h-4 mr-2" />
              Solicitar Cotización
            </Button>
            <Button
              href="tel:+5113494500"
              size="lg"
              variant="outline"
              className="min-h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Phone className="w-4 h-4 mr-2" />
              Llamar Ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
