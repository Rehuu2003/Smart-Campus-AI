import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  CreditCard, 
  Calendar, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp,
  GraduationCap
} from 'lucide-react';

export function IsometricCampusGraphic() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto flex items-center justify-center select-none overflow-visible">
      {/* Ambient Lighting & Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 via-white/50 to-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Isometric SVG Canvas */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Porcelain Gradients */}
          <linearGradient id="porcelainTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="porcelainLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="porcelainRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Cobalt Blue Gradients */}
          <linearGradient id="cobaltTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="cobaltLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="cobaltRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Cyan Glow & Grid */}
          <linearGradient id="gridGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
          </linearGradient>

          <filter id="shadowBevel" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* ============================================================== */}
        {/* BASE GROUND PLATFORM (Isometric Diamond)                       */}
        {/* ============================================================== */}
        {/* Shadow */}
        <polygon points="400,100 720,280 400,470 80,280" fill="#E2E8F0" opacity="0.6" />
        
        {/* Base Slab Top */}
        <polygon points="400,90 710,265 400,445 90,265" fill="url(#porcelainTop)" stroke="#CBD5E1" strokeWidth="1.5" />
        {/* Base Slab Left Side */}
        <polygon points="90,265 400,445 400,465 90,285" fill="url(#porcelainLeft)" />
        {/* Base Slab Right Side */}
        <polygon points="400,445 710,265 710,285 400,465" fill="url(#porcelainRight)" />

        {/* Isometric Grid Lines on Ground (Cobalt Data Arteries) */}
        <g stroke="url(#gridGlow)" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4">
          <line x1="245" y1="177" x2="555" y2="355" />
          <line x1="167" y1="221" x2="477" y2="400" />
          <line x1="322" y1="133" x2="632" y2="311" />
          
          <line x1="555" y1="177" x2="245" y2="355" />
          <line x1="477" y1="133" x2="167" y2="311" />
          <line x1="632" y1="221" x2="322" y2="400" />
        </g>

        {/* ============================================================== */}
        {/* CENTRAL TOWER: AI COORDINATOR HEADQUARTERS                     */}
        {/* ============================================================== */}
        {/* Shadow */}
        <polygon points="350,300 450,240 450,360 350,420" fill="#CBD5E1" opacity="0.4" />

        {/* Main Central High-Rise */}
        {/* Left Wall */}
        <polygon points="360,180 400,205 400,380 360,355" fill="url(#porcelainLeft)" stroke="#CBD5E1" strokeWidth="1" />
        {/* Right Wall */}
        <polygon points="400,205 440,180 440,355 400,380" fill="url(#porcelainRight)" stroke="#CBD5E1" strokeWidth="1" />
        {/* Roof Cap */}
        <polygon points="360,180 400,155 440,180 400,205" fill="url(#cobaltTop)" />
        {/* Spire */}
        <line x1="400" y1="155" x2="400" y2="105" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="400" cy="105" r="5" fill="#3B82F6" className="animate-ping" opacity="0.75" />
        <circle cx="400" cy="105" r="4" fill="#60A5FA" />

        {/* Blue Windows on Central Tower */}
        <g fill="#2563EB" opacity="0.85">
          {/* Left Windows */}
          <polygon points="370,220 390,232 390,242 370,230" />
          <polygon points="370,255 390,267 390,277 370,265" />
          <polygon points="370,290 390,302 390,312 370,300" />
          <polygon points="370,325 390,337 390,347 370,335" />

          {/* Right Windows */}
          <polygon points="410,232 430,220 430,230 410,242" />
          <polygon points="410,267 430,255 430,265 410,277" />
          <polygon points="410,302 430,290 430,300 410,312" />
          <polygon points="410,337 430,325 430,335 410,347" />
        </g>

        {/* ============================================================== */}
        {/* BUILDING 2: SCIENCE & ENGINEERING LAB (Left)                   */}
        {/* ============================================================== */}
        {/* Left Wall */}
        <polygon points="220,230 270,260 270,360 220,330" fill="url(#porcelainLeft)" stroke="#CBD5E1" strokeWidth="1" />
        {/* Right Wall */}
        <polygon points="270,260 320,230 320,330 270,360" fill="url(#porcelainRight)" stroke="#CBD5E1" strokeWidth="1" />
        {/* Roof */}
        <polygon points="220,230 270,200 320,230 270,260" fill="url(#porcelainTop)" stroke="#CBD5E1" strokeWidth="1" />

        {/* Blue Cylindrical Silos / Fluid Tankers (Matches Image 2) */}
        <g fill="url(#cobaltTop)" stroke="#1D4ED8" strokeWidth="1">
          <ellipse cx="205" cy="280" rx="12" ry="7" />
          <rect x="193" y="280" width="24" height="40" fill="url(#cobaltLeft)" />
          <ellipse cx="205" cy="320" rx="12" ry="7" fill="url(#cobaltLeft)" />

          <ellipse cx="180" cy="295" rx="10" ry="6" />
          <rect x="170" y="295" width="20" height="35" fill="url(#cobaltLeft)" />
          <ellipse cx="180" cy="330" rx="10" ry="6" fill="url(#cobaltLeft)" />
        </g>

        {/* ============================================================== */}
        {/* BUILDING 3: ACADEMIC LECTURE HALL (Right)                      */}
        {/* ============================================================== */}
        {/* Stepped Modern Auditorium */}
        <polygon points="480,240 540,275 540,365 480,330" fill="url(#porcelainLeft)" stroke="#CBD5E1" strokeWidth="1" />
        <polygon points="540,275 600,240 600,330 540,365" fill="url(#porcelainRight)" stroke="#CBD5E1" strokeWidth="1" />
        <polygon points="480,240 540,205 600,240 540,275" fill="url(#cobaltTop)" stroke="#1D4ED8" strokeWidth="1" />

        {/* Architectural Pillars / Louvers */}
        <g stroke="#2563EB" strokeWidth="2" opacity="0.8">
          <line x1="500" y1="260" x2="500" y2="335" />
          <line x1="515" y1="268" x2="515" y2="343" />
          <line x1="530" y1="277" x2="530" y2="352" />
        </g>

        {/* ============================================================== */}
        {/* FRONT PAVILION: STUDENT COMMONS (Center Bottom)                */}
        {/* ============================================================== */}
        <polygon points="340,370 400,405 400,455 340,420" fill="url(#porcelainLeft)" stroke="#CBD5E1" strokeWidth="1" />
        <polygon points="400,405 460,370 460,420 400,455" fill="url(#porcelainRight)" stroke="#CBD5E1" strokeWidth="1" />
        <polygon points="340,370 400,335 460,370 400,405" fill="url(#porcelainTop)" stroke="#CBD5E1" strokeWidth="1" />

        {/* Small Cobalt Trees (Matches Reference Images 2 & 3) */}
        <g fill="#2563EB">
          <circle cx="280" cy="385" r="7" />
          <circle cx="305" cy="400" r="8" />
          <circle cx="510" cy="390" r="7" />
          <circle cx="535" cy="375" r="8" />
        </g>

        {/* Data Arcs / Connecting Beacons */}
        <path
          d="M 270 200 Q 340 130 400 155"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.8"
        />
        <path
          d="M 400 155 Q 470 140 540 205"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.8"
        />
      </svg>

      {/* ============================================================== */}
      {/* FLOATING FROSTED GLASS WIDGETS (Matches Images 1 & 3)          */}
      {/* ============================================================== */}

      {/* 1. Top Left: Live Attendance Gauge */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 left-0 sm:left-4 z-20 p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-2xl space-y-1.5 max-w-[190px] sm:max-w-[220px]"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Attendance Agent
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">84.85%</span>
          <span className="text-[11px] font-bold text-emerald-600 font-mono">+12 Safe</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-emerald-500 h-1.5 rounded-full w-[84.85%]" />
        </div>
        <p className="text-[10px] text-slate-500 truncate">CS301 Distributed Systems</p>
      </motion.div>

      {/* 2. Top Right: Instant Razorpay Clearance */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 right-0 sm:right-4 z-20 p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-2xl space-y-2 max-w-[180px] sm:max-w-[210px]"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Fee &amp; Finance
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Semester Dues</div>
          <div className="text-lg sm:text-xl font-extrabold text-slate-900">₹0.00 Due</div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Clearance Verified
        </span>
      </motion.div>

      {/* 3. Bottom Left: Live Lecture Beacon */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [3, -3, 3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-2 sm:left-6 z-20 p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-2xl space-y-1 max-w-[190px] sm:max-w-[220px]"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-700">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Next Lecture · In 45m</span>
        </div>
        <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
          CS301 Microservices
        </div>
        <div className="text-[11px] text-slate-500 font-mono">
          LH-302 · Prof. R. Sharma
        </div>
      </motion.div>

      {/* 4. Bottom Right: Coordinated Agent Fleet */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-4 right-2 sm:right-6 z-20 p-3 sm:p-4 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-2xl space-y-1.5 max-w-[180px] sm:max-w-[210px]"
      >
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#1E3A8A]" />
            Agent Fleet
          </span>
          <span className="text-[10px] font-mono text-emerald-600 font-bold">7 Online</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-xs ring-2 ring-white" title="Coordinator" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs ring-2 ring-white" title="Attendance" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs ring-2 ring-white" title="Fee" />
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-xs ring-2 ring-white" title="Timetable" />
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs ring-2 ring-white" title="Assignment" />
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-xs ring-2 ring-white" title="Exam" />
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-xs ring-2 ring-white" title="Support" />
        </div>
        <div className="text-[10px] text-slate-400 font-mono">Median Latency: 22ms</div>
      </motion.div>
    </div>
  );
}
