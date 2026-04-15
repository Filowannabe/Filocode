# Issue #5 — Zustand: Implementación de Store

## Descripción
Implementar gestión de estado global usando Zustand como alternativa a Redux, con persistencia y optimizaciones de performance.

## Objetivo
Simplificar la gestión de estado global del aplicación mediante Zustand, ofreciendo mejor performance y menos boilerplate que Redux.

## Requisitos Funcionales

### 1. Configuración Básica
- [ ] Store con Zustand para estado global
- [ ] Actions para mutations de estado
- [ ] Persistencia en localStorage
- [ ] Reset completo de estado

### 2. Estado a Gestionar
- [ ] Tema (dark/light mode)
- [ ] Configuración de filtros
- [ ] Datos de repositorios (loading, error, data)
- [ ] Configuración de usuario (preferencias)
- [ ] Estado de navegación (activeTab, etc.)

### 3. Persistencia
- [ ] Guardar en localStorage
- [ ] Recuperar al cargar app
- [ ] Clear manual
- [ ] Migración de datos (si aplica)

### 4. Optimizaciones
- [ ] Devtools para debugging
- [ ] Selector de slices (para evitar re-renders)
- [ ] Middleware para logging
- [ ] Persist middleware

### 5. Integración
- [ ] Provider global (opcional, Zustand es global)
- [ ] Tipos TypeScript para todas las acciones
- [ ] Devtools para desarrollo

## Requisitos No Funcionales

- [ ] Performance: < 50ms para acciones simples
- [ ] Bundle size: < 2KB gzipped
- [ ] Accesibilidad: Manejo de foco con cambios de estado
- [ ] Desarrollo: Devtools para debugging

## Archivos a Crear

1. `src/store/index.ts` — Store principal
2. `src/store/technology.ts` — Slices de tecnologías
3. `src/store/persistence.ts` — Persistencia middleware
4. `src/types/store.ts` — Interfaces TypeScript
5. `src/hooks/useStore.ts` — Hooks personalizados
6. `src/devtools/index.tsx` — Configuración devtools

## Archivos a Modificar

1. `src/App.tsx` — Registrar store
2. `src/main.tsx` — Inicializar provider (si aplica)
3. `src/components/*` — Reemplazar `useSelector` por `useStore()`

## Criterios de Aceptación

- [ ] Store funciona con TypeScript
- [ ] Persistencia en localStorage
- [ ] Actions reactivas (re-render cuando cambia estado)
- [ ] Selector slices optimiza re-renders
- [ ] Devtools funciona
- [ ] Bundle size optimizado
- [ ] Migración de Redux (si aplica)
- [ ] Tipos TypeScript correctos

## Estimaciones

- **Tiempo de implementación**: ~45 minutos
- **Tiempo de pruebas**: ~15 minutos
- **Total estimado**: ~60 minutos

## Notas de Implementación

- Zustand API: `create((set) => ({ ... }))`
- Persistencia: `createWithPersistence()` o middleware manual
- Selector: `useStore(state => state.slice, [dependency])`
- Bundle: Zustand es ultra-light (~2KB gzipped)

---

**Última actualización**: 14 de abril de 2026
**Estado**: Pending de aprobación