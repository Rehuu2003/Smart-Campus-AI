/**
 * Smart Campus AI - Swappable API Client Adapter
 * Supports seamless switching between the autonomous Mock Data Engine
 * and Live Backend Server-Sent Events (SSE) streaming API.
 */

import { AgentId } from '@/types/agent';
import { AgentChainStep, ChatWidget } from '@/types/chat';
import { toast } from 'sonner';

export type BackendMode = 'mock' | 'live';

const STORAGE_KEY = 'smart_campus_backend_mode';
const DEFAULT_LIVE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiClient {
  private mode: BackendMode = 'mock';
  private liveApiUrl: string = DEFAULT_LIVE_API_URL;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem(STORAGE_KEY) as BackendMode;
      if (savedMode === 'mock' || savedMode === 'live') {
        this.mode = savedMode;
      }
    }
  }

  public getMode(): BackendMode {
    return this.mode;
  }

  public setMode(newMode: BackendMode): void {
    this.mode = newMode;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newMode);
    }
    toast.info(`API Client Mode Switched: ${newMode === 'live' ? 'Live SSE Backend' : 'Autonomous Mock Engine'}`);
  }

  public getLiveApiUrl(): string {
    return this.liveApiUrl;
  }

  public setLiveApiUrl(url: string): void {
    this.liveApiUrl = url;
  }

  /**
   * Health check for live backend endpoint
   */
  public async checkBackendHealth(): Promise<{ online: boolean; latencyMs: number }> {
    const startTime = performance.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`${this.liveApiUrl}/api/health`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const latencyMs = Math.round(performance.now() - startTime);

      return { online: res.ok, latencyMs };
    } catch {
      return { online: false, latencyMs: 0 };
    }
  }

  /**
   * Streaming agent chat consumer
   * Streams tokens, chain steps, and generative UI widget metadata.
   */
  public async streamAgentChat(
    query: string,
    callbacks: {
      onToken: (accumulatedText: string) => void;
      onAgentChain?: (chain: AgentChainStep[]) => void;
      onPrimaryAgent?: (agentId: AgentId) => void;
      onWidget?: (widget: ChatWidget) => void;
      onComplete?: () => void;
      onError?: (error: Error) => void;
    },
    abortSignal?: { aborted: boolean }
  ): Promise<void> {
    // If live mode is selected, attempt live SSE streaming
    if (this.mode === 'live') {
      try {
        const response = await fetch(`${this.liveApiUrl}/api/chat/stream`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });

        if (!response.ok || !response.body) {
          throw new Error(`Live server returned status ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedText = '';

        while (true) {
          if (abortSignal?.aborted) {
            reader.cancel();
            break;
          }

          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') break;

              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.token) {
                  accumulatedText += parsed.token;
                  callbacks.onToken(accumulatedText);
                }
                if (parsed.agentChain && callbacks.onAgentChain) {
                  callbacks.onAgentChain(parsed.agentChain);
                }
                if (parsed.primaryAgentId && callbacks.onPrimaryAgent) {
                  callbacks.onPrimaryAgent(parsed.primaryAgentId);
                }
                if (parsed.widget && callbacks.onWidget) {
                  callbacks.onWidget(parsed.widget);
                }
              } catch {
                // Ignore SSE heartbeat or non-json chunks
              }
            }
          }
        }

        callbacks.onComplete?.();
        return;
      } catch (err: any) {
        toast.warning(
          `Live backend unavailable (${err.message}). Switched to Autonomous Offline Engine seamlessly.`
        );
        // Graceful automatic fallback to mock simulation
      }
    }

    // Default: Mock Multi-Agent Autonomous Simulation
    await this.simulateMockStream(query, callbacks, abortSignal);
  }

  private async simulateMockStream(
    query: string,
    callbacks: {
      onToken: (accumulatedText: string) => void;
      onAgentChain?: (chain: AgentChainStep[]) => void;
      onPrimaryAgent?: (agentId: AgentId) => void;
      onWidget?: (widget: ChatWidget) => void;
      onComplete?: () => void;
      onError?: (error: Error) => void;
    },
    abortSignal?: { aborted: boolean }
  ): Promise<void> {
    const q = query.toLowerCase();
    let primaryAgent: AgentId = 'coordinator';
    let targetAction = 'Processed general university inquiry';
    let fullResponseText = '';
    let widgetData: ChatWidget | undefined = undefined;

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
          date: '2026-11-17',
          day: 'Tuesday (Today)',
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
          daysRemaining: 3,
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
              daysLeft: 15,
            },
            {
              courseCode: 'CS304',
              courseName: 'Database Internals & Optimization',
              date: 'Dec 05, 2026',
              time: '10:00 AM – 01:00 PM',
              room: 'Exam Hall Central B',
              seatNumber: 'Seat #B-19',
              daysLeft: 18,
            },
            {
              courseCode: 'CS308',
              courseName: 'Software Architecture Patterns',
              date: 'Dec 08, 2026',
              time: '02:00 PM – 05:00 PM',
              room: 'Exam Hall Central A',
              seatNumber: 'Seat #A-42',
              daysLeft: 21,
            },
          ],
        },
      };
    } else {
      primaryAgent = 'support';
      targetAction = 'Consulted campus policy database & student handbook';
      fullResponseText = `The **Campus Support Agent** has analyzed your request regarding "*${query}*":\n\n* The Central Library is open 24/7 during semester weeks with active Wi-Fi.\n* Academic advisor office hours with Dr. Ananya Verma are on Tuesdays & Thursdays from 2:00 PM to 4:00 PM in Faculty Block C.`;
    }

    const agentChain: AgentChainStep[] = [
      {
        agentId: 'coordinator',
        action: `Classified intent: ${primaryAgent.toUpperCase()} domain inquiry`,
        durationMs: 14,
        status: 'success',
      },
      {
        agentId: primaryAgent,
        action: targetAction,
        durationMs: 22,
        status: 'success',
      },
    ];

    callbacks.onPrimaryAgent?.(primaryAgent);
    callbacks.onAgentChain?.(agentChain);
    if (widgetData) callbacks.onWidget?.(widgetData);

    // Stream characters/words
    const words = fullResponseText.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      if (abortSignal?.aborted) break;

      currentText += (i === 0 ? '' : ' ') + words[i];
      callbacks.onToken(currentText);

      const delay = Math.floor(Math.random() * 18) + 12;
      await new Promise((r) => setTimeout(r, delay));
    }

    callbacks.onComplete?.();
  }
}

export const apiClient = new ApiClient();
