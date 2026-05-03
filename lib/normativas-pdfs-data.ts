import type { CatalogoDocs } from "@/domain/product";

/** Clave única para el gate HubSpot (una vez cumplido, aplica a todas las descargas de esta página) */
export const NORMATIVAS_DOWNLOAD_GATE_SLUG = "recursos-tecnicos-normativas";

const cat = {
  resoluciones: "Resoluciones",
  normasTecnicas: "Normas técnicas",
  leyesYDecretos: "Leyes y Decretos",
  internacional: "Documentos sueltos",
  otras: "Otras normativas",
} as const;

/** Rutas bajo `public/assets/docs/`. Codifica segmentos para espacios, tildes y “°” en nombres de archivo. */
function assetDoc(...segments: string[]): string {
  return (
    "/assets/docs/" + segments.map((s) => encodeURIComponent(s)).join("/")
  );
}

/**
 * Nota: la carpeta en disco es `resolucones-directorales` (sin la “i”).
 * Si renombran a `resoluciones-directorales`, actualicen esa cadena aquí.
 */
export const normativasPeruanasResoluciones: CatalogoDocs[] = [
  {
    categoria: cat.resoluciones,
    nombre: "RCD N.° 169-2024-OS/CD — Libro electrónico inspecciones tanques GLP",
    url: assetDoc(
      "normas-peruanas",
      "resoluciones-consejo-directivo",
      "RCD N.° 169-2024-OS-CD.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.resoluciones,
    nombre: "RD N.° 008-2024-INACAL/DN",
    url: assetDoc(
      "normas-peruanas",
      "resolucones-directorales",
      "RD 008-2024-INACAL-DN.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.resoluciones,
    nombre: "R.M. N.° 037-2006-MEM/DM — Código Nacional de Electricidad (Utilización)",
    url: assetDoc(
      "normas-peruanas",
      "resoluciones-ministeriales",
      "RM-037-2006-MEM-DM.pdf",
    ),
    paginas: "PDF",
  },
];

export const normativasPeruanasNormasTecnicas: CatalogoDocs[] = [
  {
    categoria: cat.normasTecnicas,
    nombre: "NTP 321.123",
    url: assetDoc(
      "normas-peruanas",
      "normas-tecnicas-peruanas",
      "NTP 321.123.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.normasTecnicas,
    nombre: "NTP 350.301",
    url: assetDoc(
      "normas-peruanas",
      "normas-tecnicas-peruanas",
      "NTP 350.301.pdf",
    ),
    paginas: "PDF",
  },
];

export const normativasPeruanasLeyesYDecretos: CatalogoDocs[] = [
  {
    categoria: cat.leyesYDecretos,
    nombre: "Ley N.° 26221 — Ley General de Hidrocarburos",
    url: assetDoc("normas-peruanas", "leyes", "Ley N.° 26221.pdf"),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "Ley N.° 26734 — Ley que crea OSINERG (OSINERGMIN)",
    url: assetDoc("normas-peruanas", "leyes", "Ley N.° 26734.pdf"),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "Ley N.° 30754 — Ley Marco sobre Cambio Climático",
    url: assetDoc("normas-peruanas", "leyes", "Ley N° 30754.pdf"),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "D.S. N.° 027-94-EM — Reglamento de seguridad GLP",
    url: assetDoc(
      "normas-peruanas",
      "decretos-supremos",
      "DS-027-94-EM.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "D.S. N.° 040-2008-EM — TUO distribución de gas natural",
    url: assetDoc(
      "normas-peruanas",
      "decretos-supremos",
      "DS-040-2008-EM.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "D.S. N.° 042-99-EM — Distribución de gas natural por red",
    url: assetDoc(
      "normas-peruanas",
      "decretos-supremos",
      "DS-042-99-EM.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "D.S. N.° 042-2005-EM — Texto único ordenado Ley General de Hidrocarburos",
    url: assetDoc(
      "normas-peruanas",
      "decretos-supremos",
      "DS-042-2005-EM.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "D.S. N.° 043-2007-EM — Seguridad en actividades de hidrocarburos",
    url: assetDoc(
      "normas-peruanas",
      "decretos-supremos",
      "DS-043-2007-EM.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "D.S. N.° 052-93-EM — Seguridad en almacenamiento de hidrocarburos",
    url: assetDoc(
      "normas-peruanas",
      "decretos-supremos",
      "DS-052-93-EM.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "D.S. N.° 065-2008-EM — Modifica reglamento de seguridad GLP",
    url: assetDoc(
      "normas-peruanas",
      "decretos-supremos",
      "DS-065-2008-EM.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "D.S. N.° 009-2020-EM — Modifica normas de comercialización y seguridad GLP",
    url: assetDoc(
      "normas-peruanas",
      "decretos-supremos",
      "DS-009-2020-EM.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "D.S. N.° 081-2007-EM — Transporte de hidrocarburos por ductos",
    url: assetDoc(
      "normas-peruanas",
      "decretos-supremos",
      "DS-081-2007-EM.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.leyesYDecretos,
    nombre: "D.S. 42-F — Reglamento de seguridad industrial (referencia histórica)",
    url: assetDoc("normas-peruanas", "decretos-supremos", "DS-42-F.pdf"),
    paginas: "PDF",
  },
];

export const normativasInternacionalesSueltos: CatalogoDocs[] = [
  {
    categoria: cat.internacional,
    nombre: "Acuerdo de París",
    url: assetDoc("normas-internacionales", "Acuerdo de París.pdf"),
    paginas: "PDF",
  },
  {
    categoria: cat.internacional,
    nombre: "API 650 — Welded Tanks for Oil Storage",
    url: assetDoc(
      "normas-internacionales",
      "API 650-Welded Tanks for Oil Storage.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.internacional,
    nombre: "ASME B31.8 — Gas Transmission and Distribution Piping Systems",
    url: assetDoc(
      "normas-internacionales",
      "ASME B31.8-Gas Transmission and Distribution Piping Systems.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.internacional,
    nombre: "ASME BPVC Section VIII Div. 1 — Pressure Vessels",
    url: assetDoc(
      "normas-internacionales",
      "ASME BPVC Section VIII Div. 1–Pressure Vessels.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.internacional,
    nombre: "IEC 60079-14 — Explosive atmospheres (instalaciones eléctricas)",
    url: assetDoc(
      "normas-internacionales",
      "IEC 60079-14-Explosive atmospheres.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.internacional,
    nombre: "IEC 60079-29-0 — Gas detection equipment",
    url: assetDoc(
      "normas-internacionales",
      "IEC 60079-29-0–Gas detection equipment.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.internacional,
    nombre: "NFPA 58 — Liquefied Petroleum Gas Code",
    url: assetDoc(
      "normas-internacionales",
      "NFPA 58-Liquefied Petroleum Gas Code.pdf",
    ),
    paginas: "PDF",
  },
  {
    categoria: cat.internacional,
    nombre: "Verified Carbon Standard (VCS) — Verra",
    url: assetDoc(
      "normas-internacionales",
      "Verified Carbon Standard (VCS) Program-Verra.pdf",
    ),
    paginas: "PDF",
  },
];

/** Añada PDFs en `public/assets/docs/otras-normativas/` y liste aquí. */
export const otrasNormativasDocumentosSueltos: CatalogoDocs[] = [];
