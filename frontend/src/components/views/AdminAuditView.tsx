import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { SystemAuditLogTable } from '@/components/admin/SystemAuditLogTable';
import { MOCK_ADMIN_METRICS } from '@/lib/mockData';
import { StatCard } from '@/components/dashboard/StatCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedContainer';

export function AdminAuditView() {
  const criticalCount = MOCK_ADMIN_METRICS.auditLogs.filter(l => l.severity === 'CRITICAL').length;
  const warnCount = MOCK_ADMIN_METRICS.auditLogs.filter(l => l.severity === 'WARN').length;
  const infoCount = MOCK_ADMIN_METRICS.auditLogs.filter(l => l.severity === 'INFO').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Security &amp; Institutional Governance · Multi-Agent Transaction Audit
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            System Security &amp; Audit Trail
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Immutable transaction records of all database modifications, autonomous agent actions, permission checks, and student query simulations.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Trace Retention: 90 Days
            </span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-blue-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              Live Audit Stream: Active
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StaggerItem>
          <StatCard
            title="Total Events Logged"
            value={`${MOCK_ADMIN_METRICS.auditLogs.length} Records`}
            subtitle="Today's active session"
            badgeText="Audited"
            badgeVariant="agent"
            agentId="coordinator"
            trend={{ value: "100% Trace Coverage", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Normal Transactions"
            value={`${infoCount} INFO`}
            subtitle="Queries, attendance batch, fee receipts"
            badgeText="Healthy"
            badgeVariant="agent"
            agentId="coordinator"
            trend={{ value: "Normal Traffic", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Security Events"
            value={`${criticalCount} Critical / ${warnCount} Warn`}
            subtitle="Rate limits throttled & cutoff warnings"
            badgeText="Enforced"
            badgeVariant="agent"
            agentId="coordinator"
            trend={{ value: "Zero Breaches", isPositive: true }}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* System Audit Log Table */}
      <SystemAuditLogTable />
    </div>
  );
}
