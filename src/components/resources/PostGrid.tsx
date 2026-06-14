"use client";

import { useState }              from "react";
import { PostCard, PostCardData } from "./PostCard";

export function PostGrid({
  initialPosts,
  activeType,
  initialHasMore,
}: {
  initialPosts:    PostCardData[];
  activeType:      string;
  initialHasMore:  boolean;
}) {
  const [posts, setPosts]           = useState(initialPosts);
  const [hasMore, setHasMore]       = useState(initialHasMore);
  const [loading, setLoading]       = useState(false);

  async function loadMore() {
    setLoading(true);
    try {
      const res  = await fetch(`/api/resources?type=${activeType}&offset=${posts.length}`);
      const data = await res.json() as { posts: PostCardData[]; hasMore: boolean };
      if (data.posts?.length) {
        setPosts((prev) => [...prev, ...data.posts]);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-grey-400 text-base">Nothing here yet — check back soon.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 border border-grey-300 text-grey-700 hover:border-green-deep hover:text-green-deep font-medium text-sm px-8 py-3 rounded-full transition-all duration-150 active:scale-[0.98] min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
