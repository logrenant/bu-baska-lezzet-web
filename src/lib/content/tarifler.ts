import fs from "node:fs";
import path from "node:path";
import type { ContentMeta, LoadedRecipe, RecipeData } from "./types";
import { validateMeta, validateRecipe } from "./validate";

const CONTENT_DIR = path.join(process.cwd(), "src/content/tarifler");

export function getAllRecipeSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getRecipe(slug: string): Promise<LoadedRecipe | null> {
  if (!getAllRecipeSlugs().includes(slug)) return null;
  const mod = await import(`@/content/tarifler/${slug}.mdx`);
  validateMeta(slug, mod.meta);
  validateRecipe(slug, mod.recipe);
  return {
    slug,
    meta: mod.meta as ContentMeta,
    recipe: mod.recipe as RecipeData,
    Content: mod.default,
  };
}

export async function getAllRecipes(): Promise<Array<{ slug: string; meta: ContentMeta }>> {
  const slugs = getAllRecipeSlugs();
  const recipes = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await import(`@/content/tarifler/${slug}.mdx`);
      validateMeta(slug, mod.meta);
      return { slug, meta: mod.meta as ContentMeta };
    })
  );
  return recipes.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}
