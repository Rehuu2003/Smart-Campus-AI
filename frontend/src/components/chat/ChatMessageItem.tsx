import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Bot, 
  ShieldCheck 
} from 'lucide-react';
import { ChatMessage } from '@/types/chat';
import { AGENT_REGISTRY } from '@/types/agent';
import { useChatStore } from '@/stores/chatStore';

interface ChatMessageItemProps {
  message: ChatMessage;
  onRegenerate?: (queryText: string) => void;
}

export function ChatMessageItem({ message, onRegenerate }: ChatMessageItemProps) {
  const { setReaction } = useChatStore();
  const [copied, setCopied] = useState(false);
  const [traceExpanded, setTraceExpanded] = useState(true);

  const isUser = message.sender === 'user';
  const primaryAgent = message.primaryAgentId 
    ? AGENT_REGISTRY[message.primaryAgentId] 
    : AGENT_REGISTRY.coordinator;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // User Message
  if (isUser) {
    return (
      <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="max-w-[85%] sm:max-w-[75%] bg-[#1E3A8A] text-white px-4 py-3 rounded-2xl rounded-tr-xs text-xs sm:text-sm font-medium shadow-soft-xs space-y-1">
          <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
          <div className="text-[10px] text-blue-200/80 font-mono text-right">
            {message.timestamp}
          </div>
        </div>
      </div>
    );
  }

  // Bot Multi-Agent Response
  return (
    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="max-w-[95%] sm:max-w-[88%] space-y-2.5">
        
        {/* Agent Header Identity */}
        <div className="flex items-center gap-2 text-xs">
          <div 
            className="w-6 h-6 rounded-lg flex items-center justify-center shadow-2xs"
            style={{ backgroundColor: `${primaryAgent.color}15`, color: primaryAgent.color }}
          >
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-800 text-xs">
            {primaryAgent.name}
          </span>
          <span 
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded-full border"
            style={{ 
              borderColor: `${primaryAgent.color}30`, 
              backgroundColor: `${primaryAgent.color}10`, 
              color: primaryAgent.color 
            }}
          >
            {primaryAgent.shortName}
          </span>
        </div>

        {/* Multi-Agent Execution Trace Accordion */}
        {message.agentChain && message.agentChain.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-soft-xs text-xs">
            <button
              type="button"
              onClick={() => setTraceExpanded(!traceExpanded)}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-50 hover:bg-slate-100/70 transition text-slate-700 cursor-pointer text-left"
            >
              <span className="flex items-center gap-1.5 font-bold text-[11px] text-blue-900">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Multi-Agent Execution Pipeline ({message.agentChain.length} steps)
              </span>
              {traceExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {traceExpanded && (
              <div className="p-3 bg-white space-y-2 border-t border-slate-100 font-mono text-[11px]">
                {message.agentChain.map((step, idx) => {
                  const agent = AGENT_REGISTRY[step.agentId];
                  return (
                    <div key={idx} className="flex items-start gap-2 text-slate-600">
                      <span 
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 border"
                        style={{ 
                          backgroundColor: `${agent.color}15`, 
                          color: agent.color, 
                          borderColor: `${agent.color}30` 
                        }}
                      >
                        {agent.shortName}
                      </span>
                      <span className="flex-1 text-[11px] leading-tight text-slate-700 font-sans">
                        {step.action}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {step.durationMs}ms
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Bot Message Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-soft-xs text-slate-800 space-y-3">
          {/* Markdown Content */}
          <div className="text-xs sm:text-sm prose prose-slate max-w-none leading-relaxed">
            {message.text ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.text}
              </ReactMarkdown>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono py-1">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span>Generating multi-agent response...</span>
              </div>
            )}

            {/* Blinking streaming cursor */}
            {message.status === 'streaming' && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-[#1E3A8A] animate-pulse align-middle" />
            )}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-1.5 text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{message.timestamp} · Verified</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopy}
                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {/* Thumbs up */}
              <button
                type="button"
                onClick={() => setReaction(message.id, 'up')}
                className={`p-1 rounded transition cursor-pointer ${
                  message.reaction === 'up' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                }`}
                title="Helpful response"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>

              {/* Thumbs down */}
              <button
                type="button"
                onClick={() => setReaction(message.id, 'down')}
                className={`p-1 rounded transition cursor-pointer ${
                  message.reaction === 'down' 
                    ? 'text-rose-600 bg-rose-50' 
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                }`}
                title="Report issue"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>

              {/* Regenerate */}
              {onRegenerate && (
                <button
                  type="button"
                  onClick={() => onRegenerate(message.text)}
                  className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  title="Regenerate"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
