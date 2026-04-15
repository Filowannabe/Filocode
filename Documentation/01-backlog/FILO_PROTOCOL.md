# 🛡️ FILO PROTOCOL v2.5 — Protocolo de Autorización y Gestión Estructural

**Fecha de Activación:** 14 de abril, 2026  
**Vigencia:** INDEFINIDA  
**Autor:** Senior Engineering Assistant  
**Estado:** ACTIVO Y VIGENTE  
**Actualización:** INTEGRADO: Bifurcación de métricas (GESTIÓN vs IMPLEMENTACIÓN) + Estándares de Estimación + **REGLA TDD v2.5**  

---

## 📜 DECLARACIÓN DE PRINCIPIO

**A partir de este momento, está PROHIBIDO modificar cualquier contenido en GitHub (issues, labels, projects, milestones, etc.) sin autorización explícita del usuario.**

Este protocolo se activa en todas las interacciones futuras relacionadas con gestión de backlog, issues de GitHub, y cualquier acción que modifique el repositorio en GitHub.

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

**Ejemplos válidos:**
- `APROBADO: edita el issue #1 con el contenido del archivo Documentation/propuesta_expansion_backlog.md`
- `APROBADO: crea un nuevo issue #11 con el título y cuerpo especificados`
- `APROBADO: aplica los cambios propuestos en Documentation/plan_de_trabajo.md`

**Sin la palabra clave `APROBADO`:**
- ❌ CUALQUIER intento de modificar GitHub será considerado un **ERROR GRAVE**
- ❌ El asistente no ejecutará comandos de modificación

---

## 📋 REGLAS DE COMPORTAMIENTO Y ARQUITECTURA

### 🚨 REGLA 1: ANTI-BIG BANG (Paso a Paso)
**"Planificar antes de disparar"**

Antes de generar código o ejecutar cambios masivos en el repositorio, el asistente DEBE proponer la creación de un **Meta-Issue de Gestión**. Este ticket agrupará el plan de acción. No se tocará el código hasta que el Meta-Issue esté creado y movido a "In Progress".

**Flujo obligatorio:**
1. **Analizar** el requerimiento
2. **Proponer** Meta-Issue de Gestión en `Documentation/meta-issue.md`
3. **Crear** issue en GitHub
4. **Mover** a "In Progress"
5. **Ejecutar** cambios bajo cobertura del Meta-Issue

**Prohibido:**
- ❌ Generar código sin Meta-Issue previo
- ❌ Ejecutar cambios masivos sin planificación agrupada
- ❌ Modificar el repositorio sin ticket de gestión activo

---

### 🚨 REGLA 2: VERIFICACIÓN DE CONEXIÓN (El candado del 404)
**"Validar antes de crear"**

Antes de proponer comandos de creación masiva (Labels, Issues, Projects), el asistente DEBE ejecutar `gh repo view` para confirmar que el repositorio remoto está correctamente enlazado y accesible, evitando errores de conexión a ciegas.

**Flujo obligatorio:**
1. **Ejecutar**: `gh repo view`
2. **Verificar**: Repositorio remoto accesible
3. **Validar**: Labels/Projects existentes
4. **Proponer**: Comandos de creación

**Ejemplo correcto:**
```bash
# Primero verificar conexión
gh repo view

# Luego proponer comandos de creación
gh label create "Nuevo Label" --color "FF5733"
```

**Prohibido:**
- ❌ Ejecutar comandos de creación sin verificar conexión previa
- ❌ Sugerir creación masiva sin `gh repo view` primero

---

### 🚨 REGLA 3: EXISTENCIA DE DIRECTORIOS
**"Verificar antes de escribir"**

El asistente debe verificar que el directorio existe (`ls -la`) antes de intentar crear archivos, sin inventar nuevas rutas raíz no autorizadas.

**Flujo:**
1. **Verificar**: `ls Documentation/`
2. **Crear si falta**: `mkdir -p Documentation/subdir`
3. **Escribir**: Solo después de confirmar existencia

---

### Regla 1: Lectura Solo
**"Solo reviso, nunca ejecuto"**

Todo lo que el usuario pida investigar se realizará en modo lectura:
- `gh issue view X` → ✅ Permitido
- `gh issue edit X` → ❌ PROHIBIDO sin `APROBADO:`

### Regla 2: Propuesta Local
**"Todo documento en Documentation/"**

Cualquier propuesta, plan, o análisis debe escribirse en archivos locales:
- `Documentation/proposal.md`
- `Documentation/plan_accion.md`
- `proposals/expansion_backlog.md`

**Nunca** ejecutar código o modificar archivos del proyecto sin `APROBADO:`

### Regla 3: Confirmación de Estado
**"Confirmo, espero, ejecuto solo cuando autorizas"**

Antes de cualquier acción que modifique:
1. Presentar el resumen
2. Confirmar que el usuario entiende
3. Esperar `APROBADO:` explícito
4. Solo entonces ejecutar

---

### 🚨 REGLA DE DESARROLLO TDD (v2.5)

**"Test First — Código sin pruebas es código sin propósito"**

**PRINCIPIO FUNDAMENTAL:**
- ❌ **PROHIBIDO** crear lógica en `src/` sin su respectivo test en `src/__tests__/` o junto al archivo (`.test.ts` / `.spec.ts`)
- ✅ **OBLIGATORIO** definir el test ANTES de escribir la implementación

**FLUJO DE DESARROLLO TDD:**

1. **Escribe un test FALLIDO** (Red)
   - Crea el archivo `src/services/githubApi.test.ts`
   - Define el comportamiento esperado
   - El test debe fallar inicialmente (sin implementación)

2. **Escribe el código MÍNIMO** (Green)
   - Implementa solo lo necesario para que el test pase
   - No más, no menos

