import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Structural Integrity Guard - Build Stability', () => {
  const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
  const globalsPath = path.join(process.cwd(), 'src/app/globals.css');
  const localStylesPath = path.join(process.cwd(), 'src/styles/tw-animate.css');

  it('debe existir el archivo local de animaciones para estabilidad de Turbopack', () => {
    expect(fs.existsSync(localStylesPath)).toBe(true);
  });

  it('layout.tsx debe importar las animaciones desde la ruta local estable', () => {
    const content = fs.readFileSync(layoutPath, 'utf8');
    expect(content).toContain('@/styles/tw-animate.css');
    // Asegurar que NO intenta importar directamente de node_modules (causa pánico en Windows/Turbo)
    expect(content).not.toContain('import "tw-animate-css"');
  });

  it('globals.css debe liderar con el motor de Tailwind v4 y estar limpio de importaciones conflictivas', () => {
    const content = fs.readFileSync(globalsPath, 'utf8');
    expect(content).toContain('@import "tailwindcss"');
    expect(content).not.toContain('@import "tw-animate-css"');
  });
});
