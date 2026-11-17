import React from 'react';
import { CheckCircle2, ShieldCheck, AlertTriangle, Calendar, Award } from 'lucide-react';
import { AttendanceGauge } from '@/components/dashboard/AttendanceGauge';
import { MOCK_STUDENT_DATA } from '@/lib/mockData';
import { StatCard } from '@/components/dashboard/StatCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedContainer';

export function AttendanceView() {
  const { attendance } = MOCK_STUDENT_DATA;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Office of Academic Records · Automated Biometric &amp; Attendance Ledger
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Attendance Portfolio &amp; Projection Simulator
          </h1>

          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Real-time biometric attendance audit, subject-wise lecture participation records, and what-if safe absence projection engine for {MOCK_STUDENT_DATA.profile.name}.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
            <span className="bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Aggregate: {attendance.aggregatePercentage}% (Threshold: {attendance.minimumRequired}%)
            </span>
            <span className="bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              Safe Miss Buffer: {attendance.totalSafeMissesOverall} Classes
            </span>
          </div>
        </div>
      </div>

      {/* Top Stat Cards */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StaggerItem>
          <StatCard
            title="Current Aggregate"
            value={`${attendance.aggregatePercentage}%`}
            subtitle="Calculated over all enrolled courses"
            badgeText="Eligible for Exams"
            badgeVariant="agent"
            agentId="attendance"
            progressValue={attendance.aggregatePercentage}
            progressColor="bg-emerald-500"
            trend={{ value: "+2.1% from Midterms", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Safe Miss Buffer"
            value={`${attendance.totalSafeMissesOverall} Lectures`}
            subtitle="Remaining before dropping below 75%"
            badgeText="Safe Margin"
            badgeVariant="agent"
            agentId="attendance"
            trend={{ value: "Low Risk", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Conducted Sessions"
            value={`${attendance.totalAttended} / ${attendance.totalConducted}`}
            subtitle="Lectures & Lab practicals attended"
            badgeText="Verified"
            badgeVariant="agent"
            agentId="attendance"
            trend={{ value: "Biometric Sync OK", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Subjects at Risk"
            value="0 Courses"
            subtitle="All subjects currently above 75%"
            badgeText="All Clear"
            badgeVariant="agent"
            agentId="attendance"
            trend={{ value: "100% Compliant", isPositive: true }}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Interactive Circular Radial Gauge & Simulator */}
      <AttendanceGauge />
    </div>
  );
}
