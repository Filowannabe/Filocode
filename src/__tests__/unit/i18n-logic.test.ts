import { describe, it, expect } from 'vitest';
import { createT } from '@/lib/i18n';

describe('i18n Logic - Global Standard & Tone Audit', () => {
  
  it('debe tener "en" como idioma por defecto (Default Governance)', () => {
    const t = createT(); // Sin parámetros debe ser 'en'
    // Comprobar un string que sea diferente en ES y EN
    // ES: "ARQUITECTURA Y" | EN: "ARCHITECTURE &"
    expect(t('hero.title_architecture')).toBe('ARCHITECTURE &');
  });

  it('debe permitir cambiar a "es-CO" exitosamente', () => {
    const t = createT('es-CO');
    expect(t('hero.title_architecture')).toBe('ARQUITECTURA Y');
  });

  it('debe haber purgado el "compromiso" del arsenal en ambos idiomas (Tone Audit)', () => {
    const tEN = createT('en');
    const tES = createT('es-CO');

    // Validación Inglés
    expect(tEN('arsenal.description')).not.toContain('My commitment');
    expect(tEN('arsenal.description')).toContain('Technical audit of architecture');

    // Validación Español
    expect(tES('arsenal.description')).not.toContain('Mi compromiso');
    expect(tES('arsenal.description')).toContain('Auditoría técnica de arquitectura');
  });

  it('debe mantener el fallback a "en" ante un locale no soportado', () => {
    // @ts-ignore - forzando locale inexistente
    const t = createT('fr-FR');
    expect(t('hero.title_architecture')).toBe('ARCHITECTURE &');
  });

  it('debe soportar interpolación de parámetros ({count})', () => {
    const t = createT('en');
    const output = t('arsenal.description', { count: 32 });
    expect(output).toContain('32 open source projects');
  });

  it('debe devolver la key si el string no existe (Graceful Failure)', () => {
    const t = createT('en');
    expect(t('non.existent.key')).toBe('non.existent.key');
  });
});
