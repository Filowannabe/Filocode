# 🪟 Arquitectura de Ventanas Flotantes HUD (v28)

**Fecha**: 18 de abril, 2026
**Estatus**: ESTÁNDAR VISUAL CONSOLIDADO

## 🎯 Concepto: Minimalismo Táctico
Inspirado en la fluidez de las ventanas de macOS, pero despojado de elementos decorativos no esenciales (controles de cierre/maximización) para priorizar una estética de estación de trabajo técnica y militar.

## 🏗️ Estructura del Layout (The Grid)
Se utiliza un contenedor maestro con espaciado expansivo para evitar solapamientos tipográficos:
- **Container**: `max-w-[1800px]`
- **Padding**: `px-6 md:px-16` (Garantiza que la "A" de ARQUITECTURA respire libremente).
- **Gap**: `lg:gap-24` entre el statement principal y el stack de widgets.

## 🪟 Anatomía del `HudPanel` (Floating Window)
Cada panel es una pieza independiente de ingeniería visual:
- **Header**: Franja superior de `white/[0.03]` con título en `font-mono text-[9px]`. No se permiten círculos de colores (red/yellow/green) para mantener la seriedad del sistema.
- **Cuerpo**: Fondo en `rgba(5,5,5,0.45)` con un `backdrop-blur-3xl`.
- **Bordes**: Sistema multi-capa:
    - Borde superior: Reflejo ámbar dinámico (`group-hover:opacity-100`).
    - Bordes laterales/inferiores: `white/10` bajando a `white/5`.
- **Efectos**: Sombra profunda `rgba(0,0,0,0.8)` y scanlines sutiles al 5% de opacidad.

## 📐 Distribución de la Composición
El layout se organiza en una jerarquía de importancia visual:
1. **Zona Primaria (Izquierda)**: Statement de Arquitectura y Desarrollo (Massive Typography).
2. **Zona de Identidad (Derecha Superior)**: Widget de AVATAR con ID verificado.
3. **Zona de Lógica (Derecha Media)**: Widget CODE 1 (Editor de código simulado).
4. **Zona de Telemetría (Derecha Inferior)**: GITHUB_TELEMETRY y SKILL TREE.

## 🧠 Hallazgos y Decisiones Críticas
- **Espacio Negativo**: En tipografías masivas, el margen es parte del diseño. Menos margen = menos impacto.
- **Iluminación**: Los paneles deben reaccionar a la luz del Sol Dorado del fondo; por eso se implementó el gradiente de reflejo en el borde superior.
- **Interacción**: El escalado sutil al entrar (`scale: 0.98` -> `1`) y el desplazamiento en `Y` dan la sensación de que las ventanas están "flotando" en un entorno 3D.

---
**ESTADO: DOCUMENTED // PATTERN_LOCKED**
