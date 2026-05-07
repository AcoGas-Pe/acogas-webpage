import type { NextConfig } from "next";

function wordPressImageHostPattern(): { protocol: "http" | "https"; hostname: string; pathname: string }[] {
  const explicit = process.env.WORDPRESS_IMAGE_HOSTNAME?.trim();
  if (explicit) {
    return [{ protocol: "https", hostname: explicit, pathname: "/**" }];
  }
  const gql = process.env.WORDPRESS_GRAPHQL_URL?.trim();
  if (!gql) return [];
  try {
    const u = new URL(gql);
    const protocol = u.protocol === "http:" ? ("http" as const) : ("https" as const);
    return [{ protocol, hostname: u.hostname, pathname: "/**" }];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: wordPressImageHostPattern(),
  },
  async redirects() {
    return [
      // Prefer apex (canonical host); sitemap & meta canonical use https://acogas.pe
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.acogas.pe" }],
        destination: "https://acogas.pe/:path*",
        permanent: true,
      },
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
      // Hub recursos técnicos → página de recursos (hasta exista índice dedicado)
      { source: "/recursos-tecnicos", destination: "/recursos/", permanent: false },
      { source: "/recursos-tecnicos/", destination: "/recursos/", permanent: false },
      // Normativas bajo recursos técnicos
      { source: "/normativas", destination: "/recursos-tecnicos/normativas/", permanent: true },
      { source: "/normativas/", destination: "/recursos-tecnicos/normativas/", permanent: true },
    ];
  },
};

export default nextConfig;
