export type AgentId = 
  | 'coordinator' 
  | 'attendance' 
  | 'fee' 
  | 'exam' 
  | 'timetable' 
  | 'assignment' 
  | 'support';

export interface AgentMeta {
  id: AgentId;
  name: string;
  shortName: string;
  role: string;
  description: string;
  color: string;           // Primary hex
  bgLight: string;         // Tailwind class for light tinted background
  borderLight: string;     // Tailwind class for light tinted border
  textLight: string;       // Tailwind class for text color
  iconName: string;
}

export const AGENT_REGISTRY: Record<AgentId, AgentMeta> = {
  coordinator: {
    id: 'coordinator',
    name: 'Central AI Coordinator',
    shortName: 'Coordinator',
    role: 'Central Intent Orchestrator',
    description: 'Understands query intent, enforces security permissions, routes to domain agents, and unifies responses.',
    color: '#8B5CF6',
    bgLight: 'bg-violet-50',
    borderLight: 'border-violet-200',
    textLight: 'text-violet-700',
    iconName: 'Bot',
  },
  attendance: {
    id: 'attendance',
    name: 'Attendance Agent',
    shortName: 'Attendance',
    role: 'Roll & Criteria Monitor',
    description: 'Tracks lecture attendance records, verifies 75% cutoff compliance, and calculates safe miss thresholds.',
    color: '#10B981',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200',
    textLight: 'text-emerald-700',
    iconName: 'CheckCircle2',
  },
  fee: {
    id: 'fee',
    name: 'Fee & Finance Agent',
    shortName: 'Fee Agent',
    role: 'Dues & Payment Verifier',
    description: 'Checks pending tuition dues, displays installment breakdowns, and provides payment receipts.',
    color: '#F59E0B',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-200',
    textLight: 'text-amber-700',
    iconName: 'CreditCard',
  },
  exam: {
    id: 'exam',
    name: 'Examination Agent',
    shortName: 'Exam Agent',
    role: 'Schedules & GPA Records',
    description: 'Retrieves exam timetables, seat allocations, hall tickets, and published GPA results.',
    color: '#06B6D4',
    bgLight: 'bg-cyan-50',
    borderLight: 'border-cyan-200',
    textLight: 'text-cyan-700',
    iconName: 'GraduationCap',
  },
  timetable: {
    id: 'timetable',
    name: 'Timetable Agent',
    shortName: 'Timetable',
    role: 'Lecture & Room Schedules',
    description: 'Provides daily class schedules, lecture room allocations, and faculty substitute notifications.',
    color: '#A855F7',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200',
    textLight: 'text-purple-700',
    iconName: 'Calendar',
  },
  assignment: {
    id: 'assignment',
    name: 'Assignment Agent',
    shortName: 'Assignments',
    role: 'Submission & Deadlines',
    description: 'Monitors coursework deadlines, verified rubrics, submission portals, and grading statuses.',
    color: '#F43F5E',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-200',
    textLight: 'text-rose-700',
    iconName: 'FileText',
  },
  support: {
    id: 'support',
    name: 'Campus Support Agent',
    shortName: 'Support',
    role: 'Institutional FAQ & Helpdesk',
    description: 'Answers questions regarding hostel regulations, library hours, department contacts, and campus policies.',
    color: '#38BDF8',
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-200',
    textLight: 'text-sky-700',
    iconName: 'HelpCircle',
  },
};
