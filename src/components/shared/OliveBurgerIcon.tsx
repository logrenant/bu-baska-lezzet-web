import React from 'react';

/* ═══════════════════════════════════════════════════════════════════
 * OliveBurgerIcon — the brand's take on a hamburger.
 *
 * Three rungs, read straight as a menu, with the theme carried by one
 * detail: a single olive resting at the end of the short middle rung.
 * Hovering drifts the rungs right in the same stagger the menu opens
 * with; opening folds the outer two into a cross and slides the olive
 * off to the side.
 *
 * Purely presentational — all motion lives in the `.olive-burger` rules
 * in globals.css, keyed off `data-open` on the parent button, so hover
 * and open states share one transition instead of fighting over inline
 * styles.
 * ═══════════════════════════════════════════════════════════════════ */
export default function OliveBurgerIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={`h-6 w-6 overflow-visible sm:h-7 sm:w-7 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <g className="olive-burger__rung olive-burger__rung--top">
        <path d="M4 10h24" />
      </g>

      {/* Short rung, weighed down by a single olive */}
      <g className="olive-burger__rung olive-burger__rung--mid">
        <path d="M4 16h13" />
        <ellipse
          cx="20.6"
          cy="16"
          rx="2.5"
          ry="2.1"
          transform="rotate(-20 20.6 16)"
          fill="currentColor"
          stroke="none"
        />
      </g>

      <g className="olive-burger__rung olive-burger__rung--bottom">
        <path d="M4 22h24" />
      </g>
    </svg>
  );
}
