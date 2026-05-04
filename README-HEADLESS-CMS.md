# Plan: WordPress como CMS headless para productos

Este documento describe el enfoque para sustituir los datos estáticos de `lib/products-data.ts` por contenido gestionado en **WordPress en modo headless**, alineado con el modelo de dominio `Product` (`domain/product/types.ts`) y con lo que consumen hoy la **ficha de producto**, el **catálogo** y el **carrito de cotización**.

## Objetivo

- **WordPress** como back-office: edición de fichas, medios y documentos.
- **Next.js (este repo)** como front: obtiene JSON vía API, mapea a `Product` y mantiene rutas `/productos/` y `/productos/[slug]/`.
- **Contrato de datos** estable: lo que el CMS publica debe poder transformarse al tipo `Product` sin ambigüedad.

## Arquitectura propuesta

1. **WordPress** expone contenido con **REST API** nativa o **WPGraphQL** (recomendado si el catálogo crece: consultas anidadas, menos over-fetching).
2. **Campos estructurados** con Advanced Custom Fields (ACF), Meta Box u otro sistema que genere esquemas claros para repetidores y grupos (equivalente a los arrays del dominio).
3. **Medios**: imagen principal y archivos del catálogo en la biblioteca de medios; las URLs deben ser absolutas o resolverse a la URL pública del CDN/dominio que sirva los PDF.
4. **Next.js**: una capa `lib/products-cms.ts` (o similar) que llame a la API, adapte nombres de campos WP → `Product`, y reemplace `getAllProducts` / `getProductBySlug` / `getAllProductSlugs`.
5. **Actualización de contenido**: `revalidatePath` / `revalidateTag` en Next cuando WordPress dispare un webhook al publicar o actualizar un producto (evita depender solo de build estático si se usa ISR).

## Fases sugeridas

| Fase | Alcance |
|------|--------|
| **1 – MVP** | Campos que la UI usa **hoy** en detalle, listado, SEO y cotización (tabla “Uso en la app” más abajo). |
| **2 – Ficha enriquecida** | Secciones nuevas: **marca** (contenido propio, no solo el nombre), **productos relacionados**, bloque de **información técnica / demás datos** (`especificaciones` y resto del dominio ya tipado). |
| **3 – Dominio y operación** | Campos avanzados ya en `Product` que aún no tienen UI, webhooks, caché, entornos y convenciones editoriales. |

## Mapa de secciones en la página de producto

Orden sugerido para UX y para modelar en el CMS (cada bloque puede ser un grupo ACF o un CPT enlazado).

| Sección | Rol | Estado en código |
|---------|-----|-------------------|
| **Cabecera / ficha principal** | Imagen, modelo, marca, bullets de características, CTA cotización y ancla a documentos | Implementado (`ProductsMainSection`) |
| **Documentos relacionados** | PDFs por categoría (tabs) | Implementado (`AdditionalProductData`) |
| **Marca (ampliada)** | Logo, texto corporativo, enlace a landing de marca, quizá certificaciones | Parcial: solo título “Marca” + nombre en `app/productos/[slug]/page.tsx`; conviene **CPT Marca** o grupo reutilizable |
| **Productos relacionados** | Cross-sell, mismas categoría/marca o curaduría manual | Pendiente: requiere relación N↔N o lista de slugs en el producto |
| **Información adicional** | Tablas tipo especificaciones, fluidos, aplicaciones, etc. | Pendiente en UI; datos ya previstos en `Product` |

En WordPress tiene sentido **no meter todo en un solo repeater gigante**: la ficha “comercial” (hero + características), la **marca** (referencia a entidad Marca) y **relacionados** (referencias a otros productos) son piezas distintas con distintos editores y permisos.

## Información crítica (qué no puede faltar)

“Crítico” aquí significa: **rompe URL, SEO, cotización, catálogo o deja la ficha vacía de forma inaceptable**.

### Nivel A — Obligatorio siempre

