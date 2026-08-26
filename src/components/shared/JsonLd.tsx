/**
 * Renders a JSON-LD <script> tag. Uses Next's own documented escape pattern
 * (replace `<` with its unicode equivalent) since JSON.stringify alone does
 * not sanitize against XSS injection in a dangerouslySetInnerHTML payload.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
