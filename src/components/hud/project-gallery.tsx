"use client";

import { useState, useMemo } from 'react';
import { ProjectCard } from './project-card';
import { ProjectSkeleton } from './project-skeleton';
import { GitHubRepository } from '@/types/repositorio';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const MotionDiv = motion.div as any;

interface ProjectGalleryProps {
  initialRepos: GitHubRepository[];
  searchQuery?: string;
}

/**
 * ProjectGallery - Galería con paginación técnica.
 * v24: Soporte para highlight de búsqueda.
 */
export function ProjectGallery({ initialRepos, searchQuery = '' }: ProjectGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaginating, setIsPaginating] = useState(false);
  const itemsPerPage = 6;
  
  const totalPages = Math.ceil(initialRepos.length / itemsPerPage);
  
  const currentRepos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return initialRepos.slice(start, start + itemsPerPage);
  }, [currentPage, initialRepos]);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setIsPaginating(true);
      setCurrentPage(page);

      if (typeof window !== 'undefined') {
        const section = document.getElementById('repos-section');
        if (section) {
          window.scrollTo({ 
            top: section.offsetTop - 80, 
            behavior: 'smooth'
          });
        }
      }
      
      setTimeout(() => {
        setIsPaginating(false);
      }, 250);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="relative flex flex-col min-h-[600px]" id="repos-section">
      
      <div className="relative flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          {isPaginating ? (
            <MotionDiv 
              key="skeletons-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 content-start"
            >
              {[...Array(itemsPerPage)].map((_, i) => (
                <ProjectSkeleton key={`skeleton-${i}`} />
              ))}
            </MotionDiv>
          ) : (
            <MotionDiv 
              key={`page-data-${currentPage}`}
              
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.01, y: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 content-start"
            >
              {currentRepos.map((repo, index) => (
                <ProjectCard 
                  key={`${repo.id}-${currentPage}`} 
                  repo={repo} 
                  delay={index * 0.03}
                  searchQuery={searchQuery}
                />
              ))}
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-12 md:mt-16 pb-8">
          <nav 
            aria-label="Navegación de proyectos" 
            className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-[#020202]/80 backdrop-blur-md border border-(--color-primary)/30 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-(--color-primary)/5 via-transparent to-(--color-primary)/5 pointer-events-none" />

            <div className="flex items-center gap-1.5 z-10 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1 || isPaginating}
                className="w-10 h-10 md:w-12 md:h-12 rounded-sm flex items-center justify-center text-white/50 hover:bg-(--color-primary)/10 hover:text-(--color-primary) hover:border-(--color-primary)/50 border border-transparent transition-all disabled:opacity-10 disabled:pointer-events-none cursor-pointer"
                aria-label="Página anterior"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>

              <div className="flex sm:hidden font-mono text-[10px] text-(--color-primary) font-black tracking-widest px-4">
                PAGE_{currentPage.toString().padStart(2, '0')} {"//"} {totalPages.toString().padStart(2, '0')}
              </div>

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages || isPaginating}
                className="w-10 h-10 md:w-12 md:h-12 rounded-sm flex items-center justify-center text-white/50 hover:bg-(--color-primary)/10 hover:text-(--color-primary) hover:border-(--color-primary)/50 border border-transparent transition-all disabled:opacity-10 disabled:pointer-events-none cursor-pointer"
                aria-label="Página siguiente"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 md:gap-2 px-3 relative z-10 font-mono text-[10px]">
              {getPageNumbers().map((pageNum, idx) => (
                pageNum === '...' ? (
                  <span 
                    key={`ellipsis-${idx}`} 
                    className="w-6 md:w-8 flex justify-center text-(--color-primary)/30 font-bold tracking-widest"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => changePage(pageNum as number)}
                    disabled={isPaginating}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-sm flex items-center justify-center font-bold transition-all duration-300 border cursor-pointer",
                      currentPage === pageNum 
                        ? "bg-(--color-primary)/20 text-(--color-primary) border-(--color-primary)/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                        : "bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    {pageNum.toString().padStart(2, '0')}
                  </button>
                )
              ))}
            </div>
          </nav>
        </div>
      )}

    </div>
  );
}
