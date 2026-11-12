import { useState, useEffect } from 'react';
import { Sparkles, Database, Cpu, ArrowRight, Clock } from 'lucide-react';
import { AgentId, AGENT_REGISTRY } from '@/types/agent';

interface AgentLiveStatusTickerProps {
  isStreaming: boolean;
  targetAgentId?: AgentId;
}

export function AgentLiveStatusTicker({
  isStreaming,
  targetAgentId = 'attendance',
}: AgentLiveStatusTickerProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  const targetAgent = AGENT_REGISTRY[targetAgentId] || AGENT_REGISTRY.attendance;

  const phases = [
    {
      title: 'Intent Classification',
      desc: 'Central Coordinator analyzing semantic intent & permissions',
      icon: Cpu,
      color: '#8B5CF6',
    },
    {
      title: `Routing to ${targetAgent.shortName}`,
      desc: `Delegated to ${targetAgent.name}`,
      icon: ArrowRight,
      color: targetAgent.color,
    },
    {
      title: 'Database Tool Calling',
      desc: 'Executing parameterized query against college ledger',
      icon: Database,
      color: targetAgent.color,
    },
    {
      title: 'Synthesizing Response',
      desc: 'Streaming verified natural language output via Gemini API',
      icon: Sparkles,
      color: '#1E3A8A',
    },
  ];

  // Increment timer while streaming
  useEffect(() => {
    if (!isStreaming) {
      setPhaseIndex(0);
      setElapsedMs(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsedMs((prev) => prev + 15);
    }, 15);

    const phaseTimer1 = setTimeout(() => setPhaseIndex(1), 80);
    const phaseTimer2 = setTimeout(() => setPhaseIndex(2), 220);
    const phaseTimer3 = setTimeout(() => setPhaseIndex(3), 420);

    return () => {
      clearInterval(interval);
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      clearTimeout(phaseTimer3);
    };
  }, [isStreaming]);

  if (!isStreaming) return null;

  const currentPhase = phases[Math.min(phaseIndex, phases.length - 1)];
  const Icon = currentPhase.icon;

  return (
    <div className="p-3.5 rounded-xl border border-blue-200/90 bg-white/95 shadow-soft-xs text-xs animate-in fade-in slide-in-from-bottom-2 duration-150 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Pulsing Beacon */}
          <div className="relative flex h-3.5 w-3.5 items-center justify-center">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: currentPhase.color }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: currentPhase.color }}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-xs">
                {currentPhase.title}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Phase {phaseIndex + 1} of 4
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              {currentPhase.desc}
            </p>
          </div>
        </div>

        {/* Live Elapsed Milliseconds */}
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>{elapsedMs}ms</span>
          </div>
          <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
            Latency Benchmark
          </span>
        </div>
      </div>
    </div>
  );
}
