"use client";

import { motion, useMotionTemplate } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";

/**
 * FlashlightEffect - Componente HUD que genera un halo de luz ámbar 
 * siguiendo el cursor del ratón para crear profundidad atmosférica.
 */
export function FlashlightEffect() {
  const { x, y } = useMousePosition();

  // Generamos el gradiente radial dinámico de forma eficiente
  const background = useMotionTemplate`radial-gradient(
    600px circle at ${x}px ${y}px,
    var(--color-primary),
    transparent 80%
  )`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 opacity-15 mix-blend-soft-light"
      style={{
        background,
      }}
      aria-hidden="true"
    />
  );
}
