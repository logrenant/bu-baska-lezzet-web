"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import OliveBurgerIcon from './OliveBurgerIcon';
import { contact } from '@/lib/contact';

/* ═══════════════════════════════════════════════════════════════════
 * NavigationMenu — one navbar for every breakpoint.
 *
 * A slim bar (brand + olive-bough trigger) over a full-screen overlay.
 * Opening wipes the olive-dark sheet down from the top edge, then the
 * menu lines rise out of their own overflow masks on a stagger — the
 * awards-site reveal, driven by a single paused GSAP timeline that is
 * played forward to open and reversed (faster) to close.
 *
 * The overlay deliberately sits below the layout's z-[9999] white window
 * frame, so the frame keeps framing the menu the way it frames the page.
 * ═══════════════════════════════════════════════════════════════════ */

interface MenuItem {
  title: string;
  /** Root-relative so the anchors still reach the main flow from a sub-page. */
  href: string;
  /** Editorial line under the label — the section's promise in a breath. */
  caption: string;
}

const menuItems: MenuItem[] = [
  { title: 'HAKKIMIZDA', href: '/hakkimizda', caption: 'Bir destana dönüşen hikâye' },
  { title: 'BLOG', href: '/blog', caption: 'Toprağın ve sıkımın hikâyeleri' },
  { title: 'TARİFLER', href: '/tarifler', caption: 'Yağın kendi konuştuğu sofralar' },
  { title: 'S.S.S.', href: '/sss', caption: 'Merak edilen detaylar' },
  { title: 'İLETİŞİM', href: '/iletisim', caption: 'Bir şişe, bir sohbetle başlar' },
];

