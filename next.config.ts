import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Quiénes somos → Nosotros (consolidar URL)
      { source: "/quienes-somos", destination: "/nosotros/", permanent: true },
      { source: "/quienes-somos/", destination: "/nosotros/", permanent: true },
      // Old product URLs → hub /productos/ (optimización Search Console, se normaliza con el tiempo)
      { source: "/categoria-producto/:path*", destination: "/productos/", permanent: true },
      { source: "/producto/:path*", destination: "/productos/", permanent: true },
      { source: "/productos/:path+", destination: "/productos/", permanent: true },
      { source: "/tienda", destination: "/productos/", permanent: true },
      { source: "/tienda/", destination: "/productos/", permanent: true },
    ];
  },
};

export default nextConfig;
