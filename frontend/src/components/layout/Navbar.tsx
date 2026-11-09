import { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  GraduationCap, 
  Search, 
  Sparkles, 
  LogOut, 
  UserCheck, 
  ChevronDown,
  Shield,
  BookOpen,
  Users,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types/auth';

interface NavbarProps {
  onOpenCopilot: () => void;
  onOpenSearch: () => void;
}

export function Navbar({ onOpenCopilot, onOpenSearch }: NavbarProps) {
  const { user, switchRole, logout } = useAuthStore();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'student': return 'info';
      case 'faculty': return 'success';
      case 'admin': return 'warning';
      default: return 'default';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'student': return 'Student';
      case 'faculty': return 'Faculty';
      case 'admin': return 'Administrator';
    }
  };

  return (
    <header className="h-16 border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 shadow-soft-xs">
      {/* Brand */}
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

      {/* Action Controls & Interactive Profile Menu */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="md:hidden w-9 h-9 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* AI Copilot Trigger Button */}
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

        {/* Notifications Button */}
        <button 
          className="relative w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center transition cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

        {/* User Profile Pill & Dropdown */}
        {user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition cursor-pointer text-left select-none"
            >
              <Avatar 
                fallback={user.name.split(' ').map(n => n[0]).join('')} 
                size="sm" 
                status="online" 
              />
              <div className="hidden lg:block">
                <div className="text-xs font-bold text-slate-900 leading-none">
                  {user.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {user.identifier}
                </div>
              </div>
              <Badge variant={getRoleBadgeVariant(user.role)} className="hidden xl:inline-flex text-[10px] px-2 py-0">
                {getRoleLabel(user.role)}
              </Badge>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-soft-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* User Info Header */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-2">
                  <div className="font-bold text-xs text-slate-900">{user.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{user.email}</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {user.title || user.department}
                  </div>
                </div>

                {/* Role Switcher Menu */}
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-blue-700" />
                  Quick Role Switcher
                </div>

                <div className="space-y-0.5 mb-2">
                  <button
                    onClick={() => {
                      switchRole('student');
                      setProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition cursor-pointer ${
                      user.role === 'student' ? 'bg-blue-50 font-bold text-blue-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      Student (Alex Chen)
                    </span>
                    {user.role === 'student' && <span className="text-[10px] text-blue-600 font-bold">Active</span>}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('faculty');
                      setProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition cursor-pointer ${
                      user.role === 'faculty' ? 'bg-emerald-50 font-bold text-emerald-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      Faculty (Dr. Verma)
                    </span>
                    {user.role === 'faculty' && <span className="text-[10px] text-emerald-600 font-bold">Active</span>}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('admin');
                      setProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition cursor-pointer ${
                      user.role === 'admin' ? 'bg-amber-50 font-bold text-amber-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-amber-600" />
                      Admin (Dean Roberts)
                    </span>
                    {user.role === 'admin' && <span className="text-[10px] text-amber-600 font-bold">Active</span>}
                  </button>
                </div>

                <div className="h-[1px] bg-slate-100 my-1" />

                {/* Logout Button */}
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
