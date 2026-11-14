import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ChevronRight, 
  BookOpen, 
  X, 
  Sparkles,
  Calculator
} from 'lucide-react';
import { AttendanceWidgetData } from '@/types/chat';
import { MOCK_STUDENT_DATA } from '@/lib/mockData';
import { toast } from 'sonner';

interface AttendanceWidgetProps {
  data: AttendanceWidgetData;
}

export function AttendanceWidget({ data }: AttendanceWidgetProps) {
  const [showModal, setShowModal] = useState(false);
  const [simulatedAbsences, setSimulatedAbsences] = useState(0);

  const percentage = data.percentage ?? 84.85;
  const attended = data.attended ?? 140;
  const total = data.total ?? 165;
  const safeMisses = data.safeMisses ?? 12;

  // Color threshold logic
  const isSafe = percentage >= 75;
  const isWarning = percentage >= 70 && percentage < 75;
  const strokeColor = isSafe ? '#10B981' : isWarning ? '#F59E0B' : '#F43F5E';
  const badgeBg = isSafe ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : isWarning ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200';

  // SVG Circular Gauge calculations
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  // What-If Simulation
  const simulatedTotal = total + simulatedAbsences;
  const simulatedAttended = attended;
  const simulatedPercentage = ((simulatedAttended / simulatedTotal) * 100).toFixed(2);
  const stillSafe = Number(simulatedPercentage) >= 75;

  return (
    <div className="mt-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
      {/* Header Pill */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-1.5 text-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Attendance Live Ledger</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}>
          {isSafe ? 'Compliant (>75%)' : isWarning ? 'Near Cutoff' : 'Deficient (<75%)'}
        </span>
      </div>

      {/* Main Stat Row */}
      <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200/80">
        {/* Circular SVG Gauge */}
        <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 76 76">
            <circle
              cx="38"
              cy="38"
              r={radius}
              stroke="#E2E8F0"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="38"
              cy="38"
              r={radius}
              stroke={strokeColor}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-black text-slate-900 font-mono">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="text-xs font-bold text-slate-900 truncate">
            {data.courseName || 'Cumulative All-Subject Status'}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Attended: <strong className="text-slate-800">{attended}</strong> of <strong className="text-slate-800">{total}</strong> sessions
          </div>
          <div className="text-[11px] text-slate-600">
            Safe absences buffer: <span className="font-bold text-emerald-700 font-mono">+{safeMisses} sessions</span>
          </div>
        </div>
      </div>

      {/* Action Button: View Subject Drilldown Modal */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-blue-700 bg-blue-50/70 hover:bg-blue-100/70 rounded-lg border border-blue-200/60 transition cursor-pointer"
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span>View Subject-wise Drilldown &amp; Absence Simulator</span>
        <ChevronRight className="w-3.5 h-3.5 ml-auto" />
      </button>

      {/* Subject-Wise Drilldown Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-soft-xl border border-slate-200 overflow-hidden space-y-4 p-5 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Verified Attendance Records</h3>
                  <p className="text-[11px] text-slate-500">Official registry audited by Attendance Agent</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Subject List */}
            <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
              {MOCK_STUDENT_DATA.attendance.subjects.map((sub) => {
                const subSafe = sub.percentage >= 75;
                const subWarning = sub.percentage >= 70 && sub.percentage < 75;
                return (
                  <div
                    key={sub.courseCode}
                    className="p-3 rounded-xl border border-slate-200/90 bg-slate-50/60 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-800">{sub.courseCode}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                          subSafe ? 'bg-emerald-100 text-emerald-800' : subWarning ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {sub.percentage}%
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 truncate mt-0.5">{sub.courseName}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {sub.attended}/{sub.total} classes · {sub.professor}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[11px] font-mono font-bold text-slate-700">
                        {sub.safeMisses > 0 ? (
                          <span className="text-emerald-600">+{sub.safeMisses} safe</span>
                        ) : (
                          <span className="text-rose-600">0 buffer</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive "What-If" Absence Simulator Inside Modal */}
            <div className="p-3.5 bg-blue-50/60 border border-blue-200/70 rounded-xl space-y-2.5 text-xs">
              <div className="flex items-center justify-between font-bold text-blue-900">
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-blue-600" />
                  What-If Absence Simulator
                </span>
                <span className="font-mono text-[11px]">
                  Simulate Missing: {simulatedAbsences} {simulatedAbsences === 1 ? 'class' : 'classes'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={simulatedAbsences}
                  onChange={(e) => setSimulatedAbsences(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-blue-200/50 text-[11px]">
                <span className="text-slate-600">
                  Projected: <strong className="font-mono text-slate-900">{simulatedPercentage}%</strong> ({simulatedAttended}/{simulatedTotal})
                </span>
                <span className={`font-bold font-mono ${stillSafe ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {stillSafe ? '✓ Remains Compliant' : '⚠ Drops Below 75%'}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  toast.success('Attendance records verified with registry');
                }}
                className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition cursor-pointer"
              >
                Close Drilldown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
