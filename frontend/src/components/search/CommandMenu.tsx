import { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  FileText, 
  GraduationCap, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { AGENT_REGISTRY, AgentId } from '@/types/agent';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (query: string) => void;
}

export function CommandMenu({ isOpen, onClose, onSelectAction }: CommandMenuProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle global shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    {
      id: 'attendance-check',
      label: 'Check CS301 Attendance & Miss Threshold',
      category: 'Attendance Agent',
      agentId: 'attendance' as AgentId,
      icon: CheckCircle2,
      query: 'What is my CS301 attendance and how many classes can I safely miss?',
    },
    {
      id: 'fee-status',
      label: 'View Outstanding Tuition Balance & Invoices',
      category: 'Fee & Finance Agent',
      agentId: 'fee' as AgentId,
      icon: CreditCard,
      query: 'Show my pending fee balance and receipts',
    },
    {
      id: 'timetable-today',
      label: "Today's Lecture Schedule & Room Allocations",
      category: 'Timetable Agent',
      agentId: 'timetable' as AgentId,
      icon: Calendar,
      query: 'What is my class schedule for today?',
    },
    {
      id: 'assignment-deadlines',
      label: 'Upcoming Lab Submissions & Deadlines',
      category: 'Assignment Agent',
      agentId: 'assignment' as AgentId,
      icon: FileText,
      query: 'What assignments are due this week?',
    },
    {
      id: 'exam-results',
      label: 'Midterm Examination Schedule & Hall Tickets',
      category: 'Examination Agent',
      agentId: 'exam' as AgentId,
      icon: GraduationCap,
      query: 'When is the midterm examination timetable released?',
    },
  ];

  const filtered = quickActions.filter((a) =>
    a.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-soft-xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type a command or ask any agent..."
            className="w-full text-xs px-3 py-3.5 bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400 font-medium"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="ml-2 text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#1E3A8A]" />
            Agent Commands & Shortcuts
          </div>

          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching actions found. Press enter to ask the AI Coordinator directly.
            </div>
          ) : (
            filtered.map((action) => {
              const Icon = action.icon;
              const agent = AGENT_REGISTRY[action.agentId];

              return (
                <button
                  key={action.id}
                  onClick={() => {
                    onSelectAction(action.query);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-left transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${agent.color}15`, color: agent.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                        {action.label}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span style={{ color: agent.color }}>●</span>
                        <span>{action.category}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-700 group-hover:translate-x-0.5 transition" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with arrows</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
