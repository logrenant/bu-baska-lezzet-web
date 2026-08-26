import { siteName, siteUrl } from "@/lib/site";
import { contact, publishedSocial } from "@/lib/contact";

/**
 * Organization schema for every page (rendered from the root layout).
 * All NAP values come from src/lib/contact.ts so the markup can never drift
 * from what the header and footer actually show on screen.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  email: contact.email.label,
  telephone: contact.phone.e164,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.locality,
    addressRegion: contact.address.region,
    addressCountry: contact.address.country,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: contact.phone.e164,
      email: contact.email.label,
      areaServed: "TR",
      availableLanguage: ["Turkish"],
    },
  ],
  // Only channels that actually resolve — see contact.ts.
  ...(publishedSocial.length > 0
    ? { sameAs: publishedSocial.map((channel) => channel.href) }
    : {}),
} as const;
