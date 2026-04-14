import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlashlightEffect } from "@/components/hud/flashlight-effect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata Global - Configuración de SEO y Redes Sociales.
 * Utiliza la Metadata API de Next.js 16 para inyección automática en el <head>.
 */
export const metadata: Metadata = {
  title: "Filocode | Senior Software Engineer",
  description: "Portafolio técnico HUD Brutalista. Arquitectura de sistemas, desarrollo fullstack y ecosistema Next.js/Node.js.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  
  openGraph: {
    title: "Filocode | Senior Software Engineer",
    description: "Portafolio técnico HUD Brutalista.",
    url: "/",
    siteName: "Filocode",
    locale: "es_CO",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Filocode | Senior Software Engineer",
    description: "Portafolio técnico HUD Brutalista.",
  },
  
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-x-hidden bg-[#0A0A0A] text-white antialiased`}
      >
        <FlashlightEffect />
        {children}
      </body>
    </html>
  );
}
