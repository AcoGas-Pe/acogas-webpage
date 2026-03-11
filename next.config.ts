import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Quiénes somos → Nosotros (consolidar URL)
      { source: "/quienes-somos", destination: "/nosotros/", permanent: true },
      { source: "/quienes-somos/", destination: "/nosotros/", permanent: true },
      // Old product URLs → hub /productos/ (optimización Search Console, se normaliza con el tiempo)
      // Nota: no redirigir /productos/:slug para permitir páginas de producto en app/productos/[slug]
      { source: "/tienda", destination: "/productos/", permanent: true },
      { source: "/tienda/", destination: "/productos/", permanent: true },
      // Soluciones = productos (unified label in nav)
      { source: "/soluciones", destination: "/productos/", permanent: false },
      { source: "/soluciones/", destination: "/productos/", permanent: false },
    ];
  },
};

export default nextConfig;