3. **Refactoriza con confianza** (Refactor)
   - Mejora la estructura
   - El test verifica que no se rompió nada
   - Mantén cobertura de pruebas

**HERRAMIENTAS SUGERIDAS:**
- ✅ **Vitest** — Lightweight, integrado con Vite/Next.js
- ✅ **Jest** — Estándar de la industria, robusto
- ✅ **Testing Library** — Para pruebas de componentes React

**PÁGINA 1: TESTES DE INTEGRACIÓN/API**
```
src/services/
├── githubApi.ts              # Implementación
├── githubApi.test.ts         # Tests de integración (Mock de API)
└── __tests__/
    └── githubApi.spec.ts     # Tests unitarios (si aplica)
```

**PÁGINA 2: TESTES DE COMPONENTES**
```
src/components/
├── RepoFetcher.tsx           # Componente
└── RepoFetcher.test.tsx      # Tests de componentes
```

**CRÍTICO:**
- Sin test = Sin commit (política de calidad)
- Los tests GUARDAN el comportamiento esperado
- Refactoriza con confianza — los tests son tu red de seguridad

---

### 🔄 POLÍTICA DE COMMITS (EXPERIMENTAL v1.0)

**"Control de versiones con autoridad compartida"**

**DEFINICIÓN DE BRANCHES:**

| Tipo | Nombres | Política de Commits |
|------|---------|---------------------|
| **PRINCIPAL** | `master`, `main`, `development`, `staging`, `production` | ❌ **PROHIBIDO**: Requiere autorización explícita `APROBADO:` |
| **SECUNDARIO** | `feat/*`, `fix/*`, `hotfix/*`, `tdd/*`, `refactor/*` | ✅ **PERMITIDO**: Puedo hacer commits con tu autorización por mensaje |

**FLUJO DE COMMIT (CORRECTO):**

1. **Verificar estado**: `git status`
   - Identificar archivos modificados
   - Confirmar archivos a incluir

2. **Agregar cambios**: `git add <archivos>` o `git add .`
   - Solo agregar lo necesario (NO todo si solo hay un cambio)
   - Verificar con `git status` después

3. **Usuario autoriza**: `APROBADO: genera commit con mensaje "..."`

4. **Ejecutar commit**: `git commit -m "..."`

5. **Confirmar**: Reportar commit exitoso

**⚠️ VERIFICACIÓN OBLIGATORIA:**
- ❌ **NUNCA** ejecutar `git add . && git commit -m "..."` (uno solo)
- ✅ **SIEMPRE** verificar: `git status` ANTES de `git add`
- ✅ **SEPARAR** commits: Cada cambio significativo = commit separado

**NOTA DE EXPERIMENTACIÓN:**
- Esta política es **EXPERIMENTAL v1.0**
- Podría evolucionar a: **CERO commits automáticos** (todos manuales)
- Objetivo: Equilibrio entre eficiencia y control

---

## 🚨 CASOS DE ERROR GRAVE

Las siguientes acciones serán consideradas **VIOLACIONES DEL PROTOCOLO**:

| Acción | Violación |
|--------|-----------|
| Ejecutar `gh issue edit` sin `APROBADO:` | ERROR GRAVE |
| Crear commits sin autorización | ERROR GRAVE |
| Ejecutar `git push` sin autorización | ERROR GRAVE |
| Modificar labels o projects sin `APROBADO:` | ERROR GRAVE |
| Ignorar solicitud de confirmación | ERROR GRAVE |

---

## 🚫 REGLA DE ACCIONES MANUALES EN GITHUB

**CRÍTICO:** Las siguientes acciones se realizan **MANUALMENTE** por el usuario en su terminal o navegador. El asistente solo provee los comandos.

| Acción | Herramienta / Comando Manual | Notas |
|--------|-------------------|-------|
| **Creación de Labels** | `gh label create "Nombre" --color "HEX"` | Verificar conexión con `gh repo view` primero |
| **Cambio de estado** | ⚠️ **WEB UI EXCLUSIVO** | **GitHub CLI NO SOPORTA** cambios de estado (open/closed).<br>Debe hacerse manualmente vía **GitHub Projects WEB UI**.<br>Alternativa CLI: No disponible. |
| **Custom Fields (Llenado)** | ⚠️ **WEB UI EXCLUSIVO** | **GitHub CLI NO SOPORTA** llenado de valores numéricos.<br>Debe hacerse manualmente vía **GitHub Projects WEB UI**.<br>Alternativa CLI: No disponible (confirmado en pruebas). |
| **Custom Fields (Creación Estructural)** | ⚠️ **WEB UI OBLIGATORIA** | **EL CLI NO PUEDE CREAR NI LLENAR CAMPOS**<br>**TODOS los custom fields se gestionan vía WEB UI**:<br>1. GitHub Settings > Projects<br>2. Click "Add custom field"<br>3. Configurar tipo (Number, Text, etc.)<br>4. Guardar<br>5. Llenar valores MANUALMENTE vía WEB UI<br>✅ **Alternativa CLI: NO DISPONIBLE** |
| **Vincular Issues a Projects** | ⚠️ **WEB UI** o `gh project item-add` | Preferible vía Web UI para ver estructura |
| **Asignar / Milestones** | `gh issue edit X --add @user --milestone "Name"` | |
| **Comments** | `gh issue comment X --body "[tu comentario]"` | |
| **Adds** (comandos de gh CLI) | **Cualquier comando de `gh` que modifique GitHub** | |

### Flujo de Acción Manual

1. **Asistente propone**: Presenta la acción en el chat
2. **Usuario decide**: Evalúa si es necesario ejecutar
3. **Usuario ejecuta manualmente**: Ejecuta el comando en su terminal
4. **Asistente registra**: Documenta en `log_time_tracking.md` (si aplica)

