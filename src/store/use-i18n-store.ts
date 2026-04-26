/**
 * i18n Store - Zustand Global State Management
 * 
 * GESTIÓN DE IDIOMA EN PORTAFOLIO FILOCODE
 * 
 * CARACTERÍSTICAS:
 * - Idioma por defecto: 'es-CO'
 * - Persistencia en localStorage (sobrevive a recargas)
 * - Hot reload: cambio de idioma sin recargar página
 * - Compatible con export estático (GitHub Pages)
 * 
 * USO:
 *   import { useI18nStore } from '@/store/use-i18n-store';
 *   const locale = useI18nStore((state) => state.locale);
 *   const setLocale = useI18nStore((state) => state.setLocale);
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Locale = 'es-CO' | 'en';

type I18nState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

type I18nActions = I18nState;

export const useI18nStore = create<I18nState & I18nActions>()(
  persist(
    (set) => ({
      locale: 'es-CO',
      setLocale: (locale: Locale) => set({ locale }),
    }),
    {
      name: 'i18n-storage', // nombre del key en localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        locale: state.locale,
      }),
    }
  )
);
