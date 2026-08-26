"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const lineContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Create a timeline that repeats infinitely and reverses (yoyo)
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Both animations happen at the same time (position parameter 0)
    // The arrow moves down 80px
    tl.to(arrowRef.current, {
      y: 80,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0);

    // The line container grows in height to reveal the dashed line behind the arrow
    tl.fromTo(lineContainerRef.current,
      { height: 0 },
      {
        height: 80,
        duration: 1.5,
        ease: "power2.inOut"
      },
      0
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="text-[#7c886a] flex flex-col items-center">
      <p className="font-sans text-stone-600 px-4 md:px-0 text-sm md:text-base mb-3 opacity-80 max-w-sm text-center">
        Zeytinin dalından sofranıza uzanan mucizevi serüvenine tanık olun.
      </p>
      <p className="font-serif italic text-base md:text-lg tracking-wide mb-1">
        Yolculuğa Başlayın
      </p>

      {/* Container for arrow and line to ensure they align properly */}
      <div className="relative flex flex-col items-center w-4 h-[100px]">

        {/* The Dashed Line Container (overflow hidden to reveal line as it grows) */}
        <div
          ref={lineContainerRef}
          className="absolute top-[2px] w-full overflow-hidden flex justify-center"
        >
          {/* The actual dashed line stays fixed height, only the container grows */}
          <svg viewBox="0 0 2 100" className="h-[100px] w-[2px]">
            <path
              d="M1,0 L1,100"
              stroke="#999"
              strokeWidth="2"
              strokeDasharray="4,4"
              fill="none"
            />
          </svg>
        </div>

        {/* The Arrow (moves down) */}
        <div
          ref={arrowRef}
          className="absolute top-0 z-10 flex justify-center items-start w-full bg-[#fafaf5] h-[16px]"
        >
          <svg
            width="14" viewBox="0 0 28.69 34.43"
            className="fill-[#7c886a]"
          >
            <path d="M14.49,34.41c0.3-0.01,0.57-0.21,0.66-0.5L28.62,1.2c0.18-0.41-0.01-0.89-0.41-1.07c-0.24-0.08-0.5-0.08-0.74,0L14.3,7.23L1.16,0.12C0.83-0.1,0.38-0.01,0.15,0.33C0.13,0.37,0.11,0.41,0.09,0.45c-0.12,0.23-0.12,0.51,0,0.74l13.47,32.72C13.83,34.25,14.16,34.49,14.49,34.41z" />
          </svg>
        </div>

      </div>
    </div>
  );
}
