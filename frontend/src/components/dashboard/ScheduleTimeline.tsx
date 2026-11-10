import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Download, 
  Sparkles, 
  CheckCircle,
  Bell
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LectureSession } from '@/lib/mockData';

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export function ScheduleTimeline() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Wednesday');

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const weeklySchedule: Record<DayOfWeek, LectureSession[]> = {
    Monday: [
      {
        id: 'mon-1',
        courseCode: 'CS301',
        courseName: 'Distributed Systems & Microservices',
        timeSlot: '09:00 AM – 10:30 AM',
        durationMinutes: 90,
        location: 'Lecture Hall 302',
        professor: 'Prof. R. Sharma',
        dayOfWeek: 'Monday',
        status: 'completed',
      },
      {
        id: 'mon-2',
        courseCode: 'CS312',
        courseName: 'Computer Networks & Security',
        timeSlot: '11:00 AM – 12:30 PM',
        durationMinutes: 90,
        location: 'Hall B-12',
        professor: 'Dr. S. Nair',
        dayOfWeek: 'Monday',
        status: 'completed',
      },
      {
        id: 'mon-3',
        courseCode: 'HS301',
        courseName: 'Professional Ethics & Leadership',
        timeSlot: '02:00 PM – 03:30 PM',
        durationMinutes: 90,
        location: 'Auditorium 1',
        professor: 'Dr. M. Roy',
        dayOfWeek: 'Monday',
        status: 'completed',
      },
    ],
    Tuesday: [
      {
        id: 'tue-1',
        courseCode: 'CS304',
        courseName: 'Database Internals & Optimization',
        timeSlot: '10:00 AM – 12:00 PM',
        durationMinutes: 120,
        location: 'Software Lab 2',
        professor: 'Dr. A. Verma',
        dayOfWeek: 'Tuesday',
        status: 'completed',
      },
      {
        id: 'tue-2',
        courseCode: 'CS308',
        courseName: 'Software Engineering & Architecture',
        timeSlot: '01:30 PM – 03:00 PM',
        durationMinutes: 90,
        location: 'Seminar Hall B',
        professor: 'Prof. K. Iyer',
        dayOfWeek: 'Tuesday',
        status: 'completed',
      },
    ],
    Wednesday: [
      {
        id: 'wed-1',
        courseCode: 'CS301',
        courseName: 'Distributed Systems & Microservices',
        timeSlot: '10:00 AM – 11:30 AM',
        durationMinutes: 90,
        location: 'Lecture Hall 302',
        professor: 'Prof. R. Sharma',
        dayOfWeek: 'Wednesday',
        status: 'upcoming',
      },
      {
        id: 'wed-2',
        courseCode: 'CS304',
        courseName: 'Database Internals & Optimization',
        timeSlot: '01:30 PM – 03:30 PM',
        durationMinutes: 120,
        location: 'Software Lab 2',
        professor: 'Dr. A. Verma',
        dayOfWeek: 'Wednesday',
        status: 'upcoming',
      },
      {
        id: 'wed-3',
        courseCode: 'CS308',
        courseName: 'Software Engineering & Architecture',
        timeSlot: '03:30 PM – 04:30 PM',
        durationMinutes: 60,
        location: 'Seminar Hall B',
        professor: 'Prof. K. Iyer',
        dayOfWeek: 'Wednesday',
        status: 'upcoming',
      },
    ],
    Thursday: [
      {
        id: 'thu-1',
        courseCode: 'CS312',
        courseName: 'Computer Networks & Security Lab',
        timeSlot: '09:30 AM – 12:30 PM',
        durationMinutes: 180,
        location: 'Networking Hardware Lab',
        professor: 'Dr. S. Nair',
        dayOfWeek: 'Thursday',
        status: 'upcoming',
      },
      {
        id: 'thu-2',
        courseCode: 'HS301',
        courseName: 'Professional Ethics & Leadership',
        timeSlot: '02:00 PM – 03:30 PM',
        durationMinutes: 90,
        location: 'Hall 105',
        professor: 'Dr. M. Roy',
        dayOfWeek: 'Thursday',
        status: 'upcoming',
      },
    ],
    Friday: [
      {
        id: 'fri-1',
        courseCode: 'CS301',
        courseName: 'Distributed Systems Lab / Project Mentoring',
        timeSlot: '10:00 AM – 01:00 PM',
        durationMinutes: 180,
        location: 'Project Research Lab 4',
        professor: 'Prof. R. Sharma',
        dayOfWeek: 'Friday',
        status: 'upcoming',
      },
      {
        id: 'fri-2',
        courseCode: 'CS308',
        courseName: 'Agile Sprint Review & Showcase',
        timeSlot: '02:30 PM – 04:00 PM',
        durationMinutes: 90,
        location: 'Auditorium 2',
        professor: 'Prof. K. Iyer',
        dayOfWeek: 'Friday',
        status: 'upcoming',
      },
    ],
  };

  const currentLectures = weeklySchedule[selectedDay];

  const handleDownloadCalendar = () => {
    // Generate clean iCalendar .ics format
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Smart Campus AI//Academic Schedule//EN
${currentLectures.map(l => `BEGIN:VEVENT
SUMMARY:${l.courseCode}: ${l.courseName}
LOCATION:${l.location}
DESCRIPTION:Instructor: ${l.professor}
STATUS:CONFIRMED
END:VEVENT`).join('\n')}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedDay}-Schedule.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="shadow-soft-xs hover:border-slate-300 transition-all">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="w-5 h-5 text-purple-600" />
            Academic Schedule & Lecture Agenda
          </CardTitle>
          <CardDescription>
            Live timetables coordinated by the Timetable Agent
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={handleDownloadCalendar}
            className="text-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export (.ics)</span>
          </Button>
          <Badge variant="agent" agentId="timetable" withDot>
            Live Sync
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        
        {/* Day Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 overflow-x-auto no-scrollbar">
          {days.map((day) => {
            const isToday = day === 'Wednesday';
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 min-w-[90px] py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-white text-purple-900 shadow-soft-xs border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <span>{day.slice(0, 3)}</span>
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-blue-200" title="Today" />
                )}
              </button>
            );
          })}
        </div>

        {/* Schedule Cards Timeline */}
        <div className="space-y-3">
          {currentLectures.map((lecture, idx) => {
            const isUpcomingFirst = selectedDay === 'Wednesday' && idx === 0;

            return (
              <div
                key={lecture.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isUpcomingFirst
                    ? 'border-blue-200 bg-blue-50/40 shadow-soft-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Left: Time & Indicator */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-1">
                    {isUpcomingFirst ? (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                      </span>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 block mt-0.5" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {lecture.courseCode}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {lecture.courseName}
                      </h4>
                      {isUpcomingFirst && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.2 rounded-full">
                          Next Up (In 45m)
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <strong className="text-slate-700">{lecture.location}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lecture.professor}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Time Slot & Duration */}
                <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 flex sm:flex-col justify-between items-center sm:items-end">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
                    isUpcomingFirst
                      ? 'text-blue-900 bg-white border-blue-200 shadow-2xs'
                      : 'text-slate-700 bg-slate-50 border-slate-200'
                  }`}>
                    {lecture.timeSlot}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono mt-1">
                    {lecture.durationMinutes} Minutes Session
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </CardContent>
    </Card>
  );
}
