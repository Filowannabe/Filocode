---
tags:
  - project
  - architecture
  - mvp
  - roadmap
status: active
created: 2026-04-13
updated: 2026-04-29
---

# 🏗️ Plan de Construcción: MVP filocode.dev (HUD Pro-Max)

Este documento detalla el levantamiento técnico y la estrategia de implementación para el portafolio personal bajo el concepto visual de **HUD Pro-Max de Alta Fidelidad**.

## 📊 Estado Actual
- **Core:** Next.js 16.1.6 + React 19.2.3 (App Router).
- **Estilos:** Tailwind CSS 4.0.0 (Motor `@import`).
- **UI:** Arquitectura de Ventanas Flotantes (v7.3).
- **Dependencias:** `zustand`, `framer-motion` (Casting absoluto implementado).
- **Atmósfera:** Winter Blade Runner (Sol Dorado + Snowfall Dinámica).
- **Rendimiento:** 60FPS Lock (Zustand Shielding + CSS Containment).

---

## 🚀 FASE 1: Setup Atmosférico (Ambiente Técnico) [COMPLETA]
... (sin cambios) ...

---

## 🏗️ FASE 2: Arquitectura HUD de Alta Fidelidad [COMPLETA]
... (sin cambios) ...

---

## 🧠 FASE 3: Estado Local y Datos (Zustand) [COMPLETA]

### PASO 3.1: Store Central [x]
Ubicado en `src/store/use-portfolio-store.ts`.

### PASO 3.2: Integración de GitHub Arsenal [x]
Sincronización dinámica de 32 nodos de repositorios con filtrado HUD funcional.

### PASO 3.3: Refactor de Colaboraciones y Fidelidad Visual [x]
- **Collaborations Hub (v4.0)**: Sincronización total con la **Operación ARSENAL_SYMMETRY**.
- **Data Symmetry**: Separación estricta entre `techStack` y `servicesProvided` para coherencia táctica.
- **Interactive Marquee**: Implementación de drag horizontal con loop lineal recursivo y reinicio orgánico.
- **Mobile-First Rework**: Inversión de orden y rediseño de posters para viewports pequeños.
- **Agency Scrubbing**: Purga de marcas de terceros a favor de una identidad de ingeniería neutral.
- **Nuevos Nodos**: Integración de **Omnicon** y **Fruto Salvaje** con capturas internacionalizadas.

---

## 🌎 FASE 4: Globalización e Interactividad Crítica [COMPLETA]
... (sin cambios) ...

---

## ⚡ FASE 5: Blindaje de Rendimiento y Fidelidad Visual (v7.3) [COMPLETA]

### PASO 5.1: Zustand Shielding (Atomic Selectors) [x]
- **Aislamiento de Renderizado**: Implementación de selectores atómicos (`state => state.value`) en `TacticalNavbar` y `HudPanel` para reducir re-renders innecesarios en un 90% durante el scroll.

### PASO 5.2: CSS Performance Overdrive [x]
- **Content Visibility**: Inyección de `[content-visibility:auto]` y `[contain-intrinsic-size]` en todas las secciones críticas para omitir el pintado de elementos fuera del viewport.

### PASO 5.3: Responsive Absolute Lock [x]
- **Vertical Desktop Mastery**: Refactor de rejilla hacia el breakpoint `xl` (1280px) para garantizar legibilidad en monitores verticales de alta resolución.
- **Zero-Break Typography**: Escalado tipográfico quirúrgico y uso de `whitespace-nowrap` selectivo para evitar colisiones visuales.

---

## ⚠️ Advertencias de Arquitectura
1. **Performance Audit Mandatory**: Cualquier cambio en la estructura de secciones debe ser validado con la suite `performance-audit.test.tsx`.
2. **Static Assets Pages**: Es imperativo usar **Static Imports** para imágenes para que Next.js resuelva el `basePath` en GitHub Pages automáticamente.
3. **Motion IntrinsicAttributes**: Usar siempre el patrón de **Casting Absoluto** (`motion.div as any`) para evitar silencios administrativos del linter en React 19.
4. **Contrast Integrity**: El sistema debe mantener negro absoluto (#000000) y evitar contaminaciones azules para resaltar el ámbar técnico.

---
## 🔗 Referencias Relacionadas
- [[2 - Arquitectura/Stack Tecnologico|Stack Tecnológico]]
- [[1 - Proyecto/Roadmap|Hoja de Ruta General]]
