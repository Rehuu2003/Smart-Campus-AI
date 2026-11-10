import { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  Clock, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ExternalLink,
  X,
  FileCheck,
  Send
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_STUDENT_DATA, AssignmentItem } from '@/lib/mockData';

export function PendingTasksList() {
  const [tasks, setTasks] = useState<AssignmentItem[]>(MOCK_STUDENT_DATA.assignments);
  const [selectedTask, setSelectedTask] = useState<AssignmentItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFile, setSubmittedFile] = useState<string>('raft-consensus-v1.zip');
  const [submissionNotes, setSubmissionNotes] = useState('');

  const handleOpenSubmit = (task: AssignmentItem) => {
    setSelectedTask(task);
  };

  const handleConfirmSubmit = () => {
    if (!selectedTask) return;
    setIsSubmitting(true);

    // Simulate Agent verification delay
    setTimeout(() => {
      // Trigger Celebration Confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10B981', '#1E3A8A', '#F59E0B', '#8B5CF6'],
      });

      // Update task in state to 'submitted'
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id
            ? { ...t, status: 'submitted' as const }
            : t
        )
      );

      setIsSubmitting(false);
      setSelectedTask(null);
    }, 800);
  };

  const getStatusBadge = (task: AssignmentItem) => {
    if (task.status === 'graded') {
      return (
        <Badge variant="success" withDot>
          Graded: {task.score}/{task.maxScore}
        </Badge>
      );
    }
    if (task.status === 'submitted') {
      return (
        <Badge variant="info" withDot>
          Submitted &amp; Verified
        </Badge>
      );
    }
    return (
      <Badge variant="danger" withDot>
        Action Required
      </Badge>
    );
  };

  return (
    <>
      <Card className="shadow-soft-xs hover:border-slate-300 transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-5 h-5 text-rose-600" />
              Coursework &amp; Assignment Submissions
            </CardTitle>
            <CardDescription>
              Monitored by the Assignment Agent with deadline verification
            </CardDescription>
          </div>
          <Badge variant="agent" agentId="assignment" withDot>
            Deadlines Active
          </Badge>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
              >
                {/* Left Task Metadata */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {task.courseCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {task.courseName}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Weight: {task.weightagePercent}%
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {task.title}
                  </h4>

                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className={task.status === 'pending' ? 'text-rose-600 font-semibold' : 'text-slate-500'}>
                      Due: {task.dueDate} at {task.dueTime}
                    </span>
                  </div>
                </div>

                {/* Right Actions & Badges */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  {getStatusBadge(task)}

                  {task.status === 'pending' ? (
                    <Button
                      variant="primary"
                      size="xs"
                      onClick={() => handleOpenSubmit(task)}
                      className="bg-[#1E3A8A] hover:bg-[#172554] text-xs font-bold"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Turn In</span>
                    </Button>
                  ) : (
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>On File</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submission Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedTask(null)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-soft-xl border border-slate-200 p-6 z-10 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-mono">
                  {selectedTask.courseCode} Submission
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Turn in Assignment
                </h3>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Task Info */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-xs text-slate-900">{selectedTask.title}</div>
              <div className="text-[11px] text-slate-500 font-mono">
                Deadline: {selectedTask.dueDate} · {selectedTask.dueTime}
              </div>
            </div>

            {/* Simulated File Upload Box */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <Upload className="w-8 h-8 text-blue-700 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-800">
                Selected File: <span className="font-mono text-blue-700">{submittedFile}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                PDF, ZIP, TAR.GZ or Jupyter Notebook up to 25MB
              </p>
            </div>

            {/* Submission Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Student Notes / GitHub Repo Link (Optional)
              </label>
              <textarea
                rows={2}
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                placeholder="https://github.com/alexchen/raft-consensus or implementation notes..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent bg-slate-50/50 placeholder:text-slate-400"
              />
            </div>

            {/* Agent Verification Disclaimer */}
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80 text-[11px] text-blue-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                The <strong>Assignment Agent</strong> will timestamp this submission and verify integrity against plagiarism criteria.
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTask(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleConfirmSubmit}
                className="bg-[#1E3A8A] hover:bg-[#172554] font-bold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm &amp; Submit</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
