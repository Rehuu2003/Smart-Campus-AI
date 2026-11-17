# Smart Campus AI: Multi-Agent College Management Assistant

> **An AI-powered smart college assistant that streamlines academic, administrative, and student operations through coordinated multi-agent intelligence.**

[![React](https://img.shields.io/badge/Frontend-React_18_%2B_Vite_%2B_TypeScript-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_v3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![LangGraph](https://img.shields.io/badge/AI_Orchestration-LangGraph_%2B_Python-orange)](https://langchain-ai.github.io/langgraph/)
[![Gemini](https://img.shields.io/badge/LLM-Gemini_API-8E75C2?logo=google-gemini)](https://ai.google.dev/)
[![Database](https://img.shields.io/badge/Database-MongoDB_%2F_PostgreSQL-green)](https://www.mongodb.com/)

---

## 📌 Executive Summary

Traditional university Enterprise Resource Planning (ERP) systems are notorious for convoluted navigation, fragmented dashboards, and high friction for everyday tasks. Students struggle to find attendance cutoffs, impending fee deadlines, and schedule adjustments, while faculty and administrators spend hundreds of hours addressing repetitive inquiries.

**Smart Campus AI** replaces cumbersome menus with a unified, conversational intelligent workspace. Powered by a **Central AI Coordinator** and **6 Domain-Specific AI Agents**, it accurately interprets natural language inquiries, queries live college databases, and renders interactive, generative UI cards directly into the interface.

---

## 🏛️ System Architecture

```
                                  ┌───────────────────────────┐
                                  │      Students / Users     │
                                  └─────────────┬─────────────┘
                                                │ (HTTPS / WSS)
                                                ▼
                        ┌───────────────────────────────────────────────┐
                        │      Frontend Web Application (React + Vite)   │
                        │   • Stripe Royal Slate Enterprise UI          │
                        │   • Slide-over AI Copilot Drawer              │
                        │   • Generative UI Dynamic Render Engine       │
                        └───────────────────────┬───────────────────────┘
                                                │ (REST / SSE Stream)
                                                ▼
                        ┌───────────────────────────────────────────────┐
                        │         Backend API Layer (Express / FastAPI)  │
                        │   • Authentication & RBAC (JWT)               │
                        │   • Rate Limiting & Audit Logging             │
                        └───────────────────────┬───────────────────────┘
                                                │
                                                ▼
              ┌───────────────────────────────────────────────────────────────────┐
              │                   Central AI Coordinator (Orchestrator)            │
              │             Analyzes intent, verifies permissions, and delegates   │
              └───────┬─────────┬─────────┬─────────┬──────────┬──────────┬───────┘
                      │         │         │         │          │          │
         ┌────────────┘         │         │         │          │          └────────────┐
         ▼                      ▼         ▼         ▼          ▼                       ▼
┌──────────────────┐  ┌─────────────┐ ┌─────────┐ ┌──────────┐ ┌────────────┐  ┌──────────────────┐
│ Attendance Agent │  │  Exam Agent │ │Fee Agent│ │Timetable │ │ Assignment │  │  Support Agent   │
│ • Attendance %   │  │• Schedules  │ │• Dues   │ │• Lectures│ │• Deadlines │  │  • General FAQs  │
│ • Safe cutoffs   │  │• Results    │ │• Pay API│ │• Rooms   │ │• Submits   │  │  • Campus Info   │
└────────┬─────────┘  └──────┬──────┘ └───┬─────┘ └────┬─────┘ └─────┬──────┘  └────────┬─────────┘
         │                   │            │            │             │                  │
         └───────────────────┴────────────┼────────────┴─────────────┴──────────────────┘
                                          │ Database Tools
                                          ▼
                        ┌───────────────────────────────────────────────┐
                        │                 Database Layer                │
                        │  Students · Faculty · Attendance · Timetable  │
                        │       Fee Records · Assignments · Exams       │
                        └───────────────────────────────────────────────┘
```

---

## 🤖 The Multi-Agent Ecosystem

| Agent | Signature Color | Role & Capabilities |
| :--- | :--- | :--- |
| **Central Coordinator** | `Electric Violet` (`#8B5CF6`) | Natural language intent routing, multi-turn context tracking, agent aggregation, safety guardrails |
| **Attendance Agent** | `Emerald Green` (`#10B981`) | Queries real-time attendance percentages, subject cutoffs, warns against $<75\%$ shortage |
| **Fee Agent** | `Amber Gold` (`#F59E0B`) | Validates tuition balance, generates pending invoice breakdowns, handles receipt lookups |
| **Examination Agent** | `Cyan Sky` (`#06B6D4`) | Retrieves exam dates, hall ticket details, venue room numbers, and semester GPA/results |
| **Timetable Agent** | `Deep Purple` (`#A855F7`) | Daily/weekly lecture schedules, room allocation, faculty substitute notifications |
| **Assignment Agent** | `Vibrant Rose` (`#F43F5E`) | Submission countdowns, overdue alerts, rubric verification, file upload links |
| **Support Agent** | `Ocean Blue` (`#38BDF8`) | Campus operating hours, department contacts, syllabus links, university policies |

---

## 💻 Tech Stack

### Frontend Application (`/frontend`)
* **Framework:** React 18 + Vite (TypeScript)
* **Styling:** Tailwind CSS + Radix UI (`shadcn/ui` accessible primitives)
* **Design Theme:** *Stripe Royal Slate* (Crisp enterprise authority, royal navy `#1E3A8A`, elevated soft shadows)
* **Icons:** Lucide React
* **State Management:** Zustand (lag-free, lightweight)
* **Animations:** Framer Motion (smooth slide-over copilot drawer, layout shifts)
* **Data Visualization:** Recharts (circular attendance meters, telemetry charts)

### AI & Agent Orchestration (`/agents`)
* **Framework:** Python 3.11 + LangGraph
* **Models:** Google Gemini API (Fast, large context, reliable JSON function calling)
* **Patterns:** Stateful graph traversal, intent classification router, parameterized database tools

### Backend & Database Layer (`/backend`)
* **API Service:** Node.js (Express) or Python (FastAPI)
* **Database:** MongoDB / PostgreSQL with connection pooling
* **Authentication:** JSON Web Tokens (JWT) with strict Role-Based Access Control (Student / Faculty / Admin)

---

## 📂 Repository Structure

```
Smart-Campus-AI/
├── README.md                 # Master project documentation
├── docs/                     # Architecture diagrams and specifications
├── agents/                   # LangGraph AI agent definitions and tool bindings
│   ├── coordinator.py        # Central orchestrator graph
│   └── domain_agents/        # Attendance, Fee, Exam, Timetable, Assignment, Support
├── backend/                  # REST API & Database models
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   └── package.json
└── frontend/                 # React 18 + Vite + TypeScript application
    ├── src/
    │   ├── components/       # UI primitives, layout shell, chat drawer
    │   ├── generative-ui/    # Dynamic widgets (AttendanceGauge, FeeCard, etc.)
    │   ├── stores/           # Zustand state stores
    │   └── types/            # TypeScript schemas & agent contracts
    ├── package.json
    └── tailwind.config.js
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher
* **Python:** v3.10+ (for AI Agents)
* **Git** installed on your system

### 1. Repository Setup
```bash
# Clone the repository (if not already local)
git clone https://github.com/Rehuu2003/Smart-Campus-AI.git
cd Smart-Campus-AI
```

### 2. Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend will run locally on `http://localhost:5173`.

---

## 🗺️ 10-Day Frontend Implementation Roadmap (100% Complete)

- [x] **Day 1:** Project foundation, Stripe Royal Slate design tokens & responsive AppShell with slide-over drawer
- [x] **Day 2:** Authentication, role-based views (Student/Faculty/Admin) & mock data engine
- [x] **Day 3:** Student overview dashboard & Recharts attendance gauge with What-If simulator
- [x] **Day 4:** Multi-agent chat shell & non-blocking streaming simulation with markdown rendering
- [x] **Day 5:** Agent reasoning trace accordion, raw JSON inspector & latency telemetry status ticker
- [x] **Day 6:** Generative UI engine (Dynamic attendance, timetable, fee widgets with Razorpay checkout simulation & confetti)
- [x] **Day 7:** Faculty portal, batch attendance roster, assignment rubric grading drawer & deficiency detector
- [x] **Day 8:** Admin agent observability, Recharts query distribution donut, node telemetry & emergency broadcast composer
- [x] **Day 9:** Micro-interactions, Web Audio API procedural sound synthesizer, accessibility audit & zero-layout-shift skeletons
- [x] **Day 10:** Swappable API client adapter (Mock vs Live SSE backend), manual vendor chunk splitting & Vercel/Netlify deployment configuration

---

## 🔌 Swappable API Client & Live SSE Backend Architecture

The frontend features a swappable API Client adapter (`src/lib/apiClient.ts`):
* **Autonomous Mock Data Engine:** Zero-dependency, offline-capable mode with simulated character streaming, realistic latency, and full domain data for Student, Faculty, and Admin personas.
* **Live SSE Backend Mode:** Streams real-time Server-Sent Events from `/api/chat/stream`, updating tokens, multi-agent chain traces, and generative UI widgets on the fly.
* **Automatic Fallback:** If the live backend is unreachable or returns an error, the client gracefully falls back to the autonomous offline engine with Sonner toast feedback.
* **1-Click Mode Toggle:** Easily switch between modes via the interactive `BackendModeBadge` pill in the top navigation bar.

---

## 🚢 Deployment Guide

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/Rehuu2003/Smart-Campus-AI)

1. Import the repository in [Vercel](https://vercel.com).
2. Set the Root Directory to `frontend`.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. The included `vercel.json` automatically configures SPA client-side routing rewrites and static asset caching.

### Deploy to Netlify
1. Connect repository in [Netlify](https://www.netlify.com).
2. Base directory: `frontend`
3. Publish directory: `frontend/dist`
4. The included `netlify.toml` handles routing redirects and security headers.

---

## 👥 Authors & Maintainers
* **Smart Campus AI Team**
* **Repository:** [https://github.com/Rehuu2003/Smart-Campus-AI](https://github.com/Rehuu2003/Smart-Campus-AI)