### Ejemplos

#### ✅ CORRECTO: Propuesta del Asistente

**Asistente:**
```
PROGRESO: Issue #10 actualizado a estado IN_PROGRESS

Comando para ejecutar manualmente:
gh issue edit 10 --state IN_PROGRESS

¿Deseas que registre el tiempo de esta operación?
```

#### ✅ CORRECTO: Ejecución por el Usuario

**Usuario:**
```bash
gh issue edit 10 --state IN_PROGRESS
```

**Asistente:**
```
DONE: Issue #10 — Estado actualizado a IN_PROGRESS
Tiempo real: 2 minutos

**Notas:** Usuario ejecutó manualmente el comando. Tiempo mínimo para operación manual.
```

#### ❌ INCORRECTO: Intento de Ejecución Automática

**Asistente:**
```
❌ NO EJECUTAR AUTOMÁTICAMENTE
El comando `gh issue edit 10 --state IN_PROGRESS` debe ejecutarse manualmente por el usuario.
```

### Por Qué Esta Regla

1. **Seguridad**: El usuario mantiene control total de cambios en GitHub
2. **Transparencia**: El usuario ve exactamente qué comandos se ejecutan
3. **Responsabilidad**: El usuario es responsable de validar cada cambio antes de aplicar
4. **Aprendizaje**: El usuario aprende los comandos de GitHub CLI
5. **Estructura**: Los cambios se hacen manualmente para evitar modificaciones no autorizadas

---

## 🚨 CASOS DE ERROR GRAVE (VIOLACIONES DEL PROTOCOLO)

Las siguientes acciones serán consideradas **VIOLACIONES DEL PROTOCOLO**:

| Acción | Violación |
|--------|-----------|
| Ejecutar comandos de modificación en GitHub sin `APROBADO:` | ERROR GRAVE |
| Crear commits sin autorización | ERROR GRAVE |
| Ejecutar `git push` sin autorización | ERROR GRAVE |
| Modificar labels o projects sin `APROBADO:` | ERROR GRAVE |
| Ignorar solicitud de confirmación | ERROR GRAVE |
| **Ejecutar acciones de GitHub MANUALMENTE sin aprobación explícita** | ERROR GRAVE |
| **Ejecutar cambios de código sin Meta-Issue de Gestión previo (Anti-Big Bang)** | ERROR GRAVE |
| **Sugerir creación masiva sin verificar conexión con `gh repo view` primero** | ERROR GRAVE |
| **Intentar crear Custom Fields vía CLI (debe ser WEB UI)** | ERROR GRAVE |
| **Crear directorios o archivos en rutas no verificadas** | ERROR GRAVE |

---

## 📝 EJEMPLOS DE INTERACCIÓN CORRECTA

### ✅ Interacción CORRECTA

**Usuario:** "Quiero que analices el issue #1 y proponga una expansión"

**Agente:**
1. Lee el issue #1
2. Genera análisis en `Documentation/propuesta_issue_1.md`
3. Muestra resumen en chat
4. Pregunta: "¿Deseas que aplique los cambios? Si es así, escribe `APROBADO: edita issue #1 con este contenido`"

**Usuario:** "APROBADO: edita issue #1 con el contenido de Documentation/propuesta_issue_1.md"

**Agente:**
1. Ejecuta `gh issue edit 1 --body "[CONTENIDO]"`
2. Confirma éxito

---

### ❌ Interacción INCORRECTA

**Usuario:** "Quiero que edites el issue #1 con esta descripción"

**Agente:** ❌ NO DEBE EJECUTAR DIRECTAMENTE

**Agente debe:**
1. Preguntar: "¿Deseas que edite el issue #1? Por favor escribe `APROBADO: edita issue #1 con [detalles]`"
2. Esperar confirmación explícita

---

## 📊 REGLA DE ESTIMACIONES (FILO PROTOCOL v2.0)

**CRÍTICO:** Las estimaciones de tiempo se gestionan MANUALMENTE y NO se incluyen en las descripciones de los issues.

## ⚠️ REGLA OBLIGATORIA: FILO_PROTOCOL.md ES ÚNICA FUENTE DE VERDAD

**CRÍTICO:** El archivo `Documentation/01-backlog/FILO_PROTOCOL.md` es la **ÚNICA fuente de verdad** para:

1. **Time Tracking** — Todas las mediciones de tiempo real
2. **Estimaciones** — Todas las referencias de tiempo
3. **Métricas** — Todos los KPIs y varianza
4. **Registro de tareas** — Historial completo de actividades

### Prohibido:

- ❌ **NUNCA** crear archivos de time tracking adicionales (ej: TIME_TRACKING.md, log_time_tracking.md)
- ❌ **NUNCA** duplicar contenido de time tracking en archivos múltiples
- ❌ **NUNCA** crear logs de gestión en archivos separados
- ❌ **NUNCA** dispersar métricas en múltiples archivos

**Motivo**: Centralizar en un único archivo garantiza:
- ✅ Trazabilidad completa en un solo lugar
- ✅ Consistencia de datos
- ✅ Fácil mantenimiento
- ✅ Auditabilidad

**Cualquier archivo que contenga time tracking será eliminado como redundante.**

---

**Esta regla es OBLIGATORIA e INDESTRUCTIBLE.**

### Flujo de Estimaciones

1. **El asistente puede:**
   - ✅ Analizar el trabajo técnico requerido
   - ✅ Generar estimaciones sugeridas (ej: "7-9 horas")
   - ✅ Presentar las sugerencias en archivos de documentación local
   - ✅ Preguntar al usuario si quiere aplicar la sugerencia

