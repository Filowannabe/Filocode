"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string | StaticImageData;
  alt: string;
}

const MotionDiv = motion.div as any;

/**
 * ImageLightbox - Componente centralizado para visualización Fullscreen.
 * Estética HUD con cierre por click-out y tecla ESC.
 */
export function ImageLightbox({ isOpen, onClose, src, alt }: ImageLightboxProps) {
  // Manejo de tecla ESC para accesibilidad
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out"
          onClick={onClose}
        >
          {/* BOTÓN CIERRE */}
          <MotionDiv 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-8 right-8 z-10"
          >
            <button 
              onClick={onClose}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors group"
            >
              <X className="text-white/60 group-hover:text-amber-500 transition-colors" size={24} />
            </button>
          </MotionDiv>

          {/* CONTENEDOR IMAGEN */}
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-7xl max-h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              priority
            />
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}

/**
 * ExpandIndicator - Icono para indicar que la imagen es expandible.
 * Siempre visible con pulso sutil para mejorar el descubrimiento en Mobile.
 */
export function ExpandIndicator() {
  return (
    <div className="absolute top-4 right-4 z-20 pointer-events-none">
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="p-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-lg shadow-xl cursor-pointer"
      >
        <Maximize2 size={16} className="text-amber-500" />
      </motion.div>
    </div>
  );
}
