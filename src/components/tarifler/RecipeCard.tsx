import Image from "next/image";
import Link from "next/link";
import type { ContentMeta } from "@/lib/content/types";

export default function RecipeCard({ slug, meta }: { slug: string; meta: ContentMeta }) {
  return (
    <Link href={`/tarifler/${slug}`} className="group block">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-olive-parchment">
        <Image
          src={meta.cover}
          alt={meta.coverAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <span className="font-sans text-eyebrow tracking-eyebrow uppercase text-olive-eyebrow mt-5 block">
        {meta.category}
      </span>
      <h2 className="font-serif text-2xl text-stone-900 mt-2 leading-snug">{meta.title}</h2>
      <p className="font-sans text-base text-stone-600 mt-3 leading-relaxed">{meta.excerpt}</p>
    </Link>
  );
}