| Dato | Por qué es crítico |
|------|---------------------|
| **`slug`** | Define la URL, `generateStaticParams`, gate de descargas y **carrito de cotización** (solo persiste slug + cantidad). Sin slug estable no hay producto navegable ni línea de carrito recuperable. |
| **`modelo`** | Título visible y H1; sin él la ficha y el catálogo pierden identidad clara (solo quedaría slug técnico). |
| **`marca`** | Breadcrumb, enlace a marca, título SEO; en catálogo es faceta y texto de búsqueda. Debe ser **texto canónico** (o clave a CPT Marca) para no duplicar “Fisher” vs “FISHER”. |

### Nivel B — Obligatorio para que el catálogo y filtros tengan sentido

Si el listado `/productos/` debe seguir siendo útil, estos campos deben estar rellenos de forma coherente (no hace falta que todos existan en *cada* producto, pero sí en la mayoría donde apliquen):

| Dato | Por qué |
|------|--------|
| **`macroCategoria`**, **`categoria`**, **`tipoBrochure`** | Alimentan facetas; vacíos concentran todo en “sin categoría” y degradan el filtrado. |
| **`fluidosYGases`** | Faceta y búsqueda por fluido; vacío = el producto no aparece al filtrar por fluidos. |
| **`grupoEmpresarial`** | Opcional por producto, pero si lo usan como faceta, convención única por valor. |

### Nivel C — Crítico para una ficha “vendible” (no rompe la app, sí la experiencia)

| Dato | Por qué |
|------|--------|
| **`imagen`** | Sin imagen hay placeholder; la ficha funciona pero pierde impacto. |
| **`caracteristicas`** (al menos 1–3 ítems) | El bloque principal hoy depende de esta lista; vacía deja un hueco grande bajo “Características”. |
| **`descripcion`** | Opcional para UI actual, pero **crítica para SEO** si no hay otro texto meta. |

### Nivel D — Importante pero no bloqueante

| Dato | Por qué |
|------|--------|
| **`catalogoDocs`** | Si está vacío, la sección de documentos no se muestra; la ficha sigue siendo válida. |
| **`itemId`** | Útil para ERP/cotización backend; la web puede vivir sin él hasta integrar. |

### Nuevas secciones: qué es crítico

| Sección | Mínimo crítico en CMS | Notas |
|---------|----------------------|--------|
| **Productos relacionados** | Lista ordenada de **referencias a otros productos** (IDs o slugs); idealmente 3–6 ítems. Sin curaduría, se puede **calcular en Next** (misma `marca` + `categoria`) como respaldo, pero entonces el “crítico” pasa a ser tener **marca/categoría** bien poblados. |
| **Marca (bloque enriquecido)** | **Identificador estable de marca** (slug de taxonomía o CPT) compartido por todos los productos de esa marca; más **nombre para mostrar**. Logo y texto largo son **deseables**, no bloqueantes para enlazar. |
| **Demás información (técnica)** | Para publicar la sección hace falta al menos un bloque con datos (p. ej. `especificaciones`); hasta que exista UI, puede vivir solo en el CMS como preparación. |

## Modelo de contenido en WordPress (orientativo)

- **Custom Post Type** `product` (slug del CPT coherente con la URL o solo interno).
- **Slug del post** = `Product.slug` (único, estable; define `/productos/[slug]/`).
- **Taxonomías opcionales** para valores repetidos y filtros homogéneos: por ejemplo `marca`, `macro_categoria`, `categoria`, `tipo_brochure`, `grupo_empresarial`. Alternativa: campos de texto con listas predefinidas en ACF para evitar duplicados tipográficos.
- **Repeater “Catálogo de documentos”** con subcampos equivalentes a `CatalogoDocs`: categoría (texto o select alineado con `Generales` \| `Específicos` \| `Esquemáticos` y categorías extra), URL del archivo, nombre visible, páginas opcional.

### Marca como entidad (recomendado para la sección “información de la marca”)

