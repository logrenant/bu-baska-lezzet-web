"use client";

import React from 'react';
import ParallaxIntro from '@/components/shared/ParallaxIntro';
import ScrollIndicator from '@/components/shared/ScrollIndicator';

/**
 * GrovesSection — The opening "Groves" reveal, mirroring Corto Olive's
 * harvest landing section. Uses ParallaxIntro for the scrollytelling
 * parallax pattern that will be reused across the entire site.
 */
export default function GrovesSection() {
  return (
    <>
      {/* ===== GROVES PARALLAX INTRO ===== */}
      <ParallaxIntro
        id="groves"
        priority
        bgSrc="/assets/groves_main.webp"
        bgAlt="Zeytinlik bahçeleri"
        title="KÖKLERİMİZ"
        introTopClass="top-[20%]"
        gridGapClass="gap-0 lg:gap-32"
        leftOverlay={{
          src: '/assets/groves_branch-1.webp',
          width: 300,
          height: 300,
          pushClass: 'translate-x-4 sm:translate-x-8 lg:translate-x-40',
        }}
        rightOverlay={{
          src: '/assets/groves_branch-2.png',
          width: 500,
          height: 300,
          pushClass: '-translate-x-4 sm:-translate-x-8 lg:-translate-x-40',
        }}
        topContent={<ScrollIndicator />}
      />
    </>
  );
}
