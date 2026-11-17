import React from 'react';
import { FileText, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PendingTasksList } from '@/components/dashboard/PendingTasksList';
import { MOCK_STUDENT_DATA } from '@/lib/mockData';
import { StatCard } from '@/components/dashboard/StatCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedContainer';

export function AssignmentsView() {
  const pendingCount = MOCK_STUDENT_DATA.assignments.filter(a => a.status === 'pending').length;
  const submittedCount = MOCK_STUDENT_DATA.assignments.filter(a => a.status === 'submitted').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-violet-900 via-purple-900 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Coursework &amp; Lab Submissions Portal
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Assignments &amp; Project Deliverables
          </h1>

          <p className="text-purple-100 text-xs sm:text-sm leading-relaxed">
            Track lab reports, algorithmic coding challenges, deadlines, and upload your deliverable packages with instant agent verification.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
            <span className="bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-500/30 text-purple-200 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-300" />
              {pendingCount} Pending Submission
            </span>
            <span className="bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-500/30 text-purple-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              {submittedCount} Delivered
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StaggerItem>
          <StatCard
            title="Pending Assignments"
            value={`${pendingCount} Due`}
            subtitle="Lab 4: Raft Consensus Engine"
            badgeText="Action Required"
            badgeVariant="agent"
            agentId="assignment"
            trend={{ value: "Due Friday, 11:59 PM", isPositive: false }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Submissions Verified"
            value={`${submittedCount} Completed`}
            subtitle="Automated anti-plagiarism & lint passed"
            badgeText="Good Standing"
            badgeVariant="agent"
            agentId="assignment"
            trend={{ value: "100% on-time rate", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Average Grade"
            value="94.5%"
            subtitle="Evaluated across 8 prior submissions"
            badgeText="Grade A"
            badgeVariant="agent"
            agentId="assignment"
            trend={{ value: "Top 5% in class", isPositive: true }}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Pending Coursework & Interactive Submissions */}
      <PendingTasksList />
    </div>
  );
}
