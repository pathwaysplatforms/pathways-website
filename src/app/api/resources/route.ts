import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateCoverDataURI }       from "@/lib/cover-art";

const PAGE_SIZE = 9;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type   = searchParams.get("type") === "resource" ? "resource" : "article";
  const offset = Math.max(0, parseInt(searchParams.get("offset") ?? "0", 10));

  const supabase = createSupabaseServerClient();

  const [{ data: posts, error }, { count }] = await Promise.all([
    supabase
      .from("posts")
      .select("id, title, slug, excerpt, cover_seed, tags, type, source_name, published_at, body")
      .eq("status", "published")
      .eq("type", type)
      .order("published_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1),
    supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "published")
      .eq("type", type),
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const postsWithCovers = (posts ?? []).map((p) => ({
    ...p,
    coverUri: generateCoverDataURI((p.cover_seed ?? p.slug) as string),
  }));

  return NextResponse.json({
    posts:   postsWithCovers,
    hasMore: (count ?? 0) > offset + PAGE_SIZE,
  });
}
