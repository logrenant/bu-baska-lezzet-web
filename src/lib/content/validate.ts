import fs from "node:fs";
import path from "node:path";
import type { ContentMeta, RecipeData } from "./types";
import { pillars } from "./pillars";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DURATION_RE = /^PT(?:\d+H)?(?:\d+M)?$/;
const PILLAR_SLUGS = Object.keys(pillars);

function fail(slug: string, message: string): never {
  throw new Error(
    `İçerik hatası: src/content/.../${slug}.mdx — ${message}\nKurallar için src/content/README.md'ye bakın.`
  );
}

/**
 * Enforced version of src/content/README.md's `meta` contract. Runs on
 * every content load (dev + build) so a malformed .mdx fails loudly at
 * compile time instead of shipping a silently-broken page (missing cover
 * image, wrong pillar, a `new Date()` expression instead of a literal, etc).
 */
export function validateMeta(slug: string, meta: unknown): asserts meta is ContentMeta {
  if (!meta || typeof meta !== "object") fail(slug, "`meta` export eksik veya obje değil.");
  const m = meta as Partial<ContentMeta>;

  if (!m.title?.trim()) fail(slug, "`meta.title` boş olamaz.");
  if (!m.excerpt?.trim()) fail(slug, "`meta.excerpt` boş olamaz.");

  if (typeof m.date !== "string" || !DATE_RE.test(m.date)) {
    fail(
      slug,
      `\`meta.date\` "YYYY-MM-DD" biçiminde bir literal string olmalı (bulunan: ${JSON.stringify(m.date)}). new Date() gibi bir ifade YAZMA.`
    );
  }

  if (!m.cover?.startsWith("/")) fail(slug, "`meta.cover` \"/\" ile başlayan bir path olmalı.");
  const coverPath = path.join(process.cwd(), "public", m.cover);
  if (!fs.existsSync(coverPath)) {
    fail(
      slug,
      `\`meta.cover\` (${m.cover}) public/ altında yok. Gerçek görsel yoksa "/assets/placeholder-recipe.webp" veya "/assets/placeholder-blog.webp" kullan.`
    );
  }

  if (!m.coverAlt?.trim()) fail(slug, "`meta.coverAlt` boş olamaz.");
  if (!m.category?.trim()) fail(slug, "`meta.category` boş olamaz.");

  if (!m.pillar || !PILLAR_SLUGS.includes(m.pillar)) {
    fail(
      slug,
      `\`meta.pillar\` şunlardan biri olmalı: ${PILLAR_SLUGS.join(", ")} (bulunan: ${JSON.stringify(m.pillar)}).`
    );
  }

  if (typeof m.readingTime !== "number" || m.readingTime <= 0) {
    fail(slug, "`meta.readingTime` pozitif bir sayı olmalı.");
  }
}

/** Enforced version of the README's `recipe` contract (tarifler only). */
export function validateRecipe(slug: string, recipe: unknown): asserts recipe is RecipeData {
  if (!recipe || typeof recipe !== "object") fail(slug, "`recipe` export eksik veya obje değil.");
  const r = recipe as Partial<RecipeData>;

  for (const field of ["prepTime", "cookTime", "totalTime"] as const) {
    const value = r[field];
    if (typeof value !== "string" || !DURATION_RE.test(value)) {
      fail(slug, `\`recipe.${field}\` ISO 8601 süre biçiminde olmalı (ör. "PT15M"), bulunan: ${JSON.stringify(value)}.`);
    }
  }

  if (typeof r.servings !== "number" || r.servings <= 0) {
    fail(slug, "`recipe.servings` pozitif bir sayı olmalı.");
  }

  if (!r.difficulty?.trim()) fail(slug, "`recipe.difficulty` boş olamaz.");

  if (!Array.isArray(r.ingredients) || r.ingredients.length === 0) {
    fail(slug, "`recipe.ingredients` en az bir öğe içeren bir dizi olmalı.");
  }
  r.ingredients.forEach((ingredient, i) => {
    if (typeof ingredient !== "string" || !ingredient.trim()) {
      fail(slug, `\`recipe.ingredients[${i}]\` boş olmayan bir string olmalı.`);
    }
  });

  if (!Array.isArray(r.instructions) || r.instructions.length === 0) {
    fail(slug, "`recipe.instructions` en az bir adım içeren bir dizi olmalı.");
  }
  r.instructions.forEach((step, i) => {
    if (!step?.title?.trim() || !step?.body?.trim()) {
      fail(slug, `\`recipe.instructions[${i}]\` bir \`title\` ve \`body\` içermeli.`);
    }
  });
}
