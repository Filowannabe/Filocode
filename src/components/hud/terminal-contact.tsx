"use client";

import { cn } from "@/lib/utils";

interface TerminalContactProps {
  className?: string;
}

/**
 * TerminalContact - Prompt de terminal interactivo.
 * v10: primary shorthand, cero arbitrary brackets.
 */
export function TerminalContact({ className }: TerminalContactProps) {
  return (
    <div className={cn("font-mono space-y-4 w-full", className)}>
      <div className="text-xs sm:text-sm break-all sm:break-normal">
        <span className="text-primary">filocode@sys:~$</span>
        <span className="text-white/80 ml-2">./init_protocol.sh --contact</span>
      </div>
      
      <div className="pt-2">
        <a 
          href="mailto:contacto@filocode.dev"
          aria-label="Iniciar transmisión de correo electrónico"
          className={cn(
            "inline-block border border-primary px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[10px] sm:text-sm font-bold uppercase tracking-wider text-primary",
            "transition-all duration-300 hover:bg-primary hover:text-black active:scale-95",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none w-full sm:w-auto text-center"
          )}
        >
          [ INICIAR TRANSMISIÓN ]
        </a>
      </div>
    </div>
  );
}
