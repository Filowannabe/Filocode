'use client';

import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface FilterBarProps {
  availableTopics: string[];
  activeTopic: string | null;
  onTopicChange: (topic: string | null) => void;
  theme: {
    bg: string;
    text: string;
    activeBg: string;
    activeText: string;
    border: string;
  };
}

/**
 * Barra de filtros con SINGLE SELECT
 * v13: Casting de props de animación individuales.
 */
export function FilterBar({
  availableTopics,
  activeTopic,
  onTopicChange,
  theme
}: FilterBarProps) {
  if (availableTopics.length === 0) {
    return null;
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 } as any}
      animate={{ opacity: 1, y: 0 } as any}
      transition={{ duration: 0.3 } as any}
      className="flex flex-wrap gap-3 mb-6"
    >
      <span className="text-xs font-mono uppercase tracking-wider text-gray-500" style={{ display: 'contents' }}>
        <span className="mr-2">[ FILTER: ]</span>
        
        <MotionButton
          whileHover={{ scale: 1.02 } as any}
          whileTap={{ scale: 0.98 } as any}
          onClick={() => onTopicChange(null)}
          className={`
            px-3 py-1 rounded-md font-mono text-xs tracking-wide border-2 transition-colors duration-200
            ${activeTopic === null
              ? `${theme.bg} ${theme.activeText} ${theme.border} border-amber-500`
              : 'bg-amber-500 text-gray-900 border-amber-500 hover:bg-amber-600'
            }
          `}
          data-active={activeTopic === null ? 'true' : 'false'}
        >
          [ ALL ]
        </MotionButton>

        {availableTopics.map((topic) => {
          const isActive = activeTopic === topic;
          const normalizedTopic = topic.toLowerCase();
          
          return (
            <MotionButton
              key={normalizedTopic}
              whileHover={{ scale: 1.02 } as any}
              whileTap={{ scale: 0.98 } as any}
              onClick={() => onTopicChange(topic)}
              className={`
                px-3 py-1 rounded-md font-mono text-xs tracking-wide border-2 transition-colors duration-200
                ${isActive
                  ? `${theme.bg} ${theme.activeText} ${theme.border} border-amber-500`
                  : 'bg-amber-500 text-gray-900 border-amber-500 hover:bg-amber-600'
                }
              `}
              data-active={isActive ? 'true' : 'false'}
            >
              [ {topic} ]
            </MotionButton>
          );
        })}
      </span>
    </MotionDiv>
  );
}

