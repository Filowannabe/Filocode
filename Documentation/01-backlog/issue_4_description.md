# Issue #4 — UI: Badges de Tecnologías en ProjectCard

## Descripción
Implementar sistema de badges visuales para mostrar tecnologías/frameworks en las ProjectCards, con diseño responsive y animaciones.

## Objetivo
Mejorar la visualización de tecnologías asociadas a cada proyecto mediante badges atractivos y funcionales.

## Requisitos Funcionales

### 1. Diseño de Badges
- [ ] Badge con nombre de tecnología
- [ ] Icono de cada tecnología (logo)
- [ ] Color distintivo por categoría (frontend, backend, db, etc.)
- [ ] Tooltip con descripción al hover
- [ ] Click para ver detalles de la tecnología

### 2. Tecnologías Soportadas
- [ ] React, Next.js, Angular, Vue, Svelte
- [ ] TypeScript, JavaScript
- [ ] Node.js, Express, NestJS
- [ ] PostgreSQL, MySQL, MongoDB
- [ ] Docker, Kubernetes
- [ ] AWS, Azure, GCP
- [ ] GitHub, GitLab, Bitbucket
- [ ] y más (configurable)

### 3. Visualización
- [ ] Grid responsive (1-3 badges según ancho)
- [ ] Animación de entrada (fade-in + scale)
- [ ] Hover effect (lift + shadow)
- [ ] Click effect (ripple o expand)
- [ ] Color scheme consistente con dark/light mode

### 4. Categorización
- [ ] Agrupar por categoría (Frontend, Backend, DB, DevOps, etc.)
- [ ] Opción para filtrar por categoría
- [ ] Badges ordenados por importancia

### 5. Personalización
- [ ] Colores personalizables por tecnología
- [ ] Tamaño configurable
- [ ] Posición en card (top, bottom, inline)

## Requisitos No Funcionales

- [ ] Performance: < 100ms para renderizar badges
- [ ] Responsive: Adaptable a móvil, tablet, desktop
- [ ] Accesibilidad: ARIA labels, navegable por teclado
- [ ] Performance: Lazy loading de icons (si hay muchos)

## Archivos a Crear

1. `src/components/Badge.tsx` — Componente base de badge
2. `src/components/TechnologyBadge.tsx` — Badge con tecnología
3. `src/data/technologies.ts` — Datos de tecnologías
4. `src/hooks/useTechnologies.ts` — Hook personalizado
5. `src/styles/badges.css` — Estilos específicos
6. `src/types/technology.ts` — Interfaces TypeScript

## Archivos a Modificar

1. `src/components/ProjectCard.tsx` — Integrar badges
2. `src/App.tsx` — Registrar configuración de tecnologías
3. `src/themes.ts` — Mapeo de colores por tecnología

## Criterios de Aceptación

- [ ] Badges muestran nombre y logo de tecnología
- [ ] Hover muestra tooltip con descripción
- [ ] Click abre detalles o documentación
- [ ] Grid responsive funciona
- [ ] Animaciones fluidas (60fps)
- [ ] Accesibilidad completa
- [ ] Dark/light mode compatible
- [ ] Personalización de colores funciona

## Estimaciones

- **Tiempo de implementación**: ~60 minutos
- **Tiempo de pruebas**: ~15 minutos
- **Total estimado**: ~75 minutos

## Notas de Implementación

- Usar `lucide-react` para iconos de tecnologías
- Mapeo: `technology-name` → `color` → `icon`
- Animaciones con `framer-motion`
- Lazy loading de imágenes de logos

---

**Última actualización**: 14 de abril de 2026
**Estado**: Pending de aprobación