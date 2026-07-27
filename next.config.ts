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

/** Old category hubs → `/productos/?macro=…` (must stay in sync with footer-products macros). */
const legacyCategoryRedirects: {
  source: string;
  destination: string;
  permanent: true;
}[] = [
  {
    source: "/productos/bombas-compresores",
    destination:
      "/productos/?macro=Equipo+de+bombeo+y+compresi%C3%B3n",
  },
  {
    source: "/productos/regulacion-control-presion",
    destination:
      "/productos/?macro=Regulaci%C3%B3n+y+control+de+presi%C3%B3n",
  },
  {
    source: "/productos/seguridad-alivio-presion",
    destination: "/productos/?macro=Seguridad%2C+Alivio+y+Vac%C3%ADo",
  },
  {
    source: "/productos/procesos-especiales-multifluidos",
    destination:
      "/productos/?macro=Inertizaci%C3%B3n%2C+Recuperaci%C3%B3n+de+vapor+y+Tanques",
  },
  {
    source: "/productos/vapor-procesos-termicos",
    destination: "/productos/?macro=Control+de+Temperatura+y+Vapor",
  },
  {
    source: "/productos/medicion-control-flujo",
    destination:
      "/productos/?macro=Control+de+Flujo%2C+Filtraci%C3%B3n+y+Ruido",
  },
].flatMap(({ source, destination }) => [
  { source, destination, permanent: true as const },
  { source: `${source}/`, destination, permanent: true as const },
]);

const nextConfig: NextConfig = {
  // Match SEO canonicals and internal links that use trailing slashes.
  trailingSlash: true,
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
      // Old product URLs → hub /productos/
      { source: "/tienda", destination: "/productos/", permanent: true },
      { source: "/tienda/", destination: "/productos/", permanent: true },
      ...legacyCategoryRedirects,
      // Soluciones = productos
      { source: "/soluciones", destination: "/productos/", permanent: true },
      { source: "/soluciones/", destination: "/productos/", permanent: true },
      // Hub recursos técnicos → página de recursos
      { source: "/recursos-tecnicos", destination: "/recursos/", permanent: true },
      { source: "/recursos-tecnicos/", destination: "/recursos/", permanent: true },
      // Blog consolidado bajo /blog/
      { source: "/recursos-tecnicos/blog", destination: "/blog/", permanent: true },
      { source: "/recursos-tecnicos/blog/", destination: "/blog/", permanent: true },
      { source: "/novedades", destination: "/blog/", permanent: true },
      { source: "/novedades/", destination: "/blog/", permanent: true },
      // Normativas bajo recursos técnicos
      { source: "/normativas", destination: "/recursos-tecnicos/normativas/", permanent: true },
      { source: "/normativas/", destination: "/recursos-tecnicos/normativas/", permanent: true },
    ];
  },
};

export default nextConfig;
