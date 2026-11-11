import { create } from 'zustand';
import { ChatMessage, ChatMode } from '@/types/chat';

interface ChatStoreState {
  messages: ChatMessage[];
  chatMode: ChatMode;
  isStreaming: boolean;
  activeQuery: string;
  addMessage: (msg: ChatMessage) => void;
  updateMessageText: (id: string, text: string) => void;
  setMessageComplete: (id: string) => void;
  setReaction: (id: string, reaction: 'up' | 'down') => void;
  clearMessages: () => void;
  setChatMode: (mode: ChatMode) => void;
  setIsStreaming: (status: boolean) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'bot',
    text: "Greetings Alex! I am your **Smart Campus AI Coordinator**.\n\nI actively orchestrate 6 specialized domain agents to retrieve verified information directly from college academic & financial databases:\n* 🟢 **Attendance Agent:** Real-time cutoff compliance and safe-miss calculations\n* 🟡 **Fee Agent:** Ledger audits, dues, and payment receipt lookups\n* 🔮 **Timetable Agent:** Live schedules, classroom locations, and clash verification\n* 🔴 **Assignment Agent:** Coursework deadlines, rubrics, and submission tracking\n* 🔵 **Exam Agent:** Hall tickets, seating arrangements, and GPA archives\n* 🌐 **Support Agent:** Campus policies, regulations, and departmental FAQs\n\nHow can I assist your studies today?",
    timestamp: '09:00 AM',
    status: 'complete',
    primaryAgentId: 'coordinator',
  },
  {
    id: 'msg-init-2',
    sender: 'user',
    text: "Can I miss tomorrow's 10:00 AM Distributed Systems class? What will happen to my attendance percentage?",
    timestamp: '09:02 AM',
    status: 'complete',
  },
  {
    id: 'msg-init-3',
    sender: 'bot',
    text: "Yes, you can safely miss tomorrow's lecture.\n\nHere is the verified analysis from the **Attendance Agent**:\n* **Current Status:** You have attended **28 of 33 sessions** in `CS301` (**84.85%**).\n* **Impact of Missing Tomorrow:** If you miss tomorrow's lecture, your record will adjust to **28 of 34 sessions** (**82.35%**).\n* **Cutoff Margin:** You will still remain **+7.35% above** the mandatory 75% cutoff and retain a buffer of **3 additional safe absences**.",
    timestamp: '09:02 AM',
    status: 'complete',
    primaryAgentId: 'attendance',
    agentChain: [
      { agentId: 'coordinator', action: 'Classified query intent: Course Attendance & Absence Simulation', durationMs: 14, status: 'success' },
      { agentId: 'attendance', action: 'Queried database: student_id=104, course_code=CS301', durationMs: 22, status: 'success' },
      { agentId: 'attendance', action: 'Computed absence projection: 28/34 = 82.35% (Safe margin: +3 remaining)', durationMs: 8, status: 'success' },
    ],
    widget: {
      type: 'attendance',
      data: {
        courseCode: 'CS301',
        courseName: 'Distributed Systems & Microservices',
        percentage: 84.85,
        attended: 28,
        total: 33,
        safeMisses: 4,
      },
    },
  },
];

export const useChatStore = create<ChatStoreState>((set) => ({
  messages: INITIAL_MESSAGES,
  chatMode: 'drawer',
  isStreaming: false,
  activeQuery: '',

  addMessage: (msg: ChatMessage) =>
    set((state) => ({ messages: [...state.messages, msg] })),

  updateMessageText: (id: string, text: string) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, text } : m
      ),
    })),

  setMessageComplete: (id: string) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, status: 'complete' } : m
      ),
      isStreaming: false,
    })),

  setReaction: (id: string, reaction: 'up' | 'down') =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id
          ? { ...m, reaction: m.reaction === reaction ? undefined : reaction }
          : m
      ),
    })),

  clearMessages: () => set({ messages: [INITIAL_MESSAGES[0]] }),

  setChatMode: (chatMode: ChatMode) => set({ chatMode }),

  setIsStreaming: (isStreaming: boolean) => set({ isStreaming }),
}));
