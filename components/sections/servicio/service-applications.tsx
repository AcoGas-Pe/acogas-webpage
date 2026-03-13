"use client";

import { cn } from "@/lib/utils";
import { Service } from "@/domain/service";
import { ArrowRight } from "lucide-react";

interface ServiceApplicationsProps {
  service: Service;
  className?: string;
}

export function ServiceApplications({ service, className }: ServiceApplicationsProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background-alt", className)}>
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Aplicaciones
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Sectores Industriales
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Nuestras soluciones de {service.shortTitle.toLowerCase()} se aplican en diversos sectores industriales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {service.applications.map((app, index) => (
            <div
              key={index}
              className="card-base p-5 flex items-start gap-4 hover:border-primary/30 transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-foreground mb-1">{app.industry}</h3>
                <p className="text-sm text-muted-foreground">{app.useCase}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
