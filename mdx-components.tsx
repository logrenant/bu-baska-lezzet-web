import type { MDXComponents } from "mdx/types";

/**
 * Required by @next/mdx for the App Router. Maps MDX's default elements to
 * the same typographic voice as AboutStory.tsx (serif headings, sans body,
 * olive-eyebrow accents) so every blog/tarif body renders brand-consistent
 * without each .mdx file repeating className soup. Post h1s are rendered by
 * the page template, not MDX bodies, so this starts at h2.
 */
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-snug text-stone-900 mt-14 mb-5">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-xl sm:text-2xl leading-snug text-stone-900 mt-10 mb-4">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="font-sans text-base md:text-lg leading-relaxed text-stone-700 mb-6">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="font-sans text-base md:text-lg leading-relaxed text-stone-700 mb-6 ml-5 list-disc space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="font-sans text-base md:text-lg leading-relaxed text-stone-700 mb-6 ml-5 list-decimal space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="font-serif italic text-xl md:text-2xl leading-snug text-olive-eyebrow my-10 max-w-2xl">
      {children}
    </blockquote>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-olive-primary underline decoration-1 underline-offset-2 hover:text-olive-dark"
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-stone-900">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
