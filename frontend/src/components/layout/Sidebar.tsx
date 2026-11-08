import { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  FileText, 
  GraduationCap, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/Tooltip';
import { AGENT_REGISTRY } from '@/types/agent';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenCopilot: () => void;
}

export function Sidebar({ activeTab, onTabChange, onOpenCopilot }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle2, badge: '84.5%' },
    { id: 'timetable', label: 'Timetable', icon: Calendar, badge: '3 Today' },
    { id: 'fees', label: 'Fee Ledger', icon: CreditCard },
    { id: 'assignments', label: 'Assignments', icon: FileText, badge: '1 Due' },
    { id: 'exams', label: 'Examinations', icon: GraduationCap },
    { id: 'analytics', label: 'Observability', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "h-[calc(100vh-4rem)] border-r border-slate-200/90 bg-white select-none transition-all duration-300 flex flex-col justify-between shrink-0 shadow-soft-xs",
        isCollapsed ? "w-18" : "w-64"
      )}
    >
      {/* Top Nav List */}
      <div className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          const buttonContent = (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer relative",
                isActive 
                  ? "bg-[#1E3A8A] text-white shadow-soft-xs" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-slate-500")} />
              
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between text-left truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span 
                      className={cn(
                        "text-[10px] font-mono px-1.5 py-0.2 rounded border font-bold",
                        isActive 
                          ? "bg-blue-900/60 text-blue-200 border-blue-400/30" 
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );

          if (isCollapsed) {
            return (
              <Tooltip key={item.id} content={item.label} position="right" className="z-50">
                {buttonContent}
              </Tooltip>
            );
          }

          return buttonContent;
        })}
      </div>

      {/* Bottom Section: Fleet Status & Collapse Trigger */}
      <div className="p-3 border-t border-slate-200/90 space-y-3">
        {/* Agent Fleet Quick Banner */}
        {!isCollapsed ? (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1E3A8A]" />
                Agent Fleet
              </span>
              <span className="text-[10px] text-emerald-600 font-mono font-semibold">7 Online</span>
            </div>
            {/* Dots */}
            <div className="flex items-center justify-between pt-1">
              {Object.values(AGENT_REGISTRY).map((agent) => (
                <Tooltip key={agent.id} content={`${agent.shortName}: Online`} position="top">
                  <span 
                    className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-xs cursor-pointer hover:scale-125 transition"
                    style={{ backgroundColor: agent.color }}
                  />
                </Tooltip>
              ))}
            </div>
            <button
              onClick={onOpenCopilot}
              className="w-full text-center text-[11px] text-blue-700 font-bold hover:underline block pt-1"
            >
              Ask AI Assistant →
            </button>
          </div>
        ) : (
          <Tooltip content="7 Agents Online" position="right">
            <div className="w-10 h-10 mx-auto rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1E3A8A] cursor-pointer hover:bg-blue-100 transition">
              <Sparkles className="w-4 h-4" />
            </div>
          </Tooltip>
        )}

        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 text-xs font-semibold transition cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse Sidebar</span></>}
        </button>
      </div>
    </aside>
  );
}
