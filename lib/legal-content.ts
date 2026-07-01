import { BUSINESS_INFO, CONTACT } from "@/lib/business-config";

const companyName = BUSINESS_INFO.name.trim();
const contactEmail = CONTACT.email[0];
const websiteUrl = BUSINESS_INFO.websiteUrl;

export const PRIVACY_POLICY_SECTIONS = [
  {
    title: "1. Responsable del tratamiento",
    paragraphs: [
      `${companyName} (en adelante, "Acogas"), con domicilio en ${CONTACT.address}, es responsable del tratamiento de los datos personales que usted nos proporcione a través de este sitio web, formularios de contacto, cotización o canales digitales asociados.`,
    ],
  },
  {
    title: "2. Datos que recopilamos",
    paragraphs: [
      "Podemos recopilar datos de identificación y contacto (nombre, empresa, cargo, correo electrónico, teléfono), datos relacionados con su consulta o requerimiento técnico-comercial, y datos de navegación obtenidos mediante cookies o tecnologías similares cuando usted interactúa con el sitio.",
    ],
  },
  {
    title: "3. Finalidad del tratamiento",
    paragraphs: [
      "Utilizamos sus datos para atender solicitudes de información, visitas técnicas, diagnósticos, cotizaciones y soporte; gestionar la relación comercial; mejorar nuestros servicios y la experiencia del sitio; cumplir obligaciones legales; y, cuando corresponda y con su consentimiento, enviar comunicaciones comerciales sobre productos y servicios de Acogas.",
    ],
  },
  {
    title: "4. Base legal",
    paragraphs: [
      "El tratamiento se realiza sobre la base de la ejecución de medidas precontractuales o contractuales, el interés legítimo de Acogas en responder consultas y mejorar sus servicios, el cumplimiento de obligaciones legales y, en su caso, su consentimiento expreso.",
    ],
  },
  {
    title: "5. Conservación y seguridad",
    paragraphs: [
      "Conservamos los datos durante el tiempo necesario para cumplir las finalidades indicadas y las obligaciones legales aplicables. Implementamos medidas técnicas y organizativas razonables para proteger la confidencialidad e integridad de la información.",
    ],
  },
  {
    title: "6. Cesión y transferencias",
    paragraphs: [
      "No vendemos datos personales. Podemos compartir información con proveedores que nos prestan servicios de hosting, analítica, comunicaciones o CRM, siempre bajo obligaciones de confidencialidad. Si se realizaran transferencias internacionales, se adoptarán las garantías previstas por la normativa aplicable.",
    ],
  },
  {
    title: "7. Sus derechos",
    paragraphs: [
      `Usted puede ejercer sus derechos de acceso, rectificación, cancelación, oposición, portabilidad, limitación del tratamiento y revocación del consentimiento escribiendo a ${contactEmail}. También puede presentar una reclamación ante la autoridad de protección de datos competente en el Perú.`,
    ],
  },
  {
    title: "8. Cookies",
    paragraphs: [
      "Este sitio puede utilizar cookies propias y de terceros para fines funcionales, analíticos o de mejora de contenido. Puede configurar su navegador para rechazarlas, aunque ello podría afectar algunas funcionalidades.",
    ],
  },
  {
    title: "9. Cambios a esta política",
    paragraphs: [
      "Acogas podrá actualizar esta Política de Privacidad para reflejar cambios legales o operativos. La versión vigente estará publicada en esta página con la fecha de actualización correspondiente.",
    ],
  },
] as const;

export const TERMS_SECTIONS = [
  {
    title: "1. Aceptación",
    paragraphs: [
      `Al acceder y utilizar ${websiteUrl} (el "Sitio"), usted acepta estos Términos y Condiciones. Si no está de acuerdo, le solicitamos no utilizar el Sitio.`,
    ],
  },
  {
    title: "2. Objeto del Sitio",
    paragraphs: [
      "El Sitio tiene carácter informativo y comercial. Presenta soluciones, productos, servicios y recursos técnicos de Acogas en GLP, gas natural, vapor y procesos industriales. La información no constituye asesoría legal ni ingeniería vinculante hasta ser confirmada por escrito en el marco de una relación comercial formal.",
    ],
  },
  {
    title: "3. Uso permitido",
    paragraphs: [
      "Usted se compromete a utilizar el Sitio de forma lícita, sin intentar vulnerar su seguridad, interferir en su funcionamiento, extraer contenido de manera automatizada no autorizada ni utilizar la información con fines fraudulentos o que perjudiquen a Acogas o a terceros.",
    ],
  },
  {
    title: "4. Propiedad intelectual",
    paragraphs: [
      "Los textos, imágenes, logotipos, marcas, diseños y demás contenidos del Sitio son propiedad de Acogas o de sus licenciantes y están protegidos por la legislación aplicable. Queda prohibida su reproducción, distribución o modificación sin autorización previa por escrito, salvo uso personal y no comercial limitado.",
    ],
  },
  {
    title: "5. Marcas de terceros",
    paragraphs: [
      "Las marcas de fabricantes representados o mencionados en el Sitio pertenecen a sus respectivos titulares. Su inclusión no implica afiliación distinta a la relación comercial o de representación que Acogas declare expresamente.",
    ],
  },
  {
    title: "6. Cotizaciones y contratación",
    paragraphs: [
      "Las solicitudes enviadas por formularios o canales digitales no generan obligación de suministro hasta que Acogas emita una propuesta o contrato formal. Precios, plazos, especificaciones y condiciones comerciales se confirman caso por caso.",
    ],
  },
  {
    title: "7. Limitación de responsabilidad",
    paragraphs: [
      "Acogas procura mantener la información del Sitio actualizada y precisa, pero no garantiza que esté libre de errores u omisiones. En la medida permitida por la ley, Acogas no será responsable por daños indirectos derivados del uso o imposibilidad de uso del Sitio, ni por decisiones tomadas exclusivamente con base en contenidos publicados sin validación técnica complementaria.",
    ],
  },
  {
    title: "8. Enlaces externos",
    paragraphs: [
      "El Sitio puede incluir enlaces a sitios de terceros. Acogas no controla ni asume responsabilidad por el contenido o las prácticas de privacidad de dichos sitios.",
    ],
  },
  {
    title: "9. Legislación aplicable",
    paragraphs: [
      "Estos Términos se rigen por las leyes de la República del Perú. Cualquier controversia será sometida a los tribunales competentes de Lima, salvo disposición legal imperativa en contrario.",
    ],
  },
  {
    title: "10. Contacto",
    paragraphs: [
      `Para consultas sobre estos Términos puede escribir a ${contactEmail} o comunicarse a través de la página de contacto del Sitio.`,
    ],
  },
] as const;

export const LEGAL_LAST_UPDATED = "1 de julio de 2026";
