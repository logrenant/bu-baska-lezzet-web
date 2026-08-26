import Image from 'next/image';

/**
 * The opening spread of /iletisim. Typographic left, single image right —
 * the same editorial split AboutStory uses, so the contact page reads as
 * part of the same publication rather than a utility page bolted on.
 */
export default function ContactIntro() {
  return (
    <section className="px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24 lg:px-24">
      <div className="mx-auto max-w-6xl">
        {/* The headline runs the full measure — splitting it into a column
            beside the image broke it across four lines mid-phrase. */}
        <span className="font-sans text-eyebrow tracking-eyebrow uppercase text-olive-eyebrow">
          İletişim
        </span>
        <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.05] text-stone-900 sm:text-5xl md:text-6xl lg:text-7xl">
          Bir şişe zeytinyağı,
          <span className="block italic text-olive-eyebrow">bir sohbetle başlar.</span>
        </h1>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
          <p className="max-w-xl font-sans text-lg leading-relaxed text-stone-700 md:text-xl">
            Sipariş, toptan alım, tadım ya da sadece merak — hangisi olursa olsun
            aynı kişilere ulaşırsınız. Arada çağrı merkezi yok; hasat döneminde
            bahçede, geri kalan zamanda mahzendeyiz.
          </p>

          <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-olive-parchment lg:aspect-[5/4]">
            <Image
              src="/assets/opening-bg.webp"
              alt="Geniş aralıklarla dikilmiş zeytin bahçelerimiz ve aralarından geçen toprak yol"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
