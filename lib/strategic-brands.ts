/**
 * Strategic partner brands — single source for carousels, Nosotros and /marcas.
 */

export interface StrategicBrand {
  /** URL segment for /marcas/[slug] */
  slug: string;
  name: string;
  /** Short line under the name (e.g. segments served) */
  line?: string;
  /** Corporate one-line positioning (cards, SEO) */
  shortDescription: string;
  /** Optional logo under /public */
  logo?: string;
  /** Full narrative for the brand page */
  paragraphs: string[];
}

export const STRATEGIC_PARTNERS_HEADING = {
  eyebrow: "Socios estratégicos",
  title: "Con quién crecemos",
  subtitle: "Marcas",
} as const;

export const STRATEGIC_PARTNERS_CLOSING =
  "Estos socios nos permiten ofrecer soluciones completas, no productos aislados.";

export const STRATEGIC_BRANDS: StrategicBrand[] = [
  {
    slug: "corken",
    name: "Corken",
    logo: "/assets/images/corken.png",
    shortDescription:
      "Bombas y compresores industriales para GLP, gases y líquidos críticos: transferencia de GLP, compresión, recuperación de vapores y continuidad operativa con foco en seguridad.",
    paragraphs: [
      "Corken es una marca líder de bombas y compresores industriales diseñados para el manejo seguro de GLP, gases, procesos químicos y líquidos críticos.",
      "Sus soluciones están orientadas a transferencia de GLP, compresión de gas, recuperación de vapores y manejo de líquidos peligrosos. Son ampliamente utilizadas en sectores como energía, transporte y procesos industriales, donde la seguridad, la eficiencia y la continuidad operativa son esenciales.",
      "Su portafolio incluye compresores de gas (verticales y horizontales), bombas de turbina y de paletas deslizantes, y soluciones para transferencia de GLP y recuperación de vapores. Estas tecnologías permiten operaciones seguras en aplicaciones como transferencia de LPG, carga y descarga de tanques y manejo de gases industriales.",
    ],
  },
  {
    slug: "fisher",
    name: "Fisher",
    line: "GLP · GN · Otros",
    logo: "/assets/images/fisher.png",
    shortDescription:
      "Estándar global en control final para gas natural, GLP y gases industriales: regulación de presión, continuidad del suministro y protección del sistema con reguladores de acción directa y pilotados.",
    paragraphs: [
      "Fisher es el estándar global en soluciones de control final para gas natural, GLP y gases industriales, especializado en la regulación de presión en el punto donde el gas pasa de infraestructura a energía utilizable. Fisher convierte la presión del sistema en energía segura.",
      "Sus equipos son reconocidos como referencia del sector por su confiabilidad, vida útil y precisión en aplicaciones de gas natural, GLP y procesos industriales. Sus soluciones garantizan suministro continuo, presión estable, protección frente a sobrepresión y operación segura del sistema, lo cual es clave en aplicaciones donde el consumo varía constantemente, como calderas, hornos, turbinas y equipos industriales: los reguladores Fisher responden automáticamente a cambios de demanda ajustando el flujo en tiempo real.",
      "Fisher ofrece dos arquitecturas principales. Los reguladores de acción directa son simples, confiables y rápidos; funcionan mediante equilibrio mecánico entre resorte y presión aguas abajo, lo que permite control automático sin energía externa. Los reguladores pilotados ofrecen mayor precisión y capacidad de flujo: utilizan un piloto que amplifica pequeños cambios de presión, permitiendo mayor estabilidad, operación silenciosa y control en grandes consumos.",
      "Fisher ofrece un sistema integral de gestión de presión: reguladores de presión, válvulas de seguridad y slam-shut, válvulas de alivio y de seguridad, reguladores de GLP y soluciones integradas. Las soluciones Fisher permiten maximizar la continuidad del sistema, reducir costos de mantenimiento, minimizar emisiones y mejorar la seguridad del suministro.",
    ],
  },
  {
    slug: "kunkle",
    name: "Kunkle",
    logo: "/assets/images/kunkle.png",
    shortDescription:
      "Válvulas de seguridad y alivio de presión para aplicaciones críticas: protección frente a sobrepresiones en calderas, compresores, tanques y procesos industriales.",
    paragraphs: [
      "Kunkle es una marca global especializada en válvulas de seguridad y alivio de presión para aplicaciones industriales y comerciales críticas. Es un referente en protección de sistemas frente a sobrepresiones.",
      "Su portafolio incluye válvulas de seguridad, válvulas de alivio de presión y dispositivos para vapor, aire, gas y líquidos. Estas soluciones se utilizan en calderas, compresores, tanques y procesos industriales donde es necesario liberar presión para evitar fallas o accidentes, proporcionando una capa crítica de seguridad que protege equipos, procesos y operaciones frente a riesgos de presión excesiva.",
    ],
  },
  {
    slug: "spence",
    name: "Spence",
    logo: "/assets/images/spence.png",
    shortDescription:
      "Control de vapor y fluidos para redes térmicas, HVAC y procesos industriales; regulación estable, eficiencia y seguridad en sistemas con vapor.",
    paragraphs: [
      "Spence es una marca especializada en soluciones para el control de vapor y fluidos, ampliamente utilizada en sistemas industriales, HVAC y procesos térmicos. Forma parte del portafolio de Emerson y es reconocida como líder en regulación de vapor y control de flujo.",
      "Sus soluciones ofrecen reguladores de presión, válvulas de control, pilotos y válvulas principales, trampas de vapor y equipos asociados. Estos equipos permiten controlar presión, temperatura y flujo en sistemas que operan con vapor o fluidos industriales.",
      "Las soluciones Spence se utilizan en sistemas de calefacción, plantas industriales, redes de vapor, procesos térmicos y HVAC. Sus reguladores permiten reducir presiones variables a niveles constantes de operación, optimizando eficiencia y seguridad del sistema. En síntesis, Spence proporciona soluciones especializadas para el control eficiente del vapor y fluidos, asegurando estabilidad y rendimiento en sistemas industriales y térmicos.",
    ],
  },
  {
    slug: "tartarini",
    name: "Tartarini",
    logo: "/assets/images/tartarini.png",
    shortDescription:
      "Regulación, seguridad y control de presión en gas natural y gases industriales; estaciones de regulación, biometano y mezclas con hidrógeno.",
    paragraphs: [
      "Tartarini es una marca global de Emerson especializada en regulación, seguridad y control de presión en sistemas de gas natural y gases industriales. Su tecnología está orientada a aplicaciones donde la precisión, la seguridad y la continuidad del suministro son críticas, como transmisión, distribución y medición de gas.",
      "Dentro del ecosistema Emerson, Tartarini representa uno de los pilares en soluciones de gestión de presión de gas, especialmente en estaciones de regulación completas.",
      "Las soluciones Tartarini permiten gestionar el gas desde líneas de transmisión, city gates, estaciones de distribución y consumidores industriales, incluyendo nuevos entornos energéticos como biometano y mezclas con hidrógeno.",
      "El portafolio Tartarini incluye reguladores de presión, válvulas de cierre de seguridad (slam shut), sistemas de odorización, válvulas de alivio y contrapresión, y soluciones modulares (skids). Tartarini permite gestionar el gas de forma segura desde la transmisión hasta el usuario final, garantizando estabilidad operativa y protección de la infraestructura energética.",
    ],
  },
  {
    slug: "cash",
    name: "Cash",
    logo: "/assets/images/cash.png",
    shortDescription:
      "Regulación y contrapresión robusta para vapor, aire, gases de proceso y servicios criogénicos, con estabilidad y seguridad en condiciones extremas.",
    paragraphs: [
      "Cash es una marca de Emerson especializada en válvulas reguladoras de presión y contrapresión, diseñadas para ofrecer control confiable en sistemas industriales exigentes. Su propuesta se centra en soluciones robustas de acción directa y pistón balanceado, ideales para aplicaciones donde se requiere estabilidad, precisión y operación continua.",
      "Las soluciones Cash están diseñadas para operar en vapor, aire y gases de proceso, líquidos industriales y aplicaciones criogénicas. Sus equipos permiten trabajar en condiciones extremas, incluyendo temperaturas criogénicas de hasta -320 °F y presiones de entrada elevadas, con rangos de hasta 2400 psi.",
      "Su portafolio incluye reguladores de presión, válvulas de contrapresión, soluciones criogénicas (reguladores pressure build, economizadores, válvulas de alivio criogénicas) y válvulas de alivio de seguridad. En síntesis, Cash proporciona soluciones robustas para la regulación de presión en sistemas industriales, asegurando estabilidad operativa y seguridad incluso en entornos críticos.",
    ],
  },
  {
    slug: "anderson-greenwood",
    name: "Anderson Greenwood",
    logo: "/assets/images/anderson-greenwood.png",
    shortDescription:
      "Alivio de presión y protección de tanques para petróleo, gas, química y energía, con foco en seguridad, emisiones y continuidad operativa.",
    paragraphs: [
      "Anderson Greenwood es una marca global especializada en soluciones avanzadas de alivio de presión y protección de tanques, utilizadas en industrias como petróleo, gas, química y generación de energía.",
      "Su portafolio incluye válvulas de alivio de presión (resorte y pilotadas), sistemas de protección de tanques, válvulas de aislamiento e instrumentación. Estas soluciones están diseñadas para proteger equipos y procesos frente a sobrepresiones, optimizando la operación y reduciendo emisiones.",
      "Anderson Greenwood proporciona tecnología de alivio de presión de alto desempeño que mejora la seguridad y la continuidad de las operaciones industriales.",
    ],
  },
  {
    slug: "crosby",
    name: "Crosby",
    logo: "/assets/images/crosby.png",
    shortDescription:
      "Válvulas de seguridad y alivio de presión ampliamente adoptadas en petróleo, gas, petroquímica y generación, incluida la nuclear.",
    paragraphs: [
      "Crosby es una marca especializada en válvulas de seguridad y alivio de presión, muy utilizada en protección contra sobrepresión en la industria. Sus válvulas de resorte directo son un estándar global en petróleo y gas, petroquímica, química y generación de energía, incluida la nuclear.",
      "Su portafolio incluye válvulas de alivio de presión, válvulas de seguridad para vapor, gas y líquidos, y soluciones para protección térmica y de procesos. Estas soluciones se utilizan ampliamente en industrias como petróleo y gas, petroquímica, energía y procesos industriales críticos.",
    ],
  },
  {
    slug: "marston",
    name: "Marston",
    logo: "/assets/images/marston.png",
    shortDescription:
      "Discos de ruptura y dispositivos asociados como protección primaria ante sobrepresiones en tanques, tuberías y sistemas de proceso.",
    paragraphs: [
      "Marston es una marca de Emerson especializada en dispositivos de alivio de presión tipo discos de ruptura (bursting discs). La línea Marston se usa como elemento crítico de protección frente a sobrepresiones en sistemas industriales exigentes.",
      "Su portafolio incluye discos de ruptura, dispositivos de alivio de presión y válvulas de flujo excesivo asociadas a sistemas de seguridad. Estas soluciones actúan como protección primaria frente a sobrepresiones en tanques, tuberías y sistemas de proceso, proporcionando una barrera de seguridad esencial que protege la integridad de los sistemas industriales frente a eventos de presión no controlados.",
    ],
  },
  {
    slug: "enardo",
    name: "Enardo",
    logo: "/assets/images/enardo.png",
    shortDescription:
      "Seguridad y control ambiental para tanques de almacenamiento: alivio de presión y vacío, arrestadores de flama y control de emisiones.",
    paragraphs: [
      "Enardo es una marca global especializada en soluciones de seguridad y control ambiental para tanques de almacenamiento de líquidos de baja presión, ampliamente utilizada en las industrias de petróleo, gas y procesos industriales.",
      "Su portafolio incluye válvulas de alivio de presión y vacío, arrestadores de flama y detonación, y venteos y escotillas para tanques. Estas soluciones están diseñadas para proteger tanques contra sobrepresión, vacío y emisiones, contribuyendo a la seguridad operativa y al cumplimiento ambiental.",
    ],
  },
  {
    slug: "varec",
    name: "Varec",
    logo: "/assets/images/varec.png",
    shortDescription:
      "Medición y control de inventarios en tanques con instrumentación y software para terminales y operaciones con combustibles y productos industriales.",
    paragraphs: [
      "Varec es una marca especializada en soluciones para la medición y control de líquidos almacenados en tanques, principalmente combustibles y productos industriales.",
      "Su portafolio incluye sistemas de medición de nivel (radar, servo, flotador y cinta), sensores, transmisores y monitoreo de tanques, y software de gestión de inventarios como FuelsManager. Estas soluciones permiten controlar el almacenamiento, la recepción y el movimiento de combustibles en terminales y operaciones industriales.",
    ],
  },
  {
    slug: "liquid-controls",
    name: "Liquid Controls",
    logo: "/assets/images/liquid-controls.png",
    shortDescription:
      "Medición de líquidos de alta precisión para transferencias críticas, custody transfer y trazabilidad con medidores de desplazamiento positivo y electrónica asociada.",
    paragraphs: [
      "Liquid Controls es un líder global en sistemas de medición de líquidos de alta precisión, utilizados principalmente en la transferencia de combustibles, GLP y otros fluidos de valor.",
      "Su portafolio incluye medidores de flujo de desplazamiento positivo, sistemas electrónicos de registro y control, válvulas, eliminadores de aire y accesorios de medición. Estas soluciones están diseñadas para aplicaciones de custody transfer, donde la exactitud es crítica.",
      "Los productos Liquid Controls permiten medir y gestionar líquidos críticos con exactitud, protegiendo operaciones, inventarios y rentabilidad.",
    ],
  },
  {
    slug: "cavagna",
    name: "Cavagna",
    logo: "/assets/images/cavagna.png",
    shortDescription:
      "Control, regulación y manejo seguro de gases en GLP, gas natural e hidrocarburos alternativos, desde almacenamiento hasta el punto de uso.",
    paragraphs: [
      "Cavagna Group es un fabricante global de soluciones para el control, regulación y manejo seguro de gases, con aplicaciones en GLP, gas natural, gases industriales, médicos y combustibles alternativos. Fundado en 1949, desarrolla equipos que permiten tratar, distribuir, medir y regular gases en todas las etapas de la cadena de suministro, desde el almacenamiento hasta su utilización final.",
      "Su portafolio incluye reguladores de presión para GLP y gas natural, válvulas para cilindros y tanques, equipos de medición de gas, sistemas de llenado y control, y componentes para gases alternativos como hidrógeno o biometano. Estas soluciones permiten gestionar gases comprimidos o licuados de forma segura en aplicaciones energéticas, industriales y comerciales.",
      "Cavagna proporciona tecnología esencial para controlar, distribuir y utilizar gases de forma segura y eficiente en sistemas energéticos e industriales.",
    ],
  },
];

export function getStrategicBrandBySlug(slug: string): StrategicBrand | undefined {
  return STRATEGIC_BRANDS.find((b) => b.slug === slug);
}

export function getAllStrategicBrandSlugs(): string[] {
  return STRATEGIC_BRANDS.map((b) => b.slug);
}

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
