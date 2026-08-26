import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The dev-only indicator defaults to bottom-left, exactly where the
  // WhatsApp badge lives — move it so local work sees the real design.
  devIndicators: { position: "bottom-right" },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // images: { unoptimized: false } // Vercel handles optimization, otherwise set true for fully static export
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
