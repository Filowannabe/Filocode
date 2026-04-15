# UI: Terminal Contact Shell

## Descripción
Implementar una terminal interactiva de contacto (Contact Shell) para la página de contacto, con funcionalidad tipo chat y validación de formularios.

## Objetivo
Mejorar la experiencia de contacto con los usuarios mediante una interfaz de terminal moderna y funcional.

## Requisitos Funcionales

### 1. Terminal Interactiva
- [ ] Input para mensajes del usuario
- [ ] Área de chat con historial de mensajes
- [ ] Mensajes simulados de "respuesta" automática
- [ ] Typing indicator (escribiendo...)
- [ ] Scroll automático al nuevo mensaje

### 2. Validación de Contacto
- [ ] Validación de email
- [ ] Validación de mensaje (mínimo caracteres)
- [ ] Validación de teléfono (opcional)
- [ ] Feedback visual de validación
- [ ] Error messages claros

### 3. Integración con Formulario
- [ ] Alternar entre form tradicional y terminal
- [ ] Enviar datos al backend (mock)
- [ ] Confirmación de envío exitoso
- [ ] Manejo de errores de envío

### 4. Estados
- [ ] Idle (listo)
- [ ] Sending (enviando)
- [ ] Success (exitoso)
- [ ] Error (error)

### 5. Persistencia
- [ ] Guardar historial en localStorage
- [ ] Clear chat manual
- [ ] Recargar historial al volver

## Requisitos No Funcionales

- [ ] Performance: < 200ms para renderizar mensajes
- [ ] Responsive: Adaptable a móvil
- [ ] Accesibilidad: Navegación por teclado
- [ ] Animaciones: Fade-in para mensajes

## Archivos a Crear

1. `src/components/ContactTerminal.tsx` — Componente principal
2. `src/components/MessageBubble.tsx` — Burbuja de mensaje
3. `src/hooks/useContactTerminal.ts` — Hook personalizado
4. `src/types/contact.ts` — Interfaces TypeScript
5. `src/utils/contactValidation.ts` — Validaciones

## Archivos a Modificar

1. `src/App.tsx` — Integrar terminal de contacto
2. `src/pages/Contact.tsx` — Añadir terminal
3. `src/components/ContactForm.tsx` — Alternar con terminal

## Criterios de Aceptación

- [ ] Terminal interactiva funciona
- [ ] Validación de email funciona
- [ ] Feedback visual de estados
- [ ] Animaciones fluidas (60fps)
- [ ] Responsive en móvil
- [ ] Accesibilidad completa
- [ ] Historial persistente
- [ ] Clear chat funciona

## Estimaciones Basadas en Datos Reales

**Contexto Histórico**:
- Operación real promedio: **0.8 minutos** (48 segundos)
- Operación real típica: **~1 minuto**
- Estimaciones anteriores: **60-75 minutos** (97% sobreestimación)

**Nueva Estimación Realista**:
- **Tiempo de actualización en GitHub**: ~1-2 minutos
- **Tiempo de implementación técnica**: NO incluido (solo actualización de descripción)
- **Total estimado**: **2-3 minutos** (incluyendo preparación de contenido)

> ⚠️ **NOTA**: Las estimaciones anteriores (60-75 min) incluían implementación completa. Esta estimación es solo para **actualizar la descripción en GitHub**.

## Notas de Implementación

- Terminal estilo: `xterm.js` o `react-terminal`
- Animaciones: `framer-motion`
- Colores: Tema oscuro por defecto
- Tipografía: Monospace para terminal

---

**Última actualización**: 14 de abril de 2026
**Estado**: Pending de aprobación

## Backlog Actualizado

### Issues Completados ✅
- [x] Issue #1 — Fetch masivo (COMPLETED)
- [x] Issue #2 — Extracción de Topics (COMPLETED)
- [x] Issue #3 — Fechas y Enlaces Demo (COMPLETED)
- [x] Issue #4 — Badges de Tecnologías (COMPLETED)
- [x] Issue #5 — Zustand Store (COMPLETED)
- [x] Issue #6 — Barra de Filtros HUD (COMPLETED)

### Issues Pendientes ⏳
- [ ] Issue #7 — Terminal Contact Shell (ACTIVO)
- [ ] Issue #8 — Metadatos y OpenGraph (Pending)
- [ ] Issue #9 — Dockerfile Multi-stage (Pending)

### Total Issues Pendientes
- **Cantidad**: 3 issues
- **High Priority**: 1 (#9)
- **Medium Priority**: 1 (#8)
- **Low Priority**: 1 (#7)