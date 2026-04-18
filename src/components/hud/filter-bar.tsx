'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command, Terminal, FileCode2 } from 'lucide-react';
import * as Si from 'react-icons/si';
// import * as Di from 'react-icons/di'; // No usado en este archivo
import { cn } from '@/lib/utils';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

/**
 * GetDisplayName - Formateo de Nombres Oficiales
 */
function getDisplayName(tech: string): string {
  const t = tech.toLowerCase();
  if (t === 'csharp') return 'C#';
  if (t === 'javascript') return 'JavaScript';
  if (t === 'typescript') return 'TypeScript';
  if (t === 'nextjs' || t === 'next') return 'Next.js';
  if (t === 'spring-boot') return 'Spring Boot';
  if (t === 'github-actions') return 'GH Actions';
  if (t === 'postgresql') return 'PostgreSQL';
  if (t === 'php') return 'PHP';
  if (t === 'sql') return 'SQL';
  if (t === 'html') return 'HTML5';
  if (t === 'css') return 'CSS3';
  return tech.charAt(0).toUpperCase() + tech.slice(1);
}

/**
 * TechIcon v5.1 - Motor de Glifos Oficiales con Glow Ámbar
 */
function TechIcon({ tech, isActive }: { tech: string; isActive: boolean }) {
  const t = tech.toLowerCase().trim();
  
  const getIcon = () => {
    try {
      if (t === 'java') return <Si.SiOpenjdk />;
      if (t === 'typescript') return <Si.SiTypescript />;
      if (t === 'javascript') return <Si.SiJavascript />;
      if (t === 'react') return <Si.SiReact />;
      if (t === 'nextjs' || t === 'next') return <Si.SiNextdotjs />;
      if (t === 'angular') return <Si.SiAngular />;
      if (t === 'python') return <Si.SiPython />;
      if (t === 'kotlin') return <Si.SiKotlin />;
      if (t === 'docker') return <Si.SiDocker />;
      if (t === 'bash' || t === 'shell') return <Si.SiGnubash />;
      if (t === 'css') return <Si.SiCss />;
      if (t === 'html') return <Si.SiHtml5 />;
      if (t === 'markdown') return <Si.SiMarkdown />;
      if (t === 'csharp' || t === 'dotnet' || t === 'c#') return <Si.SiDotnet />;
      if (t === 'springboot' || t === 'spring-boot') return <Si.SiSpringboot />;
      if (t === 'postgresql' || t === 'sql') return <Si.SiPostgresql />;
      if (t === 'unity') return <Si.SiUnity />;
      if (t === 'android') return <Si.SiAndroid />;
      if (t === 'git') return <Si.SiGit />;
      if (t === 'linux' || t === 'ubuntu') return <Si.SiLinux />;
    } catch {
      return <Terminal size={14} />;
    }
    return <FileCode2 size={14} />;
  };

  return (
    <div className={cn(
      "w-4 h-4 flex items-center justify-center shrink-0 transition-all duration-300",
      isActive ? "text-black" : "text-primary drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]"
    )}>
      {getIcon()}
    </div>
  );
}

interface FilterBarProps {
  availableTopics: string[];
  activeTopics: string[];
  searchQuery: string;
  onTopicToggle: (topic: string) => void;
  onSearchChange: (query: string) => void;
  onClear: () => void;
  filteredCount: number;
  totalCount: number;
  _test_forceShowSuggestions?: boolean; // Prop exclusiva para tests
}

