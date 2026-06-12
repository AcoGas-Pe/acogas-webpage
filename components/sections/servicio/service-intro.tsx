import Image from "next/image";
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
        "section border-b border-border/40 bg-background py-12 sm:py-14 md:py-16",
        className,
      )}
    >
      <div className="container">
        <div className="card-base mx-auto grid max-w-5xl overflow-hidden rounded-[1.75rem] bg-card md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[220px] bg-muted md:min-h-full">
            <Image
              src={service.heroImage ?? "/assets/images/revision-refineria.webp"}
              alt={`Servicio ${service.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
          <div className="p-6 sm:p-8 md:p-10">
            <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-accent sm:text-start">
              Enfoque del servicio
            </p>
            <p className="mt-4 text-center text-base leading-relaxed text-muted-foreground sm:text-start sm:text-lg">
              {service.longDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