export default function NavigationMenu() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const hasOpened = useRef(false);

  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);

  /* A finished navigation should never leave the overlay hanging — adjust
   * during render rather than in an effect, so no open frame is painted. */
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  /* ── The reveal ─────────────────────────────────────────────── */
  useGSAP(
    () => {
      gsap.set(panelRef.current, { autoAlpha: 0 });

      const mm = gsap.matchMedia();

      mm.add(
        {
          full: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });

          if (reduced) {
            // No travel, no wipe — just bring the sheet in.
            tl.to(panelRef.current, { autoAlpha: 1, duration: 0.2 });
          } else {
            tl.set(panelRef.current, { autoAlpha: 1 })
              .fromTo(
                sheetRef.current,
                { clipPath: 'inset(0% 0% 100% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power4.inOut' },
                0,
              )
              // Each line rides up out of its own overflow-hidden mask.
              .fromTo(
                '.nav-line',
                { yPercent: 125 },
                { yPercent: 0, duration: 1, stagger: 0.065 },
                0.35,
              )
              .fromTo(
                '.nav-rule',
                { scaleX: 0 },
                { scaleX: 1, duration: 0.9, stagger: 0.065, ease: 'power3.out' },
                0.42,
              )
              .fromTo(
                '.nav-foot',
                { y: 30, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
                0.62,
              );
          }

          timeline.current = tl;

          return () => {
            timeline.current = null;
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const tl = timeline.current;
    if (!tl) return;

    if (open) {
      hasOpened.current = true;
      tl.timeScale(1).play();
      return;
    }

    // Nothing to rewind until the menu has actually been opened once —
    // reversing a paused timeline on mount leaves it stalled at zero.
    if (hasOpened.current) {
      // Closing is an exit, not a performance — run it back faster.
      tl.timeScale(1.6).reverse();
    }
  }, [open]);

  /* ── Body scroll lock while the overlay owns the viewport ────── */
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  /* ── Escape to close, Tab kept inside the dialog ─────────────── */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      const trigger = triggerRef.current;
      if (!panel || !trigger) return;

      // The trigger lives outside the panel but is part of the loop —
      // it is how you get back out.
      const focusable = [trigger, ...panel.querySelectorAll<HTMLElement>('a[href]')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, close]);

  /* Focus returns to the trigger so the keyboard never loses its place. */
  useEffect(() => {
    if (!open) triggerRef.current?.blur();
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const barSurface = open
    ? 'border-olive-parchment/25 bg-olive-parchment/5 text-olive-parchment'
    : scrolled
      ? 'border-white/60 bg-white/70 text-stone-800 shadow-[0_8px_32px_rgba(28,25,23,0.12)]'
      : 'border-white/40 bg-white/30 text-stone-800';

  return (
    <header
      ref={rootRef}
      /* Named for the View Transitions API: the bar is the reader's fixed
         anchor, so it stays put while the page beneath it dissolves. */
      style={{ viewTransitionName: 'site-header' }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[100]"
    >
      {/* ── Bar ──────────────────────────────────────────────── */}
      <div className="pointer-events-none relative z-20 flex items-center justify-between gap-4 px-8 pt-8 sm:px-12 sm:pt-10 lg:px-16 lg:pt-12">
        <Link
          href="/"
          onClick={close}
          className={`pointer-events-auto group flex items-center gap-2.5 rounded-full border px-4 py-2.5 backdrop-blur-md transition duration-500 sm:gap-3 sm:px-5 sm:py-3 ${barSurface}`}
        >
          <Image
            src="/assets/logo2.png"
            alt=""
            width={64}
            height={50}
            priority
            className={`h-6 w-auto transition duration-500 sm:h-7 ${open ? 'opacity-90 brightness-0 invert' : 'opacity-90'}`}
          />
          <span className="font-serif text-lg leading-none font-medium tracking-wordmark sm:text-xl">
            Bu Başka Lezzet
          </span>
        </Link>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          data-open={open}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          className={`olive-burger pointer-events-auto flex items-center gap-3 rounded-full border px-4 py-2.5 backdrop-blur-md transition duration-500 outline-offset-4 focus-visible:outline-2 focus-visible:outline-gold-accent sm:gap-4 sm:px-5 sm:py-3 ${barSurface}`}
        >
          <span className="hidden font-sans text-eyebrow font-semibold tracking-eyebrow uppercase sm:inline">
            {open ? 'Kapat' : 'Menü'}
          </span>
          <OliveBurgerIcon />
        </button>
      </div>

      {/* ── Overlay ──────────────────────────────────────────── */}
      <div
        id="site-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menüsü"
        inert={!open}
        className={`fixed inset-0 z-10 overflow-y-auto ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div ref={sheetRef} className="relative min-h-full bg-olive-dark flex flex-col">
          {/* Warmth in the corners so the dark reads as a cellar, not a void. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'radial-gradient(120% 80% at 85% 0%, rgba(90,112,69,0.55) 0%, transparent 60%), radial-gradient(90% 70% at 0% 100%, rgba(212,175,55,0.14) 0%, transparent 55%)',
            }}
          />

          <div className="relative flex flex-1 flex-col justify-between gap-8 px-8 pt-28 pb-12 sm:px-12 sm:pt-32 lg:px-16 lg:pt-36 lg:pb-14">
            {/* Menu */}
            <nav aria-label="Ana menü">
              <ul className="flex flex-col">
                {menuItems.map((item, index) => {
                  const isCurrent = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={isCurrent ? 'page' : undefined}
                        className="group block py-2.5 outline-offset-4 focus-visible:outline-2 focus-visible:outline-gold-accent sm:py-3.5"
                      >
                        <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1 sm:gap-x-8">
                          <span className="block overflow-hidden">
                            <span className="nav-line block font-sans text-eyebrow font-semibold tracking-eyebrow text-olive-mist transition-colors duration-500 group-hover:text-gold-accent">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </span>

                          <span className="block overflow-hidden pb-2">
                            <span className="nav-line block">
                              <span
                                className={`block font-serif text-display leading-[0.95] uppercase transition-[transform,color] duration-500 ease-editorial  ${isCurrent ? 'text-gold-accent' : 'text-olive-parchment group-hover:text-gold-accent'
                                  }`}
                              >
                                {item.title}
                              </span>
                            </span>
                          </span>

                          <span className="hidden overflow-hidden md:block">
                            <span className="nav-line block font-serif text-base italic text-olive-mist/90 lg:text-lg">
                              {item.caption}
                            </span>
                          </span>
                        </span>

                        {/* Hairline that fills in on hover */}
                        <span className="nav-rule mt-1 block h-px origin-left bg-olive-parchment/15">
                          <span className="block h-px origin-left scale-x-0 bg-gold-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Foot — emblem + contact */}
            <div className="grid gap-10 border-t border-olive-parchment/15 pt-6 md:grid-cols-[auto_1fr] md:items-end md:gap-16 lg:gap-24">
              <div className="nav-foot flex items-center gap-6 md:flex-col md:items-start md:gap-5">
                <Image
                  src="/assets/logo2.png"
                  alt="Bu Başka Lezzet amblemi"
                  width={655}
                  height={512}
                  className="h-16 w-auto opacity-85 brightness-0 invert sm:h-20 lg:h-24"
                />
                <p className="max-w-[16rem] font-serif text-sm italic text-olive-mist/90 lg:text-base">
                  Dalından şişeye, sabırla.
                </p>
              </div>

              <address className="nav-foot grid gap-8 not-italic sm:grid-cols-3 md:gap-10">
                <div>
                  <h2 className="mb-3 font-sans text-eyebrow font-semibold tracking-eyebrow uppercase text-olive-mist">
                    Ziyaret
                  </h2>
                  <p className="font-sans text-sm leading-relaxed text-olive-parchment/85">
                    {contact.address.lines.map((line) => (
                      <React.Fragment key={line}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 font-sans text-eyebrow font-semibold tracking-eyebrow uppercase text-olive-mist">
                    İletişim
                  </h2>
                  <ul className="flex flex-col gap-1.5 font-sans text-sm text-olive-parchment/85">
                    <li>
                      <a
                        href={contact.phone.href}
                        className="transition-colors duration-300 hover:text-gold-accent"
                      >
                        {contact.phone.label}
                      </a>
                    </li>
                    <li>
                      <a
                        href={contact.email.href}
                        className="break-all transition-colors duration-300 hover:text-gold-accent"
                      >
                        {contact.email.label}
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 font-sans text-eyebrow font-semibold tracking-eyebrow uppercase text-olive-mist">
                    Takip
                  </h2>
                  <ul className="flex flex-col gap-1.5 font-sans text-sm text-olive-parchment/85">
                    {contact.social.map((channel) => (
                      <li key={channel.label}>
                        <a
                          href={channel.href}
                          className="transition-colors duration-300 hover:text-gold-accent"
                        >
                          {channel.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </address>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
