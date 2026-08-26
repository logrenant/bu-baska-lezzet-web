import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getAllBlogPosts } from "@/lib/content/blog";
import { getAllRecipes } from "@/lib/content/tarifler";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, recipes] = await Promise.all([getAllBlogPosts(), getAllRecipes()]);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tarifler`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...posts.map(
      (post): MetadataRoute.Sitemap[number] => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.meta.date),
        changeFrequency: "yearly",
        priority: 0.6,
      })
    ),
    ...recipes.map(
      (recipe): MetadataRoute.Sitemap[number] => ({
        url: `${siteUrl}/tarifler/${recipe.slug}`,
        lastModified: new Date(recipe.meta.date),
        changeFrequency: "yearly",
        priority: 0.6,
      })
    ),
  ];
}
