import GrovesSection from "@/components/groves/GrovesSection";
import OliveProgressSection from "@/components/groves/OliveProgressSection";
import EmekContentSection from "@/components/harvest/EmekContentSection";
import SimyaContentSection from "@/components/simya/SimyaContentSection";
import HarvestParallaxIntro from "@/components/harvest/HarvestParallaxIntro";
import MillingParallaxIntro from "@/components/simya/MillingParallaxIntro";
import NavigationMenu from "@/components/shared/NavigationMenu";
import Footer from "@/components/shared/Footer";
import PageTransition from "@/components/shared/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="flex flex-col w-full bg-[#fafaf5]">
        <NavigationMenu />

        {/* Visually hidden: the design's hero title (h2 in GrovesSection) is
            styled copy, not a page heading — this gives the page one real h1. */}
        <h1 className="sr-only">
          Bu Başka Lezzet — Asırlık zeytin bahçelerinden soğuk sıkım şişeye, geleneksel yöntemlerle üretilen premium zeytinyağı
        </h1>

        {/* ===== SECTION 1: Groves (Pinned Scrollytelling) ===== */}
        <GrovesSection />

        {/* ===== SECTION 1.5: Olive Progress ===== */}
        <OliveProgressSection />

        {/* ===== SECTION 2: Emek (Hasat) ===== */}
        <HarvestParallaxIntro
          id="emek"
          title="EMEK VE HASAT"
        />
        <EmekContentSection />

        {/* ===== SECTION 3: Simya (Sıkım) ===== */}
        <MillingParallaxIntro
          id="simya"
          title="SİMYA VE SIKIM"
        />
        <SimyaContentSection />

        {/* ===== FOOTER ===== */}
        <Footer />

      </main>
    </PageTransition>
  );
}
