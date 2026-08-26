import type { Metadata } from "next";
import NavigationMenu from "@/components/shared/NavigationMenu";
import Footer from "@/components/shared/Footer";
import BlogListing from "@/components/blog/BlogListing";
import { getAllBlogPosts } from "@/lib/content/blog";
import PageTransition from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Toprak, hasat ve soğuk sıkım üzerine: Bu Başka Lezzet'in üretim felsefesini anlatan yazılar.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return (
    <PageTransition>
      <main className="flex flex-col w-full bg-olive-cream">
        <NavigationMenu />
        <BlogListing posts={posts} />
        <Footer />
      </main>
    </PageTransition>
  );
}
