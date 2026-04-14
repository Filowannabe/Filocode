---
tags:
  - config
  - dev
status: documented
created: 2026-04-13
updated: 2026-04-13
---

# 📜 Scripts de Desarrollo

Referencia rápida de los comandos disponibles en `package.json` para gestionar el ciclo de vida de **filocode.dev**.

## 🛠️ Comandos Principales

| Comando | Acción | Cuándo usarlo |
| :--- | :--- | :--- |
| `npm run dev` | Inicia el entorno local. | Durante el desarrollo activo. |
| `npm run build` | Genera la carpeta `.next`. | Antes de desplegar a producción. |
| `npm run start` | Arranca el servidor de producción. | Después de hacer el build. |
| `npm run lint` | Ejecuta el análisis de ESLint. | Para asegurar la calidad del código. |

## 🏗️ Herramientas de UI

Para añadir nuevos componentes de `shadcn/ui`:

```bash
npx shadcn-ui@latest add [nombre]
```

---
## 📄 Referencias
- [[Home|Volver al Inicio]]
