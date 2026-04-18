# Issue #2 — Extracción de GitHub Topics (Tags)

## Descripción
Implementar funcionalidad para extraer y mostrar GitHub Topics (tags) de repositorios, con búsqueda, filtro y visualización en la interfaz.

## Objetivo
Mejorar la exploración de repositorios mediante la visualización de topics/etiquetas asociadas a cada repositorio.

## Requisitos Funcionales

### 1. Extracción de Topics
- [ ] Obtener topics de cada repositorio vía GitHub API
- [ ] Normalizar formato de topics (case-sensitive, sin espacios)
- [ ] Manejar repositorios sin topics (empty array)
- [ ] Limitar a máximo 20 topics por repositorio

### 2. Visualización de Topics
- [ ] Mostrar topics en ProjectCard como etiquetas
- [ ] Usar color distintivo para cada topic
- [ ] Mostrar cantidad total de topics
- [ ] Click en topic para filtrar repositorios

### 3. Búsqueda de Topics
- [ ] Input para buscar topics por nombre
- [ ] Filtrar repositorios por topic específico
- [ ] Búsqueda case-insensitive
- [ ] Highlight del texto buscado en resultados

### 4. Filtros Avanzados
- [ ] Múltiple topic (OR logic)
- [ ] Excluir topic específico
- [ ] Combinar con otros filtros (language, stars, etc.)

### 5. Persistencia
- [ ] Guardar filtros aplicados en localStorage
- [ ] Recargar filtros al volver a la app
- [ ] Exportar configuración de filtros

## Requisitos No Funcionales

- [ ] Performance: < 200ms para renderizar topics
- [ ] Accesibilidad: Labels para screen readers
- [ ] Responsive: Temas visibles en móvil
- [ ] Internacionalización: Soporte múltiples idiomas

## Archivos a Crear

1. `src/services/githubTopics.ts` — Servicio de API Topics
2. `src/utils/topics.ts` — Utilidades de normalización
3. `src/types/topic.ts` — Interfaces TypeScript
4. `src/hooks/useTopics.ts` — Hook personalizado
5. `src/components/TopicTag.tsx` — Componente de etiqueta
6. `src/components/TopicFilter.tsx` — Componente de filtro
7. `src/components/TopicSearch.tsx` — Componente de búsqueda

## Archivos a Modificar

1. `src/App.tsx` — Integrar servicio de topics
2. `src/components/ProjectCard.tsx` — Añadir visualización de topics
3. `src/components/RepoList.tsx` — Añadir filtros de topics
4. `src/styles/topics.css` — Estilos específicos

## Criterios de Aceptación

- [ ] Se pueden extraer topics de repositorios
- [ ] Topics se visualizan como etiquetas en ProjectCard
- [ ] Click en topic filtra repositorios
- [ ] Búsqueda de topics funciona
- [ ] Filtros combinados funcionan (OR logic)
- [ ] Persistencia de filtros en localStorage
- [ ] Accesibilidad completa (WCAG 2.1)

## Estimaciones

- **Tiempo de implementación**: ~90 minutos
- **Tiempo de pruebas**: ~20 minutos
- **Total estimado**: ~110 minutos

## Notas de Implementación

- Usar GitHub API endpoint: `GET /repos/{owner}/{repo}/topics`
- Normalización: `lowercase`, `replace spaces with -`, `remove special chars`
- Colores de topics: Mapeo de nombre → color hexadecimal
- Considerar topics heredados de parent repos (forks)

## Hitos Alcanzados ✅

### Deep Scan Ligero
- Análisis completo de `FilterBar` existente (295 líneas)
- Identificación de API obsoleta (`activeTopic` → `activeTopics`, `onTopicChange` → `onTopicToggle`)
- Descarte de `theme` prop (ya no existe en versión actual)

### Iconografía Oficial
- Selección de iconos de `lucide-react` para tags
- Implementación de Single Select con diseño brutalista
- Tema ámbar (#fbb03b) con negro (#000000)

### Lógica OR
- Filtros múltiples con lógica OR (no AND como inicialmente pensado)
- Tags activos con botones de deselección individuales
- Botón CLEAR para resetear a "todos los repositorios"

---

## Dependencias

- `lucide-react` para iconos de topic
- `clsx` para conditional class names
- `framer-motion` para animaciones (AnimatePresence lazy)

---

**Última actualización**: 16 de abril de 2026
**Estado**: ✅ COMPLETED (Suite de tests regresión: 8/8 passing)