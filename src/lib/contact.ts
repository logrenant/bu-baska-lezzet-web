/**
 * Single source of truth for the brand's NAP (name / address / phone) and
 * channels. NavigationMenu, Footer and the Organization JSON-LD all read
 * from here — local SEO penalises the same business showing three slightly
 * different addresses, and that is exactly what happens when this data is
 * re-typed per component.
 *
 * TODO(content): every value below is still a placeholder. Swap for the real
 * işletme bilgileri before launch — this one file now covers the whole site.
 */

export const contact = {
  address: {
    street: "Zeytinlik Mahallesi, Ege Caddesi No: 12",
    locality: "Ayvalık",
    region: "Balıkesir",
    country: "TR",
    /** Display form, one array entry per rendered line. */
    lines: ["Zeytinlik Mahallesi, Ege Caddesi No: 12", "Ayvalık / Balıkesir"],
  },
  phone: {
    label: "+90 266 000 00 00",
    /** E.164, no spaces — used for tel: and schema.org telephone. */
    e164: "+902660000000",
    href: "tel:+902660000000",
  },
  whatsapp: {
    label: "WhatsApp",
    /** Digits only, country code first — wa.me format. */
    number: "905000000000",
  },
  email: {
    label: "merhaba@bubaskalezzet.com",
    href: "mailto:merhaba@bubaskalezzet.com",
  },
  /**
   * `href: "#"` marks a channel that has no real profile yet. Anything still
   * on "#" is deliberately kept out of JSON-LD `sameAs` (see organization.ts)
   * so we never ship a structured-data claim that points nowhere.
   */
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
} as const;

/** Channels with a real destination — safe to publish as `sameAs`. */
export const publishedSocial = contact.social.filter((channel) => channel.href !== "#");

export function whatsappUrl(message: string): string {
  return `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
