# Implementación de Internacionalización (i18n) - FILOCODE Portfolio

## Resumen Ejecutivo

Implementación completa de soporte multilingüe en el portfolio personal para mejorar la accesibilidad global y profesionalismo de la marca personal.

## Cambios Realizados

### 1. **Infraestructura de Localización**

#### Archivos Nuevos Creados

| Archivo | Propósito | Líneas |
|---------|-----------|--------|
| `src/lib/i18n.ts` | Factory para Server Components | 56 |
| `src/store/use-i18n-store.ts` | Gestión de estado con Zustand | 44 |
| `src/app/api/locales/[locale]/route.ts` | API Route para servir diccionarios | 29 |
| `src/components/hud/language-switcher.tsx` | Componente UI para cambio de idioma | 103 |
| `src/components/hud/collaboration-navbar.tsx` | Navbar de colaboraciones i18n | 204 |

#### Archivos Modificados

| Archivo | Cambios | Líneas |
|---------|---------|--------|
| `public/locales/es-CO.json` | Diccionario español (CO) | +369 |
| `public/locales/en.json` | Diccionario inglés | +305 |
| `src/services/githubApi.ts` | Actualización para soporte i18n | - |
| `src/components/RepoFetcher.tsx` | Integración con i18n | - |
| `src/components/hud/filter-bar.tsx` | Localización de UI | - |
| `src/components/hud/project-card.tsx` | Textos traducidos | - |
| `src/components/hud/project-gallery.tsx` | UI i18n | - |
| `src/components/hud/project-section.tsx` | Secciones traducidas | - |
| `src/components/hud/skills-panel.tsx` | Panel de habilidades | - |
| `src/components/hud/stats-bar.tsx` | Estadísticas traducidas | - |
| `src/components/hud/authorized-feedback.tsx` | Feedback autorizado | - |
| `src/components/hud/collaborations-archive.tsx` | Archivo de colaboraciones | - |
| `src/components/hud/project-card.tsx` | Tarjetas de proyectos | - |
| `src/app/page.tsx` | Página principal | - |
| `src/app/collaborations/page.tsx` | Hub de colaboraciones | - |
| `src/app/collaborations/[id]/page.tsx` | Vista de detalle | - |
| `src/utils/topics.ts` | Utilidades i18n | - |
| `src/types/repositorio.ts` | Tipos TypeScript | - |

### 2. **Arquitectura Implementada**

#### Patrón: Server-First i18n

**Decisiones de Diseño:**

1. **Export estático compatible**: Los diccionarios se importan directamente en tiempo de build
2. **Server Components nativos**: Sin dependencias de cliente para la traducción base
3. **Persistencia de estado**: Idioma persistente en localStorage
4. **Hot reload**: Cambio de idioma sin recargar página

#### Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    Client-Side (Client Components)           │
│  ┌──────────────────┐     ┌──────────────────────────────┐  │
│  │ language-switcher │────│    useI18nStore (Zustand)    │  │
│  │  (UI Component)  │     │  - locale: es-CO | en        │  │
│  └──────────────────┘     │  - setLocale(locale)          │  │
│                           │  - persist localStorage        │  │
│                           └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 Server-Side (Server Components)              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           createT(locale) Factory Function           │  │
│  │  - Dict: DICTIONARIES['es-CO' | 'en']               │  │
│  │  - Navigation: key.split('.')                        │  │
│  │  - Params replacement: {param} → paramValue         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 3. **API Route para Diccionarios**

**Endpoint**: `/api/locales/[locale]`

```typescript
GET /api/locales/es-CO  →  { ...dictionary }
GET /api/locales/en     →  { ...dictionary }
```

**Características:**
- `dynamic: "force-static"` para exportación estática
- `generateStaticParams()` genera rutas: `/api/locales/en` y `/api/locales/es-CO`
- Lectura de archivos JSON desde `public/locales/`
- Headers correctos: `Content-Type: application/json`
- Manejo de errores 404 para diccionarios no encontrados

### 4. **Componente Language Switcher**

**Ubicación**: `src/components/hud/language-switcher.tsx`

