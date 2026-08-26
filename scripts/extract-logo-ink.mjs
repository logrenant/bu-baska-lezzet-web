/**
 * extract-logo-ink.mjs
 *
 * `public/assets/opening-logo.svg` is an auto-traced raster: 6383 *filled* paths,
 * no strokes, 3.2 MB — unusable for a stroke-draw animation as-is.
 *
 * The 119 paths filled with pure black are the logo's ink/line layer. This script
 * extracts those, rounds their coordinates, and emits a stroke-only SVG that
 * GSAP's DrawSVGPlugin can animate.
 *
 *   node scripts/extract-logo-ink.mjs [--min-len=N] [--precision=N]
 *
 * Output: public/assets/opening-logo-ink.svg (committed — this is a one-off build step)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, '../public/assets/opening-logo.svg');
const OUT = resolve(here, '../public/assets/opening-logo-ink.svg');

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? Number(hit.split('=')[1]) : fallback;
};
const MIN_LEN = arg('min-len', 0);
const PRECISION = arg('precision', 1);

const svg = readFileSync(SRC, 'utf8');

const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
if (!viewBox) throw new Error('source svg has no viewBox');
const [vbX, vbY, vbW, vbH] = viewBox.split(/[\s,]+/).map(Number);

/** Coordinates are pairs; good enough for a bbox on this file's M/C-only paths. */
function bbox(d) {
  const nums = d.match(/-?\d+\.?\d*(?:e-?\d+)?/g).map(Number);
  const xs = nums.filter((_, i) => i % 2 === 0);
  const ys = nums.filter((_, i) => i % 2 === 1);
  return {
    x0: Math.min(...xs), y0: Math.min(...ys),
    x1: Math.max(...xs), y1: Math.max(...ys),
  };
}

const round = (d) =>
  d
    .replace(/\s+/g, ' ')
    .replace(/-?\d+\.\d+/g, (n) =>
      Number(n).toFixed(PRECISION).replace(/\.?0+$/, '')
    )
    .trim();

const all = [...svg.matchAll(/<path[^>]*?fill="([^"]*)"[^>]*?d="([^"]*)"/gs)];
const ink = [];

for (const [, fill, rawD] of all) {
  if (fill.toLowerCase() !== '#000000') continue;
  const d = round(rawD);
  if (d.length < MIN_LEN) continue;

  const b = bbox(d);
  // The trace emits one path covering the whole canvas as the negative background.
  // Drawing it would stroke a rectangle around the entire logo.
  const coversCanvas =
    (b.x1 - b.x0) / vbW > 0.98 && (b.y1 - b.y0) / vbH > 0.98;
  if (coversCanvas) continue;

  ink.push({ d, area: (b.x1 - b.x0) * (b.y1 - b.y0) });
}

// Largest shapes first so the frame and trunk draw before the fine detail.
ink.sort((a, b) => b.area - a.area);

const out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" aria-hidden="true">
<g fill="none" stroke="currentColor" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round">
${ink.map((p) => `<path d="${p.d}"/>`).join('\n')}
</g>
</svg>
`;

writeFileSync(OUT, out);
console.log(
  `${ink.length} ink paths → ${OUT} (${(out.length / 1024).toFixed(0)} KB)`
);
