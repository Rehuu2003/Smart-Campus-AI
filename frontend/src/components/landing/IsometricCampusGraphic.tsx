import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  BookOpen, 
  Building2, 
  Zap, 
  Cpu, 
  Layers, 
  MapPin, 
  TrendingUp, 
  Activity,
  Maximize2
} from 'lucide-react';
import { playClickTick } from '@/lib/soundEffects';

export interface CampusBuilding {
  id: string;
  name: string;
  department: string;
  agent: string;
  agentColor: string;
  status: 'optimal' | 'active' | 'synced';
  latency: string;
  liveStudents: number;
  highlightText: string;
  markerCoords: { x: number; y: number };
}

const BUILDINGS: CampusBuilding[] = [
  {
    id: 'hq',
    name: 'Autonomous AI Coordinator HQ',
    department: 'Central Orchestration Core',
    agent: 'Orchestrator Agent',
    agentColor: '#1E3A8A',
    status: 'optimal',
    latency: '14ms',
    liveStudents: 4495,
    highlightText: 'Central LangGraph routing node coordinating all 7 domain agents with sub-20ms intent resolution.',
    markerCoords: { x: 500, y: 155 },
  },
  {
    id: 'computing',
    name: 'CS & AI Research Pavilion',
    department: 'School of Computing & Data Sciences',
    agent: 'Assignment & Timetable Agents',
    agentColor: '#2563EB',
    status: 'active',
    latency: '18ms',
    liveStudents: 840,
    highlightText: 'High-density computational labs, GPU clusters, and automated assignment code test suites.',
    markerCoords: { x: 260, y: 270 },
  },
  {
    id: 'auditorium',
    name: 'Academic Lecture Arena & Exams',
    department: 'University Examination Board',
    agent: 'Exam & Attendance Agents',
    agentColor: '#0EA5E9',
    status: 'synced',
    latency: '16ms',
    liveStudents: 1250,
    highlightText: 'Automated biometric attendance turnstiles and cryptographic QR hall ticket verification desks.',
    markerCoords: { x: 740, y: 280 },
  },
  {
    id: 'bursar',
    name: 'Digital Bursar & Student Commons',
    department: 'Financial Comptroller Office',
    agent: 'Fee Ledger Agent',
    agentColor: '#D97706',
    status: 'optimal',
    latency: '22ms',
    liveStudents: 620,
    highlightText: 'Direct Razorpay institutional banking rails with automated digital ledger reconciliation.',
    markerCoords: { x: 500, y: 440 },
  },
  {
    id: 'library',
    name: 'Knowledge Hub & Central Archives',
    department: 'Academic Research & Library Services',
    agent: 'Campus Support Agent',
    agentColor: '#059669',
    status: 'optimal',
    latency: '15ms',
    liveStudents: 785,
    highlightText: 'Full-text institutional handbook semantic search and 24/7 autonomous query resolution.',
    markerCoords: { x: 500, y: 80 },
  },
];

