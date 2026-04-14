---
tags:
  - architecture
  - stack
status: documented
created: 2026-04-13
updated: 2026-04-13
---

# 🏗️ Stack Tecnológico

Este proyecto utiliza las versiones más recientes del ecosistema React para garantizar el mejor rendimiento y experiencia de desarrollo.

## 🚀 Núcleo

- **Next.js 16 (App Router)**: Framework principal para SSR, SSG e ISR.
- **React 19**: Aprovechando las últimas mejoras en concurrencia y hooks.
- **TypeScript 5**: Tipado estático para un código más robusto y menos errores en producción.

## 🎨 Estilos y UI

- **Tailwind CSS 4**: Motor de estilos de alto rendimiento basado en utilidades.
- **shadcn/ui**: Componentes de UI accesibles y personalizables construidos con Radix UI.
- **lucide-react**: Set de iconos ligeros y consistentes.

## 📦 Gestión de Paquetes y Herramientas

- **Yarn Berry (v4)**: Gestor de paquetes moderno y seguro.
- **Arquitectura de Dependencias (nodeLinker: node-modules)**: Configuración estratégica en `.yarnrc.yml` para garantizar la compatibilidad nativa con **Turbopack** en Next.js 16, evitando conflictos de rutas comprimidas en Windows.
- **ESLint 9**: Herramienta de análisis estático para mantener la calidad del código.
- **tw-animate-css**: Animaciones integradas para una mejor UX.

---
## 💡 Decisión Arquitectónica: Linker Físico
Se ha optado por el modo `node-modules` en lugar de PnP (Plug'n'Play) para satisfacer las restricciones de seguridad de **Turbopack** (Next.js 16), que requiere acceso físico directo a los archivos de dependencias dentro de la raíz del proyecto para su resolución de grafos de alta velocidad.

---
## 📄 Referencias
- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS 4 Blog](https://tailwindcss.com/blog)
