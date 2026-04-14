"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * useMousePosition - Hook de alto rendimiento para el rastreo del ratón.
 * Utiliza useMotionValue para evitar re-renders innecesarios.
 * Retorna valores con suavizado (spring) para una interacción orgánica.
 */
export function useMousePosition() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configuración de suavizado (spring) para un movimiento orgánico
  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Actualizamos los MotionValues directamente sin pasar por el estado de React
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return { x: smoothX, y: smoothY };
}
