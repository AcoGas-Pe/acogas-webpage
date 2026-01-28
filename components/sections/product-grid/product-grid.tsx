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
    description: "Suministro de gas natural para uso residencial e industrial.",
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
    description: "Productos para la Industria, Gas y Energía.",
    href: "/productos/",
    features: ["Mantenimiento preventivo", "Emergencias 24/7", "Asesoría técnica"],
  },
];

export function ProductGrid({
  title = "Nuestros Productos",
  subtitle = "Soluciones",
  products = defaultProducts,
  className,
}: ProductGridProps) {
  return (
    <section className={cn("section flex items-center justify-center bg-background", className)}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {subtitle}
              </p>
            )}
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {title}
            </h2>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link
                key={index}
                href={product.href}
                className="group block bg-muted p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] hover:shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-4px_rgb(0_0_0_/_0.1)] transition-all duration-200 hover:-translate-y-1"
              >
                {/* Image placeholder */}
                {product.image ? (
                  <div className="mb-4 aspect-video bg-primary/10 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mb-4 aspect-video bg-primary/10 flex items-center justify-center border-2 border-border">
                    <span className="text-4xl text-primary/50">⚡</span>
                  </div>
                )}

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-accent">▸</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  Ver más →
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
