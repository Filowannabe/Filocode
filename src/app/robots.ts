import { MetadataRoute } from "next";

// REQUERIDO PARA NEXT.JS 16 EXPORT MODE
export const dynamic = "force-static";
export const revalidate = 604800; // 1 semana (cache estática)

/**
 * Robots.txt Generator - Controla el acceso de rastreadores externos.
 * Enlaza automáticamente con el sitemap generado dinámicamente.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
