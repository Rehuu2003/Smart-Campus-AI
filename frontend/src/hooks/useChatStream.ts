import { useState, useRef, useEffect, useCallback } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { ChatMessage, AgentChainStep } from '@/types/chat';
import { AgentId } from '@/types/agent';

export function useChatStream() {
  const { messages, addMessage, updateMessageText, setMessageComplete, isStreaming, setIsStreaming } = useChatStore();
  const [isAtBottom, setIsAtBottom] = useState(true);
  const abortControllerRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Monitor user scroll position to avoid intrusive scroll snapping
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsAtBottom(distanceFromBottom < 60);
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  // Auto-scroll only when user is already near bottom
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom(false);
    }
  }, [messages, isAtBottom, scrollToBottom]);

  const stopStreaming = useCallback(() => {
    abortControllerRef.current = true;
    setIsStreaming(false);
  }, [setIsStreaming]);

  const streamResponse = useCallback(async (userQuery: string) => {
    abortControllerRef.current = false;
    setIsStreaming(true);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userQuery,
      timestamp: now,
      status: 'complete',
    };
    addMessage(userMsg);

    // 2. Determine agent routing & generate specialized response
    const q = userQuery.toLowerCase();
    let primaryAgent: AgentId = 'coordinator';
    let targetAction = 'Processed general university inquiry';
    let fullResponseText = '';
    let widgetData: any = undefined;

    if (q.includes('attendance') || q.includes('miss') || q.includes('class') || q.includes('present')) {
      primaryAgent = 'attendance';
      targetAction = 'Queried live attendance ledger: Roll #104';
      fullResponseText = `I have verified your records with the **Attendance Agent**:\n\n* **Aggregate Attendance:** You are currently at **84.85%** (140 attended out of 165 total sessions).\n* **Safe Absence Threshold:** You have **+12 safe misses remaining** across your courses before dropping below the required 75.0% threshold.\n* **Warning Flag:** Note that in **CS312 (Computer Networks)**, your attendance is at **76.47%** (0 safe misses left). You must not miss any upcoming networking sessions.`;
      widgetData = {
        type: 'attendance',
        data: {
          percentage: 84.85,
          attended: 140,
          total: 165,
          safeMisses: 12,
        },
      };
    } else if (q.includes('fee') || q.includes('due') || q.includes('tuition') || q.includes('receipt') || q.includes('pay')) {
      primaryAgent = 'fee';
      targetAction = 'Audited finance & transaction ledger: Student 104';
      fullResponseText = `The **Fee & Finance Agent** confirms:\n\n* **Semester 5 Dues:** **₹0.00** outstanding (Full Clearance).\n* **Latest Verified Receipt:** \`#RCP-2026-9041\` for ₹1,25,000 paid via Net Banking on Aug 15, 2026.\n* **Next Institutional Invoice:** Semester 6 Tuition & Registration will open on **January 15, 2027**.`;
      widgetData = {
        type: 'fee',
        data: {
          totalFee: 125000,
          paidAmount: 125000,
          currentDue: 0,
          receiptNumber: 'RCP-2026-9041',
          status: 'Cleared',
          dueDate: 'Jan 15, 2027',
          breakdown: [
            { category: 'Semester 5 Tuition', amount: 85000, status: 'Paid' },
            { category: 'Computer Lab & Cloud Credits', amount: 20000, status: 'Paid' },
            { category: 'Library & Digital Journals', amount: 10000, status: 'Paid' },
            { category: 'Examination & Campus Amenities', amount: 10000, status: 'Paid' },
          ],
        },
      };
    } else if (q.includes('schedule') || q.includes('timetable') || q.includes('room') || q.includes('lecture')) {
      primaryAgent = 'timetable';
      targetAction = 'Retrieved Section CS-A daily lecture agenda';
      fullResponseText = `Here is your verified schedule for today from the **Timetable Agent**:\n\n1. **10:00 AM – 11:30 AM:** CS301 Distributed Systems (Lecture Hall 302, Prof. R. Sharma)\n2. **01:30 PM – 03:30 PM:** CS304 Database Internals Lab (Software Lab 2, Dr. A. Verma)\n3. **03:30 PM – 04:30 PM:** CS308 Software Architecture (Seminar Hall B, Prof. K. Iyer)`;
      widgetData = {
        type: 'schedule',
        data: {
          date: '2026-11-14',
          day: 'Saturday (Today)',
          items: [
            {
              time: '10:00 AM – 11:30 AM',
              courseCode: 'CS301',
              courseName: 'Distributed Systems & Microservices',
              room: 'Lecture Hall 302',
              instructor: 'Prof. R. Sharma',
              isLive: true,
            },
            {
              time: '01:30 PM – 03:30 PM',
              courseCode: 'CS304',
              courseName: 'Database Internals & Optimization Lab',
              room: 'Software Lab 2',
              instructor: 'Dr. A. Verma',
              isLive: false,
            },
            {
              time: '03:30 PM – 04:30 PM',
              courseCode: 'CS308',
              courseName: 'Software Architecture Patterns',
              room: 'Seminar Hall B',
              instructor: 'Prof. K. Iyer',
              isLive: false,
            },
          ],
        },
      };
    } else if (q.includes('assignment') || q.includes('lab') || q.includes('due') || q.includes('submit')) {
      primaryAgent = 'assignment';
      targetAction = 'Inspected coursework repository and deadline registry';
      fullResponseText = `The **Assignment Agent** reports **1 urgent task**:\n\n* **Title:** \`Lab 4: Raft Consensus Engine Implementation\`\n* **Course:** CS301 Distributed Systems\n* **Deadline:** **Friday, Nov 20, 2026 at 11:59 PM**\n* **Weightage:** 15% of your final semester grade.\n* **Status:** Ready for upload. You can turn it in directly using the card below or the dashboard tracker.`;
      widgetData = {
        type: 'assignment',
        data: {
          title: 'Lab 4: Raft Consensus Engine Implementation',
          courseCode: 'CS301',
          courseName: 'Distributed Systems & Microservices',
          dueDate: 'Friday, Nov 20, 2026',
          daysRemaining: 6,
          weightage: '15% Final Grade',
          status: 'pending',
        },
      };
    } else if (q.includes('exam') || q.includes('gpa') || q.includes('hall ticket') || q.includes('midterm')) {
      primaryAgent = 'exam';
      targetAction = 'Accessed examination controller portal';
      fullResponseText = `The **Examination Agent** reports:\n\n* **Midterm Dates:** December 02 – December 09, 2026.\n* **First Paper:** CS301 Distributed Systems on **Dec 02 at 10:00 AM** in Exam Hall Central A (Seat #A-42).\n* **Cumulative GPA:** Your verified academic standing is **3.84 / 4.0** (Top 8% of Section CS-A).`;
      widgetData = {
        type: 'exam',
        data: {
          semester: 'Semester 5 End-Term Examination',
          gpa: 3.84,
          exams: [
            {
              courseCode: 'CS301',
              courseName: 'Distributed Systems',
              date: 'Dec 02, 2026',
              time: '10:00 AM – 01:00 PM',
              room: 'Exam Hall Central A',
              seatNumber: 'Seat #A-42',
              daysLeft: 18,
            },
            {
              courseCode: 'CS304',
              courseName: 'Database Internals & Optimization',
              date: 'Dec 05, 2026',
              time: '10:00 AM – 01:00 PM',
              room: 'Exam Hall Central B',
              seatNumber: 'Seat #B-19',
              daysLeft: 21,
            },
            {
              courseCode: 'CS308',
              courseName: 'Software Architecture Patterns',
              date: 'Dec 08, 2026',
              time: '02:00 PM – 05:00 PM',
              room: 'Exam Hall Central A',
              seatNumber: 'Seat #A-42',
              daysLeft: 24,
            },
          ],
        },
      };
    } else {
      primaryAgent = 'support';
      targetAction = 'Consulted campus policy database & student handbook';
      fullResponseText = `The **Campus Support Agent** has analyzed your request regarding "*${userQuery}*":\n\n* The Central Library is open 24/7 during semester weeks with active Wi-Fi.\n* Academic advisor office hours with Dr. Ananya Verma are on Tuesdays & Thursdays from 2:00 PM to 4:00 PM in Faculty Block C.`;
    }

    const agentChain: AgentChainStep[] = [
      {
        agentId: 'coordinator',
        action: `Classified intent: ${primaryAgent.toUpperCase()} domain inquiry`,
        durationMs: 16,
        status: 'success',
      },
      {
        agentId: primaryAgent,
        action: targetAction,
        durationMs: 24,
        status: 'success',
      },
    ];

    // 3. Create Placeholder Bot Message
    const botMsgId = `bot-${Date.now()}`;
    const botMsg: ChatMessage = {
      id: botMsgId,
      sender: 'bot',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'streaming',
      primaryAgentId: primaryAgent,
      agentChain,
      widget: widgetData,
    };
    addMessage(botMsg);

    // 4. Progressive non-blocking character/word token streaming
    const words = fullResponseText.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      if (abortControllerRef.current) break;

      currentText += (i === 0 ? '' : ' ') + words[i];
      updateMessageText(botMsgId, currentText);

      // Random natural human-cadence delay (15ms to 35ms)
      const delay = Math.floor(Math.random() * 20) + 15;
      await new Promise((r) => setTimeout(r, delay));
    }

    setMessageComplete(botMsgId);
  }, [addMessage, updateMessageText, setMessageComplete, setIsStreaming]);

  return {
    messages,
    isStreaming,
    containerRef,
    isAtBottom,
    streamResponse,
    stopStreaming,
    scrollToBottom,
    handleScroll,
  };
}
