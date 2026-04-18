import { cn } from "@/lib/utils";

/**
 * ProjectSkeleton PRO-MAX v21 (Espejo Pixel-Perfect)
 * Refleja EXACTAMENTE la estructura de ProjectCard v20.
 * Mismo padding (p-7), redondeado (rounded-2xl) y layout.
 */
export function ProjectSkeleton() {
  return (
    <div className={cn(
        "group relative flex flex-col justify-between h-full min-h-[300px] p-[1px] rounded-2xl overflow-hidden",
        "bg-primary/10 shadow-lg animate-pulse"
      )}>
      <div className="relative z-10 flex flex-col justify-between h-full bg-[#020202] rounded-[15px] p-7">
        
        {/* Glow Skeleton */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header Skeleton */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 shrink-0" />
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 shrink-0" />
          </div>

          {/* Title & Description Skeleton */}
          <div className="grow flex flex-col justify-start mb-6 gap-4">
            <div className="h-6 w-3/4 bg-white/10 rounded-sm" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-white/5 rounded-sm" />
              <div className="h-3 w-5/6 bg-white/5 rounded-sm" />
              <div className="h-3 w-4/6 bg-white/5 rounded-sm" />
            </div>
          </div>

          {/* Topics Skeleton - Pills Style */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="h-6 w-16 bg-primary/5 rounded-full border border-white/5" />
            <div className="h-6 w-20 bg-primary/5 rounded-full border-white/5" />
          </div>

          {/* Footer Skeleton */}
          <div className="flex items-center justify-between pt-5 border-t border-white/10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-4 bg-white/5 rounded-sm" />
              <div className="w-12 h-4 bg-white/5 rounded-sm" />
            </div>
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * GallerySkeleton - Estructura espejo de ProjectSection.tsx.
 * v21: Restaurado header de carga para evitar saltos visuales.
 */
export function GallerySkeleton() {
  return (
    <>
      {/* Header Skeleton Mirroring ProjectSection */}
      <div className="flex flex-col gap-3 border-b border-white/10 pb-6 mb-8">
        <div className="h-10 w-64 bg-white/10 animate-pulse rounded-md" />
        <div className="h-5 w-full max-w-2xl bg-white/5 animate-pulse rounded-sm mt-2" />
        <div className="h-5 w-3/4 max-w-xl bg-white/5 animate-pulse rounded-sm" />
      </div>

      <div className="relative flex flex-col min-h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 content-start">
          {[...Array(6)].map((_, i) => (
            <ProjectSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
        
        {/* Pagination Skeleton Mirroring ProjectGallery */}
        <div className="flex justify-center mt-16 pb-8">
          <div className="w-64 h-14 bg-white/5 animate-pulse rounded-2xl border border-white/10" />
        </div>
      </div>
    </>
  );
}
