import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { formatDate }   from "@/lib/utils/format-date";
import { readingTime }  from "@/lib/utils/reading-time";

export type PostCardData = {
  id:           string;
  title:        string;
  slug:         string;
  excerpt:      string | null;
  tags:         string[];
  type:         "article" | "resource";
  source_name:  string | null;
  published_at: string | null;
  body:         string | null;
  coverUri:     string;
};

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link href={`/resources/${post.slug}`} className="group block h-full">
      <article className="rounded-2xl overflow-hidden border border-grey-100 hover:shadow-green hover:-translate-y-1 transition-all duration-300 bg-white h-full flex flex-col">

        {/* Cover art — 16:9 */}
        <div className="aspect-video overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverUri}
            alt=""
            aria-hidden="true"
            width={800}
            height={420}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1">

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-green-deep bg-green-tint px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="font-display text-xl text-grey-900 leading-snug mb-3 group-hover:text-green-deep transition-colors duration-200">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-grey-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Card footer */}
          <div className="flex items-center justify-between pt-4 border-t border-grey-100 mt-auto">
            <time className="text-xs text-grey-400" dateTime={post.published_at ?? ""}>
              {formatDate(post.published_at)}
            </time>
            {post.type === "resource" && post.source_name ? (
              <span className="text-xs text-grey-400 flex items-center gap-1">
                <ExternalLink size={10} aria-hidden="true" />
                {post.source_name}
              </span>
            ) : (
              <span className="text-xs text-grey-400">
                {readingTime(post.body)} min read
              </span>
            )}
          </div>
        </div>

      </article>
    </Link>
  );
}
