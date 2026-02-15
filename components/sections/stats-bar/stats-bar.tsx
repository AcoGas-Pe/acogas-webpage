import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats?: Stat[];
  className?: string;
}

const defaultStats: Stat[] = [
  { value: "53+", label: "Años de experiencia" },
  { value: "Emerson", label: "Marcas líderes" },
  { value: "GLP · GN · Vapor", label: "Soluciones integrales" },
];

export function StatsBar({
  stats = defaultStats,
  className,
}: StatsBarProps) {
  return (
    <section
      className={cn(
        "w-full border-y border-border bg-background/95 backdrop-blur-sm py-4",
        className
      )}
      aria-label="Datos destacados"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card-base flex flex-col md:flex-row items-center justify-center gap-2 px-6 py-3 min-w-[140px]"
            >
              <span className="text-xl md:text-2xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-sm text-foreground/80 font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
