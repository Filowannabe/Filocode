"use client";

import { motion, useMotionTemplate } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";

const MotionDiv = motion.div as any;

/**
 * FlashlightEffect - Halo de luz HUD.
 * v12: Restaurado uso directo de motion para asegurar animaciones vivas.
 */
export function FlashlightEffect() {
  const { x, y } = useMousePosition();

  const background = useMotionTemplate`radial-gradient(
    600px circle at ${x}px ${y}px,
    var(--color-primary),
    transparent 80%
  )`;

  return (
    <MotionDiv
      className="pointer-events-none fixed inset-0 z-50 opacity-15 mix-blend-soft-light"
      style={{
        background,
      }}
      aria-hidden="true"
    />
  );
}
