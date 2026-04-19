# 🛡️ UI Integrity Mandate: HUD Pro-Max (v28)

**Fecha de Activación**: 18 de abril, 2026
**Estado**: ENFORCED (MANDATORIO)

## 🎯 Objetivo
Garantizar que la estética de alta fidelidad **"Winter Blade Runner"** y la arquitectura de **Ventanas Flotantes** consolidada hoy, no sea alterada por futuros agentes o refactors accidentales sin una validación explícita.

## 🏗️ Estándares de Verificación (Tests)

Se ha implementado una suite de pruebas de integridad en `src/__tests__/ui-integrity.test.tsx` que valida:
1. **Fidelidad Tipográfica**: Presencia de gradientes dorados y escalas masivas en el statement principal.
2. **Identidad Táctica**: Metadatos técnicos invariables en el avatar y widgets de código.
3. **Pureza de Diseño**: Ausencia de controles de ventana tipo macOS (Dots) y mantenimiento de la paleta Negro/Oro (Cero Azules).
4. **Resiliencia de Snapshots**: Cualquier cambio en el DOM generará un fallo en `toMatchSnapshot()`.

### Ejecución de Auditoría
```bash
yarn vitest run src/__tests__/ui-integrity.test.tsx
```

## 📸 Referencia Visual de "Estado Dorado"

Los siguientes archivos representan el estado perfecto aprobado por el usuario:
- **Screenshot**: `screenshots/golden-state-home.png`
- **Snapshot Estructural**: `snapshots/ui-integrity-snapshot.json`

### Key Visual Markers (Invariants)
- [x] **Sol Dorado**: Light source central con bloom masivo.
- [x] **Snowfall**: 140 partículas sin glow pero altamente visibles.
- [x] **Space-Between**: El contenido debe respirar, no estar pegado a los bordes.
- [x] **Avatar Ámbar**: Filtro sepia táctico sobre `avatar.jpg`.

## 🚨 Regla de Modificación
**PROHIBIDO** modificar archivos de atmósfera (`layout.tsx`) o el contenedor `HudPanel` sin actualizar la suite de tests de integridad y obtener la aprobación del humano mediante una nueva captura de pantalla.

---
**ESTADO: PROTECTED // GOLDEN_STATE_LOCKED**
