import type { Metadata } from 'next';

import NavigationMenu from '@/components/shared/NavigationMenu';
import Footer from '@/components/shared/Footer';
import JsonLd from '@/components/shared/JsonLd';
import PageTransition from '@/components/shared/PageTransition';
import FaqIntro from '@/components/sss/FaqIntro';
import FaqAccordion from '@/components/sss/FaqAccordion';
import { faqData } from '@/lib/content/faq';
import { siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular',
  description:
    'Zeytinyağı asit oranı, soğuk sıkım süreci, saklama koşulları, kargo ve teslimat ile ilgili sıkça sorulan sorular.',
  alternates: {
    canonical: '/sss',
  },
  openGraph: {
    title: `S.S.S. | ${siteName}`,
    description:
      'Zeytinyağımız ve üretim sürecimizle ilgili merak ettikleriniz.',
    url: `${siteUrl}/sss`,
  },
};

/**
 * FAQPage JSON-LD schema.
 * Dynamically generated from our faqData array so the SEO schema always
 * matches the content on the page perfectly.
 */
const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <PageTransition>
      <main className="flex w-full flex-col bg-olive-cream min-h-screen">
        <JsonLd data={faqPageJsonLd} />
        <NavigationMenu />
        <FaqIntro />
        <FaqAccordion />
        <Footer />
      </main>
    </PageTransition>
  );
}
