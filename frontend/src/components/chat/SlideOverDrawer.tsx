import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  ArrowUpRight, 
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { AGENT_REGISTRY, AgentId } from '@/types/agent';
import { Button } from '@/components/ui/Button';

interface SlideOverDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  agentChain?: {
    agentId: AgentId;
    action: string;
    durationMs: number;
  }[];
  widget?: {
    type: 'attendance' | 'fee' | 'schedule';
    data: any;
  };
}

export function SlideOverDrawer({ isOpen, onClose }: SlideOverDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "Hello Alex! I am your Smart Campus AI Coordinator. I can route requests to Attendance, Fees, Timetable, Exams, and Assignment agents. How can I help you today?",
      timestamp: '10:00 AM',
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: "What is my current attendance in Distributed Systems (CS301)? Can I miss tomorrow's lecture?",
      timestamp: '10:01 AM',
    },
    {
      id: 'msg-3',
      sender: 'bot',
      text: "You have attended **28 out of 33** sessions in CS301 (**84.85%**). Since the mandatory threshold is 75%, you can safely miss up to **4 more classes** before dropping below the required cutoff.",
      timestamp: '10:01 AM',
      agentChain: [
        { agentId: 'coordinator', action: 'Intent analyzed: Check subject attendance & criteria', durationMs: 14 },
        { agentId: 'attendance', action: 'DB Query: student_id=104, course=CS301', durationMs: 22 },
        { agentId: 'attendance', action: 'Calculated margin: 4 safe absences remaining', durationMs: 6 },
      ],
      widget: {
        type: 'attendance',
        data: {
          course: 'CS301: Distributed Systems',
          percentage: 84.85,
          attended: 28,
          total: 33,
          safeToMiss: 4,
        },
      },
    },
  ]);

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedTraces, setExpandedTraces] = useState<Record<string, boolean>>({ 'msg-3': true });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = input;
    setInput('');

    // Simulate Multi-Agent Orchestration Response
    setTimeout(() => {
      const isFee = query.toLowerCase().includes('fee') || query.toLowerCase().includes('due');
      const isExam = query.toLowerCase().includes('exam') || query.toLowerCase().includes('gpa');
      const isSchedule = query.toLowerCase().includes('class') || query.toLowerCase().includes('schedule') || query.toLowerCase().includes('timetable');

      let reply: Message;

      if (isFee) {
        reply = {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: "I have verified your ledger with the **Fee & Finance Agent**. You have **₹0.00** outstanding tuition balance for Fall 2026. Your semester fee clearance certificate is verified.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentChain: [
            { agentId: 'coordinator', action: 'Routed to Fee Agent', durationMs: 12 },
            { agentId: 'fee', action: 'Ledger balance query: zero arrears verified', durationMs: 19 },
          ],
        };
      } else if (isSchedule) {
        reply = {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: "The **Timetable Agent** reports you have **3 lectures scheduled today**:\n- **10:00 AM:** CS301 Distributed Systems (LH-302)\n- **01:30 PM:** CS304 Database Internals (Lab 2)\n- **03:30 PM:** CS308 Software Engineering (Seminar Hall B)",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentChain: [
            { agentId: 'coordinator', action: 'Intent: Retrieve current day timetable', durationMs: 15 },
            { agentId: 'timetable', action: 'Fetched schedule for Section CS-A', durationMs: 25 },
          ],
        };
      } else {
        reply = {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: `Your query regarding "${query}" has been analyzed by the **Central AI Coordinator**. All systems report normal operating status for your academic profile.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentChain: [
            { agentId: 'coordinator', action: 'Parsed general academic query', durationMs: 18 },
            { agentId: 'support', action: 'Queried student handbook policy registry', durationMs: 20 },
          ],
        };
      }

      setMessages((prev) => [...prev, reply]);
      setExpandedTraces((prev) => ({ ...prev, [reply.id]: true }));
    }, 600);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTrace = (id: string) => {
    setExpandedTraces((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const quickPrompts = [
    "Check my CS301 attendance",
    "Any pending fee dues?",
    "Today's lecture schedule",
    "Upcoming assignment deadlines",
  ];

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
            className="relative w-full max-w-lg bg-white h-full shadow-soft-xl border-l border-slate-200 flex flex-col z-10"
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
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Multi-Agent
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    Orchestrated with LangGraph & Gemini
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([messages[0]])}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition cursor-pointer"
                  title="Clear conversation"
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
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* User Bubble */}
                  {msg.sender === 'user' ? (
                    <div className="max-w-[85%] bg-[#1E3A8A] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-soft-xs">
                      {msg.text}
                      <span className="text-[10px] text-blue-200 block text-right mt-1 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  ) : (
                    /* Bot Bubble */
                    <div className="max-w-[95%] space-y-2">
                      {/* Agent Reasoning Trace Accordion */}
                      {msg.agentChain && msg.agentChain.length > 0 && (
                        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-soft-xs text-xs">
                          <button
                            onClick={() => toggleTrace(msg.id)}
                            className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100/80 transition text-slate-700 cursor-pointer text-left"
                          >
                            <span className="flex items-center gap-1.5 font-bold text-[11px] text-blue-900">
                              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                              Multi-Agent Routing Trace ({msg.agentChain.length} steps)
                            </span>
                            {expandedTraces[msg.id] ? (
                              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </button>

                          {expandedTraces[msg.id] && (
                            <div className="p-3 bg-white space-y-2 border-t border-slate-100 font-mono text-[11px]">
                              {msg.agentChain.map((step, idx) => {
                                const agent = AGENT_REGISTRY[step.agentId];
                                return (
                                  <div key={idx} className="flex items-start gap-2 text-slate-600">
                                    <span 
                                      className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 border"
                                      style={{ backgroundColor: `${agent.color}15`, color: agent.color, borderColor: `${agent.color}30` }}
                                    >
                                      {agent.shortName}
                                    </span>
                                    <span className="flex-1 text-[11px] leading-tight text-slate-700">
                                      {step.action}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      {step.durationMs}ms
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Bot Answer Card */}
                      <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-800 leading-relaxed shadow-soft-xs space-y-3">
                        <div className="whitespace-pre-line">{msg.text}</div>

                        {/* Interactive Widget Render */}
                        {msg.widget?.type === 'attendance' && (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 font-sans">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                              <span>{msg.widget.data.course}</span>
                              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px]">
                                Safe (+{msg.widget.data.safeToMiss} Misses)
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-emerald-500 h-full rounded-full transition-all" 
                                style={{ width: `${msg.widget.data.percentage}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                              <span>Attended: {msg.widget.data.attended}/{msg.widget.data.total}</span>
                              <span className="font-bold text-slate-900">{msg.widget.data.percentage}%</span>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                          <span>{msg.timestamp} · Verified</span>
                          <button
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="flex items-center gap-1 hover:text-slate-600 transition cursor-pointer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600 font-semibold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Pills */}
            <div className="px-4 py-2 border-t border-slate-200/80 bg-white flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
              <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Try:</span>
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setInput(prompt);
                  }}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium whitespace-nowrap transition cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about attendance, dues, exams, timetable..."
                    className="w-full text-xs pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent bg-slate-50 placeholder:text-slate-400 shadow-soft-xs"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!input.trim()}
                  className="shrink-0 bg-[#1E3A8A] hover:bg-[#172554] shadow-soft-xs"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
