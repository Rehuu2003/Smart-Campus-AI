import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  FileText, 
  GraduationCap, 
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AGENT_REGISTRY, AgentId } from '@/types/agent';

export default function App() {
  const agentIcons: Record<string, any> = {
    Bot,
    CheckCircle2,
    CreditCard,
    GraduationCap,
    Calendar,
    FileText,
    HelpCircle,
  };

  return (
    <AppShell>
      <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
        {/* Welcome Executive Hero Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#2563EB] p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All 7 Specialized Multi-Agent Systems Online
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, Alex!
            </h1>
            
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Your academic assistant has analyzed your records. Attendance is safely above the 75% threshold, semester fee clearances are verified, and you have 3 classes scheduled today.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <span className="text-[11px] font-mono bg-blue-900/60 px-2.5 py-1 rounded-lg border border-blue-400/30 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                GPA: 3.84 / 4.0
              </span>
              <span className="text-[11px] font-mono bg-blue-900/60 px-2.5 py-1 rounded-lg border border-blue-400/30 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-300" />
                Next: CS301 at 10:00 AM
              </span>
            </div>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Attendance KPI */}
          <Card className="hover:border-slate-300 hover:shadow-soft-sm transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Attendance Rate
              </span>
              <Badge variant="agent" agentId="attendance" withDot>
                Safe
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-slate-900">84.5%</span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  +9.5% margin
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84.5%' }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-1">
                <span>Threshold: 75%</span>
                <span>28/33 Classes</span>
              </div>
            </CardContent>
          </Card>

          {/* Fee Balance KPI */}
          <Card className="hover:border-slate-300 hover:shadow-soft-sm transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Semester Dues
              </span>
              <Badge variant="agent" agentId="fee" withDot>
                Settled
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-slate-900">₹0.00</span>
                <span className="text-xs text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  Fall '26
                </span>
              </div>
              <p className="text-xs text-slate-500 pt-1">All tuition & lab fees cleared.</p>
              <div className="text-[11px] font-mono text-slate-400 pt-1">
                Receipt #RCP-2026-9041
              </div>
            </CardContent>
          </Card>

          {/* Next Lecture KPI */}
          <Card className="hover:border-slate-300 hover:shadow-soft-sm transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Next Session
              </span>
              <Badge variant="agent" agentId="timetable" withDot>
                In 45 mins
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="font-bold text-slate-900 text-sm truncate">
                CS301: Distributed Systems
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Lecture Hall 302 · Prof. R. Sharma</span>
              </div>
              <div className="text-[11px] font-mono text-purple-700 font-bold pt-1">
                10:00 AM – 11:30 AM
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks KPI */}
          <Card className="hover:border-slate-300 hover:shadow-soft-sm transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Assignments
              </span>
              <Badge variant="agent" agentId="assignment" withDot>
                1 Pending
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="font-bold text-slate-900 text-sm truncate">
                Lab 4: Raft Consensus Engine
              </div>
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>Due in 2 days (Friday, 11:59 PM)</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 pt-1">
                Weight: 15% of final grade
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule & Academic Focus Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Lectures Timeline */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1E3A8A]" />
                  Today's Class Schedule
                </CardTitle>
                <CardDescription>Wednesday, November 8, 2026</CardDescription>
              </div>
              <Badge variant="default" className="font-mono">
                3 Lectures
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Lecture 1 (Upcoming Active) */}
              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 flex items-center justify-between shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1.5 ring-4 ring-blue-100" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      CS301: Distributed Systems & Microservices
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>LH-302</span>
                      <span>•</span>
                      <span>Prof. R. Sharma</span>
                      <span>•</span>
                      <span className="text-blue-700 font-medium">Room Confirmed</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-blue-900 bg-white px-2.5 py-1 rounded-md border border-blue-200 shadow-2xs">
                    10:00 AM
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">90 mins</span>
                </div>
              </div>

              {/* Lecture 2 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1.5" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      CS304: Database Internals & Query Optimization
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>Software Lab 2</span>
                      <span>•</span>
                      <span>Dr. A. Verma</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                    01:30 PM
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">120 mins</span>
                </div>
              </div>

              {/* Lecture 3 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1.5" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      CS308: Software Engineering & DevOps Architecture
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>Seminar Hall B</span>
                      <span>•</span>
                      <span>Prof. K. Iyer</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                    03:30 PM
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">60 mins</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick AI Action Card */}
          <Card className="flex flex-col justify-between bg-gradient-to-br from-white via-slate-50/50 to-blue-50/20">
            <CardHeader>
              <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-700 border border-violet-200 flex items-center justify-center mb-1">
                <Sparkles className="w-5 h-5 text-violet-600" />
              </div>
              <CardTitle>Ask Central AI</CardTitle>
              <CardDescription>
                Natural language query routing across all college systems.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>"Can I miss tomorrow's 10 AM class?"</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>"Download paid fee receipt for semester 5"</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>"When do midterm hall tickets release?"</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </CardContent>
            <div className="p-5 pt-0">
              <Button 
                variant="primary" 
                size="sm" 
                className="w-full bg-[#1E3A8A] hover:bg-[#172554]"
                onClick={() => {
                  const event = new KeyboardEvent('keydown', { key: 'j', ctrlKey: true });
                  window.dispatchEvent(event);
                }}
              >
                Launch AI Copilot Drawer (Ctrl+J)
              </Button>
            </div>
          </Card>
        </div>

        {/* Multi-Agent Ecosystem Registry Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Multi-Agent System Fleet
              </h2>
              <p className="text-xs text-slate-500">
                Specialized domain agents coordinated under Central Orchestrator architecture
              </p>
            </div>
            <Badge variant="success" withDot>
              All Operational
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(AGENT_REGISTRY).map((agent) => {
              const Icon = agentIcons[agent.iconName] || Bot;
              return (
                <Card 
                  key={agent.id}
                  className="hover:border-slate-300 hover:shadow-soft-sm transition flex flex-col justify-between"
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-2xs"
                        style={{ backgroundColor: `${agent.color}15`, color: agent.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span 
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                        style={{ borderColor: `${agent.color}30`, backgroundColor: `${agent.color}10`, color: agent.color }}
                      >
                        Active
                      </span>
                    </div>
                    <CardTitle className="text-sm mt-3">{agent.name}</CardTitle>
                    <CardDescription className="text-[11px] line-clamp-2">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>
                  <div className="p-4 pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Role: {agent.shortName}</span>
                    <span style={{ color: agent.color }}>● Online</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