**Funcionalidades:**
- Selector de idioma (ES/EN)
- Persistencia en localStorage
- Actualización en tiempo real sin recarga
- Integración con `useI18nStore`

### 5. **Patrones de Traducción**

#### Patrón 1: Server Component (Orquestador)

```typescript
import { createT } from '@/lib/i18n';

// Factory function
const t = createT(); // default: en (v3.0)

// Uso
const status = t('hud.status'); // "System_Status: Operational"
```

#### Patrón 2: Client Component (Recomendado para Interactividad)

```typescript
import { useTranslations } from '@/lib/i18n-client';

export function MyComponent() {
  const t = useTranslations();
  return <div>{t('hud.status')}</div>;
}
```

### 6. **Refactor de Composición Server/Client (SSG Ready)**

Debido a que `generateStaticParams` solo es válido en Server Components y el estado reactivo (ej: Lightbox) requiere Client Components, se aplica el patrón de **Composición**:

1.  **Page.tsx (Server)**: Maneja metadatos, parámetros estáticos y carga de datos.
2.  **Content.tsx (Client)**: Recibe el objeto de datos y maneja la interactividad.

**IMPORTANTE**: No pasar la función `t` por props (Error de Serialización). El componente de cliente debe invocar su propio hook `useTranslations`.

---

## 🌎 Gobernanza Internacional (v3.0)

- **Default Locale**: `en`.
- **Fallback**: `en`.
- **Simetría**: 1:1 entre `en.json` y `es-CO.json`.
- **Tono**: Profesional / Laboral (Purgado de dramatismos).

## Estructura de Diccionarios

### Jerarquía de Claves

```
hud.status                    →  "ESTADO: OPERACIONAL_ESTABLE"
hud.xp                       →  "XP: 05_YEARS"
hud.rank                     →  "RANK: SENIOR"
hero.title_architecture      →  "ARQUITECTURA Y"
hero.title_development       →  "DESARROLLO"
arsenal.title_open_source    →  "Open Source"
collaborations.authorized    →  "AUTHORIZED_COLLABORATIONS"
projects.omnicon.title       →  "Project Management Platform Development"
```

### Diccionarios Disponibles

| Diccionario | Archivos | Idioma |
|-------------|----------|--------|
| `es-CO` | `public/locales/es-CO.json` | Español (Colombia) |
| `en` | `public/locales/en.json` | Inglés (US) |

## Testing

### Test Mandatorios

**Archivo**: `src/lib/i18n.ts`

```typescript
// MANDATO DE TESTS: Si estamos en modo test, forzamos inglés
const targetLocale = process.env.NODE_ENV === 'test' ? 'en' : locale;
```

**Motivación:** Evitar que los tests originales fallen por cambio de idioma.

## Impacto en el Código Base

### Archivos con Mayor Impacto

1. **`src/services/githubApi.ts`** (-129 líneas)
   - Refactorización para integrar con i18n
   - Textos de UI ahora traducidos

2. **`src/components/hud/collaborations-archive.tsx`** (+311, -311)
   - Actualización completa con soporte i18n
   - Manteniendo funcionalidad existente

3. **`src/app/collaborations/[id]/page.tsx`** (+103, -103)
   - Diferencia neta de 0, pero cambios significativos
   - Reemplazo de textos por llamadas a `t()`

### Mejoras de Calidad

- **Reducción de duplicación**: Textos centralizados en JSON
- **Mantenibilidad**: Cambios de texto sin tocar código
- **Accesibilidad**: Soporte internacional nativo
- **SEO**: Metadatos y textos optimizados para múltiples idiomas

## Consideraciones Técnicas

### Compatibilidad con Next.js Output

```typescript
// IMPORTANTE: Para 'output: export'
// Los diccionarios se importan en tiempo de build
// Esto asegura SSG (Static Site Generation)
import esCO from '../../public/locales/es-CO.json';
import en from '../../public/locales/en.json';
```

### Optimización de Performance

