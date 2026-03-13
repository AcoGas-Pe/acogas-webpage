"use client";

import { cn } from "@/lib/utils";
import { Service } from "@/domain/service";
import { Star } from "lucide-react";

interface ServiceBenefitsProps {
  service: Service;
  className?: string;
}

export function ServiceBenefits({ service, className }: ServiceBenefitsProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background", className)}>
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Beneficios
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            ¿Por qué elegirnos?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {service.benefits.map((benefit, index) => (
            <div
              key={index}
              className="card-base card-tint-2 p-5 sm:p-6 text-center hover:-translate-y-0.5 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