- **CPT `marca`** (o taxonomía jerárquica solo si no necesitan página rica): campos como nombre oficial, **slug** (para URL `/marcas/fisher/` o la convención que adopten), logo, descripción larga, web del fabricante, bloques opcionales (certificaciones, líneas de producto).
- En el **producto**: relación “Marca” → una entrada `marca` (o término de taxonomía). El campo texto `marca` en `Product` puede derivarse del nombre del término/CPT para no duplicar.
- Evita usar solo `marca` como texto libre para la URL del breadcrumb actual (`marca.toLowerCase()`): es frágil con acentos y espacios; mejor **slug de marca** explícito desde el CMS.

### Productos relacionados

- **Opción 1 (curaduría):** campo ACF *Post Object* (múltiple) “Productos relacionados” en el CPT producto. Crítico: solo referencias a posts publicados; orden manual.
- **Opción 2 (automática en front):** sin campo en WP; Next calcula vecinos por `marca` + `categoria` (o `macroCategoria`). Crítico: taxonomías/categorías bien cargadas.
- **Opción 3 (híbrida):** si el editor rellena relaciones, se muestran esas; si no, fallback al algoritmo. Requiere regla clara en documentación para no mezclar criterios sin querer.

### Otra sección (“demás información”)

- Agrupar en WP como **pestañas o anclas** según diseño: `especificaciones`, `fluidosYGases` (tabla distinta a bullets), `aplicaciones`, etc., mapeando 1:1 a subtipos ya definidos en `domain/product/types.ts`.
- Publicar en web solo cuando el componente exista; el CMS puede ir adelantado al front.

## Datos requeridos y uso en la aplicación

El tipo canónico es `Product` en `domain/product/types.ts`. La columna **Uso** indica dónde se consume hoy.

| Campo / grupo | Tipo lógico | Uso en la app |
|---------------|-------------|----------------|
| `slug` | string único | Ruta ficha, `generateStaticParams`, documentos (gate por slug), carrito de cotización (solo guarda slug + cantidad). |
| `modelo` | string | Título H1, cards catálogo, breadcrumbs, metadatos. |
| `marca` | string | Ficha, breadcrumbs, SEO title; facetas y búsqueda en catálogo. |
| `descripcion` | string opcional | SEO `description` si existe. |
| `imagen` | URL string opcional | Hero ficha y cards; si falta, placeholder del proyecto. |
| `caracteristicas` | lista de strings | Lista “Características” en ficha principal. |
| `catalogoDocs` | lista `{ categoria, url, nombre, paginas? }` | Sección “Documentos relacionados” con pestañas por categoría. |
| `macroCategoria` | string | Facetas y búsqueda catálogo. |
| `categoria` | string | Facetas y búsqueda catálogo. |
| `tipoBrochure` | string | Facetas, búsqueda y pills en cards. |
| `grupoEmpresarial` | string opcional | Facetas y búsqueda catálogo. |
| `fluidosYGases` | lista `{ valor }` | Faceta “fluidos” y búsqueda libre en catálogo. |
| `itemId` | string | Identificador de negocio / integración futura; reservar en CMS aunque la UI actual no lo muestre. |

### Campos del dominio aún no pintados en la ficha (fase 2 / reserva CMS)

Convienen en WordPress como repeaters o grupos para no migrar dos veces cuando la UI los incorpore: `submodelo`, `especificaciones`, `materiales`, `aplicaciones`, `mercados`, `beneficiosEconomicos`, `datosRendimiento`, `opcionesAccesorios`, `exactitud`, `nuevasFunciones`, `entradaVisualizacionUsuario`, `combustibleCompatible`, `conectividadES`, `controles`, `versatilidad`, `regulador`. Hoy existen en el tipo y en datos de ejemplo pero no en los componentes de sección visibles de producto.

## Reglas editoriales importantes

