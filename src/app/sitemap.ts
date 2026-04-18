import { MetadataRoute } from "next";

// REQUERIDO PARA NEXT.JS 16 EXPORT MODE
export const dynamic = "force-static";
export const revalidate = 604800; // 1 semana (cache estática)

/**
 * Sitemap Generator - Genera dinámicamente el mapa del sitio para SEO.
 * Utiliza la variable de entorno NEXT_PUBLIC_SITE_URL para las rutas absolutas.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
