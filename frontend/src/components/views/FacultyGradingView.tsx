import React, { useState } from 'react';
import { 
  FileCheck, 
  ExternalLink, 
  Code, 
  Sparkles, 
  CheckCircle2, 
  Send,
  GitBranch,
  Bot,
  User,
  Clock,
  Award
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_FACULTY_DATA } from '@/lib/mockData';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export function FacultyGradingView() {
  const [submissions, setSubmissions] = useState(MOCK_FACULTY_DATA.pendingSubmissions);
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);

  const activeSub = submissions[selectedSubIndex];

  // Rubric Scores State
  const [correctness, setCorrectness] = useState(activeSub?.suggestedScores.correctness ?? 35);
  const [architecture, setArchitecture] = useState(activeSub?.suggestedScores.architecture ?? 26);
  const [documentation, setDocumentation] = useState(activeSub?.suggestedScores.documentation ?? 25);
  const [feedbackText, setFeedbackText] = useState(activeSub?.aiAnalysis ?? '');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isGradingSaved, setIsGradingSaved] = useState(false);

  const totalScore = correctness + architecture + documentation;

  const handleSelectSubmission = (index: number) => {
    setSelectedSubIndex(index);
    const sub = submissions[index];
    setCorrectness(sub.suggestedScores.correctness);
    setArchitecture(sub.suggestedScores.architecture);
    setDocumentation(sub.suggestedScores.documentation);
    setFeedbackText(sub.aiAnalysis);
    setIsGradingSaved(false);
  };

  const handleAutoFillAiFeedback = async () => {
    setIsAiLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsAiLoading(false);
    setFeedbackText(
      `[Assignment Agent Audit - Commit #${activeSub.commitHash}]:\nPassed 12/12 unit and integration test vectors. Clean state machine concurrency with zero deadlock or race condition. High code cohesion in Raft election logic.`
    );
    toast.success('AI Evaluation Rubric & Feedback populated!');
  };

  const handleSaveGrade = () => {
    setIsGradingSaved(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10B981', '#1E3A8A', '#38BDF8'],
    });
    toast.success(`Grade (${totalScore}/100) and feedback recorded for ${activeSub.studentName} (${activeSub.studentRoll})!`);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-rose-900 via-pink-950 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            Faculty Portal · Assignment Evaluation &amp; Code Review
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Assignment Evaluation Drawer
          </h1>

          <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
            Inspect submitted laboratory deliverables, review automated AI lint &amp; test analyses, adjust 3-dimensional rubric sliders, and record official semester scores.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
            <span className="bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-500/30 text-rose-200 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-rose-300" />
              Course: CS301 Distributed Systems
            </span>
            <span className="bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-500/30 text-rose-200 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-rose-300" />
              Weightage: 15% Final Grade
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Student Queue on Left, Evaluation Workstation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Submissions Queue */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Student Submissions ({submissions.length})
            </h3>
            <Badge variant="info" className="text-[10px]">
              Ready for Grading
            </Badge>
          </div>

          <div className="space-y-2">
            {submissions.map((sub, idx) => {
              const isSelected = idx === selectedSubIndex;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubmission(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-300 shadow-soft-xs ring-1 ring-blue-500/30'
                      : 'bg-white border-slate-200/90 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{sub.studentName}</span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {sub.studentRoll}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-1">
                    {sub.assignmentTitle}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{sub.submittedAt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Evaluation Canvas & Rubric Sliders */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="border-slate-200/90 shadow-soft-xs">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {activeSub.courseCode} · {activeSub.studentRoll}
                  </span>
                  <CardTitle className="text-base font-bold text-slate-900 pt-1.5">
                    {activeSub.studentName} — {activeSub.assignmentTitle}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-semibold">Total Score</div>
                  <div className="text-2xl font-extrabold text-[#1E3A8A]">
                    {totalScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-5">
              {/* Deliverable Metadata */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-slate-500" />
                  <span className="font-mono text-slate-700">{activeSub.repoUrl}</span>
                  <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.2 rounded text-slate-600">
                    #{activeSub.commitHash}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Code className="w-3.5 h-3.5" />
                  <span>{activeSub.files.length} Files: {activeSub.files.join(', ')}</span>
                </div>
              </div>

              {/* Automated AI Code Review Box */}
              <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-violet-900">
                    <Bot className="w-4 h-4 text-violet-600" />
                    <span>Assignment Agent Automated Code Analysis</span>
                  </div>
                  <Button
                    onClick={handleAutoFillAiFeedback}
                    size="sm"
                    variant="outline"
                    disabled={isAiLoading}
                    className="text-[11px] h-7 bg-white text-violet-700 border-violet-200 hover:bg-violet-100 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-violet-500" />
                    {isAiLoading ? 'Analyzing...' : 'Generate AI Rubric'}
                  </Button>
                </div>
                <p className="text-xs text-violet-800 leading-relaxed font-mono">
                  {feedbackText}
                </p>
              </div>

              {/* Rubric Sliders */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Grading Rubric Assessment
                </h4>

                {/* Correctness */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Code Correctness &amp; Unit Tests Passed</span>
                    <span className="font-mono font-bold text-blue-700">{correctness} / 40 pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={correctness}
                    onChange={(e) => setCorrectness(Number(e.target.value))}
                    className="w-full accent-[#1E3A8A] cursor-pointer"
                  />
                </div>

                {/* Architecture */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Architecture, Modularity &amp; Concurrency</span>
                    <span className="font-mono font-bold text-blue-700">{architecture} / 30 pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={architecture}
                    onChange={(e) => setArchitecture(Number(e.target.value))}
                    className="w-full accent-[#1E3A8A] cursor-pointer"
                  />
                </div>

                {/* Documentation */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Documentation, Readme &amp; Test Vectors</span>
                    <span className="font-mono font-bold text-blue-700">{documentation} / 30 pts</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={documentation}
                    onChange={(e) => setDocumentation(Number(e.target.value))}
                    className="w-full accent-[#1E3A8A] cursor-pointer"
                  />
                </div>
              </div>

              {/* Save Grade Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {isGradingSaved ? '✅ Grade recorded in central database' : 'Ready to record final rubric score'}
                </span>
                <Button
                  onClick={handleSaveGrade}
                  variant="primary"
                  className="bg-[#1E3A8A] hover:bg-[#172554] text-xs px-4 py-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  <span>Submit Final Score ({totalScore}/100)</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
