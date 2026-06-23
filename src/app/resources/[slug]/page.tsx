import type { Metadata }    from "next";
import { notFound }         from "next/navigation";
import Link                 from "next/link";
import { ExternalLink }     from "lucide-react";
import ReactMarkdown        from "react-markdown";
import remarkGfm            from "remark-gfm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateCoverDataURI }       from "@/lib/cover-art";
import { PostCard }                   from "@/components/resources/PostCard";
import { Footer }                     from "@/components/Footer";
import { formatDate }                 from "@/lib/utils/format-date";
import { readingTime }                from "@/lib/utils/reading-time";

export const revalidate = 3600;

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("posts")
    .select("slug")
    .eq("status", "published");
  return (data ?? []).map((p) => ({ slug: p.slug as string }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = createSupabaseServerClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, tags")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!post) return {};

  return {
    title:       `${post.title} — Pathways`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title:       post.title,
      description: post.excerpt ?? undefined,
      type:        "article",
    },
  };
}

// ── Markdown styling ──────────────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */
const mdComponents: React.ComponentProps<typeof ReactMarkdown>["components"] = {
  h1: ({ children }) => (
    <h1 className="font-display font-normal text-4xl max-md:text-2xl text-grey-900 mb-6 mt-2 leading-tight tracking-tight" style={{ letterSpacing: "-0.02em" }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display font-normal text-2xl text-grey-900 mb-4 mt-10 leading-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-semibold text-lg text-grey-900 mb-3 mt-8">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-grey-700 text-base leading-relaxed mb-5">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-green-deep underline underline-offset-2 hover:text-green-muted transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 mb-5 space-y-2 text-grey-700">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-5 mb-5 space-y-2 text-grey-700">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-base leading-relaxed pl-1">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-green-deep pl-6 my-6 text-grey-500 italic">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="bg-grey-100 rounded-xl p-5 overflow-x-auto mb-5 text-sm font-mono">
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }: any) => {
    const isBlock = className?.startsWith("language-");
    return isBlock ? (
      <code className="text-grey-900 font-mono" {...props}>
        {children}
      </code>
    ) : (
      <code className="bg-grey-100 text-grey-900 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-grey-900">{children}</strong>
  ),
  hr: () => <hr className="my-10 border-grey-200" />,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createSupabaseServerClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!post) notFound();

  // Fetch 3 more recent posts (excluding current) as "More to read"
  const { data: related } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_seed, tags, type, source_name, published_at, body")
    .eq("status", "published")
    .neq("id", post.id)
    .order("published_at", { ascending: false })
    .limit(3);

  const coverUri = generateCoverDataURI((post.cover_seed ?? post.slug) as string);
  const relatedWithCovers = (related ?? []).map((p) => ({
    ...p,
    coverUri: generateCoverDataURI((p.cover_seed ?? p.slug) as string),
  }));

  return (
    <main className="pt-[72px] max-md:pt-[60px]">

      {/* ── Cover art ──────────────────────────────────────────────── */}
      <div className="w-full h-[340px] max-md:h-[200px] overflow-hidden bg-green-tint">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUri}
          alt=""
          aria-hidden="true"
          width={1200}
          height={340}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Article content ────────────────────────────────────────── */}
      <div className="max-w-[720px] mx-auto px-10 max-md:px-5 py-14 max-md:py-10">

        {/* Back link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm text-grey-400 hover:text-green-deep transition-colors mb-8"
        >
          ← Back to Resources
        </Link>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {(post.tags as string[]).map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-medium text-green-deep bg-green-tint px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight tracking-tight mb-5"
          style={{ letterSpacing: "-0.02em" }}
        >
          {post.title as string}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-grey-400 mb-8">
          {post.published_at && (
            <time dateTime={post.published_at as string}>
              {formatDate(post.published_at as string)}
            </time>
          )}
          {post.type === "article" && post.body && (
            <>
              <span aria-hidden="true">·</span>
              <span>{readingTime(post.body as string)} min read</span>
            </>
          )}
          {post.type === "resource" && post.source_name && (
            <>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <ExternalLink size={12} aria-hidden="true" />
                {post.source_name as string}
              </span>
            </>
          )}
        </div>

        <hr className="border-grey-200 mb-10" />

        {/* Body — article */}
        {post.type === "article" && post.body && (
          <article>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {post.body as string}
            </ReactMarkdown>
          </article>
        )}

        {/* Body — external resource */}
        {post.type === "resource" && (
          <div>
            {(post.ai_summary || post.excerpt) && (
              <p className="text-grey-700 text-lg leading-relaxed mb-8">
                {(post.ai_summary ?? post.excerpt) as string}
              </p>
            )}
            {post.source_url && (
              <a
                href={post.source_url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-deep text-white font-semibold text-base px-8 py-4 rounded-full min-h-[52px] hover:bg-green-muted active:scale-[0.98] transition-all duration-150"
              >
                Visit Source <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        )}

        {/* Legal disclaimer (articles only) */}
        {post.type === "article" && (
          <p className="mt-12 text-xs text-grey-400 border-t border-grey-100 pt-6 leading-relaxed">
            This article is for general information only and does not constitute
            legal advice. Immigration rules change frequently. Always verify
            information with official IRCC sources or a licensed immigration
            consultant before making decisions.
          </p>
        )}
      </div>

      {/* ── More to read ────────────────────────────────────────────── */}
      {relatedWithCovers.length > 0 && (
        <section className="py-16 max-md:py-10 bg-grey-100 border-t border-grey-200">
          <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">
            <h2
              className="font-display font-normal text-3xl max-md:text-2xl text-grey-900 mb-10 leading-tight tracking-tight"
              style={{ letterSpacing: "-0.01em" }}
            >
              More to read
            </h2>
            <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
              {relatedWithCovers.map((p) => (
                <PostCard
                  key={p.id}
                  post={p as Parameters<typeof PostCard>[0]["post"]}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
