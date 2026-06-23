import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateCoverDataURI }       from "@/lib/cover-art";
import { PostGrid }                   from "@/components/resources/PostGrid";
import { Footer }                     from "@/components/Footer";

export const metadata: Metadata = {
  title:       "Resources & Articles — Pathways",
  description: "Immigration guides, visa explainers, and curated resources to help you navigate your journey to Canada.",
};

// Revalidate every hour so new posts appear without a redeploy
export const revalidate = 3600;

const PAGE_SIZE = 9;

type TabValue = "article" | "resource";

// ── Tab switcher (server component, URL-based) ────────────────────────────────

function TabSwitcher({ activeTab }: { activeTab: TabValue }) {
  const tabs: { label: string; value: TabValue; href: string }[] = [
    { label: "Articles",  value: "article",  href: "/resources"               },
    { label: "Resources", value: "resource", href: "/resources?tab=resources" },
  ];

  return (
    <nav
      aria-label="Content tabs"
      className="flex items-center gap-1 bg-grey-100 rounded-full p-1 w-fit"
    >
      {tabs.map(({ label, value, href }) => (
        <Link
          key={value}
          href={href}
          aria-current={activeTab === value ? "page" : undefined}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 min-h-[36px] flex items-center ${
            activeTab === value
              ? "bg-green-deep text-white shadow-card"
              : "text-grey-500 hover:text-grey-900"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeTab: TabValue =
    searchParams.tab === "resources" ? "resource" : "article";

  const supabase = createSupabaseServerClient();

  const [{ data: posts }, { count }] = await Promise.all([
    supabase
      .from("posts")
      .select("id, title, slug, excerpt, cover_seed, tags, type, source_name, published_at, body")
      .eq("status", "published")
      .eq("type", activeTab)
      .order("published_at", { ascending: false })
      .limit(PAGE_SIZE),
    supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "published")
      .eq("type", activeTab),
  ]);

  const initialPosts = (posts ?? []).map((p) => ({
    ...p,
    coverUri: generateCoverDataURI((p.cover_seed ?? p.slug) as string),
  }));

  const initialHasMore = (count ?? 0) > PAGE_SIZE;

  return (
    <main className="pt-[72px] max-md:pt-[60px]">

      {/* ── Page header ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-grey-200 py-14 max-md:py-10">
        <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">
          <p className="text-sm font-semibold tracking-widest uppercase text-green-deep mb-4">
            Knowledge Base
          </p>
          <h1
            className="font-display font-normal text-5xl max-md:text-3xl text-grey-900 leading-tight tracking-tight mb-5"
            style={{ letterSpacing: "-0.02em" }}
          >
            Resources &amp; Articles
          </h1>
          <p className="text-lg text-grey-500 leading-relaxed max-w-[520px] mb-10">
            Immigration guides, visa explainers, and curated resources to help
            you navigate your journey.
          </p>
          <TabSwitcher activeTab={activeTab} />
        </div>
      </section>

      {/* ── Card grid ────────────────────────────────────────────────── */}
      <section className="py-16 bg-grey-100 max-md:py-10 min-h-[400px]">
        <div className="max-w-[1280px] mx-auto px-10 max-md:px-5">
          <PostGrid
            initialPosts={initialPosts as Parameters<typeof PostGrid>[0]["initialPosts"]}
            activeType={activeTab}
            initialHasMore={initialHasMore}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
