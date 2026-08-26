"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface HarvestParallaxIntroProps {
  id?: string;
  title: string;
}

export default function HarvestParallaxIntro({
  id,
  title,
}: HarvestParallaxIntroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const tractorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!parallaxContentRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop animation
      gsap.fromTo(parallaxContentRef.current,
        { y: 280 },
        {
          y: 370,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      if (cloudsRef.current) {
        gsap.fromTo(cloudsRef.current,
          { y: 0 },
          {
            y: 200,
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
        { y: 150 },
        {
          y: 220,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      if (cloudsRef.current) {
        gsap.fromTo(cloudsRef.current,
          { y: 20 },
          {
            y: 200,
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
                src="/assets/harvest_main.webp"
                alt="Zeytin Hasadı"
                width={1920}
                height={1080}
                className="w-full h-full object-cover md:h-auto block"
                sizes="100vw"
              />
            </div>

            {/* 2. Clouds Overlay (Z-0, moves slowly) */}
            <div
              ref={cloudsRef}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[105%] z-0 pointer-events-none"
            >
              <Image
                src="/assets/harvest_clouds.webp"
                alt="Bulutlar"
                width={1920}
                height={1080}
                className="w-full h-auto block"
                sizes="105vw"
              />
            </div>

            {/* 3. Transparent Harvester Overlay (Shadow) (Z-20) */}
            <div
              className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none translate-y-2 md:translate-y-4"
            >
              <Image
                src="/assets/harvest_tractor_v2.webp"
                alt="Traktör Gölge"
                width={1920}
                height={1080}
                className="w-full h-full object-cover md:h-auto block brightness-0 blur-[20px] opacity-100"
                sizes="100vw"
              />
            </div>

            {/* 4. Transparent Harvester Overlay (Actual) (Z-20) */}
            {/* This must have z-20 so it sits ABOVE the text (z-10) */}
            <div
              ref={tractorRef}
              className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
            >
              <Image
                src="/assets/harvest_tractor_v2.webp"
                alt="Traktör"
                width={1920}
                height={1080}
                className="w-full h-full object-cover md:h-auto block"
                sizes="100vw"
              />
            </div>

          </div>

          {/* ── Intro Overlay (Title) (Z-10) ── */}
          {/* Sits between background/clouds (z-0) and tractor (z-20) */}
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
                  fontSize: 'clamp(3rem, 8vw, 10rem)',
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
