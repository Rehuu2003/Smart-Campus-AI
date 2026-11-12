import { useState } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock, 
  Code2, 
  Copy, 
  Check, 
  ArrowRight,
  Database,
  Cpu
} from 'lucide-react';
import { AgentChainStep } from '@/types/chat';
import { AGENT_REGISTRY } from '@/types/agent';
import { toast } from 'sonner';

interface AgentThoughtTraceProps {
  steps: AgentChainStep[];
  defaultExpanded?: boolean;
}

export function AgentThoughtTrace({ steps, defaultExpanded = false }: AgentThoughtTraceProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [inspectedStepIdx, setInspectedStepIdx] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!steps || steps.length === 0) return null;

  const totalTimeMs = steps.reduce((acc, s) => acc + (s.durationMs || 0), 0);

  // Generate realistic mock tool call payloads for inspection
  const getToolCallPayload = (step: AgentChainStep) => {
    return {
      node: step.agentId,
      action: step.action,
      timestamp: new Date().toISOString(),
      execution_latency_ms: step.durationMs,
      tool_binding: {
        database_driver: 'MongoDB / PostgreSQL Connector',
        runtime: 'Python 3.11 LangGraph StateGraph',
        model: 'gemini-1.5-flash-latest',
        temperature: 0.1,
      },
      status: step.status,
    };
  };

  const handleCopyPayload = (step: AgentChainStep, idx: number) => {
    const payload = JSON.stringify(getToolCallPayload(step), null, 2);
    navigator.clipboard.writeText(payload);
    setCopiedIdx(idx);
    toast.success('Agent tool call payload copied to clipboard');
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-soft-xs text-xs font-sans">
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 transition text-slate-700 cursor-pointer text-left border-b border-transparent data-[expanded=true]:border-slate-200"
        data-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-blue-100/80 text-blue-700 flex items-center justify-center shadow-2xs">
            <Sparkles className="w-3 h-3 text-blue-600 animate-pulse" />
          </div>
          <span className="font-bold text-xs text-slate-900">
            Multi-Agent Reasoning Trace
          </span>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-200/60 px-1.5 py-0.2 rounded font-semibold">
            {steps.length} Steps · {totalTimeMs}ms
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="text-[10px] font-mono hidden sm:inline">
            {isExpanded ? 'Hide Trace' : 'Inspect Pipeline'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </div>
      </button>

      {/* Expanded Step Timeline */}
      {isExpanded && (
        <div className="p-3.5 space-y-3 bg-white border-t border-slate-100">
          <div className="relative border-l-2 border-slate-200 ml-2.5 pl-4 space-y-3.5">
            {steps.map((step, idx) => {
              const meta = AGENT_REGISTRY[step.agentId] || AGENT_REGISTRY.coordinator;
              const isInspecting = inspectedStepIdx === idx;

              return (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <span
                    className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white"
                    style={{ backgroundColor: meta.color }}
                  />

                  {/* Step Summary Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border font-mono"
                        style={{
                          backgroundColor: `${meta.color}15`,
                          borderColor: `${meta.color}35`,
                          color: meta.color,
                        }}
                      >
                        {meta.shortName}
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        {step.action}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span>{step.durationMs}ms</span>
                      <button
                        type="button"
                        onClick={() => setInspectedStepIdx(isInspecting ? null : idx)}
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <Code2 className="w-3 h-3" />
                        <span>{isInspecting ? 'Hide JSON' : 'Inspect'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Tool Call JSON Inspector Drawer */}
                  {isInspecting && (
                    <div className="mt-2.5 p-3 rounded-lg bg-[#0F172A] text-slate-200 border border-slate-800 font-mono text-[11px] relative shadow-soft-xs">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Database className="w-3 h-3 text-emerald-400" />
                          Tool Execution Payload: {step.agentId}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyPayload(step, idx)}
                          className="flex items-center gap-1 hover:text-white transition cursor-pointer text-blue-400"
                        >
                          {copiedIdx === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy JSON</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="overflow-x-auto text-emerald-300 max-h-48 leading-relaxed">
                        {JSON.stringify(getToolCallPayload(step), null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
