import type { Metadata } from "next";
import NavigationMenu from "@/components/shared/NavigationMenu";
import Footer from "@/components/shared/Footer";
import RecipeListing from "@/components/tarifler/RecipeListing";
import { getAllRecipes } from "@/lib/content/tarifler";
import PageTransition from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: "Tarifler",
  description:
    "Bu Başka Lezzet zeytinyağıyla hazırlanan, yağın kendi karakterinin öne çıktığı tarifler.",
  alternates: {
    canonical: "/tarifler",
  },
};

export default async function TariflerPage() {
  const recipes = await getAllRecipes();
  return (
    <PageTransition>
      <main className="flex flex-col w-full bg-olive-cream">
        <NavigationMenu />
        <RecipeListing recipes={recipes} />
        <Footer />
      </main>
    </PageTransition>
  );
}
