/**
 * i18n Helper - Puro para Next.js App Router (Server Components)
 * 
 * v6.0: Restauración de Multilenguaje (Server Components)
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
 * @param locale - Código de idioma (por defecto: "en")
 * @returns Función t() sync para el idioma especificado
 */
export function createT(locale: string = "en") {
  const dict = DICTIONARIES[locale] || DICTIONARIES['en'];

  return (key: string, params?: Record<string, string | number>): string => {
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
 * Versión async para compatibilidad
 */
export async function createTAsync(locale: string = "en") {
  return createT(locale);
}
