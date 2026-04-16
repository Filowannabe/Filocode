# Issue #1 — Fetch masivo de repositorios (100 items)

## Descripción
Implementar función de fetch masivo para obtener datos de repositorios GitHub en lotes de 100 items, con paginación y manejo de límites.

## Objetivo
Optimizar la recolección de datos de repositorios GitHub mediante paginación eficiente y manejo de límites de API.

## Requisitos Funcionales

### 1. Fetch con Paginación
- [ ] Implementar paginación automática (100 items por llamada)
- [ ] Manejar offset para paginación múltiple
- [ ] Continuar hasta agotar todos los items disponibles
- [ ] Manejar caso de menos de 100 items en última página

### 2. Manejo de Límites
- [ ] Respetar límites de rate limiting de GitHub API
- [ ] Implementar retry con backoff exponencial
- [ ] Manejar errores 403 (rate limited)
- [ ] Esperar tiempo adecuado entre llamadas

### 3. Datos a Obtener
- [ ] Nombre del repositorio
- [ ] Descripción
- [ ] Número de estrellas, forks, watchers
- [ ] URL del repositorio
- [ ] URL del clon (git clone)
- [ ] Topics/etiquetas asociados

### 4. Progreso y Estado
- [ ] Mostrar progreso de items procesados
- [ ] Manejo de errores por item sin detener proceso
- [ ] Guardar estado para reanudar si falla

### 5. Exportación
- [ ] Exportar datos a CSV
- [ ] Exportar datos a JSON
- [ ] Exportar datos a Excel (.xlsx)

## Requisitos No Funcionales

- [ ] Performance: < 10 items/segundo (considerando rate limits)
- [ ] Confiabilidad: 95% de items exitosos
- [ ] Manejo de errores: Resiliente a fallos de conexión
- [ ] Logging: Registrar intentos y errores

## Archivos a Crear

1. `src/services/githubApi.ts` — Servicio de API GitHub
2. `src/utils/pagination.ts` — Utilidad de paginación
3. `src/types/repositorio.ts` — Interfaces TypeScript
4. `src/components/RepoFetcher.tsx` — Componente UI (opcional)

## Archivos a Modificar

1. `src/App.tsx` — Integrar servicio
2. `src/main.tsx` — Registrar servicios (si aplica)

## Criterios de Aceptación

- [ ] Se puede fetchear 100 items por llamada
- [ ] Se maneja paginación automática
- [ ] Se respeta rate limiting de GitHub API
- [ ] Los datos se exportan correctamente
- [ ] Manejo de errores robusto
- [ ] Progreso visible al usuario

## Estimaciones

- **Tiempo de implementación**: ~60 minutos
- **Tiempo de pruebas**: ~15 minutos
- **Total estimado**: ~75 minutos

## Notas de Implementación

- Usar GitHub REST API v3: `https://api.github.com/users/[user]/repos`
- Considerar autenticación con token para evitar rate limits
- Implementar retry logic con backoff exponencial
- Tipado estricto con TypeScript interfaces

## Dependencias

- `node-fetch` o `axios` para llamadas HTTP
- `xlsx` para exportación a Excel (opcional)

---

**Última actualización**: 15 de abril de 2026  
**Estado**: COMPLETED ✅  
**Sincronización**: 100% (Fetch Masivo, Paginación Infinita, Multi-Exportación, Watchers, Clone URL, Audit Logs).