"use client";

/**
 * LinkPreview para enlaces de despliegue
 * Issue #3 — Fechas y Enlaces Demo
 * 
 * Botón de sistema `[ VER_DESPLIEGUE ]`
 */

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const MotionButton = motion.button as any;

interface LinkPreviewProps {
  url: string | null;
  label?: string;
}

export function LinkPreview({ url, label = "VER_DESPLIEGUE" }: LinkPreviewProps) {
  const isValidUrl = url && typeof url === "string" && (
    url.startsWith("http://") || url.startsWith("https://")
  );

  if (!isValidUrl) return null;

  return (
    <MotionButton
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 0 20px rgba(251, 191, 36, 0.5)" 
      }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-500/20 hover:border-amber-500/60 transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.1)] hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
    >
      <span>{label}</span>
      <ExternalLink size={14} />
    </MotionButton>
  );
}
