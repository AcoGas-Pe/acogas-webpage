import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Product {
  title: string;
  description: string;
  href: string;
  image?: string;
  features?: string[];
}

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  className?: string;
}

const defaultProducts: Product[] = [
  {
    title: "Gas Natural",
    description: "Suministro de gas natural para uso residencial e industrial. Soluciones con tecnología de clase mundial y respaldo técnico.",
    href: "/productos/gas-natural",
    features: ["Suministro continuo", "Tarifas competitivas", "Instalación profesional"],
  },
  {
    title: "Gas LP",
    description: "Gas licuado de petróleo de alta calidad para todos tus necesidades.",
    href: "/productos/gas-lp",
    features: ["Entrega a domicilio", "Tanques de almacenamiento", "Mantenimiento incluido"],
  },
  {
    title: "Equipos",
    description: "Equipos y accesorios de última generación para instalaciones de gas.",
    href: "/productos/equipos",
    features: ["Calidad certificada", "Instalación profesional", "Garantía incluida"],
  },
  {
    title: "Productos",
    description: "Productos para la Industria, Gas y Energía. Asesoría técnica y cumplimiento normativo.",
    href: "/productos/",
    features: ["Mantenimiento preventivo", "Emergencias 24/7", "Asesoría técnica"],
  },
];

const cardBase =
  "card-base group flex flex-col overflow-hidden";

export function ProductGrid({
  title = "Nuestros Productos",
  subtitle = "Soluciones",
  products = defaultProducts,
  className,
}: ProductGridProps) {
  const [featured, ...rest] = products;

  return (
    <section className={cn("section min-h-[75dvh] mx-auto bg-background", className)}>
      <div className="container max-w-7xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          {subtitle && (
            <p className="text-muted-foreground text-sm sm:text-base mb-1.5">{subtitle}</p>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
          <Link
            href={featured.href}
            className={cn(cardBase, "md:col-span-2 md:row-span-2 min-h-[220px] sm:min-h-[260px] p-4 sm:p-6 md:p-8")}
          >
            {featured.image ? (
              <div className="mb-3 sm:mb-4 aspect-video w-full max-w-md rounded-md overflow-hidden bg-primary/10 border border-border">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="mb-3 sm:mb-4 aspect-video w-full max-w-md rounded-md bg-primary/10 border border-border flex items-center justify-center">
                <span className="text-4xl sm:text-5xl text-primary/40" aria-hidden>⚡</span>
              </div>
            )}
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-1.5 sm:mb-2 group-hover:opacity-90">
              {featured.title}
            </h3>
            <p className="text-foreground/85 text-xs sm:text-sm font-medium mb-3 sm:mb-4 flex-1 line-clamp-2 sm:line-clamp-none">
              {featured.description}
            </p>
            {featured.features && featured.features.length > 0 && (
              <ul className="space-y-1 mb-3 sm:mb-4">
                {featured.features.slice(0, 3).map((f, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-foreground/75 flex items-center gap-2">
                    <span className="text-accent font-bold">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            )}
            <Button variant="outline" size="sm" className="w-full sm:w-fit min-h-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Ver más →
            </Button>
          </Link>

          {rest.slice(0, 2).map((product, index) => (
            <Link
              key={index}
              href={product.href}
              className={cn(cardBase, "p-4 sm:p-5 justify-between min-h-[180px]")}
            >
              <div className="min-w-0">
                {product.image ? (
                  <div className="mb-2 sm:mb-3 aspect-video rounded-md overflow-hidden bg-primary/10 border border-border">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="mb-2 sm:mb-3 aspect-video rounded-md bg-primary/10 border border-border flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl text-primary/40" aria-hidden>⚡</span>
                  </div>
                )}
                <h3 className="text-base sm:text-lg font-bold text-primary mb-0.5 group-hover:opacity-90">
                  {product.title}
                </h3>
                <p className="text-foreground/85 text-xs font-medium line-clamp-2">
                  {product.description}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-2 min-h-9 text-primary hover:bg-primary/15">
                Ver más →
              </Button>
            </Link>
          ))}

          {rest[2] && (
            <Link
              href={rest[2].href}
              className={cn(cardBase, "md:col-span-2 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 min-h-[120px]")}
            >
              {rest[2].image ? (
                <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-primary/10 border border-border">
                  <img src={rest[2].image} alt={rest[2].title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md bg-primary/10 border border-border flex items-center justify-center">
                  <span className="text-xl sm:text-2xl text-primary/40" aria-hidden>⚡</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-primary mb-0.5">{rest[2].title}</h3>
                <p className="text-foreground/85 text-xs sm:text-sm font-medium line-clamp-2">
                  {rest[2].description}
                </p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 w-full sm:w-auto min-h-9 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Ver más →
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
