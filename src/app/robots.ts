import { MetadataRoute } from "next";

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
