import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  GraduationCap, 
  LayoutDashboard, 
  Bot, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { AGENT_REGISTRY } from '@/types/agent';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenCopilot: () => void;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  onOpenCopilot,
}: MobileNavDrawerProps) {
  const { user, logout } = useAuthStore();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant', label: 'AI Copilot View', icon: Bot, badge: 'Full View' },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle2, badge: '84.5%' },
    { id: 'timetable', label: 'Timetable', icon: Calendar, badge: '3 Today' },
    { id: 'fees', label: 'Fee Ledger', icon: CreditCard },
    { id: 'assignments', label: 'Assignments', icon: FileText, badge: '1 Due' },
    { id: 'exams', label: 'Examinations', icon: GraduationCap },
    { id: 'analytics', label: 'Observability', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Drawer Menu (Slide from Left) */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between z-10"
          >
            {/* Top Brand & User Card */}
            <div>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white shadow-soft-xs">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                      Smart Campus AI
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                      Mobile Portal
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Summary */}
              {user && (
                <div className="p-3.5 mx-3 mt-3 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center gap-3">
                  <Avatar fallback={user.name.split(' ').map(n => n[0]).join('')} size="sm" status="online" />
                  <div className="flex-1 truncate">
                    <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">{user.identifier}</div>
                  </div>
                  <Badge variant="info" className="text-[9px] px-1.5 py-0 capitalize">
                    {user.role}
                  </Badge>
                </div>
              )}

              {/* Navigation Links */}
              <div className="p-3 space-y-1 mt-1 overflow-y-auto max-h-[calc(100vh-22rem)]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1E3A8A] text-white shadow-soft-xs font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-bold ${
                          isActive 
                            ? 'bg-blue-900/60 text-blue-200 border-blue-400/30' 
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions: Quick Copilot Trigger & Sign Out */}
            <div className="p-3 border-t border-slate-200 space-y-2 bg-slate-50/50">
              <button
                onClick={() => {
                  onClose();
                  onOpenCopilot();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white text-xs font-bold shadow-soft-xs transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
                <span>Open Slide-over AI Copilot</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl hover:bg-rose-50 text-rose-600 text-xs font-semibold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Terminal</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
