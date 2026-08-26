import Image from 'next/image';
import { contact, whatsappUrl } from '@/lib/contact';

/** What people actually write in for — stated plainly so the page answers
 *  the question before the reader has to ask it. */
const reasons = [
  {
    index: '01',
    title: 'Sipariş',
    body: 'Şişe ve teneke seçenekleri, güncel rekolte ve kargo süreleri için yazın. Stok, o yılın hasadı kadardır.',
  },
  {
    index: '02',
    title: 'Toptan ve kurumsal',
    body: 'Restoran, delikatesen ve kurumsal hediye talepleri için özel fiyat ve etiketleme konuşuyoruz.',
  },
  {
    index: '03',
    title: 'Tadım ve bahçe ziyareti',
    body: 'İşletmeler için ücretsiz tadım. Bahçe ziyaretleri hasat dönemine denk gelirse, sıkımı da izleyebilirsiniz.',
  },
];

export default function ContactVisit() {
  return (
    <>
      {/* ── Ne için yazabilirsiniz ──────────────────────────────── */}
      <section aria-labelledby="konular" className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <h2
            id="konular"
            className="font-sans text-eyebrow tracking-eyebrow uppercase text-olive-eyebrow"
          >
            Ne için yazabilirsiniz
          </h2>

          <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {reasons.map((reason) => (
              <li key={reason.index} className="border-t border-stone-900/10 pt-6">
                <span className="font-serif text-2xl leading-none text-stone-900/20">
                  {reason.index}
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-snug text-stone-900 md:text-3xl">
                  {reason.title}
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-stone-600">
                  {reason.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Ziyaret ─────────────────────────────────────────────── */}
      <section aria-labelledby="ziyaret" className="px-6 pb-20 md:px-12 md:pb-28 lg:px-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-olive-parchment lg:aspect-auto lg:min-h-[26rem]">
            <Image
              src="/assets/opening-window.webp"
              alt="Bahçeye bakan mahzen penceresi"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </figure>

          <div className="flex flex-col justify-between gap-10 bg-olive-dark px-8 py-10 text-olive-parchment md:px-12 md:py-14">
            <div>
              <h2
                id="ziyaret"
                className="font-sans text-eyebrow tracking-eyebrow uppercase text-olive-mist"
              >
                Ziyaret
              </h2>
              <p className="mt-6 font-serif text-2xl leading-snug md:text-3xl">
                Kapımız açık, ama önce haber verin.
              </p>
              <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-olive-parchment/85">
                Bahçe ve mahzen çalışan bir üretim alanı — ziyaretleri randevuyla
                alıyoruz ki sizi kapıda değil, işin içinde karşılayalım.
              </p>

              <address className="mt-8 flex flex-col gap-2 font-sans text-base leading-relaxed text-olive-parchment/85 not-italic">
                <span>
                  {contact.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
                <a
                  href={contact.phone.href}
                  className="w-fit transition-colors duration-300 hover:text-gold-accent"
                >
                  {contact.phone.label}
                </a>
                <a
                  href={contact.email.href}
                  className="w-fit break-all transition-colors duration-300 hover:text-gold-accent"
                >
                  {contact.email.label}
                </a>
              </address>
            </div>

            <a
              href={whatsappUrl(
                'Merhaba, bahçe ziyareti ve tadım için randevu almak istiyorum.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-4 outline-offset-8 focus-visible:outline-2 focus-visible:outline-gold-accent"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-olive-parchment/50 transition-colors duration-500 ease-editorial group-hover:bg-olive-parchment group-hover:text-olive-dark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-sans text-sm font-bold tracking-[0.15em] uppercase">
                Randevu alın
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
