---
tags:
  - project
  - architecture
  - mvp
  - roadmap
status: active
created: 2026-04-13
updated: 2026-04-18
---

# 🏗️ Plan de Construcción: MVP filocode.dev (HUD Pro-Max)

Este documento detalla el levantamiento técnico y la estrategia de implementación para el portafolio personal bajo el concepto visual de **HUD Pro-Max de Alta Fidelidad**.

## 📊 Estado Actual
- **Core:** Next.js 16.1.6 + React 19.2.3 (App Router).
- **Estilos:** Tailwind CSS 4.0.0 (Motor `@import`).
- **UI:** Composición de Ventanas Flotantes (v28).
- **Dependencias:** `zustand`, `framer-motion` (Casting absoluto implementado).
- **Atmósfera:** Winter Blade Runner (Sol Dorado + Snowfall Dinámica).

---

## 🚀 FASE 1: Setup Atmosférico (Ambiente Técnico) [COMPLETA]

### TAREA 1.1: Instalación de Dependencias [x]
Ejecutar la instalación de las librerías críticas para habilitar animaciones técnicas y estado global.

### TAREA 1.2: Inyección de ADN Visual (Tailwind v4) [x]
Modificar `src/app/globals.css` aplicando el nuevo motor de Tailwind.

### TAREA 1.3: Layout y Modo Oscuro Forzado [x]
Establecer la base del HUD con fondo negro absoluto y viñetas técnicas.

---

## 🏗️ FASE 2: Arquitectura HUD de Alta Fidelidad [COMPLETA]

### PASO 2.1: Composición de Ventanas Flotantes [x]
Refactor masivo del layout para usar un sistema de ventanas modulares:
- **Left**: Statement de Arquitectura y Desarrollo.
- **Right**: Widgets de Identidad (Avatar), Code Strata y Skill Tree.
- **Botones**: Gradiente Gold Brillante con animación de reflejo metálico.

### PASO 2.2: Motor Atmosférico Avanzado [x]
Implementación de capas lumínicas en el layout raíz:
- **Sol Dorado**: Light source central con bloom masivo.
- **Snowfall**: 140 partículas con glow perimetral y movimiento errático.
- **Glassmorphism v2**: Componente `HudPanel` con `backdrop-blur-3xl` y reflejos en bordes.

---

## 🧠 FASE 3: Estado Local y Datos (Zustand) [EN PROGRESO]

### PASO 3.1: Store Central
Ubicado en `src/store/use-portfolio-store.ts`.

### PASO 3.2: Integración de GitHub Arsenal [x]
Sincronización dinámica de 32 nodos de repositorios con filtrado HUD funcional.

---

## ⚠️ Advertencias de Arquitectura
1. **Static Assets Pages**: Es imperativo usar **Static Imports** para imágenes para que Next.js resuelva el `basePath` en GitHub Pages automáticamente.
2. **Motion IntrinsicAttributes**: Usar siempre el patrón de **Casting Absoluto** (`motion.div as any`) para evitar silencios administrativos del linter en React 19.
3. **Contrast Integrity**: El sistema debe mantener negro absoluto (#000000) y evitar contaminaciones azules para resaltar el ámbar técnico.

---
## 🔗 Referencias Relacionadas
- [[2 - Arquitectura/Stack Tecnologico|Stack Tecnológico]]
- [[1 - Proyecto/Roadmap|Hoja de Ruta General]]
