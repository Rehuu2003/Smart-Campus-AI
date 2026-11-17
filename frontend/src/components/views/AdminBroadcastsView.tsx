import React, { useState } from 'react';
import { 
  Megaphone, 
  Send, 
  Bell, 
  Users, 
  Mail, 
  Smartphone, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Plus
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_ADMIN_METRICS } from '@/lib/mockData';
import { BroadcastComposerModal } from '@/components/admin/BroadcastComposerModal';
import { StatCard } from '@/components/dashboard/StatCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedContainer';

export function AdminBroadcastsView() {
  const [broadcasts, setBroadcasts] = useState(MOCK_ADMIN_METRICS.broadcasts);
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const handleBroadcastCreated = (newBc: any) => {
    setBroadcasts((prev) => [newBc, ...prev]);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-red-900 via-rose-950 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Central Administrative Dispatch · Emergency Notification Hub
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Emergency Broadcasts &amp; Announcements
            </h1>

            <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
              Compose, authorize, and dispatch high-priority push announcements, SMS alerts, and email notifications across the campus student body and faculty.
            </p>
          </div>

          <Button
            onClick={() => setIsComposerOpen(true)}
            size="md"
            className="bg-white text-rose-900 hover:bg-rose-50 shadow-soft-md font-bold text-xs gap-2 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Emergency Broadcast</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StaggerItem>
          <StatCard
            title="Total Dispatched"
            value={`${broadcasts.length} Announcements`}
            subtitle="Semester Fall 2026"
            badgeText="Delivered"
            badgeVariant="agent"
            agentId="support"
            trend={{ value: "100% Delivery Rate", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Campus Reach"
            value="4,495 Recipients"
            subtitle="4,280 Students + 215 Faculty"
            badgeText="Coverage"
            badgeVariant="agent"
            agentId="support"
            trend={{ value: "All Departments", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Active Dispatch Channels"
            value="3 Channels"
            subtitle="Mobile Push, SMS Gateway, Email"
            badgeText="Operational"
            badgeVariant="agent"
            agentId="support"
            trend={{ value: "Low Latency Gateway", isPositive: true }}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Broadcasts History Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Broadcast History &amp; Dispatch Status
          </h2>
          <span className="text-xs text-slate-500">Real-time gateway status</span>
        </div>

        <div className="space-y-3">
          {broadcasts.map((bc) => (
            <Card key={bc.id} className="border-slate-200/90 shadow-soft-xs hover:shadow-soft-md transition">
              <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {bc.id}
                    </span>
                    <Badge variant={bc.urgency === 'Critical' ? 'danger' : bc.urgency === 'Urgent' ? 'warning' : 'info'} className="text-[10px]">
                      {bc.urgency} Priority
                    </Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {bc.timestamp}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    {bc.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      Audience: <strong className="text-slate-700">{bc.audience}</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Bell className="w-3.5 h-3.5 text-slate-400" />
                      Channels: {bc.channels.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {bc.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Composer Modal */}
      {isComposerOpen && (
        <BroadcastComposerModal
          onClose={() => setIsComposerOpen(false)}
          onBroadcastCreated={handleBroadcastCreated}
        />
      )}
    </div>
  );
}
