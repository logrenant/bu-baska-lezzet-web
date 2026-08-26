import fs from "node:fs";
import path from "node:path";
import type { ContentMeta, LoadedBlogPost } from "./types";
import { validateMeta } from "./validate";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllBlogSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getBlogPost(slug: string): Promise<LoadedBlogPost | null> {
  if (!getAllBlogSlugs().includes(slug)) return null;
  const mod = await import(`@/content/blog/${slug}.mdx`);
  validateMeta(slug, mod.meta);
  return { slug, meta: mod.meta as ContentMeta, Content: mod.default };
}

export async function getAllBlogPosts(): Promise<Array<{ slug: string; meta: ContentMeta }>> {
  const slugs = getAllBlogSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await import(`@/content/blog/${slug}.mdx`);
      validateMeta(slug, mod.meta);
      return { slug, meta: mod.meta as ContentMeta };
    })
  );
  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}
