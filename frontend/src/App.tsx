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
import { useAuthStore } from '@/stores/authStore';
import { LoginScreen } from '@/components/auth/LoginScreen';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AGENT_REGISTRY, AgentId } from '@/types/agent';
import { MOCK_STUDENT_DATA, MOCK_ADMIN_METRICS } from '@/lib/mockData';
import { StatCard } from '@/components/dashboard/StatCard';
import { AttendanceGauge } from '@/components/dashboard/AttendanceGauge';
import { ScheduleTimeline } from '@/components/dashboard/ScheduleTimeline';
import { PendingTasksList } from '@/components/dashboard/PendingTasksList';
import { AgentIdentityCard } from '@/components/agent/AgentIdentityCard';
import { useChatStream } from '@/hooks/useChatStream';
import { toast } from 'sonner';

export default function App() {
  const { user, isAuthenticated } = useAuthStore();
  const { streamResponse } = useChatStream();

  const handleTestAgentPrompt = (prompt: string, agentName: string) => {
    toast.info(`Routing inquiry to ${agentName}...`);
    // Open copilot drawer by dispatching Ctrl+J or invoking stream
    const event = new KeyboardEvent('keydown', { key: 'j', ctrlKey: true });
    window.dispatchEvent(event);
    streamResponse(prompt);
  };

  // If unauthenticated, display the LoginScreen
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
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Student Portal · Coordinated Agent Fleet Synchronized
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome back, {user.name}!
                </h1>
                
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                  Your academic records are synchronized. Attendance is safely above the 75% cutoff, semester fee clearance is confirmed, and you have 3 classes scheduled today.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <span className="text-[11px] font-mono bg-blue-900/60 px-2.5 py-1 rounded-lg border border-blue-400/30 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    CGPA: {MOCK_STUDENT_DATA.profile.cgpa} / 4.0
                  </span>
                  <span className="text-[11px] font-mono bg-blue-900/60 px-2.5 py-1 rounded-lg border border-blue-400/30 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-300" />
                    Next Session: CS301 at 10:00 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Top 4 Modular KPI StatCards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Attendance Rate"
                value={`${MOCK_STUDENT_DATA.attendance.aggregatePercentage}%`}
                subtitle={`Cutoff: ${MOCK_STUDENT_DATA.attendance.minimumRequired}% · ${MOCK_STUDENT_DATA.attendance.totalAttended}/${MOCK_STUDENT_DATA.attendance.totalConducted} Sessions`}
                badgeText="Safe Cutoff"
                badgeVariant="agent"
                agentId="attendance"
                progressValue={MOCK_STUDENT_DATA.attendance.aggregatePercentage}
                progressColor="bg-emerald-500"
                trend={{ value: `+${MOCK_STUDENT_DATA.attendance.totalSafeMissesOverall} safe misses`, isPositive: true }}
              />

              <StatCard
                title="Semester Dues"
                value={`₹${MOCK_STUDENT_DATA.fees.currentDue.toFixed(2)}`}
                subtitle="All tuition & hostel charges cleared"
                badgeText="Paid"
                badgeVariant="agent"
                agentId="fee"
                trend={{ value: "Fall '26", isPositive: true }}
              />

              <StatCard
                title="Next Session"
                value="CS301"
                subtitle="LH-302 · Prof. R. Sharma (10:00 AM)"
                badgeText="In 45 mins"
                badgeVariant="agent"
                agentId="timetable"
                trend={{ value: "Room Confirmed", isPositive: true }}
              />

              <StatCard
                title="Assignments"
                value="1 Pending"
                subtitle="Lab 4: Raft Consensus Engine"
                badgeText="Due Soon"
                badgeVariant="agent"
                agentId="assignment"
                trend={{ value: "Due Friday", isPositive: false }}
              />
            </div>

            {/* Attendance Circular Radial Gauge & What-If Simulator */}
            <AttendanceGauge />

            {/* Lecture Schedule & Academic Agenda */}
            <ScheduleTimeline />

            {/* Pending Coursework & Interactive Submissions */}
            <PendingTasksList />
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
                Department of Computer Science &amp; Engineering · Academic Session 2026-27
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
                Administrative Control &amp; AI Telemetry
              </span>
              <h1 className="text-2xl font-bold mt-2">Executive Overview · {user.name}</h1>
              <p className="text-amber-100 text-xs sm:text-sm mt-1">
                Institutional Operations &amp; Multi-Agent Network Observability
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

        {/* Multi-Agent System Registry with Interactive AgentIdentityCards */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Multi-Agent System Fleet &amp; Capabilities
              </h2>
              <p className="text-xs text-slate-500">
                Specialized domain agents with bound database tools, latency benchmarks, and live telemetry
              </p>
            </div>
            <Badge variant="success" withDot>
              All 7 Nodes Operational
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.values(AGENT_REGISTRY).map((agent) => (
              <AgentIdentityCard
                key={agent.id}
                agentId={agent.id}
                onSelectPrompt={(prompt) => handleTestAgentPrompt(prompt, agent.name)}
              />
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
