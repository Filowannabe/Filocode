# 🛡️ FILO PROTOCOL v2.9 — Protocolo de Autorización y Gestión Estructural

> [!CAUTION]
> ## 🚨 PRIMARY RULE: TRUNK ISOLATION MANDATE
> **EL ASISTENTE TIENE ESTRICTAMENTE PROHIBIDO REALIZAR MERGES HACIA O PUSHES DIRECTOS A LAS RAMAS TRONCO (`development`, `main`, `master`) BAJO NINGUNA CIRCUNSTANCIA.**
> 1. Cualquier instrucción de "merge" o "sincronización" se interpreta ÚNICAMENTE como traer cambios desde el tronco hacia la rama de trabajo (`git merge development` estando en `feat/*`).
> 2. La integración final al tronco se realiza EXCLUSIVAMENTE mediante Pull Request manual por el humano.
> 3. La violación de esta regla invalida la sesión actual y requiere revisión de seguridad.

**Fecha de Activación:** 15 de abril, 2026  
**Vigencia:** INDEFINIDA  
**Autor:** Senior Engineering Assistant  
**Estado:** ACTIVO Y VIGENTE  
**Actualización**: INTEGRADO: Infraestructura Yarn 4 + Turbopack + **MANDATO CONTEXT7 MCP v2.6** + **GIT FLOW v2.5** + **REGLA DE AISLAMIENTO ABSOLUTO v2.7** + **REGLA DE DEUDA CERO v2.8** + **REGLA DE LAYOUT INTEGRITY v2.9** + **REGLA DE DATA RESILIENCE v2.9** + **Simplificación de Arquitectura de Ramas v2.9** + **Version Bump 0.3.1**

---

## 📜 DECLARACIÓN DE PRINCIPIO

**A partir de este momento, está PROHIBIDO modificar cualquier contenido en GitHub o infraestructura del proyecto sin autorización explícita del usuario.**

Este protocolo se activa en todas las interacciones futuras relacionadas con gestión de backlog, infraestructura (Yarn/Tailwind/Next.js) y cualquier acción de persistencia.

---

## 🧭 COPILOTO OBLIGATORIO: CONTEXT7 MCP

**"Nadie investiga solo — La documentación es la brújula"**

**REGLA DE ORO:** El uso del MCP `context7` es **OBLIGATORIO Y ABSOLUTO** en las siguientes fases:
1. **Lectura de Documentación**: Antes de asumir cómo funciona una librería (React, Next.js, Yarn, Tailwind).
2. **Exploración**: Para buscar mejores prácticas o breaking changes de versiones (ej: salto a Tailwind v4).
3. **Debugging**: Para consultar errores conocidos del ecosistema o sintaxis de herramientas.

*Nota: Context7 no toma las decisiones finales, pero su consulta es un pre-requisito para cualquier propuesta técnica.*

---

## 🏗️ ESTÁNDARES DE INFRAESTRUCTURA (YARN 4 + TURBOPACK)

**"Velocidad sin fricción — El linker físico es la clave"**

1. **Gestor de Paquetes**: Uso **MANDATORIO** de `yarn` (Berry v4). Prohibido `npm` o `pnpm`.
2. **Compatibilidad Turbopack**: Debido a las restricciones de seguridad de Next.js 16 y Turbopack en Windows, el `nodeLinker` en `.yarnrc.yml` debe estar configurado como `node-modules`.
3. **Sincronización**: Cualquier cambio en `package.json` requiere un `yarn install` inmediato para mantener la integridad del `yarn.lock`.
4. **Tailwind v4**: Uso del plugin oficial `@tailwindcss/postcss` y configuración en `postcss.config.mjs`. El archivo `globals.css` debe liderar con `@import "tailwindcss";`.

---

## 🚨 REGLA DE DEUDA CERO Y CALIDAD ABSOLUTA (v2.8)

**"Un IDE en rojo es un trabajo sin terminar — Cero tolerancia a warnings"**

