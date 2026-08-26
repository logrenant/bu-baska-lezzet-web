import type { ComponentType } from "react";
import type { PillarSlug } from "./pillars";

export interface ContentMeta {
  title: string;
  excerpt: string;
  /** ISO 8601 date, e.g. "2026-08-20" */
  date: string;
  cover: string;
  coverAlt: string;
  category: string;
  pillar: PillarSlug;
  /** Minutes */
  readingTime: number;
}

export interface RecipeInstructionStep {
  title: string;
  body: string;
}

export interface RecipeData {
  /** ISO 8601 durations, e.g. "PT15M" */
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: RecipeInstructionStep[];
}

export interface LoadedBlogPost {
  slug: string;
  meta: ContentMeta;
  Content: ComponentType;
}

export interface LoadedRecipe {
  slug: string;
  meta: ContentMeta;
  recipe: RecipeData;
  Content: ComponentType;
}
