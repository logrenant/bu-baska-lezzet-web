import type { ComponentType } from "react";
import Image from "next/image";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import { formatDuration } from "@/lib/content/duration";
import type { ContentMeta, RecipeData } from "@/lib/content/types";

export default function RecipeDetail({
  meta,
  recipe,
  Content,
}: {
  meta: ContentMeta;
  recipe: RecipeData;
  Content: ComponentType;
}) {
  return (
    <article className="relative w-full bg-olive-cream">
      <header className="px-6 md:px-12 lg:px-24 pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.08] text-stone-900 mt-6">
            {meta.title}
          </h1>
          <p className="font-sans text-lg md:text-xl leading-relaxed text-stone-700 mt-8">
            {meta.excerpt}
          </p>
        </div>
      </header>

      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-w-5xl mx-auto px-6 md:px-12">
        <div className="relative w-full h-full overflow-hidden rounded-sm">
          <Image
            src={meta.cover}
            alt={meta.coverAlt}
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </div>
      </div>

      {/* ── Stat row ── */}
      <div className="px-6 md:px-12 lg:px-24 py-10">
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-b border-stone-900/10 py-8">
          <Stat label="Hazırlık" value={formatDuration(recipe.prepTime)} />
          <Stat label="Pişirme" value={formatDuration(recipe.cookTime)} />
          <Stat label="Toplam" value={formatDuration(recipe.totalTime)} />
          <Stat label="Kişi Sayısı" value={`${recipe.servings} kişilik`} />
        </div>
      </div>

      {/* ── Ingredients ── */}
      <div className="px-6 md:px-12 lg:px-24 pb-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-6">Malzemeler</h2>
          <ul className="font-sans text-base md:text-lg leading-relaxed text-stone-700 space-y-3">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-olive-eyebrow mt-1" aria-hidden="true">
                  —
                </span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Instructions: sticky numbered rail — genuinely sequential steps ── */}
      <div className="px-6 md:px-12 lg:px-24 pt-10 pb-8">
        <div className="max-w-3xl mx-auto border-t border-stone-900/10">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mt-10 mb-2">Yapılışı</h2>
          {recipe.instructions.map((step, i) => (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-[6rem_1fr] gap-4 lg:gap-10 py-10 border-b border-stone-900/10"
            >
              <div className="lg:sticky lg:top-32 lg:self-start">
                <span className="font-serif text-3xl text-stone-900/20 leading-none block">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-xl text-stone-900 mb-2">{step.title}</h3>
                <p className="font-sans text-base md:text-lg leading-relaxed text-stone-700">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Narrative body (MDX) ── */}
      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <Content />
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-2xl mx-auto">
          <WhatsAppCTA
            label="Tadım için yazın"
            message={`Merhaba, "${meta.title}" tarifinizi denedim. Zeytinyağınız hakkında bilgi almak istiyorum.`}
          />
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-sans text-eyebrow tracking-eyebrow uppercase text-olive-eyebrow block">
        {label}
      </span>
      <span className="font-serif text-2xl text-stone-900 mt-2 block">{value}</span>
    </div>
  );
}
