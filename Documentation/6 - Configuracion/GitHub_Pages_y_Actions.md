---
tags:
  - config
  - github-actions
  - github-pages
  - ci-cd
  - devops
status: documented
created: 2026-04-18
updated: 2026-04-18
---

# 🚀 GitHub Pages & Actions: Configuración Multi-Environment

Este documento detalla la configuración integral del flujo de CI/CD para el despliegue automático del proyecto Next.js en **GitHub Pages**, soportando entornos múltiples (`master` para Producción y `staging` para Pruebas). Todo el proceso está construido desde cero cumpliendo estrictamente con el **FILO PROTOCOL**.

## 1. 💡 ¿Por qué GitHub Pages + Actions? (Justificación Gratuita)

El uso combinado de **GitHub Pages** y **GitHub Actions** es una decisión estratégica y financiera:
1. **Hosting Gratuito (0 Costo)**: GitHub Pages ofrece alojamiento estático gratuito para repositorios públicos, ideal para sitios de portafolio y documentación.
2. **CI/CD Integrado (0 Costo)**: GitHub Actions ofrece hasta 2,000 minutos gratis al mes para repositorios privados y **minutos ilimitados** para repositorios públicos.
3. **Escalabilidad y Seguridad**: No dependemos de plataformas de terceros (Vercel, Netlify) que puedan cambiar sus planes gratuitos. El código y el despliegue viven en el mismo ecosistema.
4. **Exportación Estática (Next.js)**: Al configurar Next.js en modo `output: 'export'`, generamos archivos HTML/CSS/JS estáticos puros, eliminando la necesidad de un servidor Node.js en tiempo de ejecución, lo que lo hace 100% compatible con GitHub Pages.

---

## 2. 🌳 Estrategia de Ramas (Git Flow)

La configuración utiliza el siguiente flujo de integración continua, respetando el **Trunk Isolation Mandate**:

1. **`feat/*`, `fix/*`, `docs/*`**: Ramas de desarrollo local. Aquí se realiza el trabajo inicial. Al hacer push, GitHub Actions ejecuta **únicamente los tests y el linter** (Job: CI). No se despliega nada.
2. **`development`**: Rama de integración principal. Al hacer merge de una feature, corre el CI pero **NO hay despliegue**. Actúa como compuerta de seguridad final antes de pre-producción.
3. **`staging`**: Entorno de pre-producción. Al hacer merge desde `development`, GitHub Actions compila la app y la despliega en la subcarpeta `/staging` de GitHub Pages.
4. **`master`**: Entorno de producción (Root). Al hacer merge desde `staging`, GitHub Actions compila la app y la despliega en la raíz `/` de GitHub Pages.
5. **`gh-pages`**: Rama huérfana (orphan) **generada automáticamente** por GitHub Actions. Contiene únicamente los archivos estáticos (`out/`) compilados de `master` y `staging`. GitHub Pages sirve la web directamente desde aquí.

---

## 3. ⚙️ Configuración del Proyecto (Next.js)

Para que Next.js funcione correctamente en un entorno estático y multi-ruta, se debe configurar `next.config.ts` para manejar el `basePath` dinámicamente y exportar el build estático.

```typescript
// next.config.ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
const isStaging = process.env.NEXT_PUBLIC_ENV === 'staging';

// basePath condicional para GitHub Pages
// Producción (master) va en la raíz del repositorio: /Filocode
// Staging va en la subcarpeta: /Filocode/staging
const getBasePath = () => {
  if (isDev) return '';
  if (isStaging) return '/Filocode/staging';
  return '/Filocode';
};

const nextConfig: NextConfig = {
  basePath: getBasePath(),
  
  // Output estático puro requerido por GitHub Pages
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  images: {
    // Es imperativo deshabilitar la optimización automática para el export estático
    unoptimized: true,
    remotePatterns: [ { protocol: 'https', hostname: '**' } ],
  },
};

export default nextConfig;
```

> **🔥 PUNTO CIEGO (Prerender Error en Next.js 16)**: 
> Cuando Next.js tiene `output: 'export'`, si se compila pasando `NODE_ENV=development`, el motor de pre-renderizado colapsa al intentar procesar `/_global-error` por inconsistencias de Server/Client components. Por ello, el workflow de Deploy debe asegurar que `NODE_ENV=production` y que el script **nunca** se ejecute en la rama `development`.

---

## 4. 🤖 Workflow de GitHub Actions (`deploy.yml`)

