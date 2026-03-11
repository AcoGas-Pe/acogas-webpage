"use client";

import type { Product, CatalogoDocs } from "@/domain/product";
import  {Download } from "lucide-react";

interface AdditionalProductDataProps {
  product: Product;
}

/* Pending feature after finishing design:
   when trying to download the catalog doc a form must be displayed before to register and then allow the download */

function groupDocsByCategory(docs: CatalogoDocs[]) {
  const groups = new Map<string, CatalogoDocs[]>();
  for (const doc of docs) {
    const list = groups.get(doc.categoria) ?? [];
    list.push(doc);
    groups.set(doc.categoria, list);
  }
  return groups;
}

export function AdditionalProductData({
  product,
}: AdditionalProductDataProps) {
  const docs = product.catalogoDocs ?? [];
  if (docs.length === 0) return null;

  const byCategory = groupDocsByCategory(docs);

  return (
    <section className="flex flex-col py-16 sm:py-20 md:py-24">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">
          Documentos relacionados
        </h2>
        <div className="space-y-4 px-8 py-4 bg-card rounded-lg border border-border">
          {Array.from(byCategory.entries()).map(([categoria, items]) => (
            <div key={categoria}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {categoria}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {items.map((doc, index) => (
                  <li key={`${doc.categoria}-${doc.url}-${index}`}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-md border border-transparent hover:border-border hover:bg-card-hover transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="text-foreground group-hover:text-primary transition-colors block truncate">
                          {doc.nombre}
                        </span>
                        {doc.paginas && (
                          <span className="inline-block mt-1 text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                            {doc.paginas}
                          </span>
                        )}
                      </span>
                      <Download
                        className="size-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
