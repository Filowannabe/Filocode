# Resumen de Arquitectura: FASE 2

## Atmosfera HUD (Flashlight Effect)
- **Hook**: `src/hooks/use-mouse-position.ts`
  - Utiliza `useMotionValue` y `useSpring` de Framer Motion.
  - **Performance**: 0 re-renders de React durante el `mousemove`.
- **Componente**: `src/components/hud/flashlight-effect.tsx`
  - Renderizado en el `layout.tsx` para cobertura global.
  - Efecto: `radial-gradient` ámbar con `mix-blend-soft-light`.

## Estructura Bento (Paneles)
- **Primitiva**: `HudPanel`
  - Estilos: `bg-black/40`, `backdrop-blur-md`, `rounded-sm`.
  - Interacción: Iluminación de bordes dinámicos en `hover`.
- **Dashboard**: `HeroDashboard` + `StatsBar`.
  - Tipografía: Geists Sans con tracking negativo para brutalismo.
  - Layout: CSS Grid de 12 columnas (`md:col-span-8`, `md:col-span-12`).

## Estado del Proyecto
- [x] FASE 1: Base & Setup
- [x] FASE 2: Atmosfera & Estructura Bento
- [ ] FASE 3: Galería de Proyectos & Animaciones de Entrada
