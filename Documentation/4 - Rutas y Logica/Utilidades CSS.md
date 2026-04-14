---
tags:
  - utility
  - tailwind
  - styles
status: implemented
created: 2026-04-13
updated: 2026-04-13
---

# 🛠️ Utilidades CSS (cn)

Utilidad central para la gestión dinámica de clases de Tailwind CSS sin conflictos de especificidad.

## 📂 Ubicación
`src/lib/utils.ts`

## 🛠️ Uso de la función `cn`

Esta función combina `clsx` y `tailwind-merge` para permitir la concatenación de clases condicionales.

```tsx
import { cn } from "@/lib/utils"

export function MyComponent({ className }) {
  return (
    <div className={cn("bg-red-500 p-4", className)}>
      Contenido
    </div>
  )
}
```

## 💡 ¿Por qué usarla?
- **Sin conflictos**: Si pasas `p-8` como `className`, sobrescribirá correctamente el `p-4` por defecto.
- **Condicionales limpios**: Soporta sintaxis de objetos y arrays de `clsx`.

---
## 🔗 Enlaces Relacionados
- [[2 - Arquitectura/Stack Tecnologico|Stack Tecnológico]]
