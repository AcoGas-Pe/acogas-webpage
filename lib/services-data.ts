import type { Service } from "@/domain/service";

const SERVICES: Service[] = [
  {
    slug: "ingenieria-dimensionamiento",
    title: "Ingeniería y Dimensionamiento",
    shortTitle: "Ingeniería",
    icon: "Ruler",
    description: "Soluciones a medida para cada proyecto industrial.",
    longDescription: "Diseñamos soluciones técnicas personalizadas para cada proyecto. Nuestro equipo de ingeniería realiza el dimensionamiento de equipos, cálculo de capacidades y especificaciones técnicas según sus requerimientos operativos específicos. Más de 50 años de experiencia nos respaldan en proyectos de GLP, Gas Natural, Vapor y procesos industriales.",
    heroImage: "/assets/images/refinery.webp",
    features: [
      { title: "Ingeniería Conceptual", description: "Desarrollo de conceptos y evaluación de alternativas técnicas para su proyecto." },
      { title: "Ingeniería de Detalle", description: "Diseño detallado, especificaciones y planos de instalación completos." },
      { title: "Dimensionamiento de Equipos", description: "Cálculo preciso de capacidades según condiciones de operación." },
      { title: "Especificaciones Técnicas", description: "Documentación técnica para compra y montaje de equipos." }
    ],
    benefits: [
      { title: "Experiencia Comprobada", description: "Más de 50 años en proyectos industriales en Perú." },
      { title: "Soluciones Personalizadas", description: "Diseños adaptados a sus necesidades específicas." },
      { title: "Reducción de Riesgos", description: "Identificación temprana de problemas potenciales." },
      { title: "Optimización de Costos", description: "Dimensionamiento correcto evita sobrecostos." }
    ],
    applications: [
      { industry: "Proyectos Nuevos", useCase: "Diseño e implementación de instalaciones greenfield." },
      { industry: "Ampliaciones", useCase: "Expansión de capacidad en plantas existentes." },
      { industry: "Modernizaciones", useCase: "Actualización de equipos y sistemas obsoletos." },
      { industry: "Conversión de Combustible", useCase: "Cambio de fuente energética en plantas industriales." }
    ],
    faqs: [
      { question: "¿Qué información necesitan para iniciar un proyecto?", answer: "Necesitamos conocer las condiciones de operación (presión, temperatura, caudal), el tipo de fluido, las normativas aplicables y los requerimientos específicos de su proceso." },
      { question: "¿Realizan visitas técnicas para levantamiento de información?", answer: "Sí, realizamos visitas técnicas para evaluar las condiciones actuales y recopilar la información necesaria para el dimensionamiento." },
      { question: "¿Incluyen la ingeniería de instalación?", answer: "Sí, proporcionamos planos de instalación, isométricos y detalles constructivos según el alcance acordado." }
    ],
    relatedProducts: [],
    ctaTitle: "¿Tiene un proyecto en mente?",
    ctaDescription: "Conversemos sobre cómo podemos ayudarle a diseñar la solución ideal.",
    metaTitle: "Ingeniería y Dimensionamiento | ACOGAS Industrial",
    metaDescription: "Servicios de ingeniería industrial: diseño, dimensionamiento y especificaciones técnicas. Más de 50 años de experiencia en GLP, Gas Natural y Vapor."
  },
  {
    slug: "seleccion-equipos",
    title: "Selección de Equipos",
    shortTitle: "Selección",
    icon: "PackageSearch",
    description: "Elige el equipo ideal para tu aplicación.",
    longDescription: "Le ayudamos a elegir el equipo correcto para su aplicación específica. Nuestra asesoría técnica se basa en las condiciones de operación, normativas vigentes y mejores prácticas de la industria. Trabajamos con las mejores marcas mundiales: Fisher, Emerson, Corken, Cavagna y Liquid Controls.",
    heroImage: "/assets/images/refinery.webp",
    features: [
      { title: "Asesoría Técnica", description: "Análisis de sus requerimientos para identificar la mejor solución." },
      { title: "Comparativa de Alternativas", description: "Evaluación técnica y económica de diferentes opciones." },
      { title: "Cumplimiento Normativo", description: "Selección de equipos que cumplen con OSINERGMIN y normas internacionales." },
      { title: "Marcas Líderes", description: "Acceso a equipos Fisher, Emerson, Corken, Cavagna y Liquid Controls." }
    ],
    benefits: [
      { title: "Equipo Correcto", description: "Evite errores costosos con una selección profesional." },
      { title: "Respaldo Técnico", description: "Soporte del fabricante y nuestro equipo local." },
      { title: "Garantía de Compatibilidad", description: "Equipos adecuados para sus condiciones de operación." },
      { title: "Documentación Completa", description: "Fichas técnicas, certificados y manuales incluidos." }
    ],
    applications: [
      { industry: "GLP Industrial", useCase: "Vaporizadores, reguladores, bombas y medidores." },
      { industry: "Gas Natural", useCase: "Estaciones de regulación, válvulas de control y seguridad." },
      { industry: "Vapor", useCase: "Reguladores, trampas de vapor y válvulas de seguridad." },
      { industry: "Instrumentación", useCase: "Transmisores, controladores y sistemas de medición." }
    ],
    faqs: [
      { question: "¿Qué marcas representan?", answer: "Somos representantes autorizados de Fisher (Emerson), Corken, Cavagna Group y Liquid Controls para Perú." },
      { question: "¿Pueden conseguir equipos de otras marcas?", answer: "Sí, podemos gestionar la importación de equipos de otras marcas reconocidas según sus requerimientos." },
      { question: "¿Incluyen capacitación sobre los equipos?", answer: "Sí, ofrecemos capacitación al personal sobre operación y mantenimiento de los equipos suministrados." }
    ],
    relatedProducts: ["reguladores-ezh-ezhso", "bombas-paletas-deslizantes-serie-z"],
    ctaTitle: "¿Necesita ayuda para elegir el equipo correcto?",
    ctaDescription: "Nuestros especialistas pueden asesorarle en la selección ideal para su aplicación.",
    metaTitle: "Selección de Equipos Industriales | ACOGAS - Asesoría Técnica",
    metaDescription: "Asesoría profesional para selección de equipos industriales. Fisher, Emerson, Corken, Cavagna y Liquid Controls con soporte técnico local."
  },
  {
    slug: "diagnostico-tecnico",
    title: "Diagnóstico Técnico",
    shortTitle: "Diagnóstico",
    icon: "ClipboardCheck",
    description: "Revisión profesional de sus instalaciones.",
    longDescription: "Evaluación completa de sus instalaciones para identificar oportunidades de mejora, riesgos operativos y optimización de procesos. Nuestro equipo técnico realiza inspecciones en campo y genera informes detallados con recomendaciones accionables.",
    heroImage: "/assets/images/refinery.webp",
    features: [
      { title: "Inspección en Campo", description: "Visita técnica para evaluar el estado actual de sus instalaciones." },
      { title: "Análisis Operativo", description: "Revisión de condiciones de operación y parámetros de proceso." },
      { title: "Identificación de Riesgos", description: "Detección de potenciales problemas de seguridad y operación." },
      { title: "Informe Técnico", description: "Documento detallado con hallazgos y recomendaciones." }
    ],
    benefits: [
      { title: "Prevención de Fallas", description: "Identifique problemas antes de que causen paradas." },
      { title: "Optimización de Procesos", description: "Mejore la eficiencia de sus operaciones." },
      { title: "Cumplimiento Normativo", description: "Verifique que sus instalaciones cumplen las normas vigentes." },
      { title: "Decisiones Informadas", description: "Base técnica para planificar inversiones y mejoras." }
    ],
    applications: [
      { industry: "Auditorías Periódicas", useCase: "Revisión programada del estado de instalaciones." },
      { industry: "Pre-adquisición", useCase: "Evaluación técnica antes de comprar una planta." },
      { industry: "Post-incidente", useCase: "Análisis de causas después de una falla o accidente." },
      { industry: "Certificación", useCase: "Preparación para auditorías de certificación." }
    ],
    faqs: [
      { question: "¿Cuánto tiempo toma un diagnóstico?", answer: "Depende del tamaño de la instalación. Una visita típica toma de 4 a 8 horas, y el informe se entrega en 5-7 días hábiles." },
      { question: "¿Qué incluye el informe técnico?", answer: "Incluye descripción del estado actual, hallazgos, fotografías, análisis de riesgos y recomendaciones priorizadas." },
      { question: "¿Pueden realizar diagnósticos en provincias?", answer: "Sí, realizamos visitas técnicas en todo el Perú. Consulte disponibilidad para su zona." }
    ],
    relatedProducts: [],
    ctaTitle: "¿Quiere conocer el estado de sus instalaciones?",
    ctaDescription: "Solicite una visita técnica de diagnóstico con nuestro equipo.",
    metaTitle: "Diagnóstico Técnico Industrial | ACOGAS - Inspección y Evaluación",
    metaDescription: "Servicios de diagnóstico técnico para instalaciones industriales. Inspección en campo, análisis de riesgos e informe con recomendaciones."
  },
  {
    slug: "soporte-tecnico",
    title: "Soporte Técnico",
    shortTitle: "Soporte",
    icon: "Headphones",
    description: "Ayuda especializada cuando la necesite.",
    longDescription: "Acompañamiento técnico continuo para resolver dudas, problemas operativos y consultas sobre sus equipos y sistemas. Nuestro equipo de ingenieros está disponible para brindarle el soporte que necesita, ya sea de forma remota o presencial.",
    heroImage: "/assets/images/refinery.webp",
    features: [
      { title: "Atención Telefónica", description: "Línea directa con ingenieros especializados." },
      { title: "Soporte Remoto", description: "Asistencia técnica por videollamada o correo electrónico." },
      { title: "Resolución de Problemas", description: "Diagnóstico y solución de fallas operativas." },
      { title: "Consultas Técnicas", description: "Respuestas a dudas sobre operación y mantenimiento." }
    ],
    benefits: [
      { title: "Respuesta Rápida", description: "Atención oportuna para minimizar tiempos de parada." },
      { title: "Experiencia Comprobada", description: "Ingenieros con amplio conocimiento de los equipos." },
      { title: "Continuidad Operativa", description: "Soporte para mantener su planta funcionando." },
      { title: "Conocimiento Transferido", description: "Aprenda mientras resolvemos sus dudas." }
    ],
    applications: [
      { industry: "Emergencias Operativas", useCase: "Asistencia inmediata ante fallas críticas." },
      { industry: "Consultas de Operación", useCase: "Dudas sobre ajustes y configuración de equipos." },
      { industry: "Interpretación de Datos", useCase: "Análisis de lecturas y parámetros de proceso." },
      { industry: "Planificación de Mantenimiento", useCase: "Asesoría para programar intervenciones." }
    ],
    faqs: [
      { question: "¿Cuál es el horario de atención?", answer: "Nuestro horario regular es de lunes a viernes de 8:00 a 18:00. Para emergencias, contamos con línea 24/7." },
      { question: "¿Tienen soporte para equipos de cualquier marca?", answer: "Nuestro soporte especializado es para equipos Fisher, Emerson, Corken, Cavagna y Liquid Controls. Para otras marcas, ofrecemos asesoría general." },
      { question: "¿El soporte remoto tiene costo?", answer: "Las consultas básicas para clientes con equipos adquiridos con nosotros no tienen costo. Consulte por planes de soporte extendido." }
    ],
    relatedProducts: [],
    ctaTitle: "¿Necesita ayuda técnica?",
    ctaDescription: "Contáctenos y le conectaremos con un especialista.",
    metaTitle: "Soporte Técnico Industrial | ACOGAS - Ayuda Especializada",
    metaDescription: "Soporte técnico para equipos industriales de GLP, Gas Natural y Vapor. Atención telefónica, remota y presencial con ingenieros especializados."
  },
  {
    slug: "mantenimiento-industrial",
    title: "Mantenimiento Industrial",
    shortTitle: "Mantenimiento",
    icon: "Wrench",
    description: "Cuidado preventivo y correctivo para sus equipos.",
    longDescription: "Servicios de mantenimiento para garantizar la continuidad operativa de sus equipos. Ofrecemos programas de mantenimiento preventivo y atención correctiva con repuestos originales de las mejores marcas mundiales.",
    heroImage: "/assets/images/refinery.webp",
    features: [
      { title: "Mantenimiento Preventivo", description: "Programas periódicos para evitar fallas y extender vida útil." },
      { title: "Mantenimiento Correctivo", description: "Reparación de equipos con diagnóstico profesional." },
      { title: "Repuestos Originales", description: "Componentes certificados de fábrica para cada equipo." },
      { title: "Puesta en Marcha", description: "Commissioning y ajustes después del mantenimiento." }
    ],
    benefits: [
      { title: "Mayor Disponibilidad", description: "Reduzca paradas no programadas con mantenimiento preventivo." },
      { title: "Vida Útil Extendida", description: "Proteja su inversión con cuidado adecuado." },
      { title: "Seguridad Operativa", description: "Equipos en óptimas condiciones reducen riesgos." },
      { title: "Costos Predecibles", description: "Planifique su presupuesto con programas preventivos." }
    ],
    applications: [
      { industry: "Mantenimiento Programado", useCase: "Intervenciones periódicas según horas de operación." },
      { industry: "Overhaul", useCase: "Reconstrucción completa de equipos." },
      { industry: "Paradas de Planta", useCase: "Mantenimiento mayor durante paradas programadas." },
      { industry: "Emergencias", useCase: "Reparación urgente de fallas críticas." }
    ],
    faqs: [
      { question: "¿Ofrecen contratos de mantenimiento?", answer: "Sí, ofrecemos contratos anuales de mantenimiento preventivo con visitas programadas y precios preferenciales en repuestos." },
      { question: "¿Tienen stock de repuestos?", answer: "Sí, mantenemos inventario de repuestos originales Fisher, Corken, Cavagna y Liquid Controls para entrega inmediata." },
      { question: "¿Realizan mantenimiento en provincias?", answer: "Sí, nuestro equipo técnico realiza mantenimientos en todo el Perú. Consulte disponibilidad y costos para su zona." }
    ],
    relatedProducts: [],
    ctaTitle: "¿Necesita mantener sus equipos en óptimas condiciones?",
    ctaDescription: "Solicite una cotización para mantenimiento preventivo o correctivo.",
    metaTitle: "Mantenimiento Industrial | ACOGAS - Preventivo y Correctivo",
    metaDescription: "Servicios de mantenimiento industrial para equipos de GLP, Gas Natural y Vapor. Mantenimiento preventivo, correctivo y repuestos originales."
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}

export function getAllServices(): Service[] {
  return SERVICES;
}
