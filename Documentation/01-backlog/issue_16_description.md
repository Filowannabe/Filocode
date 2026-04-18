# Issue #16: Implementación de Entornos de Despliegue con GitHub Actions

**Estado**: 🟡 EN PROGRESO (PR #18 creado, merge pendiente)  
**Fecha**: 18 de abril, 2026  
**Asignado a**: Senior Engineering Assistant

---

## 🎯 Objetivo

Implementar workflows de GitHub Actions para despliegue automático multi-environment con GitHub Pages y protección de ramas según Protocolo FILO v2.9.

---

## 📋 Requerimientos

### 1. Workflow Único Inteligente (`.github/workflows/deploy.yml`)

**Trigger**:
- `push`: a `master`, `staging`, `development`
- `pull_request`: a `master`, `staging`

**Jobs**:

| Job | Trigger | Rama | Acción |
|-----|---------|------|--------|
| **CI** | Todos los pushes/PRs | Todas | Tests + Linting |
| **Deploy** | Solo si CI pasa | `master` / `staging` | Build + GitHub Pages |

**Lógica de Despliegue**:

```yaml
if: github.ref == 'refs/heads/master' || github.ref == 'refs/heads/staging'
```

- **master**: Compila y despliega a raíz (`/`)
- **staging**: Compila con `basePath: /staging`
- **development**: Ignorado en deploy (solo CI)
- **feat/***: Ignorado en deploy (solo CI)

### 2. Configuración Next.js (`next.config.ts`)

```typescript
const nextConfig: NextConfig = {
  // basePath condicional: staging usa /staging, production y dev usan raíz
  basePath: isStaging ? '/staging' : (isDev ? '' : ''),
  
  // Output estático para GitHub Pages
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Configuración de imágenes para export estático
  images: {
    // Deshabilitar optimización automática para export estático
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};
```

### 3. Protección de Ramas (Protocolo FILO)

| Rama | Pull Request | Status Checks | Force Push | Code Review |
|------|--------------|---------------|------------|-------------|
| **development** | ✅ Obligatorio | ✅ Requerido | ❌ Bloqueado | ✅ Mínimo 1 approval |
| **staging** | ✅ Obligatorio | ✅ Requerido | ❌ Bloqueado | ✅ Mínimo 2 approvals |
| **production** | ✅ Obligatorio | ✅ Requerido | ❌ Bloqueado | ✅ Mínimo 2 approvals + Manual |

### 4. KPIs de Éxito

- ✅ Workflow CI ejecuta tests y linting en todos los pushes
- ✅ Deploy automático en `master` y `staging`
- ✅ Ignora `development` y `feat/*` en deploy
- ✅ Zero downtime con export estático
- ✅ GitHub Pages activo para development (manual deployment)

---

## 🛠️ Stack

- **GitHub Actions**: `actions/checkout@v4`, `actions/setup-node@v4`, `peaceiris/actions-gh-pages@v4`
- **Node.js**: v20 LTS
- **Next.js**: 16 (output: export)
- **Yarn**: Berry v4 (cache en workflows)

---

## 📊 Estado Actual

| Tarea | Estado | Notas |
|-------|--------|-------|
| **Meta-Issue** | ✅ Creado | Issue #16 en backlog |
| **Workflow CI** | ✅ Implementado | Tests + linting en todas ramas |
| **Workflow Deploy** | ✅ Implementado | Solo master + staging |
| **basePath condicional** | ✅ Implementado | `/staging` en staging |
| **unoptimized: true** | ✅ Implementado | Para next/image en export |
| **PR #18** | 🟡 Creado | Merge pendiente |
| **Documentación** | ✅ Actualizado | issue_16_description.md |

---

## 🚀 Pasos Siguientes

1. **Merge PR #18** a `development`
2. **Actualizar package.json version**: `0.3.1` → `0.3.2`
3. **Testear despliegue**:
   - Push a `master` → Deploy a GitHub Pages (raíz)
   - Push a `staging` → Deploy con `/staging`
   - Push a `development` → Solo CI, no deploy
4. **Configurar GitHub Pages** en settings del repositorio
5. **Actualizar Engram** con observaciones de implementación

---

## 📁 Files Changed

| Archivo | Líneas | Cambios |
|---------|--------|---------|
| `.github/workflows/deploy.yml` | ~60 | Nuevo |
| `next.config.ts` | ~10 | Actualizado |
| `Documentation/01-backlog/issue_16_description.md` | ~50 | Actualizado |

---

## 📚 Referencias

- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deployment/static)
- [GitHub Pages Action](https://github.com/peaceiris/actions-gh-pages)
- [Protocolo FILO v2.9](./FILO_PROTOCOL.md)
- [Issue #15: Simplificación de Arquitectura de Ramas](./issue_15_description.md)

---

**Última actualización**: 18 de abril, 2026