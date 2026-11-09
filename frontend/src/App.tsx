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
  AlertCircle,
  BarChart3,
  Users,
  Shield,
  Activity,
  Server
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { LoginScreen } from '@/components/auth/LoginScreen';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AGENT_REGISTRY } from '@/types/agent';
import { MOCK_STUDENT_DATA, MOCK_ADMIN_METRICS } from '@/lib/mockData';

export default function App() {
  const { user, isAuthenticated } = useAuthStore();

  const agentIcons: Record<string, any> = {
    Bot,
    CheckCircle2,
    CreditCard,
    GraduationCap,
    Calendar,
    FileText,
    HelpCircle,
  };

  // If unauthenticated, show the LoginScreen
  if (!isAuthenticated || !user) {
    return <LoginScreen />;
  }

  return (
    <AppShell>
      <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
        
        {/* ============================================================== */}
        {/* STUDENT ROLE VIEW                                             */}
        {/* ============================================================== */}
        {user.role === 'student' && (
          <>
            {/* Welcome Executive Hero Banner */}
            <div className="relative rounded-2xl bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#2563EB] p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Student Portal · Multi-Agent Synchronized
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome back, {user.name}!
                </h1>
                
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                  Your attendance is safely above the 75% cutoff, your semester fee clearance is confirmed, and you have 3 lectures scheduled today.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <span className="text-[11px] font-mono bg-blue-900/60 px-2.5 py-1 rounded-lg border border-blue-400/30 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    CGPA: {MOCK_STUDENT_DATA.profile.cgpa} / 4.0
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
                    <span className="text-3xl font-black font-mono text-slate-900">
                      {MOCK_STUDENT_DATA.attendance.aggregatePercentage}%
                    </span>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      +{MOCK_STUDENT_DATA.attendance.totalSafeMissesOverall} safe misses
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${MOCK_STUDENT_DATA.attendance.aggregatePercentage}%` }} 
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-1">
                    <span>Cutoff: {MOCK_STUDENT_DATA.attendance.minimumRequired}%</span>
                    <span>{MOCK_STUDENT_DATA.attendance.totalAttended}/{MOCK_STUDENT_DATA.attendance.totalConducted} Sessions</span>
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
                    <span className="text-3xl font-black font-mono text-slate-900">
                      ₹{MOCK_STUDENT_DATA.fees.currentDue.toFixed(2)}
                    </span>
                    <span className="text-xs text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      Semester 5
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 pt-1">All tuition & hostel charges cleared.</p>
                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    {MOCK_STUDENT_DATA.fees.transactions[0].receiptNumber}
                  </div>
                </CardContent>
              </Card>

              {/* Next Lecture KPI */}
              <Card className="hover:border-slate-300 hover:shadow-soft-sm transition">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Next Lecture
                  </span>
                  <Badge variant="agent" agentId="timetable" withDot>
                    In 45 mins
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="font-bold text-slate-900 text-sm truncate">
                    {MOCK_STUDENT_DATA.timetable[0].courseCode}: {MOCK_STUDENT_DATA.timetable[0].courseName}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{MOCK_STUDENT_DATA.timetable[0].location} · {MOCK_STUDENT_DATA.timetable[0].professor}</span>
                  </div>
                  <div className="text-[11px] font-mono text-purple-700 font-bold pt-1">
                    {MOCK_STUDENT_DATA.timetable[0].timeSlot}
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
                    1 Due Soon
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="font-bold text-slate-900 text-sm truncate">
                    {MOCK_STUDENT_DATA.assignments[0].title}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Due: {MOCK_STUDENT_DATA.assignments[0].dueDate}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    Weight: {MOCK_STUDENT_DATA.assignments[0].weightagePercent}% of grade
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Schedule & Quick AI Action Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Lectures Timeline */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#1E3A8A]" />
                      Today's Class Schedule
                    </CardTitle>
                    <CardDescription>Wednesday, Semester 5 Academic Timetable</CardDescription>
                  </div>
                  <Badge variant="default" className="font-mono">
                    {MOCK_STUDENT_DATA.timetable.length} Lectures
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {MOCK_STUDENT_DATA.timetable.map((session, idx) => (
                    <div 
                      key={session.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between ${
                        idx === 0 
                          ? 'border-blue-200 bg-blue-50/40 shadow-2xs' 
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                          idx === 0 ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'
                        }`} />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {session.courseCode}: {session.courseName}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{session.location}</span>
                            <span>•</span>
                            <span>{session.professor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
                          idx === 0 
                            ? 'text-blue-900 bg-white border-blue-200 shadow-2xs' 
                            : 'text-slate-700 bg-slate-50 border-slate-200'
                        }`}>
                          {session.timeSlot.split('–')[0]}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          {session.durationMinutes} mins
                        </span>
                      </div>
                    </div>
                  ))}
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
                    Coordinated natural language query routing across all college systems.
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
          </>
        )}

        {/* ============================================================== */}
        {/* FACULTY ROLE VIEW                                             */}
        {/* ============================================================== */}
        {user.role === 'faculty' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 p-6 sm:p-8 text-white shadow-soft-md">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                Faculty Portal
              </span>
              <h1 className="text-2xl font-bold mt-2">Welcome, {user.name}</h1>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1">
                Department of Computer Science & Engineering · Academic Session 2026-27
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Assigned Classes</CardTitle>
                  <CardDescription>3 Active Course Sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold flex justify-between">
                    <span>CS304: Database Internals</span>
                    <span className="text-blue-700 font-mono">Sec A (64 Students)</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold flex justify-between">
                    <span>CS502: Advanced DBMS</span>
                    <span className="text-blue-700 font-mono">M.Tech (22 Scholars)</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Attendance Deficiency Alert</CardTitle>
                  <CardDescription>Students below 75% cutoff</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs flex justify-between items-center text-rose-800">
                    <span className="font-bold">3 Students in CS304 Sec A</span>
                    <Badge variant="danger">Action Required</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">Automated warning notices dispatched via Central AI Support Agent.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Pending Grading</CardTitle>
                  <CardDescription>Lab Reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black text-slate-900 font-mono">18 Submissions</div>
                  <p className="text-xs text-slate-500 mt-1">Assignment 2: B+ Tree Query Optimizer</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ADMIN ROLE VIEW                                               */}
        {/* ============================================================== */}
        {user.role === 'admin' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                Administrative Control & AI Telemetry
              </span>
              <h1 className="text-2xl font-bold mt-2">Executive Overview · {user.name}</h1>
              <p className="text-amber-100 text-xs sm:text-sm mt-1">
                Institutional Operations & Multi-Agent Network Observability
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-1">
                  <span className="text-xs text-slate-500 uppercase font-bold">Total Students</span>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-slate-900 font-mono">
                    {MOCK_ADMIN_METRICS.totalStudents}
                  </div>
                  <span className="text-xs text-emerald-600 font-bold">● Active Enrolled</span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-1">
                  <span className="text-xs text-slate-500 uppercase font-bold">Agent Queries Today</span>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-slate-900 font-mono">
                    {MOCK_ADMIN_METRICS.totalAgentQueriesToday}
                  </div>
                  <span className="text-xs text-blue-600 font-bold">+18.4% from yesterday</span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-1">
                  <span className="text-xs text-slate-500 uppercase font-bold">Avg Agent Latency</span>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-slate-900 font-mono">
                    {MOCK_ADMIN_METRICS.systemHealth.averageResponseLatencyMs}ms
                  </div>
                  <span className="text-xs text-emerald-600 font-bold">Gemini API Optimized</span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-1">
                  <span className="text-xs text-slate-500 uppercase font-bold">System Uptime</span>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-slate-900 font-mono">
                    {MOCK_ADMIN_METRICS.systemHealth.uptime}
                  </div>
                  <span className="text-xs text-emerald-600 font-bold">All 7 Nodes Healthy</span>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Multi-Agent Ecosystem Registry (Visible to all authenticated roles) */}
        <div className="space-y-4 pt-4">
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
