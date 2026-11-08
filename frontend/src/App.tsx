import { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  Layers, 
  FileText, 
  CreditCard, 
  Calendar, 
  HelpCircle,
  X
} from 'lucide-react';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const agents = [
    { name: 'Coordinator', role: 'Central Intent Router', color: '#8B5CF6', icon: Bot },
    { name: 'Attendance Agent', role: 'Roll & Criteria', color: '#10B981', icon: CheckCircle2 },
    { name: 'Fee Agent', role: 'Dues & Receipts', color: '#F59E0B', icon: CreditCard },
    { name: 'Exam Agent', role: 'Schedules & GPA', color: '#06B6D4', icon: GraduationCap },
    { name: 'Timetable Agent', role: 'Lectures & Rooms', color: '#A855F7', icon: Calendar },
    { name: 'Assignment Agent', role: 'Deadlines & Submissions', color: '#F43F5E', icon: FileText },
    { name: 'Support Agent', role: 'Campus FAQ & Policies', color: '#38BDF8', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-30 flex items-center justify-between px-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight text-base">Smart Campus AI</span>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">Enterprise</span>
            </div>
            <p className="text-xs text-slate-500">Multi-Agent Management Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#172554] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>Open AI Copilot</span>
            <kbd className="ml-1 text-[10px] bg-blue-900/60 px-1.5 py-0.5 rounded border border-blue-400/30 font-mono">Ctrl+K</kbd>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        {/* Welcome Banner */}
        <section className="bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#2563EB] rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All 7 Multi-Agent Nodes Synchronized
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Smart Campus AI Workspace
            </h1>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed">
              Stripe Royal Slate Enterprise Edition. Powered by LangGraph, Gemini API, and React 18 with dedicated multi-agent routing.
            </p>
          </div>
        </section>

        {/* Dashboard Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider">
              <span>Attendance Rate</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-slate-900 font-mono">84.5%</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">Safe Cutoff</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84.5%' }}></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider">
              <span>Semester Balance</span>
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-slate-900 font-mono">₹0.00</span>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">Paid</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-mono">No dues outstanding</p>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider">
              <span>Next Lecture</span>
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            </div>
            <div className="mt-2">
              <div className="font-bold text-slate-900 text-sm truncate">CS301: Distributed Systems</div>
              <p className="text-xs text-slate-500">Hall 302 · Prof. R. Sharma</p>
            </div>
            <p className="text-xs font-mono font-bold text-purple-700 mt-2">Today at 10:00 AM</p>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium uppercase tracking-wider">
              <span>Pending Tasks</span>
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-slate-900 font-mono">1 Task</span>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">Due Friday</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 truncate">Lab 4: Raft Consensus</p>
          </div>
        </section>

        {/* Multi-Agent Fleet Status */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#1E3A8A]" />
              Specialized Agent Status & Registry
            </h2>
            <span className="text-xs text-slate-500">7 Active Nodes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <div 
                  key={agent.name}
                  className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center" 
                      style={{ backgroundColor: `${agent.color}15`, color: agent.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border" 
                      style={{ borderColor: `${agent.color}30`, backgroundColor: `${agent.color}10`, color: agent.color }}
                    >
                      Online
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{agent.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{agent.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Slide-Over AI Copilot Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <aside className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col z-10">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Campus AI Assistant</h3>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Central Coordinator Connected
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="w-7 h-7 rounded-md hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {/* Agent Routing Trace Mock */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                  Agent Execution Trace
                </div>
                <div className="font-mono text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                  Coordinator ➔ <span className="text-emerald-600 font-bold">AttendanceAgent</span> [18ms]
                </div>
              </div>

              {/* Bot Response */}
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs text-slate-800 leading-relaxed shadow-xs">
                Hello Alex! You are currently at <strong className="text-emerald-700">84.5%</strong> aggregate attendance. You have attended 28 out of 33 conducted classes across all subjects.
              </div>
            </div>

            {/* Drawer Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask about attendance, dues, exams, timetable..." 
                  className="w-full text-xs pl-3 pr-10 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                />
                <button className="absolute right-1.5 top-1.5 w-7 h-7 rounded-md bg-[#1E3A8A] text-white flex items-center justify-center text-xs">
                  ↵
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
