"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ═══════════════════════════════════════════════════════════════════
 * ParallaxIntro — Reusable scrollytelling "reveal" section.
 *
 * Architecture (mirroring Corto Olive's .parallax__intro):
 *   .main              → relative wrapper
 *     .main-bg          → full-bleed background image
 *     .intro (absolute) → overlays the background, uses CSS Grid
 *       slot:topContent → e.g. "Begin Your Journey" indicator
 *       .parallax-el    → 3-col grid: [leftOverlay] [content] [rightOverlay]
 *         img left      → static branch/decoration at z-10
 *         .parallax-content → h2 title + CTA, scrolls at data-speed via GSAP
 *         img right     → static branch/decoration at z-10
 *
 * The parallax-content (title + CTA) has a LOWER z-index than the
 * overlay images, so the text appears to scroll BEHIND the branches.
 * ═══════════════════════════════════════════════════════════════════ */

interface OverlayAsset {
  src: string;
  alt?: string;
  width: number;
  height: number;
  /** Tailwind translateX to push the branch toward center for overlap. e.g. "translate-x-8" */
  pushClass?: string;
}

interface ParallaxIntroProps {
  /** The large background image */
  bgSrc: string;
  bgAlt: string;
  /** Large title displayed over the background */
  title: string;
  /** CTA click handler */
  onCtaClick?: () => void;
  /** Left foreground overlay (branch, cloud, etc.) */
  leftOverlay?: OverlayAsset;
  /** Right foreground overlay */
  rightOverlay?: OverlayAsset;
  /** Top content slot — e.g. "Begin Your Journey" */
  topContent?: React.ReactNode;
  /** Intro overlay top position. Corto uses 20-30% for groves. */
  introTopClass?: string;
  /** Grid gap between scroll indicator and parallax element */
  gridGapClass?: string;
  /** Section id for anchor linking */
  id?: string;
  /** Additional classes on <section> */
  className?: string;
  /** Only the instance rendered first on a page (the LCP candidate) should set this. */
  priority?: boolean;
}

export default function ParallaxIntro({
  bgSrc,
  bgAlt,
  title,
  onCtaClick,
  leftOverlay,
  rightOverlay,
  topContent,
  introTopClass = 'top-[10%]',
  gridGapClass = 'gap-0 lg:gap-32',
  id,
  className = '',
  priority = false,
}: ParallaxIntroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!parallaxContentRef.current) return;

    // Use matchMedia for responsive parallax values
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop animation (longer scroll distance)
      gsap.fromTo(parallaxContentRef.current,
        { y: 260 },
        {
          y: 420,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile animation (shorter scroll distance to keep text in bounds)
      gsap.fromTo(parallaxContentRef.current,
        { y: 0 },
        {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    // Fade out the top content (e.g. "Begin Your Journey") on scroll
    if (topContentRef.current) {
      gsap.to(topContentRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top+=300 top",
          scrub: true,
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full bg-[#fafaf5] ${className}`}
    >
      <div className="parallax-intro">
        <div className="main relative">

          {/* ── Main Background ── */}
          <div className="main-bg relative w-full h-screen md:h-auto md:pt-[250px]">
            <Image
              src={bgSrc}
              alt={bgAlt}
              width={1920}
              height={1080}
              className="w-full h-full object-cover md:h-auto block"
              sizes="100vw"
              priority={priority}
            />
          </div>

          {/* ── Intro Overlay (absolute, grid layout) ── */}
          <div
            className={`intro absolute ${introTopClass} right-0 left-0 text-center grid ${gridGapClass}`}
            style={{ gridTemplateRows: '1fr auto' }}
          >
            {/* Top content slot */}
            {topContent && (
              <div ref={topContentRef} className="flex flex-col items-center justify-center">
                {topContent}
              </div>
            )}

            {/* Parallax element — 3-column grid: [left img] [content] [right img] */}
            <div
              className="parallax-el mx-auto grid justify-items-center w-full"
              style={{ gridTemplateColumns: '1fr auto 1fr' }}
            >
              {/* Left overlay (branch) — z-10, overlaps center */}
              {leftOverlay && (
                <div className={`self-end z-10 translate-y-[20px] md:translate-y-[250px] ${leftOverlay.pushClass ?? 'translate-x-10 lg:translate-x-40'}`}>
                  <Image
                    src={leftOverlay.src}
                    alt={leftOverlay.alt ?? ''}
                    width={leftOverlay.width}
                    height={leftOverlay.height}
                    className="w-full max-w-[120px] sm:max-w-[160px] lg:max-w-[220px] h-auto block drop-shadow-[0_6px_2px_rgba(0,0,0,0.5)]"
                    sizes="200px"
                    priority={priority}
                    aria-hidden="true"
                    style={{ marginTop: '8vw' }}
                  />
                </div>
              )}

              {/* Center: parallax content (title + CTA) — z-0 so it goes BEHIND branches */}
              <div
                ref={parallaxContentRef}
                className="parallax-content relative z-0 text-center flex flex-col items-center justify-center"
                style={{ willChange: 'transform' }}
              >
                <h2
                  className="font-sans font-black leading-none tracking-tight uppercase select-none"
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 10rem)',
                    background: 'linear-gradient(117deg, rgb(139,144,112) 0%, rgb(212,222,205) 42%, rgb(197,207,190) 74%, rgb(139,144,112) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {title}
                </h2>
              </div>

              {/* Right overlay (branch) — z-10, overlaps center */}
              {rightOverlay && (
                <div className={`self-end z-10 translate-y-[20px] md:translate-y-[250px] ${rightOverlay.pushClass ?? '-translate-x-12 lg:-translate-x-40'}`}>
                  <Image
                    src={rightOverlay.src}
                    alt={rightOverlay.alt ?? ''}
                    width={rightOverlay.width}
                    height={rightOverlay.height}
                    className="w-full max-w-[120px] sm:max-w-[160px] lg:max-w-[220px] h-auto block drop-shadow-[0_6px_2px_rgba(0,0,0,0.5)]"
                    sizes="200px"
                    priority={priority}
                    aria-hidden="true"
                    style={{ marginTop: '8vw' }}
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
