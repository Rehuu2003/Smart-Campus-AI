import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Download, 
  Send, 
  ShieldAlert, 
  PhoneCall, 
  Calendar,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { MOCK_FACULTY_DATA } from '@/lib/mockData';
import { toast } from 'sonner';

interface DeficiencyRiskReportProps {
  courseCode?: string;
}

export function DeficiencyRiskReport({ courseCode = 'CS301' }: DeficiencyRiskReportProps) {
  const [students, setStudents] = useState(MOCK_FACULTY_DATA.deficientStudents);
  const [isDispatching, setIsDispatching] = useState(false);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Roll No', 'Name', 'Course', 'Attended', 'Total', 'Percentage', 'Risk Level', 'Sessions Needed To Recover', 'Parent Contact'];
    const rows = students.map((s) => [
      s.rollNo,
      `"${s.name}"`,
      s.courseCode,
      s.attended,
      s.total,
      `${s.percentage}%`,
      s.riskLevel,
      s.classesToRecover,
      s.parentContact,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-deficiency-report-${courseCode.toLowerCase()}-2026.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Deficiency risk report exported to CSV!');
  };

  // Bulk Dispatch
  const handleBulkDispatchNotices = async () => {
    setIsDispatching(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsDispatching(false);

    toast.success(
      `Dispatched formal attendance warning notices with recovery roadmap to ${students.length} parents and guardians via Campus Support Agent.`,
      { duration: 4500 }
    );
  };

  return (
    <Card className="border-rose-200/80 shadow-soft-md overflow-hidden">
      <CardHeader className="bg-rose-50/50 border-b border-rose-100 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <CardTitle className="text-base font-bold text-slate-900">
                Attendance Deficiency &amp; Academic Risk Detector
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-rose-700/80">
              Students identified below the mandatory 75% institutional threshold in {courseCode}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              disabled={isDispatching}
              onClick={handleBulkDispatchNotices}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-2xs transition disabled:opacity-60 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isDispatching ? 'Dispatching...' : 'Dispatch Warning Notices'}</span>
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4 text-xs">
        {/* Table of Deficient Students */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Roll No</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Current Attendance</th>
                <th className="py-2.5 px-3">Risk Severity</th>
                <th className="py-2.5 px-3">Recovery Required</th>
                <th className="py-2.5 px-3">Parent Contact</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => {
                const isCritical = student.riskLevel === 'Critical';
                return (
                  <tr key={student.rollNo} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                      {student.rollNo}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {student.name}
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-rose-600 text-xs">{student.percentage}%</span>
                        <span className="text-[10px] text-slate-400">({student.attended}/{student.total})</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isCritical
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {student.riskLevel} (&lt;75%)
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      <span className="text-slate-800 font-semibold">
                        Must attend next <strong className="text-blue-700">{student.classesToRecover}</strong> classes
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 text-[11px]">
                      {student.parentContact}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          toast.success(`Formal SMS advisory dispatched to ${student.name}'s parent (${student.parentContact})`)
                        }
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded border border-rose-200 transition cursor-pointer"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Send Alert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Advisory Box */}
        <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Institutional Mandate:</strong> Per university academic regulation Section 4.2, students with attendance under 75% at the conclusion of Week 12 are ineligible to sit for End-Term Theory Examinations without departmental condonation approval.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
