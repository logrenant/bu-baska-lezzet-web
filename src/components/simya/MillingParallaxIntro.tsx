"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface MillingParallaxIntroProps {
  id?: string;
  title: string;
}

export default function MillingParallaxIntro({
  id,
  title,
}: MillingParallaxIntroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  const olivesRef = useRef<HTMLDivElement>(null);
  const olivesMobileBgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!parallaxContentRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop animation
      gsap.fromTo(parallaxContentRef.current,
        { y: 200 },
        {
          y: 300,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      if (olivesRef.current) {
        gsap.fromTo(olivesRef.current,
          { y: 0 },
          {
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile animation
      gsap.fromTo(parallaxContentRef.current,
        { y: 70 },
        {
          y: 130,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      if (olivesRef.current) {
        gsap.fromTo(olivesRef.current,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }

      if (olivesMobileBgRef.current) {
        gsap.fromTo(olivesMobileBgRef.current,
          { y: -100 },
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
      }
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-[#fafaf5] overflow-hidden"
    >
      <div className="parallax-intro relative">
        <div className="main relative">

          {/* ── Image Layers Wrapper ── */}
          <div className="relative w-full h-screen md:h-auto mt-[80px] md:mt-[250px]">

            {/* 1. Main Background (Z-0) */}
            <div className="relative w-full h-full z-0">
              <Image
                src="/assets/milling_main_v2.webp"
                alt="Sıkım Alanı"
                width={1920}
                height={1080}
                className="w-full h-full object-cover md:h-auto block"
                sizes="100vw"
              />
            </div>

            {/* 1.5. Olives Overlay Background (Mobile only, Z-5, behind text/main olives) */}
            <div
              ref={olivesMobileBgRef}
              className="absolute top-0 left-0 w-full h-full z-[5] rotate-180 pointer-events-none md:hidden"
            >
              <Image
                src="/assets/milling_olives.webp"
                alt="Zeytinler Arka Plan"
                width={1920}
                height={1080}
                className="w-full h-full object-cover scale-[0.6] -translate-y-10"
                sizes="100vw"
              />
            </div>

            {/* 2. Olives Overlay (Z-20, moves 100px down) */}
            {/* It sits ABOVE the text (z-10) */}
            <div
              ref={olivesRef}
              className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
            >
              <Image
                src="/assets/milling_olives.webp"
                alt="Zeytinler"
                width={1920}
                height={1080}
                className="w-full h-full object-cover md:h-auto block drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
                sizes="100vw"
              />
            </div>

          </div>

          {/* ── Intro Overlay (Title) (Z-10) ── */}
          {/* Sits between background (z-0) and olives (z-20) */}
          <div
            className="intro absolute top-[30%] lg:top-[20%] right-0 left-0 text-center flex justify-center z-10 pointer-events-none"
          >
            <div
              ref={parallaxContentRef}
              className="parallax-content relative text-center flex flex-col items-center justify-center"
              style={{ willChange: 'transform' }}
            >
              <h2
                className="font-sans font-black leading-none tracking-tight uppercase select-none"
                style={{
                  fontSize: 'clamp(3.5rem, 8vw, 10rem)',
                  background: 'linear-gradient(117deg, rgb(139,144,112) 0%, rgb(212,222,205) 42%, rgb(197,207,190) 74%, rgb(139,144,112) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title}
              </h2>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
