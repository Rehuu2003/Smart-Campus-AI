import React from 'react';
import { CheckCircle2, Users, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';
import { BatchAttendanceRoster } from '@/components/faculty/BatchAttendanceRoster';
import { MOCK_FACULTY_DATA } from '@/lib/mockData';
import { StatCard } from '@/components/dashboard/StatCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedContainer';

export function FacultyRosterView() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Faculty Portal · Live Batch Biometric Roster
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Class Attendance Roster
          </h1>

          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Record lecture participation, toggle individual attendance states, and dispatch automated absence notices to parents via the Attendance Agent.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
            <span className="bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-200 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-300" />
              Instructor: {MOCK_FACULTY_DATA.profile.name}
            </span>
            <span className="bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Department: {MOCK_FACULTY_DATA.profile.department}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StaggerItem>
          <StatCard
            title="Total Students"
            value="184 Enrolled"
            subtitle="Across 3 active sections"
            badgeText="Enrolled"
            badgeVariant="agent"
            agentId="attendance"
            trend={{ value: "Section CS-A / CS-B", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Average Attendance"
            value={`${MOCK_FACULTY_DATA.metrics.averageAttendanceAcrossCourses}%`}
            subtitle="Department average: 82.4%"
            badgeText="Compliant"
            badgeVariant="agent"
            agentId="attendance"
            trend={{ value: "+5.8% vs benchmark", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Attendance Shortage"
            value="6 Students"
            subtitle="Below mandatory 75% cutoff"
            badgeText="Attention Required"
            badgeVariant="agent"
            agentId="attendance"
            trend={{ value: "Alerts Pending", isPositive: false }}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Batch Attendance Roster Table */}
      <BatchAttendanceRoster selectedCourseCode="CS301" />
    </div>
  );
}
