import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/domain/product";
import { cn } from "@/lib/utils";
import { getRelatedProductSummaries } from "@/lib/product-summaries";

function SectionShell({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("section border-t border-border py-12 sm:py-14", className)}
    >
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function TaxonomyPills({ product }: { product: Product }) {
  const pills: { label: string; value: string }[] = [];
  if (product.macroCategoria?.trim()) {
    pills.push({ label: "Macrocategoría", value: product.macroCategoria.trim() });
  }
  if (product.categoria?.trim()) {
    pills.push({ label: "Categoría", value: product.categoria.trim() });
  }
  if (product.tipoBrochure?.trim()) {
    pills.push({ label: "Brochure", value: product.tipoBrochure.trim() });
  }
  if (product.grupoEmpresarial?.trim()) {
    pills.push({ label: "Grupo", value: product.grupoEmpresarial.trim() });
  }
  if (pills.length === 0) return null;
  return (
    <SectionShell title="Clasificación">
      <dl className="flex flex-wrap gap-2">
        {pills.map((p) => (
          <div
            key={p.label}
            className="inline-flex max-w-full flex-col gap-0.5 rounded-lg border border-border bg-muted/40 px-3 py-2"
          >
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {p.label}
            </dt>
            <dd className="text-sm font-medium text-foreground">{p.value}</dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
}

function SpecificationsTable({ rows }: { rows: NonNullable<Product["especificaciones"]> }) {
  if (rows.length === 0) return null;
  return (
    <SectionShell title="Especificaciones técnicas">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Parámetro</th>
              <th className="px-4 py-3 font-semibold">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => (
              <tr key={`${row.nombre}-${i}`} className="bg-card">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-foreground align-top">
                  {row.nombre}
                </td>
                <td className="px-4 py-3 text-foreground/90">{row.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

function ChipList({ title, values }: { title: string; values: string[] }) {
  if (values.length === 0) return null;
  return (
    <div>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {values.map((v) => (
          <li
            key={v}
            className="rounded-full border border-border bg-muted/30 px-3 py-1 text-sm text-foreground"
          >
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FluidosBlock({ product }: { product: Product }) {
  const vals = (product.fluidosYGases ?? []).map((f) => f.valor?.trim()).filter(Boolean) as string[];
  if (vals.length === 0) return null;
  return (
    <SectionShell title="Fluidos y gases">
      <ChipList title="Compatibles" values={vals} />
    </SectionShell>
  );
}

function MaterialesTable({ rows }: { rows: NonNullable<Product["materiales"]> }) {
  if (rows.length === 0) return null;
  return (
    <SectionShell title="Materiales">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Pieza</th>
              <th className="px-4 py-3 font-semibold">Material</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => (
              <tr key={i} className="bg-card">
                <td className="px-4 py-3 font-medium">{row.pieza}</td>
                <td className="px-4 py-3 text-foreground/90">{row.material}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <ul className="list-inside list-disc space-y-1.5 text-sm text-foreground/90">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function AplicacionesMercados({ product }: { product: Product }) {
  const apps = (product.aplicaciones ?? []).map((a) => a.aplicacion?.trim()).filter(Boolean) as string[];
  const merc = (product.mercados ?? []).map((m) => m.mercado?.trim()).filter(Boolean) as string[];
  if (apps.length === 0 && merc.length === 0) return null;
  return (
    <SectionShell title="Aplicaciones y mercados">
      <div className="grid gap-4 sm:grid-cols-2">
        <ListBlock title="Aplicaciones" items={apps} />
        <ListBlock title="Mercados" items={merc} />
      </div>
    </SectionShell>
  );
}

function ProseCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{body}</p>
    </div>
  );
}

function DetallesExtendidos({ product }: { product: Product }) {
  const cards: { title: string; body: string }[] = [];

  for (const b of product.beneficiosEconomicos ?? []) {
    if (b.beneficio?.trim()) cards.push({ title: "Beneficio económico", body: b.beneficio.trim() });
  }
  for (const d of product.datosRendimiento ?? []) {
    if (d.nombre?.trim() && d.valor?.trim()) {
      cards.push({ title: d.nombre.trim(), body: d.valor.trim() });
    }
  }
  for (const o of product.opcionesAccesorios ?? []) {
    const line = o.descripcion ? `${o.nombre}\n${o.descripcion}` : o.nombre;
    if (line?.trim()) cards.push({ title: "Opción o accesorio", body: line.trim() });
  }
  for (const e of product.exactitud ?? []) {
    const line = `${e.descripcion}: ${e.valor}`.trim();
    if (line.length > 1) cards.push({ title: "Exactitud", body: line });
  }
  for (const n of product.nuevasFunciones ?? []) {
    const line = n.descripcion ? `${n.funcion}\n${n.descripcion}` : n.funcion;
    if (line?.trim()) cards.push({ title: "Función", body: line.trim() });
  }
  for (const x of product.entradaVisualizacionUsuario ?? []) {
    const line = x.descripcion ? `${x.tipo}\n${x.descripcion}` : x.tipo;
    if (line?.trim()) cards.push({ title: "Entrada / visualización", body: line.trim() });
  }
  for (const c of product.combustibleCompatible ?? []) {
    if (c.combustible?.trim()) cards.push({ title: "Combustible compatible", body: c.combustible.trim() });
  }
  for (const c of product.conectividadES ?? []) {
    const line = c.descripcion ? `${c.tipo}\n${c.descripcion}` : c.tipo;
    if (line?.trim()) cards.push({ title: "Conectividad y E/S", body: line.trim() });
  }
  for (const c of product.controles ?? []) {
    const line = c.descripcion ? `${c.tipo}\n${c.descripcion}` : c.tipo;
    if (line?.trim()) cards.push({ title: "Control", body: line.trim() });
  }
  for (const v of product.versatilidad ?? []) {
    if (v.descripcion?.trim()) cards.push({ title: "Versatilidad", body: v.descripcion.trim() });
  }
  for (const r of product.regulador ?? []) {
    const parts = [r.modelo, r.descripcion, r.rangoOperacion].filter(Boolean).join("\n");
    if (parts.trim()) cards.push({ title: "Regulador", body: parts });
  }

  if (cards.length === 0) return null;
  return (
    <SectionShell title="Información adicional">
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c, i) => (
          <ProseCard key={`${c.title}-${i}`} title={c.title} body={c.body} />
        ))}
      </div>
    </SectionShell>
  );
}

function MarcaBlock({ product }: { product: Product }) {
  const extra = product.informacionMarca?.trim();
  if (!extra) return null;
  return (
    <SectionShell id="bloque-marca" title="Marca">
      {product.marca?.trim() ? (
        <p className="text-lg font-semibold text-foreground">{product.marca}</p>
      ) : null}
      <div className="mt-4 max-w-3xl whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
        {extra}
      </div>
    </SectionShell>
  );
}

function RelacionadosBlock({ product }: { product: Product }) {
  const summaries = getRelatedProductSummaries(product, { limit: 6 });
  if (summaries.length === 0) return null;
  return (
    <SectionShell title="Productos relacionados">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaries.map((p) => {
          const img = p.imagen ?? "/assets/config/placeholder-image.png";
          const title = p.modelo ?? p.slug;
          return (
            <li key={p.slug}>
              <Link
                href={`/productos/${p.slug}/`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full bg-muted">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width:640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary">
                    {title}
                  </p>
                  {p.marca?.trim() ? (
                    <p className="mt-1 text-xs text-muted-foreground">{p.marca}</p>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}

/**
 * Bloques CMS entre la cabecera de producto y la sección de documentos (PDF).
 * Solo se pintan cuando hay datos en el modelo `Product`.
 */
export function ProductCmsMainSections({ product }: { product: Product }) {
  return (
    <>
      <TaxonomyPills product={product} />
      <SpecificationsTable rows={product.especificaciones ?? []} />
      <FluidosBlock product={product} />
      <MaterialesTable rows={product.materiales ?? []} />
      <AplicacionesMercados product={product} />
      <DetallesExtendidos product={product} />
    </>
  );
}

/** Tras documentos: texto de marca (CMS) y tarjetas de relacionados por slug. */
export function ProductCmsFooterSections({ product }: { product: Product }) {
  return (
    <>
      <MarcaBlock product={product} />
      <RelacionadosBlock product={product} />
    </>
  );
}
