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
- **Patrón de Padding Aprobado (v28.1)**: Para evitar que el header se desplace o el contenido se sobreponga, **está prohibido** aplicar padding directamente al componente `HudPanel` vía `className`. Se debe usar siempre un `div` interno para el espaciado:
    ```tsx
    <HudPanel title="TITULO">
      <div className="p-8"> {/* El padding vive aquí */}
        {contenido}
      </div>
    </HudPanel>
    ```
- **Mandato de Integridad Vertical (v38.0)**: Para evitar el "layout jumping" en composiciones Bento de alta densidad, los paneles maestros deben implementar alturas absolutas bloqueadas (`h-[...]`) en sus contenedores de contenido principales. El contenido interno debe gestionar su flujo mediante `overflow-y-auto` y scrollbars tácticos.
- **Scrollbar Estándar "Amber-Trace" (v38.2)**: Quedan prohibidos los scrollbars nativos. Se debe usar la implementación `amber-scrollbar`:
    - Thumb: Ámbar traslúcido (`0.4`).
    - Width: `4px` estricto.
    - Behavior: Track transparente.

## 🎠 Estándar de Carousel Marquee Interactivo (v4.0)
Para garantizar una experiencia inmersiva y fluida:
1. **Dimensiones Rígidas**:
   - **Desktop**: 1100x900px (Landscape Poster).
   - **Mobile**: 85vw x 600px (Portrait).
2. **Estructura de 3 Niveles (Bloque de Texto)**:
   - **Header (180px)**: Bloqueado para títulos masivos (`6xl`), con `leading-[0.9]` para evitar cortes.
   - **Content (480px)**: Área para el acordeón táctico (`expandedId`).
   - **Footer (120px)**: Anclado para botones de gran formato.
3. **Interactividad**:
   - Soporte obligatorio de `drag="x"`.
   - Loop lineal infinito (duplicación de items).
   - Reinicio orgánico de animación mediante cálculo de velocidad constante (50px/s).
4. **Auto-Mantenimiento**: Uso de `onViewportLeave` para cerrar acordeones cuando la tarjeta sale de la visual del usuario.

## 🛡️ Estándar de Simetría de Datos (Arsenal Symmetry)
Queda prohibida la mezcla de categorías en los paneles de información:
- **ARSENAL_COMPOSITION**: Reservado exclusivamente para herramientas técnicas (Frameworks, Lenguajes, Bases de Datos).
- **DEPLOYMENT_SERVICES**: Reservado para maniobras de ingeniería y capacidades estratégicas.
- **Agency Scrubbing**: La narrativa debe ser siempre neutral y centrada en el equipo técnico, eliminando nombres de terceros.


## 🎞️ Estándar de Proyección Visual "Deep Amber Overdrive" (v38.3)
Queda prohibido el uso de imágenes crudas para assets externos. El tratamiento universal es:
1. **Filtros Base**: `grayscale sepia-[.7] contrast-125 brightness-75`.
2. **Overlay**: `bg-amber-600/50 mix-blend-multiply`.
3. **Viñeta**: `shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]` para fundir bordes.
4. **Interacción**: Escaneo lento (`y: -5%`) y escala sutil solo en hover.
5. **Mobile-First**: Inversión de orden (`order-first`) para que la imagen lidere la visualización en dispositivos pequeños.


## 📐 Distribución de la Composición
El layout se organiza en una jerarquía de importancia visual:
1. **Zona Primaria (Izquierda)**: Statement de Arquitectura y Desarrollo (Massive Typography).
2. **Zona de Identidad (Derecha Superior)**: Widget de AVATAR con ID verificado.
3. **Zona de Lógica (Derecha Media)**: Widget CODE 1 (Editor de código simulado).
4. **Zona de Telemetría (Derecha Inferior)**: GITHUB_TELEMETRY y SKILL TREE.

## 📄 Dossier Técnico (CV)
Se ha integrado un acceso directo al CV del ingeniero (`DOWNLOAD_DOSSIER [PDF]`) con un estilo de alta prioridad:
- **Visual**: Gradiente de oro puro con animación de brillo dinámico.
- **Ubicación**: Anclado en el panel **BIO_METRICS** para máxima relevancia contextual.

## 🧠 Hallazgos y Decisiones Críticas
- **Espacio Negativo**: En tipografías masivas, el margen es parte del diseño. Menos margen = menos impacto.
- **Iluminación**: Los paneles deben reaccionar a la luz del Sol Dorado del fondo; por eso se implementó el gradiente de reflejo en el borde superior.
- **Interacción**: El escalado sutil al entrar (`scale: 0.98` -> `1`) y el desplazamiento en `Y` dan la sensación de que las ventanas están "flotando" en un entorno 3D.

---
**ESTADO: DOCUMENTED // PATTERN_LOCKED**
