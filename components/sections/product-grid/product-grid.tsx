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
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {subtitle && (
              <p className="text-muted-foreground/80 text-sm mb-2">{subtitle}</p>
            )}
            <h2 className="text-4xl font-bold text-foreground">{title}</h2>
          </div>

          {/* Bento grid: 1 large (2x2), 3 smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
            {/* Featured product - spans 2 cols, 2 rows */}
            <Link
              href={featured.href}
              className={cn(cardBase, "md:col-span-2 md:row-span-2 min-h-[260px] p-6 md:p-8")}
            >
              {featured.image ? (
                <div className="mb-4 aspect-video w-full max-w-md rounded-md overflow-hidden bg-primary/10">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="mb-4 aspect-video w-full max-w-md rounded-md bg-primary/10 border border-border flex items-center justify-center">
                  <span className="text-5xl text-primary/50">⚡</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-primary mb-2 group-hover:opacity-90">
                {featured.title}
              </h3>
              <p className="text-foreground/80 font-semibold text-sm mb-4 flex-1">
                {featured.description}
              </p>
              {featured.features && featured.features.length > 0 && (
                <ul className="space-y-1 mb-4">
                  {featured.features.slice(0, 3).map((f, idx) => (
                    <li key={idx} className="text-sm text-foreground/70 flex items-center gap-2">
                      <span className="text-accent">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <Button variant="outline" size="sm" className="w-fit border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Ver más →
              </Button>
            </Link>

            {/* Small cards - col 3 row 1 and 2 */}
            {rest.slice(0, 2).map((product, index) => (
              <Link
                key={index}
                href={product.href}
                className={cn(cardBase, "p-5 justify-between")}
              >
                <div>
                  {product.image ? (
                    <div className="mb-3 aspect-video rounded-md overflow-hidden bg-primary/10">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="mb-3 aspect-video rounded-md bg-primary/10 border border-border flex items-center justify-center">
                      <span className="text-3xl text-primary/50">⚡</span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-primary mb-1 group-hover:opacity-90">
                    {product.title}
                  </h3>
                  <p className="text-foreground/80 font-semibold text-xs line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2 text-primary hover:bg-primary/20">
                  Ver más →
                </Button>
              </Link>
            ))}

            {/* Bottom card - spans 2 cols */}
            {rest[2] && (
              <Link
                href={rest[2].href}
                className={cn(cardBase, "md:col-span-2 p-5 flex flex-col md:flex-row md:items-center gap-4")}
              >
                {rest[2].image ? (
                  <div className="shrink-0 w-24 h-24 rounded-md overflow-hidden bg-primary/10">
                    <img src={rest[2].image} alt={rest[2].title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="shrink-0 w-24 h-24 rounded-md bg-primary/10 border border-border flex items-center justify-center">
                    <span className="text-2xl text-primary/50">⚡</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-primary mb-1">{rest[2].title}</h3>
                  <p className="text-foreground/80 font-semibold text-sm">
                    {rest[2].description}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Ver más →
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
