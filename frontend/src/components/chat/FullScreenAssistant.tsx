import { useEffect } from 'react';
import { 
  Bot, 
  RotateCcw, 
  ArrowLeft, 
  ChevronDown
} from 'lucide-react';
import { useChatStream } from '@/hooks/useChatStream';
import { useChatStore } from '@/stores/chatStore';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatInput } from './ChatInput';
import { AgentLiveStatusTicker } from '@/components/agent/AgentLiveStatusTicker';
import { Button } from '@/components/ui/Button';

interface FullScreenAssistantProps {
  onBackToDashboard: () => void;
}

export function FullScreenAssistant({ onBackToDashboard }: FullScreenAssistantProps) {
  const { clearMessages } = useChatStore();
  const { 
    messages, 
    isStreaming, 
    containerRef, 
    isAtBottom, 
    streamResponse, 
    stopStreaming, 
    scrollToBottom, 
    handleScroll 
  } = useChatStream();

  useEffect(() => {
    scrollToBottom(false);
  }, [scrollToBottom]);

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-soft-sm overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Assistant Header */}
      <div className="h-14 px-6 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="xs"
            onClick={onBackToDashboard}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Dashboard</span>
          </Button>

          <div className="h-4 w-[1px] bg-slate-200" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] flex items-center justify-center text-white shadow-soft-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-bold text-slate-900 leading-none">
                  Central AI Orchestrator
                </h2>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                  7 Agents Synchronized
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                LangGraph State Machine · Gemini API Fast Token Engine
              </p>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={clearMessages}
            disabled={isStreaming}
            className="text-xs text-slate-600"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Reset Context</span>
          </Button>
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-slate-50/30 relative"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <ChatMessageItem
              key={msg.id}
              message={msg}
              onRegenerate={(txt) => streamResponse(`Re-evaluate: ${txt}`)}
            />
          ))}

          {/* Live Multi-Agent Execution Status Ticker */}
          {isStreaming && (
            <AgentLiveStatusTicker isStreaming={isStreaming} />
          )}
        </div>

        {/* Floating "Scroll to Bottom" indicator if user scrolled up */}
        {!isAtBottom && (
          <button
            onClick={() => scrollToBottom(true)}
            className="sticky bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-[#1E3A8A] text-white text-xs font-bold shadow-soft-md hover:bg-[#172554] transition flex items-center gap-1.5 cursor-pointer z-20"
          >
            <span>Jump to latest</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Bottom Input Area */}
      <div className="p-4 sm:p-6 bg-white border-t border-slate-200 shrink-0">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            onSendMessage={streamResponse}
            isStreaming={isStreaming}
            onStopStreaming={stopStreaming}
            placeholder="Ask anything: 'Do I qualify for midterms?', 'Show unpaid dues', 'Classroom for CS304'..."
          />
        </div>
      </div>

    </div>
  );
}
