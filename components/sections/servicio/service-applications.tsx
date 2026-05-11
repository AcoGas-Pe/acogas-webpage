import { cn } from "@/lib/utils";
import type { Service } from "@/domain/service";
import { getApplicationIcon } from "@/lib/section-icons";

interface ServiceApplicationsProps {
  service: Service;
  className?: string;
}

export function ServiceApplications({ service, className }: ServiceApplicationsProps) {
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
            Aplicaciones
          </p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.08em] text-foreground sm:text-3xl md:text-[2rem]">
            Sectores y casos típicos
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Dónde aplica nuestra experiencia en {service.shortTitle.toLowerCase()}.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {service.applications.map((app, index) => {
            const Icon = getApplicationIcon(app.industry ?? "", index);
            return (
              <div
                key={`${app.industry}-${index}`}
                className={cn(
                  "flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm",
                  "transition hover:border-primary/25 hover:shadow-md",
                )}
              >
                <div className="shrink-0 pt-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} aria-hidden />
                  </div>
                </div>
                <div className="min-w-0 text-left">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-primary sm:text-base">
                    {app.industry}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{app.useCase}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
