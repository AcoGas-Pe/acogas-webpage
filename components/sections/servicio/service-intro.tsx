import type { Service } from "@/domain/service";
import { cn } from "@/lib/utils";

interface ServiceIntroProps {
  service: Service;
  className?: string;
}

export function ServiceIntro({ service, className }: ServiceIntroProps) {
  return (
    <section
      className={cn(
        "section border-b border-border/60 bg-background py-12 sm:py-14 md:py-16",
        className,
      )}
    >
      <div className="container">
        <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8 md:p-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-accent sm:text-start">
            Enfoque del servicio
          </p>
          <p className="mt-4 text-center text-base leading-relaxed text-muted-foreground sm:text-start sm:text-lg">
            {service.longDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
