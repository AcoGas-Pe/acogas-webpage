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
  { value: "50+", label: "Años de experiencia" },
  { value: "24 / 7", label: "Soporte técnico" },
];

export function StatsBar({ stats = defaultStats, className }: StatsBarProps) {
  return (
    <section
      className={cn("relative z-10 bg-background border-y border-border/40", className)}
      aria-label="Datos destacados"
    >
      <div className="container py-6 sm:py-8">
        <div className="mx-auto flex max-w-2xl flex-row items-center justify-center gap-4 rounded-2xl border border-border/50 bg-card px-4 py-4 shadow-[0_18px_44px_-34px_hsl(var(--primary)_/_0.36)]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "text-center",
                index < stats.length - 1 && "px-4 md:border-r md:border-border/50"
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
