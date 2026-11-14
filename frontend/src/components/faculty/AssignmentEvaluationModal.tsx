import React, { useState } from 'react';
import { 
  FileCheck, 
  ExternalLink, 
  Code, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Send,
  GitBranch,
  Bot
} from 'lucide-react';
import { MOCK_FACULTY_DATA } from '@/lib/mockData';
import { toast } from 'sonner';

interface AssignmentEvaluationModalProps {
  courseCode?: string;
  onClose: () => void;
}

export function AssignmentEvaluationModal({
  courseCode = 'CS301',
  onClose,
}: AssignmentEvaluationModalProps) {
  const [submissions, setSubmissions] = useState(MOCK_FACULTY_DATA.pendingSubmissions);
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);

  const activeSub = submissions[selectedSubIndex];

  // Rubric Scores State
  const [correctness, setCorrectness] = useState(activeSub?.suggestedScores.correctness ?? 35);
  const [architecture, setArchitecture] = useState(activeSub?.suggestedScores.architecture ?? 26);
  const [documentation, setDocumentation] = useState(activeSub?.suggestedScores.documentation ?? 25);
  const [feedbackText, setFeedbackText] = useState(activeSub?.aiAnalysis ?? '');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const totalScore = correctness + architecture + documentation;

  // When switching submissions, reload scores
  const handleSelectSubmission = (index: number) => {
    setSelectedSubIndex(index);
    const sub = submissions[index];
    setCorrectness(sub.suggestedScores.correctness);
    setArchitecture(sub.suggestedScores.architecture);
    setDocumentation(sub.suggestedScores.documentation);
    setFeedbackText(sub.aiAnalysis);
  };

  // AI Auto Feedback
  const handleAutoFillAiFeedback = async () => {
    setIsAiLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsAiLoading(false);
    setFeedbackText(
      `[Assignment Agent Audit - Commit #${activeSub.commitHash}]:\nPassed 12/12 unit and integration tests. Clean state machine separation with zero deadlock conditions. Excellent concurrent throughput during Raft election benchmark.`
    );
    toast.success('AI Evaluation Rubric & Feedback populated!');
  };

  // Submit Grade
  const handleSaveGrade = () => {
    toast.success(
      `Grade ${totalScore}/100 recorded for ${activeSub.studentName} (${activeSub.studentRoll})! Feedback notified.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-soft-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-900 bg-blue-100/60 px-2 py-0.2 rounded">
                  {courseCode}
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Coursework Evaluation &amp; Rubric Grading
                </h3>
              </div>
              <p className="text-[11px] text-slate-500">
                {activeSub?.assignmentTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Left Column: Student Submissions List (4 cols) */}
          <div className="md:col-span-4 p-4 overflow-y-auto space-y-2 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Pending Submissions ({submissions.length})
            </span>
            {submissions.map((sub, idx) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleSelectSubmission(idx)}
                className={`w-full text-left p-3 rounded-xl border transition cursor-pointer ${
                  selectedSubIndex === idx
                    ? 'bg-white border-blue-500 shadow-soft-xs ring-1 ring-blue-500/20'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-800">
                    {sub.studentRoll}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    #{sub.commitHash}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-900 mt-0.5">
                  {sub.studentName}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 truncate">
                  Submitted: {sub.submittedAt}
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Active Submission Evaluation & Rubric (8 cols) */}
          <div className="md:col-span-8 p-5 overflow-y-auto space-y-4">
            {/* Submission Metadata */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {activeSub.studentName} ({activeSub.studentRoll})
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Timestamp: {activeSub.submittedAt}
                  </span>
                </div>
                <a
                  href={`https://${activeSub.repoUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 transition"
                >
                  <GitBranch className="w-3 h-3" />
                  <span>Inspect Code</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>

              {/* Files Submitted */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeSub.files.map((file, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-600"
                  >
                    <Code className="w-3 h-3 text-slate-400" />
                    {file}
                  </span>
                ))}
              </div>
            </div>

            {/* Rubric Sliders */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Scoring Rubric (Total: {totalScore} / 100)</span>
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {totalScore >= 90 ? 'Grade A+' : totalScore >= 80 ? 'Grade A' : 'Grade B'}
                </span>
              </div>

              {/* Criterion 1 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">1. Correctness &amp; Test Suite Coverage</span>
                  <span className="font-mono font-bold text-slate-900">{correctness} / 40</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={correctness}
                  onChange={(e) => setCorrectness(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Criterion 2 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">2. Code Architecture, Concurrency &amp; Cleanliness</span>
                  <span className="font-mono font-bold text-slate-900">{architecture} / 30</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={architecture}
                  onChange={(e) => setArchitecture(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Criterion 3 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">3. Technical Documentation &amp; Benchmark Analysis</span>
                  <span className="font-mono font-bold text-slate-900">{documentation} / 30</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={documentation}
                  onChange={(e) => setDocumentation(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* AI Feedback Assistant */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-purple-600" />
                  Constructive Student Feedback
                </label>
                <button
                  type="button"
                  onClick={handleAutoFillAiFeedback}
                  disabled={isAiLoading}
                  className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100/80 px-2 py-0.5 rounded border border-purple-200 transition cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span>Auto-Suggest via Assignment Agent</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Enter feedback for student..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 leading-relaxed font-sans"
              />
            </div>

            {/* Save Grade Button */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleSaveGrade}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-soft-sm transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Record Grade ({totalScore}/100) &amp; Send Feedback</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
