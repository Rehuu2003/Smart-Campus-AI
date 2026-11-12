import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown,
  Maximize2
} from 'lucide-react';
import { useChatStream } from '@/hooks/useChatStream';
import { useChatStore } from '@/stores/chatStore';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatInput } from './ChatInput';
import { AgentLiveStatusTicker } from '@/components/agent/AgentLiveStatusTicker';

interface SlideOverDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onExpandFullScreen?: () => void;
}

export function SlideOverDrawer({ isOpen, onClose, onExpandFullScreen }: SlideOverDrawerProps) {
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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom(false), 50);
    }
  }, [isOpen, scrollToBottom]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-xl bg-white h-full shadow-soft-xl border-l border-slate-200 flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-soft-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white shadow-soft-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">Campus AI Copilot</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.2 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Multi-Agent
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    Orchestrated by Central Coordinator
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {onExpandFullScreen && (
                  <button
                    onClick={() => {
                      onClose();
                      onExpandFullScreen();
                    }}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition cursor-pointer"
                    title="Expand to Full Screen View"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={clearMessages}
                  disabled={isStreaming}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition cursor-pointer disabled:opacity-50"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition cursor-pointer"
                  title="Close drawer (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 relative"
            >
              {messages.map((msg) => (
                <ChatMessageItem
                  key={msg.id}
                  message={msg}
                  onRegenerate={(txt) => streamResponse(`Clarify further: ${txt}`)}
                />
              ))}

              {/* Live Multi-Agent Execution Status Ticker */}
              {isStreaming && (
                <AgentLiveStatusTicker isStreaming={isStreaming} />
              )}

              {/* Jump to bottom button */}
              {!isAtBottom && (
                <button
                  onClick={() => scrollToBottom(true)}
                  className="sticky bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1E3A8A] text-white text-[11px] font-bold shadow-soft-md hover:bg-[#172554] transition flex items-center gap-1 cursor-pointer z-20"
                >
                  <span>New tokens below</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <ChatInput
                onSendMessage={streamResponse}
                isStreaming={isStreaming}
                onStopStreaming={stopStreaming}
              />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
