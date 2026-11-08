import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', status, ...props }, ref) => {
    const sizes = {
      sm: 'w-7 h-7 text-xs',
      md: 'w-9 h-9 text-sm',
      lg: 'w-11 h-11 text-base',
    };

    const statusColors = {
      online: 'bg-emerald-500',
      offline: 'bg-slate-400',
      busy: 'bg-rose-500',
    };

    return (
      <div ref={ref} className={cn("relative inline-block select-none", className)} {...props}>
        <div className={cn("rounded-full overflow-hidden flex items-center justify-center font-bold bg-[#1E3A8A] text-white shadow-soft-xs", sizes[size])}>
          {src ? (
            <img src={src} alt={alt || fallback} className="w-full h-full object-cover" />
          ) : (
            <span>{fallback}</span>
          )}
        </div>
        {status && (
          <span 
            className={cn(
              "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white",
              statusColors[status]
            )}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";
