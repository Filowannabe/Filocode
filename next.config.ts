import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
const isStaging = process.env.NEXT_PUBLIC_ENV === 'staging';

const nextConfig: NextConfig = {
  // basePath condicional: staging usa /staging, production y dev usan raíz
  basePath: isStaging ? '/staging' : (isDev ? '' : ''),
  
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
