import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
const isStaging = process.env.NEXT_PUBLIC_ENV === 'staging';

// basePath condicional para GitHub Pages
// Producción (master) va en la raíz del repositorio: /Filocode
// Staging va en la subcarpeta: /Filocode/staging
const getBasePath = () => {
  if (isDev) return '';
  if (isStaging) return '/Filocode/staging';
  return '/Filocode';
};

const nextConfig: NextConfig = {
  basePath: getBasePath(),
  
  // Output estático para GitHub Pages
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Configuración de imágenes para export estático
  images: {
    // Deshabilitar optimización automática para export estático
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  experimental: {
    // Si necesitas configuraciones específicas de Turbo, van aquí
  }
};

export default nextConfig;
