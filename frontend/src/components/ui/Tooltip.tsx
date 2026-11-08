import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
    left: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
    right: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
  };

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div 
          role="tooltip"
          className={cn(
            "absolute z-50 px-2 py-1 text-[11px] font-semibold text-white bg-slate-900 rounded shadow-md whitespace-nowrap pointer-events-none transition-opacity",
            positions[position],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
