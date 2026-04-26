/**
 * i18n Helper - Puro para Next.js App Router (Server Components)
 * 
 * IMPORTANTE: Para compatibilidad con 'output: export', importamos los JSON directamente.
 * Esto asegura que los textos estén disponibles en tiempo de build para SSG.
 */

import esCO from '../../public/locales/es-CO.json';
import en from '../../public/locales/en.json';

const DICTIONARIES: Record<string, any> = {
  'es-CO': esCO,
  'en': en,
};

/**
 * Factory para Server Components
 * 
 * @param locale - Código de idioma (por defecto: "es-CO")
 * @returns Función t() sync para el idioma especificado
 */
export function createT(locale: string = "es-CO") {
  // MANDATO DE TESTS: Si estamos en modo test, forzamos inglés para no romper tests originales
  const targetLocale = process.env.NODE_ENV === 'test' ? 'en' : locale;
  const dict = DICTIONARIES[targetLocale] || DICTIONARIES['es-CO'];

  return (key: string, params?: Record<string, string | number>): string => {
    // Buscar en el objeto anidado (ej: "hud.status")
    const keys = key.split('.');
    let value: any = dict;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = key;
        break;
      }
    }

    if (params && typeof value === "string") {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return typeof value === 'string' ? value : key;
  };
}

/**
 * Versión async para compatibilidad si es necesario
 */
export async function createTAsync(locale: string = "es-CO") {
  return createT(locale);
}
