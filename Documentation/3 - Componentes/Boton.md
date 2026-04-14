---
tags:
  - component
  - ui
  - shadcn
status: implemented
created: 2026-04-13
updated: 2026-04-13
---

# 🎨 Botón (Button)

Componente base de interacción del sistema, basado en `shadcn/ui`.

## 📂 Ubicación
`src/components/ui/button.tsx`

## 🛠️ Uso

```tsx
import { Button } from "@/components/ui/button"

export default function MyPage() {
  return (
    <Button variant="default" size="lg">
      ¡Haz clic aquí!
    </Button>
  )
}
```

## ⚙️ Variantes Disponibles

| Variante | Propósito |
| :--- | :--- |
| `default` | Botón principal de la acción. |
| `destructive` | Acciones peligrosas (ej. borrar). |
| `outline` | Acciones secundarias con borde. |
| `secondary` | Alternativa visual menos llamativa. |
| `ghost` | Sin fondo ni bordes, para acciones discretas. |
| `link` | Estilo de enlace de hipertexto. |

## 📐 Tamaños

- `default`: Tamaño estándar.
- `sm`: Botón compacto.
- `lg`: Botón grande para CTAs.
- `icon`: Botón cuadrado para iconos solamente.

---
## 🔗 Enlaces Relacionados
- [[3 - Componentes/UI|Lista Maestra de Componentes]]
