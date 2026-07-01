interface LegalSection {
  title: string;
  paragraphs: readonly string[];
}

interface LegalDocumentProps {
  sections: readonly LegalSection[];
  lastUpdated?: string;
}

export function LegalDocument({ sections, lastUpdated }: LegalDocumentProps) {
  return (
    <section className="section bg-background-alt py-16 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-3xl px-4">
        {lastUpdated && (
          <p className="mb-8 text-sm text-muted-foreground">
            Última actualización: {lastUpdated}
          </p>
        )}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-primary sm:text-xl">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${section.title}-${index}`}
                    className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