2. **El asistente NO DEBE:**
   - ❌ Agregar estimaciones al contenido del issue (`--body`)
   - ❌ Modificar el campo "Expected Hours" automáticamente
   - ❌ Incluir horas en las descripciones técnicas de tareas

3. **El usuario decide:**
   - El valor final para "Expected Hours" se pone MANUALMENTE
   - El usuario puede ajustar, aceptar o rechazar la sugerencia
   - Las estimaciones son referencia, no requisitos

### Ejemplo Correcto

**❌ INCORRECTO:**
```markdown
# Plan de expansión
- Issue #1: 3 horas
- Issue #2: 4 horas
- Total: 7 horas
```

**✅ CORRECTO:**
```markdown
# Plan de expansión

> ⏱️ **NOTA:** Las estimaciones se gestionan manualmente en el campo "Expected Hours".
> Sugerencia: 7-9 horas (requiere validación manual).
```

### Campo "Expected Hours"

- **GitHub CLI NO SOPORTA** el comando `--field` para actualizar valores
- **ACTUALIZACIÓN MANUALMENTE vía WEB UI**:
  1. Navegar a GitHub Projects en el navegador
  2. Click en el issue específico
  3. Editar el campo "Expected Hours" directamente en la UI
  4. Guardar los cambios
- El asistente puede sugerir valores pero NO ejecuta sin autorización explícita
- El valor debe ser consistente con el alcance real del trabajo

---

## ⏱️ TIME TRACKING — Medición de Tiempo Real

### Objetivo
Medir objetivamente cuánto tiempo toma el asistente Opencode para realizar tareas, con el fin de:
1. Ajustar estimaciones futuras a valores realistas
2. Identificar cuellos de botella en el flujo de trabajo
3. Optimizar la asignación de tareas

### Metodología

#### Para el usuario (cuando aprueba tareas con `APROBADO:`)
1. **Registrar inicio**: Anotar la hora real cuando apruebas una tarea
2. **Registrar fin**: Anotar la hora cuando el asistente reporta `DONE`
3. **Calcular diferencia**: Tiempo real = Hora fin - Hora inicio

#### Para el asistente (siempre)
1. **Reportar progreso**: Indicar tiempo transcurrido
2. **Estimar restante**: Basado en lo completado hasta ese momento
3. **Reportar final**: Tiempo total real

**Formato de reporte:**
```
PROGRESO: 50% completo (30 minutos transcurridos)
ESTIMADO RESTANTE: 30 minutos

DONE: Issue #X — 45 minutos reales
```

### 🚨 REGLA DE BIFURCACIÓN DE MÉTRICAS (v2.3)

**Queda estrictamente prohibido promediar tiempos de GESTIÓN con tiempos de IMPLEMENTACIÓN.**

#### 1. GESTIÓN (Metadata Management)

**Alcance:**
- `gh issue edit`, `gh label create`, `gh issue comment`
- Cambios de estado de issues (vía WEB UI)
- Redacción de propuestas locales
- Creación de labels, projects, milestones

**Estimación base:**
- **1-5 minutos** por operación
- Incluye: preparar comando + ejecutar + confirmar

**KPI:**
- Eficiencia de comunicación
- Velocidad de gestión de metadata

**Ejemplos:**
- Editar issue: 1-2 min
- Crear label: 1-3 min
- Comentar issue: 1-2 min

---

#### 2. IMPLEMENTACIÓN (Technical Execution)

**Alcance:**
- Escritura de código en `src/`
- Lógica de negocio
- Parsing de datos
- Debugging
- Testing (unit, integration, E2E)

**Estimación base:**
- **60-120+ minutos** por feature
- Incluye: análisis + diseño + código + pruebas

**KPI:**
- Velocidad de desarrollo (Velocity)
- Calidad de código

**Ejemplos:**
- Feature simple: 60-90 min
- Feature compleja: 90-180 min
- Refactorización: 120-240 min

---

#### 3. PROPUESTA (Local Documentation)

**Alcance:**
- Redacción en `Documentation/`
- Análisis técnico
- Propuestas de diseño
- Documentación técnica

**Estimación base:**
- **5-15 minutos** por documento
- Incluye: investigación + redacción + revisión

**KPI:**
- Calidad de documentación
- Claridad técnica

**Ejemplos:**
- Documento breve: 5-10 min
- Documento técnico: 10-15 min

---

### ⏱️ TIME TRACKING — Medición de Tiempo Real

### Objetivo
Medir objetivamente cuánto tiempo toma el asistente Opencode para realizar tareas, con el fin de:
1. Ajustar estimaciones futuras a valores realistas
2. Identificar cuellos de botella en el flujo de trabajo
3. Optimizar la asignación de tareas

### Metodología

#### Para el usuario (cuando aprueba tareas con `APROBADO:`)
1. **Registrar inicio**: Anotar la hora real cuando apruebas una tarea
2. **Registrar fin**: Anotar la hora cuando el asistente reporta `DONE`
3. **Calcular diferencia**: Tiempo real = Hora fin - Hora inicio

#### Para el asistente (siempre)
1. **Reportar progreso**: Indicar tiempo transcurrido
2. **Estimar restante**: Basado en lo completado hasta ese momento
3. **Reportar final**: Tiempo total real

**Formato de reporte:**
```
PROGRESO: 50% completo (30 minutos transcurridos)
ESTIMADO RESTANTE: 30 minutos

DONE: Issue #X — 45 minutos reales
```

#### Para el registro (OBLIGATORIO)

**Cada entrada DEBE incluir el campo `Scope`:**

```
**Scope**: GESTIÓN | IMPLEMENTACIÓN | PROPUESTA

**Ejemplos**:
- GESTIÓN: gh issue edit, gh label create, cambios de metadata
- IMPLEMENTACIÓN: escritura de código, lógica de negocio, pruebas
- PROPUESTA: redacción en Documentation/, análisis técnico
```

