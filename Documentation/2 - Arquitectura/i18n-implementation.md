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

#### Patrón 1: Server Component (Recomendado)

```typescript
import { createT } from '@/lib/i18n';

// Factory function
const t = createT(); // default: es-CO

// Uso
const status = t('hud.status'); // "Estado: OPERACIONAL_ESTABLE"
const greeting = t('hud.status', { param: 'value' }); // "Estado: OPERACIONAL_ESTABLE value"
```

#### Patrón 2: Client Component

```typescript
import { useI18nStore } from '@/store/use-i18n-store';

const locale = useI18nStore((state) => state.locale);
const setLocale = useI18nStore((state) => state.setLocale);
```

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