- **Slugs**: únicos, en minúsculas, sin espacios; alineados con enlaces internos y carrito ya persistido por slug.
- **Documentos**: URLs accesibles públicamente (o firmadas si el bucket es privado; en ese caso la capa Next debe resolver el enlace temporal al descargar).
- **Categorías de documentos**: el front ordena primero `Generales`, `Específicos`, `Esquemáticos`; otras categorías aparecen después en orden alfabético.
- **Textos de taxonomía / filtros**: consistencia literal entre productos (misma capitalización y nombre) para que las facetas agrupen correctamente.

## Seguridad y rendimiento

- Autenticación de API: lectura pública solo de lo necesario; edición solo en wp-admin.
- **CORS** y dominios permitidos si el front llama al browser (preferible fetch en servidor Next para no exponer secretos).
- Limitar tamaño de respuesta (paginación en listado de productos si el catálogo crece).
- Considerar **imagen optimizada** (Next/Image) con dominios remotos configurados en `next.config` para el host de medios de WordPress.

## Criterio de “listo para producción”

- Todos los productos publicados en WP tienen al menos: `slug`, `modelo`, `marca`, y los campos de taxonomía que el catálogo necesita para facetas coherentes.
- El adaptador WP → `Product` tiene pruebas o validación en build (p. ej. Zod) para fallar explícito si falta un campo obligatorio.
- Webhook (o cron ligero) invalida caché en Next al publicar cambios.

## Apéndice: CSV de ejemplo (Liquid Controls)

Referencia interna: export tipo hoja «Productos Liquid Controls» (leyenda de colores para idioma de brochure; no viaja en el CSV como dato estructurado).

- **10 productos** (`Item` 1–10), marca implícita **Liquid Controls** (no hay columna `marca` en el archivo).
- **Filas de continuación**: un mismo `Item` puede ocupar varias filas; columnas **Catálogo** (`Generales` / `Especificos` / `Otros`) acumulan más PDFs. En la muestra, **Generales** suele ir `-` y los enlaces viven en **Especificos** u **Otros**.
- **Clasificación**: dos textos por producto — «Según Resumenes» y «Según Brochures» — alineables a `macroCategoria` / `categoria` o a taxonomías CMS previa normalización (p. ej. «Medidores de Desplazamiento Positivo» + «Medidores de flujo»).
- **Bloques largos en celda**: `Características` y `Especificaciones` vienen como texto multilínea (listas numeradas y sub-bloques por submodelo). Hay que **parsear** a `caracteristicas: string[]` y `especificaciones: { nombre, valor }[]` con reglas claras (o guardar HTML/Markdown en CMS y un solo campo rico).
- **Opciones y accesorios** / **Exactitud** / **Nuevas funciones**: columnas presentes; en la muestra a menudo `-` o comparten el mismo patrón largo que el tipo `Product` ya contempla.
- **Imagen**: nombre de archivo (`*.png`); falta **URL** hasta subir a medios o `/public`.
- **Catálogo ↔ `catalogoDocs`**: cada celda de documento combina «`nombre.pdf` + línea en blanco + rango de páginas o `Todo`». Mapeo sugerido: `Especificos` → categoría de tab `Específicos`; `Otros` → pestaña **Otros** (el front ya admite categorías extra tras las tres principales). Falta **`url`**: resolver por convención de carpeta o campo en CMS.
- **Fuera del CSV** respecto al catálogo web actual: `slug`, `tipoBrochure`, `grupoEmpresarial`, `fluidosYGases` — conviene derivarlos (reglas por familia) o añadir columnas en futuras exportaciones.

## Referencias en código

- Contrato de dominio: `domain/product/types.ts`
- Fuente actual reemplazable: `lib/products-data.ts`
- Ficha: `app/productos/[slug]/page.tsx`, `components/sections/producto/main-section.tsx`, `components/sections/producto/extra-data.tsx`
- Catálogo y filtros: `app/productos/page.tsx`, `components/productos/products-catalog-client.tsx`, `lib/product-catalog.ts`
