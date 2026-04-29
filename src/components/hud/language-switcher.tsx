"use client";

import { useI18nStore } from "@/store/use-i18n-store";

/**
 * LanguageSwitcher - Conmutador minimalista de idioma para el HUD.
 * v1.2: Texto en negrita y tamaño optimizado (10px).
 */
export function LanguageSwitcher() {
  const { locale, setLocale } = useI18nStore();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'es-CO' : 'en');
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center justify-center w-8 h-8 rounded-sm bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-300 cursor-pointer"
      title={locale === 'en' ? "Switch to Spanish" : "Cambiar a Inglés"}
    >
      <span className="font-mono text-[10px] font-black text-amber-500 uppercase tracking-tighter">
        {locale === 'en' ? 'EN' : 'ES'}
      </span>
    </button>
  );
}
