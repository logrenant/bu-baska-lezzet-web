import type { Metadata } from 'next';

import NavigationMenu from '@/components/shared/NavigationMenu';
import Footer from '@/components/shared/Footer';
import JsonLd from '@/components/shared/JsonLd';
import PageTransition from '@/components/shared/PageTransition';
import ContactIntro from '@/components/contact/ContactIntro';
import ContactChannels from '@/components/contact/ContactChannels';
import ContactVisit from '@/components/contact/ContactVisit';
import { contact } from '@/lib/contact';
import { siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'İletişim',
  description:
    'Sipariş, toptan alım, tadım ve bahçe ziyareti için bize ulaşın: WhatsApp, telefon, e-posta ve Ayvalık adresimiz.',
  alternates: {
    canonical: '/iletisim',
  },
  openGraph: {
    title: `İletişim | ${siteName}`,
    description:
      'Sipariş, toptan alım, tadım ve bahçe ziyareti için bize ulaşın.',
    url: `${siteUrl}/iletisim`,
  },
};

/**
 * ContactPage schema. The Organization itself is already described once in
 * the root layout, so this references it by @id instead of restating the
 * NAP — two competing Organization blocks on one page is a mess Google
 * has to guess its way through.
 */
const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `İletişim | ${siteName}`,
  url: `${siteUrl}/iletisim`,
  mainEntity: {
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    telephone: contact.phone.e164,
    email: contact.email.label,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
    },
  },
} as const;

export default function IletisimPage() {
  return (
    <PageTransition>
      <main className="flex w-full flex-col bg-olive-cream">
        <JsonLd data={contactPageJsonLd} />
        <NavigationMenu />
        <ContactIntro />
        <ContactChannels />
        <ContactVisit />
        <Footer />
      </main>
    </PageTransition>
  );
}
