import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { siteName, siteUrl } from "@/lib/site";
import { organizationJsonLd } from "@/lib/organization";
import JsonLd from "@/components/shared/JsonLd";
import WhatsAppBadge from "@/components/shared/WhatsAppBadge";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const description =
  "Asırlık zeytin bahçelerinden soğuk sıkım şişeye: geleneksel yöntemlerle üretilen, elle hasat edilmiş premium zeytinyağı.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Doğanın Simyası`,
    template: `%s | ${siteName}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteName} — Doğanın Simyası`,
    description,
    url: siteUrl,
    siteName,
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/assets/groves_main.webp", width: 1920, height: 1080, alt: "Zeytinlik bahçeleri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Doğanın Simyası`,
    description,
    images: ["/assets/groves_main.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans">
        <JsonLd data={organizationJsonLd} />
        {/* Fixed Window Frame Illusion. Named so it holds still through a
            page transition instead of dissolving with the content. */}
        <div
          style={{ viewTransitionName: "site-frame" }}
          className="pointer-events-none fixed inset-0 z-[9999] border-[1rem] sm:border-[1.5rem] lg:border-[2rem] border-white"
        ></div>
        {children}
        {/* Outside {children} on purpose: the badge belongs to the shell, so
            it survives every navigation instead of re-entering with the page. */}
        <WhatsAppBadge />
      </body>
    </html>
  );
}