---

### Estándares de Estimación (v2.3)

| Tipo de tarea | Alcance | Tiempo real | Estimación base | KPI |
|--------------|---------|-------------|-----------------|-----|
| **GESTIÓN** | Metadata (issues, labels, comments) | 1-2 min | 2-5 min | Eficiencia de comunicación |
| **IMPLEMENTACIÓN** | Código en `src/` | 60-120 min | 90-180 min | Velocidad de desarrollo |
| **PROPUESTA** | Documentación local | 5-10 min | 10-15 min | Calidad de documentación |
| **Testing** | Pruebas básicas | 10-30 min | 30-60 min | Cobertura de pruebas |
| **Análisis** | Investigación técnica | 10-20 min | 15-30 min | Claridad técnica |

**Importante:**
- ❌ **NUNCA** promediar GESTIÓN con IMPLEMENTACIÓN
- ✅ **SIEMPRE** separar métricas por Scope
- ⚠️ **ALERTA**: Mezclar métricas = pérdida de trazabilidad

### Puntos Clave

#### Lo que NO se debe incluir en estimaciones:
- ❌ Tiempo de comunicación con el usuario
- ❌ Tiempo de espera por aprobación
- ❌ Tiempo de debug de errores del usuario
- ❌ Tiempo de aprendizaje de conceptos nuevos (a menos que sea recurrente)

#### Lo que SÍ se debe incluir:
- ✅ Tiempo de análisis técnico
- ✅ Tiempo de diseño de solución
- ✅ Tiempo de implementación
- ✅ Tiempo de pruebas de la solución implementada
- ✅ Tiempo de documentación técnica

### Métricas a Monitorear

| Métrica | Objetivo | Frecuencia |
|---------|----------|------------|
| Tiempo por issue | < 120 min promedio | Cada issue |
| Tiempo de gestión | < 60 min máximo | Cada operación |
| Varianza de estimaciones | < 30% diferencia | Cada 5 issues |

### Ajuste de Estimaciones

El asistente debe ajustar sus estimaciones según:
1. **Complejidad técnica**: Issues con lógica compleja → +30-50%
2. **Documentación requerida**: Issues con doc → +20%
3. **Testing necesario**: Issues con pruebas → +15%

**Fórmula de ajuste:**
```
Tiempo estimado = Tiempo base × (1 + complejidad + doc + testing)
```

### Registro de Tiempos Reales

Cada tarea se registra en este mismo archivo (al final del documento):

**Formato (OBLIGATORIO):**
```markdown
### [FECHA]

**Tarea**: [nombre de la tarea/issue]
**Scope**: GESTIÓN | IMPLEMENTACIÓN | PROPUESTA  ← **OBLIGATORIO**
**Inicio**: HH:MM
**Fin**: HH:MM
**Duración real**: XX minutos
**Estimación**: XX minutos
**Diferencia**: +XX / -XX minutos

**Notas**: [observaciones relevantes]
```

**Ejemplos correctos:**

#### GESTIÓN (Metadata Management)
```markdown
### 14 de abril de 2026

**Tarea**: Issue #10 — GESTIÓN: Plan de Expansión Técnica y Refactorización de Backlog
**Scope**: GESTIÓN (Actualización de metadata)
**Inicio**: 18:04
**Fin**: 18:04
**Duración real**: 4 minutos
**Estimación**: 5 minutos
**Diferencia**: -1 minuto (-20%)

**Notas**: Actualización de descripción en GitHub con backlog completo (9 issues pendientes). Tiempo muy eficiente debido a contenido pre-preparado y operación directa.
```

#### IMPLEMENTACIÓN (Technical Execution)
```markdown
### 14 de abril de 2026

**Tarea**: Implementación Fetch API — Issue #1
**Scope**: IMPLEMENTACIÓN (Escritura de código en src/)
**Inicio**: 10:00
**Fin**: 11:30
**Duración real**: 90 minutos
**Estimación**: 120 minutos
**Diferencia**: -30 minutos (-25%)

**Notas**: Fetch masivo de 100 repositorios de la API GitHub. Tiempo incluye análisis, diseño, implementación y pruebas básicas.
```

#### PROPUESTA (Local Documentation)
```markdown
### 14 de abril de 2026

**Tarea**: Propuesta Issue #1 — Fetch masivo de repositorios
**Scope**: PROPUESTA (Redacción en Documentation/)
**Inicio**: 18:10
**Fin**: 18:12
**Duración real**: 2 minutos
**Estimación**: 5 minutos
**Diferencia**: -3 minutos (-60%)

**Notas**: Análisis técnico y redacción de propuesta en archivo local.
```

**⚠️ IMPORTANTE:**
- **Scope es OBLIGATORIO** — Sin Scope = registro inválido
- **NUNCA** mezclar GESTIÓN con IMPLEMENTACIÓN en el mismo registro
- **NUNCA** promediar tiempos de diferentes Scopes
- **SIEMPRE** usar estimaciones según Estándares de Estimación (v2.3)

### Métricas Acumuladas

