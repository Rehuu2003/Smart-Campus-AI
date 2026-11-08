import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { AgentId, AGENT_REGISTRY } from '@/types/agent';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'agent';
  agentId?: AgentId;
  withDot?: boolean;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', agentId, withDot = false, children, ...props }, ref) => {
    // Standard system variants
    const systemVariants = {
      default: "bg-slate-100 text-slate-700 border-slate-200",
      success: "bg-emerald-50 text-emerald-700 border-emerald-200",
      warning: "bg-amber-50 text-amber-700 border-amber-200",
      danger: "bg-rose-50 text-rose-700 border-rose-200",
      info: "bg-blue-50 text-blue-700 border-blue-200",
      agent: "",
    };

    // Agent-specific color mappings
    let agentStyles = "";
    let dotColor = "bg-slate-500";

    if (agentId && AGENT_REGISTRY[agentId]) {
      const meta = AGENT_REGISTRY[agentId];
      agentStyles = `${meta.bgLight} ${meta.borderLight} ${meta.textLight}`;
      dotColor = meta.color;
    } else if (variant === 'success') {
      dotColor = "bg-emerald-500";
    } else if (variant === 'warning') {
      dotColor = "bg-amber-500";
    } else if (variant === 'danger') {
      dotColor = "bg-rose-500";
    } else if (variant === 'info') {
      dotColor = "bg-blue-500";
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors select-none",
          agentStyles || systemVariants[variant],
          className
        )}
        {...props}
      >
        {withDot && (
          <span 
            className="w-1.5 h-1.5 rounded-full animate-pulse" 
            style={{ backgroundColor: agentId && AGENT_REGISTRY[agentId] ? dotColor : undefined }}
          />
        )}
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";
