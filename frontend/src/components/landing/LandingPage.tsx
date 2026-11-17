import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Users, 
  BookOpen, 
  Building2, 
  Bot, 
  BarChart3, 
  Zap, 
  CreditCard, 
  Calendar, 
  FileText, 
  HelpCircle, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AGENT_REGISTRY, AgentId } from '@/types/agent';
import { UserRole } from '@/types/auth';
import { IsometricCampusGraphic } from './IsometricCampusGraphic';

interface LandingPageProps {
  onOpenLogin: () => void;
  onDemoLogin: (role: UserRole) => void;
}

export function LandingPage({ onOpenLogin, onDemoLogin }: LandingPageProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* ============================================================== */}
      {/* 1. TOP GLASSMORPHISM NAVIGATION BAR                           */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-soft-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E3A8A] flex items-center justify-center text-white shadow-soft-sm">
              <GraduationCap className="w-5 h-5 text-blue-200" />
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
              <p className="text-[11px] text-slate-500 hidden sm:block">Multi-Agent University Operating System</p>
            </div>
          </div>

          {/* Center Navigation Links (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-semibold text-slate-600">
            <button 
              onClick={() => scrollToSection('architecture')}
              className="px-3 py-1.5 rounded-lg hover:text-[#1E3A8A] hover:bg-slate-100 transition cursor-pointer"
            >
              Architecture
            </button>
            <button 
              onClick={() => scrollToSection('agents')}
              className="px-3 py-1.5 rounded-lg hover:text-[#1E3A8A] hover:bg-slate-100 transition cursor-pointer"
            >
              Autonomous Agents
            </button>
            <button 
              onClick={() => scrollToSection('portals')}
              className="px-3 py-1.5 rounded-lg hover:text-[#1E3A8A] hover:bg-slate-100 transition cursor-pointer"
            >
              Role Portals
            </button>
            <button 
              onClick={() => scrollToSection('generative-ui')}
              className="px-3 py-1.5 rounded-lg hover:text-[#1E3A8A] hover:bg-slate-100 transition cursor-pointer"
            >
              Generative UI
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Sign In
            </button>

            <Button
              onClick={() => scrollToSection('demo-launcher')}
              variant="primary"
              size="sm"
              className="bg-[#1E3A8A] hover:bg-[#172554] text-white shadow-soft-sm font-bold text-xs px-3.5 sm:px-4 py-2 rounded-xl cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200 mr-1.5" />
              <span>Explore Demo</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION                                               */}
      {/* ============================================================== */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-200/30 via-indigo-100/40 to-cyan-100/20 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Hero Headlines */}
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Powered by Coordinated Gemini AI &amp; LangGraph</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              The Autonomous Operating System for Modern Universities
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
              Replace outdated, 20-year-old college ERPs. Smart Campus AI coordinates attendance cutoffs, instant fee clearances, lecture allocations, and academic evaluations through 7 synchronized AI agents.
            </p>

            {/* Hero Dual CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button
                onClick={() => scrollToSection('demo-launcher')}
                size="lg"
                className="bg-[#1E3A8A] hover:bg-[#172554] text-white shadow-soft-md font-bold text-sm px-6 py-3 rounded-xl cursor-pointer"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4 ml-2 text-blue-200" />
              </Button>

              <Button
                onClick={() => scrollToSection('agents')}
                variant="outline"
                size="lg"
                className="bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-soft-xs font-bold text-sm px-5 py-3 rounded-xl cursor-pointer"
              >
                <span>Meet the 7 AI Agents</span>
              </Button>
            </div>

            {/* Live Trust Metrics */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Layout Shift (CLS = 0)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>&lt;25ms Agent Latency</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Enterprise RBAC Guardrails</span>
              </div>
            </div>
          </div>

          {/* 3D Isometric Architectural Campus Graphic */}
          <div id="architecture" className="pt-4">
            <IsometricCampusGraphic />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. PROBLEM VS SOLUTION                                        */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              The Paradigm Shift
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Traditional University Portals Fail
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Legacy systems bury critical academic data behind 15 different navigation submenus. Smart Campus AI unifies everything in one natural language conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/40 border border-rose-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
                  ✕
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Legacy University ERPs</h3>
                  <p className="text-xs text-slate-500">Fragmented, high-friction, and manual</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 pt-2">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Students calculate attendance safety margins by hand on napkins, often breaching the 75% cutoff without warning.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Faculty spend 15 minutes per lecture calling roll and hours fielding repetitive syllabus emails.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Fee payment reconciliation requires standing in administrative queues to show physical bank receipts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Emergency alerts rely on delayed emails that students rarely check in time.</span>
                </li>
              </ul>
            </div>

            {/* The Smart Campus AI Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/50 border border-blue-200/80 space-y-4 shadow-soft-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-lg shadow-soft-xs">
                  ✓
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Smart Campus AI Ecosystem</h3>
                  <p className="text-xs text-slate-500">Proactive, automated, and instantaneous</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 pt-2">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>What-If Absence Engine:</strong> Simulates future absences and tells students exactly how many classes they can safely miss.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>30-Second Batch Attendance:</strong> 1-click toggle roster with automatic absent SMS alerts dispatched to parents.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Instant Razorpay Verification:</strong> 1-click tuition clearance with automated digital PDF receipt generation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Multi-Channel Emergency Dispatch:</strong> Push notifications, SMS alerts, and email broadcasts delivered in under 2 seconds.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. THE 3 ROLE PORTALS                                          */}
      {/* ============================================================== */}
      <section id="portals" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Role-Based Governance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tailored Portals for Every Campus Stakeholder
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Strict enterprise security and RBAC ensure students, educators, and university executives only access the data and tools they are authorized to manage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Student Portal */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft-xs hover:shadow-soft-md transition flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1E3A8A]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Student Portal</h3>
                  <p className="text-xs text-slate-500 mt-1">Autonomous academic copilot &amp; self-service records</p>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>Real-time Biometric Attendance &amp; Safe Buffer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>Razorpay Fee Clearance &amp; Receipt PDF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>Exam Seating Allocations &amp; QR Hall Tickets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>Homework Submission &amp; Plagiarism Checks</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => onDemoLogin('student')}
                variant="outline"
                className="w-full text-xs font-bold text-[#1E3A8A] border-blue-200 hover:bg-blue-50 cursor-pointer"
              >
                <span>Enter as Student (Alex)</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* 2. Faculty Portal */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft-xs hover:shadow-soft-md transition flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Faculty Hub</h3>
                  <p className="text-xs text-slate-500 mt-1">Classroom attendance, grading &amp; risk intervention</p>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Batch Student Roll Roster with P/A/L Toggles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>AI-Assisted Code Rubric Evaluation Drawer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Attendance Shortage (&lt;75%) Risk Detector</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>1-Click Absent Parent SMS &amp; Notice Alerts</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => onDemoLogin('faculty')}
                variant="outline"
                className="w-full text-xs font-bold text-emerald-700 border-emerald-200 hover:bg-emerald-50 cursor-pointer"
              >
                <span>Enter as Faculty (Dr. Verma)</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* 3. Administrator Portal */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft-xs hover:shadow-soft-md transition flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Administrator Command</h3>
                  <p className="text-xs text-slate-500 mt-1">Multi-agent observability, security &amp; broadcasts</p>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>Agent Telemetry &amp; Response Latency Percentiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>Query Distribution Recharts &amp; Throughput</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>Filterable System Transaction Audit Logs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>College-Wide Emergency Broadcast Composer</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => onDemoLogin('admin')}
                variant="outline"
                className="w-full text-xs font-bold text-amber-700 border-amber-200 hover:bg-amber-50 cursor-pointer"
              >
                <span>Enter as Admin (Dean Roberts)</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. THE 7 AUTONOMOUS AI AGENTS FLEET                           */}
      {/* ============================================================== */}
      <section id="agents" className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              LangGraph Coordinated Fleet
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              7 Specialized Autonomous Domain Agents
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Instead of a single monolithic chatbot, queries are parsed by the Central Coordinator and routed to specialized agents with bound database tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.values(AGENT_REGISTRY).map((agent) => (
              <div 
                key={agent.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:bg-white hover:shadow-soft-md transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs"
                    style={{ backgroundColor: agent.color }}
                  >
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Online
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900">{agent.name}</h4>
                  <span className="text-[11px] font-mono text-slate-500">{agent.role}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {agent.description}
                </p>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-600 font-mono">
                  <span>Domain: {agent.id.toUpperCase()}</span>
                  <span>Avg: 22ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. GENERATIVE UI SPOTLIGHT                                     */}
      {/* ============================================================== */}
      <section id="generative-ui" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Beyond Plain Text
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Generative UI: Dynamic React Widgets in Chat
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              When agents respond, they don't just return markdown. They dispatch structured UI widgets directly into the conversation stream.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Widget 1: Attendance */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft-xs space-y-3">
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                &lt;AttendanceWidget /&gt;
              </span>
              <h4 className="font-bold text-sm text-slate-900">Attendance Safety Meter</h4>
              <p className="text-xs text-slate-500">
                Interactive radial gauge calculating exact safe misses remaining before dropping below 75%.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">CS301 Microservices</span>
                <span className="text-xs font-bold text-emerald-600 font-mono">84.85% (Safe)</span>
              </div>
            </div>

            {/* Widget 2: Fee Ledger */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft-xs space-y-3">
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                &lt;FeeBreakdownWidget /&gt;
              </span>
              <h4 className="font-bold text-sm text-slate-900">Razorpay Fee Clearance</h4>
              <p className="text-xs text-slate-500">
                Itemized invoice breakdowns with simulated Razorpay checkout modal and celebratory confetti.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Semester 5 Tuition</span>
                <span className="text-xs font-bold text-slate-900 font-mono">₹1,25,000 (Paid)</span>
              </div>
            </div>

            {/* Widget 3: Examination */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft-xs space-y-3">
              <span className="text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                &lt;ExamScheduleWidget /&gt;
              </span>
              <h4 className="font-bold text-sm text-slate-900">Digital QR Hall Tickets</h4>
              <p className="text-xs text-slate-500">
                Allocated exam coordinates (`Seat #A-42`) with 1-click verified verification slips.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Exam Hall Central A</span>
                <span className="text-xs font-bold text-blue-600 font-mono">Seat #A-42</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. ZERO-FRICTION 1-CLICK DEMO LAUNCHER (CONVERSION HOOK)        */}
      {/* ============================================================== */}
      <section id="demo-launcher" className="py-16 sm:py-24 bg-gradient-to-b from-white to-blue-50/50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Immediate Access
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Test Drive the Platform in 1 Click
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              No registration or passwords required. Select a persona below to immediately launch the full live application with preloaded records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Student Alex Chen */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm hover:shadow-soft-lg hover:border-blue-400/50 transition flex flex-col justify-between space-y-6 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 mx-auto flex items-center justify-center text-[#1E3A8A] font-extrabold text-xl shadow-xs">
                  AC
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Alex Chen</h3>
                  <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Roll #CS-2024-104
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  B.Tech CSE Semester 5 · CGPA 3.84 · 84.85% Attendance · Hostel Resident
                </p>
              </div>

              <Button
                onClick={() => onDemoLogin('student')}
                variant="primary"
                className="w-full bg-[#1E3A8A] hover:bg-[#172554] text-xs font-bold py-2.5 rounded-xl cursor-pointer shadow-soft-xs"
              >
                <span>Launch Student Demo →</span>
              </Button>
            </div>

            {/* Faculty Dr. Rajesh Kumar */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm hover:shadow-soft-lg hover:border-emerald-400/50 transition flex flex-col justify-between space-y-6 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 mx-auto flex items-center justify-center text-emerald-700 font-extrabold text-xl shadow-xs">
                  RK
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Dr. Rajesh Kumar</h3>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Faculty #FAC-CS-042
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Academic Head CSE · 3 Active Courses · 184 Students · 18 Submissions to Grade
                </p>
              </div>

              <Button
                onClick={() => onDemoLogin('faculty')}
                variant="primary"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-xs font-bold py-2.5 rounded-xl cursor-pointer shadow-soft-xs"
              >
                <span>Launch Faculty Demo →</span>
              </Button>
            </div>

            {/* Admin Dean Roberts */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft-sm hover:shadow-soft-lg hover:border-amber-400/50 transition flex flex-col justify-between space-y-6 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 mx-auto flex items-center justify-center text-amber-700 font-extrabold text-xl shadow-xs">
                  DR
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Dean Roberts</h3>
                  <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Executive Admin #ADM-001
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Office of the Provost · 4,495 Campus Population · 7 Agent Nodes · Full Telemetry
                </p>
              </div>

              <Button
                onClick={() => onDemoLogin('admin')}
                variant="primary"
                className="w-full bg-amber-700 hover:bg-amber-800 text-xs font-bold py-2.5 rounded-xl cursor-pointer shadow-soft-xs"
              >
                <span>Launch Admin Demo →</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. FOOTER                                                      */}
      {/* ============================================================== */}
      <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm">Smart Campus AI</span>
              <p className="text-[11px] text-slate-500">Autonomous Multi-Agent University Operating System</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500 text-[11px]">
            <span>React 18</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Vite</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>LangGraph &amp; Gemini AI</span>
            <span>•</span>
            <span>Razorpay</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Rehuu2003/Smart-Campus-AI" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-500 hover:text-slate-900 transition flex items-center gap-1 font-semibold"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
