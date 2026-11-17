import React from 'react';
import { AlertTriangle, Users, FileSpreadsheet, ShieldAlert } from 'lucide-react';
import { DeficiencyRiskReport } from '@/components/faculty/DeficiencyRiskReport';
import { MOCK_FACULTY_DATA } from '@/lib/mockData';
import { StatCard } from '@/components/dashboard/StatCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedContainer';

export function FacultyDeficienciesView() {
  const criticalCount = MOCK_FACULTY_DATA.deficientStudents.filter(s => s.riskLevel === 'Critical').length;
  const warningCount = MOCK_FACULTY_DATA.deficientStudents.filter(s => s.riskLevel === 'Warning').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-800 via-amber-900 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Academic Dean Governance · Attendance Deficiency Detection Engine
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Attendance Risk &amp; Deficiency Detector
          </h1>

          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
            Automated monitoring of students whose aggregate attendance has breached or is approaching the mandatory 75% cutoff threshold.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
            <span className="bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-200 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              {criticalCount} Students in Critical Range (&lt;70%)
            </span>
            <span className="bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              {warningCount} Students in Warning Range (70% - 75%)
            </span>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StaggerItem>
          <StatCard
            title="Total Deficient Students"
            value={`${MOCK_FACULTY_DATA.deficientStudents.length} Students`}
            subtitle="Across enrolled sections"
            badgeText="Action Needed"
            badgeVariant="agent"
            agentId="attendance"
            trend={{ value: "Below 75% Cutoff", isPositive: false }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Formal Warnings Sent"
            value="3 Notices Dispatched"
            subtitle="Via SMS & Parent Email"
            badgeText="Logged"
            badgeVariant="agent"
            agentId="attendance"
            trend={{ value: "Nov 08 - Nov 11", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Max Recovery Lectures"
            value="6 Sessions Needed"
            subtitle="To restore 75% exam eligibility"
            badgeText="Recovery Target"
            badgeVariant="agent"
            agentId="attendance"
            trend={{ value: "Roll #CS-108", isPositive: false }}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Deficiency Risk Report & CSV Export */}
      <DeficiencyRiskReport courseCode="CS301" />
    </div>
  );
}
