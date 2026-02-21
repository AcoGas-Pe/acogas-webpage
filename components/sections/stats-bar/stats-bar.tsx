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
  { value: "6", label: "Marcas líderes mundiales" },
  { value: "100+", label: "Proyectos industriales" },
  { value: "24/7", label: "Soporte técnico" },
];

export function StatsBar({ stats = defaultStats, className }: StatsBarProps) {
  return (
    <section
      className={cn("relative z-10 bg-card border-y border-border", className)}
      aria-label="Datos destacados"
    >
      <div className="container py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "text-center",
                index < stats.length - 1 && "md:border-r md:border-border"
              )}
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tabular-nums">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
