# DevOps: Dockerfile Multi-stage

**Objetivo**: Implementar Dockerfile multi-stage para reducir tamaño de imagen y mejorar seguridad

## 🚀 Objetivo
- Reducir tamaño de imagen desde ~500MB a <100MB
- Eliminar dependencias de build en runtime
- Mejorar seguridad (no exponer herramientas de desarrollo)
- Optimizar tiempo de despliegue

## 📋 Requerimientos

### 1. Estructura Multi-stage
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

### 2. Optimizaciones Clave
- ✅ `node:18-alpine` (no full node:18)
- ✅ `npm ci --only=production` (no devDependencies)
- ✅ Multi-stage (build vs runtime separados)
- ✅ Caché de dependencias optimizada

### 3. Metadatos
- **Epic**: Production
- **Type**: DevOps
- **Priority**: High
- **Time Estimate**: 2-3 min

## 📊 Métricas de Éxito

| Métrica | Antes | Después |
|---------|-------|---------|
| Tamaño imagen | ~500MB | <100MB |
| Tiempo deploy | ~2 min | ~30 seg |
| Vulnerabilidades | 15+ | <3 |

---

**APROBADO**: Devuelve `APROBADO: #9 — HH:MM` para aplicar en GitHub