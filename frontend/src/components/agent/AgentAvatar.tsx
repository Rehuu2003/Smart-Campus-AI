import { 
  Bot, 
  CheckCircle2, 
  CreditCard, 
  GraduationCap, 
  Calendar, 
  FileText, 
  HelpCircle,
  LucideIcon
} from 'lucide-react';
import { AgentId, AGENT_REGISTRY } from '@/types/agent';
import { cn } from '@/lib/utils';

export interface AgentAvatarProps {
  agentId: AgentId;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  status?: 'online' | 'busy' | 'idle';
  className?: string;
  showGlow?: boolean;
}

const AGENT_ICONS: Record<AgentId, LucideIcon> = {
  coordinator: Bot,
  attendance: CheckCircle2,
  fee: CreditCard,
  exam: GraduationCap,
  timetable: Calendar,
  assignment: FileText,
  support: HelpCircle,
};

export function AgentAvatar({
  agentId,
  size = 'md',
  status = 'online',
  className,
  showGlow = false,
}: AgentAvatarProps) {
  const meta = AGENT_REGISTRY[agentId] || AGENT_REGISTRY.coordinator;
  const Icon = AGENT_ICONS[agentId] || Bot;

  const sizes = {
    xs: 'w-6 h-6 rounded-md',
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
  };

  const iconSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const statusDotSizes = {
    xs: 'w-1.5 h-1.5 ring-1',
    sm: 'w-2 h-2 ring-1.5',
    md: 'w-2.5 h-2.5 ring-2',
    lg: 'w-3 h-3 ring-2',
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center shrink-0", className)}>
      {/* Background Icon Container */}
      <div
        className={cn(
          "flex items-center justify-center border transition-all select-none shadow-2xs",
          sizes[size],
          showGlow && "shadow-soft-sm"
        )}
        style={{
          backgroundColor: `${meta.color}15`,
          borderColor: `${meta.color}35`,
          color: meta.color,
        }}
      >
        <Icon className={iconSizes[size]} />
      </div>

      {/* Status Pulse Indicator */}
      {status && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 rounded-full ring-white",
            statusDotSizes[size],
            status === 'online' && "bg-emerald-500 animate-pulse",
            status === 'busy' && "bg-amber-500 animate-ping",
            status === 'idle' && "bg-slate-400"
          )}
        />
      )}
    </div>
  );
}
