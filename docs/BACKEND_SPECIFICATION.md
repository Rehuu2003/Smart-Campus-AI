# Smart Campus AI — Backend Architecture & Engineering Specification

> **Target Audience:** Backend Engineer / AI Engineer  
> **Project Repository:** [Smart Campus AI](https://github.com/Rehuu2003/Smart-Campus-AI)  
> **Status of Frontend:** 100% Complete (React 18 + TypeScript + Vite + Tailwind CSS + Swappable API Client Adapter)  
> **Backend Base URL:** `http://localhost:8000` (Configurable via `VITE_API_URL`)

---

## 1. Executive Summary & Objective

The frontend application for **Smart Campus AI** is an enterprise-grade multi-agent university management portal. It features a **Slide-over AI Copilot Drawer**, a **Full-Screen Assistant View**, **Generative UI Widgets** (interactive attendance meters, timetable pickers, Razorpay checkout modals, exam hall tickets, etc.), and **Role-Based Portals** for **Students**, **Faculty**, and **Administrators**.

Your objective as the backend engineer is to build the backend server and AI agent service that powers this system:
1. **REST API Layer:** Authentication, Role-Based Access Control (RBAC), and CRUD endpoints for university operations.
2. **Database Layer:** Schemas and persistence for Students, Faculty, Courses, Attendance, Fees, Schedules, Assignments, and Exams.
3. **Multi-Agent Orchestration Engine:** A **Central AI Coordinator** with **6 Domain Agents** (built with **LangGraph / Python** or **FastAPI + Google Gemini API**) that executes database tools and streams responses via **Server-Sent Events (SSE)**.

---

## 2. Recommended Tech Stack

| Layer | Recommended Technology | Why |
| :--- | :--- | :--- |
| **API Framework** | **FastAPI (Python 3.10+)** | Native async support, high concurrency for SSE streaming, seamless integration with LangGraph & Gemini SDK. *(Alternative: Express.js / NestJS if Node.js is preferred)* |
| **Agent Orchestration** | **LangGraph + LangChain** | Stateful multi-agent graph traversal, conditional branching, tool-calling loops. |
| **LLM Model** | **Google Gemini 1.5 Pro / Flash** | Low latency, 1M+ context window, reliable JSON function calling. |
| **Database** | **PostgreSQL** or **MongoDB** | PostgreSQL (relational structure for ERP) or MongoDB (flexible document schemas for agent telemetry & generative widgets). |
| **Authentication** | **JWT (JSON Web Tokens)** + **Bcrypt** | Role-based claims (`role: 'student' \| 'faculty' \| 'admin'`). |
| **Payments** | **Razorpay SDK** | Test-mode order creation and payment signature verification. |

---

## 3. System Architecture & Multi-Agent Flow

```
                                 ┌────────────────────────┐
                                 │ React Frontend Client  │
                                 │ (http://localhost:5173)│
                                 └───────────┬────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       │ REST Requests                             │ SSE Streaming
                       │ (Auth, CRUD, Razorpay)                    │ (/api/chat/stream)
                       ▼                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                FastAPI Backend Service                                 │
│  • CORS Middleware (allow localhost:5173)                                              │
│  • JWT Auth & Role Guard Middleware (Student / Faculty / Admin)                        │
│  • Health Check: GET /api/health                                                       │
└────────────────────────────────────────────┬───────────────────────────────────────────┘
                                             │
                                             ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        LangGraph Multi-Agent Orchestrator                              │
│                                                                                        │
│                               ┌─────────────────────────┐                              │
│                               │  Central AI Coordinator │                              │
│                               │  • Intent Routing       │                              │
│                               │  • Policy & Permissions │                              │
│                               └────────────┬────────────┘                              │
│                                            │                                           │
│         ┌───────────────┬──────────────────┼─────────────────┬───────────────┐         │
│         ▼               ▼                  ▼                 ▼               ▼         │
│  ┌──────────────┐┌──────────────┐   ┌──────────────┐  ┌──────────────┐┌──────────────┐ │
│  │  Attendance  ││  Fee Agent   │   │  Timetable   │  │  Assignment  ││  Exam Agent  │ │
│  │    Agent     ││  • Ledger    │   │    Agent     │  │    Agent     ││  • Schedules │ │
│  │  • Cutoffs   ││  • Invoices  │   │  • Rooms     │  │  • Rubrics   ││  • Hall Pass │ │
│  │  • Simulator ││  • Razorpay  │   │  • Clashes   │  │  • Submits   ││  • GPA Hist  │ │
│  └──────┬───────┘└──────┬───────┘   └──────┬───────┘  └──────┬───────┘└──────┬───────┘ │
│         │               │                  │                 │               │         │
└─────────┼───────────────┼──────────────────┼─────────────────┼───────────────┼─────────┘
          │               │                  │                 │               │
          ▼               ▼                  ▼                 ▼               ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                     Database Layer                                     │
│  (Users, AttendanceLedger, FeeTransactions, CourseSchedule, Assignments, Exams)        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Multi-Agent Ecosystem Specifications

The AI system consists of **7 distinct agents** that the Central Coordinator can route queries to:

| Agent ID | Display Name | Domain Responsibility | Bound Database Tools / Functions |
| :--- | :--- | :--- | :--- |
| `coordinator` | **Central AI Coordinator** | Analyzes natural language intent, determines required domain agents, enforces security boundaries, unifies multi-step responses. | `route_intent()`, `synthesize_response()` |
| `attendance` | **Attendance Agent** | Queries attendance %, calculates minimum 75% cutoff compliance, safe miss buffer, and absence projections. | `get_student_attendance(student_id)`, `simulate_absence(student_id, course_code, count)` |
| `fee` | **Fee & Finance Agent** | Audits semester tuition/hostel dues, queries invoice breakdowns, fetches payment receipts, initiates checkout orders. | `get_fee_status(student_id)`, `get_receipt(receipt_no)`, `create_payment_order(amount)` |
| `timetable` | **Timetable Agent** | Retrieves daily lecture schedules, room allocations, instructor info, clash detection, calendar exports. | `get_today_schedule(student_id, day)`, `get_weekly_schedule(section)` |
| `assignment` | **Assignment Agent** | Tracks upcoming coursework deadlines, submission portals, automated AI rubric evaluation and anti-plagiarism checks. | `get_pending_assignments(student_id)`, `submit_assignment(task_id, file_url)`, `ai_evaluate_code(code_repo)` |
| `exam` | **Examination Agent** | Retrieves midterm/end-term dates, venue room coordinates, seat numbers (`Seat #A-42`), hall ticket verification slips, GPA trajectory. | `get_exam_schedule(student_id)`, `generate_hall_ticket(student_id, exam_id)`, `get_gpa_history(student_id)` |
| `support` | **Campus Support Agent** | General campus queries, hostel curfews, library hours, emergency contacts, academic advisor details. | `query_knowledge_base(query)` |

---

## 5. Server-Sent Events (SSE) Protocol: `POST /api/chat/stream`

This is the primary endpoint consumed by the frontend chat copilot (`frontend/src/lib/apiClient.ts`).

### Request
```http
POST /api/chat/stream
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

{
  "query": "Can I safely miss tomorrow's Distributed Systems class?"
}
```

### Response Format
- **Headers:**
  ```http
  HTTP/1.1 200 OK
  Content-Type: text/event-stream
  Cache-Control: no-cache
  Connection: keep-alive
  ```

- **SSE Stream Data Packets (JSON strings prefixed with `data: `):**

1. **Agent Chain Event (Telemetry Trace):**
   ```json
   data: {"primaryAgentId": "attendance", "agentChain": [{"agentId": "coordinator", "action": "Classified intent: ATTENDANCE domain inquiry", "durationMs": 14, "status": "success"}, {"agentId": "attendance", "action": "Queried live attendance ledger: Roll #104", "durationMs": 22, "status": "success"}]}
   ```

2. **Generative UI Widget Event (Optional metadata for rich React rendering):**
   ```json
   data: {"widget": {"type": "attendance", "data": {"percentage": 84.85, "attended": 140, "total": 165, "safeMisses": 12}}}
   ```

3. **Incremental Text Token Chunks:**
   ```json
   data: {"token": "I "}
   data: {"token": "have "}
   data: {"token": "checked "}
   data: {"token": "your "}
   data: {"token": "attendance "}
   data: {"token": "records..."}
   ```

4. **Stream Termination Signal:**
   ```
   data: [DONE]
   ```

---

## 6. Generative UI Widget JSON Schemas

When an agent resolves an inquiry, it can emit a `widget` object in the stream. The frontend dynamically transforms this JSON into interactive React components:

### 1. Attendance Widget (`widget.type = 'attendance'`)
```json
{
  "type": "attendance",
  "data": {
    "courseCode": "CS301",
    "courseName": "Distributed Systems",
    "percentage": 84.85,
    "attended": 140,
    "total": 165,
    "safeMisses": 12,
    "subjectBreakdown": [
      {
        "code": "CS301",
        "name": "Distributed Systems & Microservices",
        "attended": 28,
        "conducted": 33,
        "percentage": 84.85,
        "status": "safe"
      }
    ]
  }
}
```

### 2. Fee Ledger Widget (`widget.type = 'fee'`)
```json
{
  "type": "fee",
  "data": {
    "totalFee": 125000,
    "paidAmount": 125000,
    "currentDue": 0,
    "dueDate": "Jan 15, 2027",
    "receiptNumber": "RCP-2026-9041",
    "status": "Cleared",
    "breakdown": [
      { "category": "Semester 5 Tuition", "amount": 85000, "status": "Paid" },
      { "category": "Computer Lab & Cloud Credits", "amount": 20000, "status": "Paid" }
    ]
  }
}
```

### 3. Timetable Widget (`widget.type = 'schedule'`)
```json
{
  "type": "schedule",
  "data": {
    "date": "2026-11-17",
    "day": "Wednesday",
    "items": [
      {
        "time": "10:00 AM – 11:30 AM",
        "courseCode": "CS301",
        "courseName": "Distributed Systems & Microservices",
        "room": "Lecture Hall 302",
        "instructor": "Prof. R. Sharma",
        "isLive": true
      }
    ]
  }
}
```

### 4. Examination Widget (`widget.type = 'exam'`)
```json
{
  "type": "exam",
  "data": {
    "semester": "Semester 5 End-Term",
    "gpa": 3.84,
    "exams": [
      {
        "courseCode": "CS301",
        "courseName": "Distributed Systems",
        "date": "Dec 02, 2026",
        "time": "10:00 AM – 01:00 PM",
        "room": "Exam Hall Central A",
        "seatNumber": "Seat #A-42",
        "daysLeft": 15
      }
    ]
  }
}
```

### 5. Assignment Widget (`widget.type = 'assignment'`)
```json
{
  "type": "assignment",
  "data": {
    "title": "Lab 4: Raft Consensus Engine Implementation in Go/Rust",
    "courseCode": "CS301",
    "courseName": "Distributed Systems",
    "dueDate": "Friday, Nov 20, 2026",
    "daysRemaining": 3,
    "weightage": "15% Final Grade",
    "status": "pending"
  }
}
```

---

## 7. Database Entity Schemas

### 1. `users`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String / UUID | Primary Key |
| `name` | String | Full name (e.g., `"Alex Chen"`) |
| `email` | String | Unique email (e.g., `"alex.chen@campus.edu"`) |
| `passwordHash` | String | Bcrypt hash |
| `role` | Enum | `'student' \| 'faculty' \| 'admin'` |
| `identifier` | String | Roll number (`CS-2024-104`), Faculty ID (`FAC-CS-042`), or Admin ID |
| `department` | String | Department (e.g., `"Computer Science & Engineering"`) |
| `semester` | Integer | Active semester (for students) |
| `section` | String | E.g., `"CS-A"` |
| `cgpa` | Float | Cumulative GPA (e.g., `3.84`) |

### 2. `attendance_records`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `studentId` | UUID | Foreign Key $\to$ `users.id` |
| `courseCode` | String | E.g., `"CS301"` |
| `date` | Date | Session Date |
| `status` | Enum | `'present' \| 'absent' \| 'late'` |
| `sessionType` | Enum | `'lecture' \| 'lab'` |
| `recordedBy` | UUID | Foreign Key $\to$ Faculty `users.id` |

### 3. `fee_ledgers` & `transactions`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `studentId` | UUID | Foreign Key $\to$ `users.id` |
| `semester` | Integer | E.g., `5` |
| `totalFee` | Decimal | E.g., `125000.00` |
| `paidAmount` | Decimal | Amount paid so far |
| `currentDue` | Decimal | Remaining due |
| `status` | Enum | `'cleared' \| 'pending' \| 'overdue'` |
| `receiptNumber` | String | E.g., `"RCP-2026-9041"` |
| `razorpayPaymentId` | String | Razorpay Payment verification ID |

### 4. `timetable_sessions`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `section` | String | E.g., `"CS-A"` |
| `dayOfWeek` | Enum | `'Monday' \| 'Tuesday' \| 'Wednesday' \| 'Thursday' \| 'Friday'` |
| `courseCode` | String | E.g., `"CS301"` |
| `courseName` | String | E.g., `"Distributed Systems & Microservices"` |
| `timeSlot` | String | E.g., `"09:00 AM – 10:30 AM"` |
| `durationMinutes`| Integer | E.g., `90` |
| `location` | String | E.g., `"Lecture Hall 302"` |
| `facultyId` | UUID | Foreign Key $\to$ `users.id` |

### 5. `assignments` & `submissions`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `courseCode` | String | E.g., `"CS301"` |
| `title` | String | E.g., `"Lab 4: Raft Consensus Engine"` |
| `dueDate` | Timestamp | Submission deadline |
| `weightagePercent` | Integer | Weightage (e.g., `15`) |
| `submissions` | Array / Table | `{ studentId, repoUrl, fileUrl, submittedAt, score, feedback }` |

### 6. `exams` & `hall_tickets`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `courseCode` | String | E.g., `"CS301"` |
| `examType` | Enum | `'Midterm' \| 'Endterm' \| 'Practical'` |
| `date` | Date | Exam Date |
| `time` | String | E.g., `"10:00 AM – 01:00 PM"` |
| `venue` | String | E.g., `"Exam Hall Central A"` |
| `seatingAllocations` | Array / Table | `{ studentId, seatNumber: 'Seat #A-42', qrCodeHash }` |

### 7. `audit_logs` & `broadcasts`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `timestamp` | Timestamp | Event timestamp |
| `actor` | String | E.g., `"Student CS-104 (Alex Chen)"` |
| `agent` | String | E.g., `"Attendance Agent"` |
| `action` | String | Description of operation |
| `severity` | Enum | `'INFO' \| 'WARN' \| 'CRITICAL'` |
| `executionMs` | Integer | Execution duration in milliseconds |

---

## 8. Complete REST API Endpoints Specification

### 1. Health & Status
- **`GET /api/health`**
  - **Description:** Consumed by the frontend `BackendModeBadge` to verify live server status and round-trip ping.
  - **Response:**
    ```json
    { "status": "ok", "online": true, "timestamp": "2026-11-17T10:00:00Z" }
    ```

### 2. Authentication
- **`POST /api/auth/login`**
  - **Body:** `{ "email": "alex.chen@campus.edu", "password": "..." }`
  - **Response:** `{ "token": "<JWT>", "user": { "id": "...", "name": "Alex Chen", "role": "student", "identifier": "CS-2024-104", "department": "CSE" } }`
- **`GET /api/auth/me`**
  - **Headers:** `Authorization: Bearer <JWT>`
  - **Response:** User profile object.

### 3. Student Domain Endpoints
- **`GET /api/student/dashboard`** — Returns aggregated stats (attendance %, semester dues, next session, pending assignments).
- **`GET /api/attendance`** — Returns aggregate percentage, minimum cutoff (75%), safe miss buffer, and subject-wise breakdown.
- **`POST /api/attendance/simulate`** — Body: `{ "courseCode": "CS301", "hypotheticalMisses": 2 }`. Returns projected aggregate and safe/risk status.
- **`GET /api/timetable`** — Returns Monday–Friday schedule with room allocations.
- **`GET /api/timetable/export.ics`** — Generates iCalendar (.ics) file for 1-click import into Google Calendar / Apple Calendar.
- **`GET /api/fees/ledger`** — Itemized fees, paid receipts, and current dues.
- **`POST /api/fees/checkout/create-order`** — Integrates with Razorpay API to generate `order_id`.
- **`POST /api/fees/checkout/verify`** — Verifies Razorpay payment signature and marks fee as paid.
- **`GET /api/assignments`** — List of coursework, due dates, submission status.
- **`POST /api/assignments/:id/submit`** — Submits deliverable (GitHub repo URL or file upload).
- **`GET /api/exams/schedule`** — Upcoming midterms/finals, seat coordinates (`Seat #A-42`).
- **`GET /api/exams/hall-ticket/:examId`** — Returns signed hall ticket data with QR verification hash.

### 4. Faculty Domain Endpoints
- **`GET /api/faculty/courses`** — Active teaching courses, syllabus progress, enrolled count.
- **`GET /api/faculty/courses/:courseCode/roster`** — Full student roster with attendance status.
- **`POST /api/faculty/attendance/batch`** — Bulk save daily attendance (`[{ rollNo: "CS-101", status: "present" }, ...]`).
- **`POST /api/faculty/attendance/alert-absent`** — Dispatches automated SMS/Email warning to parents of absent students.
- **`GET /api/faculty/assignments/:id/submissions`** — List of student submissions with AI code review suggestions.
- **`POST /api/faculty/assignments/grade`** — Submit grading rubric scores (`{ correctness, architecture, documentation }`).
- **`GET /api/faculty/deficiencies`** — Students below 75% cutoff with export to CSV/PDF.

### 5. Admin & Observability Endpoints
- **`GET /api/admin/metrics`** — Multi-agent query distributions, hourly volume, latency percentiles (`p50`, `p95`, `p99`).
- **`GET /api/admin/nodes`** — Status of the 7 agent nodes (CPU, RAM, RPS, Uptime).
- **`GET /api/admin/audit-logs`** — Filterable security audit logs (`severity: INFO | WARN | CRITICAL`).
- **`POST /api/admin/broadcasts`** — Compose and dispatch college-wide emergency push announcement.

---

## 9. Step-by-Step Backend Implementation Roadmap

### Phase 1: Environment Setup & Database Scaffolding (Day 1 - 2)
1. Initialize Python FastAPI project (`uvicorn`, `fastapi`, `pydantic`, `motor` / `asyncpg` or `SQLAlchemy`).
2. Configure CORS middleware to permit `http://localhost:5173` with credentials.
3. Define database models/collections matching the schemas in Section 7.
4. Create a seed script (`seed_database.py`) using the existing mock data in `frontend/src/lib/mockData.ts` so the system is immediately populated with realistic campus records.
5. Implement `GET /api/health` and verify the frontend `BackendModeBadge` turns green.

### Phase 2: Authentication & Domain REST APIs (Day 3 - 5)
1. Implement JWT authentication (`/api/auth/login`, `/api/auth/me`).
2. Create role-based dependency guards (`require_role("student")`, `require_role("faculty")`, `require_role("admin")`).
3. Build Student domain endpoints (Attendance, Timetable, Fees, Assignments, Exams).
4. Integrate Razorpay test-mode API for fee checkout order generation and verification.
5. Build Faculty domain endpoints (Batch attendance recording, assignment evaluation drawer, risk detector).
6. Build Admin observability endpoints (Metrics, telemetry, and audit logs).

### Phase 3: LangGraph Multi-Agent Orchestrator (Day 6 - 8)
1. Configure Google Gemini API key (`GEMINI_API_KEY`) via `google-generativeai` or `langchain-google-genai`.
2. Construct the **Central Coordinator** agent node:
   - System prompt defining routing rules and campus governance.
   - Intent classification into one of the 6 domain agents.
3. Build the 6 domain agent nodes with tool definitions:
   - `attendance_node`: bound to attendance DB tools.
   - `fee_node`: bound to fee & transaction DB tools.
   - `timetable_node`: bound to schedule DB tools.
   - `assignment_node`: bound to assignment & rubric evaluation tools.
   - `exam_node`: bound to exam & hall ticket tools.
   - `support_node`: bound to vector search / campus policy FAQ handbook.
4. Assemble the LangGraph `StateGraph`:
   ```python
   workflow = StateGraph(AgentState)
   workflow.add_node("coordinator", coordinator_node)
   workflow.add_node("attendance", attendance_node)
   workflow.add_node("fee", fee_node)
   workflow.add_node("timetable", timetable_node)
   workflow.add_node("assignment", assignment_node)
   workflow.add_node("exam", exam_node)
   workflow.add_node("support", support_node)
   ```

### Phase 4: Server-Sent Events (SSE) Streaming & Generative UI Integration (Day 9)
1. Implement `POST /api/chat/stream` using FastAPI's `StreamingResponse(generator(), media_type="text/event-stream")`.
2. Stream `agentChain` telemetry steps as agents are activated.
3. Attach generative UI `widget` payloads (matching Section 6 schemas) when domain agents yield structured data.
4. Stream tokens incrementally and close with `data: [DONE]`.

### Phase 5: End-to-End Integration & Verification (Day 10)
1. Launch the backend server: `uvicorn main:app --reload --port 8000`.
2. Open the frontend at `http://localhost:5173`.
3. In the frontend navbar, click the **Backend Mode Badge** and switch from **Mock Mode** to **Live Backend Mode**.
4. Test prompts across all agents:
   - *"What is my attendance in CS301?"*
   - *"Do I have any fee dues?"*
   - *"What lectures do I have today?"*
   - *"When is my Raft assignment due?"*
   - *"What is my seat number for Midterm exams?"*
5. Confirm seamless token streaming, agent chain accordion expansion, and rich interactive widget rendering in the chat drawer.

---

## 10. Sample `.env.example` for Backend

```env
# Server
PORT=8000
ENVIRONMENT=development
CORS_ORIGINS=http://localhost:5173,https://your-production-app.vercel.app

# Database (PostgreSQL or MongoDB)
DATABASE_URL=postgresql://postgres:password@localhost:5432/smart_campus_ai
# Or MongoDB: MONGODB_URI=mongodb://localhost:27017/smart_campus_ai

# Security & Auth
JWT_SECRET_KEY=super-secret-smart-campus-jwt-key-2026
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# AI / LLM
GEMINI_API_KEY=AIzaSy...your-gemini-api-key-here
LLM_MODEL=gemini-1.5-flash

# Razorpay Payments (Test Mode)
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

---

## 11. Testing & Acceptance Criteria

| Component | Acceptance Test | Expected Result |
| :--- | :--- | :--- |
| **Health Ping** | `GET /api/health` | HTTP 200 within $< 50\text{ms}$ with `{ online: true }`. Top navbar pill shows *Live Backend (XXms)*. |
| **Auth** | `POST /api/auth/login` | Returns valid JWT with correct role. |
| **SSE Streaming** | `POST /api/chat/stream` | Emits `agentChain`, followed by `widget` (if applicable), incremental tokens, and ends with `data: [DONE]`. |
| **Attendance Tool** | Prompt: *"Can I miss class?"* | Coordinates with Attendance Agent, calculates safe miss buffer from DB, and renders `<AttendanceWidget />`. |
| **Fee Tool** | Prompt: *"Fee dues"* | Fee Agent fetches ledger, emits `<FeeBreakdownWidget />`, allows simulated Razorpay checkout. |
| **Timetable Tool** | Prompt: *"Today's classes"* | Timetable Agent fetches daily schedule, emits `<TimetableWidget />` with room locations. |
| **Exam Tool** | Prompt: *"Exam schedule"* | Exam Agent fetches midterms, emits `<ExamScheduleWidget />` with seating numbers. |
| **Assignment Tool**| Prompt: *"Assignments due"* | Assignment Agent emits `<AssignmentWidget />` with due date countdown. |
| **Fault Tolerance** | Backend offline / stopped | Frontend catches connection error and automatically fails over to the Autonomous Mock Engine without crashing. |
