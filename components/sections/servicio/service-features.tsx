"use client";

import { cn } from "@/lib/utils";
import { Service } from "@/domain/service";
import { CheckCircle2 } from "lucide-react";

interface ServiceFeaturesProps {
  service: Service;
  className?: string;
}

export function ServiceFeatures({ service, className }: ServiceFeaturesProps) {
  return (
    <section className={cn("section py-16 sm:py-20 md:py-24 bg-background-alt", className)}>
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-accent mb-2">
            Características
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Lo que ofrecemos en {service.shortTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {service.features.map((feature, index) => (
            <div
              key={index}
              className="card-base p-6 flex gap-4 hover:-translate-y-0.5 transition-transform"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
