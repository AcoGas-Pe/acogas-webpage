import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-resolve";

function formatDate(date?: string): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogPostCard({ post }: { post: BlogPost }) {
  const date = formatDate(post.date);

  return (
    <article className="card-base group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-card hover:-translate-y-0.5">
      <Link href={`/blog/${post.slug}/`} className="relative aspect-[16/10] overflow-hidden bg-muted">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        {post.categories[0] ? (
          <span className="absolute bottom-3 left-3 rounded-lg border border-white/25 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary shadow-sm">
            {post.categories[0]}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {date ? <span>{date}</span> : null}
          <span>{post.readTime}</span>
          <span>{post.author}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-tight text-primary">
          <Link href={`/blog/${post.slug}/`} className="hover:text-primary-light">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}/`}
          className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light"
        >
          Leer artículo <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
