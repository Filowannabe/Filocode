# GEMINI MANDATES

## 🛐 SACRED MANDATE: COMMIT AUTHORIZATION
- **QUEDA TERMINANTEMENTE PROHIBIDO REALIZAR CUALQUIER COMMIT SIN LA AUTORIZACIÓN EXPLÍCITA Y ESPECÍFICA DEL HUMANO (ARQUITECTO).**
- La palabra clave `APROBADO` es mandatoria para cualquier persistencia.

## Package Management
- **MANDATORY**: Use `yarn` for all operations (install, dev, build, etc.).
- **FORBIDDEN**: Do not use `npm` or `npx`. The project uses Yarn 4 (Berry).
- If `yarn.lock` is desynced, run `yarn install`.

## Environment
- Port: 3000 (Default)
- Tech Stack: Next.js 16 (Turbo), React 19, TailwindCSS, Vitest.
