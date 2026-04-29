/**
 * i18n Client Hook - Para Client Components
 * 
 * v5.0: Sincronización Inmediata y Reactiva.
 * Garantiza que el cambio de idioma sea instantáneo y reactivo.
 */

import { useMemo } from "react";
import { useI18nStore } from "@/store/use-i18n-store";
import esCO from '../../public/locales/es-CO.json';
import en from '../../public/locales/en.json';

const STATIC_DICTIONARIES: Record<string, any> = {
  'es-CO': esCO,
  'en': en,
};

/**
 * Hook para Client Components
 * Reacciona al cambio de locale en el store global.
 */
export function useTranslations(): (key: string, params?: Record<string, string | number>) => string {
  const locale = useI18nStore((state) => state.locale);
  
  // Resolución síncrona del diccionario para evitar parpadeos de idioma
  const dict = useMemo(() => {
    return STATIC_DICTIONARIES[locale] || STATIC_DICTIONARIES['en'];
  }, [locale]);

  return (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = dict;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    if (value === undefined) return key;
    
    let result = typeof value === 'string' ? value : key;

    if (params && typeof result === "string") {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return result;
  };
}
