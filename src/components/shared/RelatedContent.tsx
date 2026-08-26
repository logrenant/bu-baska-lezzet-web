import Image from "next/image";
import Link from "next/link";

interface RelatedItem {
  href: string;
  title: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
}

export default function RelatedContent({
  heading,
  items,
}: {
  heading: string;
  items: RelatedItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24 border-t border-stone-900/10">
      <div className="max-w-6xl mx-auto">
        <span className="font-sans text-eyebrow tracking-eyebrow uppercase text-olive-eyebrow">
          {heading}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-8">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group block">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-olive-parchment">
                <Image
                  src={item.cover}
                  alt={item.coverAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-xl text-stone-900 mt-4 leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-stone-600 mt-2 leading-relaxed">
                {item.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
