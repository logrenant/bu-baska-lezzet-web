import BlogCard from "./BlogCard";
import type { ContentMeta } from "@/lib/content/types";

export default function BlogListing({
  posts,
}: {
  posts: Array<{ slug: string; meta: ContentMeta }>;
}) {
  return (
    <section className="px-6 md:px-12 pt-32 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto">
        <span className="font-sans text-eyebrow tracking-eyebrow uppercase text-olive-eyebrow">
          Blog
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-stone-900 mt-6 max-w-3xl">
          Toprağın, emeğin ve sıkımın hikâyeleri
        </h1>
        {posts.length === 0 ? (
          <p className="font-sans text-lg text-stone-600 mt-14">
            Yakında burada olacak.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 mt-16">
            {posts.map((post) => (
              <BlogCard key={post.slug} slug={post.slug} meta={post.meta} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
