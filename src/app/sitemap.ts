import { MetadataRoute } from "next";

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