A raíz de los incidentes de la auditoría del 15 de abril de 2026, se establecen los siguientes mandatos inquebrantables:

### 1. Auditoría de Muro de Hierro (package.json)
El script de `lint` debe ser SIEMPRE una cadena que valide primero los tipos y luego el estilo, con cero tolerancia a advertencias:
`"lint": "tsc --noEmit && eslint src --max-warnings 0"`
**PROHIBIDO:** Confiar en salidas exitosas parciales si el comando no cubre todo el directorio `@src`.

### 2. Tailwind CSS 4 Estándar (Cero Arbitrariedades)
- **PROHIBIDO** el uso de corchetes `[...]` para valores arbitrarios si existe una utilidad o conversión matemática en Tailwind.
- Ejemplos de corrección obligatoria:
  - `flex-grow` ➔ `grow`
  - `max-w-[150px]` ➔ `max-w-37.5` (Regla de división por 4).
  - `bg-[length:100%_4px]` ➔ `bg-size-[100%_4px]`.
  - `text-[var(--color-primary)]` o `border-(--color-primary)/50` ➔ `text-primary` y `border-primary/50` (Aprovechar shorthands del theme v4).

### 3. React 19 + Framer Motion 12 (Tipado Ciego)
Para evitar el error `IntrinsicAttributes` donde TS desconoce las props de animación (`animate`, `layout`, `whileHover`), se **DEBE** usar el patrón de **Casting Absoluto de Componente** en la cabecera del archivo:
```typescript
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;
```
**DESCUBRIMIENTO CRÍTICO (15/04/2026):** El uso de `motion.div` directamente puede causar un "punto ciego" en el linter donde errores de estructura JSX (etiquetas mal cerradas) pasan desapercibidos si la librería externa no está perfectamente tipada para React 19. Al declarar `MotionDiv` como una constante local casteada, **se fuerza al compilador de TS a re-validar la consistencia de las etiquetas de apertura y cierre**, eliminando falsos positivos de "Clean Lint".

### 4. Integridad Estructural (No Mutilar)
**PROHIBIDO:** Mover lógica de producción a archivos de tests o romper el árbol de importaciones durante "limpiezas". Cada archivo debe ser comprobado tras un refactor.
**REGLA DE ESTABILIDAD TURBO:** En entornos Windows con Next.js 16 (Turbo), si un paquete de `node_modules` (ej: `tw-animate-css`) causa un pánico de compilación al ser importado en CSS, se debe copiar el archivo a `src/styles/` y cargarlo localmente para garantizar la resolución física de la ruta.

---

## 🛡️ SEGURIDAD DE PROCESOS (ASISTENTE INTEGRITY)

**"No dispares a tu propio equipo — El asistente es sagrado"**

1. **Gestión de Puertos**: Al liberar el puerto 3000 o limpiar procesos de Node, el asistente tiene **PROHIBIDO** usar comandos de "matanza masiva" (`taskkill /F /IM node.exe`).
2. **Método Quirúrgico**: Se debe identificar el PID específico que ocupa el puerto (`Get-NetTCPConnection`) y detener **únicamente** ese proceso para no matar el proceso del propio Gemini.
3. **Resiliencia**: Si el comando de matanza falla, el asistente debe informar al usuario en lugar de intentar acciones de fuerza bruta que comprometan la sesión.

---

## 🛡️ REGLA DE LAYOUT INTEGRITY (v2.9)

**"Queda estrictamente prohibido el uso de absolute para iconos dentro de contenedores de texto dinámico"**

### Problema Detectado
El uso de `position: absolute` para dropdowns de sugerencias dentro de inputs flexibles causa superposiciones y desfases en layouts responsivos, especialmente con `AnimatePresence` lazy de Framer Motion.

### Solución Obligatoria
**SE DEBE USAR FLEXBOX FÍSICO** para todos los contenedores de inputs HUD:
- Los inputs deben tener `width: 100%` o `flex: 1`
- Los dropdowns deben ser hijos directos del contenedor flex (no posicionados absolutamente)
- Las animaciones deben ocurrir dentro del flujo natural del DOM

