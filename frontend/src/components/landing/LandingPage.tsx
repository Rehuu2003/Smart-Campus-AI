import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
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
  Award,
  Search,
  Check,
  Send,
  Terminal,
  RefreshCw,
  TrendingUp,
  Download,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AGENT_REGISTRY, AgentId } from '@/types/agent';
import { UserRole } from '@/types/auth';
import { IsometricCampusGraphic } from './IsometricCampusGraphic';
import { playClickTick } from '@/lib/soundEffects';
import { toast } from 'sonner';

interface LandingPageProps {
  onOpenLogin: () => void;
  onDemoLogin: (role: UserRole) => void;
}

// Interactive Sandbox Simulation Prompts
interface SandboxPrompt {
  id: string;
  query: string;
  category: string;
  agentId: AgentId;
  agentName: string;
  agentColor: string;
  responseSummary: string;
  widgetType: 'attendance' | 'fee' | 'timetable' | 'assignment';
}

const SANDBOX_PROMPTS: SandboxPrompt[] = [
  {
    id: 'p-attendance',
    query: 'Can I miss tomorrow’s 10:00 AM Distributed Systems class?',
    category: 'Attendance Intelligence',
    agentId: 'attendance',
    agentName: 'Attendance Agent',
    agentColor: '#10B981',
    responseSummary: 'Simulated attendance trajectory: Current percentage is 84.85% (28/33). Missing tomorrow’s session results in 82.35% (28/34), leaving you with 2 safe misses remaining above the 75% cutoff.',
    widgetType: 'attendance',
  },
  {
    id: 'p-fee',
    query: 'Verify my Semester 5 tuition fee status and generate official receipt',
    category: 'Bursar & Payments',
    agentId: 'fee',
    agentName: 'Fee Ledger Agent',
    agentColor: '#D97706',
    responseSummary: 'Payment verified via Razorpay Smart Institutional Gateway (Ref #RZP-2026-F992). Total ₹1,25,000 paid in full. No outstanding semester arrears.',
    widgetType: 'fee',
  },
  {
    id: 'p-timetable',
    query: 'Where is my next lecture and what is the room occupancy?',
    category: 'Schedule & Logistics',
    agentId: 'timetable',
    agentName: 'Timetable Agent',
    agentColor: '#8B5CF6',
    responseSummary: 'Next session is CS301 (Distributed Systems) at 10:00 AM in Lecture Hall 302 with Prof. R. Sharma. Lecture room unlocked and projector online.',
    widgetType: 'timetable',
  },
  {
    id: 'p-assignment',
    query: 'What coursework deadlines are due before Friday midnight?',
    category: 'Coursework & Code',
    agentId: 'assignment',
    agentName: 'Assignment Agent',
    agentColor: '#E11D48',
    responseSummary: '1 pending submission detected: Lab 4 (Raft Consensus Engine). Due Friday Nov 20 at 11:59 PM. Code rubric includes automated Raft leader election test suite.',
    widgetType: 'assignment',
  },
];

