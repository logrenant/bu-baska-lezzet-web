/**
 * The canonical origin every absolute URL on the site is built from:
 * `metadataBase`, the canonical tags, sitemap.xml, robots.txt and the
 * JSON-LD blocks all derive from it.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this in Vercel → Settings → Environment
 *      Variables once the real domain is live.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel injects the project's stable
 *      production domain. (Deliberately NOT VERCEL_URL: that one is unique
 *      per deployment, so canonicals would point at a preview build.)
 *   3. The hardcoded guess below, based on the contact email's domain.
 *
 * Every step is validated, because an env var that exists but is empty is
 * the common failure here — `process.env.X ?? fallback` does not catch `""`,
 * and `new URL("")` then throws at build time with `ERR_INVALID_URL`.
 */
const FALLBACK_SITE_URL = "https://bubaskalezzet.com";

function normalize(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;

  // Vercel's variable comes as a bare host ("example.com"), env vars are
  // often pasted the same way — both need a scheme before URL accepts them.
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    // Round-tripping through URL also drops a trailing slash, so
    // `${siteUrl}/blog` can never produce a doubled "//".
    return new URL(withProtocol).toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export const siteUrl =
  normalize(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalize(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  FALLBACK_SITE_URL;

export const siteName = "Bu Başka Lezzet";