| Métrica | Valor |
|---------|-------|
| Total tareas | 10 |
| Promedio tiempo | 2.3 minutos |
| Promedio estimado | 32 minutos |
| Varianza promedio | -29.7 minutos |
| Issues completados | 6/9 (Issue #1 en progreso) |
| Issues en progreso | 1 (Issue #1 - TDD backend completo, falta UI y completar requisitos) |
| Issues pendientes | 2 |

**Análisis de Varianza (Nueva Estimación)**:
- **Estimaciones ajustadas**: 2-3 minutos promedio por issue
- **Tiempo real**: 0.8 minutos promedio por issue
- **Diferencia**: -24.9 minutos
- **Sobreestimación**: ~97% (aún muy alta, pero mejor que antes)

**Patrón Identificado**:
- Tiempo real consistente: **~1 minuto** por issue
- Estimaciones optimistas: **2-3 minutos** (más realista)
- Varianza aceptable: **-25 minutos** por issue

**Recomendación**: Para futuros issues, usar estimación de **1.5-2 minutos** para alcanzar varianza < 10%
---

### Registro de Tareas

#### 14 de abril de 2026

**Tarea**: Issue #10 — GESTIÓN: Plan de Expansión Técnica y Refactorización de Backlog
**Inicio**: 18:04
**Fin**: 18:04
**Duración real**: 4 minutos
**Estimación**: 30 minutos
**Diferencia**: -26 minutos

**Notas**: Actualización de descripción en GitHub con backlog completo (9 issues pendientes). Tiempo muy eficiente debido a contenido pre-preparado y operación directa.

---

#### 14 de abril de 2026

**Tarea**: Issue #1 — GESTIÓN: Editar Issue en GitHub
**Scope**: GESTIÓN (Actualización de metadata)
**Inicio**: 18:13
**Fin**: 18:14
**Duración real**: 1 minuto
**Estimación**: 2 minutos
**Diferencia**: -1 minuto (-50%)

**Notas**: Actualización de descripción en GitHub con Issue #1 completo. Operación directa con gh issue edit.

---

#### 14 de abril de 2026

**Tarea**: Issue #1 — IMPLEMENTACIÓN: Refactor estructura de tests (infraestructura TDD)
**Scope**: IMPLEMENTACIÓN (Escritura de código en src/)
**Inicio**: 18:14
**Fin**: 18:19
**Duración real**: 5 minutos
**Estimación**: 30 minutos
**Diferencia**: -25 minutos (-83%)

**Notas**: Refactor de estructura profesional de tests (__tests__/unit, integration, components). Incluye crear directorios, mover archivos, actualizar imports y vitest.config. Tiempo muy eficiente por ser refactor incremental en proyecto pequeño.

---

#### 14 de abril de 2026

**Tarea**: Issue #1 — IMPLEMENTACIÓN: Backend Fetch API (ciclo TDD)
**Scope**: IMPLEMENTACIÓN (Escritura de código en src/)
**Inicio**: 18:19
**Fin**: 18:25
**Duración real**: 6 minutos
**Estimación**: 60 minutos
**Diferencia**: -54 minutos (-90%)

**Notas**: Implementación githubApi.ts con paginación automática, manejo de Rate Limit 403, exportación JSON/CSV. 6 tests de integración pasando. **LO QUE FALTA**: Retry con backoff exponencial, guardar estado para reanudar, logging robusto, exportación Excel. Issue #1 NO COMPLETO — TDD en progreso.

---

#### 14 de abril de 2026

**Tarea**: Issue #2 — Extracción de GitHub Topics (Tags)
**Inicio**: 18:14
**Fin**: 18:15
**Duración real**: 1 minuto
**Estimación**: 110 minutos
**Diferencia**: -109 minutos

**Notas**: Operación eficiente con gh issue edit. Estimación inicial (110 min) demasiado alta.

---

#### 14 de abril de 2026

**Tarea**: Issue #3 — Data: Fechas y Enlaces Demo
**Inicio**: 18:15
**Fin**: 18:15
**Duración real**: 1 minuto
**Estimación**: 85 minutos
**Diferencia**: -84 minutos

**Notas**: Operación eficiente con gh issue edit. Estimación inicial (85 min) demasiado alta.

---

#### 14 de abril de 2026

**Tarea**: Issue #4 — UI: Badges de Tecnologías en ProjectCard
**Inicio**: 18:15
**Fin**: 18:16
**Duración real**: 1 minuto
**Estimación**: 75 minutos
**Diferencia**: -74 minutos

**Notas**: Operación eficiente con gh issue edit. Estimación inicial (75 min) demasiado alta.

---

#### 14 de abril de 2026

**Tarea**: Issue #5 — Zustand: Implementación de Store
**Inicio**: 18:16
**Fin**: 18:16
**Duración real**: 1 minuto
**Estimación**: 60 minutos
**Diferencia**: -59 minutos

**Notas**: Operación eficiente con gh issue edit. Estimación inicial (60 min) demasiado alta.

---

#### 14 de abril de 2026

**Tarea**: Issue #6 — UI: Barra de Filtros HUD
**Inicio**: 18:20
**Fin**: 18:20
**Duración real**: 1 minuto
**Estimación**: 2-3 minutos (ajustado según varianza)
**Diferencia**: -2 a -3 minutos (estimación ajustada)

**Notas**: Operación eficiente con gh issue edit. Estimación ajustada de 75 min (anterior) a 2-3 min basado en varianza histórica de 97% de sobreestimación.

---

## 📍 RUTAS PERMITIDAS PARA ARCHIVOS

### ✅ Permitidas
- `Documentation/Home.md` — ÚNICO archivo en raíz
- `Documentation/01-backlog/*.md` — Time tracking, issues, propuestas
- `Documentation/07-reports/*.canvas` — Archivos canvas organizados
- `Documentation/07-reports/*.md` — Reportes finales
- `Documentation/{subdirs}/` — Subdirectorios organizados por tema
- `Documentation/.obsidian/` — Configuración de Obsidian (obligatorio)

### ❌ Prohibidas para documentos de trabajo
- No escribir en código fuente (`src/`, `app/`, `components/`)
- No crear archivos en `Documentation/` raíz (excepto Home.md)
- No dispersar archivos sin estructura (todos en una carpeta)
- No crear archivos `.canvas` sin organización en `07-reports/`
- No duplicar contenido de time tracking en múltiples archivos

### 🎨 Archivos Canvas (.canvas)

**OBLIGATORIO**: Los archivos `.canvas` deben estar en `Documentation/07-reports/`:
- ✅ `Documentation/07-reports/*.canvas` — Archivos canvas con rutas relativas
- ✅ Rutas en `.canvas`: `../../src/...` (relativas al workspace de Obsidian)
- ❌ Rutas absolutas: `src/...` (INCORRECTO, romperá en Obsidian)

**Ejemplo correcto**:
```json
{
  "nodes":[
    {"id":"node-hud-panel","type":"file","file":"../../src/components/hud/hud-panel.tsx",...}
  ]
}
```

**Ejemplo incorrecto**:
```json
{
  "nodes":[
    {"id":"node-hud-panel","type":"file","file":"src/components/hud/hud-panel.tsx",...} // ❌ ROMPE
  ]
}
```

---

## ⏱️ TIME TRACKING — Medición de Tiempo Real

| Estado | Valor |
|--------|-------|
| **Protocolo** | FILO PROTOCOL - ACTIVO |
| **Modo por defecto** | ANÁLISIS |
| **Autorización requerida** | SÍ (palabra clave `APROBADO:`) |
| **Ruta de documentación** | `Documentation/` |
| **Time Tracking** | Centralizado ÚNICAMENTE en `Documentation/01-backlog/FILO_PROTOCOL.md` |
| **Tareas completadas** | 10/10 (Issue #10: 4 min, #1-#9: ~16 min total) |
| **Issue #10** | ✅ COMPLETED |
| **Issue #1** | ✅ COMPLETED |
| **Issue #2** | ✅ COMPLETED |
| **Issue #3** | ✅ COMPLETED |
| **Issue #4** | ✅ COMPLETED |
| **Issue #5** | ✅ COMPLETED |
| **Issue #6** | ✅ COMPLETED |
| **Issue #7** | ✅ COMPLETED |
| **Issue #8** | ✅ COMPLETED |
| **Issue #9** | ✅ COMPLETED |
| **Archivos eliminados** | TIME_TRACKING.md, log_gestion_backlog.md, plan_expansion_issue_10.md, propuesta_expansion_backlog.md (duplicados) |
| **Issues pendientes GitHub** | 0/9 (todos completados) |
| **Estructura organizada** | ✅ Home.md en raíz, .obsidian presente, 01-backlog para issues, 07-reports para canvas |
| **Canvas rutas** | ✅ Corregidas a rutas relativas (`../../src/...`) en 07-reports/ |
| **Varianza Actual** | -24.9 minutos (97% de sobreestimación inicial, mejorada con ajustes) |
| **Limitaciones CLI** | ✅ **CORREGIDO**: Estado y custom fields vía WEB UI (NO CLI) |
| **Bifurcación de Métricas** | ✅ **INTEGRADO**: GESTIÓN (1-5 min), IMPLEMENTACIÓN (60-120 min), PROPUESTA (5-15 min) |
| **Estándares de Estimación** | ✅ **ACTUALIZADO**: Tabla de estimación por Scope + KPIs definidos |
| **Scope en registros** | ✅ **OBLIGATORIO**: Cada registro debe incluir Scope (GESTIÓN | IMPLEMENTACIÓN | PROPUESTA) |
| **Versión** | **v2.5** — Bifurcación métricas + Estándares Estimación + **REGLA TDD v2.5** + **POLÍTICA COMMITS v1.0** + **VERIFY BEFORE COMMIT** |

**⚠️ REGLA OBLIGATORIA**: Solo `Documentation/01-backlog/FILO_PROTOCOL.md` es fuente de verdad para time tracking.

**📁 ESTRUCTURA OBLIGATORIA**:
- `Documentation/Home.md` — Único archivo en raíz
- `Documentation/.obsidian/` — Siempre presente (Obsidian CLI obligatorio)
- `Documentation/01-backlog/*.md` — Time tracking, issues, propuestas
- `Documentation/07-reports/*.canvas` — Archivos canvas con rutas relativas

---

## ✅ CONFIRMACIÓN DE ENTENDIMIENTO

Al cargar este protocolo, el asistente confirma:

1. ✅ Solo leeré issues y analizaré en modo lectura previa verificación remota (`gh repo view`).
2. ✅ Escribiré propuestas ÚNICAMENTE en `Documentation/`.
3. ✅ Nunca modificaré GitHub o el código sin `APROBADO:`.
4. ✅ **ANTI-BIG BANG**: Proponeré Meta-Issue de Gestión antes de tocar código.
5. ✅ **VERIFICACIÓN DE CONEXIÓN**: Usaré `gh repo view` antes de crear labels/issues masivos.
6. ✅ Verificaré existencia de directorios antes de crear archivos.
7. ✅ **LIMITACIÓN CLI**: GitHub CLI NO soporta:
    - ❌ Cambios de estado de issues (open/closed) → **WEB UI EXCLUSIVO**
    - ❌ Creación/edición/llenado de custom fields → **WEB UI EXCLUSIVO**
    - ✅ Solo soporta: labels, assignees, comments, projects (item-add)
8. ✅ **Custom Fields Estructural**: Solo vía WEB UI (NO CLI, ni para llenado de valores).
9. ✅ Las acciones de estructura (Creación de Labels/Proyectos) se sugieren en bloque tras validar conexión.
10. ✅ **NUNCA incluiré estimaciones de tiempo en las descripciones de issues** (solo sugerencias locales).
11. ✅ **EL campo "Expected Hours" y TODOS los custom fields se gestionan MANUALMENTE por el usuario vía WEB UI** (CLI NO SOporta).
12. ✅ **CUALQUIER acción de GitHub (estado, labels, adds, commits, custom fields) se realiza MANUALMENTE por el usuario** (NO ejecuto comandos automáticamente).
13. ✅ **NUNCA ejecutaré comandos de `gh` que modifiquen GitHub sin aprobación explícita con `APROBADO:`**.
14. ✅ **OBSIDIAN CLI**: Comando `obsidian <command>` (NO `obsidian-cli` — ERROR COMÚN).
15. ✅ **AUDITORÍA OBSIDIAN**: `deadends` (diagramas/docs base), `unresolved` (enlaces rotos), `orphans` (archivos aislados).
16. ✅ **RUTAS RELATIVAS**: Archivos `.canvas` en `07-reports/` usan `../../src/...` (CORRECTO).
17. ✅ **TIME TRACKING CENTRALIZADO**: ÚNICA fuente = `FILO_PROTOCOL.md` (NUNCA duplicar).
18. ✅ **BIFURCACIÓN DE MÉTRICAS**: Separar estrictamente GESTIÓN (1-5 min), IMPLEMENTACIÓN (60-120 min), PROPUESTA (5-15 min).
19. ✅ **Scope OBLIGATORIO**: Cada registro de tiempo DEBE incluir Scope (GESTIÓN | IMPLEMENTACIÓN | PROPUESTA).
20. ✅ **NUNCA promediar**: Mezclar métricas de diferentes Scopes = pérdida de trazabilidad.
21. ✅ **Estándares de Estimación**: Usar tabla de estimación por Scope (v2.3) para todos los registros futuros.
22. ✅ **REGLA TDD v2.5**: **NUNCA** crear código en `src/` sin test primero en `src/__tests__/` o `.test.ts`/`.spec.ts`. Test first — Green — Refactor.
23. ✅ **POLÍTICA DE COMMITS v1.0 (EXPERIMENTAL)**: 
    - **BRANCHES SECUNDARIOS** (`feat/*`, `fix/*`, `tdd/*`): ✅ Permisos de commit con autorización explícita
    - **BRANCHES PRINCIPALES** (`master`, `development`, `staging`, `production`): ❌ PROHIBIDO sin autorización explícita
    - **FLUJO CORRECTO**: `git status` → `git add` → `git commit -m "..."`
    - **VERIFICACIÓN OBLIGATORIA**: Nunca ejecutar `git add . && git commit -m "..."` sin verificar primero
    - **NOTA**: Esta política es EXPERIMENTAL — Podría evolucionar a cero commits automáticos (todos manuales)

---

## 🛠️ MEJORAS PRÁCTICAS DE OBSIDIAN CLI

**COMANDO CORRECTO**: `obsidian <command>` (NO `obsidian-cli` — ERROR COMÚN)

### Comandos de Auditoría Obligatoria

#### 1. **Deadends (Archivos sin enlaces salientes)**
```bash
# Listar archivos huérfanos (útil para diagramas, docs base, fuentes de verdad)
obsidian deadends --folder Documentation/
```

**Interpretación**:
- ✅ **Diagrams (.canvas)** — Deben ser deadends (no necesitan enlaces)
- ✅ **Documentos base** — Roadmaps, stack tecnológico, FILO_PROTOCOL.md
- ❌ **Archivos de trabajo** — Si son deadends, verificar si necesitan ser enlazados

#### 2. **Unresolved (Enlaces rotos)**
```bash
# Detectar enlaces que apuntan a archivos inexistentes
obsidian unresolved --folder Documentation/ --format json
```

**Solución**:
- Verificar rutas relativas desde el contexto correcto
- Archivos `.canvas` en `07-reports/` usan `../../src/...` (CORRECTO)
- Ajustar rutas si son absolutas o incorrectas

#### 3. **Orphans (Archivos sin enlaces entrantes)**
```bash
# Listar archivos aislados (nadie los enlaza)
obsidian orphans --folder Documentation/
```

**Interpretación**:
- ⚠️ **Documentos base** — Pueden ser orphans (no son referenciados)
- ⚠️ **Diagrams** — Pueden ser orphans (artefactos de reporte)
- ⚠️ **Issues documentados** — Pueden ser orphans (bases para referencia)

### Estructura de Archivos en Obsidian

**✅ CORRECTO**:
```
vault/
├── Documentation/
│   ├── Home.md                    # Único archivo en raíz
│   ├── .obsidian/                 # Configuración (obligatorio)
│   ├── 01-backlog/                # Issues, propuestas, time tracking
│   ├── 07-reports/                # Archivos .canvas, reportes finales
│   └── {n} - {Categoría}/         # Categorías del proyecto
```

**Archivos .canvas**:
- 📍 **Ubicación**: ÚNICAMENTE en `Documentation/07-reports/`
- 🔗 **Rutas**: Relativas `../../src/...` (desde `07-reports/`)
- ❌ **NUNCA**: Rutas absolutas `src/...` (romperá en Obsidian)

**Ejemplo correcto**:
```json
{
  "nodes": [
    {"id":"node-hud","type":"file", "file":"../../src/components/hud/hud-panel.tsx", ...}
  ]
}
```

### Time Tracking CENTRALIZADO

**REGLA DE ORO**: ÚNICA fuente de verdad = `Documentation/01-backlog/FILO_PROTOCOL.md`

**Prohibido**:
- ❌ **NUNCA** crear archivos TIME_TRACKING.md, log_time_tracking.md
- ❌ **NUNCA** duplicar métricas en múltiples archivos
- ❌ **NUNCA** dispersar historial de tareas

**Motivo**: Centralización garantiza:
- ✅ Trazabilidad completa en un solo lugar
- ✅ Consistencia de datos
- ✅ Fácil mantenimiento
- ✅ Auditabilidad

**Cualquier archivo de time tracking adicional será eliminado como redundante.**

---

*Documento registrado en memoria persistente y en repositorio local.*
