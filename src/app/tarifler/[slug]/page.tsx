import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavigationMenu from "@/components/shared/NavigationMenu";
import Footer from "@/components/shared/Footer";
import RecipeDetail from "@/components/tarifler/RecipeDetail";
import RelatedContent from "@/components/shared/RelatedContent";
import JsonLd from "@/components/shared/JsonLd";
import { getAllRecipeSlugs, getAllRecipes, getRecipe } from "@/lib/content/tarifler";
import { organizationJsonLd } from "@/lib/organization";
import { siteUrl } from "@/lib/site";
import PageTransition from "@/components/shared/PageTransition";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllRecipeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getRecipe(slug);
  if (!item) return {};

  const { meta } = item;
  return {
    title: meta.title,
    description: meta.excerpt,
    alternates: { canonical: `/tarifler/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      url: `${siteUrl}/tarifler/${slug}`,
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

export default async function RecipePage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = await getRecipe(slug);
  if (!item) notFound();

  const { meta, recipe, Content } = item;
  const allRecipes = await getAllRecipes();
  const related = allRecipes.filter((r) => r.slug !== slug).slice(0, 3);

  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: meta.title,
    description: meta.excerpt,
    image: `${siteUrl}${meta.cover}`,
    author: { "@type": "Organization", name: organizationJsonLd.name },
    datePublished: meta.date,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    recipeYield: `${recipe.servings} kişilik`,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.body,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tarifler", item: `${siteUrl}/tarifler` },
      { "@type": "ListItem", position: 3, name: meta.title, item: `${siteUrl}/tarifler/${slug}` },
    ],
  };

  return (
    <PageTransition>
      <main className="flex flex-col w-full bg-olive-cream">
        <JsonLd data={recipeJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
        <NavigationMenu />
        <RecipeDetail meta={meta} recipe={recipe} Content={Content} />
        <RelatedContent
          heading="Diğer Tarifler"
          items={related.map((r) => ({
            href: `/tarifler/${r.slug}`,
            title: r.meta.title,
            excerpt: r.meta.excerpt,
            cover: r.meta.cover,
            coverAlt: r.meta.coverAlt,
          }))}
        />
        <Footer />
      </main>
    </PageTransition>
  );
}
