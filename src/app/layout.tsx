import type { Metadata, Viewport } from "next";
import { cabinetGrotesk, inter } from "@/components/Fonts";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SchemaMarkup from "@/components/SchemaMarkup";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.hero.desc,
  metadataBase: new URL("https://sovereignpatia.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} — Patia, Bhubaneswar`,
    description: siteConfig.hero.desc,
    url: "https://sovereignpatia.com",
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Luxury Nightlife`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.hero.desc,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabinetGrotesk.variable} ${inter.variable} antialiased`}>
      <body className="bg-void text-ink font-body selection:bg-accent selection:text-void">
        <LenisProvider>
          <CustomCursor />
          <Header />
          <main className="min-h-screen pt-20 md:pt-24 overflow-hidden relative">
            {children}
          </main>
          <Footer />
        </LenisProvider>
        <SchemaMarkup />
      </body>
    </html>
  );
}