export function IsometricCampusGraphic() {
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuilding>(BUILDINGS[0]);
  const [hoveredBuilding, setHoveredBuilding] = useState<CampusBuilding | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'telemetry' | 'arteries'>('all');

  const handleSelectBuilding = (b: CampusBuilding) => {
    playClickTick();
    setSelectedBuilding(b);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      
      {/* Top Floating Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-soft-xs text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Campus Digital Twin · Interactive 3D Model</span>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500">
            Click any building beacon to inspect live telemetry
          </span>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/60 backdrop-blur-md border border-slate-300/60 text-xs font-semibold">
          <button
            onClick={() => { playClickTick(); setViewMode('all'); }}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === 'all'
                ? 'bg-white text-[#1E3A8A] font-bold shadow-soft-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Full Campus
          </button>
          <button
            onClick={() => { playClickTick(); setViewMode('telemetry'); }}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === 'telemetry'
                ? 'bg-white text-[#1E3A8A] font-bold shadow-soft-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Telemetry Grid
          </button>
          <button
            onClick={() => { playClickTick(); setViewMode('arteries'); }}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === 'arteries'
                ? 'bg-white text-[#1E3A8A] font-bold shadow-soft-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Data Arteries
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Stage */}
      <div className="relative rounded-3xl bg-gradient-to-b from-white via-slate-50/90 to-blue-50/40 p-4 sm:p-8 border border-slate-200/90 shadow-[0_20px_50px_rgba(30,58,138,0.06)] overflow-hidden">
        
        {/* Soft Ambient Radial Backlights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-200/25 via-indigo-100/30 to-cyan-100/20 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* SVG Isometric Canvas */}
        <div className="relative w-full aspect-[16/10] max-h-[580px]">
          <svg
            viewBox="0 0 1000 620"
            className="w-full h-full drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Porcelain Shading Gradients */}
              <linearGradient id="porcelainRoof" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F8FAFC" />
              </linearGradient>
              <linearGradient id="porcelainShadeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <linearGradient id="porcelainShadeRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>

              {/* Cobalt Royal Accents (Matching Reference Images) */}
              <linearGradient id="cobaltDeep" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
              <linearGradient id="cobaltLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="cobaltGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.95" />
              </linearGradient>

              {/* Glowing Grid & Artery Gradients */}
              <linearGradient id="arteryGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.9" />
              </linearGradient>

              {/* Soft Drop Shadow Filter for Floating Beacons */}
              <filter id="beaconGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1E3A8A" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* ============================================================== */}
            {/* 1. ISOMETRIC BASE GROUND SLAB & PEDESTAL                       */}
            {/* ============================================================== */}
            {/* Ground Pedestal Shadow */}
            <polygon points="500,70 920,310 500,560 80,310" fill="#CBD5E1" opacity="0.45" />

            {/* Base Porcelain Slab Top */}
            <polygon 
              points="500,50 910,290 500,535 90,290" 
              fill="url(#porcelainRoof)" 
              stroke="#CBD5E1" 
              strokeWidth="2" 
            />
            {/* Slab Left Side */}
            <polygon points="90,290 500,535 500,560 90,315" fill="url(#porcelainShadeLeft)" />
            {/* Slab Right Side */}
            <polygon points="500,535 910,290 910,315 500,560" fill="url(#porcelainShadeRight)" />

            {/* Isometric Campus Grid Lines (Cobalt Data Arteries) */}
            <g stroke="url(#arteryGlow)" strokeWidth={viewMode === 'arteries' ? '2.5' : '1.5'} opacity={viewMode === 'arteries' ? 0.9 : 0.4} strokeDasharray={viewMode === 'arteries' ? '6 4' : '4 4'}>
              {/* Northwest to Southeast lines */}
              <line x1="300" y1="170" x2="710" y2="415" />
              <line x1="200" y1="230" x2="610" y2="475" />
              <line x1="400" y1="110" x2="810" y2="355" />
              
              {/* Northeast to Southwest lines */}
              <line x1="700" y1="170" x2="290" y2="415" />
              <line x1="600" y1="110" x2="190" y2="355" />
              <line x1="800" y1="230" x2="390" y2="475" />
            </g>

            {/* ============================================================== */}
            {/* 2. CAMPUS PLAZA & ALABASTER WALKWAYS                           */}
            {/* ============================================================== */}
            {/* Main Central Circular Rotary Plaza */}
            <ellipse cx="500" cy="315" rx="90" ry="50" fill="#F1F5F9" stroke="#93C5FD" strokeWidth="2" />
            <ellipse cx="500" cy="315" rx="55" ry="30" fill="#E2E8F0" stroke="#3B82F6" strokeWidth="1.5" />
            {/* Central Fountain / Core Telemetry Hub */}
            <ellipse cx="500" cy="315" rx="24" ry="13" fill="url(#cobaltLight)" />
            <ellipse cx="500" cy="312" rx="20" ry="10" fill="#60A5FA" />

            {/* Radiating Walkways */}
            <polygon points="485,315 515,315 515,440 485,440" fill="#E2E8F0" opacity="0.7" />
            <polygon points="310,270 450,305 440,325 300,290" fill="#E2E8F0" opacity="0.7" />
            <polygon points="690,270 550,305 560,325 700,290" fill="#E2E8F0" opacity="0.7" />

            {/* ============================================================== */}
            {/* 3. COBALT BLUE FOLIAGE TREES (Matches Reference Images 2 & 3) */}
            {/* ============================================================== */}
            <g fill="#2563EB">
              {/* Left Wing Trees */}
              <ellipse cx="360" cy="360" rx="8" ry="5" fill="#CBD5E1" opacity="0.6" />
              <circle cx="360" cy="355" r="9" />
              <circle cx="360" cy="351" r="6" fill="#3B82F6" />

              <ellipse cx="390" cy="380" rx="9" ry="5" fill="#CBD5E1" opacity="0.6" />
              <circle cx="390" cy="375" r="10" />
              <circle cx="390" cy="370" r="7" fill="#3B82F6" />

              <ellipse cx="230" cy="370" rx="8" ry="4" fill="#CBD5E1" opacity="0.6" />
              <circle cx="230" cy="365" r="9" />

              {/* Right Wing Trees */}
              <ellipse cx="640" cy="360" rx="8" ry="5" fill="#CBD5E1" opacity="0.6" />
              <circle cx="640" cy="355" r="9" />
              <circle cx="640" cy="351" r="6" fill="#3B82F6" />

              <ellipse cx="610" cy="380" rx="9" ry="5" fill="#CBD5E1" opacity="0.6" />
              <circle cx="610" cy="375" r="10" />
              <circle cx="610" cy="370" r="7" fill="#3B82F6" />

              <ellipse cx="770" cy="370" rx="8" ry="4" fill="#CBD5E1" opacity="0.6" />
              <circle cx="770" cy="365" r="9" />

              {/* North Trees */}
              <circle cx="430" cy="180" r="8" />
              <circle cx="570" cy="180" r="8" />
            </g>

            {/* ============================================================== */}
            {/* 4. STYLIZED 3D MINIATURE SILHOUETTES (Walking on Campus)       */}
            {/* ============================================================== */}
            <g opacity="0.85">
              {/* Student 1 (West Pathway) */}
              <ellipse cx="380" cy="315" rx="3" ry="1.5" fill="#CBD5E1" />
              <line x1="380" y1="315" x2="380" y2="305" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
              <circle cx="380" cy="303" r="2" fill="#1E3A8A" />

              {/* Student 2 (Central Plaza) */}
              <ellipse cx="530" cy="335" rx="3" ry="1.5" fill="#CBD5E1" />
              <line x1="530" y1="335" x2="530" y2="325" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
              <circle cx="530" cy="323" r="2" fill="#2563EB" />

              {/* Faculty member (East Pathway) */}
              <ellipse cx="620" cy="315" rx="3" ry="1.5" fill="#CBD5E1" />
              <line x1="620" y1="315" x2="620" y2="304" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="620" cy="302" r="2" fill="#0F172A" />

              {/* Student 3 (South Pathway) */}
              <ellipse cx="490" cy="400" rx="3" ry="1.5" fill="#CBD5E1" />
              <line x1="490" y1="400" x2="490" y2="390" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
              <circle cx="490" cy="388" r="2" fill="#1E3A8A" />
            </g>

            {/* ============================================================== */}
            {/* 5. BUILDING: CENTRAL AI COORDINATOR TOWER (HQ)                 */}
            {/* ============================================================== */}
            <g 
              className="cursor-pointer transition-transform hover:opacity-95"
              onClick={() => handleSelectBuilding(BUILDINGS[0])}
              onMouseEnter={() => setHoveredBuilding(BUILDINGS[0])}
              onMouseLeave={() => setHoveredBuilding(null)}
            >
              {/* Shadow */}
              <polygon points="440,240 560,170 560,290 440,360" fill="#CBD5E1" opacity="0.4" />

              {/* Central High-Rise Tower (Tier 1 Base) */}
              <polygon points="450,180 500,210 500,290 450,260" fill="url(#porcelainShadeLeft)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="500,210 550,180 550,260 500,290" fill="url(#porcelainShadeRight)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="450,180 500,150 550,180 500,210" fill="url(#porcelainRoof)" stroke="#CBD5E1" strokeWidth="1" />

              {/* Tier 2 Tower (Upper Section) */}
              <polygon points="465,130 500,150 500,200 465,180" fill="url(#porcelainShadeLeft)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="500,150 535,130 535,180 500,200" fill="url(#porcelainShadeRight)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="465,130 500,110 535,130 500,150" fill="url(#cobaltDeep)" stroke="#1D4ED8" strokeWidth="1" />

              {/* Blue Glass Facade Windows */}
              <g fill="url(#cobaltGlass)">
                <polygon points="460,200 480,212 480,222 460,210" />
                <polygon points="460,228 480,240 480,250 460,238" />
                <polygon points="520,200 540,188 540,198 520,210" />
                <polygon points="520,228 540,216 540,226 520,238" />
                
                {/* Upper Tier Windows */}
                <polygon points="472,145 490,155 490,165 472,155" />
                <polygon points="510,155 528,145 528,155 510,165" />
              </g>

              {/* Spire with Glowing Animated Beacon */}
              <line x1="500" y1="110" x2="500" y2="60" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="500" cy="60" r="7" fill="#3B82F6" className="animate-ping" opacity="0.6" />
              <circle cx="500" cy="60" r="6" fill="#2563EB" />
              <circle cx="500" cy="60" r="3" fill="#FFFFFF" />

              {/* Connecting Glass Skybridges to Wings */}
              {/* West Skybridge */}
              <polygon points="450,215 390,240 390,255 450,230" fill="url(#cobaltGlass)" opacity="0.8" />
              <polygon points="450,215 480,200 420,225 390,240" fill="url(#porcelainRoof)" stroke="#93C5FD" strokeWidth="1" />
              {/* East Skybridge */}
              <polygon points="550,215 610,240 610,255 550,230" fill="url(#cobaltGlass)" opacity="0.8" />
              <polygon points="550,215 520,200 580,225 610,240" fill="url(#porcelainRoof)" stroke="#93C5FD" strokeWidth="1" />
            </g>

            {/* ============================================================== */}
            {/* 6. BUILDING: CS & AI RESEARCH COMPLEX (West Wing)              */}
            {/* ============================================================== */}
            <g 
              className="cursor-pointer transition-transform hover:opacity-95"
              onClick={() => handleSelectBuilding(BUILDINGS[1])}
              onMouseEnter={() => setHoveredBuilding(BUILDINGS[1])}
              onMouseLeave={() => setHoveredBuilding(null)}
            >
              {/* Stepped Labs */}
              <polygon points="200,240 270,280 270,360 200,320" fill="url(#porcelainShadeLeft)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="270,280 340,240 340,320 270,360" fill="url(#porcelainShadeRight)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="200,240 270,200 340,240 270,280" fill="url(#porcelainRoof)" stroke="#CBD5E1" strokeWidth="1" />

              {/* Second Tier Lab Floor */}
              <polygon points="225,200 270,225 270,255 225,230" fill="url(#porcelainShadeLeft)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="270,225 315,200 315,230 270,255" fill="url(#porcelainShadeRight)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="225,200 270,175 315,200 270,225" fill="url(#cobaltDeep)" stroke="#1D4ED8" strokeWidth="1" />

              {/* Cylindrical Cobalt Silos / Fluid Tankers (Matches Image 2) */}
              <g fill="url(#cobaltDeep)" stroke="#1D4ED8" strokeWidth="1">
                <ellipse cx="175" cy="280" rx="14" ry="8" />
                <rect x="161" y="280" width="28" height="45" fill="url(#cobaltDeep)" />
                <ellipse cx="175" cy="325" rx="14" ry="8" fill="url(#cobaltDeep)" />

                <ellipse cx="145" cy="295" rx="12" ry="7" />
                <rect x="133" y="295" width="24" height="40" fill="url(#cobaltDeep)" />
                <ellipse cx="145" cy="335" rx="12" ry="7" fill="url(#cobaltDeep)" />
              </g>

              {/* Connecting Cobalt Pipeline Conduit */}
              <path
                d="M 175 285 Q 190 270 215 270 L 250 290"
                fill="none"
                stroke="#2563EB"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>

            {/* ============================================================== */}
            {/* 7. BUILDING: LECTURE AUDITORIUM & EXAMS (East Wing)            */}
            {/* ============================================================== */}
            <g 
              className="cursor-pointer transition-transform hover:opacity-95"
              onClick={() => handleSelectBuilding(BUILDINGS[2])}
              onMouseEnter={() => setHoveredBuilding(BUILDINGS[2])}
              onMouseLeave={() => setHoveredBuilding(null)}
            >
              {/* Stepped Modern Auditorium */}
              <polygon points="660,240 730,280 730,360 660,320" fill="url(#porcelainShadeLeft)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="730,280 800,240 800,320 730,360" fill="url(#porcelainShadeRight)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="660,240 730,200 800,240 730,280" fill="url(#cobaltLight)" stroke="#1D4ED8" strokeWidth="1.5" />

              {/* Architectural Pillars / Cobalt Louvers */}
              <g stroke="#1E3A8A" strokeWidth="2.5" opacity="0.85">
                <line x1="680" y1="265" x2="680" y2="335" />
                <line x1="695" y1="273" x2="695" y2="343" />
                <line x1="710" y1="281" x2="710" y2="351" />
              </g>
            </g>

            {/* ============================================================== */}
            {/* 8. BUILDING: STUDENT COMMONS & BURSAR (South Wing)             */}
            {/* ============================================================== */}
            <g 
              className="cursor-pointer transition-transform hover:opacity-95"
              onClick={() => handleSelectBuilding(BUILDINGS[3])}
              onMouseEnter={() => setHoveredBuilding(BUILDINGS[3])}
              onMouseLeave={() => setHoveredBuilding(null)}
            >
              <polygon points="420,400 500,445 500,505 420,460" fill="url(#porcelainShadeLeft)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="500,445 580,400 580,460 500,505" fill="url(#porcelainShadeRight)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="420,400 500,360 580,400 500,445" fill="url(#porcelainRoof)" stroke="#CBD5E1" strokeWidth="1" />

              {/* Entrance Canopy with Amber Accent */}
              <polygon points="475,445 500,460 525,445 500,430" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
            </g>

            {/* ============================================================== */}
            {/* 9. BUILDING: CENTRAL KNOWLEDGE LIBRARY (North Wing)            */}
            {/* ============================================================== */}
            <g 
              className="cursor-pointer transition-transform hover:opacity-95"
              onClick={() => handleSelectBuilding(BUILDINGS[4])}
              onMouseEnter={() => setHoveredBuilding(BUILDINGS[4])}
              onMouseLeave={() => setHoveredBuilding(null)}
            >
              <polygon points="440,75 500,105 500,150 440,120" fill="url(#porcelainShadeLeft)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="500,105 560,75 560,120 500,150" fill="url(#porcelainShadeRight)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="440,75 500,45 560,75 500,105" fill="#10B981" stroke="#059669" strokeWidth="1" />
            </g>

            {/* ============================================================== */}
            {/* 10. INTERACTIVE HOTSPOT BEACON PINS (Click to Inspect)        */}
            {/* ============================================================== */}
            {BUILDINGS.map((b) => {
              const isSelected = selectedBuilding.id === b.id;
              const isHovered = hoveredBuilding?.id === b.id;

              return (
                <g 
                  key={b.id} 
                  className="cursor-pointer"
                  onClick={() => handleSelectBuilding(b)}
                  onMouseEnter={() => setHoveredBuilding(b)}
                  onMouseLeave={() => setHoveredBuilding(null)}
                >
                  {/* Ping Animation Ring */}
                  <circle
                    cx={b.markerCoords.x}
                    cy={b.markerCoords.y}
                    r={isSelected ? 18 : 12}
                    fill={b.agentColor}
                    opacity="0.3"
                    className="animate-ping"
                  />
                  {/* Marker Pin Base */}
                  <circle
                    cx={b.markerCoords.x}
                    cy={b.markerCoords.y}
                    r={isSelected ? 14 : 10}
                    fill="#FFFFFF"
                    stroke={b.agentColor}
                    strokeWidth={isSelected ? 3.5 : 2.5}
                    filter="url(#beaconGlow)"
                  />
                  {/* Center Dot */}
                  <circle
                    cx={b.markerCoords.x}
                    cy={b.markerCoords.y}
                    r={isSelected ? 6 : 4}
                    fill={b.agentColor}
                  />

                  {/* Pulsing Connecting Tether line */}
                  <line
                    x1={b.markerCoords.x}
                    y1={b.markerCoords.y}
                    x2={b.markerCoords.x}
                    y2={b.markerCoords.y - (isSelected ? 32 : 24)}
                    stroke={b.agentColor}
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />

                  {/* Floating Pill Label */}
                  <g transform={`translate(${b.markerCoords.x - 55}, ${b.markerCoords.y - (isSelected ? 52 : 44)})`}>
                    <rect
                      width="110"
                      height="20"
                      rx="10"
                      fill="#FFFFFF"
                      stroke={isSelected ? b.agentColor : '#CBD5E1'}
                      strokeWidth={isSelected ? '1.5' : '1'}
                      filter="url(#beaconGlow)"
                    />
                    <text
                      x="55"
                      y="14"
                      textAnchor="middle"
                      fill="#0F172A"
                      fontSize="9"
                      fontWeight={isSelected ? 'bold' : '600'}
                      fontFamily="system-ui"
                    >
                      {b.name.split(' ')[0]} Hub
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Building Detail Inspector Card (Bottom Overlay) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBuilding.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-soft-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: selectedBuilding.agentColor }} 
                />
                <span className="font-extrabold text-sm sm:text-base text-slate-900">
                  {selectedBuilding.name}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {selectedBuilding.agent}
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {selectedBuilding.highlightText}
              </p>
            </div>

            {/* Quick Live Stats Pill Cluster */}
            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Latency</div>
                <div className="text-sm font-black font-mono text-emerald-600">{selectedBuilding.latency}</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Occupancy</div>
                <div className="text-sm font-black font-mono text-[#1E3A8A]">{selectedBuilding.liveStudents}</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Live Node
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