### Ejemplo Incorrecto (PROHIBIDO):
```tsx
<div className="relative">
  <input className="w-full" />
  <AnimatePresence>
    <Dropdown className="absolute inset-0" /> {/* ❌ PROHIBIDO */}
  </AnimatePresence>
</div>
```

### Ejemplo Correcto (REQUERIDO):
```tsx
<div className="flex items-center gap-2">
  <input className="flex-1" />
  <AnimatePresence>
    <Dropdown /> {/* ✅ CORRECTO: dentro del flujo flex */}
  </AnimatePresence>
</div>
```

---

## 🛡️ REGLA DE DATA RESILIENCE (v2.9)

**"La capa de datos debe prever la ausencia de metadatos externos mediante inyección local"**

### Problema Detectado (Miopía de Datos)
Los tests pasan con datos perfectos (topics enriquecidos localmente) pero fallan en producción cuando la API de GitHub no devuelve todos los metadatos (ej: topics vacíos, campos null).

### Solución Obligatoria
**LA CAPA DE DATOS DEBE INJETAR VALORES POR DEFECTO**:
- Si GitHub API devuelve topics vacíos → inyectar topics heredados del repositorio
- Si un campo es null → usar fallbacks locales (ej: language, description)
- Los tests deben usar datos REALISTAS (no perfectos):
  ```typescript
  // ❌ DATOS PERFECTOS (fallan en producción)
  const testData = { topics: ['react', 'node'] }
  
  // ✅ DATOS RESILIENTES (sobreviven a la realidad)
  const testData = { 
    topics: [], 
    language: 'TypeScript',
    description: 'A sample repository'
  }
  ```

### Patrón Implementado
**Enriquecimiento Local**:
1. Intentar obtener datos de API externa
2. Si falla o está vacío → inyectar desde datos locales
3. Validar que el resultado final tenga mínimos requeridos

---

## 🔄 FLUJO DE TRABAJO OBLIGATORIO

### 1. MODO ANÁLISIS (Siempre activo por defecto)

**Permisos:**
- ✅ Leer issues con `gh issue view`, `gh issue list`, etc.
- ✅ Escribir archivos locales ÚNICAMENTE en `Documentation/` o `proposals/`
- ✅ Investigar, analizar, documentar
- ✅ Proponer planes de acción
- ✅ Preguntar y buscar clarificación

**Prohibido:**
- ❌ Ejecutar `gh issue edit`, `gh issue create`, `gh label create`, etc.
- ❌ Modificar cualquier contenido en GitHub
- ❌ Crear commits, PRs, o cualquier acción de persistencia remota

**Al finalizar un análisis:**
- Presentar un resumen en el chat
- Indicar la ruta del archivo generado
- Solicitar autorización explícita para continuar

---

### 2. MODO APROBACIÓN (Solo bajo palabra clave)

**Condición ÚNICA para activar:**
> El usuario debe escribir exactamente: `APROBADO: <instrucción específica>`

**Sin la palabra clave `APROBADO`:**
- ❌ CUALQUIER intento de modificar GitHub será considerado un **ERROR GRAVE**
- ❌ El asistente no ejecutará comandos de modificación

---

## 📋 REGLAS DE COMPORTAMIENTO Y ARQUITECTURA

### 🚨 REGLA 1: ANTI-BIG BANG (Paso a Paso)
**"Planificar antes de disparar"**

Antes de generar código o ejecutar cambios masivos en el repositorio, el asistente DEBE proponer la creación de un **Meta-Issue de Gestión**. Este ticket agrupará el plan de acción. No se tocará el código hasta que el Meta-Issue esté creado y movido a "In Progress".

### 🚨 REGLA 2: VERIFICACIÓN DE CONEXIÓN (El candado del 404)
**"Validar antes de crear"**

Antes de proponer comandos de creación masiva (Labels, Issues, Projects), el asistente DEBE ejecutar `gh repo view` para confirmar que el repositorio remoto está correctamente enlazado y accesible.

