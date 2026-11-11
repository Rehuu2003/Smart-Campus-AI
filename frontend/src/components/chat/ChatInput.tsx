import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { 
  Send, 
  Square, 
  Paperclip, 
  Mic, 
  MicOff, 
  Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ChatInputProps {
  onSendMessage: (query: string) => void;
  isStreaming: boolean;
  onStopStreaming: () => void;
  placeholder?: string;
}

export function ChatInput({
  onSendMessage,
  isStreaming,
  onStopStreaming,
  placeholder = "Ask about attendance cutoffs, fee receipts, lecture rooms, assignments...",
}: ChatInputProps) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [text]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!text.trim() || isStreaming) return;
    onSendMessage(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleMicToggle = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate speech-to-text input after 1.5s
      setTimeout(() => {
        setText("What is my current attendance in Distributed Systems?");
        setIsRecording(false);
      }, 1500);
    }
  };

  const categorizedPills = [
    { label: 'Check CS301 Attendance', color: '#10B981', query: 'What is my current attendance in CS301?' },
    { label: 'Outstanding Fee Dues', color: '#F59E0B', query: 'Do I have any pending fee dues?' },
    { label: "Today's Lecture Rooms", color: '#A855F7', query: 'Where are my classes located today?' },
    { label: 'Pending Lab Tasks', color: '#F43F5E', query: 'What assignments are due this week?' },
  ];

  return (
    <div className="space-y-2.5">
      {/* Quick Prompt Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#1E3A8A]" />
          Quick:
        </span>
        {categorizedPills.map((pill) => (
          <button
            key={pill.label}
            type="button"
            onClick={() => onSendMessage(pill.query)}
            disabled={isStreaming}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border border-slate-200/80 shrink-0 disabled:opacity-50"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pill.color }} />
            <span>{pill.label}</span>
          </button>
        ))}
      </div>

      {/* Main Input Box */}
      <div className="relative rounded-2xl border border-slate-200 bg-white shadow-soft-xs focus-within:ring-2 focus-within:ring-[#1E3A8A] focus-within:border-transparent transition-all">
        {/* Voice recording pulsing banner */}
        {isRecording && (
          <div className="px-4 py-2 bg-rose-50 border-b border-rose-100 flex items-center justify-between text-xs text-rose-700 rounded-t-2xl animate-pulse">
            <span className="flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              Listening... Speak now
            </span>
            <span className="text-[10px] font-mono">Audio Stream Active</span>
          </div>
        )}

        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isStreaming}
          className="w-full text-xs sm:text-sm p-3.5 pr-28 bg-transparent focus:outline-none resize-none max-h-40 text-slate-900 placeholder:text-slate-400 font-sans"
        />

        {/* Input Controls (Mic, Attachment, Send/Stop) */}
        <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5">
          {/* Attachment stub */}
          <button
            type="button"
            title="Attach file (PDF / Syllabus)"
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Voice Input button */}
          <button
            type="button"
            onClick={handleMicToggle}
            title={isRecording ? "Stop Listening" : "Voice Input"}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer ${
              isRecording 
                ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-400' 
                : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Send / Stop Streaming Button */}
          {isStreaming ? (
            <Button
              type="button"
              onClick={onStopStreaming}
              variant="danger"
              size="xs"
              className="w-8 h-8 p-0 rounded-lg shadow-soft-xs"
              title="Stop Generating"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!text.trim()}
              variant="primary"
              size="xs"
              className="w-8 h-8 p-0 rounded-lg bg-[#1E3A8A] hover:bg-[#172554] shadow-soft-xs"
              title="Send Message (Enter)"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-1 text-[10px] text-slate-400 font-mono">
        <span>Press <kbd className="bg-slate-100 px-1 py-0.2 rounded border">Enter</kbd> to submit, <kbd className="bg-slate-100 px-1 py-0.2 rounded border">Shift+Enter</kbd> for new line</span>
        <span>Coordinated by LangGraph</span>
      </div>
    </div>
  );
}
