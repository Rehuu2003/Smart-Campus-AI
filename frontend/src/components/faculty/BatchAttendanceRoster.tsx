import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Users, 
  Send, 
  Sparkles, 
  AlertCircle,
  Calendar,
  Save
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { MOCK_FACULTY_DATA } from '@/lib/mockData';
import { toast } from 'sonner';

interface StudentRosterItem {
  rollNo: string;
  name: string;
  attendancePct: number;
  status: 'P' | 'A' | 'L';
  previousStatus: string;
}

interface BatchAttendanceRosterProps {
  selectedCourseCode?: string;
  onClose?: () => void;
}

export function BatchAttendanceRoster({
  selectedCourseCode = 'CS301',
  onClose,
}: BatchAttendanceRosterProps) {
  const [activeCourse, setActiveCourse] = useState(selectedCourseCode);
  const [selectedDate, setSelectedDate] = useState('2026-11-14');
  const [searchQuery, setSearchQuery] = useState('');
  const [roster, setRoster] = useState<StudentRosterItem[]>(
    MOCK_FACULTY_DATA.studentRoster.map((s) => ({
      ...s,
      status: s.status as 'P' | 'A' | 'L',
    }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status toggle handler
  const handleToggleStatus = (rollNo: string, newStatus: 'P' | 'A' | 'L') => {
    setRoster((prev) =>
      prev.map((student) =>
        student.rollNo === rollNo ? { ...student, status: newStatus } : student
      )
    );
  };

  // Mark all present
  const handleMarkAllPresent = () => {
    setRoster((prev) => prev.map((s) => ({ ...s, status: 'P' })));
    toast.info('All students marked Present');
  };

  // Metrics
  const presentCount = roster.filter((s) => s.status === 'P').length;
  const absentCount = roster.filter((s) => s.status === 'A').length;
  const lateCount = roster.filter((s) => s.status === 'L').length;
  const totalCount = roster.length;
  const presentPercentage = ((presentCount / totalCount) * 100).toFixed(1);

  // Filtered students
  const filteredRoster = roster.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Submit handler
  const handleSubmitAttendance = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);

    toast.success(
      `Attendance recorded for ${activeCourse}! Dispatched automated alerts to ${absentCount} absent students via Campus Support Agent.`,
      { duration: 4000 }
    );

    if (onClose) onClose();
  };

  return (
    <Card className="border-slate-200/90 shadow-soft-md">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <CardTitle className="text-base font-bold text-slate-900">
                Batch Attendance Ledger &amp; Live Registry
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500 mt-0.5">
              Instant attendance recording with automated absentee push notification dispatch
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleMarkAllPresent}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 rounded-lg border border-emerald-200 transition cursor-pointer"
            >
              Mark All Present
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition cursor-pointer"
              >
                Done
              </button>
            )}
          </div>
        </div>

        {/* Filter & Selector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          {/* Course Selector */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Active Course</label>
            <select
              value={activeCourse}
              onChange={(e) => setActiveCourse(e.target.value)}
              className="w-full text-xs font-medium p-2 rounded-lg border border-slate-200 bg-white text-slate-800"
            >
              {MOCK_FACULTY_DATA.courses.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} · {c.name} ({c.section})
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Session Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 bg-white text-slate-800"
            />
          </div>

          {/* Search Input */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Search Student</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Roll No or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs p-2 pl-8 rounded-lg border border-slate-200 bg-white text-slate-800"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Attendance Counter Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center">
            <span className="text-[11px] text-emerald-800 font-medium">Present (P)</span>
            <div className="text-lg font-bold font-mono text-emerald-700">{presentCount}</div>
          </div>
          <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-center">
            <span className="text-[11px] text-rose-800 font-medium">Absent (A)</span>
            <div className="text-lg font-bold font-mono text-rose-700">{absentCount}</div>
          </div>
          <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-center">
            <span className="text-[11px] text-amber-800 font-medium">Late (L)</span>
            <div className="text-lg font-bold font-mono text-amber-700">{lateCount}</div>
          </div>
          <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-center">
            <span className="text-[11px] text-blue-800 font-medium">Attendance Rate</span>
            <div className="text-lg font-bold font-mono text-blue-700">{presentPercentage}%</div>
          </div>
        </div>

        {/* Student Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Roll No</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Overall Att.</th>
                <th className="py-2.5 px-3 text-right">Mark Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoster.map((student) => {
                const isDeficient = student.attendancePct < 75;
                return (
                  <tr key={student.rollNo} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                      {student.rollNo}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-900">{student.name}</div>
                      {isDeficient && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold font-mono">
                          ⚠ Deficient (&lt;75%)
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          student.attendancePct >= 85
                            ? 'bg-emerald-50 text-emerald-700'
                            : student.attendancePct >= 75
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {student.attendancePct}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {/* 3-State Toggle (P, A, L) */}
                      <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(student.rollNo, 'P')}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition cursor-pointer ${
                            student.status === 'P'
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          P
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(student.rollNo, 'A')}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition cursor-pointer ${
                            student.status === 'A'
                              ? 'bg-rose-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          A
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(student.rollNo, 'L')}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition cursor-pointer ${
                            student.status === 'L'
                              ? 'bg-amber-500 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          L
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Action Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Absentee records trigger automated parent SMS alerts via Central Support Agent.
          </span>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmitAttendance}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-soft-sm transition disabled:opacity-60 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Syncing with Registry...' : 'Save & Dispatch Absentee Alerts'}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
