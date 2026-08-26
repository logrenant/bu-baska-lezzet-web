import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import NavigationMenu from '@/components/shared/NavigationMenu';
import Footer from '@/components/shared/Footer';
import AboutOpening from '@/components/about/AboutOpening';
import AboutStory from '@/components/about/AboutStory';
import PageTransition from '@/components/shared/PageTransition';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description:
    'Asırlık zeytin bahçelerinden soğuk sıkım şişeye: geleneksel yöntemlerle ürettiğimiz zeytinyağının ve arkasındaki emeğin hikâyesi.',
  alternates: {
    canonical: '/hakkimizda',
  },
};

/**
 * The emblem outline is ~150 KB of path data (≈56 KB over the wire). Reading it
 * here keeps it out of the client bundle and out of a fetch waterfall — the page
 * is static, so this runs once at build time and the markup ships in the HTML.
 */
function readEmblemOutline(): string {
  const file = path.join(process.cwd(), 'public', 'assets', 'opening-logo-ink.svg');
  const svg = readFileSync(file, 'utf8');
  return svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
}

export default function HakkimizdaPage() {
  const inkPaths = readEmblemOutline();

  return (
    <PageTransition>
      <main className="flex flex-col w-full bg-[#fafaf5]">
        <NavigationMenu />
        <AboutOpening inkPaths={inkPaths} />
        <AboutStory />
        <Footer />
      </main>
    </PageTransition>
  );
}