### 🚨 REGLA 3: EXISTENCIA DE DIRECTORIOS
**"Verificar antes de escribir"**

El asistente debe verificar que el directorio existe (`ls -la`) antes de intentar crear archivos, sin inventar nuevas rutas raíz no autorizadas.

---

## 📦 ESTRATEGIA DE BRANCHING Y FLUJO DE GIT (v2.5)

**ESTRUCTURA DE TRONCOS (MASTER MAIN)**:
```
master (main) ← development ← staging
```
> **NOTA**: El branch `production` ha sido **eliminado** como redundante (apuntaba a la misma producción que `master`).

**NOMENCLATURA DE TRABAJO (Conventional Commits)**:
```bash
feat/ID--desc           # Nueva funcionalidad (ej: feat/1--fetch-masivo)
fix/ID--desc            # Corrección de bugs
docs/ID--desc           # Documentación
ref/ID--desc            # Refactorización
```

**REGLAS DE PROHIBICIÓN (PROTECTION RULES)**:

| Ramas | Pull Request | Status Checks | Force Push | Code Review |
|-------|--------------|---------------|------------|-------------|
| **development** | ✅ Obligatorio | ✅ Requerido | ❌ Bloqueado | ✅ Mínimo 1 approval |
| **staging** | ✅ Obligatorio | ✅ Requerido | ❌ Bloqueado | ✅ Mínimo 2 approvals |

**FLUJO DE MERGE OBLIGATORIO**:
1. **Trabajo**: Crear rama desde `development`
2. **PR a development**: Merge tras revisión y checks
3. **PR a staging**: Desde development tras QA
4. **Deployment**: `master` se actualiza automáticamente desde `staging`

---

## 🚨 REGLA DE DESARROLLO TDD (v2.5)

**"Test First — Código sin pruebas es código sin propósito"**

1. **Escribe un test FALLIDO** (Red)
2. **Escribe el código MÍNIMO** (Green)
3. **Refactoriza con confianza** (Refactor)

---

## 🔄 POLÍTICA DE COMMITS (v1.0)

1. **Verificar estado**: `git status`
2. **Agregar cambios**: `git add <archivos>`
3. **Usuario autoriza**: `APROBADO: genera commit con mensaje "..."`
4. **Ejecutar commit**: `git commit -m "..."`

---

## 📦 POLÍTICA DE VERSIONING SEMÁNTICO

**Regla de ORO**: El version bump debe reflejar el tipo de cambio implementado.

