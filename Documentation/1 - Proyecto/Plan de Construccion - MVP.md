---
tags:
  - project
  - architecture
  - mvp
  - roadmap
status: in-progress
created: 2026-04-13
updated: 2026-04-13
---

# 🏗️ Plan de Construcción: MVP filocode.dev (HUD Brutalista)

Este documento detalla el levantamiento técnico y la estrategia de implementación para el portafolio personal bajo el concepto visual de **HUD Brutalista**.

## 📊 Estado Actual
- **Core:** Next.js 16.1.6 + React 19.2.3 (App Router).
- **Estilos:** Tailwind CSS 4.0.0 (Nuevo motor `@import`).
- **UI:** Shadcn UI inicializado (Nova style).
- **Dependencias:** `zustand`, `framer-motion` instaladas (Versiones exactas).
- **Configuración:** ADN Visual inyectado (Ámbar Primario + Ruido SVG).

---

## 🚀 FASE 1: Setup Atmosférico (Ambiente Técnico) [COMPLETA]

### TAREA 1.1: Instalación de Dependencias [x]
Ejecutar la instalación de las librerías críticas para habilitar animaciones técnicas y estado global:
- Gestor: `yarn`.
- Comando: `yarn add framer-motion zustand --exact`.

### TAREA 1.2: Inyección de ADN Visual (Tailwind v4) [x]
Modificar `src/app/globals.css` aplicando el nuevo motor de Tailwind:
- **Limpieza:** Eliminado cualquier rastro de temas claros.
- **Theming:** Definido el color Ámbar Primario (`--color-primary: oklch(0.75 0.15 65)`).
- **Superficie:** Fondo configurado en `#0A0A0A`.
- **Textura:** Ruido SVG procedural inyectado mediante Data URI en el `body`.

### TAREA 1.3: Layout y Modo Oscuro Forzado [x]
Modificar `src/app/layout.tsx` para establecer la base del HUD:
- **Estructura HTML:** Forzado modo oscuro (`className="dark"`).
- **Simplificación:** Eliminados ThemeProviders externos.
- **Contención:** `body` configurado con `relative min-h-screen overflow-x-hidden`.

### TAREA 1.4: Documentación As-Code [x]
Validar la infraestructura mediante la creación de un lienzo técnico:
- Archivo: `Documentation/02-base-setup.canvas`.
- Contenido: Esquema JSON válido para Obsidian.

---

## 🏗️ FASE 2: Arquitectura de Componentes HUD

### PASO 2.1: Hooks de Alto Rendimiento
Crear `src/hooks/use-mouse-position.ts` optimizado:
- Utilizar `CSS Variables` o `refs` directos para actualizar la posición del efecto de linterna.
- Evitar re-renders de React en el movimiento del mouse para mantener 60fps constantes.

### PASO 2.2: Componentes Core del HUD
- **`hud-panel.tsx`:** Contenedores con `backdrop-blur-md` y bordes técnicos (1px, opacidad variable).
- **`scanline-overlay.tsx`:** Capa fija con grano cinematográfico y distorsión sutil CRT.

---

## 🧠 FASE 3: Estado Local y Datos (Zustand)

### PASO 3.1: Store Central
Ubicado en `src/store/use-portfolio-store.ts`:
- **Boot Sequence:** Manejo del estado de carga inicial tipo terminal.
- **GitHub Cache:** Persistencia de repositorios para evitar límites de tasa de la API.
- **HUD Layout:** Estado de paneles activos y niveles de opacidad.

---

## ⚠️ Advertencias de Arquitectura
1. **Turbopack + Yarn PnP Conflict:** Se detectó un bloqueo crítico en el build debido a que Turbopack prohíbe el acceso a rutas externas (caché zip de PnP).
2. **Solución Implementada:** Cambio de linker a `node-modules` en `.yarnrc.yml`. Esta es la vía más limpia y estándar para mantener el rendimiento del build (< 1s) sin usar hacks de "unplugging" manual.
3. **React 19 Hydration:** Los efectos visuales basados en coordenadas o ruido procedural deben ejecutarse estrictamente `onMount` (Client Components).
4. **Rendimiento Blur:** Limitar el uso de filtros pesados en layouts móviles para no degradar la experiencia.

---
## 🔗 Referencias Relacionadas
- [[2 - Arquitectura/Stack Tecnologico|Stack Tecnológico]]
- [[1 - Proyecto/Roadmap|Hoja de Ruta General]]
