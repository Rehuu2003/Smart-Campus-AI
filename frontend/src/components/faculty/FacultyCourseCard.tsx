import React from 'react';
import { 
  Users, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  FileCheck,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface FacultyCourse {
  code: string;
  name: string;
  section: string;
  enrolled: number;
  avgAttendance: number;
  syllabusProgress: number;
  nextSession: string;
  room: string;
  deficiencyCount: number;
  pendingAssignments: number;
}

interface FacultyCourseCardProps {
  course: FacultyCourse;
  onTakeAttendance: (courseCode: string) => void;
  onGradeAssignments: (courseCode: string) => void;
  onViewDeficiency: (courseCode: string) => void;
}

export function FacultyCourseCard({
  course,
  onTakeAttendance,
  onGradeAssignments,
  onViewDeficiency,
}: FacultyCourseCardProps) {
  const isAttendanceGood = course.avgAttendance >= 85;

  return (
    <Card className="hover:shadow-soft-md transition-all border-slate-200/90 overflow-hidden">
      <CardHeader className="pb-3 border-b border-slate-100/80 bg-slate-50/50">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {course.code}
              </span>
              <span className="text-xs font-medium text-slate-500 font-mono">
                {course.section}
              </span>
            </div>
            <CardTitle className="text-sm font-bold text-slate-900 mt-1">
              {course.name}
            </CardTitle>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-xs text-slate-600 bg-white px-2.5 py-1 rounded-full border border-slate-200/80 font-mono">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.enrolled} Enrolled</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4 text-xs">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-200/70">
          <div>
            <span className="text-[11px] text-slate-500 block">Class Avg Attendance</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-bold font-mono text-slate-900">
                {course.avgAttendance}%
              </span>
              <span className={`text-[10px] font-bold ${isAttendanceGood ? 'text-emerald-600' : 'text-amber-600'}`}>
                {isAttendanceGood ? 'Compliant' : 'Warning'}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 block">Deficiency Alerts</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-bold font-mono text-rose-600">
                {course.deficiencyCount}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Students &lt;75%</span>
            </div>
          </div>
        </div>

        {/* Syllabus Completion Gauge */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px] font-mono">
            <span className="text-slate-600 font-medium">Syllabus Curriculum Covered</span>
            <span className="font-bold text-slate-800">{course.syllabusProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700"
              style={{ width: `${course.syllabusProgress}%` }}
            />
          </div>
        </div>

        {/* Next Lecture Session Info */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50/40 border border-blue-200/50 text-[11px] text-slate-700">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-medium">{course.nextSession}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 font-mono">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{course.room}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onTakeAttendance(course.code)}
            className="flex items-center justify-center gap-1 py-2 px-2 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 rounded-lg border border-emerald-200 transition cursor-pointer"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Attendance</span>
          </button>

          <button
            type="button"
            onClick={() => onGradeAssignments(course.code)}
            className="flex items-center justify-center gap-1 py-2 px-2 text-[11px] font-bold text-blue-800 bg-blue-50 hover:bg-blue-100/80 rounded-lg border border-blue-200 transition cursor-pointer"
          >
            <FileCheck className="w-3 h-3 text-blue-600" />
            <span>Grade ({course.pendingAssignments})</span>
          </button>

          <button
            type="button"
            onClick={() => onViewDeficiency(course.code)}
            className="flex items-center justify-center gap-1 py-2 px-2 text-[11px] font-bold text-rose-800 bg-rose-50 hover:bg-rose-100/80 rounded-lg border border-rose-200 transition cursor-pointer"
          >
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            <span>Deficiency</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
