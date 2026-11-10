import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AgentId } from '@/types/agent';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'agent';
  agentId?: AgentId;
  icon?: LucideIcon;
  progressValue?: number;
  progressColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  onClick?: () => void;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  badgeText,
  badgeVariant = 'default',
  agentId,
  icon: Icon,
  progressValue,
  progressColor = 'bg-emerald-500',
  trend,
  onClick,
  className,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="h-full"
    >
      <Card
        onClick={onClick}
        className={cn(
          "h-full flex flex-col justify-between hover:border-slate-300 hover:shadow-soft-sm transition-all",
          onClick && "cursor-pointer",
          className
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Icon className="w-3.5 h-3.5" />
              </div>
            )}
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {title}
            </span>
          </div>

          {badgeText && (
            <Badge variant={badgeVariant} agentId={agentId} withDot>
              {badgeText}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-900 tracking-tight">
              {value}
            </span>

            {trend && (
              <span
                className={cn(
                  "text-xs font-bold px-1.5 py-0.5 rounded border",
                  trend.isPositive
                    ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                    : "text-rose-700 bg-rose-50 border-rose-200"
                )}
              >
                {trend.value}
              </span>
            )}
          </div>

          {progressValue !== undefined && (
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn("h-full rounded-full", progressColor)}
              />
            </div>
          )}

          {subtitle && (
            <p className="text-xs text-slate-500 pt-0.5">{subtitle}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
