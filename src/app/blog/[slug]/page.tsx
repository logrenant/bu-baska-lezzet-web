import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavigationMenu from "@/components/shared/NavigationMenu";
import Footer from "@/components/shared/Footer";
import BlogArticle from "@/components/blog/BlogArticle";
import RelatedContent from "@/components/shared/RelatedContent";
import JsonLd from "@/components/shared/JsonLd";
import { getAllBlogPosts, getAllBlogSlugs, getBlogPost } from "@/lib/content/blog";
import { organizationJsonLd } from "@/lib/organization";
import { siteUrl } from "@/lib/site";
import PageTransition from "@/components/shared/PageTransition";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const { meta } = post;
  return {
    title: meta.title,
    description: meta.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: meta.date,
      images: [{ url: meta.cover, alt: meta.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.excerpt,
      images: [meta.cover],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const { meta, Content } = post;
  const allPosts = await getAllBlogPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    image: `${siteUrl}${meta.cover}`,
    author: { "@type": "Organization", name: organizationJsonLd.name },
    publisher: {
      "@type": "Organization",
      name: organizationJsonLd.name,
      logo: { "@type": "ImageObject", url: organizationJsonLd.logo },
    },
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: meta.title, item: `${siteUrl}/blog/${slug}` },
    ],
  };

  return (
    <PageTransition>
      <main className="flex flex-col w-full bg-olive-cream">
        <JsonLd data={blogPostingJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
        <NavigationMenu />
        <BlogArticle meta={meta} Content={Content} />
        <RelatedContent
          heading="Diğer Yazılar"
          items={related.map((p) => ({
            href: `/blog/${p.slug}`,
            title: p.meta.title,
            excerpt: p.meta.excerpt,
            cover: p.meta.cover,
            coverAlt: p.meta.coverAlt,
          }))}
        />
        <Footer />
      </main>
    </PageTransition>
  );
}
