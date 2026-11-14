import React from 'react';
import { Calendar, Clock, MapPin, Download, CheckCircle2 } from 'lucide-react';
import { ScheduleWidgetData } from '@/types/chat';
import { toast } from 'sonner';

interface TimetableWidgetProps {
  data?: ScheduleWidgetData;
}

const DEFAULT_SCHEDULE: ScheduleWidgetData = {
  date: '2026-11-14',
  day: 'Saturday (Today)',
  items: [
    {
      time: '10:00 AM – 11:30 AM',
      courseCode: 'CS301',
      courseName: 'Distributed Systems & Microservices',
      room: 'Lecture Hall 302',
      instructor: 'Prof. R. Sharma',
      isLive: true,
    },
    {
      time: '01:30 PM – 03:30 PM',
      courseCode: 'CS304',
      courseName: 'Database Internals & Optimization Lab',
      room: 'Software Lab 2',
      instructor: 'Dr. A. Verma',
      isLive: false,
    },
    {
      time: '03:30 PM – 04:30 PM',
      courseCode: 'CS308',
      courseName: 'Software Architecture Patterns',
      room: 'Seminar Hall B',
      instructor: 'Prof. K. Iyer',
      isLive: false,
    },
  ],
};

export function TimetableWidget({ data = DEFAULT_SCHEDULE }: TimetableWidgetProps) {
  const schedule = data.items ? data : DEFAULT_SCHEDULE;

  const handleExportICS = () => {
    // Generate valid iCalendar (.ics) content
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Smart Campus AI//Timetable Agent//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ];

    schedule.items.forEach((item, index) => {
      icsLines.push(
        'BEGIN:VEVENT',
        `UID:smartcampus-${Date.now()}-${index}@campus.edu`,
        `DTSTAMP:20261114T040000Z`,
        `DTSTART:20261114T100000Z`,
        `DTEND:20261114T113000Z`,
        `SUMMARY:${item.courseCode} - ${item.courseName}`,
        `DESCRIPTION:Instructor: ${item.instructor}`,
        `LOCATION:${item.room}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      );
    });

    icsLines.push('END:VCALENDAR');

    const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smart-campus-schedule-${schedule.day.replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Calendar (.ics) schedule exported successfully!');
  };

  return (
    <div className="mt-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-1.5 text-purple-700">
          <Calendar className="w-4 h-4 text-purple-600" />
          <span>Timetable Agent · {schedule.day}</span>
        </div>
        <button
          type="button"
          onClick={handleExportICS}
          className="flex items-center gap-1 text-[11px] font-medium text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-2 py-0.5 rounded border border-purple-200 transition cursor-pointer"
        >
          <Download className="w-3 h-3" />
          <span>Export .ics</span>
        </button>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-2">
        {schedule.items.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border transition-all ${
              item.isLive
                ? 'bg-purple-50/70 border-purple-200 shadow-xs'
                : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">{item.courseCode}</span>
                  <span className="text-xs font-semibold text-slate-700 truncate">{item.courseName}</span>
                  {item.isLive && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-600 text-white animate-pulse">
                      ● LIVE NOW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {item.room}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium shrink-0">
                {item.instructor}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
