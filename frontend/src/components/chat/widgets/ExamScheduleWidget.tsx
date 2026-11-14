import React from 'react';
import { Award, Calendar, MapPin, Clock, Download, CheckCircle2 } from 'lucide-react';
import { ExamWidgetData } from '@/types/chat';
import { toast } from 'sonner';

interface ExamScheduleWidgetProps {
  data?: ExamWidgetData;
}

const DEFAULT_EXAMS: ExamWidgetData = {
  semester: 'Semester 5 End-Term Examination',
  gpa: 3.84,
  exams: [
    {
      courseCode: 'CS301',
      courseName: 'Distributed Systems',
      date: 'Dec 02, 2026',
      time: '10:00 AM – 01:00 PM',
      room: 'Exam Hall Central A',
      seatNumber: 'Seat #A-42',
      daysLeft: 18,
    },
    {
      courseCode: 'CS304',
      courseName: 'Database Internals & Optimization',
      date: 'Dec 05, 2026',
      time: '10:00 AM – 01:00 PM',
      room: 'Exam Hall Central B',
      seatNumber: 'Seat #B-19',
      daysLeft: 21,
    },
    {
      courseCode: 'CS308',
      courseName: 'Software Architecture Patterns',
      date: 'Dec 08, 2026',
      time: '02:00 PM – 05:00 PM',
      room: 'Exam Hall Central A',
      seatNumber: 'Seat #A-42',
      daysLeft: 24,
    },
  ],
};

export function ExamScheduleWidget({ data = DEFAULT_EXAMS }: ExamScheduleWidgetProps) {
  const examData = data.exams ? data : DEFAULT_EXAMS;

  const handleDownloadHallTicket = () => {
    toast.success('Official Digital Hall Ticket & Seating Slip downloaded!');
  };

  return (
    <div className="mt-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-1.5 text-cyan-700">
          <Award className="w-4 h-4 text-cyan-600" />
          <span>Examination Controller · {examData.semester}</span>
        </div>
        <span className="text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-0.5 rounded-full">
          CGPA: {examData.gpa} / 4.0
        </span>
      </div>

      {/* Exam List */}
      <div className="space-y-2">
        {examData.exams.map((exam, idx) => (
          <div
            key={idx}
            className="p-3 bg-white rounded-lg border border-slate-200/80 hover:border-cyan-200 transition space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">{exam.courseCode}</span>
                  <span className="text-xs font-semibold text-slate-800">{exam.courseName}</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {exam.date} · {exam.time}
                </div>
              </div>

              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                {exam.daysLeft} days left
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-mono">
              <span className="flex items-center gap-1 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {exam.room}
              </span>
              <span className="font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/50">
                {exam.seatNumber}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleDownloadHallTicket}
        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100/80 rounded-lg border border-cyan-200 transition cursor-pointer"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Download Official Hall Ticket (PDF + QR)</span>
      </button>
    </div>
  );
}
