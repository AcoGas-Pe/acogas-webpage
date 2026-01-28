# Secciones Base

Este directorio contiene las secciones reutilizables del sitio web, siguiendo el design system de Acogas.

## Estructura

```
sections/
  hero/
    hero.tsx              # Hero default para todas las páginas
  features/
    features.tsx          # Sección de características/ventajas
  testimonials/
    testimonials.tsx      # Testimonios de clientes
  cta/
    cta.tsx              # Call-to-action section
  product-grid/
    product-grid.tsx     # Grid de productos
```

## Clase CSS Global

Todas las secciones usan la clase `.section` que proporciona:
- `min-height: 100vh` - Altura mínima de viewport completo
- `overflow-x: hidden` - Previene scroll horizontal
- `width: 100%` - Ancho completo

## Uso

### Hero (Default)
```tsx
import { Hero } from "@/components/sections/hero/hero";

<Hero
  title="Título de la Página"
  subtitle="Subtítulo opcional"
  description="Descripción del contenido"
  primaryAction={{
    label: "Acción Principal",
    href: "/ruta",
  }}
/>
```

### Features
```tsx
import { Features } from "@/components/sections/features/features";

<Features
  title="Por Qué Elegirnos"
  features={[
    {
      title: "Título",
      description: "Descripción",
      icon: <Icon />, // Opcional
    },
  ]}
/>
```

### Product Grid
```tsx
import { ProductGrid } from "@/components/sections/product-grid/product-grid";

<ProductGrid
  products={[
    {
      title: "Producto",
      description: "Descripción",
      href: "/ruta",
      features: ["Feature 1", "Feature 2"],
    },
  ]}
/>
```

### Testimonials
```tsx
import { Testimonials } from "@/components/sections/testimonials/testimonials";

<Testimonials
  testimonials={[
    {
      name: "Nombre",
      role: "Cargo",
      company: "Empresa",
      content: "Testimonio",
      rating: 5,
    },
  ]}
/>
```

### CTA
```tsx
import { CTA } from "@/components/sections/cta/cta";

<CTA
  title="¿Listo para Comenzar?"
  description="Descripción"
  primaryAction={{
    label: "Contactar",
    href: "/contacto",
  }}
  variant="default" // "default" | "primary" | "accent"
/>
```

## Design System

Todas las secciones siguen:
- ✅ Bordes sharp (sin border-radius o mínimo)
- ✅ Sombras para profundidad
- ✅ Colores de marca (primary, accent, muted)
- ✅ Tipografía bold y confiada
- ✅ Microinteracciones en hover
- ✅ Responsive design

## Personalización

Cada sección acepta props para personalización:
- `title` - Título principal
- `subtitle` - Subtítulo opcional
- `description` - Descripción
- `className` - Clases adicionales
- Props específicas según la sección
