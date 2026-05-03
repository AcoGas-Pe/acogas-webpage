import Link from "next/link";
import type { ReactNode } from "react";

const tableWrap = "my-6 overflow-x-auto rounded-lg border border-border shadow-sm";
const tableClass =
  "w-full min-w-[36rem] border-collapse text-left text-sm text-muted-foreground";
const thClass =
  "border-b border-border bg-muted/50 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground";
const tdClass = "border-b border-border/80 px-3 py-2.5 align-top text-foreground/90";

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
    </a>
  );
}

export function NormativasContent() {
  return (
    <div className="border-b border-border/60 bg-background py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Orientación técnica para proyectos con{" "}
          <strong className="text-foreground">GLP</strong>,{" "}
          <strong className="text-foreground">gas natural</strong>,{" "}
          <strong className="text-foreground">vapor</strong> y combustión
          industrial en el Perú: cadena ley → decreto supremo → supervisión
          (OSINERGMIN) → <abbr title="Normas Técnicas Peruanas">NTP</abbr>{" "}
          referenciadas → estándares internacionales cuando el propio texto
          legal los incorpora. No constituye asesoría legal; conviene validar
          textos vigentes y excepciones sectoriales en cada caso.
        </p>

        <section id="mapa-peru" className="mt-14 scroll-mt-24">
          <h2 className="text-xl font-bold uppercase tracking-[0.06em] text-primary sm:text-2xl">
            Mapa normativo Perú e internacional
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            En la práctica, el cumplimiento se estructura como jerarquía: leyes
            marco (hidrocarburos, creación de OSINERGMIN, SST, cambio
            climático), reglamentos sectoriales del MINEM, procedimientos y
            registros de OSINERGMIN, y NTP exigibles cuando un DS o resolución
            las cita. En GLP, el núcleo es el{" "}
            <strong className="text-foreground">D.S. N.° 27-94-EM</strong> y
            modificatorias, con referencias explícitas a prácticas tipo{" "}
            <strong className="text-foreground">NFPA</strong> y{" "}
            <strong className="text-foreground">ASME</strong>, certificación de
            recipientes y condiciones de seguridad (por ejemplo extintores
            conforme a NTP o alternativos listados). El{" "}
            <strong className="text-foreground">
              RCD N.° 169-2024-OS/CD
            </strong>{" "}
            regula el libro electrónico de inspecciones de tanques de GLP,
            vinculado a registro digital ante la supervisión.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            En gas natural por red, el{" "}
            <strong className="text-foreground">D.S. N.° 042-99-EM</strong> y
            texto único ordenado incorporan{" "}
            <strong className="text-foreground">ANSI/ASME B31.8</strong> como
            referencia técnica central. En transporte por ductos, el{" "}
            <strong className="text-foreground">D.S. N.° 081-2007-EM</strong>{" "}
            alinea manuales y prácticas con{" "}
            <strong className="text-foreground">ASME B31.4/B31.8</strong> y
            listados de estándares API/ASME para materiales, soldadura,
            integridad y operación. Para vapor y recipientes, conviven el
            marco histórico de seguridad industrial (por ejemplo{" "}
            <strong className="text-foreground">D.S. 42-F</strong>) con la
            familia de <strong className="text-foreground">NTP 350.30x</strong>{" "}
            sobre eficiencia, instalación e inspección de calderas.
          </p>

          <h3 className="mt-10 text-base font-bold text-foreground sm:text-lg">
            Instrumentos peruanos frecuentes en planta
          </h3>
          <div className={tableWrap}>
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={thClass}>Instrumento</th>
                  <th className={thClass}>Enfoque</th>
                  <th className={thClass}>Notas de aplicación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tdClass}>Ley N.° 26221, TUO D.S. 042-2005-EM</td>
                  <td className={tdClass}>Marco hidrocarburos</td>
                  <td className={tdClass}>
                    Base para reglamentos de seguridad y comercialización.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>Ley N.° 26734</td>
                  <td className={tdClass}>OSINERGMIN</td>
                  <td className={tdClass}>
                    Competencias de fiscalización en energía e hidrocarburos.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>D.S. N.° 043-2007-EM</td>
                  <td className={tdClass}>Seguridad en actividades</td>
                  <td className={tdClass}>
                    Gestión de riesgos, planes de contingencia; referencias a
                    estándares técnicos.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>D.S. N.° 27-94-EM (+ mod.)</td>
                  <td className={tdClass}>GLP instalaciones y transporte</td>
                  <td className={tdClass}>
                    Tanques, redes, operación; NFPA/ASME; inspecciones y
                    certificación.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>RCD N.° 169-2024-OS/CD</td>
                  <td className={tdClass}>Procedimiento OSINERGMIN</td>
                  <td className={tdClass}>
                    Libro electrónico de inspecciones de tanques GLP.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>D.S. N.° 042-99-EM, TUO D.S. 040-2008-EM</td>
                  <td className={tdClass}>GN por red</td>
                  <td className={tdClass}>
                    Incorpora B31.8 en anexo de seguridad; operación del
                    sistema.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>D.S. N.° 081-2007-EM</td>
                  <td className={tdClass}>Ductos</td>
                  <td className={tdClass}>
                    Integridad, manuales, O&amp;M; listado amplio API/ASME.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>D.S. N.° 052-93-EM</td>
                  <td className={tdClass}>Almacenamiento</td>
                  <td className={tdClass}>
                    Tanques API/UL, recipientes ASME, PCI NFPA según listado.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>CNE Utilización (R.M. 037-2006-MEM/DM)</td>
                  <td className={tdClass}>Instalaciones eléctricas</td>
                  <td className={tdClass}>
                    Zonas clasificadas, puesta a tierra, equipos en atmósferas
                    peligrosas.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>Ley N.° 29783, D.S. 005-2012-TR</td>
                  <td className={tdClass}>SST</td>
                  <td className={tdClass}>
                    Obligaciones del empleador y gestión preventiva en planta.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>NTP 321.123, 350.30x, 350.043-1, etc.</td>
                  <td className={tdClass}>Normalización INACAL</td>
                  <td className={tdClass}>
                    Exigibles cuando el reglamento las referencia; adquisición
                    vía{" "}
                    <ExternalLink href="https://www.inacal.gob.pe/cid/categoria/normas-tecnicas-peruanas">
                      INACAL
                    </ExternalLink>
                    .
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="puentes-internacionales" className="mt-14 scroll-mt-24">
          <h2 className="text-xl font-bold uppercase tracking-[0.06em] text-primary sm:text-2xl">
            Estándares internacionales que suelen anclar el diseño
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Las normas extranjeras no son obligatorias por sí solas: lo son
            cuando el DS o la NTP las incorporan o las usan como criterio de
            diseño o listado.
          </p>
          <div className={tableWrap}>
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={thClass}>Estándar</th>
                  <th className={thClass}>Uso típico en proyecto</th>
                  <th className={thClass}>Vínculo peruano (orientativo)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tdClass}>NFPA 58</td>
                  <td className={tdClass}>Instalaciones y seguridad GLP</td>
                  <td className={tdClass}>
                    Citada en reglamentos de GLP y almacenamiento cuando aplica.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>ASME BPVC Sec. VIII Div. 1</td>
                  <td className={tdClass}>Recipientes a presión</td>
                  <td className={tdClass}>
                    Referenciado en GLP y almacenamiento de hidrocarburos.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>ASME B31.8</td>
                  <td className={tdClass}>Tuberías de transmisión/distribución de gas</td>
                  <td className={tdClass}>
                    Incorporado en D.S. 042-99-EM y usado en D.S. 081-2007-EM.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>API 650 / UL 142 / UL 58</td>
                  <td className={tdClass}>Tanques de almacenamiento</td>
                  <td className={tdClass}>Listados en D.S. 052-93-EM.</td>
                </tr>
                <tr>
                  <td className={tdClass}>IEC 60079-14 / 60079-29-0</td>
                  <td className={tdClass}>Zonas Ex y detección de gases</td>
                  <td className={tdClass}>
                    Buena práctica de ingeniería complementaria a CNE y
                    seguridad de proceso.
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>ISO 45001 / ISO 14064-1</td>
                  <td className={tdClass}>SST y cuantificación GEI</td>
                  <td className={tdClass}>
                    Marco de gestión y MRV alineable a obligaciones y proyectos
                    de mitigación.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="temas" className="mt-14 scroll-mt-24">
          <h2 className="text-xl font-bold uppercase tracking-[0.06em] text-primary sm:text-2xl">
            Comparativo por tema (subsistema)
          </h2>
          <div className={tableWrap}>
            <table className={`${tableClass} min-w-[42rem]`}>
              <thead>
                <tr>
                  <th className={thClass}>Tema</th>
                  <th className={thClass}>Perú (referencia)</th>
                  <th className={thClass}>Base internacional habitual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tdClass}>Tanques GLP</td>
                  <td className={tdClass}>D.S. 27-94-EM, libro de inspecciones</td>
                  <td className={tdClass}>ASME VIII, NFPA 58</td>
                </tr>
                <tr>
                  <td className={tdClass}>CD y redes GLP</td>
                  <td className={tdClass}>D.S. 065-2008-EM, NTP 321.123</td>
                  <td className={tdClass}>NFPA 58 (prácticas de seguridad)</td>
                </tr>
                <tr>
                  <td className={tdClass}>GN por red</td>
                  <td className={tdClass}>D.S. 042-99-EM / TUO</td>
                  <td className={tdClass}>ASME B31.8</td>
                </tr>
                <tr>
                  <td className={tdClass}>Ductos</td>
                  <td className={tdClass}>D.S. 081-2007-EM</td>
                  <td className={tdClass}>B31.4/B31.8, API (soldadura, RBI, etc.)</td>
                </tr>
                <tr>
                  <td className={tdClass}>Calderas y vapor</td>
                  <td className={tdClass}>NTP 350.300–303, D.S. 42-F (marco clásico)</td>
                  <td className={tdClass}>ASME BPVC, métodos de eficiencia</td>
                </tr>
                <tr>
                  <td className={tdClass}>PCI portátil</td>
                  <td className={tdClass}>NTP 350.0xx; alternativas listadas</td>
                  <td className={tdClass}>ANSI/UL según guías sectoriales</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="clima-carbono" className="mt-14 scroll-mt-24">
          <h2 className="text-xl font-bold uppercase tracking-[0.06em] text-primary sm:text-2xl">
            Clima, mitigación y mercados de carbono
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            El marco peruano combina la Ley Marco de Cambio Climático y su
            reglamento, instrumentos como RENAMI, y cooperación bajo el
            artículo 6 del Acuerdo de París (por ejemplo acuerdos bilaterales).
            En mercados voluntarios suelen usarse estándares como{" "}
            <strong className="text-foreground">VCS (Verra)</strong> y{" "}
            <strong className="text-foreground">Gold Standard</strong>,
            complementados por ISO 14064-1 para inventarios y reporte
            verificable.
          </p>
        </section>

        <section id="internacional-gratis" className="mt-14 scroll-mt-24">
          <h2 className="text-xl font-bold uppercase tracking-[0.06em] text-primary sm:text-2xl">
            Acceso a normas internacionales: rutas oficiales
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Algunos organismos publican texto completo en PDF de forma gratuita
            (ITU-T, IETF, ETSI, Codex Alimentarius, OIML, W3C, OASIS, textos
            legales OMC). Otros ofrecen previsualización (por ejemplo{" "}
            <ExternalLink href="https://www.iso.org/obp">ISO OBP</ExternalLink>
            ), estándares ISO/IEC de TI a precio cero en tiendas en casos
            puntuales, o lectura en línea sin descarga cuando la norma está{" "}
            <em>incorporada por referencia</em> en regulación (portales tipo
            IBR de API, ASTM, NFPA, UL, ANSI). Respete siempre los términos de
            uso: muchas lecturas gratuitas prohíben imprimir o redistribuir.
          </p>
          <div className={tableWrap}>
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={thClass}>Organismo</th>
                  <th className={thClass}>Tipo de acceso gratuito típico</th>
                  <th className={thClass}>Portal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tdClass}>ITU-T</td>
                  <td className={tdClass}>PDF de recomendaciones (salvo textos comunes ISO/IEC)</td>
                  <td className={tdClass}>
                    <ExternalLink href="https://www.itu.int/en/ITU-T/publications/pages/recs.aspx">
                      Recomendaciones ITU-T
                    </ExternalLink>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>IETF</td>
                  <td className={tdClass}>RFC e Internet-Drafts</td>
                  <td className={tdClass}>
                    <ExternalLink href="https://www.rfc-editor.org/">RFC Editor</ExternalLink>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>ETSI</td>
                  <td className={tdClass}>EN/TS/TR en PDF (/deliver/)</td>
                  <td className={tdClass}>
                    <ExternalLink href="https://www.etsi.org/standards">ETSI Standards</ExternalLink>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>ISO</td>
                  <td className={tdClass}>Previsualización de secciones</td>
                  <td className={tdClass}>
                    <ExternalLink href="https://www.iso.org/obp">ISO OBP</ExternalLink>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>IEC</td>
                  <td className={tdClass}>Algunos documentos a costo cero en webstore</td>
                  <td className={tdClass}>
                    <ExternalLink href="https://webstore.iec.ch/">IEC Webstore</ExternalLink>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>NFPA / ASTM / API / UL</td>
                  <td className={tdClass}>Lectura en línea (IBR / reading room) en normas seleccionadas</td>
                  <td className={tdClass}>
                    <ExternalLink href="https://www.nfpa.org/for-professionals/codes-and-standards/list-of-codes-and-standards/free-access">
                      NFPA
                    </ExternalLink>
                    {" · "}
                    <ExternalLink href="https://www.astm.org/standards-and-solutions/standards-and-publications/reading-room">
                      ASTM
                    </ExternalLink>
                    {" · "}
                    <ExternalLink href="https://www.api.org/products-and-services/standards/ibr-reading-room">
                      API IBR
                    </ExternalLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="fuentes" className="mt-14 scroll-mt-24">
          <h2 className="text-xl font-bold uppercase tracking-[0.06em] text-primary sm:text-2xl">
            Enlaces útiles (fuentes primarias)
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground sm:text-base">
            <li>
              <ExternalLink href="https://www.osinergmin.gob.pe/seccion/centro_documental/Institucional/CRO/Normas/DS-027-1994-EM.pdf">
                D.S. 27-94-EM (GLP)
              </ExternalLink>{" "}
              — OSINERGMIN
            </li>
            <li>
              <ExternalLink href="https://www.gob.pe/institucion/osinergmin/normas-legales/5990828-169-2024-os-cd">
                RCD 169-2024-OS/CD (libro electrónico tanques GLP)
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.osinergmin.gob.pe/seccion/centro_documental/PlantillaMarcoLegalBusqueda/Decreto%20Supremo%20N%C2%BA%20042-99-EM.pdf">
                D.S. 042-99-EM (distribución GN)
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.osinergmin.gob.pe/seccion/centro_documental/PlantillaMarcoLegalBusqueda/DS-081-2007-EM.pdf">
                D.S. 081-2007-EM (ductos)
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.osinergmin.gob.pe/seccion/centro_documental/PlantillaMarcoLegalBusqueda/DS-052-93-EM.pdf">
                D.S. 052-93-EM (almacenamiento)
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.minam.gob.pe/cambioclimatico/wp-content/uploads/sites/127/2018/12/REGLAMENTO-DE-LA-LEY-MARCO-SOBRE-CAMBIO-CLIMATICO_20.12.pdf">
                Reglamento Ley Marco de Cambio Climático (MINAM)
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://unfccc.int/process-and-meetings/the-paris-agreement/article-64-mechanism">
                Artículo 6.4 — UNFCCC
              </ExternalLink>
            </li>
          </ul>
          <p className="mt-10 text-sm text-muted-foreground">
            Para una revisión aplicada a su instalación,{" "}
            <Link href="/contacto?tipo=diagnostico" className="font-medium text-primary hover:underline">
              solicite un diagnóstico o visita técnica
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
