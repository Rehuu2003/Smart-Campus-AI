import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Server, 
  Megaphone, 
  Layers, 
  Bell, 
  Users, 
  Zap, 
  CheckCircle2, 
  Clock, 
  FileText 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { StatCard } from '@/components/dashboard/StatCard';
import { MOCK_ADMIN_METRICS } from '@/lib/mockData';
import { AgentQueryDistribution } from './AgentQueryDistribution';
import { AgentLatencyMonitor } from './AgentLatencyMonitor';
import { SystemAuditLogTable } from './SystemAuditLogTable';
import { BroadcastComposerModal } from './BroadcastComposerModal';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedContainer';

type AdminTab = 'overview' | 'telemetry' | 'audit' | 'broadcasts';

export function AdminObservabilityCenter() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [broadcasts, setBroadcasts] = useState(MOCK_ADMIN_METRICS.broadcasts);

  const handleBroadcastCreated = (newBc: any) => {
    setBroadcasts((prev) => [newBc, ...prev]);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Administrative Command · Multi-Agent Autonomous Fleet Telemetry
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Institutional Observability Center
            </h1>

            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
              Real-time monitoring of campus-wide AI coordination, query distribution across 7 microservice agents, latency percentiles, and emergency broadcast dispatch.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
              <span className="bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-200 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                7 / 7 Microservice Agent Nodes Active
              </span>
              <span className="bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-200 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Gemini Multi-Agent Routing Engine Healthy
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsComposerOpen(true)}
            className="self-start md:self-center flex items-center gap-2 px-4 py-2.5 bg-white text-slate-900 hover:bg-amber-50 font-bold text-xs rounded-xl shadow-soft-md transition cursor-pointer shrink-0"
          >
            <Megaphone className="w-4 h-4 text-amber-600" />
            <span>Emergency Broadcast</span>
          </button>
        </div>
      </div>

      {/* Top 4 Modular KPI StatCards */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StaggerItem>
          <StatCard
            title="Total Students"
            value={MOCK_ADMIN_METRICS.totalStudents.toLocaleString()}
            subtitle="Enrolled Across All Programs"
            badgeText="Active"
            badgeVariant="agent"
            agentId="support"
          />
        </StaggerItem>

        <StaggerItem>
          <StatCard
            title="Queries Today"
            value={MOCK_ADMIN_METRICS.totalAgentQueriesToday.toLocaleString()}
            subtitle="Autonomous Intent Resolutions"
            badgeText="+18.4%"
            badgeVariant="agent"
            agentId="coordinator"
            trend={{ value: "+286 vs yesterday", isPositive: true }}
          />
        </StaggerItem>

        <StaggerItem>
          <StatCard
            title="P95 Latency"
            value={`${MOCK_ADMIN_METRICS.systemHealth.averageResponseLatencyMs}ms`}
            subtitle="Routing & Database Execution"
            badgeText="SLO Met"
            badgeVariant="agent"
            agentId="attendance"
            progressValue={24}
            progressColor="bg-emerald-500"
          />
        </StaggerItem>

        <StaggerItem>
          <StatCard
            title="Cluster Uptime"
            value={MOCK_ADMIN_METRICS.systemHealth.uptime}
            subtitle="30-Day Reliability Index"
            badgeText="Optimal"
            badgeVariant="agent"
            agentId="fee"
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Query Analytics &amp; Inflow</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('telemetry')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'telemetry'
              ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Agent Latency &amp; Node Telemetry</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>System Audit Trail</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('broadcasts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'broadcasts'
              ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Active Broadcasts ({broadcasts.length})</span>
        </button>
      </div>

      {/* Tab 1: Overview Query Distribution */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <AgentQueryDistribution />
        </div>
      )}

      {/* Tab 2: Telemetry & Latency */}
      {activeTab === 'telemetry' && (
        <div className="space-y-6">
          <AgentLatencyMonitor />
        </div>
      )}

      {/* Tab 3: System Audit Trail */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <SystemAuditLogTable />
        </div>
      )}

      {/* Tab 4: Broadcasts List */}
      {activeTab === 'broadcasts' && (
        <Card className="border-slate-200/90 shadow-soft-xs">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold text-slate-900">
                Institutional Emergency &amp; Push Announcements
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                History of official broadcasts delivered to student and staff devices
              </CardDescription>
            </div>
            <button
              type="button"
              onClick={() => setIsComposerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs rounded-lg transition cursor-pointer"
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>New Announcement</span>
            </button>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {broadcasts.map((bc) => (
              <div
                key={bc.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{bc.title}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${
                          bc.urgency === 'Critical'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : bc.urgency === 'Urgent'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {bc.urgency}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Target: <strong className="text-slate-700">{bc.audience}</strong> · Dispatched: {bc.timestamp}
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    {bc.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                  <span>Channels:</span>
                  {bc.channels.map((ch, i) => (
                    <span key={i} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Broadcast Composer Modal */}
      {isComposerOpen && (
        <BroadcastComposerModal
          onClose={() => setIsComposerOpen(false)}
          onBroadcastCreated={handleBroadcastCreated}
        />
      )}
    </div>
  );
}
