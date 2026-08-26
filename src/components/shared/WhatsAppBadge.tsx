import { contact, whatsappUrl } from '@/lib/contact';

/* ═══════════════════════════════════════════════════════════════════
 * WhatsAppBadge — the persistent contact affordance, lower-left.
 *
 * Built as an award badge rather than a chat bubble: a dark olive disc,
 * the caption set around its rim on a <textPath>, the glyph held upright
 * in the middle. The rim rotates in CSS (see globals.css) so this stays a
 * server component — no JS ships for it.
 *
 * Rendered once from the root layout, so it sits outside every page's
 * <PageTransition> and keeps its own view-transition-name: it should hold
 * still while the page behind it dissolves.
 * ═══════════════════════════════════════════════════════════════════ */

/** Sized to run the full rim at 9px/0.18em — see the viewBox circle below. */
const CAPTION = 'BİZE YAZIN · WHATSAPP · SİPARİŞ · ';

const DEFAULT_MESSAGE =
  'Merhaba, zeytinyağlarınız hakkında bilgi almak istiyorum.';

export default function WhatsAppBadge({
  message = DEFAULT_MESSAGE,
}: {
  message?: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp üzerinden yazın — ${contact.phone.label}`}
      style={{ viewTransitionName: 'wa-badge' }}
      className="wa-badge group fixed bottom-6 left-6 z-[10000] block h-20 w-20 rounded-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-gold-accent sm:bottom-8 sm:left-8 md:h-24 md:w-24"
    >
      <span className="relative grid h-full w-full place-items-center rounded-full bg-olive-dark text-olive-parchment shadow-[0_10px_30px_rgba(28,25,23,0.28)] transition-[transform,background-color] duration-500 ease-editorial group-hover:scale-105 group-hover:bg-olive-primary">
        {/* Rim caption */}
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="wa-badge__ring absolute inset-0 h-full w-full"
        >
          <defs>
            <path
              id="wa-badge-rim"
              fill="none"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            fill="currentColor"
            className="font-sans"
            style={{ fontSize: '9px', letterSpacing: '0.18em', fontWeight: 600 }}
          >
            <textPath href="#wa-badge-rim">{CAPTION}</textPath>
          </text>
        </svg>

        {/* Hairline ring, so the disc reads as a seal rather than a button */}
        <span
          aria-hidden="true"
          className="absolute inset-[18%] rounded-full border border-current opacity-25"
        />

        {/* WhatsApp glyph */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="relative h-7 w-7 transition-transform duration-500 ease-editorial group-hover:scale-110 md:h-8 md:w-8"
        >
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Z" />
        </svg>
      </span>
    </a>
  );
}
