"use client";

import React, { useEffect, useState } from "react";

// Pre-generated random values to ensure purity during render and avoid hydration mismatches
const STATIC_PARTICLES = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  left: `${(i * 137.5) % 100}%`, // Deterministic "random-like" distribution
  top: `${-10 - (i * 7.3) % 20}%`,
  delay: `${(i * 0.5) % 20}s`,
  duration: `${5 + (i * 0.3) % 10}s`,
  opacity: 0.2 + (i * 0.01) % 0.6,
  blur: `blur(${(i * 0.1) % 2}px)`
}));

export function SnowParticles({ count = 80 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) return null;

  // Use a stable slice of pre-generated particles
  const particles = STATIC_PARTICLES.slice(0, count);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div 
          key={p.id}
          className="absolute w-[2px] h-[2px] bg-white rounded-full animate-snow shadow-[0_0_12px_white]"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            filter: p.blur
          }}
        />
      ))}
    </div>
  );
}
