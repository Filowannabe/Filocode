# Patrón de Animación RAF con Función Interna (ESLint-Compliant)

## Problema
ESLint detecta recursión dentro de `useCallback` como anti-pattern con el error:
```
"Cannot access variable before it is declared"
```

Esto ocurre cuando se intenta llamar recursivamente a una función declarada dentro de `useCallback`:
```typescript
// ❌ WRONG — ESLint Error
const startAnimation = useCallback(async (isRecursive = false) => {
  if (condition) {
    setTimeout(() => startAnimation(true), 50); // Error de orden
  }
}, [deps]);
```

## Solución: Patrón RAF con Función Interna

### Ejemplo: Selector Móvil Infinito
```typescript
const startMobileMarquee = useCallback(() => {
  let animationFrameId: number;
  
  // ✅ Función interna nombrada — evita error ESLint
  const loop = () => {
    if (!ref.current || viewMode !== 'console' || isTest) {
      cancelAnimationFrame(animationFrameId);
      return;
    }
    
    const halfWidth = ref.current.scrollWidth / 2;
    if (halfWidth <= 0) {
      cancelAnimationFrame(animationFrameId);
      return;
    }

    // Lógica de animación
    const currentX = mobileX.get();
    if (currentX <= -halfWidth) {
      mobileX.set(0);
    } else {
      const remainingDistance = halfWidth + mobileX.get();
      const duration = remainingDistance / 25;
      
      mobileControls.start({
        x: -halfWidth,
        transition: { duration, ease: "linear" }
      });
    }
    
    // ✅ Recursión segura usando nombre de función interna
    animationFrameId = requestAnimationFrame(loop);
  };

  // Iniciar el loop
  animationFrameId = requestAnimationFrame(loop);
  
  // Retornar cleanup para useEffect
  return () => cancelAnimationFrame(animationFrameId);
}, [mobileControls, mobileX, viewMode, isTest]);
```

## Ventajas

1. **Rendimiento óptimo**: `requestAnimationFrame` sincronizado con el refresh rate
2. **ESLint-compliant**: La función interna es visible antes de usarse
3. **Cleanup seguro**: El ID del frame se cancela al desmontar
4. **React 19 ready**: Funciona con Server Components y Client Components

## Diferencia con setTimeout

| Aspecto | setTimeout (PROHIBIDO) | requestAnimationFrame (RECOMENDADO) |
|---------|------------------------|-------------------------------------|
| **Rendimiento** | Desincronizado, puede acumularse | Sincronizado con refresh rate |
| **Recursión** | Error ESLint con useCallback | Función interna válida |
| **Consumo** | Puede disparar múltiples frames | Un frame por ciclo de visualización |
| **Cancelación** | Necesita timeoutId | cancelAnimationFrame() |

## Uso en `collaborations-archive.tsx`

Este patrón se aplicó a:
- `startMobileMarquee()` — Selector móvil infinito
- `startMarquee()` — Carousel principal

Ambos ahora usan `requestAnimationFrame` con funciones internas para evitar errores de ESLint y maximizar rendimiento.

## Referencias

- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- [React Best Practices: Animations](https://react.dev/reference/react/useAnimationFrame)
- ESLint Rule: `no-use-before-define`
