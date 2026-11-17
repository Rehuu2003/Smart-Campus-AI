import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { ScheduleTimeline } from '@/components/dashboard/ScheduleTimeline';
import { MOCK_STUDENT_DATA } from '@/lib/mockData';
import { StatCard } from '@/components/dashboard/StatCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedContainer';

export function TimetableView() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            University Academic Affairs · Fall 2026 Timetable &amp; Room Directory
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Academic Schedule &amp; Timetable
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            Weekly interactive schedule with live class progress beacons, room allocations, instructor details, and 1-click Google Calendar / iCal export.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
            <span className="bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-500/30 text-blue-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-300" />
              Semester: Fall 2026 (Semester 6)
            </span>
            <span className="bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-500/30 text-blue-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              Standard Timings: 09:00 AM – 05:00 PM
            </span>
          </div>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StaggerItem>
          <StatCard
            title="Today's Lectures"
            value="3 Sessions"
            subtitle="CS301, CS312, and CS330 Lab"
            badgeText="In Progress"
            badgeVariant="agent"
            agentId="timetable"
            trend={{ value: "Next at 10:00 AM", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Weekly Credit Hours"
            value="24 Hours"
            subtitle="18 Lecture Hours + 6 Lab Practicals"
            badgeText="Active"
            badgeVariant="agent"
            agentId="timetable"
            trend={{ value: "Full Load", isPositive: true }}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="Assigned Room"
            value="LH-302"
            subtitle="Science & Engineering Block B"
            badgeText="Air Conditioned"
            badgeVariant="agent"
            agentId="timetable"
            trend={{ value: "Capacity: 120", isPositive: true }}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Lecture Schedule & Academic Agenda */}
      <ScheduleTimeline />
    </div>
  );
}
