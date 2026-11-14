import React, { useState } from 'react';
import { FileText, Clock, Upload, CheckCircle2, Download } from 'lucide-react';
import { AssignmentWidgetData } from '@/types/chat';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface AssignmentWidgetProps {
  data?: Partial<AssignmentWidgetData>;
}

const DEFAULT_ASSIGNMENT: AssignmentWidgetData = {
  title: 'Lab 4: Raft Consensus Engine Implementation',
  courseCode: 'CS301',
  courseName: 'Distributed Systems & Microservices',
  dueDate: 'Friday, Nov 20, 2026',
  daysRemaining: 6,
  weightage: '15% Final Grade',
  status: 'pending',
};

export function AssignmentWidget({ data }: AssignmentWidgetProps) {
  const [assignment, setAssignment] = useState<AssignmentWidgetData>({
    ...DEFAULT_ASSIGNMENT,
    ...data,
  });

  const isSubmitted = assignment.status === 'submitted';

  const handleSimulateSubmit = () => {
    setAssignment((prev) => ({
      ...prev,
      status: 'submitted',
    }));

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    toast.success('Assignment submitted to Git repository and audited by Assignment Agent!');
  };

  return (
    <div className="mt-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-1.5 text-rose-700">
          <FileText className="w-4 h-4 text-rose-600" />
          <span>Assignment Agent · Coursework Tracker</span>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isSubmitted
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}
        >
          {isSubmitted ? 'Submitted & On Time' : `${assignment.daysRemaining} days remaining`}
        </span>
      </div>

      {/* Details Box */}
      <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-slate-900">{assignment.courseCode}</span>
          <span className="text-xs font-bold text-slate-800">{assignment.title}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Due: {assignment.dueDate}
          </span>
          <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.2 rounded border border-rose-200/60">
            {assignment.weightage}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => toast.success('Assignment PDF Specification downloaded')}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Download Brief</span>
        </button>

        {!isSubmitted ? (
          <button
            type="button"
            onClick={handleSimulateSubmit}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Turn In Lab Code</span>
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Turned In</span>
          </div>
        )}
      </div>
    </div>
  );
}
