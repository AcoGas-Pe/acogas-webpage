import type { ReactNode } from "react";

function inlineParts(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-${match.index}`;
    if (token.startsWith("`")) {
      parts.push(
        <code key={key} className="rounded-md bg-muted px-1.5 py-0.5 text-[0.9em] text-primary">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("**")) {
      parts.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*")) {
      parts.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        parts.push(
          <a
            key={key}
            href={link[2]}
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {link[1]}
          </a>,
        );
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function isBlockStart(line: string): boolean {
  return (
    /^#{1,6}\s+/.test(line) ||
    /^```/.test(line) ||
    /^ {4}/.test(line) ||
    /^[-*]\s+/.test(line) ||
    /^\d+\.\s+/.test(line) ||
    /^>\s?/.test(line)
  );
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const className =
        level === 1
          ? "mt-10 text-3xl font-bold text-primary sm:text-4xl"
          : level === 2
            ? "mt-9 text-2xl font-bold text-primary sm:text-3xl"
            : "mt-7 text-xl font-bold text-foreground";

      const HeadingTag = `h${Math.min(level, 3)}` as "h1" | "h2" | "h3";
      blocks.push(
        <HeadingTag key={`h-${index}`} className={className}>
          {inlineParts(text, `h-${index}`)}
        </HeadingTag>,
      );
      index += 1;
      continue;
    }

    if (/^```/.test(line)) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <pre
          key={`code-${index}`}
          className="my-6 overflow-x-auto rounded-2xl border border-border/50 bg-foreground p-4 text-sm text-background"
        >
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    if (/^ {4}/.test(line)) {
      const code: string[] = [];
      while (index < lines.length && (/^ {4}/.test(lines[index]) || !lines[index].trim())) {
        code.push(lines[index].replace(/^ {4}/, ""));
        index += 1;
      }
      blocks.push(
        <pre
          key={`indented-code-${index}`}
          className="my-6 overflow-x-auto rounded-2xl border border-border/50 bg-foreground p-4 text-sm text-background"
        >
          <code>{code.join("\n").trimEnd()}</code>
        </pre>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^[-*]\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ul key={`ul-${index}`} className="my-5 list-disc space-y-2 pl-6 text-muted-foreground">
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{inlineParts(item, `ul-${index}-${itemIndex}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ol key={`ol-${index}`} className="my-5 list-decimal space-y-2 pl-6 text-muted-foreground">
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{inlineParts(item, `ol-${index}-${itemIndex}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(
        <blockquote
          key={`quote-${index}`}
          className="my-6 border-l-4 border-accent pl-5 text-lg font-medium italic text-foreground"
        >
          {inlineParts(quote.join(" "), `quote-${index}`)}
        </blockquote>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(
      <p key={`p-${index}`} className="my-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {inlineParts(paragraph.join(" "), `p-${index}`)}
      </p>,
    );
  }

  return <div className="mx-auto max-w-3xl">{blocks}</div>;
}
