export interface SubjectAttendance {
  courseCode: string;
  courseName: string;
  attended: number;
  total: number;
  percentage: number;
  status: 'safe' | 'warning' | 'critical';
  safeMisses: number; // how many more can be missed before falling below 75%
  professor: string;
}

export interface FeeTransaction {
  id: string;
  receiptNumber: string;
  description: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  paymentMode: string;
  downloadUrl: string;
}

export interface LectureSession {
  id: string;
  courseCode: string;
  courseName: string;
  timeSlot: string;
  durationMinutes: number;
  location: string;
  professor: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface AssignmentItem {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  dueDate: string;
  dueTime: string;
  status: 'pending' | 'submitted' | 'graded';
  weightagePercent: number;
  score?: number;
  maxScore?: number;
  submissionLink?: string;
}

export interface ExamScheduleItem {
  id: string;
  courseCode: string;
  courseName: string;
  examType: 'Midterm' | 'Endterm' | 'Practical';
  date: string;
  time: string;
  venue: string;
  seatNumber: string;
}

export const MOCK_STUDENT_DATA = {
  profile: {
    id: 'CS-2024-104',
    name: 'Alex Chen',
    email: 'alex.chen@campus.edu',
    program: 'B.Tech Computer Science & Engineering',
    semester: 5,
    section: 'CS-A',
    cgpa: 3.84,
    advisor: 'Dr. Ananya Verma',
    hostelResident: true,
    libraryCardStatus: 'Active',
  },

  attendance: {
    aggregatePercentage: 84.85,
    minimumRequired: 75.0,
    totalConducted: 165,
    totalAttended: 140,
    totalSafeMissesOverall: 12,
    subjects: [
      {
        courseCode: 'CS301',
        courseName: 'Distributed Systems & Microservices',
        attended: 28,
        total: 33,
        percentage: 84.85,
        status: 'safe',
        safeMisses: 4,
        professor: 'Prof. R. Sharma',
      },
      {
        courseCode: 'CS304',
        courseName: 'Database Internals & Optimization',
        attended: 31,
        total: 35,
        percentage: 88.57,
        status: 'safe',
        safeMisses: 6,
        professor: 'Dr. A. Verma',
      },
      {
        courseCode: 'CS308',
        courseName: 'Software Engineering & Architecture',
        attended: 27,
        total: 30,
        percentage: 90.0,
        status: 'safe',
        safeMisses: 6,
        professor: 'Prof. K. Iyer',
      },
      {
        courseCode: 'CS312',
        courseName: 'Computer Networks & Security',
        attended: 26,
        total: 34,
        percentage: 76.47,
        status: 'warning',
        safeMisses: 0, // Cannot miss any more classes!
        professor: 'Dr. S. Nair',
      },
      {
        courseCode: 'HS301',
        courseName: 'Professional Ethics & Leadership',
        attended: 28,
        total: 33,
        percentage: 84.85,
        status: 'safe',
        safeMisses: 4,
        professor: 'Dr. M. Roy',
      },
    ] as SubjectAttendance[],
  },

  fees: {
    currentDue: 0.0,
    semesterStatus: 'Cleared',
    nextDueNotice: 'Semester 6 Tuition & Registration due Jan 15, 2027',
    transactions: [
      {
        id: 'tx-01',
        receiptNumber: 'RCP-2026-9041',
        description: 'Semester 5 Tuition & Laboratory Fees',
        amount: 125000,
        date: 'Aug 15, 2026',
        status: 'paid',
        paymentMode: 'Net Banking (HDFC Bank)',
        downloadUrl: '#receipt-9041',
      },
      {
        id: 'tx-02',
        receiptNumber: 'RCP-2026-4102',
        description: 'Hostel & Mess Advance Deposit',
        amount: 45000,
        date: 'Aug 10, 2026',
        status: 'paid',
        paymentMode: 'UPI / Razorpay',
        downloadUrl: '#receipt-4102',
      },
      {
        id: 'tx-03',
        receiptNumber: 'RCP-2026-1082',
        description: 'Semester 4 Tuition & Lab Fees',
        amount: 125000,
        date: 'Jan 10, 2026',
        status: 'paid',
        paymentMode: 'Net Banking (HDFC Bank)',
        downloadUrl: '#receipt-1082',
      },
    ] as FeeTransaction[],
  },

  timetable: [
    {
      id: 'tt-01',
      courseCode: 'CS301',
      courseName: 'Distributed Systems & Microservices',
      timeSlot: '10:00 AM – 11:30 AM',
      durationMinutes: 90,
      location: 'Lecture Hall 302',
      professor: 'Prof. R. Sharma',
      dayOfWeek: 'Wednesday',
      status: 'upcoming',
    },
    {
      id: 'tt-02',
      courseCode: 'CS304',
      courseName: 'Database Internals & Optimization',
      timeSlot: '01:30 PM – 03:30 PM',
      durationMinutes: 120,
      location: 'Software Engineering Lab 2',
      professor: 'Dr. A. Verma',
      dayOfWeek: 'Wednesday',
      status: 'upcoming',
    },
    {
      id: 'tt-03',
      courseCode: 'CS308',
      courseName: 'Software Engineering & Architecture',
      timeSlot: '03:30 PM – 04:30 PM',
      durationMinutes: 60,
      location: 'Seminar Hall B',
      professor: 'Prof. K. Iyer',
      dayOfWeek: 'Wednesday',
      status: 'upcoming',
    },
  ] as LectureSession[],

  assignments: [
    {
      id: 'asg-01',
      courseCode: 'CS301',
      courseName: 'Distributed Systems',
      title: 'Lab 4: Raft Consensus Engine Implementation in Go/Rust',
      dueDate: 'Friday, Nov 13, 2026',
      dueTime: '11:59 PM',
      status: 'pending',
      weightagePercent: 15,
      submissionLink: '#submit-asg-01',
    },
    {
      id: 'asg-02',
      courseCode: 'CS304',
      courseName: 'Database Internals',
      title: 'Assignment 2: B+ Tree Range Query Optimizer',
      dueDate: 'Nov 02, 2026',
      dueTime: '05:00 PM',
      status: 'graded',
      weightagePercent: 10,
      score: 94,
      maxScore: 100,
    },
    {
      id: 'asg-03',
      courseCode: 'CS308',
      courseName: 'Software Engineering',
      title: 'Case Study: CI/CD Pipeline & Microservice Migration Plan',
      dueDate: 'Nov 20, 2026',
      dueTime: '11:59 PM',
      status: 'pending',
      weightagePercent: 20,
    },
  ] as AssignmentItem[],

  exams: [
    {
      id: 'ex-01',
      courseCode: 'CS301',
      courseName: 'Distributed Systems',
      examType: 'Midterm',
      date: 'Dec 02, 2026',
      time: '10:00 AM – 12:00 PM',
      venue: 'Exam Hall Central A',
      seatNumber: 'A-42',
    },
    {
      id: 'ex-02',
      courseCode: 'CS304',
      courseName: 'Database Internals',
      examType: 'Midterm',
      date: 'Dec 04, 2026',
      time: '02:00 PM – 04:00 PM',
      venue: 'Exam Hall Central B',
      seatNumber: 'B-18',
    },
  ] as ExamScheduleItem[],

  gpaHistory: [
    { semester: 'Semester 1', gpa: 3.72 },
    { semester: 'Semester 2', gpa: 3.80 },
    { semester: 'Semester 3', gpa: 3.85 },
    { semester: 'Semester 4', gpa: 3.91 },
    { semester: 'Semester 5 (Current)', gpa: 3.84 },
  ],
};

export const MOCK_ADMIN_METRICS = {
  totalStudents: 4280,
  totalFaculty: 215,
  totalAgentQueriesToday: 1842,
  agentQueryDistribution: [
    { name: 'Attendance Agent', queries: 742, percentage: 40.3 },
    { name: 'Timetable Agent', queries: 418, percentage: 22.7 },
    { name: 'Fee Agent', queries: 285, percentage: 15.5 },
    { name: 'Assignment Agent', queries: 198, percentage: 10.7 },
    { name: 'Exam Agent', queries: 124, percentage: 6.7 },
    { name: 'Support Agent', queries: 75, percentage: 4.1 },
  ],
  systemHealth: {
    status: 'Optimal',
    uptime: '99.98%',
    averageResponseLatencyMs: 24,
    activeCoordinatorNodes: 4,
  },
};

export const MOCK_FACULTY_DATA = {
  profile: {
    id: 'FAC-CS-042',
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor & Academic Head',
    email: 'rajesh.kumar@campus.edu',
    office: 'Faculty Block C, Room 308',
  },
  metrics: {
    activeCourses: 3,
    totalEnrolledStudents: 184,
    averageAttendanceAcrossCourses: 88.2,
    pendingSubmissionsToGrade: 18,
  },
  courses: [
    {
      code: 'CS301',
      name: 'Distributed Systems & Microservices',
      section: 'Section CS-A',
      enrolled: 64,
      avgAttendance: 84.85,
      syllabusProgress: 72,
      nextSession: 'Today, 10:00 AM – 11:30 AM',
      room: 'Lecture Hall 302',
      deficiencyCount: 3,
      pendingAssignments: 8,
    },
    {
      code: 'CS304',
      name: 'Database Internals & Optimization',
      section: 'Section CS-B',
      enrolled: 62,
      avgAttendance: 88.57,
      syllabusProgress: 65,
      nextSession: 'Monday, 01:30 PM – 03:30 PM',
      room: 'Software Lab 2',
      deficiencyCount: 2,
      pendingAssignments: 6,
    },
    {
      code: 'CS308',
      name: 'Software Architecture & Cloud Patterns',
      section: 'Section CS-A',
      enrolled: 58,
      avgAttendance: 91.20,
      syllabusProgress: 80,
      nextSession: 'Tuesday, 03:30 PM – 04:30 PM',
      room: 'Seminar Hall B',
      deficiencyCount: 1,
      pendingAssignments: 4,
    },
  ],
  studentRoster: [
    { rollNo: 'CS-101', name: 'Aarav Sharma', attendancePct: 88.5, status: 'P', previousStatus: 'Present' },
    { rollNo: 'CS-102', name: 'Ananya Deshmukh', attendancePct: 94.2, status: 'P', previousStatus: 'Present' },
    { rollNo: 'CS-103', name: 'Aditya Kulkarni', attendancePct: 71.4, status: 'A', previousStatus: 'Absent' },
    { rollNo: 'CS-104', name: 'Alex Chen', attendancePct: 84.85, status: 'P', previousStatus: 'Present' },
    { rollNo: 'CS-105', name: 'Bhavna Patel', attendancePct: 68.2, status: 'A', previousStatus: 'Absent' },
    { rollNo: 'CS-106', name: 'Devendra Joshi', attendancePct: 92.0, status: 'P', previousStatus: 'Present' },
    { rollNo: 'CS-107', name: 'Ishita Reddy', attendancePct: 81.3, status: 'P', previousStatus: 'Late' },
    { rollNo: 'CS-108', name: 'Kunal Mehra', attendancePct: 62.5, status: 'A', previousStatus: 'Absent' },
    { rollNo: 'CS-109', name: 'Pooja Iyer', attendancePct: 96.0, status: 'P', previousStatus: 'Present' },
    { rollNo: 'CS-110', name: 'Rohan Verma', attendancePct: 79.5, status: 'P', previousStatus: 'Present' },
  ],
  pendingSubmissions: [
    {
      id: 'sub-01',
      studentRoll: 'CS-104',
      studentName: 'Alex Chen',
      courseCode: 'CS301',
      assignmentTitle: 'Lab 4: Raft Consensus Engine Implementation in Go',
      submittedAt: 'Nov 12, 2026 at 10:45 PM',
      repoUrl: 'github.com/alexchen/raft-consensus-go',
      commitHash: '7f9a2b1',
      files: ['raft.go', 'election.go', 'log_replication_test.go', 'benchmarks.txt'],
      aiAnalysis: 'High code cohesion. Leader election handles network partitions gracefully. Passes all 12 concurrency test vectors.',
      suggestedScores: { correctness: 38, architecture: 28, documentation: 27 },
    },
    {
      id: 'sub-02',
      studentRoll: 'CS-101',
      studentName: 'Aarav Sharma',
      courseCode: 'CS301',
      assignmentTitle: 'Lab 4: Raft Consensus Engine Implementation in Go',
      submittedAt: 'Nov 12, 2026 at 09:12 PM',
      repoUrl: 'github.com/aaravs/distributed-raft',
      commitHash: '3c8e4d2',
      files: ['server.go', 'state_machine.go', 'raft_test.go'],
      aiAnalysis: 'Clean implementation of RPC heartbeat mechanisms. Minor edge-case race condition during split-brain state machine commit.',
      suggestedScores: { correctness: 34, architecture: 26, documentation: 25 },
    },
    {
      id: 'sub-03',
      studentRoll: 'CS-102',
      studentName: 'Ananya Deshmukh',
      courseCode: 'CS301',
      assignmentTitle: 'Lab 4: Raft Consensus Engine Implementation in Go',
      submittedAt: 'Nov 13, 2026 at 08:30 AM',
      repoUrl: 'github.com/ananya-d/raft-consensus',
      commitHash: '9d1f8a4',
      files: ['consensus.go', 'rpc.go', 'cluster_sim.go', 'README.md'],
      aiAnalysis: 'Outstanding documentation and benchmark graphs included. Zero race conditions detected via -race flag.',
      suggestedScores: { correctness: 40, architecture: 30, documentation: 29 },
    },
  ],
  deficientStudents: [
    {
      rollNo: 'CS-108',
      name: 'Kunal Mehra',
      courseCode: 'CS301',
      attended: 20,
      total: 32,
      percentage: 62.5,
      riskLevel: 'Critical',
      classesToRecover: 6,
      parentContact: '+91 98201 44211',
      lastNoticeDispatched: 'Nov 08, 2026',
    },
    {
      rollNo: 'CS-105',
      name: 'Bhavna Patel',
      courseCode: 'CS301',
      attended: 22,
      total: 32,
      percentage: 68.75,
      riskLevel: 'Critical',
      classesToRecover: 4,
      parentContact: '+91 98450 33819',
      lastNoticeDispatched: 'Nov 10, 2026',
    },
    {
      rollNo: 'CS-103',
      name: 'Aditya Kulkarni',
      courseCode: 'CS301',
      attended: 23,
      total: 32,
      percentage: 71.87,
      riskLevel: 'Warning',
      classesToRecover: 2,
      parentContact: '+91 97632 99401',
      lastNoticeDispatched: 'Nov 11, 2026',
    },
  ],
};
