import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { contact, whatsappUrl } from '@/lib/contact';

/* ═══════════════════════════════════════════════════════════════════
 * Footer — the site's closing spread.
 *
 * Four bands, stacked the way award-site footers usually stack: the
 * editorial CTA, a link matrix, an oversized wordmark that runs the full
 * measure, and a thin legal rail. It renders on every route, so the link
 * matrix is also the site's sitewide internal-linking layer — every hub
 * (blog, tarifler, hakkımızda) and every homepage pillar is reachable
 * from any page, and the NAP block gives crawlers the same address the
 * Organization JSON-LD claims (both read src/lib/contact.ts).
 *
 * Server component on purpose: no state, so the whole thing ships as
 * static HTML that a crawler reads without executing anything.
 * ═══════════════════════════════════════════════════════════════════ */

const explore = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tarifler', href: '/tarifler' },
  { label: 'S.S.S.', href: '/sss' },
  { label: 'İletişim', href: '/iletisim' },
];

/** The homepage pillars from content.md — same anchors PillarTag links to. */
const story = [
  { label: 'Kökler', href: '/#groves' },
  { label: 'Emek ve Hasat', href: '/#emek' },
  { label: 'Simya ve Sıkım', href: '/#simya' },
];

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  ),
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
};

/** Shared hover treatment: a hairline that wipes in under the label. */
const linkClass =
  'group/link relative inline-block transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const underline =
  'absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-500 ease-out group-hover/link:scale-x-100';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-olive-sage text-white">
      <div className="mx-auto w-full max-w-[110rem] px-6 pt-24 pb-10 sm:px-10 md:px-12 lg:px-16 lg:pt-32">

        {/* ── Band 1: davet ─────────────────────────────────────── */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="relative mb-10 h-32 w-44 md:h-44 md:w-60">
            <Image
              src="/assets/logo2.png"
              alt="Bu Başka Lezzet amblemi"
              fill
              sizes="(min-width: 768px) 15rem, 11rem"
              className="object-contain opacity-85"
            />
          </div>

          <p className="font-serif text-xl leading-relaxed italic opacity-95 md:text-2xl lg:text-3xl">
            &quot;Tadımların inanca dönüştüğüne inanıyoruz. Ürünlerimizi denemekle
            ilgileniyorsanız, lütfen işletmenizde ücretsiz bir tadım rezervasyonu yapın.&quot;
          </p>

          <a
            href={whatsappUrl(
              'Merhaba, işletmemiz için ücretsiz bir tadım rezervasyonu yapmak istiyorum.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 inline-flex flex-col items-center outline-offset-8 focus-visible:outline-2 focus-visible:outline-white"
          >
            <span className="mb-2 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 transition-colors duration-500 group-hover:bg-white group-hover:text-olive-sage">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-sans text-sm font-bold tracking-[0.15em] uppercase">
                Tadım Rezervasyonu
              </span>
            </span>
            <span className="font-serif text-sm italic opacity-80">
              Tadımlar sadece işletmeler içindir.
            </span>
          </a>
        </div>

        {/* ── Band 2: bağlantı matrisi ──────────────────────────── */}
        <div className="mt-24 grid gap-12 border-t border-white/20 pt-12 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4 lg:gap-10">

          <nav aria-labelledby="footer-explore">
            <h2
              id="footer-explore"
              className="font-sans text-eyebrow font-semibold tracking-eyebrow uppercase text-white/60"
            >
              Keşfet
            </h2>
            <ul className="mt-5 flex flex-col gap-3 font-sans text-base text-white/90">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                    <span aria-hidden="true" className={underline} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-story">
            <h2
              id="footer-story"
              className="font-sans text-eyebrow font-semibold tracking-eyebrow uppercase text-white/60"
            >
              Hikâye
            </h2>
            <ul className="mt-5 flex flex-col gap-3 font-sans text-base text-white/90">
              {story.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                    <span aria-hidden="true" className={underline} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Real <address> so the NAP is machine-readable, not just styled text. */}
          <div>
            <h2 className="font-sans text-eyebrow font-semibold tracking-eyebrow uppercase text-white/60">
              İletişim
            </h2>
            <address className="mt-5 flex flex-col gap-3 font-sans text-base leading-relaxed text-white/90 not-italic">
              <span>
                {contact.address.lines.map((line) => (
                  <React.Fragment key={line}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </span>
              <a href={contact.phone.href} className={linkClass}>
                {contact.phone.label}
                <span aria-hidden="true" className={underline} />
              </a>
              <a href={contact.email.href} className={`${linkClass} break-all`}>
                {contact.email.label}
                <span aria-hidden="true" className={underline} />
              </a>
            </address>
          </div>

          <div>
            <h2 className="font-sans text-eyebrow font-semibold tracking-eyebrow uppercase text-white/60">
              Takip
            </h2>
            <ul className="mt-5 flex flex-col gap-3 font-sans text-base text-white/90">
              {contact.social.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    className={linkClass}
                    {...(channel.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {channel.label}
                    <span aria-hidden="true" className={underline} />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappUrl(
                    'Merhaba, premium zeytinyağlarınız hakkında bilgi almak istiyorum.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {contact.whatsapp.label}
                  <span aria-hidden="true" className={underline} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Band 3: künye ─────────────────────────────────────── */}
        {/* Decorative: the accessible brand name already sits in the header
            wordmark and the legal line below, so this repeat is aria-hidden. */}
        {/* Sized in `cqw`, not `vw`, so the line tracks this container's inner
            width instead of the raw viewport — the gutters change at three
            breakpoints and vw ignores all of them. These 15 glyphs measure
            ~8.8em wide in Playfair, so ~11.2cqw fills the measure with a
            little air; overflow-hidden is the backstop if a fallback font
            with wider metrics loads instead. */}
        <div className="@container mt-20 overflow-hidden lg:mt-28">
          <Link href="/" aria-hidden="true" tabIndex={-1} className="block select-none">
            <span className="block whitespace-nowrap text-center font-serif leading-[0.9] tracking-[0.02em] text-white/25 uppercase transition-colors duration-700 hover:text-white/40 [font-size:clamp(1.75rem,11.2cqw,12rem)]">
              Bu Başka Lezzet
            </span>
          </Link>
        </div>

        {/* ── Band 4: alt ray ───────────────────────────────────── */}
        <div className="mt-12 flex flex-col-reverse items-center gap-6 border-t border-white/20 pt-8 text-white/80 sm:flex-row sm:justify-between lg:mt-16">
          <p className="font-sans text-xs tracking-wide">
            © {year} Bu Başka Lezzet · Ayvalık, Balıkesir
          </p>

          <div className="flex items-center gap-5">
            <span className="font-sans text-eyebrow font-bold tracking-eyebrow uppercase text-white/60">
              Paylaş
            </span>

            {contact.social.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                aria-label={`${channel.label} sayfamız`}
                className="transition-opacity duration-300 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                {...(channel.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {socialIcons[channel.label]}
                </svg>
              </a>
            ))}

            {/* "top" is a spec-defined fragment: no #top element required. */}
            <a
              href="#top"
              className="font-sans text-eyebrow font-bold tracking-eyebrow uppercase transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Başa dön
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
