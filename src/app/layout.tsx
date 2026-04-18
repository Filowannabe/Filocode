import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore - side-effect import for Tailwind animations
import "@/styles/tw-animate.css";
// @ts-ignore - side-effect import for global styles
import "@/app/globals.css";
import { FlashlightEffect } from "@/components/hud/flashlight-effect";
import Image from "next/image";
import bgIllustration from "../../public/images/backgrounds/bg-brutalist.jpg";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-x-hidden bg-[#000000] text-white antialiased`}
      >
        {/* ATMOSPHERE ARCHITECTURE - CINEMATIC COLOR & DEPTH */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black">
          {/* Layer 1: The Foundation Illustration - Blurred & Vibrant */}
          <div className="absolute inset-0 scale-105 blur-[15px] opacity-60">
            <Image
              src={bgIllustration}
              alt=""
              fill
              priority
              className="object-cover object-center brightness-125 contrast-125 grayscale-[0.1]"
            />
          </div>

          {/* Layer 2: CENTRAL MASSIVE GOLDEN SUN (The 'Sol Dorado') - LOWER & BRIGHTER */}
          {/* Core White-Hot Light */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-32 h-32 bg-white blur-[20px] rounded-full mix-blend-plus-lighter z-10 opacity-60" />
          {/* Golden Intensive Glow */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-400 blur-[80px] rounded-full mix-blend-screen z-0 opacity-45 animate-solar-flare" />
          {/* Massive Atmospheric Bloom */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-amber-600/20 blur-[180px] rounded-full mix-blend-plus-lighter opacity-30" />
          {/* Horizontal Lens Flare Element */}
          <div className="absolute top-[48%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-200/20 to-transparent blur-[2px]" />

          {/* Layer 3: Winter Atmosphere (Dense Snow Particles - Clean Look) */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(140)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full animate-snow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * -30}%`,
                  animationDelay: `${Math.random() * 25}s`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                  opacity: 0.3 + Math.random() * 0.4,
                  filter: `blur(${Math.random() * 0.5}px)`
                }}
              />
            ))}
          </div>
          {/* Layer 4: Textural Noise Overlay */}
          <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />

          {/* Layer 5: Strong Pure Black Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>

        <FlashlightEffect />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}