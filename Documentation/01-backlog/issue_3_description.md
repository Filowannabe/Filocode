# Issue #3 — Data: Fechas y Enlaces Demo

## Descripción
Implementar sistema de manejo de fechas y enlaces para datos de demostración, con cronología, enlaces externos y validación de URLs.

## Objetivo
Crear una capa de datos consistente para fechas y enlaces de demostración, facilitando la visualización temporal y navegación a recursos externos.

## Requisitos Funcionales

### 1. Manejo de Fechas
- [ ] Formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
- [ ] Formateo local (DD/MM/YYYY, MM/DD/YYYY, etc.)
- [ ] Cálculo de diferencias entre fechas
- [ ] Días, semanas, meses, años transcurridos
- [ ] Fechas futuras/pasadas con indicadores visuales

### 2. Cronología de Eventos
- [ ] Línea de tiempo horizontal
- [ ] Eventos ordenados cronológicamente
- [ ] Agrupar eventos por mes/año
- [ ] Zoom temporal (días, semanas, meses, años)
- [ ] Scroll horizontal con scrollbar

### 3. Enlaces Demo
- [ ] Validar URLs antes de mostrar
- [ ] Clasificar por tipo (external, internal, video, tutorial)
- [ ] Iconos según tipo de enlace
- [ ] Previsualización de enlaces (favicon, thumbnail)
- [ ] Abre en nueva pestaña (target="_blank")

### 4. Datos de Demo
- [ ] Datos por defecto (dummy data)
- [ ] Editable desde UI
- [ ] Persistencia en localStorage
- [ ] Exportar/importar datos demo

### 5. Validaciones
- [ ] URL válida (regex o API)
- [ ] Fecha válida (no futura para eventos pasados)
- [ ] Formato consistente en inputs

## Requisitos No Funcionales

- [ ] Performance: < 150ms para renderizar cronología
- [ ] Responsivo: Scroll horizontal en móvil
- [ ] Accesibilidad: Navegación por teclado en cronología
- [ ] Internacionalización: Soporte múltiples formatos de fecha

## Archivos a Crear

1. `src/services/dateService.ts` — Servicios de fechas
2. `src/services/demoData.ts` — Datos de demostración
3. `src/utils/dateFormatter.ts` — Utilidades de formateo
4. `src/hooks/useDate.ts` — Hook personalizado
5. `src/hooks/useDemoData.ts` — Hook para datos demo
6. `src/components/Timeline.tsx` — Componente de cronología
7. `src/components/DateDisplay.tsx` — Componente de visualización fecha
8. `src/components/LinkPreview.tsx` — Componente de previsualización

## Archivos a Modificar

1. `src/App.tsx` — Integrar servicios de fecha
2. `src/components/RepoCard.tsx` — Añadir fecha y enlaces
3. `src/components/ProjectCard.tsx` — Añadir cronología
4. `src/types/date.ts` — Interfaces TypeScript

## Criterios de Aceptación

- [ ] Fechas se muestran en formato local
- [ ] Cronología ordenada cronológicamente
- [ ] Enlaces validados y con iconos apropiados
- [ ] Previsualización de enlaces funciona
- [ ] Datos demo editables
- [ ] Persistencia en localStorage
- [ ] Scroll horizontal en móvil
- [ ] Navegación por teclado accesible

## Estimaciones

- **Tiempo de implementación**: ~70 minutos
- **Tiempo de pruebas**: ~15 minutos
- **Total estimado**: ~85 minutos

## Notas de Implementación

- Usar `Intl.DateTimeFormat` para formateo local
- Validar URLs con regex o `fetch` HEAD request
- Cronología: usar `framer-motion` para animaciones
- Datos demo: estructura JSON exportable

---

**Última actualización**: 14 de abril de 2026
**Estado**: Pending de aprobación