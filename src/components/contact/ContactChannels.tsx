import { contact, whatsappUrl } from '@/lib/contact';

/* ═══════════════════════════════════════════════════════════════════
 * ContactChannels — the page's spine: one oversized row per channel.
 *
 * The row, not a button, is the target: the whole line is the <a>, the
 * label sets in the same display serif the navigation overlay uses, and
 * the rule underneath fills from the left on hover. Anything a crawler
 * or a screen reader needs (tel:, mailto:, the note) is real text in the
 * row — nothing here depends on hover to be readable.
 * ═══════════════════════════════════════════════════════════════════ */

interface Channel {
  index: string;
  label: string;
  value: string;
  href: string;
  note: string;
  external?: boolean;
}

const channels: Channel[] = [
  {
    index: '01',
    label: 'WhatsApp',
    value: contact.phone.label,
    href: whatsappUrl(
      'Merhaba, zeytinyağlarınız hakkında bilgi almak istiyorum.',
    ),
    note: 'En hızlısı. Sipariş ve stok sorularına genellikle aynı gün dönüyoruz.',
    external: true,
  },
  {
    index: '02',
    label: 'Telefon',
    value: contact.phone.label,
    href: contact.phone.href,
    note: 'Hafta içi 09.00 – 18.00. Hasat haftalarında bahçedeysek mesaj bırakın, biz arayalım.',
  },
  {
    index: '03',
    label: 'E-posta',
    value: contact.email.label,
    href: contact.email.href,
    note: 'Toptan, kurumsal hediye ve iş birliği talepleri için.',
  },
];

export default function ContactChannels() {
  return (
    <section aria-labelledby="kanallar" className="px-6 pb-8 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <h2
          id="kanallar"
          className="font-sans text-eyebrow tracking-eyebrow uppercase text-olive-eyebrow"
        >
          Kanallar
        </h2>

        <ul className="mt-8 border-t border-stone-900/10">
          {channels.map((channel) => (
            <li key={channel.index}>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group block border-b border-stone-900/10 py-8 outline-offset-4 focus-visible:outline-2 focus-visible:outline-olive-primary md:py-10"
              >
                <div className="grid gap-4 md:grid-cols-[4rem_1fr_auto] md:items-baseline md:gap-8">
                  <span className="font-serif text-2xl leading-none text-stone-900/20 md:text-3xl">
                    {channel.index}
                  </span>

                  <div>
                    <span className="block font-serif text-3xl leading-tight text-stone-900 transition-colors duration-500 ease-editorial group-hover:text-olive-primary sm:text-4xl md:text-5xl">
                      {channel.label}
                    </span>
                    <span className="mt-3 block font-sans text-base text-stone-600 md:text-lg">
                      {channel.value}
                    </span>
                    <span className="mt-2 block max-w-xl font-sans text-sm leading-relaxed text-stone-500">
                      {channel.note}
                    </span>
                  </div>

                  {/* Decorative: the row's own text already says where it goes. */}
                  <span
                    aria-hidden="true"
                    className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-900/15 text-stone-900 transition-[background-color,color,transform] duration-500 ease-editorial group-hover:-rotate-45 group-hover:border-olive-primary group-hover:bg-olive-primary group-hover:text-white md:flex"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