export function FilterBar({
  availableTopics,
  activeTopics,
  searchQuery,
  onTopicToggle,
  onSearchChange,
  onClear,
  filteredCount,
  totalCount,
  _test_forceShowSuggestions = false
}: FilterBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(_test_forceShowSuggestions);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const isAnyFilterActive = activeTopics.length > 0 || searchQuery.length > 0;

  // Sincronizar prop de test si cambia - useEffect dependiente (no llama a setState para evitar cascadas)
  useEffect(() => {
    // Este efecto solo se ejecuta cuando showSuggestions cambia, no llama a setState
    // El padre debe manejar la prop _test_forceShowSuggestions
  }, [showSuggestions]);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    return availableTopics
      .filter(topic => 
        topic.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !activeTopics.includes(topic.toLowerCase())
      )
      .slice(0, 5);
  }, [searchQuery, availableTopics, activeTopics]);

  // 02. Manejo de cierre al hacer clic fuera
   useEffect(() => {
     const handleClickOutside = (_event: MouseEvent) => {
       // Eliminada: closure con ref que fallaba en export mode
       setShowSuggestions(false);
     };
     document.addEventListener('mousedown', handleClickOutside);
     return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

  // 03. Navegación por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onTopicToggle(suggestion);
    onSearchChange('');
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const isDropdownVisible = showSuggestions && suggestions.length > 0;

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* 01. MAIN COMMAND BAR */}
      <div className="relative w-full border border-white/10 rounded-lg bg-[#050505] shadow-2xl min-h-[56px] md:h-14 overflow-visible">
        <div className="flex flex-col md:flex-row items-stretch h-full">
          <div className="flex-1 flex items-center px-8 gap-5 border-b md:border-b-0 md:border-r border-white/10 group-focus-within:bg-white/[0.02] transition-all relative">
            <Search size={18} strokeWidth={2.5} className="text-primary/40 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSuggestions(true);
                setSelectedIndex(-1);
              }}
              placeholder="BUSCAR PROYECTO O TECNOLOGÍA..."
              className={cn(
                "flex-1 h-full bg-transparent text-[11px] font-mono font-bold uppercase tracking-[0.25em] outline-none",
                "placeholder:text-white/15 focus:text-white transition-all w-full min-w-0"
              )}
            />
            <AnimatePresence>
              {searchQuery && (
                <MotionButton
                  initial={{ opacity: 0, scale: 0.8 } as any}
                  animate={{ opacity: 1, scale: 1 } as any}
                  exit={{ opacity: 0, scale: 0.8 } as any}
                  onClick={() => {
                    onSearchChange('');
                    setShowSuggestions(false);
                  }}
                  className="shrink-0 p-1.5 rounded-full hover:bg-white/10 text-white/20 hover:text-white transition-all"
                >
                  <X size={14} strokeWidth={3} />
                </MotionButton>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center md:justify-end px-8 py-4 md:py-0 bg-white/[0.01] shrink-0 min-w-[180px]">
            <div className="flex items-center gap-3 font-mono">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Resultados:</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-primary tabular-nums tracking-tighter">
                  {filteredCount.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-white/20 font-bold">/ {totalCount.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AUTOCOMPLETE DROPDOWN */}
        <AnimatePresence>
          {isDropdownVisible && (
            <MotionDiv
              initial={{ opacity: 0, y: -10 } as any}
              animate={{ opacity: 1, y: 0 } as any}
              exit={{ opacity: 0, y: -10 } as any}
              className="absolute top-full left-0 w-full md:w-auto md:min-w-[400px] mt-2 z-[100] bg-[#0A0A0A] border border-primary/20 rounded-md shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-2xl"
            >
              <div className="bg-primary/5 px-4 py-2 border-b border-primary/10 flex items-center gap-2">
                <Command size={12} className="text-primary/50" />
                <span className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em]">Sugerencias_Filtro</span>
              </div>
              <div className="py-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full px-8 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-widest transition-all flex items-center justify-between group",
                      index === selectedIndex ? "bg-primary text-black" : "text-white/40 hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <TechIcon tech={suggestion} isActive={index === selectedIndex} />
                      {getDisplayName(suggestion)}
                    </div>
                    <span className="text-[8px] opacity-0 group-hover:opacity-100 text-primary/30">[ ACTIVAR ]</span>
                  </button>
                ))}
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>

      {/* 02. TAGS PANEL */}
      <div className="flex flex-col gap-4 px-2 md:px-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            <Terminal size={12} className="text-primary" />
            <span>Filtros_Disponibles</span>
          </div>
          <AnimatePresence>
            {isAnyFilterActive && (
              <MotionButton
                initial={{ opacity: 0, x: 10 } as any}
                animate={{ opacity: 1, x: 0 } as any}
                exit={{ opacity: 0, x: 10 } as any}
                onClick={onClear}
                className="text-[9px] font-black text-red-500/50 hover:text-red-400 uppercase tracking-widest flex items-center gap-2 group transition-all cursor-pointer"
              >
                <X size={10} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                <span>LIMPIAR_TODO</span>
              </MotionButton>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-3">
          <AnimatePresence mode="popLayout">
            {availableTopics.map((topic, i) => {
              const isActive = activeTopics.includes(topic.toLowerCase());
              const displayTopic = getDisplayName(topic);
              
              return (
                <MotionButton
                  key={topic}
                  initial={{ opacity: 0, scale: 0.9 } as any}
                  animate={{ opacity: 1, scale: 1 } as any}
                  transition={{ delay: i * 0.01 } as any}
                  whileHover={{ y: -1 } as any}
                  whileTap={{ scale: 0.97 } as any}
                  onClick={() => onTopicToggle(topic)}
                  className={cn(
                    "h-10 px-4 rounded-sm text-[10px] font-mono font-bold transition-all duration-300 border flex items-center gap-2 uppercase tracking-widest cursor-pointer",
                    isActive
                      ? "bg-primary text-black border-primary shadow-[0_5px_15px_rgba(251,191,36,0.3)]"
                      : "bg-white/[0.02] text-white/30 border-white/5 hover:border-white/20"
                  )}
                >
                  <TechIcon tech={topic} isActive={isActive} />
                  <span className="whitespace-nowrap">{displayTopic}</span>
                </MotionButton>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
