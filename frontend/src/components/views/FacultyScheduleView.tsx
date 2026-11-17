import React from 'react';
import { Calendar, Clock, MapPin, Users, BookOpen, Sparkles } from 'lucide-react';
import { MOCK_FACULTY_DATA } from '@/lib/mockData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export function FacultyScheduleView() {
  const handleExportCalendar = () => {
    toast.success('Faculty teaching timetable exported to iCal (.ics) format!');
  };

  const teachingSchedule = [
    {
      id: 'sched-1',
      day: 'Monday',
      time: '10:00 AM – 11:30 AM',
      courseCode: 'CS301',
      courseName: 'Distributed Systems & Microservices',
      section: 'Section CS-A',
      location: 'Lecture Hall 302',
      enrolled: 64,
      type: 'Lecture',
    },
    {
      id: 'sched-2',
      day: 'Monday',
      time: '01:30 PM – 03:30 PM',
      courseCode: 'CS304',
      courseName: 'Database Internals & Optimization Lab',
      section: 'Section CS-B',
      location: 'Software Lab 2',
      enrolled: 62,
      type: 'Laboratory Practical',
    },
    {
      id: 'sched-3',
      day: 'Wednesday',
      time: '11:00 AM – 12:30 PM',
      courseCode: 'CS301',
      courseName: 'Distributed Systems & Microservices',
      section: 'Section CS-A',
      location: 'Lecture Hall 302',
      enrolled: 64,
      type: 'Lecture',
    },
    {
      id: 'sched-4',
      day: 'Thursday',
      time: '02:00 PM – 04:00 PM',
      courseCode: 'CS308',
      courseName: 'Software Architecture & Cloud Patterns',
      section: 'Section CS-A',
      location: 'Seminar Hall B',
      enrolled: 58,
      type: 'Lecture & Seminar',
    },
    {
      id: 'sched-5',
      day: 'Friday',
      time: '09:30 AM – 11:00 AM',
      courseCode: 'CS304',
      courseName: 'Database Internals & Query Optimization',
      section: 'Section CS-B',
      location: 'Lecture Hall 302',
      enrolled: 62,
      type: 'Lecture',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Office of Academic Dean · Faculty Teaching Assignment
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Faculty Teaching Timetable
            </h1>

            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Official weekly classroom allotments, assigned laboratory facilities, and registered student rosters for {MOCK_FACULTY_DATA.profile.name}.
            </p>
          </div>

          <Button
            onClick={handleExportCalendar}
            variant="outline"
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs gap-2 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-300" />
            <span>Export Faculty iCal</span>
          </Button>
        </div>
      </div>

      {/* Course Schedule Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Weekly Lecture &amp; Lab Sessions</h2>
          <Badge variant="info" withDot>
            Fall Semester 2026
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachingSchedule.map((slot) => (
            <Card key={slot.id} className="border-slate-200/90 shadow-soft-xs hover:shadow-soft-md transition">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {slot.courseCode} · {slot.section}
                  </span>
                  <Badge variant={slot.type.includes('Lab') ? 'warning' : 'info'} className="text-[10px]">
                    {slot.type}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-bold text-slate-900 pt-1">
                  {slot.courseName}
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  {slot.day} · {slot.time}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    Venue: <strong className="text-slate-800">{slot.location}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {slot.enrolled} Students
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
