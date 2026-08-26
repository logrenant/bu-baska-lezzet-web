/**
 * Production domain isn't finalized yet (no deploy target configured).
 * Set NEXT_PUBLIC_SITE_URL once real hosting is in place; this is a guess
 * based on the contact email domain used elsewhere on the site.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bubaskalezzet.com";
export const siteName = "Bu Başka Lezzet";
