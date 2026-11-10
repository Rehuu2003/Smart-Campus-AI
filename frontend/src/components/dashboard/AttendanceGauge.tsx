import { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ChevronRight, 
  Calculator, 
  Info,
  ShieldCheck,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_STUDENT_DATA, SubjectAttendance } from '@/lib/mockData';

export function AttendanceGauge() {
  const { attendance } = MOCK_STUDENT_DATA;
  
  // Interactive Simulator State: simulated future missed classes or attended classes
  const [simulatedChange, setSimulatedChange] = useState<number>(0); // negative = missed, positive = attended

  // Calculate simulated overall percentage
  const projectedTotal = attendance.totalConducted + Math.abs(simulatedChange);
  const projectedAttended = simulatedChange >= 0 
    ? attendance.totalAttended + simulatedChange 
    : attendance.totalAttended;
  const projectedPercentage = Number(((projectedAttended / projectedTotal) * 100).toFixed(2));
  const isProjectedSafe = projectedPercentage >= attendance.minimumRequired;

  // SVG Circular Gauge calculations
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (attendance.aggregatePercentage / 100) * circumference;

  const getStatusColor = (pct: number) => {
    if (pct >= 75) return '#10B981'; // Emerald
    if (pct >= 65) return '#F59E0B'; // Amber
    return '#F43F5E';                 // Rose
  };

  const getSubjectStatusBadge = (subject: SubjectAttendance) => {
    if (subject.percentage >= 85) {
      return (
        <Badge variant="success" withDot>
          +{subject.safeMisses} Safe Misses
        </Badge>
      );
    }
    if (subject.percentage >= 75) {
      return (
        <Badge variant="warning" withDot>
          {subject.safeMisses === 0 ? 'Zero Margin!' : `+${subject.safeMisses} Safe Miss`}
        </Badge>
      );
    }
    return (
      <Badge variant="danger" withDot>
        Critical (&lt;75%)
      </Badge>
    );
  };

  return (
    <Card className="shadow-soft-xs hover:border-slate-300 transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Attendance Intelligence & Compliance
          </CardTitle>
          <CardDescription>
            Monitored in real-time by the Attendance Agent · Minimum threshold: 75%
          </CardDescription>
        </div>
        <Badge variant="agent" agentId="attendance" withDot>
          Verified by Agent
        </Badge>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        
        {/* Top Summary: Radial Progress Meter & Quick Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Radial Circular Meter */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-[180px] h-[180px] flex items-center justify-center">
              <svg width={size} height={size} className="transform -rotate-90">
                {/* Track */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke="#E2E8F0"
                  strokeWidth={strokeWidth}
                />
                {/* Progress Ring */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={getStatusColor(attendance.aggregatePercentage)}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Center Metrics */}
              <div className="absolute flex flex-col items-center text-center">
                <span className="text-3xl font-black font-mono text-slate-900 tracking-tight">
                  {attendance.aggregatePercentage}%
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-0.5">
                  Safe Cutoff
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-1">
                  {attendance.totalAttended}/{attendance.totalConducted} Sessions
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="text-xs text-slate-500 font-medium">
                Mandatory University Cutoff: <strong className="text-slate-800">75.0%</strong>
              </span>
            </div>
          </div>

          {/* Analysis & Safe Misses Breakdown */}
          <div className="md:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Attendance Agent Diagnostic
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-700">
                  +{attendance.totalSafeMissesOverall} Total Safe Misses
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                You are currently in <strong>Good Standing</strong>. You can miss up to <strong>12 total lectures</strong> across your courses while maintaining the required 75% cutoff for end-term examinations.
              </p>
            </div>

            {/* Attendance Projection Simulator */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-blue-700" />
                  "What-If" Absence Simulator
                </span>
                <span className="text-[10px] text-blue-700 font-mono font-semibold">
                  Projection
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSimulatedChange((prev) => Math.max(-10, prev - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-mono font-bold text-slate-700 flex items-center justify-center transition cursor-pointer"
                    title="Simulate missing 1 more lecture"
                  >
                    -1
                  </button>
                  <span className="font-mono font-bold text-xs px-2 text-slate-800 min-w-16 text-center">
                    {simulatedChange === 0 ? 'Current' : simulatedChange > 0 ? `+${simulatedChange} Attended` : `${simulatedChange} Missed`}
                  </span>
                  <button
                    onClick={() => setSimulatedChange((prev) => Math.min(10, prev + 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-mono font-bold text-slate-700 flex items-center justify-center transition cursor-pointer"
                    title="Simulate attending 1 more lecture"
                  >
                    +1
                  </button>
                  {simulatedChange !== 0 && (
                    <button
                      onClick={() => setSimulatedChange(0)}
                      className="text-[11px] text-blue-600 hover:underline ml-1 cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    {simulatedChange > 0 ? (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    ) : simulatedChange < 0 ? (
                      <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                    ) : null}
                    <span className="font-mono font-bold text-sm text-slate-900">
                      {projectedPercentage}%
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                      isProjectedSafe 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {isProjectedSafe ? 'Permitted' : 'Shortage Risk'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                    {projectedAttended}/{projectedTotal} total sessions
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Course-by-Course Attendance Breakdown */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Subject-Wise Breakdown & Cutoff Status
            </h4>
            <span className="text-xs text-slate-400 font-mono">5 Enrolled Courses</span>
          </div>

          <div className="space-y-2.5">
            {attendance.subjects.map((subj) => (
              <div
                key={subj.courseCode}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {subj.courseCode}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {subj.courseName}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Faculty: {subj.professor}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[240px]">
                  {/* Progress Bar & Ratio */}
                  <div className="flex-1 sm:w-32 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-slate-500">
                      <span>{subj.attended}/{subj.total}</span>
                      <span className="font-bold text-slate-900">{subj.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${subj.percentage}%`,
                          backgroundColor: getStatusColor(subj.percentage),
                        }}
                      />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0 text-right">
                    {getSubjectStatusBadge(subj)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
