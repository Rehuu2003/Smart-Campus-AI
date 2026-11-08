import { Bell, GraduationCap, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

interface NavbarProps {
  onOpenCopilot: () => void;
  onOpenSearch: () => void;
}

export function Navbar({ onOpenCopilot, onOpenSearch }: NavbarProps) {
  return (
    <header className="h-16 border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 shadow-soft-xs">
      {/* Brand & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white shadow-soft-xs">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
              Smart Campus AI
            </span>
            <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
              Enterprise
            </span>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block">Multi-Agent Academic Assistant</p>
        </div>
      </div>

      {/* Global Search Bar (Ctrl+K) */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100/80 text-slate-500 text-xs transition cursor-pointer shadow-soft-xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search courses, attendance, fees, agents...</span>
          </div>
          <kbd className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500 shadow-2xs">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Action Controls & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="md:hidden w-9 h-9 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* AI Copilot Slide-over Trigger */}
        <Button
          onClick={onOpenCopilot}
          variant="primary"
          size="sm"
          className="shadow-soft-xs bg-[#1E3A8A] hover:bg-[#172554]"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
          <span className="hidden sm:inline">AI Copilot</span>
          <span className="sm:hidden">AI</span>
          <kbd className="hidden lg:inline-block ml-1 text-[10px] bg-blue-900/60 px-1.5 py-0.5 rounded border border-blue-400/30 font-mono">
            Ctrl+J
          </kbd>
        </Button>

        {/* Notifications */}
        <button 
          className="relative w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center transition cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-1">
          <Avatar fallback="AC" size="sm" status="online" />
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-900 leading-none">Alex Chen</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">CS-2024-104</div>
          </div>
          <Badge variant="info" className="hidden xl:inline-flex text-[10px] px-2 py-0">
            Student
          </Badge>
        </div>
      </div>
    </header>
  );
}
