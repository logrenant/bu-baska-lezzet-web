import Link from "next/link";
import { pillars, type PillarSlug } from "@/lib/content/pillars";

/**
 * Links a blog/tarif page back to the homepage section it echoes — the
 * structural version of the internal-linking the competitor audit
 * recommended (nobody else in the market ties its editorial content back
 * to its own product-story pillars).
 */
export default function PillarTag({ pillar }: { pillar: PillarSlug }) {
  const { label, href } = pillars[pillar];
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 font-sans text-eyebrow tracking-eyebrow uppercase text-olive-eyebrow hover:text-olive-primary transition-colors"
    >
      {label}
    </Link>
  );
}
