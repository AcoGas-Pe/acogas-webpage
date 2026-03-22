/**
 * Strategic partner brands — single source for carousels and “Nosotros”.
 * Replace `logo` paths when official logo assets are available.
 */

export interface StrategicBrand {
  name: string;
  /** Short line under the name (e.g. segments served) */
  line?: string;
  /** Corporate one-line positioning */
  shortDescription: string;
  /** Optional logo under /public */
  logo?: string;
}

export const STRATEGIC_BRANDS: StrategicBrand[] = [
  {
    name: "Fisher",
    logo: "/assets/images/fisher.png",
    line: "GLP · GN · Otros",
    shortDescription:
      "Referencia global en control final para gas: regulación de presión, continuidad del suministro y protección del sistema en aplicaciones industriales exigentes.",
  },
  {
    name: "Tartarini",
    logo: "/assets/images/tartarini.png",
    shortDescription:
      "Soluciones de regulación, seguridad y control de presión para gas natural y gases industriales, incluyendo estaciones de regulación y entornos con biometano o mezclas con hidrógeno.",
  },
  {
    name: "Spence",
    logo: "/assets/images/spence.png",
    shortDescription:
      "Especialista en control de vapor y fluidos para redes térmicas, HVAC y procesos industriales, con regulación estable y eficiencia operativa.",
  },
  {
    name: "Cash",
    logo: "/assets/images/cash.png",
    shortDescription:
      "Regulación y contrapresión robusta para vapor, gases de proceso y servicios criogénicos, con énfasis en estabilidad y seguridad en condiciones severas.",
  },
  {
    name: "Anderson Greenwood",
    logo: "/assets/images/anderson-greenwood.png",
    shortDescription:
      "Alivio de presión y protección de tanques para petróleo, gas, química y energía, con tecnología orientada a seguridad, emisiones y continuidad.",
  },
  {
    name: "Crosby",
    logo: "/assets/images/crosby.png",
    shortDescription:
      "Válvulas de seguridad y alivio ampliamente adoptadas en petróleo, gas, petroquímica y generación, incluyendo aplicaciones críticas y de alto requerimiento.",
  },
  {
    name: "Kunkle",
    logo: "/assets/images/kunkle.png",
    shortDescription:
      "Protección frente a sobrepresión mediante válvulas de seguridad y alivio para vapor, aire, gas y líquidos en equipos y procesos industriales.",
  },
  {
    name: "Marston",
    logo: "/assets/images/marston.png",
    shortDescription:
      "Discos de ruptura y dispositivos asociados como barrera de seguridad ante sobrepresiones en sistemas de proceso y almacenamiento.",
  },
  {
    name: "Enardo",
    logo: "/assets/images/enardo.png",
    shortDescription:
      "Protección ambiental y operativa de tanques: alivio de presión y vacío, arrestadores de flama y soluciones para control de emisiones.",
  },
  {
    name: "Varec",
    logo: "/assets/images/varec.png",
    shortDescription:
      "Medición y control de inventarios en tanques, con instrumentación y software para terminales y operaciones con combustibles y productos industriales.",
  },
  {
    name: "Corken",
    logo: "/assets/images/corken.png",
    shortDescription:
      "Bombas y compresores para transferencia de GLP, compresión de gas y recuperación de vapores, con foco en seguridad y continuidad operativa.",
  },
  {
    name: "Liquid Controls",
    logo: "/assets/images/liquid-controls.png",
        shortDescription:
      "Medición de líquidos de alta precisión para transferencias críticas, registro electrónico y control en operaciones con custodia y trazabilidad.",
  },
  {
    name: "Cavagna",
    logo: "/assets/images/cavagna.png",
      shortDescription:
      "Regulación, distribución y medición de gases en GLP, gas natural e hidrocarburos alternativos, desde almacenamiento hasta el punto de uso.",
  },
];

export const PRIMARY_SLOGAN =
  "Ingeniería que respalda decisiones industriales.";

export const TECH_COMMERCIAL_SLOGAN =
  "Regulación, control y energía con criterio.";

export const MISSION_TAGLINE =
  "Ingeniería confiable que convierte la energía en valor industrial.";

export const VISION_TAGLINE =
  "Liderar la industria con tecnología, criterio y responsabilidad.";

/** Short positioning lines for hero / footer */
export const CENTRAL_MESSAGE_SHORT =
  "Soluciones energéticas industriales con respaldo técnico, normativo y de marca.";

export const CENTRAL_MESSAGE_ALT =
  "No ofrecemos catálogos aislados: integramos equipos, ingeniería y servicios según su proceso.";