| Tipo de Cambio | Version Bump | Ejemplo |
|----------------|--------------|---------|
| **Nueva funcionalidad MAJOR** (Issue #3 completo) | `0.2.0` → `0.3.0` | Feature principal, API breaking |
| **Nueva funcionalidad MINOR** | `0.3.0` → `0.3.1` | Feature incremental, API compatible |
| **Bug fix** | `0.3.1` → `0.3.2` | Corrección, API compatible |
| **Hotfix** | `0.3.2` → `0.3.2.1` | Corrección crítica |

**Documentación**:
- Version bump debe incluirse en `package.json`
- Update debe documentarse en `Documentation/07-reports/`
- PR description debe mencionar el version bump

**Comando Manual**:
```bash
# El usuario debe actualizar manualmente
git add package.json
git commit -m "chore: version bump 0.3.0 (Issue #3 completado)"
```

**Nota**: El asistente NO debe modificar version bump automáticamente. Es responsabilidad del humano validar el tipo de cambio y aplicar el bump correcto.

---

## 🚫 REGLA DE ACCIONES MANUALES EN GITHUB

**CRÍTICO:** Las siguientes acciones se realizan **MANUALMENTE** por el usuario.

| Acción | Herramienta / Comando Manual |
|--------|-------------------|
| **Creación de Labels** | `gh label create "Nombre" --color "HEX"` |
| **Cambio de estado** | ⚠️ **WEB UI EXCLUSIVO** |
| **Custom Fields** | ⚠️ **WEB UI EXCLUSIVO** |

---

## 📊 REGLA DE ESTIMACIONES (FILO PROTOCOL v2.0)

**CRÍTICO:** Las estimaciones de tiempo se gestionan MANUALMENTE y NO se incluyen en las descripciones de los issues.

---

## ⏱️ TIME TRACKING — ÚNICA FUENTE DE VERDAD

**REGLA DE ORO**: Solo `Documentation/01-backlog/FILO_PROTOCOL.md` es fuente de verdad para time tracking.

### Estándares de Estimación (v2.3)

| Tipo de tarea | Alcance | Tiempo real | Estimación base | KPI |
|--------------|---------|-------------|-----------------|-----|
| **GESTIÓN** | Metadata (issues, labels, comments) | 1-2 min | 2-5 min | Eficiencia de comunicación |
| **IMPLEMENTACIÓN** | Código en `src/` | 60-120 min | 90-180 min | Velocidad de desarrollo |
| **PROPUESTA** | Documentación local | 5-10 min | 10-15 min | Calidad de documentación |

---

### 📋 Registro de Tareas

#### 14 de abril de 2026
- **Tarea**: Issue #10 — GESTIÓN: Plan de Expansión Técnica. **Scope**: GESTIÓN. **Duración**: 4 min.
- **Tarea**: Issue #1 — GESTIÓN: Editar Issue en GitHub. **Scope**: GESTIÓN. **Duración**: 1 min.
- **Tarea**: Issue #1 — IMPLEMENTACIÓN: Refactor estructura de tests. **Scope**: IMPLEMENTACIÓN. **Duración**: 5 min.
- **Tarea**: Issue #1 — IMPLEMENTACIÓN: Backend Fetch API (ciclo TDD). **Scope**: IMPLEMENTACIÓN. **Duración**: 6 min.
- **Tarea**: Issue #2, #3, #4, #5 — GESTIÓN: Actualización de metadata. **Duración**: 1 min c/u.
- **Tarea**: Issue #6 — UI: Barra de Filtros HUD. **Scope**: GESTIÓN. **Duración**: 1 min.

#### 15 de abril de 2026
- **Tarea**: Issue #1 — IMPLEMENTACIÓN: UI Galería, Skeletons y Paginación Brutalista. **Scope**: IMPLEMENTACIÓN. **Duración**: 45 min.
- **Tarea**: Resolución de Conflictos y Consolidación v2.7. **Scope**: GESTIÓN. **Duración**: 15 min. **Notas**: Fallo de integridad resuelto mediante restauración de development y blindaje de protocolo.
- **Tarea**: Auditoría Integral y Deuda Cero (Issue #2). **Scope**: GESTIÓN/IMPLEMENTACIÓN. **Duración**: 60 min. **Notas**: Corrección crítica de desastres del agente anterior. Implementación de *Casting Absoluto* para Framer Motion + React 19, purga de Tailwind arbitrario, limpieza de código muerto, restauración de utilidades mutiladas y blindaje de lint (`tsc && eslint`).

#### 16 de abril de 2026
- **Tarea**: Issue #2 — IMPLEMENTACIÓN: Suite de tests regresión. **Scope**: IMPLEMENTACIÓN. **Duración**: 90 min. **Notas**: 8 tests passing, API obsoleta corregida (activeTopic → activeTopics).
- **Tarea**: Persistencia en Memoria (Engram). **Scope**: GESTIÓN. **Duración**: 2 min.

---

## 🛠️ MEJORAS PRÁCTICAS DE OBSIDIAN CLI

**COMANDO CORRECTO**: `obsidian <command>`

1. **Deadends**: `obsidian deadends --folder Documentation/`
2. **Unresolved**: `obsidian unresolved --folder Documentation/ --format json`
3. **Orphans**: `obsidian orphans --folder Documentation/`

---

## ✅ CONFIRMACIÓN DE ENTENDIMIENTO

El asistente confirma el cumplimiento absoluto de la **PRIMARY RULE** y el protocolo v2.8.