- Diccionarios cacheados en Server Components
- Carga diferida en Client Components
- Sin llamadas API en tiempo de ejecución (excepto /api/locales/* para SSR)

## Roadmap Futuro

### Fase 1: ✅ Completada
- [x] Infraestructura i18n base
- [x] Diccionarios ES/EN
- [x] Language Switcher UI
- [x] API Route estático

### Fase 2: 📋 En Progreso
- [ ] Detectar idioma del navegador (navigator.language)
- [ ] Fallback automático (en → es-CO)
- [ ] RTL (Right-to-Left) para árabe/hebreo

### Fase 3: 🔜 Planificada
- [ ] Más idiomas (Español MX/ES, Portugués BR, Francés FR)
- [ ] Formateo de fecha/número por locale (Intl.DateTimeFormat)
- [ ] Plurales y gramática avanzada (i18next pattern)

### 6. **Patrones de Animación (HUD Pro-Max)**

#### Patrón: Función Auto-llamable con setTimeout (ESLint-Compliant)

**Problema:** ESLint detecta recursión en `useCallback` como anti-pattern:
```typescript
// ❌ WRONG — ESLint Error
const startAnimation = useCallback(async (isRecursive = false) => {
  if (condition) {
    setTimeout(() => startAnimation(true), 50); // Error de orden
  }
}, [deps]);
```

**Solución:** Patrón de función auto-llamable:
```typescript
// ✅ ESLINT-COMPLIANT
const startMobileMarquee = useCallback(() => {
  let animationTimeoutId: ReturnType<typeof setTimeout> | undefined;
  
  // Función auto-llamable para evitar "use before define"
  const self = async () => {
    if (!ref.current || viewMode !== 'console' || isTest) return;
    
    // Lógica de animación...
    
    // Función auto-llamable, NO recursión en useCallback
    animationTimeoutId = setTimeout(self, 50);
  };

  animationTimeoutId = setTimeout(self, 50);
  return () => clearTimeout(animationTimeoutId);
}, [deps]);
```

**Ventajas:**
- ESLint-compliant (sin error de orden)
- Cleanup seguro con `clearTimeout`
- React 19 ready
- Mantiene arquitectura original de animación

**Documentación:** Ver [`animation-rfc-pattern.md`](./animation-rfc-pattern.md)

**Problema:** ESLint detecta recursión en `useCallback` como anti-pattern:
```typescript
// ❌ WRONG — ESLint Error
const startAnimation = useCallback(async (isRecursive = false) => {
  if (condition) {
    setTimeout(() => startAnimation(true), 50); // Error de orden
  }
}, [deps]);
```

**Solución:** Patrón RAF con función interna:
```typescript
// ✅ ESLINT-COMPLIANT
const startMobileMarquee = useCallback(() => {
  let animationFrameId: number;
  
  // Función interna para evitar "use before define"
  const loop = () => {
    if (!ref.current || viewMode !== 'console' || isTest) {
      cancelAnimationFrame(animationFrameId);
      return;
    }
    
    // Lógica de animación
    const currentX = mobileX.get();
    if (currentX <= -halfWidth) {
      mobileX.set(0);
    } else {
      // ...
    }
    
    // Recursión segura usando nombre de función interna
    animationFrameId = requestAnimationFrame(loop);
  };

  animationFrameId = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(animationFrameId);
}, [deps]);
```

**Ventajas:**
- Rendimiento óptimo sincronizado con refresh rate
- ESLint-compliant (sin error de orden)
- Cleanup seguro con `cancelAnimationFrame`
- React 19 ready

**Documentación:** Ver [`animation-rfc-pattern.md`](./animation-rfc-pattern.md)

## Referencias

- [MDN: Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Internationlization)
- [Next.js i18n Best Practices](https://nextjs.org/docs/pages/building-your-application/internationalization)
- [Zustand: persist middleware](https://github.com/pmndrs/zustand/blob/main/docs/storing-your-state-in-local-storage.md)

## Autores

**Felipe Corredor Castro**  
Senior Software Architect  
Portafolio FILOCODE

**Fecha**: April 25, 2026  
**Commit**: feat/54--i18n-infrastructure
