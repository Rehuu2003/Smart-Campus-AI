import { AgentId } from './agent';

export interface AgentChainStep {
  agentId: AgentId;
  action: string;
  durationMs: number;
  status: 'pending' | 'success' | 'error';
}

export type WidgetType = 'attendance' | 'fee' | 'schedule' | 'exam' | 'assignment';

export interface AttendanceWidgetData {
  courseCode?: string;
  courseName?: string;
  percentage: number;
  attended: number;
  total: number;
  safeMisses: number;
  subjectBreakdown?: {
    code: string;
    name: string;
    attended: number;
    conducted: number;
    percentage: number;
    status: 'safe' | 'warning' | 'danger';
  }[];
}

export interface FeeWidgetData {
  totalFee: number;
  paidAmount: number;
  currentDue: number;
  dueDate: string;
  receiptNumber: string;
  status: 'Cleared' | 'Pending' | 'Overdue';
  breakdown: {
    category: string;
    amount: number;
    status: 'Paid' | 'Due';
  }[];
}

export interface ScheduleWidgetData {
  date: string;
  day: string;
  items: {
    time: string;
    courseCode: string;
    courseName: string;
    room: string;
    instructor: string;
    isLive?: boolean;
  }[];
}

export interface ExamWidgetData {
  semester: string;
  gpa: number;
  exams: {
    courseCode: string;
    courseName: string;
    date: string;
    time: string;
    room: string;
    seatNumber: string;
    daysLeft: number;
  }[];
}

export interface AssignmentWidgetData {
  title: string;
  courseCode: string;
  courseName: string;
  dueDate: string;
  daysRemaining: number;
  weightage: string;
  status: 'pending' | 'submitted' | 'graded';
}

export interface ChatWidget {
  type: WidgetType;
  data: AttendanceWidgetData | FeeWidgetData | ScheduleWidgetData | ExamWidgetData | AssignmentWidgetData | any;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  status?: 'streaming' | 'complete' | 'error';
  primaryAgentId?: AgentId;
  agentChain?: AgentChainStep[];
  reaction?: 'up' | 'down';
  widget?: ChatWidget;
}

export type ChatMode = 'drawer' | 'fullscreen';
