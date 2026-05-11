import { cn } from "@/lib/utils";
import type { Service } from "@/domain/service";
import { getFeatureIcon } from "@/lib/section-icons";

interface ServiceFeaturesProps {
  service: Service;
  className?: string;
}

export function ServiceFeatures({ service, className }: ServiceFeaturesProps) {
  return (
    <section
      className={cn(
        "section border-y border-border/60 bg-background py-14 sm:py-16 md:py-20",
        className,
      )}
    >
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent sm:text-sm">
            Características
          </p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.08em] text-foreground sm:text-3xl md:text-[2rem]">
            Alcance del servicio
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Lo que ofrecemos en <span className="font-semibold text-foreground">{service.shortTitle}</span>
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {service.features.map((feature, index) => {
            const Icon = getFeatureIcon(feature.title ?? "", index);
            return (
              <div
                key={feature.title ?? index}
                className={cn(
                  "flex flex-col rounded-xl border border-border bg-card p-6 text-left shadow-sm",
                  "transition hover:border-primary/25 hover:shadow-md",
                )}
              >
                <div className="mb-4 flex justify-center sm:justify-start">
                  <Icon className="h-8 w-8 text-accent" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="text-center text-sm font-bold uppercase tracking-wide text-primary sm:text-left sm:text-base">
                  {feature.title}
                </h3>
                <p className="mt-3 text-justify text-sm leading-relaxed text-muted-foreground sm:text-start">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