Ubicación: `.github/workflows/deploy.yml`

El workflow tiene dos Jobs principales: `CI` (verificación de código) y `Deploy` (publicación).

### Requerimiento Crítico: Permisos
```yaml
permissions:
  contents: write # ⚠️ Requerido para que peaceiris/actions-gh-pages pueda crear commits en gh-pages
```

### Configuración del Job `Deploy`
```yaml
  Deploy:
    needs: CI
    # Sólo se despliega en master o staging
    if: github.event_name == 'push' && (github.ref == 'refs/heads/master' || github.ref == 'refs/heads/staging')
    runs-on: ubuntu-latest
    environment:
      # Refleja el entorno en la UI de GitHub
      name: ${{ github.ref == 'refs/heads/master' && 'production' || (github.ref == 'refs/heads/staging' && 'staging') || 'none' }}
    
    steps:
      # ... (Checkout, Setup Node, Yarn Install) ...

      - name: Build Next.js (export)
        run: |
          # Inyección dinámica de variables
          NEXT_PUBLIC_ENV=${{ github.ref == 'refs/heads/master' && 'production' || (github.ref == 'refs/heads/staging' && 'staging') || 'development' }} \
          NODE_ENV=${{ github.ref == 'refs/heads/master' && 'production' || (github.ref == 'refs/heads/staging' && 'production') || 'development' }} \
          yarn build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: out
          keep_files: true # ⚠️ Crítico para evitar que master borre a staging y viceversa
          # Asigna la subcarpeta en gh-pages dependiendo de la rama
          destination_dir: ${{ github.ref == 'refs/heads/staging' && 'staging' || '.' }}
```

---

## 5. 🛠️ Configuración de GitHub (Manual)

El proceso asume que GitHub está configurado para leer de la rama generada. 

1. En el repositorio de GitHub, ir a **Settings > Pages**.
2. **Build and deployment > Source**: Seleccionar "Deploy from a branch".
3. **Branch**: Seleccionar la rama `gh-pages` y la carpeta `/ (root)`.
4. Guardar. GitHub lanzará automáticamente su workflow interno de `pages build and deployment` cada vez que el Action de Deploy suba archivos a la rama `gh-pages`.

---

## 6. 📝 Step by Step: Cómo se configuró desde Cero

Para registro histórico y trazabilidad de los cambios que implementaron este ecosistema:

1. **Creación del Workflow**: Se creó `.github/workflows/deploy.yml` con separación de `CI` y `Deploy`.
2. **Pruebas de Fallo y Ajustes (Timeouts)**: Se añadieron `timeout-minutes` y limpieza de caché (`yarn cache clean`) debido a que la red de GitHub Actions colgaba los steps de Yarn (`fix/github-actions-timeouts`).
3. **Solución del 404 por Fallo 403 (Permisos)**: El job de Deploy fallaba al pushear a `gh-pages` con *error 128 (403 Forbidden)*. Se inyectó `permissions: contents: write` al inicio del YAML (`fix/16--github-pages-403`).
4. **Solución del 404 por Directorio Erróneo (Colisión de Ramas)**: Se determinó que ambos entornos se estaban subiendo a la raíz de `gh-pages` y sobreescribiéndose. Se añadió el parámetro `destination_dir` al Action `peaceiris/actions-gh-pages` (`fix/16--github-pages-basepath`).
5. **Solución del 404 por Miopía de Rutas (basePath)**: Next.js compilaba los archivos buscando en la raíz `/` en lugar de `/Filocode` o `/Filocode/staging`. Se parametrizó dinámicamente `basePath` en `next.config.ts`.
6. **Manejo del Punto Ciego Prerender (`/_global-error`)**: Se bloqueó terminantemente la ejecución del job de `Deploy` en la rama `development`, evitando el paso de `NODE_ENV=development` al build de exportación.
7. **Aplicación Estricta del FILO Protocol**: Todas las correcciones se codificaron en ramas `fix/` a partir de `development`. Cada paso se movió de `development` ➔ `staging` ➔ `master` a través de Pull Requests manuales (Merged by user), garantizando la regla *Primary Rule: Trunk Isolation Mandate*.

---
**RESULTADO FINAL**:
- **Producción**: `https://[user].github.io/[repo]/` (Renderizado del `destination_dir: .`)
- **Staging**: `https://[user].github.io/[repo]/staging/` (Renderizado del `destination_dir: staging`)
