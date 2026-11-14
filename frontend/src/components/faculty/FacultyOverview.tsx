import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  CheckCircle2, 
  FileCheck, 
  AlertTriangle, 
  Sparkles, 
  GraduationCap,
  Calendar,
  Layers
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { StatCard } from '@/components/dashboard/StatCard';
import { MOCK_FACULTY_DATA } from '@/lib/mockData';
import { FacultyCourseCard } from './FacultyCourseCard';
import { BatchAttendanceRoster } from './BatchAttendanceRoster';
import { AssignmentEvaluationModal } from './AssignmentEvaluationModal';
import { DeficiencyRiskReport } from './DeficiencyRiskReport';

type FacultyTab = 'courses' | 'roster' | 'deficiency';

export function FacultyOverview() {
  const [activeTab, setActiveTab] = useState<FacultyTab>('courses');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<string | null>(null);
  const [isGradingOpen, setIsGradingOpen] = useState(false);

  const handleOpenAttendanceForCourse = (courseCode: string) => {
    setSelectedCourseForModal(courseCode);
    setActiveTab('roster');
  };

  const handleOpenGradingForCourse = (courseCode: string) => {
    setSelectedCourseForModal(courseCode);
    setIsGradingOpen(true);
  };

  const handleOpenDeficiencyForCourse = (courseCode: string) => {
    setSelectedCourseForModal(courseCode);
    setActiveTab('deficiency');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Faculty Executive Welcome Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#1E3A8A] p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Faculty Portal · Department of Computer Science &amp; Engineering
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {MOCK_FACULTY_DATA.profile.name}!
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {MOCK_FACULTY_DATA.profile.designation}. You have 3 active theory &amp; lab sections with 184 total enrolled students. 18 lab submissions await your rubric evaluation.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-blue-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Office: {MOCK_FACULTY_DATA.profile.office}
            </span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Next Class: CS301 at 10:00 AM (LH-302)
            </span>
          </div>
        </div>
      </div>

      {/* Top 4 Faculty Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Courses"
          value={MOCK_FACULTY_DATA.metrics.activeCourses}
          subtitle="3 Course Sections Active"
          badgeText="Active Term"
          badgeVariant="agent"
          agentId="coordinator"
        />

        <StatCard
          title="Total Students"
          value={MOCK_FACULTY_DATA.metrics.totalEnrolledStudents}
          subtitle="Enrolled across sections"
          badgeText="Enrolled"
          badgeVariant="agent"
          agentId="support"
        />

        <StatCard
          title="Avg Attendance"
          value={`${MOCK_FACULTY_DATA.metrics.averageAttendanceAcrossCourses}%`}
          subtitle="Compliance across classes"
          badgeText="Healthy"
          badgeVariant="agent"
          agentId="attendance"
          progressValue={MOCK_FACULTY_DATA.metrics.averageAttendanceAcrossCourses}
          progressColor="bg-emerald-500"
        />

        <StatCard
          title="Pending Grading"
          value={MOCK_FACULTY_DATA.metrics.pendingSubmissionsToGrade}
          subtitle="Raft Consensus Engine Labs"
          badgeText="Action Needed"
          badgeVariant="agent"
          agentId="assignment"
          trend={{ value: "Lab 4 Due", isPositive: false }}
        />
      </div>

      {/* View Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('courses')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>My Assigned Courses (3)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('roster')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'roster'
              ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Batch Attendance Ledger</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('deficiency')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'deficiency'
              ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <span>Deficiency &amp; Risk Detector</span>
        </button>
      </div>

      {/* TAB CONTENT: Assigned Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Assigned Semester 5 Course Curricula
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Academic Term 2026–2027
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_FACULTY_DATA.courses.map((course) => (
              <FacultyCourseCard
                key={course.code}
                course={course}
                onTakeAttendance={handleOpenAttendanceForCourse}
                onGradeAssignments={handleOpenGradingForCourse}
                onViewDeficiency={handleOpenDeficiencyForCourse}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Batch Attendance Ledger */}
      {activeTab === 'roster' && (
        <div className="space-y-4">
          <BatchAttendanceRoster
            selectedCourseCode={selectedCourseForModal || 'CS301'}
            onClose={() => setActiveTab('courses')}
          />
        </div>
      )}

      {/* TAB CONTENT: Deficiency Risk Report */}
      {activeTab === 'deficiency' && (
        <div className="space-y-4">
          <DeficiencyRiskReport
            courseCode={selectedCourseForModal || 'CS301'}
          />
        </div>
      )}

      {/* Assignment Evaluation Modal */}
      {isGradingOpen && (
        <AssignmentEvaluationModal
          courseCode={selectedCourseForModal || 'CS301'}
          onClose={() => setIsGradingOpen(false)}
        />
      )}
    </div>
  );
}
