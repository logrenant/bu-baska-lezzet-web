import type { ComponentType } from "react";
import Image from "next/image";
import PillarTag from "@/components/shared/PillarTag";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import type { ContentMeta } from "@/lib/content/types";

/**
 * Reuses AboutStory.tsx's editorial DNA: eyebrow -> serif h1 -> intro
 * paragraph -> static DOM body. No GSAP, no animation gating on copy —
 * the body must be readable and crawlable without waiting on JS.
 */
export default function BlogArticle({
  meta,
  Content,
}: {
  meta: ContentMeta;
  Content: ComponentType;
}) {
  return (
    <article className="relative w-full bg-olive-cream">
      <header className="px-6 md:px-12 lg:px-24 pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="max-w-3xl mx-auto">
          <PillarTag pillar={meta.pillar} />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.08] text-stone-900 mt-6">
            {meta.title}
          </h1>
          <p className="font-sans text-lg md:text-xl leading-relaxed text-stone-700 mt-8">
            {meta.excerpt}
          </p>
          <div className="flex items-center gap-4 mt-8 font-sans text-sm text-stone-500">
            <time dateTime={meta.date}>
              {new Date(meta.date).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{meta.readingTime} dakikalık okuma</span>
          </div>
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

      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <Content />
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-2xl mx-auto">
          <WhatsAppCTA
            label="Tadım için yazın"
            message={`Merhaba, "${meta.title}" yazınızı okudum. Tadım ve sipariş hakkında bilgi almak istiyorum.`}
          />
        </div>
      </div>
    </article>
  );
}
