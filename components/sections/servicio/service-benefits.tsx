import { cn } from "@/lib/utils";
import type { Service } from "@/domain/service";
import { getBenefitIcon } from "@/lib/section-icons";

interface ServiceBenefitsProps {
  service: Service;
  className?: string;
}

export function ServiceBenefits({ service, className }: ServiceBenefitsProps) {
  return (
    <section
      className={cn(
        "section bg-background-alt py-14 sm:py-16 md:py-20",
        className,
      )}
    >
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent sm:text-sm">
            Beneficios
          </p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.08em] text-foreground sm:text-3xl md:text-[2rem]">
            Valor para su operación
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {service.benefits.map((benefit, index) => {
            const Icon = getBenefitIcon(benefit.title ?? "", index);
            return (
              <div
                key={benefit.title ?? index}
                className={cn(
                  "flex flex-col rounded-xl border border-border bg-card p-6 text-center shadow-sm",
                  "transition hover:border-primary/25 hover:shadow-md",
                )}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                  <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary sm:text-base">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
