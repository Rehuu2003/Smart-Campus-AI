import { useState, useEffect, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNavDrawer } from './MobileNavDrawer';
import { SlideOverDrawer } from '@/components/chat/SlideOverDrawer';
import { FullScreenAssistant } from '@/components/chat/FullScreenAssistant';
import { CommandMenu } from '@/components/search/CommandMenu';
import { useChatStream } from '@/hooks/useChatStream';
import { useAuthStore } from '@/stores/authStore';

// Dedicated Views for Student Role
import { AttendanceView } from '@/components/views/AttendanceView';
import { TimetableView } from '@/components/views/TimetableView';
import { FeeLedgerView } from '@/components/views/FeeLedgerView';
import { AssignmentsView } from '@/components/views/AssignmentsView';
import { ExaminationsView } from '@/components/views/ExaminationsView';

// Dedicated Views for Faculty Role
import { FacultyRosterView } from '@/components/views/FacultyRosterView';
import { FacultyScheduleView } from '@/components/views/FacultyScheduleView';
import { FacultyGradingView } from '@/components/views/FacultyGradingView';
import { FacultyDeficienciesView } from '@/components/views/FacultyDeficienciesView';

// Dedicated Views for Admin Role
import { AdminObservabilityCenter } from '@/components/admin/AdminObservabilityCenter';
import { AdminAuditView } from '@/components/views/AdminAuditView';
import { AdminBroadcastsView } from '@/components/views/AdminBroadcastsView';

// Shared Settings View
import { SettingsView } from '@/components/views/SettingsView';

interface AppShellProps {
  children?: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { streamResponse } = useChatStream();
  const { user } = useAuthStore();
  const role = user?.role || 'student';

  // Role-Based Route Guard: Reset to dashboard if activeTab is not permitted for current role
  useEffect(() => {
    const allowedTabs: Record<string, string[]> = {
      student: ['dashboard', 'assistant', 'attendance', 'timetable', 'fees', 'assignments', 'exams', 'settings'],
      faculty: ['dashboard', 'assistant', 'faculty-roster', 'faculty-schedule', 'faculty-grading', 'faculty-deficiencies', 'settings'],
      admin: ['dashboard', 'assistant', 'analytics', 'admin-audit', 'admin-broadcasts', 'settings'],
    };

    const currentAllowed = allowedTabs[role] || allowedTabs.student;
    if (!currentAllowed.includes(activeTab)) {
      setActiveTab('dashboard');
    }
  }, [role, activeTab]);

  const handleCommandSelect = (query: string) => {
    setIsCopilotOpen(true);
    streamResponse(query);
  };

  const renderActiveContent = () => {
    // 1. Shared Global Tabs
    if (activeTab === 'assistant') {
      return <FullScreenAssistant onBackToDashboard={() => setActiveTab('dashboard')} />;
    }
    if (activeTab === 'settings') {
      return <SettingsView />;
    }

    // 2. Student Role Views (Strictly guarded)
    if (role === 'student') {
      switch (activeTab) {
        case 'attendance':
          return <AttendanceView />;
        case 'timetable':
          return <TimetableView />;
        case 'fees':
          return <FeeLedgerView />;
        case 'assignments':
          return <AssignmentsView />;
        case 'exams':
          return <ExaminationsView />;
        case 'dashboard':
        default:
          return children;
      }
    }

    // 3. Faculty Role Views (Strictly guarded)
    if (role === 'faculty') {
      switch (activeTab) {
        case 'faculty-roster':
          return <FacultyRosterView />;
        case 'faculty-schedule':
          return <FacultyScheduleView />;
        case 'faculty-grading':
          return <FacultyGradingView />;
        case 'faculty-deficiencies':
          return <FacultyDeficienciesView />;
        case 'dashboard':
        default:
          return children;
      }
    }

    // 4. Admin Role Views (Strictly guarded)
    if (role === 'admin') {
      switch (activeTab) {
        case 'analytics':
          return <AdminObservabilityCenter />;
        case 'admin-audit':
          return <AdminAuditView />;
        case 'admin-broadcasts':
          return <AdminBroadcastsView />;
        case 'dashboard':
        default:
          return children;
      }
    }

    return children;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Accessible Skip To Content Link for Screen Readers & Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-[#1E3A8A] text-white font-bold text-xs rounded-xl shadow-soft-lg ring-2 ring-white outline-none transition focus:ring-offset-2"
      >
        Skip to main content (Press Enter)
      </a>

      {/* Sonner Toast Notification Provider */}
      <Toaster 
        richColors 
        position="top-right" 
        closeButton 
        theme="light"
        toastOptions={{
          style: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '12px',
          },
        }}
      />

      {/* Top Navbar */}
      <Navbar
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileMenu={() => setIsMobileNavOpen(true)}
      />

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Desktop Sidebar (Hidden on mobile) */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenCopilot={() => setIsCopilotOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main
          id="main-content"
          tabIndex={-1}
          role="main"
          aria-label="Main Application Dashboard"
          className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 bg-[#F8FAFC] focus:outline-none"
        >
          <div className="max-w-7xl mx-auto">
            {renderActiveContent()}
          </div>
        </main>
      </div>

      {/* Mobile Slide-out Navigation Drawer (Mobile Only) */}
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsMobileNavOpen(false);
        }}
        onOpenCopilot={() => {
          setIsMobileNavOpen(false);
          setIsCopilotOpen(true);
        }}
      />

      {/* Slide-over AI Copilot Drawer */}
      <SlideOverDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onExpandFullScreen={() => {
          setIsCopilotOpen(false);
          setActiveTab('assistant');
        }}
      />

      {/* Global Command Menu (Ctrl+K) */}
      <CommandMenu
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAction={handleCommandSelect}
      />
    </div>
  );
}
