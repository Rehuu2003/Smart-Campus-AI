import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none active:scale-[0.98]";

    const variants = {
      primary: "bg-[#1E3A8A] hover:bg-[#172554] text-white shadow-soft-xs focus:ring-[#1E3A8A]",
      secondary: "bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-400",
      outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-soft-xs focus:ring-slate-300",
      ghost: "hover:bg-slate-100 text-slate-700 focus:ring-slate-300",
      danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-soft-xs focus:ring-rose-500",
      subtle: "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 focus:ring-blue-400",
    };

    const sizes = {
      xs: "text-xs px-2.5 py-1 gap-1",
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-5 py-2.5 gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
