import { AgentId, AGENT_REGISTRY } from '@/types/agent';
import { AgentAvatar } from './AgentAvatar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Cpu, Database, Zap } from 'lucide-react';

interface AgentIdentityCardProps {
  agentId: AgentId;
  onSelectPrompt?: (prompt: string) => void;
}

const AGENT_CAPABILITIES: Record<AgentId, { tools: string[]; benchmarkMs: number; sampleQuery: string }> = {
  coordinator: {
    tools: ['Intent Classification', 'Context Memory Traversal', 'Safety Guardrails'],
    benchmarkMs: 14,
    sampleQuery: 'Can I miss tomorrow’s 10 AM class without attendance shortage?',
  },
  attendance: {
    tools: ['lookupRollAttendance()', 'calculateSafeMissMargin()', 'projectAbsenceRatio()'],
    benchmarkMs: 18,
    sampleQuery: 'What is my current attendance in Distributed Systems?',
  },
  fee: {
    tools: ['queryStudentLedger()', 'generateReceiptPDF()', 'verifyPaymentClearance()'],
    benchmarkMs: 22,
    sampleQuery: 'Download my paid fee receipt for Semester 5',
  },
  exam: {
    tools: ['fetchExamTimetable()', 'lookupSeatAllocation()', 'calculateGPAHistory()'],
    benchmarkMs: 16,
    sampleQuery: 'When do midterm hall tickets release?',
  },
  timetable: {
    tools: ['getSectionSchedule()', 'verifyRoomAllocation()', 'detectSubstituteClashes()'],
    benchmarkMs: 19,
    sampleQuery: 'Where is my software architecture lab located today?',
  },
  assignment: {
    tools: ['getPendingDeadlines()', 'verifySubmissionChecksum()', 'fetchRubrics()'],
    benchmarkMs: 20,
    sampleQuery: 'What assignments are due this week?',
  },
  support: {
    tools: ['queryHandbookRegulations()', 'getFacultyDirectory()', 'libraryHoursLookup()'],
    benchmarkMs: 15,
    sampleQuery: 'What are the library hours and hostel curfew regulations?',
  },
};

export function AgentIdentityCard({ agentId, onSelectPrompt }: AgentIdentityCardProps) {
  const meta = AGENT_REGISTRY[agentId] || AGENT_REGISTRY.coordinator;
  const caps = AGENT_CAPABILITIES[agentId] || AGENT_CAPABILITIES.coordinator;

  return (
    <Card className="hover:border-slate-300 hover:shadow-soft-sm transition-all overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <AgentAvatar agentId={agentId} size="md" status="online" />
            <div>
              <CardTitle className="text-sm font-bold text-slate-900 leading-tight">
                {meta.name}
              </CardTitle>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: meta.color }} 
                />
                <span className="text-[10px] font-mono text-slate-500 font-medium">
                  {meta.shortName}
                </span>
              </div>
            </div>
          </div>

          <Badge variant="success" withDot className="text-[10px] px-2 py-0">
            Online
          </Badge>
        </div>

        <CardDescription className="text-xs text-slate-600 mt-2.5 leading-relaxed">
          {meta.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-3">
        {/* Tool Capabilities */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 font-mono">
            <Database className="w-3 h-3 text-[#1E3A8A]" />
            Bound Database Tools
          </div>
          <div className="flex flex-wrap gap-1">
            {caps.tools.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Benchmarks & Sample Query */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-1 text-slate-600">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Avg: <strong>{caps.benchmarkMs}ms</strong></span>
          </div>

          {onSelectPrompt && (
            <button
              onClick={() => onSelectPrompt(caps.sampleQuery)}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
            >
              Test Query →
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
