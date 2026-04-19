"use client";

import { cn } from "@/lib/utils";

interface TerminalContactProps {
  className?: string;
}

/**
 * TerminalContact - Prompt de terminal interactivo.
 * v11: Solo prompt (botón movido a Hero para mejor UX).
 */
export function TerminalContact({ className }: TerminalContactProps) {
  return (
    <div className={cn("font-mono space-y-2 w-full", className)}>
      <div className="text-xs sm:text-sm break-all sm:break-normal">
        <span className="text-primary">filocode@sys:~$</span>
        <span className="text-white/80 ml-2">./init_protocol.sh --contact</span>
      </div>
    </div>
  );
}