export function LandingPage({ onOpenLogin, onDemoLogin }: LandingPageProps) {
  const [activeTabRole, setActiveTabRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [activePrompt, setActivePrompt] = useState<SandboxPrompt>(SANDBOX_PROMPTS[0]);
  const [isSimulatingStream, setIsSimulatingStream] = useState(false);
  const [simulatedSlider, setSimulatedSlider] = useState(0);

  const scrollToSection = (id: string) => {
    playClickTick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectSandboxPrompt = (p: SandboxPrompt) => {
    playClickTick();
    setIsSimulatingStream(true);
    setActivePrompt(p);
    
    if (p.widgetType === 'fee') {
      confetti({
        particleCount: 50,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#10B981', '#1E3A8A', '#F59E0B'],
      });
    }

    setTimeout(() => {
      setIsSimulatingStream(false);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* ============================================================== */}
      {/* 1. TOP GLASSMORPHISM NAVIGATION BAR                           */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1E3A8A] via-[#1D4ED8] to-[#3B82F6] flex items-center justify-center text-white shadow-soft-sm">
              <GraduationCap className="w-6 h-6 text-blue-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 tracking-tight text-lg sm:text-xl">
                  Smart Campus AI
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  Enterprise OS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Autonomous Multi-Agent University Operating System
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-600">
            <button 
              onClick={() => scrollToSection('architecture')}
              className="px-3.5 py-2 rounded-xl hover:text-[#1E3A8A] hover:bg-slate-100 transition cursor-pointer"
            >
              Campus Twin
            </button>
            <button 
              onClick={() => scrollToSection('sandbox')}
              className="px-3.5 py-2 rounded-xl hover:text-[#1E3A8A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Live AI Sandbox</span>
            </button>
            <button 
              onClick={() => scrollToSection('portals')}
              className="px-3.5 py-2 rounded-xl hover:text-[#1E3A8A] hover:bg-slate-100 transition cursor-pointer"
            >
              Role Portals
            </button>
            <button 
              onClick={() => scrollToSection('agents')}
              className="px-3.5 py-2 rounded-xl hover:text-[#1E3A8A] hover:bg-slate-100 transition cursor-pointer"
            >
              Agent Fleet
            </button>
            <button 
              onClick={() => scrollToSection('comparison')}
              className="px-3.5 py-2 rounded-xl hover:text-[#1E3A8A] hover:bg-slate-100 transition cursor-pointer"
            >
              Legacy vs AI
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenLogin}
              className="px-3 sm:px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Sign In
            </button>

            <Button
              onClick={() => scrollToSection('demo-launcher')}
              variant="primary"
              size="sm"
              className="bg-[#1E3A8A] hover:bg-[#172554] text-white shadow-soft-sm font-bold text-xs px-4 sm:px-5 py-2.5 rounded-xl cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200 mr-1.5" />
              <span>Launch Demo</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. GRAND HERO SECTION                                         */}
      {/* ============================================================== */}
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-blue-300/20 via-indigo-100/30 to-cyan-100/20 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Hero Top Copy */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Live Synchronized Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-xs font-bold text-blue-700 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span>LangGraph Multi-Agent Architecture · 7 Specialized AI Nodes</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
              The Autonomous Operating System for Modern Universities
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              Eliminate cumbersome 20-year-old college ERPs. Smart Campus AI unifies attendance cutoff alerts, instant Razorpay tuition clearances, dynamic exam hall tickets, and coursework grading in one continuous natural language conversation.
            </p>

            {/* Hero Dual Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button
                onClick={() => scrollToSection('demo-launcher')}
                size="lg"
                className="bg-[#1E3A8A] hover:bg-[#172554] text-white shadow-soft-md font-bold text-sm px-7 py-3.5 rounded-xl cursor-pointer"
              >
                <span>1-Click Interactive Demo</span>
                <ArrowRight className="w-4 h-4 ml-2 text-blue-200" />
              </Button>

              <Button
                onClick={() => scrollToSection('sandbox')}
                variant="outline"
                size="lg"
                className="bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-soft-xs font-bold text-sm px-6 py-3.5 rounded-xl cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
                <span>Test Drive AI Copilot</span>
              </Button>
            </div>

            {/* Quick 1-Click Persona Launch Bar in Hero */}
            <div className="pt-3 max-w-xl mx-auto">
              <div className="p-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-soft-xs flex flex-wrap items-center justify-center gap-2">
                <span className="text-[11px] font-mono text-slate-500 font-semibold px-2">Launch Role:</span>
                
                <button
                  onClick={() => onDemoLogin('student')}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1E3A8A] text-xs font-bold border border-blue-200/80 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>Student (Alex)</span>
                </button>

                <button
                  onClick={() => onDemoLogin('faculty')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/80 transition cursor-pointer flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Faculty (Dr. Rajesh)</span>
                </button>

                <button
                  onClick={() => onDemoLogin('admin')}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200/80 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin (Dean Roberts)</span>
                </button>
              </div>
            </div>

            {/* Live Trust Metrics Row */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Layout Shift (CLS = 0)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>&lt;20ms Agent Routing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Enterprise RBAC Security</span>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 3D PORCELAIN ISOMETRIC CAMPUS DIGITAL TWIN (Hero Showcase)   */}
          {/* ============================================================ */}
          <div id="architecture" className="space-y-6">
            
            {/* The 3D Isometric Interactive Graphic Component */}
            <IsometricCampusGraphic />

            {/* 2 Flanking High-Tech Glass Cards (EduWeb3 & Porcelain Theme) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              
              {/* Card 1: Live Student Academic Cockpit (Alex Chen) */}
              <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-soft-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-bold text-xs">
                      AC
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">Alex Chen (Student)</div>
                      <div className="text-[10px] font-mono text-slate-500">Roll #CS-2024-104 · Semester 5</div>
                    </div>
                  </div>
                  <Badge variant="success" withDot>
                    Safe Standing
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Attendance</div>
                    <div className="text-base font-black font-mono text-emerald-600 mt-0.5">84.85%</div>
                    <div className="text-[9px] text-emerald-700 font-semibold">+3 Safe Misses</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Tuition Dues</div>
                    <div className="text-base font-black font-mono text-slate-900 mt-0.5">₹0.00</div>
                    <div className="text-[9px] text-blue-700 font-semibold">Cleared</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Next Lecture</div>
                    <div className="text-base font-black font-mono text-[#1E3A8A] mt-0.5">CS301</div>
                    <div className="text-[9px] text-slate-500 truncate">10:00 AM (LH-302)</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">Orchestrator Fleet: Verified</span>
                  <button 
                    onClick={() => onDemoLogin('student')}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>View Alex’s Full Portal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 2: Concentric Circular Compliance Analytics (EduWeb3 Style) */}
              <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-soft-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">Campus-Wide Academic Compliance</h3>
                    <p className="text-[10px] text-slate-500">Live multi-agent ledger reconciliation across 4,495 students</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    99.98% Synced
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  {/* Concentric Donut SVG Graphic (EduWeb3 Style) */}
                  <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {/* Background tracks */}
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                      <circle cx="50" cy="50" r="32" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                      <circle cx="50" cy="50" r="22" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                      
                      {/* Outer Ring: Attendance 85% (Blue) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="6"
                        strokeDasharray={264}
                        strokeDashoffset={264 * (1 - 0.85)}
                        strokeLinecap="round"
                      />
                      {/* Middle Ring: Fee Clearance 100% (Emerald) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="32"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="6"
                        strokeDasharray={201}
                        strokeDashoffset={201 * (1 - 1.0)}
                        strokeLinecap="round"
                      />
                      {/* Inner Ring: Coursework 78% (Amber) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="22"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="6"
                        strokeDasharray={138}
                        strokeDashoffset={138 * (1 - 0.78)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-black font-mono text-slate-900 leading-none">4.5K</span>
                      <span className="text-[8px] font-mono text-slate-500 uppercase mt-0.5">Students</span>
                    </div>
                  </div>

                  {/* Ring Legend & Indicators */}
                  <div className="space-y-2 flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <span className="text-slate-600">Attendance Cutoff Safe</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">85%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-slate-600">Tuition Clearance</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-600">100%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="text-slate-600">Coursework Completed</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">78%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">Decision Engine: Gemini Flash</span>
                  <button 
                    onClick={() => onDemoLogin('admin')}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Inspect Executive Telemetry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. INTERACTIVE AI COPILOT SANDBOX (LIVE DEMO ON LANDING PAGE)  */}
      {/* ============================================================== */}
      <section id="sandbox" className="py-20 sm:py-28 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Interactive Live Simulation
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Test Drive the AI Copilot Before Logging In
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              Select any real student inquiry below. Watch the LangGraph Central Coordinator classify the query, route to a specialized agent, and dispatch dynamic Generative UI widgets in real-time.
            </p>
          </div>

          {/* Interactive Playground Console */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200/90 bg-[#F8FAFC] shadow-soft-lg overflow-hidden">
            
            {/* Top Prompt Selector Pills */}
            <div className="p-4 sm:p-5 bg-white border-b border-slate-200/80 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Sample Prompts:</span>
              </span>

              {SANDBOX_PROMPTS.map((p) => {
                const isActive = activePrompt.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectSandboxPrompt(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{p.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Chat Sandbox Message Flow */}
            <div className="p-5 sm:p-7 space-y-6">
              
              {/* User Prompt Bubble */}
              <div className="flex items-start gap-3 justify-end">
                <div className="max-w-xl p-4 rounded-2xl bg-[#1E3A8A] text-white text-xs sm:text-sm font-medium shadow-soft-xs">
                  {activePrompt.query}
                </div>
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#1E3A8A] font-bold text-xs flex items-center justify-center shrink-0">
                  AC
                </div>
              </div>

              {/* Agent Routing & Response Bubble */}
              <div className="flex items-start gap-3">
                <div 
                  className="w-8 h-8 rounded-xl text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                  style={{ backgroundColor: activePrompt.agentColor }}
                >
                  <Bot className="w-4 h-4" />
                </div>

                <div className="flex-1 space-y-4 max-w-2xl">
                  {/* Routing Meta Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-600 shadow-2xs">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activePrompt.agentColor }} />
                    <span>Orchestrator routed inquiry to <strong>{activePrompt.agentName}</strong> in 18ms</span>
                  </div>

                  {/* Text Explanation */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-soft-xs">
                    {activePrompt.responseSummary}
                  </div>

                  {/* DYNAMIC GENERATIVE UI WIDGET (Dispatched in Stream) */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-blue-200 shadow-soft-md space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                          Generative UI Widget
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {activePrompt.category}
                        </span>
                      </div>
                      <Badge variant="success" withDot>
                        Verified Live
                      </Badge>
                    </div>

                    {/* Widget Condition 1: Attendance Simulator */}
                    {activePrompt.widgetType === 'attendance' && (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <div>
                            <div className="text-xs font-bold text-slate-800">CS301 Distributed Systems</div>
                            <div className="text-[11px] text-slate-500 font-mono">Cutoff: 75% required</div>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-black font-mono text-emerald-600">84.85%</span>
                            <span className="text-xs font-bold text-emerald-700 font-mono block">28 / 33 Sessions</span>
                          </div>
                        </div>

                        {/* Interactive What-If Simulator Controls */}
                        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                            <span>Interactive Absence Simulator</span>
                            <span className="font-mono">{simulatedSlider === 0 ? 'Current' : `${simulatedSlider} Classes Missed`}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setSimulatedSlider((p) => Math.max(-5, p - 1))}
                              className="px-2.5 py-1 rounded bg-white border border-emerald-300 text-xs font-bold font-mono text-slate-800 hover:bg-emerald-100 cursor-pointer"
                            >
                              -1 Miss
                            </button>
                            <div className="flex-1 text-center font-mono text-xs font-bold text-slate-800">
                              Simulated Buffer: {Math.max(0, 3 + simulatedSlider)} Safe Classes Remaining
                            </div>
                            <button
                              onClick={() => setSimulatedSlider((p) => Math.min(3, p + 1))}
                              className="px-2.5 py-1 rounded bg-white border border-emerald-300 text-xs font-bold font-mono text-slate-800 hover:bg-emerald-100 cursor-pointer"
                            >
                              +1 Class
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Widget Condition 2: Razorpay Fee Clearance */}
                    {activePrompt.widgetType === 'fee' && (
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-slate-900">Semester 5 Tuition &amp; Laboratory Fees</span>
                            <p className="text-[11px] text-slate-600 font-mono">Razorpay Gateway Ref: #RZP-2026-F992</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-black font-mono text-emerald-600">₹1,25,000.00</span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded block mt-0.5">
                              PAID &amp; CLEARED
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] font-mono text-slate-500">Cryptographically Signed PDF Voucher</span>
                          <Button
                            size="xs"
                            onClick={() => toast.success('Downloaded official clearance PDF!')}
                            className="bg-[#1E3A8A] hover:bg-[#172554] text-white text-xs font-bold cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 mr-1" />
                            <span>Download Receipt</span>
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Widget Condition 3: Timetable Navigation */}
                    {activePrompt.widgetType === 'timetable' && (
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold font-mono text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                                CS301
                              </span>
                              <span className="text-xs font-bold text-slate-900">Distributed Systems &amp; Microservices</span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-mono">Faculty: Prof. R. Sharma · Room: Lecture Hall 302</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-lg">
                            Starts in 45m
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Widget Condition 4: Coursework Submissions */}
                    {activePrompt.widgetType === 'assignment' && (
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-slate-900">Lab 4: Raft Consensus Engine</span>
                            <p className="text-[11px] text-slate-600 font-mono">Weight: 15% of semester grade · Automated Test Suite</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded block">
                              Due Friday 11:59 PM
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. THE 3 STAKEHOLDER ROLE PORTALS (Interactive Tabs)          */}
      {/* ============================================================== */}
      <section id="portals" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Role-Based Access Control
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Tailored Portals for Every Campus Stakeholder
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Strict enterprise security and RBAC route guards ensure students, educators, and university executives only access the data and workflows they are authorized to manage.
            </p>
          </div>

          {/* Interactive Role Switcher Tabs */}
          <div className="flex justify-center">
            <div className="p-1.5 rounded-2xl bg-slate-200/70 border border-slate-300/80 inline-flex items-center gap-1">
              <button
                onClick={() => { playClickTick(); setActiveTabRole('student'); }}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTabRole === 'student'
                    ? 'bg-white text-[#1E3A8A] shadow-soft-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4 text-blue-600" />
                <span>Student Portal</span>
              </button>

              <button
                onClick={() => { playClickTick(); setActiveTabRole('faculty'); }}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTabRole === 'faculty'
                    ? 'bg-white text-emerald-800 shadow-soft-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Faculty Hub</span>
              </button>

              <button
                onClick={() => { playClickTick(); setActiveTabRole('admin'); }}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTabRole === 'admin'
                    ? 'bg-white text-amber-800 shadow-soft-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Administrator Command</span>
              </button>
            </div>
          </div>

          {/* Tab Content Showcase Card */}
          <div className="max-w-5xl mx-auto">
            {activeTabRole === 'student' && (
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1E3A8A]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Student Portal: Academic Autopilot</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Students get full autonomous clarity over their academic standing without waiting in long administrative lines.
                    </p>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span><strong>What-If Absence Simulator:</strong> Calculates safe absences before 75% cutoff breach.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span><strong>Razorpay Fee Clearance:</strong> 1-click tuition clearance with instant PDF receipts.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span><strong>Cryptographic Exam Hall Tickets:</strong> Verified seating row &amp; desk allocation.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span><strong>Interactive Coursework Submission:</strong> Automated checksum &amp; deadline verification.</span>
                    </li>
                  </ul>

                  <Button
                    onClick={() => onDemoLogin('student')}
                    size="lg"
                    className="bg-[#1E3A8A] hover:bg-[#172554] text-white font-bold text-xs px-6 py-3 rounded-xl cursor-pointer shadow-soft-xs"
                  >
                    <span>Launch Student Demo (Alex Chen) →</span>
                  </Button>
                </div>

                {/* Visual Preview Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E3A8A] font-mono">LIVE PREVIEW: ALEX CHEN</span>
                    <Badge variant="success" withDot>Safe Cutoff</Badge>
                  </div>
                  <div className="p-4 rounded-xl bg-white shadow-2xs space-y-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Aggregate Biometric Attendance</div>
                    <div className="text-2xl font-black font-mono text-emerald-600">84.85%</div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[84.85%]" />
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white shadow-2xs flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Fall '26 Semester Fee</span>
                    <span className="font-mono font-bold text-emerald-600">₹0.00 Due (Cleared)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTabRole === 'faculty' && (
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Faculty Hub: Classroom Operations</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Empowering professors to take roll in under 30 seconds and grade code assignments with rubric intelligence.
                    </p>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span><strong>30-Second Batch Attendance Roster:</strong> 1-click P/A/L roll call toggles.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span><strong>Automated Absent Parent Notifications:</strong> SMS notices sent upon saving roll.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span><strong>AI Code Rubric Evaluation Drawer:</strong> Automated test suites and rubric scores.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span><strong>Shortage Risk Detector (&lt;75%):</strong> Proactive student deficiency warnings.</span>
                    </li>
                  </ul>

                  <Button
                    onClick={() => onDemoLogin('faculty')}
                    size="lg"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-3 rounded-xl cursor-pointer shadow-soft-xs"
                  >
                    <span>Launch Faculty Demo (Dr. Rajesh Kumar) →</span>
                  </Button>
                </div>

                {/* Visual Preview Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 font-mono">LIVE PREVIEW: DR. RAJESH KUMAR</span>
                    <Badge variant="success" withDot>3 Courses Active</Badge>
                  </div>
                  <div className="p-4 rounded-xl bg-white shadow-2xs space-y-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Roll Call Batch Attendance</div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 pt-1">
                      <span>CS301 Section A</span>
                      <span className="text-emerald-600 font-mono">58/62 Present</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white shadow-2xs flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Pending Lab Evaluations</span>
                    <span className="font-mono font-bold text-amber-600">18 Submissions</span>
                  </div>
                </div>
              </div>
            )}

            {activeTabRole === 'admin' && (
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Administrator Command: Observability</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Executive governance, multi-agent response latency benchmarks, system audit logs, and college-wide broadcasts.
                    </p>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span><strong>Real-Time Agent Telemetry:</strong> Latency percentiles across all 7 domain nodes.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span><strong>Query Distribution Recharts:</strong> Throughput monitoring and load balancing.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span><strong>Filterable System Audit Logs:</strong> Immutable transactional records.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span><strong>Emergency Broadcast Dispatch:</strong> Multi-channel alerts sent in under 2 seconds.</span>
                    </li>
                  </ul>

                  <Button
                    onClick={() => onDemoLogin('admin')}
                    size="lg"
                    className="bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs px-6 py-3 rounded-xl cursor-pointer shadow-soft-xs"
                  >
                    <span>Launch Admin Demo (Dean Roberts) →</span>
                  </Button>
                </div>

                {/* Visual Preview Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 font-mono">LIVE PREVIEW: DEAN ROBERTS</span>
                    <Badge variant="warning" withDot>7 Nodes Online</Badge>
                  </div>
                  <div className="p-4 rounded-xl bg-white shadow-2xs space-y-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Median Fleet Latency</div>
                    <div className="text-2xl font-black font-mono text-amber-600">18.4ms</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white shadow-2xs flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Multi-Channel Broadcast Composer</span>
                    <span className="font-mono font-bold text-blue-700">Ready</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. THE 7 AUTONOMOUS AI AGENTS FLEET                           */}
      {/* ============================================================== */}
      <section id="agents" className="py-20 sm:py-28 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Coordinated Fleet Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              7 Specialized Autonomous Domain Agents
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Instead of a single monolithic chatbot, inquiries are parsed by the Central Coordinator and routed to specialized agents with bound database tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Object.values(AGENT_REGISTRY).map((agent) => (
              <div 
                key={agent.id}
                className="p-5 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 hover:bg-white hover:shadow-soft-md hover:border-blue-300 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-xs shadow-soft-xs"
                      style={{ backgroundColor: agent.color }}
                    >
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Active Node
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{agent.name}</h3>
                    <span className="text-xs font-mono text-slate-500 font-medium">{agent.role}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] font-mono text-slate-600">
                  <span>Domain: <strong>{agent.id.toUpperCase()}</strong></span>
                  <span className="text-emerald-600 font-bold">&lt;20ms</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. COMPARISON: LEGACY 2000s ERP VS SMART CAMPUS AI            */}
      {/* ============================================================== */}
      <section id="comparison" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              The Modern Paradigm
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Why Traditional College ERPs Fail
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Legacy systems bury critical academic data behind 15 different navigation submenus. Smart Campus AI unifies everything in one natural language conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Old Way */}
            <div className="p-7 sm:p-9 rounded-3xl bg-rose-50/40 border border-rose-200/80 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-lg">
                  ✕
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Legacy University ERPs</h3>
                  <p className="text-xs text-slate-500">Fragmented, high-friction, and manual</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-600 pt-1">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Students calculate attendance safety margins by hand, often breaching the 75% cutoff without warning.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Faculty spend 15 minutes per lecture calling roll and hours fielding repetitive syllabus emails.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Fee payment reconciliation requires standing in administrative queues to show physical bank slips.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>Emergency alerts rely on delayed emails that students rarely read in time.</span>
                </li>
              </ul>
            </div>

            {/* The Smart Campus AI Way */}
            <div className="p-7 sm:p-9 rounded-3xl bg-blue-50/50 border border-blue-200/90 space-y-5 shadow-soft-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center font-black text-lg shadow-soft-xs">
                  ✓
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Smart Campus AI Ecosystem</h3>
                  <p className="text-xs text-slate-500">Proactive, automated, and instantaneous</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-700 pt-1">
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
      {/* 7. ZERO-FRICTION 1-CLICK DEMO LAUNCHER (CONVERSION HOOK)        */}
      {/* ============================================================== */}
      <section id="demo-launcher" className="py-20 sm:py-28 bg-gradient-to-b from-white to-blue-50/60 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Immediate Access
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Test Drive the Platform in 1 Click
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No registration or passwords required. Select a persona below to immediately launch the full live application with preloaded records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Student Alex Chen */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft-sm hover:shadow-soft-lg hover:border-blue-400/60 transition-all flex flex-col justify-between space-y-6 text-center">
              <div className="space-y-3.5">
                <div className="w-18 h-18 rounded-full bg-blue-50 border-2 border-blue-200 mx-auto flex items-center justify-center text-[#1E3A8A] font-black text-2xl shadow-xs">
                  AC
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Alex Chen</h3>
                  <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Roll #CS-2024-104
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  B.Tech CSE Semester 5 · CGPA 3.84 · 84.85% Attendance · Hostel Resident
                </p>
              </div>

              <Button
                onClick={() => onDemoLogin('student')}
                variant="primary"
                className="w-full bg-[#1E3A8A] hover:bg-[#172554] text-xs font-bold py-3 rounded-xl cursor-pointer shadow-soft-xs"
              >
                <span>Launch Student Demo →</span>
              </Button>
            </div>

            {/* Faculty Dr. Rajesh Kumar */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft-sm hover:shadow-soft-lg hover:border-emerald-400/60 transition-all flex flex-col justify-between space-y-6 text-center">
              <div className="space-y-3.5">
                <div className="w-18 h-18 rounded-full bg-emerald-50 border-2 border-emerald-200 mx-auto flex items-center justify-center text-emerald-700 font-black text-2xl shadow-xs">
                  RK
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Dr. Rajesh Kumar</h3>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Faculty #FAC-CS-042
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Academic Head CSE · 3 Active Courses · 184 Students · 18 Submissions to Grade
                </p>
              </div>

              <Button
                onClick={() => onDemoLogin('faculty')}
                variant="primary"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-xs font-bold py-3 rounded-xl cursor-pointer shadow-soft-xs"
              >
                <span>Launch Faculty Demo →</span>
              </Button>
            </div>

            {/* Admin Dean Roberts */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft-sm hover:shadow-soft-lg hover:border-amber-400/60 transition-all flex flex-col justify-between space-y-6 text-center">
              <div className="space-y-3.5">
                <div className="w-18 h-18 rounded-full bg-amber-50 border-2 border-amber-200 mx-auto flex items-center justify-center text-amber-700 font-black text-2xl shadow-xs">
                  DR
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Dean Roberts</h3>
                  <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Executive Admin #ADM-001
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Office of the Provost · 4,495 Campus Population · 7 Agent Nodes · Full Telemetry
                </p>
              </div>

              <Button
                onClick={() => onDemoLogin('admin')}
                variant="primary"
                className="w-full bg-amber-700 hover:bg-amber-800 text-xs font-bold py-3 rounded-xl cursor-pointer shadow-soft-xs"
              >
                <span>Launch Admin Demo →</span>
              </Button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onOpenLogin}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 hover:underline cursor-pointer"
            >
              Want to log in with your university credentials instead? Click here →
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. FOOTER                                                      */}
      {/* ============================================================== */}
      <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white shadow-soft-xs">
              <GraduationCap className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <span className="font-black text-slate-900 text-sm">Smart Campus AI</span>
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
