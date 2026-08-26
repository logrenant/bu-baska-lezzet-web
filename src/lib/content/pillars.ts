export type PillarSlug = "kokler" | "emek" | "simya" | "mahzen" | "muhur";

interface Pillar {
  label: string;
  href: string;
}

/**
 * The five brand pillars from content.md, each mapped to where they live on
 * the site. Blog/tarif content tags itself with one of these so PillarTag
 * can link back into the homepage story — the structural version of the
 * internal-linking gap the competitor audit flagged.
 */
export const pillars: Record<PillarSlug, Pillar> = {
  kokler: { label: "Kökler", href: "/#groves" },
  emek: { label: "Emek", href: "/#emek" },
  simya: { label: "Simya", href: "/#simya" },
  mahzen: { label: "Mahzen", href: "/hakkimizda" },
  muhur: { label: "Mühür", href: "/hakkimizda" },
};
