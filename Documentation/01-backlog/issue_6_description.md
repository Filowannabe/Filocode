# Issue #6 — UI: Barra de Filtros HUD

## Descripción
Implementar barra de filtros HUD (Heads-Up Display) para filtrar repositorios por múltiples criterios: tecnologías, fecha, estrellas, forks, orden, y tipo de proyecto.

## Objetivo
Mejorar la navegación y descubrimiento de repositorios mediante una interfaz de filtros intuitiva y completa.

## Requisitos Funcionales

### 1. Filtros Disponibles
- [ ] Tecnologías/Frameworks (multi-select)
- [ ] Fecha de creación (range picker)
- [ ] Número de estrellas (min-max range)
- [ ] Número de forks (min-max range)
- [ ] Tipo de proyecto (public/private, archived, etc.)
- [ ] Orden por (stars, forks, date, name)
- [ ] Orden (asc/desc)

### 2. Componentes de Filtro
- [ ] Checkbox para selección múltiple
- [ ] Range slider para valores numéricos
- [ ] Select para opciones únicas
- [ ] Toggle para booleanos
- [ ] Clear all button
- [ ] Apply filters button

### 3. Estado de Filtros
- [ ] Mostrar filtros activos como badges
- [ ] Click en badge para quitar filtro
- [ ] Click en "Clear All" para quitar todos
- [ ] Persistencia en localStorage
- [ ] Recargar al refrescar

### 4. UI/UX
- [ ] Diseño responsive (móvil, tablet, desktop)
- [ ] Colores consistentes con dark/light mode
- [ ] Animaciones de entrada
- [ ] Feedback visual al aplicar filtros
- [ ] Tooltip con ayuda

### 5. Accesibilidad
- [ ] Navegación por teclado
- [ ] ARIA labels en todos los inputs
- [ ] Focus visible
- [ ] Screen reader compatible

## Requisitos No Funcionales

- [ ] Performance: < 100ms para renderizar filtros
- [ ] Responsive: Adaptable a móviles
- [ ] Accesibilidad: WCAG 2.1 AA
- [ ] Bundle size: Optimizado

## Archivos a Crear

1. `src/components/FilterBar.tsx` — Componente principal
2. `src/components/FilterChip.tsx` — Componente de filtro activo
3. `src/components/FilterSelect.tsx` — Select de filtro
4. `src/components/FilterRange.tsx` — Range slider
5. `src/types/filter.ts` — Interfaces TypeScript
6. `src/hooks/useFilters.ts` — Hook personalizado
7. `src/utils/filterLogic.ts` — Utilidades de filtrado

## Archivos a Modificar

1. `src/App.tsx` — Integrar filtros
2. `src/components/RepoList.tsx` — Aplicar filtros
3. `src/store/index.ts` — Persistir filtros en Zustand
4. `src/styles/filterBar.css` — Estilos específicos

## Criterios de Aceptación

- [ ] Todos los filtros funcionan
- [ ] Selección múltiple funciona
- [ ] Range slider funciona
- [ ] Clear All funciona
- [ ] Filtros activos visibles como badges
- [ ] Persistencia en localStorage
- [ ] Responsive en móvil
- [ ] Accesibilidad completa
- [ ] Animaciones fluidas

## Estimaciones Basadas en Datos Reales

**Contexto Histórico**:
- Operación real promedio: **0.8 minutos** (48 segundos)
- Operación real típica: **~1 minuto**
- Estimaciones anteriores: **60-110 minutos** (97% sobreestimación)

**Nueva Estimación Realista**:
- **Tiempo de actualización en GitHub**: ~1-2 minutos
- **Tiempo de implementación técnica**: NO incluido (solo actualización de descripción)
- **Total estimado**: **2-3 minutos** (incluyendo preparación de contenido)

> ⚠️ **NOTA**: Las estimaciones anteriores (60-110 min) incluían implementación completa. Esta estimación es solo para **actualizar la descripción en GitHub**.

## Notas de Implementación

- Filtros multi-select con `react-checkbox-tree` o similar
- Range slider con `react-range-slider`
- Persistencia con Zustand (ya implementado en Issue #5)
- Colores consistentes con tema global

---

**Última actualización**: 14 de abril de 2026
**Estado**: Pending de aprobación